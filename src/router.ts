/**
 * 路由配置文件
 */
import HomePage from './page/home'
import TestView from './page/testView'
import ListView from './page/ListView'


export default [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/home',
    component: HomePage
  },
  // 测试页面
  {
    path: '/test',
    component: TestView
  },
  {
    path: '/listView',
    component: ListView
  },
]