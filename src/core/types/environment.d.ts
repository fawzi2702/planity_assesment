/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    readonly REACT_APP_CALENDAR_EVENT_ENDPOINT: string
    readonly REACT_APP_CALENDAR_DAY_START: number
    readonly REACT_APP_CALENDAR_DAY_END: number
  }
}
