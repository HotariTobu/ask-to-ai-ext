import { useEffect } from "react";

type EventHandler<A extends unknown[], R> = (...args: A) => R
type UseEventTrigger<A extends unknown[], R> = () => EventHandler<A, R[]>
type UseEventCallback<A extends unknown[], R> = (eventHandler: EventHandler<A, R>) => void

export const createEvent = <A extends unknown[] = [], R = void>(): [UseEventTrigger<A, R>, UseEventCallback<A, R>] => {
  const eventHandlers: EventHandler<A, R>[] = []

  return [
    () => (...args) =>
      eventHandlers.map(eventHandler =>
        eventHandler(...args)
      )
    ,

    eventHandler => {
      useEffect(() => {
        const index = eventHandlers.length
        eventHandlers.push(eventHandler)

        return () => {
          delete eventHandlers[index]
        }
      })
    }
  ]
}
