#!/usr/bin/env node

/**
 * Simple API Test Script
 * Test the chatbot API without needing the frontend
 */

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('\n🧪 Sikkim Monasteries Chatbot - API Test');
  console.log('=====================================\n');

  // Test 1: Health Check
  console.log('1️⃣  Testing Health Check...');
  try {
    const healthResponse = await fetch(`${API_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check Passed:', healthData);
  } catch (error) {
    console.error('❌ Health Check Failed:', error.message);
    console.error('   Make sure the server is running: npm start');
    process.exit(1);
  }

  console.log('\n');

  // Test 2: Chat Message
  console.log('2️⃣  Testing Chat Endpoint...');
  const testMessage = 'Tell me about Rumtek Monastery in Sikkim';
  
  try {
    const chatResponse = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: testMessage }),
    });

    const chatData = await chatResponse.json();

    if (chatData.success) {
      console.log('✅ Chat Endpoint Working!');
      console.log('   User Message:', testMessage);
      console.log('   Bot Response:', chatData.message.substring(0, 100) + '...');
      console.log('   Timestamp:', chatData.timestamp);
    } else {
      console.error('❌ Chat Endpoint Error:', chatData.error);
    }
  } catch (error) {
    console.error('❌ Chat Request Failed:', error.message);
  }

  console.log('\n');

  // Test 3: Feedback Endpoint
  console.log('3️⃣  Testing Feedback Endpoint...');
  try {
    const feedbackResponse = await fetch(`${API_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Tell me about Enchey Monastery',
        feedback: 'Great response!',
        helpful: true,
      }),
    });

    const feedbackData = await feedbackResponse.json();

    if (feedbackData.success) {
      console.log('✅ Feedback Endpoint Working!');
      console.log('   Message:', feedbackData.message);
    } else {
      console.error('❌ Feedback Endpoint Error:', feedbackData.error);
    }
  } catch (error) {
    console.error('❌ Feedback Request Failed:', error.message);
  }

  console.log('\n=====================================');
  console.log('✨ API Test Complete!');
  console.log('\nYou can now:');
  console.log('1. Open index.html in your browser');
  console.log('2. Start asking about Sikkim monasteries');
  console.log('3. Check README.md for API documentation\n');
}

testAPI();
