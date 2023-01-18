import { Color } from './color.type'

export type CalendarEvent = {
  readonly id: number
  readonly start: number
  readonly end: number
  readonly color: Color
  groupSize: number
  groupPosition: number
}

export type CalendarEventResponse = {
  readonly id: number
  readonly start: string
  readonly duration: number
}
