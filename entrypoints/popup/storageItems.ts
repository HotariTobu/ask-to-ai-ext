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

type AiConfig = {
  providerId: ProviderId,
  apiKey: string,
}
export const aiConfigsItem = storage.defineItem('local:aiConfigs', {
  defaultValue: [] as AiConfig[]
})
