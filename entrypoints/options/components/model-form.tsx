import { useFieldArray, useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { ModelConfig, modelConfigsItem } from "@/entrypoints/options/storageItems";
import { providerIds, providerLabels } from "../constants/provider";
import { useSubmitCallback } from "../events/submitEvent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";

const initialModelConfig: ModelConfig = {
  modelId: '',
  providerId: providerIds[0],
  displayName: '',
  enabled: false,
}

export const ModelForm = () => {
  const form = useForm({
    defaultValues: {
      modelConfigs: [] as ModelConfig[]
    }
  })

  useEffect(() => {
    modelConfigsItem.getValue().then(modelConfigs => {
      form.setValue('modelConfigs', modelConfigs)
    })
  }, [form])

  useSubmitCallback(async () => {
    const modelConfigs = form.getValues('modelConfigs')
    await modelConfigsItem.setValue(modelConfigs)
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'modelConfigs'
  })

  return (
    <Form {...form}>
      <div className="flex">
        <h2 className="text-2xl flex-1">{t('model_form_header_label')}</h2>
        <Button variant="outline" size="icon" onClick={() => append(initialModelConfig)}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="gap-2 flex">
        <div className="flex-1 text-lg text-nowrap overflow-x-hidden">{t('model_form_model_id_header_label')}</div>
        <div className="flex-1 text-lg text-nowrap overflow-x-hidden">{t('model_form_provider_header_label')}</div>
        <div className="flex-1 text-lg text-nowrap overflow-x-hidden">{t('model_form_display_name_header_label')}</div>
        <Switch className="opacity-0" />
        <Button className="opacity-0" size="icon" />
      </div>

      <ScrollArea>
        <div className="space-y-4">
          {fields.map((item, index) => (
            <div className="gap-2 flex items-center" key={item.id}>
              <FormField
                control={form.control}
                name={`modelConfigs.${index}.modelId`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`modelConfigs.${index}.providerId`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {providerIds.map(providerId => (
                            <SelectItem value={providerId} key={providerId}>{providerLabels[providerId]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`modelConfigs.${index}.displayName`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`modelConfigs.${index}.enabled`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button variant="outline" size="icon" onClick={() => remove(index)}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Form>
  )
}
