
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
	 * 查询实名认证身份认证
	 */
	queryIdentityCard(params,loading = true) {
		return http.post('/tour-pal/sys/identityCard/queryIdentityCard',params,{custom: {loading: loading}})	
	},
	/**
	 * 身份认证
	 */
	certification(params,loading = true) {
		return http.post('/tour-pal/sys/identityCard/upload',params,{header: {"content-type":"application/x-www-form-urlencoded"},custom: {loading: loading}})	
	},
	/**
	 * 身份审核中
	 */
	checkIdentityCard(params,loading = true) {
		return http.post('/tour-pal/sys/identityCard/checkIdentityCard',params,{header: {"content-type":"application/x-www-form-urlencoded"},custom: {loading: loading}})	
	},
	/**
	 * 擅长类型
	 */
	queryBeGoodAtRegion(params,loading = true) {
		return http.post('/tour-pal/sys/teamLeader/queryBeGoodAtRegion',params,{custom: {loading: loading}})	
	},
	/**
	 * 擅长区域
	 */
	queryArea(params,loading = true) {
		return http.post('/tour-pal/sys/teamLeader/queryArea',params,{custom: {loading: loading}})	
	},
	/**
	 * 获取领队信息
	 */
	queryTeamLeader(params,loading = true) {
		return http.post('/tour-pal/sys/teamLeader/queryTeamLeader',params,{custom: {loading: loading}})	
	},
	/**
	 * 领队认证
	 */
	uploadTeamLeader(params,loading = true) {
		return http.post('/tour-pal/sys/teamLeader/uploadTeamLeader',params,{header: {"content-type":"application/x-www-form-urlencoded"},custom: {loading: loading}})	
	},
	
	
};

export  default userService;
