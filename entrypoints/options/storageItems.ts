import { ProviderId } from "./constants/provider"

export const promptTemplateItem = storage.defineItem('sync: promptTemplate', {
  defaultValue: t('default_prompt_template')
})

export type ModelConfig = {
  modelId: string,
  providerId: ProviderId,
  displayName: string,
  enabled: boolean
}
export const modelConfigsItem = storage.defineItem<ModelConfig[]>('sync:modelConfigs', {
  defaultValue: [
    // OpenAI
    { modelId: 'gpt-4o', providerId: 'openai', displayName: 'GPT-4o', enabled: false },
    { modelId: 'gpt-4-turbo', providerId: 'openai', displayName: 'GPT-4 Turbo', enabled: false },
    { modelId: 'gpt-4', providerId: 'openai', displayName: 'GPT-4', enabled: false },
    { modelId: 'gpt-3.5-turbo', providerId: 'openai', displayName: 'GPT-3.5 Turbo', enabled: false },

    // Anthropic
    { modelId: 'claude-3-opus-20240229', providerId: 'anthropic', displayName: 'Claude 3 Opus', enabled: false },
    { modelId: 'claude-3-5-sonnet-20240620', providerId: 'anthropic', displayName: 'Claude 3.5 Sonnet', enabled: false },
    { modelId: 'claude-3-sonnet-20240229', providerId: 'anthropic', displayName: 'Claude 3 Sonnet', enabled: false },
    { modelId: 'claude-3-haiku-20240307', providerId: 'anthropic', displayName: 'Claude 3 Haiku', enabled: false },

    // Google
    { modelId: 'models/gemini-1.5-flash-latest', providerId: 'google', displayName: 'Gemini 1.5 Flash', enabled: false },
    { modelId: 'models/gemini-1.5-pro-latest', providerId: 'google', displayName: 'Gemini 1.5 Pro', enabled: false },
    { modelId: 'models/gemini-pro', providerId: 'google', displayName: 'Gemini 1.0 Pro', enabled: false },

    // Mistral
    { modelId: 'open-mistral-7b', providerId: 'mistral', displayName: 'Mistral 7B', enabled: false },
    { modelId: 'open-mixtral-8x7b', providerId: 'mistral', displayName: 'Mixtral 8x7B', enabled: false },
    { modelId: 'open-mixtral-8x22b', providerId: 'mistral', displayName: 'Mixtral 8x22B', enabled: false },
    { modelId: 'mistral-small-latest', providerId: 'mistral', displayName: 'Mistral Small', enabled: false },
    { modelId: 'mistral-medium-latest', providerId: 'mistral', displayName: 'Mistral Medium', enabled: false },
    { modelId: 'mistral-large-latest', providerId: 'mistral', displayName: 'Mistral Large', enabled: false },

    // Cohere
    { modelId: 'command-r-plus', providerId: 'cohere', displayName: 'Command R+', enabled: false },
    { modelId: 'command-r', providerId: 'cohere', displayName: 'Command R', enabled: false },
    { modelId: 'command', providerId: 'cohere', displayName: 'Command', enabled: false },
    { modelId: 'command-light', providerId: 'cohere', displayName: 'Command Light', enabled: false },

    // Groq
    { modelId: 'llama3-8b-8192', providerId: 'groq', displayName: 'Groq LLaMA3 8b', enabled: false },
    { modelId: 'llama3-70b-8192', providerId: 'groq', displayName: 'Groq LLaMA3 70b', enabled: false },
    { modelId: 'mixtral-8x7b-32768', providerId: 'groq', displayName: 'Groq Mixtral 8x7b', enabled: false },
    { modelId: 'gemma-7b-it', providerId: 'groq', displayName: 'Groq Gemma 7b', enabled: false },
    { modelId: 'gemma2-9b-it', providerId: 'groq', displayName: 'Groq Gemma2 9b', enabled: false },
    { modelId: 'whisper-large-v3', providerId: 'groq', displayName: 'Groq Whisper', enabled: false },

    // Perplexity
    { modelId: 'llama-3-sonar-small-32k-chat', providerId: 'perplexity', displayName: 'Perplexity Llama3 Sonar Small Chat', enabled: false },
    { modelId: 'llama-3-sonar-small-32k-online', providerId: 'perplexity', displayName: 'Perplexity Llama3 Sonar Small Online', enabled: false },
    { modelId: 'llama-3-sonar-large-32k-chat', providerId: 'perplexity', displayName: 'Perplexity Llama3 Sonar Large Chat', enabled: false },
    { modelId: 'llama-3-sonar-large-32k-online', providerId: 'perplexity', displayName: 'Perplexity Llama3 Sonar Large Online', enabled: false },
    { modelId: 'llama-3-8b-instruct', providerId: 'perplexity', displayName: 'Perplexity Llama3 8B Instruct', enabled: false },
    { modelId: 'llama-3-70b-instruct', providerId: 'perplexity', displayName: 'Perplexity Llama3 70B Instruct', enabled: false },
    { modelId: 'mixtral-8x7b-instruct', providerId: 'perplexity', displayName: 'Perplexity Mixtral 8x7B', enabled: false },

    // Fireworks
    { modelId: 'accounts/fireworks/models/firefunction-v2', providerId: 'fireworks', displayName: 'Firefunction V2', enabled: false },
    { modelId: 'accounts/fireworks/models/firefunction-v1', providerId: 'fireworks', displayName: 'Firefunction V1', enabled: false },
    { modelId: 'accounts/fireworks/models/bleat-adapter', providerId: 'fireworks', displayName: 'Fireworks Bleat', enabled: false },
    { modelId: 'accounts/fireworks/models/dbrx-instruct', providerId: 'fireworks', displayName: 'Fireworks DBRX Instruct', enabled: false },
  ]
})

export type ProviderConfig = {
  providerId: ProviderId,
  apiKey: string,
}
export const providerConfigsItem = storage.defineItem<ProviderConfig[]>('local:providerConfigs', {
  defaultValue: []
})
