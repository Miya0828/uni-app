import {
	http
} from '@/common/service/service.js'
import configService from '@/common/service/config.service.js';
const homeService = {

	/**
	 * 获取天气
	 */
	getRealTimeWeather(params, loading = false) {
		return http.post('/tour-pal/sys/partyData/getRealTimeWeather', params, {
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 上传位置
	 */
	uploadPosition(params, loading = false) {
		return http.post('/tour-pal/sys/position/uploadPosition', params, {
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 路线列表 - 支持分页
	 */
	routeList(params, loading = true) {
		return http.get('/tour-pal/sys/route/list', params, {
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 路线列表 - 无分页
	 */
	queryRouteList(params, loading = true) {
		return http.get('/tour-pal/sys/route/queryRouteList', params, {
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 站点和路线查询
	 */
	queryRouteSiteByRouteId(params, loading = true) {
		return http.get('/tour-pal/sys/site/queryRouteSiteByRouteId?routeId=' + params.id, params, {
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 驴友最新位置获取接口
	 */
	queryUserRealtime(params, loading = false) {
		return http.get('/tour-pal/sys/position/queryUserRealtime?teamId=' + params.teamId, params, {
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 新增用户徒步路线历史数据接口
	 */
	addUserRoute(params, loading = false) {
		return http.get('/tour-pal/sys/route/addUserRoute?routeId=' + params.routeId + '&userId=' + params.userId,
			params, {
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				custom: {
					loading: loading
				}
			})
	},
	/**
	 * 查询当前用户正在进行路线数据接口
	 */
	queryRouteByUserId(params, loading = false) {
		return http.get('/tour-pal/sys/route/queryRouteByUserId?userId=' + params.userId, params, {
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			custom: {
				loading: loading
			}
		})
	},
	/**
	 * 路线打卡接口
	 */
	routePunch(params, loading = false) {
		return http.get('/tour-pal/sys/route/punch?id=' + params.routeId, params, {
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			custom: {
				loading: loading
			}
		})
	},
};

export default homeService;
