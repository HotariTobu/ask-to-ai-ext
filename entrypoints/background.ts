export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(addAskContextMenu)
});

const addAskContextMenu = () => {
  browser.contextMenus.create({
    id: 'ask-to-ai',
    contexts: ['selection'],
    title: 'Ask to AI'
  })
}
