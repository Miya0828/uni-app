import {
	http
} from '@/common/service/service.js'
import configService from '@/common/service/config.service.js';
const teamService = {
	/**
	 * 创建团队
	 */
	createTeam(params, loading = false) {
		return http.post('/tour-pal/sys/team/createTeam', params, {
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 查看队聊列表
	 */
	queryTeam(params, loading = false) {
		return http.post('/tour-pal/sys/teamUser/queryTeam', params, {
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 创建团队
	 */
	createTeam(params, loading = false) {
		return http.post('/tour-pal/sys/team/createTeam', params, {
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			custom: {
				loading: loading
			}
		})
	},
};

export default teamService;
