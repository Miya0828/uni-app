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
		return http.get('/tour-pal/sys/site/queryRouteSiteByRouteId?routeId='+params.id, params, {
			custom: {
				loading: loading
			}
		})
	},
};

export default homeService;
