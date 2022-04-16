

import { http } from '@/common/service/service.js' 
import configService from '@/common/service/config.service.js';
const forHelpService = {
	
	 /**
	  * 获取求救列表
	  */
	onfootFirstaid(params,loading = true) {
		return http.post('/tour-pal/sys/onfootFirstaid/onfootHeaderList',params,{custom: {loading: loading}})	
	},
	
};

export  default forHelpService;
