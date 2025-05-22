import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { functions as functionSchemas, getCurrentWeather, getLocation } from "./tools";

const token = import.meta.env.VITE_OPENAI_API_KEY;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

const functionMap: Record<string, Function> = {
  getCurrentWeather,
  getLocation,
};

export async function main(messages: any[]) {
  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token!),
  );

  // Prepare function schemas for OpenAI API
  const openAIFunctions = functionSchemas.map(f => ({
    name: f.function.name,
    parameters: f.parameters,
  }));

  // 1st request: with functions
  let response = await client.path("/chat/completions").post({
    body: {
      messages,
      temperature: 1.0,
      top_p: 1.0,
      model: model,
      functions: openAIFunctions,
    }as any
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const choice = response.body.choices?.[0];
  if (choice?.finish_reason === "function_call" && "function_call" in (choice.message as any)) {
    // Function call requested
    const { name, arguments: args } = (choice.message as any).function_call;
    const func = functionMap[name];
    if (func) {
      let parsedArgs = {};
      try { parsedArgs = JSON.parse(args); } catch {}
      const functionResult = await func(parsedArgs);
      // Add function response to messages
      const followupMessages = [
        ...messages,
        {
          role: "assistant",
          content: null,
          function_call: { name, arguments: args },
        },
        {
          role: "function",
          name,
          content: functionResult,
        },
      ];
      // 2nd request: send function result
      response = await client.path("/chat/completions").post({
        body: {
          messages: followupMessages,
          temperature: 1.0,
          top_p: 1.0,
          model: model,
        }
      });
      if (isUnexpected(response)) {
        throw response.body.error;
      }
      return response.body;
    }
  }
  return response.body;
}

export const initialMessages = [
  {
    role: "system" as "system",
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



