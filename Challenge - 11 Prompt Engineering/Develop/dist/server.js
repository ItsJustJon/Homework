import dotenv from 'dotenv';
import express from 'express';
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { StructuredOutputParser } from 'langchain/output_parsers';
dotenv.config();
const port = process.env.PORT || 3001;
const apiKey = process.env.OPENAI_API_KEY;
// Ensure API key is present
if (!apiKey) {
    console.error('OPENAI_API_KEY is not defined. Exiting...');
    process.exit(1);
}
const model = new OpenAI({
    temperature: 0.7,
    openAIApiKey: apiKey,
    modelName: 'gpt-4',
    maxTokens: 500,
});
const app = express();
app.use(express.json());
// Define the schema for structured output
const forecastSchema = z.object({
    forecast: z.array(z.object({
        date: z.string(),
        description: z.string(),
    })),
});
// Create a structured output parser
const parser = StructuredOutputParser.fromZodSchema(forecastSchema);
let promptTemplate = null;
// Function to initialize prompt template
const initializePromptTemplate = async () => {
    const formatInstructions = await parser.getFormatInstructions();
    promptTemplate = new PromptTemplate({
        template: `Pretty please, provide a 5-day weather forecast for {location} in the voice of a sports commentator, someone sassy like Shaquille O'Neill meets Shannon Sharpe. Format your response as JSON using these instructions: {format_instructions}`,
        inputVariables: ["location"],
        partialVariables: { format_instructions: formatInstructions },
    });
    console.log("Prompt template initialized.");
};
// Function to generate the AI response
const getForecast = async (location) => {
    try {
        if (!promptTemplate) {
            throw new Error("Server not ready. Try again later.");
        }
        const formattedPrompt = await promptTemplate.format({ location });
        // Call the OpenAI model
        const response = await model.call(formattedPrompt);
        // Parse the response into structured JSON
        return await parser.parse(response);
    }
    catch (error) {
        console.error('Error generating forecast:', error);
        return { error: 'Failed to retrieve forecast.' };
    }
};
// API Endpoint
app.post('/forecast', async (req, res) => {
    try {
        const location = req.body.location;
        if (!location) {
            return res.status(400).json({ error: 'Please provide a location.' });
        }
        const forecast = await getForecast(location);
        res.json(forecast);
        return forecast;
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
        return error;
    }
});
// Start the server **after** initialization
const startServer = async () => {
    await initializePromptTemplate(); // Ensure prompt template is initialized
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};
startServer();
