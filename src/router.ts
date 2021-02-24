/**
 * 路由配置文件
 */
import HomePage from './page/home'
import TestView from './page/testView'

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
    path: '/testView',
    component: TestView
  }
]