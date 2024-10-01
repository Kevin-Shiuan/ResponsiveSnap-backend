export type DeviceSettings = {
  width: number
  height: number
  emulateDevice: string
  fullPage: boolean
}

export interface ScreenShotData {
  name: string
  width: number
  height: number
  data: uint8Array[]
}
