<template>
	<view class="layer-container">
		<view class="layer-container-title">
			图层选择
		</view>
		<view class="layer-container-selection">
			<view class="layer-container-item" @click="selectLayer(0)">
				<view v-if="currentLayer==0" class="layer-container-item-box">
					<image class="layer-container-item-icon" src="/static/home/layer/ic_choose@3x.png" mode="aspectFit">
					</image>
				</view>
				<image src="/static/home/layer/vec.png" mode="aspectFit"></image>
				<view :class="currentLayer==0?'current':''">天地图</view>
			</view>
			<view class="layer-container-item" @click="selectLayer(1)">
				<view v-if="currentLayer==1" class="layer-container-item-box">
					<image class="layer-container-item-icon" src="/static/home/layer/ic_choose@3x.png" mode="aspectFit">
					</image>
				</view>
				<image src="/static/home/layer/img_c.png" mode="aspectFit"></image>
				<view :class="currentLayer==1?'current':''">天地图卫星</view>
			</view>
			<view class="layer-container-item" @click="selectLayer(2)">
				<view v-if="currentLayer==2" class="layer-container-item-box">
					<image class="layer-container-item-icon" src="/static/home/layer/ic_choose@3x.png" mode="aspectFit">
					</image>
				</view>
				<image src="/static/home/layer/vec_c.png" mode="aspectFit"></image>
				<view :class="currentLayer==2?'current':''">天地图地形</view>
			</view>
		</view>


		<view class="route-container-item" v-if="currentRoue">
			<view class="route-container-item-pic">
				<image :src="configService.staticDomainURL+'/'+currentRoue.scenicSpotImg" mode="aspectFit"></image>
			</view>
			<view class="route-container-item-des">
				<view class="route-container-item-des-title">
					<view class="route-container-item-des-title-1">{{currentRoue.routeName}}</view>
					<text class="route-container-item-des-title-2">{{currentRoue.address}}</text>
					<text class="route-container-item-des-title-2">{{currentRoue.scenicSpotLevel}}A景区</text>
					<view class="route-container-item-des-title-3">
						当前路线
					</view>
				</view>
				<view class="route-container-item-rate">
					<uni-rate allow-half :value="currentRoue.ratingScale" :size="18" :readonly="true" :is-fill="false"
						color="#bbb" active-color="#E41000" />
					<text>{{currentRoue.punchNumber}}人打卡</text>
				</view>
				<view class="route-container-item-distance">
					总里程：{{currentRoue.totalMileage}} 徒步总需耗时{{currentRoue.totalTime}}
				</view>
			</view>
		</view>

		<view class="layer-container-bottom">
			<view class="layer-container-bottom-input" @click="selectRoute">
				<view class="layer-container-bottom-input-left">
					<image src="/static/home/layer/ic_routeselection@3x.png" mode="aspectFit"></image>
					徒步路线选择
				</view>
				<uni-icons color="#3D3D3D" type="forward" size="19">
				</uni-icons>
			</view>
			<view class="layer-container-bottom-input">
				<view class="layer-container-bottom-input-left">
					<image src="/static/home/layer/ic_offlinemap@3x.png" mode="aspectFit"></image>
					离线地图下载
				</view>
				<uni-icons color="#3D3D3D" type="forward" size="19">
				</uni-icons>
			</view>
			<view class="layer-container-bottom-input">
				<view class="layer-container-bottom-input-left">
					<image src="/static/home/layer/ic_mapsettings@3x.png" mode="aspectFit"></image>
					地图设置
				</view>
				<uni-icons color="#3D3D3D" type="forward" size="19">
				</uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';
	import configService from '@/common/service/config.service.js'
	export default {
		data() {
			return {
				currentLayer: 0,
				currentRoue: null,
				configService
			}
		},
		onShow(options) {
			this.currentLayer = store.state.map.layer
			if (store.state.map.route) {
				this.currentRoue = store.state.map.route.onfootRouteInfo
			}

		},
		methods: {
			selectRoute() {
				uni.navigateTo({
					url: '/pages/home/route'
				});
			},
			selectLayer(num) {
				this.currentLayer = num
				store.state.map.layer = num

				uni.navigateBack({
					delta: 1,
				});
			}
		}
	}
</script>

<style lang="scss">
	.layer-container {
		padding: 32rpx;
		height: 100vh;
		width: 100vw;
		box-sizing: border-box;
		position: relative;

		.layer-container-title {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			margin-bottom: 40rpx;
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

		.layer-container-selection {
			display: flex;
			margin-bottom: 160rpx;			
			.layer-container-item {
				position: relative;

				.layer-container-item-box {
					position: absolute;
					width: 170rpx;
					height: 128rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.layer-container-item-icon {
						background-color: white;
						border-radius: 50%;
						width: 32rpx;
						height: 32rpx;
						position: relative;
						z-index: 1;
					}
				}

				margin-right: 16rpx;

				image {
					width: 170rpx;
					height: 128rpx;
					margin-bottom: 8rpx;
					border-radius: 6rpx;
				}

				view {
					text-align: center;
					font-size: 24rpx;
					font-weight: 400;
					color: #666666;
				}

				view.current {
					color: #0086FF;
				}
			}
		}

		.layer-container-bottom {
			position: absolute;
			padding: 32rpx;
			bottom: 100rpx;
			left: 0;
			box-sizing: border-box;
			width: 100vw;

			.layer-container-bottom-input {
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2rpx solid #F6F6F6;

				.layer-container-bottom-input-left {
					color: #666666;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>
