# 📋 Setup Instructions

## What You Have

Your new Sikkim Monasteries Chatbot project includes:

- **Backend API** (`server.js`) - Express.js server with AI integration
- **Web Interface** (`index.html`, `styles.css`, `script.js`) - Beautiful chat UI
- **AI Integration** - Groq API for intelligent responses
- **Documentation** - Complete setup and usage guides

## Prerequisites

Make sure you have installed:
- ✅ Node.js (v14 or higher) - https://nodejs.org/
- ✅ npm (comes with Node.js)

Verify installation:
```powershell
node --version
npm --version
```

## Installation Steps

### Step 1: Get Groq API Key (5 minutes)

The chatbot uses **Groq** for AI responses - it's free and fast!

1. Visit: https://console.groq.com/
2. Click "Sign Up" and create a free account
3. Verify your email
4. Go to "API Keys" section
5. Click "Create API Key"
6. Copy the key (starts with `gsk_`)
7. Keep it safe - you'll need it in the next step

### Step 2: Configure Your Project

1. In the chatbot folder, you'll see `.env.example`
2. Open it and see the configuration template
3. Create a new file named `.env` (same folder)
4. Copy-paste this content into `.env`:

```
GROQ_API_KEY=paste_your_key_here
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

5. Replace `paste_your_key_here` with your actual Groq API key
6. Save the file

**⚠️ Important**: Never share your .env file! Add it to .gitignore (already done).

### Step 3: Install Dependencies

Open PowerShell in your chatbot folder and run:

```powershell
npm install
```

This installs all required packages (Express, Groq SDK, etc.)
The process takes 1-2 minutes.

### Step 4: Start the Server

```powershell
npm start
```

You should see:
```
🚀 Sikkim Monasteries Chatbot API running on http://localhost:5000
📚 System Prompt: Specialized in Sikkim monasteries and Buddhist culture
🔑 API Key Status: ✓ Configured
```

**Keep this terminal open!** The server needs to stay running.

### Step 5: Test the Chatbot

Open a new PowerShell window (keep the server running) and test:

```powershell
node test-api.js
```

You should see:
```
✅ Health Check Passed
✅ Chat Endpoint Working!
✅ Feedback Endpoint Working!
```

### Step 6: Use the Web Interface

1. Open `index.html` in your web browser
2. Start typing questions!
3. Examples:
   - "What is Rumtek Monastery?"
   - "Tell me about Enchey Monastery"
   - "Best time to visit Sikkim monasteries?"
   - "How to reach Pemayangtse Monastery?"

## Project Files Explained

| File | Purpose |
|------|---------|
| `server.js` | Express backend server with AI integration |
| `index.html` | Main chat interface (HTML) |
| `styles.css` | Beautiful styling and responsive design |
| `script.js` | Chat functionality (frontend) |
| `package.json` | Project metadata and dependencies |
| `.env` | Your API keys and configuration (create from .env.example) |
| `README.md` | Full documentation |
| `QUICK_START.md` | This quick reference |
| `test-api.js` | API testing script |

## Keyboard Shortcuts

- **Enter** - Send message
- **Shift + Enter** - New line in message (if implemented)

## Environment Variables Reference

### Required
- `GROQ_API_KEY` - Your Groq API key from console.groq.com

### Optional
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - development or production (default: development)
- `CORS_ORIGIN` - Allowed frontend origin (default: http://localhost:3000)

## Common Issues & Solutions

### Issue: "Cannot find module 'express'"
**Solution**: Run `npm install` again

### Issue: "GROQ_API_KEY is not configured"
**Solution**:
1. Check if `.env` file exists (not `.env.example`)
2. Verify your API key is correct in `.env`
3. Restart the server

### Issue: "Port 5000 already in use"
**Solution**:
1. Change PORT in `.env` to something like 5001
2. Update API_URL in `script.js`:
   ```javascript
   const API_URL = 'http://localhost:5001/api';
   ```

### Issue: "Cannot connect to API" in browser
**Solution**:
1. Ensure server is running (`npm start`)
2. Check browser console (F12) for errors
3. Verify CORS_ORIGIN in `.env` matches your browser URL

### Issue: No response from chatbot
**Solution**:
1. Wait a moment (first request can be slow)
2. Check browser console for errors
3. Verify internet connection
4. Check if API key is valid

## Development Tips

### Run in Development Mode (Auto-reload)
```powershell
npm run dev
```
Server restarts automatically when you save code changes.

### Debug Mode
1. Open browser console (F12)
2. Look for API logs and errors
3. Check "Network" tab for API calls

### Test API Directly
```powershell
node test-api.js
```

### View Chat History
Open browser console and run:
```javascript
exportChat()
```

## Next Steps

1. ✅ Get Groq API key
2. ✅ Create .env file
3. ✅ Run npm install
4. ✅ Start server (npm start)
5. ✅ Open index.html
6. 🎉 **You're ready!**

## Customization Ideas

### Change the AI Model
Edit `server.js`, find this line:
```javascript
model: 'mixtral-8x7b-32768',
```

Available models on Groq:
- `mixtral-8x7b-32768` (fastest)
- `llama-3.1-70b-versatile` (most powerful)
- `llama2-70b-chat`
- `gemma-7b-it` (smallest)

### Add Custom Knowledge
Edit the `SYSTEM_PROMPT` in `server.js` to add specific instructions about your monasteries.

### Change Colors/Styling
Edit `styles.css` to customize the appearance:
```css
/* Main color gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modify the Welcome Message
Edit the initial message in `index.html`.

## Deployment

When ready to deploy:

### Backend
- **Railway** (easiest, free tier)
- **Render** (good for Node.js)
- **Heroku** (popular)
- **AWS/Azure** (scalable)

### Frontend
- **Vercel** (free, fast)
- **Netlify** (free)
- **GitHub Pages** (simple)

[See README.md for deployment instructions]

## Support

- 📖 Read `README.md` for full documentation
- 🔗 Groq Docs: https://console.groq.com/docs
- 🚀 Express Docs: https://expressjs.com/
- 💬 Test with `node test-api.js`

---

## Quick Reference

```powershell
# Install dependencies
npm install

# Start server
npm start

# Development (auto-reload)
npm run dev

# Test API
node test-api.js
```

**Everything is set up and ready to go!** 🎉

Start the server, open index.html, and enjoy your Sikkim Monasteries Chatbot!
