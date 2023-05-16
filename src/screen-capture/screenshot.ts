import { chromium, devices } from 'playwright';
import uint8ArrayToString from '../utils/uint8ArrayToString.js';
import sizeOf from 'buffer-image-size';
import isValidSettings from '../utils/verifySettings.js';

interface Params {
  URL: string;
  userId: string;
  settings: Settings;
}

interface Settings {
  width: number;
  height: number;
  emulateDevice: string;
  fullpage: boolean;
}

export default async function snapOne(params: Params) {
  try {
    console.log('\nuser ' + params.userId + ' is using the service, with settings: ');
    console.log(params.settings);

    if (!isValidSettings(params.settings)) {
      console.log('\ninvalid settings: ');
      console.log(params.settings);
      return { msg: 'invalid settings' };
    }

    const browser = await chromium.launch();
    const device = params.settings.emulateDevice ? devices[params.settings.emulateDevice] : null;
    const deviceScreen = device ? JSON.parse(JSON.stringify(device)).screen : null;

    const viewport = device
      ? deviceScreen
        ? params.settings.emulateDevice.includes('landscape')
          ? {
              width: deviceScreen.width > deviceScreen.height ? deviceScreen.width * 1 : deviceScreen.height * 1,
              height: deviceScreen.width > deviceScreen.height ? deviceScreen.height * 1 : deviceScreen.width * 1,
            }
          : deviceScreen
        : device.viewport
      : // ? device.viewport
        {
          width: params.settings.width * 1,
          height: params.settings.height * 1,
        };

    // console.log('\ndevice: ');
    // console.log(device);
    // console.log('\nviewport: ');
    // console.log(viewport);

    const context = await browser.newContext({
      ...device,
      viewport,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(params.URL);
    const img_unit8Arr = await page.screenshot({ timeout: 0, fullPage: false });
    await browser.close();

    // check if buffer is Uint8Array
    // console.log(img_unit8Arr instanceof Uint8Array);
    const dim = sizeOf(img_unit8Arr);
    const screen = params.settings.emulateDevice ? params.settings.emulateDevice : `${dim.width}x${dim.height}`;
    console.log('\n '+ screen + ' screenshot success');
    
    return {
      name: params.URL.replace(/.+\/\/|www.|\..+/g, '') + ', view in ' + screen,
      width: dim.width,
      height: dim.height,
      snap_data: uint8ArrayToString(img_unit8Arr),
    };
  } catch (e) {
    console.log('screenshot failed: ');
    console.log(params);
    console.log(e);
    return {
      msg: 'screenshot failed',
      error: e,
    };
  }
}
