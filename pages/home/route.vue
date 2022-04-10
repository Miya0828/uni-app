<template>
	<view class="route-container">
		<template v-for="item in routeList">
			<view class="route-container-item" @click="chooseRoute(item)">
				<view class="route-container-item-pic">
					<image src="/static/logo.png" mode="aspectFit"></image>
				</view>
				<view class="route-container-item-des">
					<view class="route-container-item-des-title">
						<view class="route-container-item-des-title-1">{{item.name}}</view>
						<text class="route-container-item-des-title-2">上海市</text>
						<text class="route-container-item-des-title-2">5A景区</text>
						<view class="route-container-item-des-title-3">
							当前路线
						</view>
					</view>
					<view class="route-container-item-rate">
						<uni-rate allow-half :value="3.5" :size="18" :readonly="true" :is-fill="false" color="#bbb"
							active-color="#E41000" />
						<text>123人打卡</text>
					</view>
					<view class="route-container-item-distance">
						总里程：123.4公里 徒步总需耗时2天2小时21分
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import data from './data/demo.js'
	import store from '@/store/index.js';
	export default {
		data() {
			return {
				routeList: data.trackList.concat(data.trackList, data.trackList)
			}
		},
		methods: {
			chooseRoute(route) {
				store.state.map.route = route
				console.log(route)
				uni.navigateBack({
					url: '/pages/home/route'
				});
			}
		}
	}
</script>

<style lang="scss">
	.route-container {
		padding: 0 54rpx;
		overflow-x: hidden;
		overflow-y: auto;

		.route-container-item {
			border-bottom: 2px solid #F8F8F8;
			display: flex;
			padding: 32rpx 0;

			.route-container-item-pic {
				width: 132rpx;
				height: 132rpx;

				image {
					width: 132rpx;
					height: 132rpx;
				}
			}

			.route-container-item-des {
				padding-left: 16rpx;
				flex-grow: 1;
				overflow: hidden;
				.route-container-item-des-title {
					color: #333333;
					font-size: 32rpx;
					font-weight: 500;
					display: flex;
					align-items: flex-end;

					.route-container-item-des-title-1 {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						flex-shrink: 1;
						flex-grow: 1;
					}

					.route-container-item-des-title-2 {
						color: #999999;
						font-size: 22rpx;
						font-weight: 400;
						flex-shrink: 0;
					}

					.route-container-item-des-title-3 {
						width: 108rpx;
						height: 44rpx;
						background: rgba(0, 137, 255, 0.1);
						border-radius: 5rpx;
						font-size: 22rpx;
						font-weight: 400;
						color: #0189FF;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: 20rpx;
						flex-shrink: 0;
					}

					margin-bottom: 10rpx;
				}

				.route-container-item-rate {
					align-items: center;
					display: flex;
					margin-bottom: 10rpx;

					text {
						margin-left: 6rpx;
						color: #999999;
						font-size: 22rpx;
						font-weight: 400;
					}
				}

				.route-container-item-distance {
					font-size: 22rpx;
					font-weight: 400;
					color: #0086FF;
				}
			}
		}
	}
</style>
