<template>
	<view class="skilled-in-container">
		<view id="map2" class="home-container-map" :prop="option" :change:prop="map2.update">
		</view>
		<view class="skilled-in-container-header">
			<uni-search-bar class="uni-mt-10" radius="5" placeholder="地名" clearButton="auto" @confirm="search"
				@cancel="cancel" cancel-text="取消" />
		</view>
		<view class="skilled-in-container-address">
			<view class="skilled-in-container-address-des">
				目前您的位置
			</view>
			<view class="skilled-in-container-address-content">
				<view class="skilled-in-container-address-content-left">
					<image src="/static/mine/ic_position@3x.png" mode="aspectFit"></image>
					<text>{{currentLocation?currentLocation:'定位中...'}}</text>
				</view>
				<view class="skilled-in-container-address-content-right" @click="getLocation">
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
		<view class="list-cont">
			<scroll-view class="scrool-more" style="height: 100%" scroll-y="true" scroll-with-animation="true">
				<view class="skilled-in-container-list">
					<uni-collapse accordion>
						<uni-collapse-item :title="item.key" v-for="(item) of searchArea"
							:open="isIncludeElement(item)">
							<view class="skilled-in-container-city-list">
								<view v-for="ite of item.value" class="list" @click="getSelectedTypes(ite.code)">
									<view class="item">
										<text>{{ite.name}}</text>
										<uni-icons v-if="(selected.includes(ite.code))" color="#0089FF"
											type="checkmarkempty" size="18"></uni-icons>
									</view>
								</view>
							</view>

						</uni-collapse-item>
					</uni-collapse>
				</view>
			</scroll-view>
		</view>
		<view class="footer">
			<button type="primary" @click="onFinish">完成</button>
		</view>
	</view>
</template>

<script>
	import {
		userService
	} from "@/api/index.js";
	export default {
		data() {
			return {
				searchArea: [],
				area: [],
				selected: [],
				currentLocation: "",
				option: {
					flag: false,
					longitude: 0,
					latitude: 0,
				}
			}
		},
		onLoad(options) {
			let beGoodAtRegion = JSON.parse(options.beGoodAtRegion);
			if (beGoodAtRegion) {
				if (beGoodAtRegion.indexOf(',') > -1) {
					this.selected = beGoodAtRegion.split(',');
				} else {
					this.selected = [beGoodAtRegion];
				}

			}
		},
		mounted() {
			this.queryArea();
		},
		methods: {
			search(res) {
				if (res.value) {
					this.queryAreaByName(res.value);
				}
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			},
			isIncludeElement(data) {
				let flag = false;
				for (let item of data.value) {
					if (this.selected.includes(item.code)) {
						flag = true;
						break;
					}
				}
				return flag;
			},
			getSelectedTypes(item) {
				let index = this.selected.indexOf(item);
				if (index > -1) {
					this.selected.splice(index, 1);
					return;
				}
				this.selected.push(item);
			},
			queryArea() {
				userService.queryArea().then((res) => {
					let data = res.data;
					if (data.success) {
						let area = [];
						for (let item of data.result || []) {
							area.push({
								key: item.province,
								value: item.cities
							});
						}
						this.area = area;
						this.searchArea = area;
					}
				})
			},
			queryAreaByName(value) {
				let arrayList = [];
				for (let item of this.area) {
					if (item.key.indexOf(value) > -1) {
						arrayList.push(item);
						continue;
					}
					for (let ite of item.value) {
						if (ite.name.indexOf(value) > -1) {
							arrayList.push(item);
							continue;
						}
					}
				}
				this.searchArea = arrayList;
			},
			afterCreateMap() {
				this.getLocation();
			},
			getLocation() {
				let _this = this;
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						this.option.flag = !this.option.flag
						this.option.longitude = res.longitude
						this.option.latitude = res.latitude
					}
				});
			},
			setAddress(currentLocation) {
				this.currentLocation = currentLocation
			},
			onFinish() {
				uni.$emit("beGoodAtRegion", this.selected.join(','));
				uni.navigateBack({
					url: '/pages/mine/captainApplication/baseInfo'
				})
			}
		}
	}
</script>
<script module="map2" lang="renderjs">
	let _ownerInstance = null
	export default {
		mounted() {
			console.log('mounted')
			if (typeof window.T === 'function') {
				this.createMap()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				console.log("加载地图")
				script.src = 'http://api.tianditu.gov.cn/api?v=4.0&tk=db90eeb1243c57a713f5b12fd6662871'
				script.onload = this.createMap.bind(this)

				document.head.appendChild(script)
			}
		},
		methods: {
			createMap() {
				console.log('createMap2')
				_ownerInstance.callMethod('afterCreateMap')
			},
			update(newValue, oldValue, ownerInstance, instance) {
				_ownerInstance = ownerInstance
				console.log('newValue.flag', newValue.flag)
				if (!oldValue) return
				if (newValue.flag != oldValue.flag) {
					console.log("逆地理编码")
					var geocode = new T.Geocoder();
					geocode.getLocation(new T.LngLat(newValue.longitude, newValue.latitude), function(res) {
						console.log(res.addressComponent)
						// _ownerInstance.callMethod('setAddress', res.addressComponent)
						// let address = res.addressComponent.address; // 转换后的地理位置
						// let point = event.coord; // 转换后的坐标信息
						// let coordType = event.coordType; // 转换后的坐标系类型
						// let reg = /.+?(省|市|自治区|自治州|县|区)/g;

						// "address": "申滨路1058弄76号",
						// "city": "上海市",
						// "county_code": "156310112",
						// "nation": "中国",
						// "poi_position": "东北",
						// "county": "闵行区",
						// "city_code": "156310000",
						// "address_position": "东北",
						// "poi": "西亚超市",
						// "province_code": "156310000",
						// "province": "上海市",
						// "road": "申长路",
						let {
							address,
							province,
							city,
							county
						} = res.addressComponent

						var currentLocation = (province == city ? province : (province + city)) + county + address
						_ownerInstance.callMethod('setAddress', currentLocation)
					});
				}
			},
		},
	}
</script>
<style lang="scss">
	.home-container-map {
		background-color: pink;
	}

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
				color: #333333;
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

		.list-cont {
			background-color: #FFFFFF;
			flex: 1;
			position: relative;

			.scrool-more {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;

				.skilled-in-container-list {
					.list {
						border-bottom: 2upx solid #F8F8F8;

						.item {
							position: relative;
							display: flex;
							padding: 0 50upx;
							min-height: 104upx;
							background-color: #ffffff;
							justify-content: space-between;
							align-items: center;

							.cuIcon-check {
								color: #0089FF;
								font-size: 40upx;
							}
						}
					}
				}
			}
		}

		.footer {
			line-height: 100rpx;
			background-color: #FFFFFF;
			/* 不放大不缩小固定100rpx */
			flex: 0 0 100rpx;
			padding: 0 50upx;

			button {
				border-radius: 38upx;
				background: #0089FF;
			}

			uni-button:after {
				border: 0;
			}
		}
	}
</style>
