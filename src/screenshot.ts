import captureWebsite from 'capture-website';
import uint8ArrayToString from './uint8ArrayToString.js';
import sizeOf from 'buffer-image-size';

type Params = {
  URL: string;
  arrData: ArrData;
  userId: string;
};

type ArrData = {
  width: number;
  height: number;
  emulateDevice: string;
  fullpage: boolean;
};

export default async function snapOne(params: Params) {
  console.log('user ' + params.userId + ' is using the service');
  console.log(params);
  if (params.arrData.emulateDevice === '' && (params.arrData.height <= 360 || params.arrData.width <= 360)) {
    console.log('emulateDevice is empty or height/width is too small');
    return;
  }
  const img_unit8Arr = await captureWebsite.buffer(params.URL, {
    width: params.arrData.width ? params.arrData.width * 1 : 1920,
    height: params.arrData.height ? params.arrData.height * 1 : 1080,
    emulateDevice: params.arrData.emulateDevice,
    fullPage: params.arrData.fullpage,
    scaleFactor: 1,
    blockAds: true,
    // darkMode: true,
    hideElements: ['#sidebar', 'img.ad'],
    timeout: 0,
  });
  const dim = sizeOf(img_unit8Arr);
  const screen = params.arrData.emulateDevice ? params.arrData.emulateDevice : `${dim.width}x${dim.height}`;
  const name = params.URL.replace(/.+\/\/|www.|\..+/g, '') + ', view in ' + screen;
  console.log(`snap ${name} is done`);
  return {
    name: name,
    width: dim.width,
    height: dim.height,
    snap_data: uint8ArrayToString(img_unit8Arr),
  };
}
