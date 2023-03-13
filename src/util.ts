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