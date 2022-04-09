<template>
	<view class="home-container">

	</view>

</template>
<script>
	import {
		ACCESS_TOKEN
	} from '@/common/util/constants.js'

	export default {
		data() {
			return {
				slowLoading: true
			}
		},
		methods: {
			// 未登录去登录
			isLogin() {
				let token = uni.getStorageSync(ACCESS_TOKEN);
				if (!token) {
					uni.navigateTo({
						url: '/pages/login/login',
						animationType: 'slide-in-left',
						animationDuration: 200
					});
				}
			}
		},
		onLoad() {
			this.isLogin()
		},
		onShow() {
			console.log('home show')
		}
	}
</script>

<style lang="scss">
	.home-container {}

	page {
		&::after {
			content: ' ';
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 1rpx;
			background-color: rgba(220, 220, 220, 0.5);
			box-shadow: 0rpx -2rpx 2rpx 0rpx rgba(220, 220, 220, 0.5);
		}
	}
</style>
