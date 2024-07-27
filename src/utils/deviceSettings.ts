import { DeviceSettings } from '../../types'
import { SUPPORTED_DEVICES } from '../constants/devices'

const MAX_WIDTH = 4096
const MIN_WIDTH = 360
const MAX_HEIGHT = 4096
const MIN_HEIGHT = 360

export const checkDeviceSettings = ({ width, height, emulateDevice, fullPage }: DeviceSettings) => {
  if (emulateDevice === 'custom') {
    return isValidScreenSize({ width, height, fullPage })
  }
  return isValidDevice(emulateDevice)
}

const isValidScreenSize = ({ width, height, fullPage }: Omit<DeviceSettings, 'emulateDevice'>) => {
  const isValidWidth = MIN_WIDTH <= width && width <= MAX_WIDTH

  if (fullPage) {
    const isValidHeight = MIN_HEIGHT <= height
    return isValidWidth && isValidHeight
  }

  const isValidHeight = MIN_HEIGHT <= height && height <= MAX_HEIGHT
  return isValidWidth && isValidHeight
}

const isValidDevice = (emulateDevice: DeviceSettings['emulateDevice']) => {
  return SUPPORTED_DEVICES.includes(emulateDevice)
}

export const getNormalizedDeviceDimension = ({
  width,
  height,
  isLandscape
}: {
  width: number
  height: number
  isLandscape: boolean
}) => {
  if (isLandscape) {
    return width > height
      ? {
          width: Number(width),
          height: Number(height)
        }
      : {
          width: Number(height),
          height: Number(width)
        }
  }
  return {
    width: Number(width),
    height: Number(height)
  }
}
