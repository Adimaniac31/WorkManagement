import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const chatWithHuggingFace = async (userMessage) => {
  try {
    const response = await hf.textGeneration({
      model: 'EleutherAI/gpt-neo-2.7B', // Replace with a preferred model
      inputs: userMessage,
      parameters: {
        max_length: 300, // Adjust based on the expected length of the response
        // temperature: 0.7,
      },
    });

    return response.generated_text || 'Error: No response from the AI';
  } catch (error) {
    console.error('Error in Hugging Face API call:', error);
    throw error;
  }
};
