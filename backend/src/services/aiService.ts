import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Call an AI provider with the given message and return the text response.
 */
export async function callAI(
    provider: string,
    model: string,
    systemPrompt: string,
    userMessage: string
): Promise<string> {
    switch (provider.toLowerCase()) {
        case 'openai':
            return callOpenAI(model, systemPrompt, userMessage);
        case 'anthropic':
            return callAnthropic(model, systemPrompt, userMessage);
        case 'gemini':
            return callGemini(model, systemPrompt, userMessage);
        default:
            throw new Error(`Unknown AI provider: ${provider}`);
    }
}

async function callOpenAI(model: string, systemPrompt: string, userMessage: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is not set in environment variables');

    const client = new OpenAI({ apiKey });
    const response = await client.chat.completions.create({
        model: model || 'gpt-4o-mini',
        messages: [
            { role: 'system', content: systemPrompt || 'You are a helpful WhatsApp assistant. Reply concisely.' },
            { role: 'user', content: userMessage },
        ],
        max_tokens: 500,
    });

    return response.choices[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.';
}

async function callAnthropic(model: string, systemPrompt: string, userMessage: string): Promise<string> {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set in environment variables');

    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
        model: model || 'claude-3-haiku-20240307',
        max_tokens: 500,
        system: systemPrompt || 'You are a helpful WhatsApp assistant. Reply concisely.',
        messages: [{ role: 'user', content: userMessage }],
    });

    const block = response.content[0];
    if (block.type === 'text') return block.text.trim();
    return 'Sorry, I could not generate a response.';
}

async function callGemini(model: string, systemPrompt: string, userMessage: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set in environment variables');

    const genAI = new GoogleGenerativeAI(apiKey);
    const geminiModel = genAI.getGenerativeModel({
        model: model || 'gemini-1.5-flash',
        systemInstruction: systemPrompt || 'You are a helpful WhatsApp assistant. Reply concisely.',
    });

    const result = await geminiModel.generateContent(userMessage);
    return result.response.text().trim() || 'Sorry, I could not generate a response.';
}
