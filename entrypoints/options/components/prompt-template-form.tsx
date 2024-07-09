import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { promptTemplateItem } from "@/entrypoints/options/storageItems";
import { useSubmitCallback } from "../events/submitEvent";

export const PromptTemplateForm = () => {
  const form = useForm({
    defaultValues: {
      promptTemplate: ''
    }
  })

  useEffect(() => {
    promptTemplateItem.getValue().then(promptTemplate => {
      form.setValue('promptTemplate', promptTemplate)
    })
  }, [form])

  useSubmitCallback(async () => {
    const promptTemplate = form.getValues('promptTemplate')
    await promptTemplateItem.setValue(promptTemplate)
  })

  return (
    <Form {...form}>
      <h2 className="text-2xl">{t('prompt_template_form_header_label')}</h2>

      <FormField
        control={form.control}
        name='promptTemplate'
        render={({ field }) => (
          <FormItem>
            <FormLabel></FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription></FormDescription>
          </FormItem>
        )}
      />
    </Form>
  )
}
