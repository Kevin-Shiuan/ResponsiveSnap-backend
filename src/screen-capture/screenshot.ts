import { chromium, devices } from 'playwright';
import uint8ArrayToString from '../uint8ArrayToString.js';
import sizeOf from 'buffer-image-size';

interface Params {
  URL: string;
  userId: string;
  settings: Setting;
}

interface Setting {
  width: number;
  height: number;
  emulateDevice: string;
  fullpage: boolean;
}

export default async function snapOne(params: Params) {
  const browser = await chromium.launch();

  const iphone13 = devices['iPhone 13'];
  console.log(iphone13);
  const context = await browser.newContext({
    ...iphone13,
  });

  // Create context with given viewport
  // const context = await browser.newContext({
  //   viewport: { width: 1280, height: 1024 }
  // });
  const page = await context.newPage();
  await page.goto(params.URL);
  const img_unit8Arr = await page.screenshot({ fullPage: false });

  //check if buffer is Uint8Array
  if (img_unit8Arr instanceof Uint8Array) {
    const dim = sizeOf(img_unit8Arr);
    const screen = params.settings.emulateDevice ? params.settings.emulateDevice : `${dim.width}x${dim.height}`;

    return {
      name: params.URL.replace(/.+\/\/|www.|\..+/g, '') + ', view in ' + screen,
      width: dim.width,
      height: dim.height,
      snap_data: uint8ArrayToString(img_unit8Arr),
    };
  }
  //   console.log(buffer.toString('base64'));
  //   return {
  //     name: 'screenshot',
  //     width: 1280,
  //     height: 1024,
  //     snap_data: buffer.toString('base64'),
  //   }
}
