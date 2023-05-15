import captureWebsite from 'capture-website';
import uint8ArrayToString from './uint8ArrayToString.js';
import sizeOf from 'buffer-image-size';

type Params = {
  URL: string;
  arrData: [ArrData];
  userId: string;
};

type ArrData = {
  width: number;
  height: number;
  emulateDevice: string;
  fullpage: boolean;
};

export default async function snapMultiple(params: Params) {
  console.log('user ' + params.userId + ' is using the service');
  console.log(params);
  let arr = [];
  for (let i = 0; i < params.arrData.length; i++) {
    console.log(`capturing ${i + 1}/${params.arrData.length} image of ${params.URL}`);
    // arr.push()
    const img_unit8Arr = await captureWebsite.buffer(params.URL, {
      width: params.arrData[i].width?(params.arrData[i].width*1):1920,
      height: params.arrData[i].height?(params.arrData[i].height*1):1080,
      emulateDevice: params.arrData[i].emulateDevice,
      fullPage: params.arrData[i].fullpage,
      // hideElements: ['img.ad'],
      scaleFactor: 1,
      blockAds: true,
      // darkMode: true,
    });
    const dim = sizeOf(img_unit8Arr);
    const screen = params.arrData[i].emulateDevice?params.arrData[i].emulateDevice:`${dim.height}x${dim.width}`
    // console.log(dim);
    arr.push({ name: params.URL.replace(/.+\/\/|www.|\..+/g, '')+', view in '+screen, width: dim.width, height: dim.height, snap_data: uint8ArrayToString(img_unit8Arr)});
  }
  return arr;
}
