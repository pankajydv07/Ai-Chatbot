# AI Chatbot

This project is an AI-powered chatbot built using React, TypeScript, and OpenAI's GPT-4o model. The chatbot provides a conversational interface for users to interact with an AI assistant.

## Features

- Real-time chat interface
- Streaming responses from OpenAI's GPT-4o model
- Automated function calling using OpenAI beta feature
- Error handling for API requests
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ai-chatbot.git
   cd ai-chatbot
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your OpenAI API key:

   ```properties
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run preview` - Preview the production build

## Project Structure

- `src/` - Contains the source code
  - `components/` - React components
  - `lib/` - Utility functions and API integrations
  - `App.tsx` - Main application component
- `.env` - Environment variables
- `package.json` - Project configuration and dependencies

## Dependencies

- React
- TypeScript
- Vite
- OpenAI API
- Tailwind CSS
- ESLint

## License

This project is licensed under the MIT License.
