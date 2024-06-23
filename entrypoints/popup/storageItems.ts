export const providerIds = [
  'openai',
  'azure',
  'anthropic',
  'google',
  'mistral',
  'cohere',
  'groq',
  'perplexity',
  'fireworks',
] as const
export type ProviderId = (typeof providerIds)[number]
