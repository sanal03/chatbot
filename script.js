const API_URL = 'http://localhost:5000/api';

let messageHistory = [];

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Send Message Function
async function sendMessage() {
  const message = messageInput.value.trim();

  if (!message) return;

  // Add user message to chat
  addMessage(message, 'user');
  messageInput.value = '';
  messageInput.focus();

  // Show loading indicator
  setLoading(true);
  clearError();

  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get response from chatbot');
    }

    if (data.success) {
      addMessage(data.message, 'bot');
      messageHistory.push({
        user: message,
        bot: data.message,
        timestamp: data.timestamp
      });
    } else {
      throw new Error(data.error || 'Unknown error occurred');
    }
  } catch (error) {
    console.error('Error:', error);
    
    let errorText = error.message;
    if (error.message.includes('Failed to fetch')) {
      errorText = 'Cannot connect to chatbot API. Make sure the server is running on http://localhost:5000';
    }
    
    showError(errorText);
    addMessage(`❌ ${errorText}`, 'bot');
  } finally {
    setLoading(false);
  }
}

// Add Message to Chat
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  
  // Format text as markdown-like content
  contentDiv.innerHTML = formatMessage(text);

  const timeSpan = document.createElement('span');
  timeSpan.className = 'message-time';
  timeSpan.textContent = formatTime(new Date());

  messageDiv.appendChild(contentDiv);
  messageDiv.appendChild(timeSpan);

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Format Message (simple markdown support)
function formatMessage(text) {
  // Escape HTML
  text = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  // Convert line breaks to <br>
  text = text.replace(/\n/g, '<br>');

  // Convert **bold** to <strong>
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert *italic* to <em>
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Convert markdown lists
  text = text.replace(/^- (.*?)$/gm, '<li>$1</li>');
  text = text.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');

  return text;
}

// Format Time
function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Loading State
function setLoading(isLoading) {
  sendBtn.disabled = isLoading;
  messageInput.disabled = isLoading;

  if (isLoading) {
    loadingIndicator.classList.remove('hidden');
  } else {
    loadingIndicator.classList.add('hidden');
  }
}

// Error Handling
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}

function clearError() {
  errorMessage.classList.add('hidden');
  errorMessage.textContent = '';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Sikkim Monasteries Chatbot loaded');
  console.log(`API URL: ${API_URL}`);
  
  // Check API health
  checkAPIHealth();
});

// Check API Health
async function checkAPIHealth() {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
    });
    
    if (response.ok) {
      console.log('✓ API is healthy and running');
    } else {
      console.warn('⚠ API responded with status:', response.status);
    }
  } catch (error) {
    console.warn('⚠ Cannot connect to API:', error.message);
    console.warn('Make sure the server is running: npm start');
  }
}

// Export message history (for debugging)
function exportChat() {
  const chatContent = messageHistory
    .map(msg => `User: ${msg.user}\n\nBot: ${msg.bot}\n---\n`)
    .join('\n');
  console.log('Chat History:', chatContent);
}

// Clear chat (for debugging)
function clearChat() {
  if (confirm('Are you sure you want to clear the chat?')) {
    chatMessages.innerHTML = '';
    messageHistory = [];
    location.reload();
  }
}
