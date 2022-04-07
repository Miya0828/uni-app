import App from './App';
import tip from'./common/util/tip.js';
import router from './common/router'
import {RouterMount} from './plugin/uni-simple-router/index.js'


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
});
import home from './pages/home/home.vue'
Vue.component('home',home);

import mine from './pages/mine/mine.vue'
Vue.component('mine',mine);

import forHelp from './pages/forHelp/forHelp.vue'
Vue.component('forHelp',forHelp);

import community from './pages/community/community.vue'
Vue.component('community',community);

import cuCustom from './plugin/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);


// tip
Vue.prototype.$tip=tip;
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif