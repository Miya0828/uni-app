<template>
	<view class="skilled-in-container">
		<view class="skilled-in-container-header">
			<uni-section title="控制清除/取消按钮" subTitle="使用 clearButton 属性设置清除按钮" type="line">
				<uni-search-bar class="uni-mt-10" radius="5" placeholder="地名、地名首字母" clearButton="auto"
					cancelButton="none" @confirm="search" />
			</uni-section>
		</view>
		<view class="skilled-in-container-address">
			<view class="skilled-in-container-address-des">
				目前您的位置
			</view>
			<view class="skilled-in-container-address-content">
				<view class="skilled-in-container-address-content-left">
					<image src="/static/mine/ic_position@3x.png" mode="aspectFit"></image>
					<text>永州市道县</text>
				</view>
				<view class="skilled-in-container-address-content-right">
					重新定位
				</view>
			</view>
		</view>

		<view class="skilled-in-container-country">
			<view class="skilled-in-container-country-item current">
				国内
			</view>
			<view class="skilled-in-container-country-item">
				国外
			</view>
		</view>
		<view class="skilled-in-container-list">
			<uni-collapse accordion @change="change">
				<uni-collapse-item title="北京">
					<view class="skilled-in-container-city-list">
						<view class="skilled-in-container-list-city">
							北京
						</view>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="江苏" v-for="(item,index) in [1,2,3,4,5,6,7,8,9,0,1,2,3]" :key="index">
					<view class="skilled-in-container-city-list">
						<view class="skilled-in-container-list-city">
							徐州
						</view>
						<view class="skilled-in-container-list-city">
							连云港
						</view>
						<view class="skilled-in-container-list-city">
							南京
						</view>
						<view class="skilled-in-container-list-city">
							宿迁
						</view>
						<view class="skilled-in-container-list-city">
							常州
						</view>
						<view class="skilled-in-container-list-city">
							苏州
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accordionVal: '1',
			}
		},
		methods: {
			change(e) {
				console.log(e);
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	.skilled-in-container {
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		height: 100vh;
		.skilled-in-container-header {}

		.skilled-in-container-address {
			.skilled-in-container-address-des {
				background-color: #F8F8F8;
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				padding: 20rpx 32rpx;
			}

			.skilled-in-container-address-content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 24rpx 32rpx;

				.skilled-in-container-address-content-left {
					display: flex;
					align-items: center;

					image {
						width: 30rpx;
						height: 30rpx;

						margin-right: 32rpx;
					}
				}

				.skilled-in-container-address-content-right {
					font-size: 24rpx;
					font-weight: 400;
					color: #008CFF;
				}
			}
		}

		.skilled-in-container-country {
			background: #F8F8F8;
			padding: 0 32rpx;
			display: flex;
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;

			.skilled-in-container-country-item {
				padding: 20rpx 0;
				margin-right: 60rpx;
			}

			.skilled-in-container-country-item.current {
				color: #0089FF;
				border-bottom: 5rpx solid #0089FF;
			}
		}

		.skilled-in-container-list {
			flex-grow: 1;
			overflow: auto;
			.skilled-in-container-city-list {
				display: flex;
				padding: 32rpx;
				flex-wrap: wrap;

				.skilled-in-container-list-city {
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 8rpx;
					border: 2rpx solid #999;
					color: #999;
					min-width: 100rpx;
					height: 64rpx;
					margin-right: 20rpx;
					margin-bottom: 20rpx;
				}
			}
		}
	}
</style>
