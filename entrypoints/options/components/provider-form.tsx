import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { providerConfigsItem } from "@/entrypoints/options/storageItems";
import { ProviderId, providerIds, providerLabels } from "../constants/provider";
import { useEffect } from "react";
import { useSubmitCallback } from "../events/submitEvent";
import { ScrollArea } from "@/components/ui/scroll-area";

const placeholders: Record<ProviderId, string> = {
  openai: 'OPENAI_API_KEY',
  azure: 'AZURE_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
  google: 'GOOGLE_GENERATIVE_AI_API_KEY',
  mistral: 'MISTRAL_API_KEY',
  cohere: 'COHERE_API_KEY',
  groq: 'GROQ_API_KEY',
  perplexity: 'PERPLEXITY_API_KEY',
  fireworks: 'FIREWORKS_API_KEY',
}

export const ProviderForm = () => {
  const form = useForm<Record<ProviderId, string>>()

  useEffect(() => {
    providerConfigsItem.getValue().then(providerConfigs => {
      for (const providerConfig of providerConfigs) {
        const { providerId, apiKey } = providerConfig
        form.setValue(providerId, apiKey)
      }
    })
  }, [form])

  useSubmitCallback(async () => {
    const providerConfigs = providerIds.map(providerId => ({
      providerId,
      apiKey: form.getValues(providerId),
    }))
    await providerConfigsItem.setValue(providerConfigs)
  })

  return (
    <Form {...form}>
      <h2 className="text-2xl">{t('provider_form_header_label')}</h2>

      <ScrollArea>
        <div className="space-y-4">
          {providerIds.map(providerId => (
            <FormField
              control={form.control}
              name={providerId}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{providerLabels[providerId]}</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholders[providerId]} {...field} />
                  </FormControl>
                </FormItem>
              )}
              key={providerId}
            />
          ))}
        </div>
      </ScrollArea>
    </Form>
  )
}
