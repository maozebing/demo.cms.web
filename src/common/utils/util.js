/**
 * 格式化桩号
 * @param mileage
 * @returns {*}
 */
let formatMileAge=function(mileage){
  if(mileage!=undefined && mileage!=='' && mileage !=='--')
  {
    mileage = mileage + ''
    if(mileage.indexOf('K') > -1)
    {
      return mileage;
    }
    if(mileage.indexOf('+') > -1) {
      let datas = mileage.split('+')
      return 'K' + datas[0] + '+' + datas[1].split('.')[0];
    }
    if (mileage.indexOf('.') > -1) {
      let data = mileage.split('.');
      if (data[1].length >= 3 ) {
        return "K"+data[0] +"+" +data[1].substring(0,3);
      } else {
        let s = "K"+data[0] +"+" +data[1].substring(0,data[1].length);
        for (let i= 0; i < 3 - data[1].length; i++) {
          s += '0'
        }
        return s;
      }

    } else {
      return "K" + mileage + "+000";
    }
  }else {
    return '暂无桩号'
  }

};

let cloneObj = function(obj) {
  let str, newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
    return;
  } else if (window.JSON) {
    str = JSON.stringify(obj), //序列化对象
      newobj = JSON.parse(str); //还原
  } else {
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
    }
  }
  return newobj;
};

/**
 * 仅仅将数据转换为万元，保留两位小数
 * @param s
 */
let formatNumberToTenThousand = function (s) {
  if (typeof s !== "number" && typeof s !== "string") return;
  s = parseFloat(s);
  if (s === 0) return 0;
  return Math.floor((s / 100)) / 100;
};

/**
 * 格式金钱，隔3位以逗号隔开
 * @param s 需要格式化的数据  10000
 * @returns {string} 格式化后的字符串10,000
 */
let formatNumber = function (s) {
  if (!s) return 0;

  let numArrs = s.toString().split('.');
  let numOut = '';
  if (s < 0) numOut = '-';

  let numFirst = numArrs[0].split('').reverse();
  numFirst.forEach((v,i) => {
    numOut += v;
    if ((i+1) % 3 === 0){
      numOut += ',';
    }
  });
  if (numOut.charAt(numOut.length-1) === ',')
    numOut = numOut.substr(0,numOut.length-1);
  if (numArrs.length !== 1)
    numOut = numOut.split('').reverse().join('')+'.'+numArrs[1];
  else
    numOut = numOut.split('').reverse().join('');
  return numOut;
}

export {
  formatMileAge,
  cloneObj,
  formatNumberToTenThousand,
  formatNumber
}
