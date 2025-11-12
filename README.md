# Sikkim Monasteries Travel Chatbot

An AI-powered chatbot designed to help travelers explore Buddhist monasteries and cultural heritage in Sikkim. This application combines a modern web interface with an intelligent API backend powered by Groq's language models.

## Features

✨ **Intelligent Responses**
- Powered by Groq's Mixtral model for fast, accurate answers
- Specialized knowledge about Sikkim monasteries and Buddhist culture
- Context-aware responses about travel logistics and accommodations

🌐 **User-Friendly Interface**
- Clean, modern chat interface
- Mobile-responsive design
- Real-time message streaming
- Loading indicators and error handling

🔌 **RESTful API**
- Express.js backend server
- CORS-enabled for web integration
- Health check endpoint
- Feedback collection system

📚 **Content Coverage**
- Major monasteries (Rumtek, Enchey, Pemayangtse, etc.)
- Travel tips and best visiting times
- Buddhist heritage and culture
- Local accommodations and logistics

## Project Structure

```
sikkim-monasteries-chatbot/
├── server.js              # Express.js backend server
├── index.html             # Main web interface
├── styles.css             # UI styling
├── script.js              # Frontend JavaScript
├── package.json           # Project dependencies
├── .env.example           # Environment configuration template
└── README.md              # This file
```

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Groq API Key** (free account at https://console.groq.com)

Optional (alternative providers):
- **OpenAI API Key** (if you prefer OpenAI instead of Groq)
- **Bing Web Search API Key** (for live internet-sourced answers when using web search)

## Installation

1. **Clone or download the project** to your local machine

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Add your Groq API key:
     ```
     GROQ_API_KEY=your_actual_api_key_here
     PORT=5000
     NODE_ENV=development
     CORS_ORIGIN=http://localhost:3000
     ```

4. **Get your Groq API Key**
   - Go to https://console.groq.com
   - Sign up for a free account
   - Create an API key
   - Paste it in your `.env` file

## Running the Application

### Development Mode (with auto-reload)

```powershell
npm run dev
```

### Production Mode

```powershell
npm start
```

The server will start on `http://localhost:5000`

## Using the Chatbot

### Web Interface

1. Open `index.html` in your browser
2. Type your question about Sikkim monasteries
3. Press Enter or click the Send button
4. Wait for the AI response

### API Endpoints

#### Chat Endpoint
```
POST /api/chat
Content-Type: application/json

{
  "message": "Tell me about Rumtek Monastery"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Rumtek Monastery is...",
  "timestamp": "2024-11-12T10:30:00.000Z"
}
```

#### Health Check Endpoint
```
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Chatbot API is running"
}
```

#### Feedback Endpoint
```
POST /api/feedback
Content-Type: application/json

{
  "message": "Original message",
  "feedback": "Some feedback",
  "helpful": true
}
```

## Example Questions

- "What is Rumtek Monastery known for?"
- "When is the best time to visit Sikkim monasteries?"
- "How do I reach Enchey Monastery from Gangtok?"
- "Tell me about Buddhist culture in Sikkim"
- "What are the entrance fees for major monasteries?"
- "What should I pack for visiting monasteries in Sikkim?"

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `GROQ_API_KEY` | - | Your Groq API key (required) |
| `PORT` | 5000 | Server port |
| `NODE_ENV` | development | Environment mode |
| `CORS_ORIGIN` | http://localhost:3000 | Allowed CORS origin |

Additional (optional) variables for alternative providers and web search:

| Variable | Default | Description |
|----------|---------|-------------|
| `PROVIDER` | `groq` | Which provider to use: `groq` or `openai` |
| `OPENAI_API_KEY` | - | Your OpenAI API key (if using `PROVIDER=openai`) |
| `OPENAI_MODEL` | `gpt-3.5-turbo` | Model to use when `PROVIDER=openai` |
| `USE_WEB_SEARCH` | `false` | If `true`, the server will perform a web search (Bing) and summarize results |
| `BING_API_KEY` | - | Bing Web Search API key (required when `USE_WEB_SEARCH=true`) |
| `BING_ENDPOINT` | `https://api.bing.microsoft.com/v7.0/search` | (Optional) custom Bing search endpoint (Azure)

Notes:
- If you keep `PROVIDER=groq` the app uses Groq (requires `GROQ_API_KEY`).
- If you set `PROVIDER=openai` the app uses OpenAI and will require `OPENAI_API_KEY`.
- To enable live internet answers, set `USE_WEB_SEARCH=true` and provide `BING_API_KEY` (and `PROVIDER=openai`).

### AI Model Settings

- **Model**: `mixtral-8x7b-32768`
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Tokens**: 1024 (response length limit)
- **System Prompt**: Specialized in Sikkim monasteries

## API Models Available

The chatbot uses **Mixtral 8x7B**, which offers:
- ✓ Fast response times
- ✓ Accurate information retrieval
- ✓ Free tier available
- ✓ Great for conversational AI

Other available models on Groq:
- `gemma-7b-it`
- `llama2-70b-chat`
- `llama-3.1-70b-versatile`

## Troubleshooting

### "Cannot connect to API"
- Ensure the server is running: `npm start`
- Check if port 5000 is available
- Try accessing http://localhost:5000/api/health

### "GROQ_API_KEY is not configured"
- Copy `.env.example` to `.env`
- Add your actual Groq API key
- Restart the server

### "Rate limit exceeded"
- Wait a few moments before sending the next message
- Free tier has rate limits; consider upgrading your Groq plan

### CORS Errors
- Update `CORS_ORIGIN` in `.env` to match your frontend URL
- Restart the server after changes

## Extending the Chatbot

### Add Custom Knowledge Base

Edit the `SYSTEM_PROMPT` in `server.js`:

```javascript
const SYSTEM_PROMPT = `You are an expert travel guide...
// Add more specific instructions here
`;
```

### Change the AI Model

In `server.js`, modify the model selection:

```javascript
model: 'llama-3.1-70b-versatile', // Change this
```

### Add Database Integration

Integrate with SQLite or MongoDB to:
- Store conversation history
- Track user feedback
- Analyze popular questions
- Build a knowledge base

## Deployment

### Deploy to Vercel (Frontend)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Deploy with automatic HTTPS

### Deploy Backend

Options:
- **Railway** (easy, free tier available)
- **Render** (simple Python/Node.js support)
- **Heroku** (industry standard)
- **AWS/Azure** (advanced, scalable)

Example deployment on Railway:
1. Connect your GitHub repo
2. Set environment variables in dashboard
3. Deploy automatically

## Security Best Practices

- ✓ Never commit `.env` file with API keys
- ✓ Use environment variables for sensitive data
- ✓ Validate and sanitize all user inputs
- ✓ Implement rate limiting for production
- ✓ Use HTTPS in production
- ✓ Monitor API usage and costs

## Performance Optimization

- Cache common queries
- Implement message pagination
- Add response caching
- Use connection pooling for databases
- Implement lazy loading for chat history

## Future Enhancements

- 📱 Mobile app version
- 🗺️ Interactive monastery map
- 📸 Image recognition for monastery identification
- 🎤 Voice input support
- 🌍 Multi-language support
- 💾 Persistent chat history
- 📊 Analytics dashboard
- 🔐 User authentication

## License

MIT License - Feel free to use this project for your own purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the Groq documentation: https://console.groq.com/docs
3. Check Express.js documentation: https://expressjs.com

## Contributing

To improve this chatbot:
1. Test new features thoroughly
2. Update documentation
3. Report bugs with examples
4. Suggest improvements via issues

---

**Happy traveling through Sikkim's spiritual heritage! 🙏**

Built with ❤️ for travelers and culture enthusiasts
