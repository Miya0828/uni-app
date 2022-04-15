<template>
	<view class="community-container">
		<view class="community-container-list">
			<view class="community-container-list-item" v-for="item in [1,2,3,4,5,6,7,8,9]" :key="item">
				<view class="community-container-list-item-header">
					<view class="community-container-list-item-header-left">
						<image src="/static/logo.png" mode="aspectFit"></image>
						<view class="community-container-list-item-header-name">
							<view class="community-container-list-item-header-name-1">
								安其拉
							</view>
							<view class="community-container-list-item-header-name-2">
								1小时前
							</view>
						</view>
					</view>
					<view class="community-container-list-item-header-right">
						<view class="community-container-list-item-header-right-button">
							动态
						</view>
					</view>
				</view>

				<view class="community-container-list-item-content">
					<view class="community-container-list-item-content-des">
						最好的风景就是在路上…加油！
					</view>
					<view class="community-container-list-item-content-pic">
						<image src="/static/logo.png" mode="aspectFit"></image>
					</view>
				</view>

				<view class="community-container-list-item-feature">
					<view class="community-container-list-item-feature-address">
						<image src="/static/community/ic_location@3x.png" mode="aspectFit"></image>
						<view>浙江省温州雁荡山·温州</view>
					</view>
					<view class="community-container-list-item-feature-time">
						<text>拍摄于 2022.04.09</text>
					</view>
				</view>

				<view class="community-container-list-item-action">
					<view class="community-container-list-item-action-view">
						<image src="/static/community/ic_eye@3x.png" mode="aspectFit"></image>
						<text>1234</text>
					</view>
					<view class="community-container-list-item-action-view">
						<image src="/static/community/ic_collect@3x.png" mode="aspectFit"></image>
						<text>893</text>
					</view>
					<view class="community-container-list-item-action-view">
						<image src="/static/community/ic_chat@3x.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {

	};
</script>

<style lang="scss">
	.community-container {
		background-color: white;
		padding: 0 32rpx;

		.community-container-list {
			.community-container-list-item+.community-container-list-item {
				border-top: 2rpx solid #F8F8F8; //
			}

			.community-container-list-item {
				padding: 36rpx 0;

				.community-container-list-item-header {
					display: flex;
					justify-content: space-between;
					margin-bottom: 20rpx;

					.community-container-list-item-header-left {
						display: flex;

						image {
							width: 72rpx;
							height: 72rpx;
						}

						.community-container-list-item-header-name {
							padding-left: 20rpx;

							.community-container-list-item-header-name-1 {
								font-size: 32rpx;
								font-weight: 400;
								color: #333333;
								margin-bottom: 6rpx;
							}

							.community-container-list-item-header-name-2 {
								font-size: 24rpx;
								font-weight: 400;
								color: #999999;
							}
						}
					}

					.community-container-list-item-header-right {
						.community-container-list-item-header-right-button {
							width: 120rpx;
							height: 64rpx;
							background: rgba(0, 137, 255, 0.1);
							border-radius: 5rpx;
							font-size: 28rpx;
							font-weight: 400;
							color: #0189FF;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}

				.community-container-list-item-content {
					margin-bottom: 20rpx;

					.community-container-list-item-content-des {
						font-size: 32rpx;
						font-weight: 400;
						color: #333333;
						margin-bottom: 20rpx;
					}

					.community-container-list-item-content-pic {}
				}

				.community-container-list-item-feature {
					display: flex;
					margin-bottom: 24rpx;


					.community-container-list-item-feature-address {
						padding: 12rpx 20rpx;
						background: #F8F8F8;
						border-radius: 8rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #999999;
						display: flex;
						align-items: center;
						margin-right: 20rpx;

						image {
							width: 24rpx;
							height: 24rpx;
							margin-right: 6rpx;
						}

					}

					.community-container-list-item-feature-time {
						padding: 12rpx 20rpx;
						background: #F8F8F8;
						border-radius: 8rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #999999;
						display: flex;
					}
				}

				.community-container-list-item-action {
					display: flex;
					justify-content: flex-end;
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;

					view+view {
						margin-left: 60rpx;
					}

					.community-container-list-item-action-view {
						display: flex;
						align-items: center;

						image {
							width: 32rpx;
							height: 32rpx;
							margin-right: 4rpx;
						}

					}
				}
			}
		}
	}

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
