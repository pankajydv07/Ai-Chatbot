import OpenAI from "openai";

import { AzureKeyCredential } from "@azure/core-auth";
import { getCurrentWeather, getLocation, functions } from "./tools";

const token = import.meta.env.VITE_OPENAI_API_KEY;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

// Initialize the Azure client for GPT-4.1 model
const client = ModelClient(
  endpoint,
  new AzureKeyCredential(token),
);

// Set up available functions
export const availableFunctions = {
  getCurrentWeather,
  getLocation,
};

// Initial system messages for the AI model
export const initialMessages = [
  {
    role: "system",
    content: `
You are a helpful AI agent. Transform technical data into engaging, 
conversational responses, but only include the normal information a 
regular person might want unless they explicitly ask for more. Provide 
highly specific answers based on the information you're given. Prefer 
to gather information with the tools provided to you rather than 
giving basic, generic answers.
`,
  },
];

// Exporting a function to interact with the client
export async function interactWithModel(input) {
  // Use the client to interact with the model
  const response = await client.invokeModel({ model, input });
  return response;
}
