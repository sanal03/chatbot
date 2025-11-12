# 🔌 API Documentation & Testing Guide

## Overview

The Sikkim Monasteries Chatbot has a simple but powerful REST API built with Express.js and Groq AI.

---

## 📡 API Endpoints

### 1. Chat Endpoint (Main)

**POST** `/api/chat`

Send a message and get an AI response about Sikkim monasteries.

#### Request
```json
{
  "message": "Tell me about Rumtek Monastery"
}
```

#### Response (Success)
```json
{
  "success": true,
  "message": "Rumtek Monastery is the official seat of the Gyalwang Karmapa...",
  "timestamp": "2024-11-12T10:30:00.000Z"
}
```

#### Response (Error)
```json
{
  "success": false,
  "error": "GROQ_API_KEY is not configured"
}
```

#### Status Codes
- `200 OK` - Request successful
- `400 Bad Request` - Missing message field
- `500 Internal Server Error` - Server error or API issue

#### Example using JavaScript
```javascript
const response = await fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    message: 'Tell me about Enchey Monastery' 
  }),
});

const data = await response.json();
console.log(data.message);
```

#### Example using PowerShell
```powershell
$body = @{
    message = "What are the main monasteries in Sikkim?"
} | ConvertTo-Json

Invoke-WebRequest -Uri 'http://localhost:5000/api/chat' `
  -Method Post `
  -Headers @{'Content-Type'='application/json'} `
  -Body $body
```

#### Example using CURL
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about Pemayangtse Monastery"}'
```

---

### 2. Health Check Endpoint

**GET** `/api/health`

Check if the API server is running.

#### Response
```json
{
  "status": "OK",
  "message": "Chatbot API is running"
}
```

#### Example
```javascript
fetch('http://localhost:5000/api/health')
  .then(res => res.json())
  .then(data => console.log(data.status)); // "OK"
```

---

### 3. Feedback Endpoint

**POST** `/api/feedback`

Send feedback about the chatbot's responses.

#### Request
```json
{
  "message": "Tell me about Rumtek Monastery",
  "feedback": "Great explanation! Very helpful.",
  "helpful": true
}
```

#### Response
```json
{
  "success": true,
  "message": "Thank you for your feedback!"
}
```

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| message | string | ✓ | The original user message |
| feedback | string | Optional | User's feedback text |
| helpful | boolean | Optional | Whether the response was helpful |

---

## 🧪 Testing the API

### Method 1: Using the Test Script

```powershell
node test-api.js
```

This runs all three endpoints and shows results.

### Method 2: Using Browser Console

Open `index.html` in your browser and press F12 to open the console, then:

```javascript
// Test chat endpoint
fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello!' })
})
.then(r => r.json())
.then(d => console.log(d));
```

### Method 3: Using Postman

1. Open [Postman](https://www.postman.com/downloads/)
2. Create new POST request
3. URL: `http://localhost:5000/api/chat`
4. Body (JSON):
   ```json
   {
     "message": "Tell me about Sikkim monasteries"
   }
   ```
5. Click Send

### Method 4: Using VS Code REST Client Extension

1. Install "REST Client" extension in VS Code
2. Create file `test.http`:

```http
### Test Chat Endpoint
POST http://localhost:5000/api/chat
Content-Type: application/json

{
  "message": "Tell me about Enchey Monastery"
}

### Test Health Check
GET http://localhost:5000/api/health

### Test Feedback
POST http://localhost:5000/api/feedback
Content-Type: application/json

{
  "message": "Original message",
  "feedback": "Great response!",
  "helpful": true
}
```

3. Click "Send Request" above each endpoint

---

## 🔄 Request/Response Flow

```
User Browser
    ↓
    ├─→ Sends message via UI
    ├─→ script.js handles UI
    │
    ↓
Express.js Server (localhost:5000)
    ├─→ Receives POST /api/chat
    ├─→ Validates message
    ├─→ Calls Groq API
    │
    ↓
Groq AI Service
    ├─→ Processes message
    ├─→ Uses system prompt
    ├─→ Generates response
    │
    ↓
Express.js Server
    ├─→ Formats response
    ├─→ Returns JSON
    │
    ↓
User Browser
    ├─→ Receives response
    ├─→ script.js displays in chat
    └─→ User sees AI response
```

---

## ⚡ Performance Tips

### Request Optimization
- **Keep messages concise** for faster responses
- **First request is slowest** (model load)
- **Subsequent requests are faster**
- Average response time: 2-5 seconds

### Response Settings (in server.js)
```javascript
// Faster but less detailed
max_tokens: 512

// Balanced (current)
max_tokens: 1024

// More detailed but slower
max_tokens: 2048
```

### Temperature Settings
```javascript
// More factual, consistent
temperature: 0.3

// Balanced (current)
temperature: 0.7

// More creative, varied
temperature: 1.2
```

---

## 🚨 Error Handling

### Common Errors

#### 1. API Key Not Configured
```json
{
  "error": "GROQ_API_KEY is not configured"
}
```
**Fix**: Add your API key to `.env` and restart server

#### 2. Rate Limited
```json
{
  "error": "Rate limit exceeded. Please try again later."
}
```
**Fix**: Wait a few moments before sending next message

#### 3. Network Error
```json
{
  "error": "Cannot connect to API"
}
```
**Fix**: Ensure server is running: `npm start`

#### 4. Invalid Message
```json
{
  "error": "Message is required"
}
```
**Fix**: Include `message` field in request body

#### 5. Timeout
```json
{
  "error": "Request timeout. Please try again."
}
```
**Fix**: Try again, or reduce `max_tokens` setting

---

## 📊 API Specifications

### Base URL
```
http://localhost:5000
```

### Authentication
None required for development. For production, add:
- API key authentication
- JWT tokens
- OAuth 2.0

### Rate Limiting
None in development. For production, implement:
- Per-IP limits (e.g., 100 requests/15 minutes)
- Per-user limits
- Cost-based throttling

### CORS Configuration
```
Allowed Origin: http://localhost:3000
Allowed Methods: GET, POST
Allowed Headers: Content-Type
```

### Response Format
All responses are JSON with this structure:
```json
{
  "success": boolean,
  "message": "Response text or error message",
  "error": "Error message (if success: false)",
  "timestamp": "ISO 8601 timestamp"
}
```

---

## 🔐 Security Considerations

### Development (Current)
- ✅ CORS enabled for localhost
- ✅ No authentication required
- ✅ API key in environment variable
- ⚠️ Detailed error messages shown

### Production (Recommended)
- ✅ CORS restricted to domain
- ✅ Add API authentication
- ✅ Use HTTPS/SSL
- ✅ Implement rate limiting
- ✅ Monitor API costs
- ✅ Log all requests
- ✅ Hide detailed error messages
- ✅ Validate all inputs
- ✅ Add request signing
- ✅ Use API Gateway

---

## 📈 Scaling the API

### For More Users
1. **Use a reverse proxy** (Nginx)
2. **Add caching** (Redis)
3. **Implement load balancing**
4. **Use database** (MongoDB, PostgreSQL)
5. **Add queue system** (Bull, RabbitMQ)
6. **Monitor performance** (New Relic, Datadog)

### Database Integration
```javascript
// Example: Save conversations
const conversation = {
  userId: 'user123',
  messages: [
    { role: 'user', content: 'message' },
    { role: 'bot', content: 'response' }
  ],
  createdAt: new Date(),
  helpful: true
};
```

### Caching Strategy
```javascript
// Cache responses for 1 hour
const CACHE_TTL = 3600;
cache.set(message, response, CACHE_TTL);
```

---

## 🧪 Test Cases

### Test 1: Basic Chat
```
Input: "Hello"
Expected: AI response about greeting or monasteries
Status: ✓
```

### Test 2: Monastery Query
```
Input: "Tell me about Rumtek Monastery"
Expected: Detailed information about Rumtek
Status: ✓
```

### Test 3: Invalid Input
```
Input: ""
Expected: Error message about missing message
Status: ✓
```

### Test 4: API Down
```
Condition: Server not running
Expected: Connection error
Status: ✓
```

### Test 5: Rate Limit
```
Input: Multiple requests rapidly
Expected: Rate limit error after limit
Status: ✓ (with rate limiting enabled)
```

---

## 📚 Integration Examples

### React Frontend
```javascript
const [response, setResponse] = useState('');

const sendMessage = async (message) => {
  const res = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  setResponse(data.message);
};
```

### Vue.js Frontend
```javascript
methods: {
  async sendMessage(message) {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    this.botResponse = data.message;
  }
}
```

### Python Backend
```python
import requests

response = requests.post(
    'http://localhost:5000/api/chat',
    json={'message': 'Tell me about monasteries'}
)
data = response.json()
print(data['message'])
```

---

## 🎯 API Monitoring

### Health Checks
```javascript
// Check every 30 seconds
setInterval(() => {
  fetch('http://localhost:5000/api/health')
    .then(r => r.json())
    .then(d => console.log('API Status:', d.status))
    .catch(e => console.error('API Down!'));
}, 30000);
```

### Error Tracking
```javascript
// Log all errors
fetch(url).catch(error => {
  console.error('API Error:', {
    message: error.message,
    timestamp: new Date(),
    url: url
  });
  // Send to monitoring service
});
```

---

## 📞 Support

- **API Docs**: This file
- **Groq Docs**: https://console.groq.com/docs
- **Express Docs**: https://expressjs.com/
- **Test Script**: `node test-api.js`

---

**Ready to build amazing integrations!** 🚀
