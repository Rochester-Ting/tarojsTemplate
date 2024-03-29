import { createApp } from 'vue'
import './app.scss'
import NutUI from '@nutui/nutui-taro'
// 引入所有组件的样式文件
import '@nutui/nutui-taro/dist/style.css'
const App = createApp({
  onShow() {}
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(NutUI)
export default App
