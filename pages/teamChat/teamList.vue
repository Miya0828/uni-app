<template>
	<view class="team-list-container">
		<view class="team-list-container-search">
			<uni-section title="控制清除/取消按钮" subTitle="使用 clearButton 属性设置清除按钮" type="line">
				<uni-search-bar class="uni-mt-10" radius="5" placeholder="输入用户名或昵称查找" clearButton="auto"
					cancelButton="none" @clear="clear" @blur="search" @confirm="search" />
			</uni-section>
		</view>
		<!-- 
		 "id": "1513493451648573441",
		 "realname": "chenchen",
		 "avatar": "http://119.23.214.166:8080/tour-pal/sys/common/static/SketchPngl3_1650033451456.png",
		 "sex": 0,
		 "isAuthentication": 1,
		 "userGrade": 0
		 -->
		<view class="team-list-container-list">
			<view class="team-list-container-list-item"
				v-for="item in members.filter(item=>item.realname.includes(value))" :key="item.id">
				<view class="team-list-container-list-item-left">
					<image class="team-list-container-list-item-left-avatar" :src="item.avatar" mode="aspectFit">
					</image>
					<image v-if="item.sex==0" class="team-list-container-list-item-left-gender"
						src="/static/chat/ic_boy@3x.png" mode="aspectFit"></image>
					<image v-else class="team-list-container-list-item-left-gender" src="/static/chat/ic_girl@3x.png"
						mode="aspectFit"></image>
				</view>
				<view class="team-list-container-list-item-right">
					<view class="team-list-container-list-item-right-title">
						<text>{{item.realname}}</text>
						<!-- 
						<image class="team-list-container-list-item-right-title-1" src="/static/chat/ic_vip@3x.png"
							mode="aspectFit"></image> -->
						<image v-if="item.isAuthentication" class="team-list-container-list-item-right-title-2"
							src="/static/chat/ic_verified@3x.png" mode="aspectFit"></image>
					</view>
					<view class="team-list-container-list-item-right-des">
						{{item.signature}}
					</view>
				</view>
			</view>
		</view>

		<view class="team-list-container-bottom">
			<view class="team-list-container-bottom-btn" @click="teamAction">
				{{isLoader?'解散团队':'退出团队'}}
			</view>
		</view>

	</view>
</template>

<script>
	import {
		teamService
	} from "@/api/index.js";

	import {
		ACCESS_TOKEN,
		USER_NAME,
		USER_INFO,
		SMS_CODE
	} from "@/common/util/constants";

	export default {
		data() {
			return {
				value: '',
				members: [],
				teamId: '',
				isLoader: false,
			}
		},
		onLoad(options) {			
			var currentId = uni.getStorageSync(USER_INFO).id
			this.teamId = options.id
			teamService.queryTeamUser({
				teamId: this.teamId
			}).then(res => {

				if (res.data.success) {
					this.members = res.data.result
					var result = this.members.find(function(item) {
						return item.id == currentId
					})
					console.log(result)
					if (result.userGrade==0) {
						this.isLoader = true
					}
				}

			})
		},
		onNavigationBarButtonTap() {
			console.log("点击了右上角 添加按钮");
			uni.navigateTo({
				url: `/pages/teamChat/teamView?isLoader=${this.isLoader}&teamId=${this.teamId}`
			})
		},
		methods: {
			clear() {
				console.log('clear')
				this.value = ''
			},
			search(target) {
				console.log(target.value)
				this.value = target.value

				// console.log(this.members.filter(item=>item.realname.includes(this.value)))
			},
			teamAction() {
				if (this.isLoader) {
					// 解散
					teamService.dismissTeam({
						teamId: this.teamId
					}).then(res => {
						if (res.data.success) {
							uni.showToast({
								title: '解散成功',
								duration: 1500,
								complete() {
									setTimeout(() => {
										uni.navigateBack({
											delta: 2
										})
									}, 1500)
								}
							})
						}
					})
				} else {
					// 退出
					teamService.quitTeam({
						teamId: this.teamId
					}).then(res => {
						console.log(res)
						if (res.data.success) {
							uni.showToast({
								title: '退出成功',
								duration: 1500,
								complete() {
									setTimeout(() => {
										uni.navigateBack({
											delta: 2
										})
									}, 1500)
								}
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.team-list-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);
		background: #F8F8F8;

		.team-list-container-search {
			background-color: white;
			margin-bottom: 20rpx;
		}

		.team-list-container-list {
			flex-shrink: 1;
			flex-grow: 1;
			overflow: auto;
			background-color: white;

			.team-list-container-list-item+.team-list-container-list-item {
				.team-list-container-list-item-right {
					border-top: 2rpx solid #F8F8F8;
				}
			}

			.team-list-container-list-item {
				display: flex;

				.team-list-container-list-item-left {
					padding: 20rpx 32rpx;
					padding-right: 0;
					position: relative;
					margin-right: 20rpx;

					.team-list-container-list-item-left-avatar {
						width: 88rpx;
						height: 88rpx;
						border-radius: 50%;
					}

					.team-list-container-list-item-left-gender {
						position: absolute;
						width: 20rpx;
						height: 20rpx;
						bottom: 22rpx;
						right: 0;
					}
				}

				.team-list-container-list-item-right {
					overflow: hidden;
					padding: 20rpx 32rpx;
					padding-left: 0;

					.team-list-container-list-item-right-title {
						display: flex;
						align-items: center;
						margin-bottom: 4rpx;

						text {
							font-size: 30rpx;
							font-weight: 400;
							color: #E9316D;
						}

						.team-list-container-list-item-right-title-1 {
							width: 48rpx;
							height: 48rpx;
						}

						.team-list-container-list-item-right-title-2 {
							width: 80rpx;
							height: 32rpx;

						}
					}

					.team-list-container-list-item-right-des {
						font-size: 26rpx;
						font-weight: 400;
						color: #666666;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 100%;
					}
				}
			}
		}

		.team-list-container-bottom {
			height: 208rpx;
			background: #FFFFFF;
			box-shadow: 0rpx -2rpx 4rpx 0rpx rgba(240, 240, 240, 0.5);
			padding-top: 20rpx;
			border-top: 1rpx solid rgba(240, 240, 240, 0.5);

			.team-list-container-bottom-btn {
				width: 686rpx;
				height: 100rpx;
				margin: 0 auto;
				background: rgba(0, 134, 255, 0.1);
				border-radius: 50rpx;
				text-align: center;
				line-height: 100rpx;

				font-size: 32rpx;
				font-weight: 500;
				color: #0086FF;
			}
		}
	}
</style>
