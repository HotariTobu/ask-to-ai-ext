import { createOpenAI } from "@ai-sdk/openai";
import { ProviderId } from "../options/constants/provider";
import { createAzure } from "@ai-sdk/azure";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createMistral } from "@ai-sdk/mistral";
import { createCohere } from "@ai-sdk/cohere";

const providers = {
  'openai': createOpenAI,
  'azure': createAzure,
  'anthropic': createAnthropic,
  'google': createGoogleGenerativeAI,
  'mistral': createMistral,
  'cohere': createCohere,
  'groq': createOpenAI,
  'perplexity': createOpenAI,
  'fireworks': createOpenAI,
} satisfies Record<ProviderId, unknown>

const baseURLs: Partial<Record<ProviderId, string>> = {
  groq: 'https://api.groq.com/openai/v1',
  perplexity: 'https://api.perplexity.ai/',
  fireworks: 'https://api.fireworks.ai/inference/v1',
}

export const createProvider = (providerId: ProviderId, apiKey: string) => {
  return providers[providerId]({
    baseURL: baseURLs[providerId],
    apiKey,
  })
}
