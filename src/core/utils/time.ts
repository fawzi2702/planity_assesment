import moment from 'moment'

export const CALENDAR_DAY_START = 540 // in minutes
export const CALENDAR_DAY_END = 1260 // in minutes
export const CALENDAR_DAY_DURATION = CALENDAR_DAY_END - CALENDAR_DAY_START // in minutes

export const parseTime = (time: string): number => {
  const dateTime = moment(time, 'h:m')
  const startOfDay = moment().startOf('day')

  return dateTime.diff(startOfDay, 'minutes')
}
