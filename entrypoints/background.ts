import { Menus, Runtime, Tabs } from "wxt/browser";

export default defineBackground(() => {
  browser.runtime.onMessage.addListener(handleMessage)
  browser.runtime.onInstalled.addListener(addAskContextMenu)
  browser.contextMenus.onClicked.addListener(handleContextMenuClick)
});

export type Message = {
  action: 'open-options-page'
}

const handleMessage = async (message: Message, sender: Runtime.MessageSender) => {
  if (browser.runtime.id !== sender.id) {
    return
  }

  switch (message.action) {
    case 'open-options-page':
      await browser.runtime.openOptionsPage()
      break
  }
}

const addAskContextMenu = () => {
  browser.contextMenus.create({
    id: 'ask-to-ai',
    contexts: ['selection'],
    title: 'Ask to AI'
  })
}

const handleContextMenuClick = async (info: Menus.OnClickData, tab: Tabs.Tab | undefined) => {
  if (typeof tab?.id === 'undefined') {
    return
  }
  await browser.tabs.sendMessage(tab.id, info)
}
