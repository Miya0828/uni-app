import Request from '@/common/luch-request/index.js'
import {ACCESS_TOKEN} from '@/common/util/constants.js'
import configService from './config.service.js'
import tip from '@/common/util/tip.js';
import store from '@/store/index.js';

let apiUrl = configService.apiUrl;

const getTokenStorage = () => {
	let token = ''
	try{
		token = uni.getStorageSync(ACCESS_TOKEN)
	}catch(e){
		//TODO handle the exception
		console.log("getTokenStorage",token)
	}
	return token;
}



const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = apiUrl /* 根域名不同 */
  config.header = {
    ...config.header
  }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    ...config.header,
     'X-Access-Token':getTokenStorage()
  }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
 if (config.custom.loading) {
    uni.showLoading({
         title:"加载中..."
     })
   }
  return config;
})

// 必须使用异步函数，注意
http.interceptor.response(
async (response) => { 
	if (response.config.custom.loading) {
	    uni.hideLoading()
	  }
  return response;
}, (response) => {
	// 请求错误做点什么
  if (response) {
      let data = response.data;
      const token = uni.getStorageSync(ACCESS_TOKEN);
      switch (data.status) {
        case 403:
          tip.error('拒绝访问');
          break;
        case 500:
          if(!token || data.message=="Token失效，请重新登录"){
            let timeout=setTimeout(tip.alert('登录已过期'), 1000);
            store.dispatch('Logout').then(() => {
				clearTimeout(timeout);
                window.location.reload();
            }) 
          }
          break;
        case 404:
          break;
        case 504:
         break;
        case 401:
          break;
        default:
          tip.error({
            duration: 0,
            forbidClick: true,
            message: data.message
          });
          break;
      }
    }
  return response;
})

export {
  http
}
