<script>
	import Vue from 'vue';
	import {
		ACCESS_TOKEN,
		USER_INFO
	} from '@/common/util/constants.js'
	import store from '@/store/index.js';
	export default {
		globalData: {
			text: 'text'
		},
		onLaunch: function() {
			console.log('App Launch');

			let token = uni.getStorageSync(ACCESS_TOKEN);
			if (!token) {
				uni.reLaunch({
					url: '/pages/login/login',
				});
			}
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
	@import 'plugin/colorui/main.css';
	@import 'plugin/colorui/icon.css';
	@import 'plugin/colorui/animation.css';

	/* #endif*/
	.uni-input-placeholder {
		color: rgba(184, 184, 184, 1);
	}
</style>
