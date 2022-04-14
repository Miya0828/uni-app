<template>
	<view class="team-chat-container">
		<view class="team-chat-container-create" @click="createTeam">
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
		<view class="team-chat-container-list">
			<view class="team-chat-container-list-item" @click="toteam">
				<view class="team-chat-container-item-logo">
					<image src="/static/chat/ic_createateam@3x.png" mode=""></image>
				</view>
				<view class="team-chat-container-item-box">
					<view class="team-chat-container-item-title">
						团队一
					</view>
					<view class="team-chat-container-item-des">
						通过队长模式可以很方便的管理队伍
					</view>
				</view>
			</view>
			<view class="team-chat-container-list-item">
				<view class="team-chat-container-item-logo">
					<image src="/static/chat/ic_createateam@3x.png" mode=""></image>
				</view>
				<view class="team-chat-container-item-box">
					<view class="team-chat-container-item-title">
						团队二
					</view>
					<view class="team-chat-container-item-des">
						通过队长模式可以很方便的管理队伍
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			createTeam() {
				uni.navigateTo({
					url: '/pages/teamChat/teamCreate'
				})
			},
			toteam(){
				uni.navigateTo({
					url: '/pages/teamChat/chat'
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
