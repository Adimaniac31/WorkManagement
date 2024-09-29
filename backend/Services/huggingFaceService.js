import { HfInference } from '@huggingface/inference';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const chatWithHuggingFace = async (userMessage) => {
  try {
    const response = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1', // Replace with a preferred model
      inputs: userMessage
    });

    return response.generated_text || 'Error: No response from the AI';
  } catch (error) {
    console.error('Error in Hugging Face API call:', error);
    throw error;
  }
};
