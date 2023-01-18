import { CalendarEvent, CalendarEventResponse } from '../types/event.type'
import { generateRandomHexColor } from '../utils/color'
import { parseTime } from '../utils/time'

export const calendarEventTransformer = (events: CalendarEventResponse[]): CalendarEvent[] => {
  return events.map<CalendarEvent>((event) => {
    const start = parseTime(event.start)
    const end = start + event.duration
    const color = generateRandomHexColor()

    return {
      id: event.id,
      start,
      end,
      color,
      groupSize: 1,
      groupPosition: 0,
    }
  })
}
