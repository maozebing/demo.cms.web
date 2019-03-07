const DIC_TYPE = {
  字体类型: 1,
  字体大小: 2,
  字体颜色: 3,
  对齐方式: 4,
  播放方式: 5,
  情报板模板类型: 6,
  图片内容类型: 7,
  摄像机厂商类型: 8,
  情报板厂商类型: 9,
  车检器厂商类型: 10,
  气象站厂商类型: 11,
  通讯类型: 12
};

/**
 * 字体类型
 * @type {*[]}
 */
const FONT_TYPE = [
  {
    dicValue: 101,
    dicName: '宋体'
  },
  {
    dicValue: 102,
    dicName: '黑体'
  }
];

/**
 * 字体大小
 * @type {*[]}
 */
const FONT_SIZE = [
  {
    dicValue: 201,
    dicName: 16
  },
  {
    dicValue: 202,
    dicName: 24
  },
  {
    dicValue: 203,
    dicName: 32
  },
  {
    dicValue: 204,
    dicName: 48
  }
];

/**
 * 字体颜色
 * @type {*[]}
 */
const FONT_COLOR = [
  {
    dicValue: 301,
    dicName: '绿色'
  },
  {
    dicValue: 302,
    dicName: '红色'
  },
  {
    dicValue: 303,
    dicName: '黄色'
  }
];

/**
 * 对齐方式
 * @type {*[]}
 */
const ALIGN_TYPE = [
  {
    dicValue: 401,
    dicName: '居中'
  },
  {
    dicValue: 402,
    dicName: '居左'
  },
  {
    dicValue: 403,
    dicName: '居右'
  }
];

/**
 * 情报板内置图片
 * @type {*[]}
 */
const CMS_PIC_TYPE = [
  {
    dicValue: 501,
    dicName: '无'
  },
  {
    dicValue: 502,
    dicName: '花'
  },
  {
    dicValue: 503,
    dicName: '服务区'
  },
  {
    dicValue: 504,
    dicName: '紧急电话'
  },
  {
    dicValue: 505,
    dicName: '前方车祸'
  },
  {
    dicValue: 506,
    dicName: '前方施工'
  },
  {
    dicValue: 507,
    dicName: '注意安全'
  },
  {
    dicValue: 508,
    dicName: '路滑'
  },
  {
    dicValue: 509,
    dicName: '横风'
  },
  {
    dicValue: 510,
    dicName: '限速35'
  },
  {
    dicValue: 511,
    dicName: '限速40'
  },
  {
    dicValue: 512,
    dicName: '限速60'
  },
  {
    dicValue: 513,
    dicName: '限速80'
  },
  {
    dicValue: 514,
    dicName: '限速100'
  },
  {
    dicValue: 515,
    dicName: '限速110'
  },
  {
    dicValue: 516,
    dicName: '限速120'
  }
];

/**
 * 播放方式
 * @type {*[]}
 */
const PLAY_TYPE = [
  {
    dicValue: 601,
    dicName: '立即显示'
  },
  {
    dicValue: 602,
    dicName: '上移'
  },
  {
    dicValue: 603,
    dicName: '下移'
  },
  {
    dicValue: 604,
    dicName: '左移'
  },
  {
    dicValue: 605,
    dicName: '右移'
  },
  {
    dicValue: 606,
    dicName: '滚屏显示'
  }
];


export default {
  DIC_TYPE,
  FONT_TYPE,
  FONT_SIZE,
  FONT_COLOR,
  ALIGN_TYPE,
  CMS_PIC_TYPE,
  PLAY_TYPE
};
