<script>
	import Vue from 'vue';
	import {
		ACCESS_TOKEN
	} from '@/common/util/constants.js'

	export default {
		globalData: {
			text: 'text'
		},
		onLaunch: function() {

			let token = uni.getStorageSync(ACCESS_TOKEN);
			if (!token) {
				uni.reLaunch({
					url: '/pages/login/login',
				});
			}

			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					}
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
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
	@import 'plugin/colorui/main.css';
	@import 'plugin/colorui/icon.css';
	@import 'plugin/colorui/animation.css';
</style>
