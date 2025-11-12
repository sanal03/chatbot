const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Groq } = require('groq-sdk');
const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// Initialize clients (only when keys present)
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

let openaiClient = null;
if (process.env.OPENAI_API_KEY) {
  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  openaiClient = new OpenAIApi(configuration);
}

// Helper: Bing Web Search
async function searchBing(query, count = 3) {
  const key = process.env.BING_API_KEY;
  if (!key) throw new Error('BING_API_KEY is not configured');

  const endpoint = process.env.BING_ENDPOINT || 'https://api.bing.microsoft.com/v7.0/search';
  try {
    const resp = await axios.get(endpoint, {
      params: { q: query, mkt: 'en-US', count },
      headers: { 'Ocp-Apim-Subscription-Key': key }
    });

    const pages = resp.data.webPages?.value || [];
    return pages.map(p => ({
      name: p.name,
      snippet: p.snippet || p.displayUrl || '',
      url: p.url
    }));
  } catch (err) {
    console.error('Bing search error:', err?.response?.data || err.message);
    throw new Error('Search service unavailable');
  }
}

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are an expert travel guide assistant specialized in Sikkim monasteries and Buddhist culture. 
You provide accurate, helpful, and engaging information about:
- Sikkim monasteries (Rumtek, Enchey, Pemayangtse, etc.)
- Buddhist heritage and culture
- Travel tips and logistics for visiting Sikkim
- Local attractions and accommodations
- Best times to visit and weather information

Always provide accurate information. If you're unsure about something, suggest the user contact local tourism boards or visit the monastery's official website.
Be friendly, engaging, and helpful. Keep responses concise but informative.`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Chatbot API is running' });
});

// Main chatbot endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Message is required',
        success: false
      });
    }

    // Provider-specific pre-checks will be validated below; allow request to proceed to generator

    // Provider-agnostic generation
    const provider = (process.env.PROVIDER || 'groq').toLowerCase();

    async function generateWithOpenAI(userMessage, retrieved = null) {
      if (!openaiClient) throw new Error('OPENAI_API_KEY is not configured');
      // If retrieved search snippets are provided, include them in the prompt and instruct the model to cite sources.
      const system = SYSTEM_PROMPT + `\n\nWhen web search results are included, prefer the retrieved snippets for factual answers and cite the source URLs when appropriate. If the retrieved content contradicts the model's knowledge, prefer the retrieved content.`;

      const messages = [{ role: 'system', content: system }];
      if (retrieved) {
        messages.push({ role: 'user', content: `Search results:\n${retrieved}` });
      }
      messages.push({ role: 'user', content: userMessage });

      const completion = await openaiClient.createChatCompletion({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      });
      return completion.data.choices[0]?.message?.content || null;
    }

    async function generateWithGroq(userMessage) {
      if (!groq) throw new Error('GROQ_API_KEY is not configured');
      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
        max_tokens: 1024,
      });
      return completion.choices[0]?.message?.content || null;
    }

    let response = null;
    const useWeb = (process.env.USE_WEB_SEARCH || 'false').toLowerCase() === 'true';

    if (provider === 'openai') {
      if (useWeb) {
        // perform web search and summarize
        const results = await searchBing(message, 3);
        const retrievedText = results.map((r, i) => `${i+1}. ${r.name}\n${r.snippet}\n${r.url}`).join('\n\n');
        response = await generateWithOpenAI(message, retrievedText);
      } else {
        response = await generateWithOpenAI(message);
      }
    } else {
      // default to groq (no web retrieval at the moment)
      response = await generateWithGroq(message);
    }

    if (!response) response = 'Sorry, I could not generate a response.';

    res.json({
      success: true,
      message: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
  console.error('Error:', error.message);
    
  let errorMessage = 'An error occurred while processing your request';
    let statusCode = 500;

    if (error.message.includes('401')) {
      errorMessage = 'Invalid or missing API key. Please configure GROQ_API_KEY.';
      statusCode = 401;
    } else if (error.message.includes('429')) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
      statusCode = 429;
    } else if (error.message.includes('timeout')) {
      errorMessage = 'Request timeout. Please try again.';
      statusCode = 504;
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Feedback endpoint (optional - for storing user feedback)
app.post('/api/feedback', (req, res) => {
  try {
    const { message, feedback, helpful } = req.body;
    
    console.log('Feedback received:', {
      timestamp: new Date().toISOString(),
      message,
      feedback,
      helpful
    });

    res.json({
      success: true,
      message: 'Thank you for your feedback!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to process feedback'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  const provider = (process.env.PROVIDER || 'groq').toLowerCase();
  console.log(`🚀 Sikkim Monasteries Chatbot API running on http://localhost:${PORT}`);
  console.log(`📚 System Prompt: Specialized in Sikkim monasteries and Buddhist culture`);
  console.log(`⚙️ Provider: ${provider}`);
  console.log(`🔑 Keys: GROQ=${process.env.GROQ_API_KEY ? '✓' : '✗'}, OPENAI=${process.env.OPENAI_API_KEY ? '✓' : '✗'}, BING=${process.env.BING_API_KEY ? '✓' : '✗'}`);
});
