export default function uint8ArrayToString(fileData: Uint8Array) {
  var dataString = '';
  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
  return dataString;
}

// export default function uint8ArrayToString(fileData: Uint8Array[]) {
//   let arrDataString = [];
//   for (let i = 0; i < fileData.length; i++) {
//     var dataString = '';
//     for (let j = 0; j < fileData[i].length; j++) {
//       dataString += String.fromCharCode(fileData[i][j]);
//     }
//     arrDataString.push(dataString);
//   }
//   return arrDataString;
// }
