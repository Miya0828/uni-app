<template>
	<view class="layer-container">
		<view class="layer-container-title">
			图层选择
		</view>
		<view class="layer-container-selection">
			<view class="layer-container-item" @click="selectLayer(0)">
				<view v-if="currentLayer==0" class="layer-container-item-box">
					<uni-icons class="layer-container-item-icon" color="#0086FF" type="checkbox-filled" size="24">
					</uni-icons>
				</view>
				<image src="/static/home/layer/vec.png" mode="aspectFit"></image>
				<view :class="currentLayer==0?'current':''">天地图</view>
			</view>
			<view class="layer-container-item" @click="selectLayer(1)">
				<view v-if="currentLayer==1" class="layer-container-item-box">
					<uni-icons class="layer-container-item-icon" color="#0086FF" type="checkbox-filled" size="24">
					</uni-icons>
				</view>
				<image src="/static/home/layer/img_c.png" mode="aspectFit"></image>
				<view :class="currentLayer==1?'current':''">天地图卫星</view>
			</view>
			<view class="layer-container-item" @click="selectLayer(2)">
				<view v-if="currentLayer==2" class="layer-container-item-box">
					<uni-icons class="layer-container-item-icon" color="#0086FF" type="checkbox-filled" size="24">
					</uni-icons>
				</view>
				<image src="/static/home/layer/vec_c.png" mode="aspectFit"></image>
				<view :class="currentLayer==2?'current':''">天地图地形</view>
			</view>
		</view>

		<view class="layer-container-bottom">
			<view class="layer-container-bottom-input">
				<view class="layer-container-bottom-input-left">
					<image src="/static/home/layer/vec_c.png" mode="aspectFit"></image>
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
	export default {
		data() {
			return {
				currentLayer: 0
			}
		},
		onLoad(options) {
			console.log(options)
			this.currentLayer = options.currentLayer
		},
		methods: {
			selectLayer(num) {
				this.currentLayer = num
				uni.$emit('update', {
					layer: num
				})
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
		position: relative;

		.layer-container-title {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			margin-bottom: 40rpx;
		}

		.layer-container-selection {
			display: flex;

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
			width: 100%;

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
