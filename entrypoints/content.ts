import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { apiKeyItem } from "./popup/storageItems";

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    const answerPanel = addAnswerPanel()
    addMessageReceiver(answerPanel)
  },
});

const addAnswerPanel = () => {
  const answerPanel = document.createElement('div')
  document.body.appendChild(answerPanel)
  answerPanel.style.position = 'sticky'
  answerPanel.style.left = "0"
  answerPanel.style.right = "0"
  answerPanel.style.bottom = "0"
  answerPanel.style.height = "200px"
  answerPanel.style.overflowY = "auto"
  answerPanel.style.whiteSpace = "break-spaces"
  answerPanel.style.background = "white"
  answerPanel.style.opacity = "0.8"

  return answerPanel
}

const addMessageReceiver = (answerPanel: Element) => {
  browser.runtime.onMessage.addListener(async (_, sender) => {
    if (browser.runtime.id !== sender.id) {
      return
    }

    const selection = document.getSelection()
    if (selection === null || selection.isCollapsed) {
      return
    }

    const text = selection.toString()
    const textStream = await streamAnswer(text)

    answerPanel.textContent = ''
    for await (const textPart of textStream) {
      answerPanel.textContent += textPart
    }
  })
}

const streamAnswer = async (text: string) => {
  const apiKey = await apiKeyItem.getValue()
  const provider = createGoogleGenerativeAI({
    apiKey,
  })

  const model = provider('models/gemini-pro')

  const { textStream } = await streamText({
    model,
    prompt: text,
  })

  return textStream
}
