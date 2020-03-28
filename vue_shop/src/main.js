import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import './plugins/element.js'
//导入字体图标
import './assets/fonts/iconfont.css'
//导入全局样式表
import './assets/css/global.css'

import TreeTable from 'vue-table-with-tree-grid'
Vue.component("tree-table", TreeTable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
