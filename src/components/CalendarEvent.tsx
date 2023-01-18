import { FC, useMemo } from 'react'

import { getWindowSizeStore } from '../core/stores/window.store'
import { CalendarEvent } from '../core/types/event.type'
import {
  computeEventCalendarHeight,
  computeEventCalendarPositionX,
  computeEventCalendarPositionY,
  computeEventCalendarWidth,
} from '../core/utils/event'

type Position = {
  readonly x: number
  readonly y: number
}

type Props = {
  readonly calendarEvent: CalendarEvent
}

export const Event: FC<Props> = ({ calendarEvent }) => {
  const { window } = getWindowSizeStore()

  const position = useMemo<Position>(
    () => ({
      x: computeEventCalendarPositionX(calendarEvent, window.width),
      y: computeEventCalendarPositionY(calendarEvent, window.height),
    }),
    [calendarEvent.start, window],
  )

  const width = useMemo<number>(
    () => computeEventCalendarWidth(calendarEvent, window.width),
    [calendarEvent, window.width],
  )
  const height = useMemo<number>(
    () => computeEventCalendarHeight(calendarEvent, window.height),
    [calendarEvent, window.height],
  )

  return (
    <div
      className="calendar-event"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
        top: position.y,
        left: position.x,
        background: calendarEvent.color,
      }}>
      <span>{calendarEvent.id}</span>
    </div>
  )
}
