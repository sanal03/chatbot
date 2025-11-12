/**
 * Configuration Guide for Sikkim Monasteries Chatbot
 * 
 * This file explains how to customize the chatbot for your needs
 */

// ============================================
// 1. SYSTEM PROMPT - Customize AI Knowledge
// ============================================

const CUSTOM_SYSTEM_PROMPT = `You are an expert travel guide assistant specialized in Sikkim monasteries and Buddhist culture. 

EXPERTISE AREAS:
- Rumtek Monastery (Karmapa's official seat)
- Enchey Monastery (meditation center)
- Pemayangtse Monastery (ancient monastery)
- Taktsang Monastery
- Dubdi Monastery
- Kali Temple
- Gangtok attractions

INFORMATION YOU PROVIDE:
- Monastery locations and directions
- Opening hours and entrance fees
- Best times to visit
- Local transportation options
- Accommodation recommendations
- Local food and dining
- Photography guidelines
- Cultural etiquette and dress codes
- Buddhist traditions and practices
- Trek routes and difficulty levels

TONE:
- Friendly and engaging
- Respectful of Buddhist culture
- Helpful and practical
- Honest about limitations
- Encouraging sustainable tourism

GUIDELINES:
- Always mention respect for local customs
- Suggest official websites for current information
- Recommend local guides when appropriate
- Include safety information
- Mention seasonal weather conditions`;

// ============================================
// 2. AI MODEL SELECTION
// ============================================

const MODEL_OPTIONS = {
  // Fastest - Great for real-time responses
  FAST: 'mixtral-8x7b-32768',
  
  // Balanced - Good quality and speed
  BALANCED: 'llama-3.1-70b-versatile',
  
  // Most Powerful - Best quality but slightly slower
  POWERFUL: 'llama2-70b-chat',
  
  // Lightweight - Smallest, fastest, good for simple queries
  LIGHTWEIGHT: 'gemma-7b-it'
};

// Current setting in server.js: mixtral-8x7b-32768
// To change: Edit server.js line where model is defined

// ============================================
// 3. API RESPONSE TUNING
// ============================================

const API_PARAMETERS = {
  // How creative/varied the responses should be (0.0 - 2.0)
  // Lower (0.3-0.5) = More consistent, factual
  // Higher (0.8-1.2) = More creative, varied
  temperature: 0.7,
  
  // Maximum response length in tokens
  // 512 = short responses (fast)
  // 1024 = medium responses (balanced)
  // 2048 = long responses (detailed)
  max_tokens: 1024,
  
  // Limits diversity of word choices
  // Lower = more focused
  // Higher = more diverse
  top_p: 0.9
};

// Current settings in server.js: temperature 0.7, max_tokens 1024

// ============================================
// 4. MONASTERY DATABASE
// ============================================

const MONASTERIES = {
  rumtek: {
    name: 'Rumtek Monastery',
    altitude: '1600m',
    location: 'East Sikkim',
    established: '1960s (rebuilt)',
    significance: 'Official seat of the Gyalwang Karmapa',
    visitingHours: '8 AM - 5 PM',
    entryFee: 'Free (donations welcome)',
    bestTime: 'March-May, September-November',
    attractions: ['Golden stupa', 'Monastic school', 'Prayer halls'],
    photography: 'Allowed outside sacred areas'
  },
  
  enchey: {
    name: 'Enchey Monastery',
    altitude: '1800m',
    location: 'Gangtok',
    established: '1840',
    significance: 'Important meditation center',
    visitingHours: '9 AM - 4 PM',
    entryFee: 'Free',
    bestTime: 'October-November',
    attractions: ['Prayer wheels', 'Ancient murals', 'Meditation halls'],
    photography: 'Allowed (be respectful)'
  },
  
  pemayangtse: {
    name: 'Pemayangtse Monastery',
    altitude: '2100m',
    location: 'West Sikkim',
    established: '1705',
    significance: 'One of the oldest monasteries',
    visitingHours: '8 AM - 5 PM',
    entryFee: 'Donation based',
    bestTime: 'April-May, September-October',
    attractions: ['Ancient wooden statue', 'Prayer halls', 'Library'],
    photography: 'Ask permission before photographing'
  }
};

// ============================================
// 5. FRONTEND CUSTOMIZATION
// ============================================

const FRONTEND_SETTINGS = {
  // Color scheme (edit in styles.css)
  PRIMARY_COLOR: '#667eea',
  SECONDARY_COLOR: '#764ba2',
  
  // Chat settings
  SHOW_TIMESTAMPS: true,
  AUTO_SCROLL: true,
  MESSAGE_ANIMATION: true,
  
  // Behavior
  AUTO_CONNECT_API: true,
  SHOW_TYPING_INDICATOR: true,
  STORE_CHAT_HISTORY: true,
  
  // Text
  BOT_NAME: 'Sikkim Monasteries Guide',
  WELCOME_MESSAGE: 'Welcome to Sikkim Monasteries Travel Guide! 🙏'
};

// ============================================
// 6. SERVER CONFIGURATION
// ============================================

const SERVER_CONFIG = {
  PORT: 5000,
  NODE_ENV: 'development',
  
  // CORS settings
  CORS_ORIGIN: 'http://localhost:3000',
  
  // Rate limiting (for production)
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100 // requests per window
  },
  
  // Logging
  LOG_LEVEL: 'info',
  LOG_REQUESTS: true
};

// ============================================
// 7. ERROR HANDLING CUSTOMIZATION
// ============================================

const ERROR_MESSAGES = {
  NO_API_KEY: 'API key not configured. Please set GROQ_API_KEY in .env',
  RATE_LIMITED: 'Too many requests. Please wait a moment before trying again.',
  API_ERROR: 'Unable to get a response. Please try again.',
  NETWORK_ERROR: 'Network connection error. Check your internet.',
  TIMEOUT: 'Request took too long. Please try again.',
  INVALID_INPUT: 'Please enter a valid message.'
};

// ============================================
// 8. KNOWLEDGE BASE ENHANCEMENT
// ============================================

const KNOWLEDGE_BASE = {
  // Add common questions and answers
  FAQ: [
    {
      question: 'What is the best time to visit Sikkim?',
      answer: 'March to May (spring) and September to November (autumn) are ideal.'
    },
    {
      question: 'Do I need a permit to visit monasteries?',
      answer: 'Most monasteries don\'t require permits, but some remote areas might.'
    },
    {
      question: 'What should I wear when visiting?',
      answer: 'Dress modestly. Cover shoulders and knees. Remove shoes in prayer halls.'
    }
  ],
  
  // Common conversation starters
  SUGGESTIONS: [
    'Tell me about Rumtek Monastery',
    'Best monasteries to visit in Sikkim',
    'What to know about Buddhist culture?',
    'How to reach monasteries from Gangtok?',
    'Best trekking routes in Sikkim',
    'Local cuisine recommendations'
  ],
  
  // Helpful links
  RESOURCES: [
    { name: 'Sikkim Tourism', url: 'https://sikkimtourism.gov.in' },
    { name: 'Rumtek Monastery', url: 'https://rumtek.org' },
    { name: 'UNESCO Kumbhalgarh', url: 'https://en.unesco.org' }
  ]
};

// ============================================
// 9. ANALYTICS & TRACKING
// ============================================

const ANALYTICS = {
  // Track popular questions
  TRACK_QUESTIONS: true,
  
  // Store feedback
  STORE_FEEDBACK: true,
  
  // Log errors for debugging
  LOG_ERRORS: true,
  
  // Track response times
  MEASURE_PERFORMANCE: true
};

// ============================================
// 10. DEPLOYMENT CONFIGURATION
// ============================================

const DEPLOYMENT = {
  // Production settings
  PRODUCTION: {
    LOG_LEVEL: 'error',
    CACHE_RESPONSES: true,
    ENABLE_RATE_LIMITING: true,
    ENABLE_HTTPS: true,
    SESSION_TIMEOUT: 30 * 60 * 1000 // 30 minutes
  },
  
  // Development settings
  DEVELOPMENT: {
    LOG_LEVEL: 'info',
    CACHE_RESPONSES: false,
    ENABLE_RATE_LIMITING: false,
    DEBUG_MODE: true,
    MOCK_RESPONSES: false
  }
};

// ============================================
// HOW TO USE THESE CONFIGURATIONS
// ============================================

/*
1. CHANGE AI MODEL:
   - Edit server.js
   - Find: model: 'mixtral-8x7b-32768',
   - Change to: model: MODEL_OPTIONS.POWERFUL,

2. UPDATE SYSTEM PROMPT:
   - Edit server.js
   - Replace SYSTEM_PROMPT with CUSTOM_SYSTEM_PROMPT
   - Restart server

3. CUSTOMIZE COLORS:
   - Edit styles.css
   - Search for #667eea (primary) and #764ba2 (secondary)
   - Replace with your colors

4. ADD MONASTERY INFO:
   - Add to MONASTERIES object
   - Update SYSTEM_PROMPT to mention it

5. CHANGE ERROR MESSAGES:
   - Edit server.js error handling
   - Use ERROR_MESSAGES constants

6. DEPLOYMENT:
   - Use DEPLOYMENT.PRODUCTION for production
   - Set NODE_ENV=production in .env
   - Enable rate limiting
   - Configure HTTPS
*/

// ============================================
// QUICK CUSTOMIZATION CHECKLIST
// ============================================

const CUSTOMIZATION_CHECKLIST = [
  '[ ] Add your Groq API key to .env',
  '[ ] Choose preferred AI model',
  '[ ] Customize system prompt for your content',
  '[ ] Update monastery database',
  '[ ] Adjust response temperature (0.3-1.2)',
  '[ ] Customize color scheme',
  '[ ] Add your branding to welcome message',
  '[ ] Test with node test-api.js',
  '[ ] Configure CORS origin',
  '[ ] Set up analytics (optional)',
  '[ ] Configure rate limiting (production)',
  '[ ] Enable HTTPS (production)',
  '[ ] Deploy to your server'
];

module.exports = {
  CUSTOM_SYSTEM_PROMPT,
  MODEL_OPTIONS,
  API_PARAMETERS,
  MONASTERIES,
  FRONTEND_SETTINGS,
  SERVER_CONFIG,
  ERROR_MESSAGES,
  KNOWLEDGE_BASE,
  ANALYTICS,
  DEPLOYMENT,
  CUSTOMIZATION_CHECKLIST
};
