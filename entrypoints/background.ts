export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(addAskContextMenu)
  addContextMenuHandler()
});

const addAskContextMenu = () => {
  browser.contextMenus.create({
    id: 'ask-to-ai',
    contexts: ['selection'],
    title: 'Ask to AI'
  })
}

const addContextMenuHandler = () => {
  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (typeof tab?.id === 'undefined') {
      return
    }
    await browser.tabs.sendMessage(tab.id, info)
  })
}
