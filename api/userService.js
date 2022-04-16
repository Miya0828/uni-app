
import { http } from '@/common/service/service.js' 
import configService from '@/common/service/config.service.js';
const userService = {
	/**
	 * 用户查询
	 */
	queryByUserId(param,loading = true){
		return http.get('/tour-pal/sys/user/queryByUserId',{params:param,custom: {loading: loading}});
	},
	 
	 /**
	  * 用户编辑
	  */
	editUser(params,loading = true) {
		return http.post('/tour-pal/sys/user/editUser',params,{custom: {loading: loading}})	
	},
	
	/**
	 * 身份认证
	 */
	certification(params,loading = true) {
		return http.post('/tour-pal/sys/identityCard/upload',params,{custom: {loading: loading}})	
	},
};

export  default userService;
