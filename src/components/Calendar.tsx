import { FC, useEffect } from 'react'

import { getCalendarStore } from '../core/stores/calendar.store'
import { Event } from './CalendarEvent'

export const Calendar: FC = () => {
  const { calendarEvents, getCalendarEvents } = getCalendarStore()

  useEffect(() => {
    getCalendarEvents()
  }, [])

  return (
    <div className="calendar-container">
      {calendarEvents.map((calendarEvent) => (
        <Event key={calendarEvent.id} calendarEvent={calendarEvent} />
      ))}
    </div>
  )
}
