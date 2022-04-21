<script>
	import Vue from 'vue';
	import {
		ACCESS_TOKEN,
		USER_INFO
	} from '@/common/util/constants.js'
	import store from '@/store/index.js';
	import {
		teamService
	} from "@/api/index.js";	
	
	export default {
		globalData: {
			text: 'text'
		},
		onLaunch: function() {
			if (!uni.getStorageSync(ACCESS_TOKEN)) {
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return
			}
			store.state.token = uni.getStorageSync(ACCESS_TOKEN)
			store.state.userInfo = uni.getStorageSync(USER_INFO)			
			// 是否有teamChat&&判断token是否过期
			teamService.queryTeam().then(res => {
				if (res.data.success) {
					let timer = null
					uni.$on('closeHeartbeat', () => {
						console.log('closeHeartbeat')
						clearInterval(timer)
					})
					var second = 10;
					(function heartbeat() {
						timer = setInterval(() => {
							uni.$emit('triggerHeartbeat', '❤')
						}, 1000 * second)
					})();

					var teamList = res.data.result
					if (teamList.length) {
						(function initChat() {
							console.log("initChat")
							store.commit('startSocket')
						})()
					}

					;
					(function initUser() {
						store.state.userInfo = uni.getStorageSync(USER_INFO)
						store.state.token = uni.getStorageSync(ACCESS_TOKEN)
					})();


				}
			});
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
	};
</script>
<style>
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	/* @import 'plugin/colorui/main.css';
	@import 'plugin/colorui/icon.css';
	@import 'plugin/colorui/animation.css'; */

	/* #endif*/
	.uni-input-placeholder {
		color: rgba(184, 184, 184, 1);
	}
</style>
