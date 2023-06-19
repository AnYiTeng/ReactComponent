/**
 * 画图工具：https://excalidraw.com/
 * AST: https://astexplorer.net/
 * 创建指定大小图片：https://dummyimage.com/
 * PDF工具：https://www.ilovepdf.com/
 */

/**
 * 数组根据某个属性分组
 */
const groupBy = (array: any[], f: (T: any) => void) => {
  const groups: any = {}
  array.forEach(function(o) {
    const group = JSON.stringify(f(o))
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  return Object.keys(groups).map(function(group) {
    return {
      parent: groups[group][0].category,
      children: groups[group].map((item: any) => {
        return {
          label: item.desc,
          value: item.id,
        }
      }),
    }
  })
}
export const arrayGroupBy = (list: any[], groupId: string) => {
  const sorted = groupBy(list, function(item) {
    return [item[groupId]]
  })
  return sorted
}

/**
 * 获取hash参数
 */
export const getHashSearchParam = (key: any) => {
  const url = location.href
  // 获取 hash 值，不包含 '#' 号
  const hash = url.substring(url.indexOf("#") + 1)
  // 查找 '?' 号所在的索引
  const searchIndex = hash.indexOf("?")
  // '?' 号后面接的是索引参数，如果找到则+1，去除'?' 号
  const search = searchIndex !== -1 ? hash.substring(searchIndex + 1) : ""
  // 把搜索参数字符串提过URLSearchParams转成对象形式
  const usp = new URLSearchParams(search)
  // 通过URLSearchParams自带的get方法，查询键所对应的值
  return usp.get(key)
}

/**
 * 根据枚举key获取value
 */
type EnumKey<T extends object, _U> = keyof { [K in keyof T]: K }
export function getKeyByValue<T extends object, U extends T[keyof T]>(obj: T, value: U): EnumKey<T, U> | undefined {
  const keys = Object.keys(obj) as Array<keyof T>
  for (const key of keys) {
    if (obj[key] === value) {
      return key
    }
  }
  return undefined
}

/**
 * 安装指定 Node 版本：npm install -g n => n v版本号 例如 n v14.17.6
 */

/**
 * js特殊字符转义
 */
export const escape2Html = (str: string) => {
  var arrEntities: any = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(_all: any, t: any) { return arrEntities[t] })
}

/**
 * 格式化金额
 *
 * @param amount 金额：分
 */
export function formatMoney(amount?: number, hasUnit?: boolean) {
  if (amount === 0) {
    return '0'
  }
  if (!amount) {
    return '-'
  }
  let s = String(amount / 100)
  if (s === '') { return '-' }
  let isNegative = false
  if (s.substring(0, 1) === '-') {
    s = s.substring(1)
    isNegative = true
  }
  if (s.indexOf('.') > -1) {
    const sub = s.substring(s.indexOf('.' + 1))
    if (sub.length > 2) {
      s = s.substring(0, s.indexOf('.') + 3)
    }
  }
  let suffix = ''
  if (s.indexOf('.') >= 1) {
    suffix = s.substring(s.indexOf('.'))
    s = s.substring(0, s.indexOf('.'))
  }
  const arr = []
  for (let i = 0; i < s.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      arr.push(',')
    }
    arr.push(s.charAt(s.length - i - 1))
  }
  return `${isNegative ? '-' : ''}${arr.reverse().join('')}${suffix}${hasUnit ? '元' : ''}`
}

/**
 * 格式化数字，341413 -> 341,413
 */
export function formatNumber(num: number | string) {
  return isNaN(Number(num))
    ? '-'
    : Number(num).toLocaleString()
}

/**
 * 格式化百分比
 *
 * @param percentage 5%则输入500
 */
export function formatPercentage(percentage?: number) {
  if (percentage === undefined || isNaN(percentage)) {
    return '-'
  }
  return `${+(percentage / 100).toFixed(2)}%`
}

/*
* 将 Enum 转为 dataSource 兼容的形式
 */
export function enum2DataSource(input: Record<any, any>) {
  return Object.keys(input)
    .filter(key => !isNaN(+key))
    .map(key => ({
      label: input[key],
      value: +key,
    }))
}

/**
 * 秒转化为分钟
 */
export function secondToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  return {
    minutes,
  }
}

/**
 * 时间格式转为秒: 00:00:11 => 11
 */
export function timeToSecond(time: string) {
  if (time) {
    const timeList = time.split(':')
    const hourTime = timeList[0]
    const minutesTime = timeList[1]
    const secondTime = timeList[2]
    return +(+hourTime * 3600 + +minutesTime * 60 + +secondTime)
  } else {
    return 0
  }
}

/**
 * 判断数组是否完全包含另一个数组
 * @param arr1 子数组
 * @param arr2 父数组
 * @returns 布尔值
 */
export const arrayEveryIncludes = (arr1: any[], arr2: any[]) => {
  return arr1.every(val => arr2.includes(val))
}

/**
 * 判断数组是否只包含另一个数组其中几项
 * @param arr1 子数组
 * @param arr2 父数组
 * @returns 布尔值
 */
export const arraySomeIncludes = (arr1: any[], arr2: any[]) => {
  return arr1.some(val => arr2.includes(val))
}

/**
 * 获取 Enum 中 value 中相同的 label
 */
export function getEnumLabel(enumData: Record<any, any>, key?: string | number) {
  const current = Object.entries(enumData).find(([, value]) => value === key)
  return current?.[0]
}

/**
 * iframe通信
 */
// 被嵌入的子页面向父页面发送消息
window.parent.postMessage({
  action: 'CLOSE_AMP_ORDER',
  namespace: 'amp',
  content: {}
}, '*')
// 嵌入的父页面监听子页面分发的信息
const materialSelectorListener = (e: MessageEvent) => {
  if (e.origin.includes('chuangyi')) {
    const { action, content: payload } = e.data
    switch (action) {
      /* 素材库就绪 */
      case 'CENTRAL_SUCAI_READY': {
        return
      }
      /* 关闭素材库 */
      case 'CENTRAL_SUCAI_CANCEL': {
        // return onClose?.()
      }
      /* 选择素材 */
      case 'CENTRAL_SUCAI_SELECTED': {
        // return onChange?.(payload)
      }
    }
  }
}
window.addEventListener('message', materialSelectorListener)

/** fetch请求携带cookie 加上这个配置即可 */
// fetchOption: {
//   credentials: 'include' as const,
// },

/** chrome 允许跨安全策略打开命令 */
// /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --ignore-certificate-errors --ignore-urlfetcher-cert-requests &> /dev/null

// --allow-file-access-from-files
// /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --ignore-certificate-errors --ignore-urlfetcher-cert-requests --allow-file-access-from-files &> /dev/null

/**
 * 动态加载script文件
 */
const initVideox = () => {
  return new Promise<void>(resolve => {
    const script = document.createElement('script')
    script.src = 'https://g.alicdn.com/mtb/videox/0.4.14/videox-pc.js'

    // link引入样式文件时需要添加rel = stylesheet，告知浏览器这是样式文件需要应用到html上
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://g.alicdn.com/de/prismplayer/2.9.7/skins/default/aliplayer-min.css'
    
    script.addEventListener('load', () => {
      resolve()
    })
    document.head.appendChild(link)
    document.body.appendChild(script)
  })
}

const prepare = async () => {
  await initVideox()
}

/**
 * 覆盖输入框自动填充样式的方法
 */
// input{
//   -webkit-text-fill-color: #fff;
//   &:-webkit-autofill {
//     box-shadow: inset 0 0 0 2000px #000;
//   }
// }

/**
 * umi项目默认启动8000端口，两个项目同时启动，都会占用8000端口，可以在 package.json 的 script 中配置启动默认端口。
 */
// "scripts": {
//   "start": "set PORT=8001 && dumi dev"
// }

/**
 * https://www.npmjs.com/package/react-rnd
 * React-RND 库是一个基于 React 的可调整大小和可拖动的组件库。它允许用户通过拖动和调整大小来改变组件的位置和尺寸
 */

/**
 * https://www.npmjs.com/package/immer
 * immerjs 是利用Proxy实现的类似深克隆库
 */
