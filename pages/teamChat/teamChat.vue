<template>
	<view class="team-chat-container">
		<view v-if="teamList.length" class="team-chat-container-list">
			<view class="team-chat-container-list-item" @click="toteam(item)" v-for="(item,index) in teamList"
				:key="index">
				<view class="team-chat-container-item-logo">
					<image :src="item.teamIcon" mode="aspectFit"></image>
				</view>
				<view class="team-chat-container-item-box">
					<view class="team-chat-container-item-title">
						{{item.teamName}}
					</view>
					<view class="team-chat-container-item-des">
						{{item.teamIntroduce}}
					</view>
				</view>
			</view>
		</view>

		<view v-else class="team-chat-container-create" @click="createTeam">
			<view class="team-chat-container-item-logo">
				<image src="/static/chat/ic_createateam@3x.png" mode=""></image>
			</view>
			<view class="team-chat-container-item-box">
				<view class="team-chat-container-item-title">
					创建团队
				</view>
				<view class="team-chat-container-item-des">
					通过队长模式可以很方便的管理队伍
				</view>
			</view>
		</view>
		<view>
			<!-- 提示成为领队 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="info" cancelText="取消" confirmText="队长申请" title="通知" content="只用队长才能创建队聊"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';
	import {
		teamService
	} from "@/api/index.js";

	export default {
		data() {
			return {
				teamList: []
			}
		},
		onShow() {
			teamService.queryTeam().then(res => {
				// console.log(res)
				if (res.data.success) {
					console.log(res.data.result)
					this.teamList = res.data.result
					this.teamList.forEach(team => {
						uni.preloadPage({
							url: `/pages/teamChat/chat?title=${team.teamName}&id=${team.id}`
						})
					})
				}
			})
		},
		methods: {
			dialogConfirm() {
				uni.reLaunch({
					url: '/pages/mine/mine'
				})
			},
			dialogClose() {
				this.$refs.alertDialog.close()
			},
			createTeam() {
				if (store.state.check_status != 2) {
					this.$refs.alertDialog.open()
					return
				}
				uni.navigateTo({
					url: '/pages/teamChat/teamCreate'
				})
			},
			toteam(team) {
				uni.navigateTo({
					url: `/pages/teamChat/chat?title=${team.teamName}&id=${team.id}`
				})
			}
		},
		onNavigationBarButtonTap() {
			console.log("点击了右上角 添加按钮");
			uni.navigateTo({
				url: '/pages/teamChat/teamJoin'
			})
		}
	}
</script>

<style lang="scss">
	.team-chat-container {
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);
		background: #F8F8F8;
		height: 100vh;

		.team-chat-container-list-item+.team-chat-container-list-item {
			border-top: 1rpx solid rgba(0, 0, 0, 0.1);
		}

		.team-chat-container-create,
		.team-chat-container-list-item {
			background-color: white;
			display: flex;
			padding: 20rpx 32rpx;

			.team-chat-container-item-logo {
				image {
					width: 88rpx;
					height: 88rpx;
				}
			}

			.team-chat-container-item-box {
				padding: 0 20rpx;

				.team-chat-container-item-title {
					font-size: 30rpx;
					font-weight: 400;
					color: #000000;
					margin-bottom: 6rpx;
				}

				.team-chat-container-item-des {
					font-size: 26rpx;
					font-weight: 400;
					color: #666666;
				}
			}
		}

	}
</style>
