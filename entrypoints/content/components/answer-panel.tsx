import { Button } from '@/components/ui/button';
import { useAnswerItems } from '../hooks/useAnswerItems';
import { Message } from '@/entrypoints/background';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AnswerTab } from './answer-tab';

export const AnswerPanel = (props: {
  text: string
}) => {
  const { answerItems } = useAnswerItems(props.text)

  if (answerItems.length === 0) {
    return (
      <Button className='m-auto block' variant="link" onClick={openOptionsPage}>
        {t('navigate_to_options_page_for_model_config')}
      </Button>
    )
  }

  return (
    <Tabs defaultValue={answerItems[0].id}>
      <ScrollArea>
        <TabsList className='mb-2'>
          {answerItems.map(answerItem => (
            <TabsTrigger value={answerItem.id} key={answerItem.id}>{answerItem.modelName}</TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      {answerItems.map(answerItem => (
        <TabsContent value={answerItem.id} key={answerItem.id}>
          <AnswerTab result={answerItem.result} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

const openOptionsPage = () => {
  browser.runtime.sendMessage({
    action: 'open-options-page',
  } satisfies Message)
}
