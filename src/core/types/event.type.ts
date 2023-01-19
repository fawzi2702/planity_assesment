import { Color } from './color.type'

export type CalendarEvent = {
  readonly id: number
  readonly start: number
  readonly end: number
  readonly backgroundColor: Color
  overlapsEvents: Map<number, CalendarEvent>
  widthDivider: number
  horizontalPostionIndex: number
}

export type CalendarEventResponse = {
  readonly id: number
  readonly start: string
  readonly duration: number
}

export type CalendarEventHistogram = number[][]

export type CalendarEventCluster = {
  eventsMap: Map<number, CalendarEvent>
  maxSimultaneousOverlaps: number
}
