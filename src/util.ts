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
