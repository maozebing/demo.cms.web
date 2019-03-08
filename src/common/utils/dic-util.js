let getFontColor=function (fontColorList,color) {
  let colorR = 'green';
  if (fontColorList.filter((item) => {
    return item.dicValue == color
  }).length > 0) {
    let t = fontColorList.filter((item) => {
      return item.dicValue == color
    })[0];
    if (t) {
      switch (t.dicName) {
        case '绿色':
          colorR = 'green';
          break;
        case '红色':
          colorR = 'red';
          break;
        case '黄色':
          colorR = 'yellow';
          break;
      }
    }
  }
  return colorR
};

let getFontFamily=function(fontTypeList,font) {
  let result = '宋体'
  if (fontTypeList.filter((item) => {
    return item.dicValue == font
  }).length > 0) {
    let t = fontTypeList.filter((item) => {
      return item.dicValue == font
    })[0];
    if (t) {
      result = t.dicName
    }
  }
  return result
};

let getFontSize=function(fontSizeList,fontSize) {
  let result = 16;
  if (fontSizeList.filter((item) => {
    return item.dicValue == fontSize
  }).length > 0) {
    let t = fontSizeList.filter((item) => {
      return item.dicValue == fontSize
    })[0];
    if (t) {
      result = t.dicName
    }
  }
  return result
};

let getAlign=function(alignTypeList,align) {
  let result = 'left';
  let array = alignTypeList.filter((item) => {
    return item.dicValue == align
  });
  if (array.length > 0) {
    let t = alignTypeList.filter((item) => {
      return item.dicValue == align
    })[0];
    if (t) {
      switch (t.dicName) {
        case '居中':
          result = 'center';
          break;
        case '居左':
          result = 'left';
          break;
        case '居右':
          result = 'right';
          break;
      }
    }
  }
  return result;
};

export {
  getFontFamily,
  getFontColor,
  getFontSize,
  getAlign
}
