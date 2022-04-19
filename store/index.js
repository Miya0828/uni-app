import Vue from 'vue';
import Vuex from 'vuex';
import MinCache from '@/common/util/MinCache.js';
import {
	ACCESS_TOKEN,
	USER_NAME,
	USER_INFO
} from "@/common/util/constants";

Vue.use(Vuex)

var socketTask = null
var userId = null
export default new Vuex.Store({
	state: {
		userInfo: {
			id: null
		},
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
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_NAME: (state, {
			username,
			realname,
			welcome
		}) => {
			state.username = username
			state.realname = realname
			state.welcome = welcome
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		socket(state) {
			console.log("socket:==" + userId)
			if (userId != state.userInfo.id) {
				userId = state.userInfo.id
				uni.closeSocket();
				socketTask = uni.connectSocket({
					url: 'ws://119.23.214.166:8080/tour-pal/websocket/_app' + userId,
					complete: () => {}
				});
				return userId
			}
			return userId
		},
	},
	actions: {

	},
	getters: {

	}
})
