import OpenAI from "openai";
import { getCurrentWeather, getLocation, functions } from "./tools";

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL:"https://models.inference.ai.azure.com",
  dangerouslyAllowBrowser: true,
});

export const availableFunctions = {
  getCurrentWeather,
  getLocation,
};

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