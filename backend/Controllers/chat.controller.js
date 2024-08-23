import dotenv from 'dotenv';
import { chatWithHuggingFace } from '../Services/huggingFaceService.js';

dotenv.config();

let conversationHistory = [];

export const chat = async (req, res) => {
  try {
    const { userMessage } = req.body;

    // Append user message to the conversation history
    conversationHistory.push({ role: 'user', content: userMessage });

    // Call the Hugging Face API
    const aiResponse = await chatWithHuggingFace(userMessage);

    // Append AI response to the conversation history
    conversationHistory.push({ role: 'assistant', content: aiResponse });

    res.json({ aiMessage: aiResponse });
  } catch (error) {
    console.error('Error communicating with Hugging Face:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const resetConversation = (req, res) => {
  conversationHistory = [];
  res.send('Conversation history reset.');
};




