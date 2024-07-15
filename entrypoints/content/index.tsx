import '@/index.css'
import ReactDOM from "react-dom/client";
import { Overlay } from './components/overlay';
import { AnswerPanel } from './components/answer-panel';
import { Runtime } from 'wxt/browser';

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    browser.runtime.onMessage.addListener(handleMessage)
  },
});

const handleMessage = async (_: unknown, sender: Runtime.MessageSender) => {
  if (browser.runtime.id !== sender.id) {
    return
  }

  const selection = document.getSelection()
  if (selection === null || selection.isCollapsed) {
    return
  }

  const range = selection.getRangeAt(0)
  mountOverlay(range)
}

const mountOverlay = (range: Range) => {
  const ancestor = range.commonAncestorContainer.parentElement
  if (ancestor === null) {
    return
  }

  const container = document.createElement('div')
  ancestor.prepend(container)
  container.className = 'relative'

  const originRect = container.getBoundingClientRect()
  const rangeRects = distinctRects(range.getClientRects())

  const overlayRects = rangeRects.map(rangeRect => new DOMRect(
    rangeRect.x - originRect.x,
    rangeRect.y - originRect.y,
    rangeRect.width,
    rangeRect.height,
  ))

  ReactDOM.createRoot(container).render(
    <Overlay rects={overlayRects}>
      <AnswerPanel text={range.toString()} />
    </Overlay>
  )
}

const distinctRects = (rects: DOMRectList) => {
  const rectMap = new Map(Array.from(rects).map(rect => [
    JSON.stringify(rect.toJSON()),
    rect,
  ]))
  return Array.from(rectMap.values())
}
