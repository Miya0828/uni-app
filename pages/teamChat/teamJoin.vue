<template>
	<view class="team-join-container">
		<view class="team-join-container-item">
			<input class="team-join-container-item-input" placeholder="请填写邀请码" type="text" :value="value"
				@confirm="confirmHandle" @blur="blurHandle" @input="inputHandle" />
		</view>

		<view class="team-join-container-join">
			<view class="team-join-container-join-button" @click="joinTeam">
				加入
			</view>
		</view>
	</view>
</template>

<script>
	import {
		teamService
	} from "@/api/index.js";
	export default {
		data() {
			return {
				value: ''
			}
		},
		methods: {
			joinTeam() {
				if (!this.value) {
					uni.showToast({
						icon: 'error',
						title: '请填写邀请码',
						duration: 2000
					});
					return
				}
				teamService.joinTeam({
					teamInviteCode: this.value
				}).then(res => {
					// console.log(res)
					if (res.data.success) {
						uni.switchTab({
							url: '/pages/teamChat/teamChat'
						});
					}
				})
			},
			confirmHandle(e) {
				console.log('confirmHandle')
				console.log(e.target.value)
				this.value = e.target.value
			},
			blurHandle(e) {
				console.log('blurHandle')
				console.log(e.target.value)
				this.value = e.target.value
			},
			inputHandle(e) {
				console.log('inputHandle')
				console.log(e.target.value)
				this.value = e.target.value
			}
		},
		onNavigationBarButtonTap() {
			console.log("点击了右上角 添加按钮");
			// 允许从相机和相册扫码
			uni.scanCode({
				success: (res) => {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					this.value = res.result
				}
			});
		}
	}
</script>

<style lang="scss">
	.team-join-container {
		height: 100vh;
		background: #F8F8F8;
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);

		.team-join-container-join {
			position: absolute;
			bottom: 8%;
			width: 100%;

			.team-join-container-join-button {
				height: 100rpx;
				width: 686rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #FFFFFF;
				background: #0086FF;
				text-align: center;
				border-radius: 50rpx;
				line-height: 100rpx;
				margin: 0 auto;
			}
		}

		.team-join-container-item {
			height: 132rpx;
			background: #FFFFFF;
			padding: 20rpx 32rpx;

			.team-join-container-item-input {
				width: 686rpx;
				height: 92rpx;
				background: #F8F8F8;
				border-radius: 46rpx;
				text-indent: 48rpx;

				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
			}
		}
	}
</style>
