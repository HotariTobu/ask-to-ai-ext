import { Menus, Runtime, Tabs } from "wxt/browser";

export default defineBackground(() => {
  browser.action.onClicked.addListener(openOptionsPage)
  browser.runtime.onMessage.addListener(handleMessage)
  browser.runtime.onInstalled.addListener(addAskContextMenu)
  browser.contextMenus.onClicked.addListener(handleContextMenuClick)
  browser.commands.onCommand.addListener(askToAI)
});

const openOptionsPage = () =>
  browser.runtime.openOptionsPage()

export type Message = {
  action: 'open-options-page'
}

const handleMessage = async (message: Message, sender: Runtime.MessageSender) => {
  if (browser.runtime.id !== sender.id) {
    return
  }

  switch (message.action) {
    case 'open-options-page':
      await openOptionsPage()
      break
  }
}

const addAskContextMenu = () => {
  browser.contextMenus.create({
    id: 'ask-to-ai',
    contexts: ['selection'],
    title: t('ask_to_ai'),
  })
}

const handleContextMenuClick = async (_: Menus.OnClickData, tab: Tabs.Tab | undefined) => {
  await askToAI()
}

const askToAI = async () => {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  })

  const tab = tabs.at(0)
  if (typeof tab?.id === 'undefined') {
    return
  }
  await browser.tabs.sendMessage(tab.id, null)
}
