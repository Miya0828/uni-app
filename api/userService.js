
import { http } from '@/common/service/service.js' 
import configService from '@/common/service/config.service.js';
const userService = {
	/**
	 * 用户查询
	 */
	queryByUserId(param,loading = true){
		return http.get('/sys/user/queryByUserId',{params:param,custom: {loading: loading}});
	},
	 
	 /**
	  * 用户编辑
	  */
	editUser(params,loading = true) {
		return http.post('/sys/user/editUser',params,{custom: {loading: loading}})	
	},
	
};

export  default userService;
