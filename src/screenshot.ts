import { chromium, devices } from 'playwright'
import { uint8ArrayToString, getImgDimension } from './utils/imageProcessing'
import { checkDeviceSettings, getNormalizedDeviceDimension } from './utils/deviceSettings'
import { DeviceSettings } from '../types'
import sharp from 'sharp'

interface Params {
  url: string
  userId: string
  settings: DeviceSettings
}

export default async function takeScreenshot({ url, userId, settings }: Params) {
  console.log('Service in use: ', { userId, url, settings })

  const isValidSettings = checkDeviceSettings(settings)

  if (!isValidSettings) {
    return { errMsg: 'invalid settings' }
  }

  const { width: customWidth, height: customHeight, emulateDevice, fullPage: isFullPage } = settings

  const isCustomDevice = emulateDevice === 'custom'
  const isLandscape = emulateDevice.includes('landscape')

  const device = isCustomDevice ? null : devices[emulateDevice]
  const deviceViewport = device ? device.viewport : { width: customWidth, height: customHeight }
  const normalizedDeviceDimension = getNormalizedDeviceDimension({
    width: deviceViewport.width,
    height: deviceViewport.height,
    isLandscape
  })

  try {
    const browser = await chromium.launch()
    const context = await browser.newContext({
      ...device,
      viewport: normalizedDeviceDimension,
      deviceScaleFactor: 1
    })
    const page = await context.newPage()
    await page.goto(url)
    if (isFullPage) {
      await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight))
      await page.evaluate(() => window.scrollBy(0, -document.body.scrollHeight))
      await page.waitForTimeout(3000)
    }
    const imgBuffer = await page.screenshot({ fullPage: isFullPage })

    // release resources
    await browser.close()

    const dimension = getImgDimension(imgBuffer)
    const screenName = `${isCustomDevice ? `${dimension.width} x ${dimension.height}` : `${emulateDevice}`}${isFullPage ? ' (full page)' : ''}`

    console.log('Screenshot success: ', screenName)

    if (dimension.height > 4096) {
      const chunks = []
      for (let x = 0; x < dimension.height; x += 4096) {
        const sharpImage = sharp(imgBuffer)
        const img = await sharpImage
          .extract({
            left: 0,
            top: x,
            width: dimension.width,
            height: Math.min(4096, dimension.height - x)
          })
          .toBuffer()
        chunks.push(uint8ArrayToString(img))
      }
      return {
        name: screenName,
        width: dimension.width,
        height: dimension.height,
        data: chunks
      }
    }

    return {
      name: screenName,
      width: dimension.width,
      height: dimension.height,
      data: [uint8ArrayToString(imgBuffer)]
    }
  } catch (e) {
    console.log('screenshot failed!')
    return {
      errMsg: 'screenshot failed',
      error: e
    }
  }
}
