<template>
	<view class="route-container">
		<scroll-view scroll-y="true" class="scroll-Y" lower-threshold="150" @scrolltolower="loadmore">

			<template v-for="item in routeList">

				<view class="route-container-item" @click="chooseRoute(item)">
					<view class="route-container-item-pic">
						<image :src="configService.staticDomainURL+'/'+item.scenicSpotImg" mode="aspectFit"></image>
					</view>
					<view class="route-container-item-des">
						<view class="route-container-item-des-title">
							<view class="route-container-item-des-title-1">{{item.routeName}}</view>
							<text class="route-container-item-des-title-2">{{item.address}}</text>
							<text class="route-container-item-des-title-2">{{item.scenicSpotLevel}}A景区</text>
							<!-- <view class="route-container-item-des-title-3">
								当前路线
							</view> -->
						</view>
						<view class="route-container-item-rate">
							<uni-rate allow-half :value="item.ratingScale" :size="18" :readonly="true" :is-fill="false"
								color="#bbb" active-color="#E41000" />
							<text>{{item.punchNumber}}人打卡</text>
						</view>
						<view class="route-container-item-distance">
							总里程：{{item.totalMileage}} 徒步总需耗时{{item.totalTime}}
						</view>
					</view>
				</view>
			</template>
		</scroll-view>
	</view>
</template>

<script>
	import store from '@/store/index.js';
	import {
		homeService
	} from "@/api/index.js";
	import configService from '@/common/service/config.service.js'
	export default {
		data() {
			return {
				pageNo: 1,
				routeList: [],
				configService
			}
		},
		mounted() {
			this.getRouteList();
		},
		onLoad(options) {
			// console.log(options)
			this.teamCreate = options.teamCreate
		},
		methods: {
			getRouteList() {
				homeService.routeList({
					pageNo: this.pageNo++,
					pageSize: 10
				}).then(res => {
					if (res.data.code == 200) {
						// console.log(res.data.result)
						this.routeList.push(...res.data.result.records)
					}
				})
			},
			loadmore() {
				this.getRouteList();
			},
			chooseRoute(route) {
				if (this.teamCreate) {					
					store.state.teamRoute = route
					uni.navigateBack();
					return
				}
				homeService.queryRouteSiteByRouteId({
					id: parseInt(route.id)
				}).then(res => {
					// console.log(res.data.result)
					store.state.map.route = res.data.result
					uni.navigateBack();
				})
			}
		}
	}
</script>

<style lang="scss">
	.route-container {
		padding: 0 54rpx;
		height: 100vh;

		.scroll-Y {
			height: 100vh;
		}

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
