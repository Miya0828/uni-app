import Vue from 'vue';
import Vuex from 'vuex';
import MinCache from '@/common/util/MinCache.js';
import {
	ACCESS_TOKEN,
	USER_NAME,
	USER_INFO
} from "@/common/util/constants";
import {
	teamService
} from "@/api/index.js";
import configService from '@/common/service/config.service.js'

let apiUrl = configService.apiUrl;

Vue.use(Vuex)

var socketTask = null
var userId = null
let store =  new Vuex.Store({
	state: {
		token: '',
		userInfo: {
			id: null
		},
		check_status:0,
		teamRoute: null,
		team: {},
		map: {
			layer: 0,
			route: null,
			longitude: 116.40769,
			latitude: 39.89945,
			orientation: '0',
			address: ['上海市']
		}
	},
	mutations: {
		clearUser(state) {
			uni.clearStorage();
			state.token = ''
			state.userInfo = {
				id: null
			}
		},
		setToken(state, token) {
			console.log(state, token)
			uni.setStorageSync(ACCESS_TOKEN, token);
			state.token = token

			// 是否开启socket
			teamService.queryTeam().then(res => {
				if (res.data.success) {
					var teamList = res.data.result
					if(teamList.length){
						store.commit('startSocket')
					}
				}
			})
		},
		setUserInfo(state, userInfo) {
			uni.setStorageSync(USER_INFO, userInfo);
			state.userInfo = userInfo;
		},
		closeSocket() {
			console.log('closeSocket')
			uni.closeSocket();
		},
		startSocket(state) {			
			console.log("socket:==" + userId)
			if (userId != state.userInfo.id) {
				userId = state.userInfo.id
				uni.closeSocket();
				socketTask = uni.connectSocket({
					url: apiUrl.replace('http','ws')+'/tour-pal/websocket/_app' + userId,
					complete: () => {
						console.log("start connectSocket")
					}
				});

				uni.onSocketError(function(res) {
					console.log('WebSocket连接打开失败，请检查！');
				});
				uni.onSocketClose(function(res) {
					console.log('WebSocket 已关闭！');
				});
				uni.onSocketOpen(function(res) {
					console.log('WebSocket连接已打开！');

					uni.onSocketMessage(function(res) {
						console.log('App.vue收到服务器内容：' + res.data);
						uni.$emit('socketMessage', JSON.parse(res.data))
					});

					// uni.sendSocketMessage({
					// 	data: '一条消息',
					// 	fail(e) {
					// 		console.log(e)
					// 	},					
					// });
				});

				return userId
			}
			return userId
		},
	},
	actions: {

	},
	getters: {
		userInfo: state => {state.userInfo=uni.getStorageSync(USER_INFO); return state.userInfo},
	}
})

export default store