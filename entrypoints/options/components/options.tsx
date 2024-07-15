import { Button } from "@/components/ui/button";
import { t } from "@/utils/i18n";
import { useSubmitTrigger } from "../events/submitEvent";
import { PromptTemplateForm } from "./prompt-template-form";
import { ProviderForm } from "./provider-form";
import { ModelForm } from "./model-form";
import { toast } from "sonner";

export const Options = () => {
  const submitTrigger = useSubmitTrigger()
  const handleSubmit = async () => {
    try {
      await Promise.all(submitTrigger())
      toast.success(t('save_success_message'))
    } catch (error) {
      console.error(error)
      toast.error(`${error}`)
    }
  }

  return (
    <div className="p-2 h-screen gap-4 grid grid-cols-2 grid-rows-[auto_minmax(0,_1fr)_auto]">
      <div className="">
        <PromptTemplateForm />
      </div>
      <div className="row-start-2 flex flex-col">
        <ProviderForm />
      </div>
      <div className="row-span-2 flex flex-col">
        <ModelForm />
      </div>
      <div className="col-span-2">
        <Button onClick={handleSubmit}>{t('save_button_label')}</Button>
      </div>
    </div>
  );
}
