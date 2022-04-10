import Vue from 'vue';
import Vuex from 'vuex';
import MinCache from'@/common/util/MinCache.js';
import { ACCESS_TOKEN,USER_NAME,USER_INFO } from "@/common/util/constants";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userid:'',
    username: '',
    realname: '',
    welcome: '',
    avatar: '',
	map:{
		layer:0,
		route:null
	}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { username, realname, welcome }) => {
      state.username = username
      state.realname = realname
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: { 
  },
  getters:{
    token: state => state.token,
	username: state => {state.userid=uni.getStorageSync(USER_INFO).username; return state.username},
	nickname: state => {state.userid=uni.getStorageSync(USER_INFO).realname; return state.user.realname},
	avatar: state => {state.userid=uni.getStorageSync(USER_INFO).avatar; return state.user.avatar},
	userid:state => {state.userid=uni.getStorageSync(USER_INFO).id; return state.userid},
  }
})
