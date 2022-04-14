import App from './App';
import tip from './common/util/tip.js';
import Vue from 'vue'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
});


Vue.prototype.$tip = tip;


app.$mount();
