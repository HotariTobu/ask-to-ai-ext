export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    addMessageReceiver()
  },
});

const addMessageReceiver = () => {
  browser.runtime.onMessage.addListener((_, sender) => {
    if (browser.runtime.id !== sender.id) {
      return
    }

    const selection = document.getSelection()
    if (selection === null || selection.isCollapsed) {
      return
    }

    console.log(selection)
  })
}
