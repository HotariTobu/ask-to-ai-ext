import { ProviderId } from "@/entrypoints/options/constants/provider"
import { modelConfigsItem, promptTemplateItem, providerConfigsItem } from "@/entrypoints/options/storageItems"
import { createProvider } from "../createProvider"
import { streamText } from 'ai'

const answers = new Map<string, Promise<string>>()

export type AnswerStream = {
  text: Promise<string>
  textStream?: AsyncIterable<string> | undefined
}
export type AnswerResult = Promise<AnswerStream | Error>

type AnswerItem = {
  id: string
  modelName: string
  result: AnswerResult
}

export const useAnswerItems = (text: string) => {
  const [answerItems, setAnswerItems] = useState<AnswerItem[]>([])

  useEffect(() => {
    Promise.all([
      providerConfigsItem.getValue(),
      promptTemplateItem.getValue(),
      modelConfigsItem.getValue(),
    ]).then(([providerConfigs, promptTemplate, modelConfigs]) => {
      const apiKeyMap = new Map(
        providerConfigs.map(
          ({ providerId, apiKey }) => [providerId, apiKey]
        )
      )

      const prompt = promptTemplate.replaceAll('$text', text)

      const getAnswer = async (providerId: ProviderId, modelId: string) => {
        const answerKey = JSON.stringify({
          providerId,
          modelId,
          prompt,
        })

        const cache = answers.get(answerKey)
        if (typeof cache !== 'undefined') {
          return {
            text: cache,
          }
        }

        const apiKey = apiKeyMap.get(providerId)
        if (typeof apiKey === 'undefined') {
          return new Error(`Missing api-key: ${providerId}`)
        }

        const provider = createProvider(providerId, apiKey)
        const model = provider(modelId)

        try {
          const { text, textStream } = await streamText({
            model,
            prompt,
          })

          answers.set(answerKey, text)

          return {
            text,
            textStream,
          }
        } catch (error) {
          if (error instanceof Error) {
            return error
          }
          else {
            return new Error(JSON.stringify(error))
          }
        }
      }

      const answerItems = modelConfigs
        .filter(({ enabled }) => enabled)
        .map(({ providerId, modelId, displayName }) => ({
          id: `${providerId}-${modelId}`,
          modelName: displayName,
          result: getAnswer(providerId, modelId),
        } satisfies AnswerItem))

      setAnswerItems(answerItems)
    })
  }, [text])

  return {
    answerItems
  }
}
