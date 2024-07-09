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

export const providerLabels: Record<ProviderId, string> = {
  openai: 'OpenAI',
  azure: 'Azure',
  anthropic: 'Anthropic',
  google: 'Google',
  mistral: 'Mistral',
  cohere: 'Cohere',
  groq: 'Groq',
  perplexity: 'Perplexity',
  fireworks: 'Fireworks',
}
