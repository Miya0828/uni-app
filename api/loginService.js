import { http } from '@/common/service/service.js' 
import configService from '@/common/service/config.service.js';
const loginService = {
	/**
	 * 发送验证码
	 */
	sendCaptcha(param,loading = false){
		return http.post('/sys/appSendSms',param,{custom: {loading: loading}});
	},
	 
	 /**
	  * 登录
	  */
	login(params,loading = false) {
		return http.post('/sys/appUserLogin',params,{custom: {loading: loading}})	
	},
	/**
	  * 手机号码登录
	  */
	phoneNoLogin(params,loading = false) {
		return http.post('/sys/phoneLogin',params,{custom: {loading: loading}});
	},
	/**
	  * 退出
	  */
	logout(params,loading = false) {
		return http.post('/sys/logout',params,{custom: {loading: loading}});
	},
};

export  default loginService;
