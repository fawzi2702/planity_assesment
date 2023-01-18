import { Color } from '../types/color.type'

export const generateRandomHexColor = (): Color => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}
