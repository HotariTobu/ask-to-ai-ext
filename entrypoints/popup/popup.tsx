import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProviderId, aiConfigsItem, providerIds } from "./storageItems";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { t } from "@/utils/i18n";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type FormData = Record<ProviderId, string>

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

export const Popup = () => {
  const form = useForm<FormData>()

  useEffect(() => {
    aiConfigsItem.getValue().then(aiConfigs => {
      for (const aiConfig of aiConfigs) {
        const { providerId, apiKey } = aiConfig
        form.setValue(providerId, apiKey)
      }
    })
  }, [form])

  const handleSubmit = async (data: FormData) => {
    const aiConfigs = providerIds.map(providerId => ({
      providerId,
      apiKey: data[providerId],
    }))
    await aiConfigsItem.setValue(aiConfigs)
  }

  return (
    <Form {...form}>
      <form className="m-2 space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <ScrollArea className="w-96 h-96">
          <div className="space-y-4">
            <h2 className="text-2xl">{t('api_key_form_header_label')}</h2>
            {providerIds.map(providerId => (
              <FormField
                control={form.control}
                name={providerId}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{providerId}</FormLabel>
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
        <Button type="submit">{t('save_button_label')}</Button>
      </form>
    </Form>
  );
}
