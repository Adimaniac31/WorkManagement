import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let conversationHistory = [];

export const chat = async (req, res) => {
  try {
    const { userMessage } = req.body;

    if (!userMessage) {
      return res.status(400).send('User message is required.');
    }

    // Add the user message to the conversation history
    conversationHistory.push({ role: 'user', content: userMessage });

    // Request a completion from OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: conversationHistory,
    });

    // Extract the AI message from the response
    const aiMessage = response.choices[0].message.content;

    // Add the AI message to the conversation history
    conversationHistory.push({ role: 'assistant', content: aiMessage });

    // Send the AI message back to the client
    res.json({ aiMessage });

  } catch (error) {
    if (error.code === 'insufficient_quota') {
      res.status(429).send('Quota exceeded, please try again later.');
    } else if (error.response && error.response.status === 404) {
      res.status(404).send('Model not found or not accessible.');
    } else {
      console.error('Error communicating with OpenAI:', error);
      res.status(500).send('Internal Server Error');
    }
  }
};

export const reset = (req, res) => {
  conversationHistory = [];
  res.send('Conversation history reset.');
};



