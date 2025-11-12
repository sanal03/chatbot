# 🚀 Quick Start Guide

## Step 1: Get Your Groq API Key

1. Visit https://console.groq.com
2. Sign up for a free account
3. Go to "API Keys" section
4. Create a new API key
5. Copy the key

## Step 2: Configure Environment

1. Open `.env.example` file
2. Copy its content to a new file called `.env`
3. Replace `your_groq_api_key_here` with your actual API key
4. Save the `.env` file

Example `.env`:
```
GROQ_API_KEY=gsk_YourActualKeyHere...
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

Optional: Use OpenAI and enable web search

If you want to use OpenAI instead of Groq and enable live web search results (Bing) add:

```text
PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
USE_WEB_SEARCH=true
BING_API_KEY=your_bing_api_key_here
```

Notes:
- `PROVIDER=openai` tells the server to use OpenAI. If you omit this, the server defaults to Groq.
- When `USE_WEB_SEARCH=true` the server will call Bing Web Search and include top snippets in the prompt to the LLM; this requires `BING_API_KEY`.

## Step 3: Start the Backend Server

Open PowerShell in the chatbot folder and run:

```powershell
npm start
```

You should see:
```
🚀 Sikkim Monasteries Chatbot API running on http://localhost:5000
📚 System Prompt: Specialized in Sikkim monasteries and Buddhist culture
🔑 API Key Status: ✓ Configured
```

## Step 4: Open the Web Interface

1. Open `index.html` in your web browser
2. Start asking questions about Sikkim monasteries!

## Example Questions to Try

- "What are the main monasteries in Sikkim?"
- "Tell me about Rumtek Monastery"
- "When is the best time to visit Sikkim?"
- "How much does it cost to visit monasteries?"
- "What should I know about Buddhist culture in Sikkim?"

## Development Mode (Auto-reload)

For development with auto-restart on code changes:

```powershell
npm run dev
```

This requires `nodemon` to be installed (already included in package.json).

## Troubleshooting

### Error: "Cannot find module"
- Run: `npm install`

### Error: "GROQ_API_KEY is not configured"
- Check if `.env` file exists
- Verify your API key is correct
- Restart the server

### Port 5000 already in use
- Change the PORT in `.env`:
  ```
  PORT=5001
  ```
- Update the API_URL in `script.js`:
  ```javascript
  const API_URL = 'http://localhost:5001/api';
  ```

### Cannot connect to API from browser
- Ensure server is running on port 5000
- Check CORS_ORIGIN setting in `.env`
- Open browser console (F12) to see errors

## File Structure Explained

```
chatbot/
├── server.js           # Backend API (handles AI responses)
├── index.html          # Web chat interface
├── styles.css          # Styling
├── script.js           # Frontend functionality
├── package.json        # Dependencies
├── .env                # Your API keys (create from .env.example)
└── README.md           # Full documentation
```

## Next Steps

1. ✅ Get Groq API key
2. ✅ Create .env file
3. ✅ Run `npm start`
4. ✅ Open index.html
5. 🎉 Start chatting!

For detailed documentation, see README.md

---

**Need help?** Check the README.md for more information about API endpoints, deployment, and advanced features.
