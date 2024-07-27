import { DeviceSettings } from '../../types'

export default function checkDeviceSettings(settings: DeviceSettings) {
  if (settings.emulateDevice === '') {
    return isValidScreenSize(settings)
  }
  return isValidDevice(settings)
}

const isValidScreenSize = (settings: DeviceSettings) => {
  return settings.height >= 360 || settings.width >= 360
}

const isValidDevice = (settings: DeviceSettings) => {
  return knowDevices.includes(settings.emulateDevice)
}

const knowDevices = [
  'iPad (gen 7)',
  'iPad (gen 7) landscape',
  'iPad Mini',
  'iPad Mini landscape',
  'iPad Pro 11',
  'iPad Pro 11 landscape',
  'iPhone SE',
  'iPhone SE landscape',
  'iPhone 12',
  'iPhone 12 landscape',
  'iPhone 12 Pro',
  'iPhone 12 Pro landscape',
  'iPhone 12 Pro Max',
  'iPhone 12 Pro Max landscape',
  'iPhone 12 Mini',
  'iPhone 12 Mini landscape',
  'iPhone 13',
  'iPhone 13 landscape',
  'iPhone 13 Pro',
  'iPhone 13 Pro landscape',
  'iPhone 13 Pro Max',
  'iPhone 13 Pro Max landscape',
  'iPhone 13 Mini',
  'iPhone 13 Mini landscape',
  'Pixel 5',
  'Pixel 5 landscape'
]
