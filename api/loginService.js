import { http } from '@/common/service/service.js' 
import configService from '@/common/service/config.service.js';
const loginService = {
	/**
	 * 发送验证码
	 */
	sendCaptcha(param,loading = true){
		return http.post('/tour-pal/sys/appSendSms',param,{custom: {loading: loading}});
	},
	 
	 /**
	  * 密码登录
	  */
	login(params,loading = true) {
		return http.post('/tour-pal/sys/appUserLogin',params,{custom: {loading: loading}})	
	},
	/**
	  * 手机号码登录
	  */
	phoneLogin(params,loading = true) {
		return http.post('/tour-pal/sys/phoneLogin',params,{custom: {loading: loading}});
	},
	/**
	  * 退出
	  */
	logout(params,loading = true) {
		return http.post('/tour-pal/sys/logout',params,{custom: {loading: loading}});
	},
	/**
	 * 注册
	 */
	register(params,loading = true) {
		return http.post('/tour-pal/sys/register',params,{custom: {loading: loading}});
	},
};

export  default loginService;
