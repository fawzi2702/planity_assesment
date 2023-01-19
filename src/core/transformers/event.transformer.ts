import { CalendarEvent, CalendarEventResponse } from '../types/event.type'
import { generateRandomHexColor } from '../utils/color'
import { CALENDAR_DAY_START, parseTime } from '../utils/time'

export const calendarEventTransformer = (events: CalendarEventResponse[]): CalendarEvent[] => {
  return events.map<CalendarEvent>((event) => {
    const start = parseTime(event.start) - CALENDAR_DAY_START
    const end = start + event.duration
    const backgroundColor = generateRandomHexColor()

    return {
      id: event.id,
      start,
      end,
      backgroundColor,
      overlapsEvents: new Map<number, CalendarEvent>(),
      widthDivider: 1,
      horizontalPostionIndex: null,
    }
  })
}
