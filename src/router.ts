/**
 * 路由配置文件
 */
import HomePage from './page/home'
import TestView from './page/testView'
import ListView from './page/ListView'
import Playground from './page/playground'
import VideoView from './page/videoView'
import AiPage from './page/aiPage'

const RouterList = [
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
  },
  {
    path: '/videoView',
    component: VideoView
  },
  {
    path: '/aiPage',
    component: AiPage
  },
]

export default RouterList