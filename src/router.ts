/**
 * 路由配置文件
 */
import HomePage from './page/home'
import TestView from './page/testView'
import ListView from './page/ListView'
import Playground from './page/playground'


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
  {
    path: '/playground',
    component: Playground
  }
]