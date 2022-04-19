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
	/**
	 * 修改团队
	 */
	updateTeam(params, loading = false) {
		return http.post('/tour-pal/sys/team/updateTeam', params, {
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 加入团队
	 */
	joinTeam(params, loading = false) {
		return http.post('/tour-pal/sys/teamUser/joinTeam', params, {
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 查看团队成员信息接口
	 */
	queryTeamUser(params, loading = false) {
		return http.post('/tour-pal/sys/teamUser/queryTeamUser', params, {
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 解散团队
	 */
	dismissTeam(params, loading = false) {
		return http.post('/tour-pal/sys/teamUser/dismissTeam', params, {
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 退出团队
	 */
	quitTeam(params, loading = false) {
		return http.post('/tour-pal/sys/teamUser/quitTeam', params, {
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 路线查询
	 */
	queryById(params, loading = false) {
		return http.get('/tour-pal/sys/route/queryById?id='+params.id, params, {
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
