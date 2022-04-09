<template>
	<view class="home-container">
		<view id="map" class="home-container-map" :prop="option" :change:prop="map.update">
		</view>
		<view class="home-container-left">
			<view class="home-container-left-baojing">
				<image src="/static/home/ic_alarmlocation@3x.png" mode="aspectFit"></image>
			</view>
			<view class="home-container-left-luxian">
				路线
			</view>
		</view>
		<view class="home-container-right">
			<view class="home-container-right-top">
				<view class="home-container-right-top-fankui">
					<image src="/static/home/ic_feedback@3x.png" mode="aspectFit"></image>
					<view class="border-bottom">反馈</view>
				</view>
				<view class="home-container-right-top-tuceng">
					<image src="/static/home/ic_layer@3x.png" mode="aspectFit"></image>
					<view class="border-bottom">图层</view>
				</view>
				<view class="home-container-right-top-lvyou">
					<image src="/static/home/ic_alice@3x.png" mode="aspectFit"></image>
					<view class="border-bottom">驴友</view>
				</view>
				<view class="home-container-right-top-quanlan">
					<image src="/static/home/ic_overview@3x.png" mode="aspectFit"></image>
					<view>全览</view>
				</view>
			</view>
			<view class="home-container-right-tianqi">
				<image src="/static/home/ic_weather@3x.png" mode="aspectFit"></image>
			</view>
			<view class="home-container-right-dingwei">
				<image src="/static/home/ic_aim@3x.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>

</template>
<script>
	import {
		ACCESS_TOKEN
	} from '@/common/util/constants.js'

	export default {
		data() {
			return {
				option: {
					longitude: 0,
					latitude: 0,
				}
			}
		},
		methods: {
			// 未登录去登录
			isLogin() {
				let token = uni.getStorageSync(ACCESS_TOKEN);
				if (!token) {
					uni.navigateTo({
						url: '/pages/login/login',
						animationType: 'slide-in-left',
						animationDuration: 200
					});
				}
			}
		},
		onLoad() {
			this.isLogin()
			
		},
		onShow() {
			console.log('home show')
			setTimeout(()=>{
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						this.option.longitude = res.longitude
						this.option.latitude = res.latitude
					}
				});
			},1000)
		}
	}
</script>

<script module="map" lang="renderjs">
	let map
	export default {
		mounted() {
			if (typeof window.T === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'http://api.tianditu.gov.cn/api?v=4.0&tk=db90eeb1243c57a713f5b12fd6662871'

				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			update(newValue, oldValue, ownerInstance, instance) {
				map.centerAndZoom(new T.LngLat(newValue.longitude, newValue.latitude), 18);
			},
			initEcharts() {

				var zoom = 18;

				map = new T.Map('map', {
					center: [37.550339, 104.114129],
					maxZoom: 18,
					zoom: 10,
				});

				var cacheLayers = [];
				// 移除前图层
				for (var c = 0; c < cacheLayers.length; c++) {
					map.removeLayer(cacheLayers[c]);
				}


				// 清空缓存图层
				cacheLayers = [];
				var id = 'img'
				var mapType = '';
				if (id.indexOf('vec') == 0) {
					mapType = 'vec';
					// 矢量底图
					var vecLayer = addLayer('vec');
					cacheLayers.push(vecLayer);
					// 矢量注记
					var cvaLayer = addLayer('cva');
					cacheLayers.push(cvaLayer);
				} else if (id.indexOf('img') == 0) {
					mapType = 'img';
					// 影像底图
					var imgLayer = addLayer('img');
					cacheLayers.push(imgLayer);
					// 影像国界
					var iboLayer = addLayer('ibo');
					cacheLayers.push(iboLayer);
					// 影像注记
					var ciaLayer = addLayer('cia');
					cacheLayers.push(ciaLayer);
				} else if (id.indexOf('ter') == 0) {
					mapType = 'ter';
					// 地形底图
					var terLayer = addLayer('ter');
					cacheLayers.push(terLayer);
					// 地形国界
					var tboLayer = addLayer('tbo');
					cacheLayers.push(tboLayer);
					// 地形注记
					var ciaLayer = addLayer('cta');
					cacheLayers.push(ciaLayer);
				}

				function addLayer(mapType, check) {
					var mapZoom = 18,
						layerZoom = 18;
					// 地形
					if (mapType == 'ter') {
						mapZoom = 14;
						layerZoom = 14;
					}

					if (mapType == 'ibo' || mapType == 'tbo') {
						layerZoom = 10;
					}


					var imageURL = "http://t0.tianditu.gov.cn/" + mapType + "_w/wmts?" +
						"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=" + mapType +
						"&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
						"&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=db90eeb1243c57a713f5b12fd6662871";
					//创建自定义图层对象
					var mapLayer = new T.TileLayer(imageURL, {
						minZoom: 3,
						maxZoom: layerZoom
					});

					// 添加新的图层
					var check = true

					if (check) {
						map.addLayer(mapLayer);
						// 切换底图时保证底图和注记一直在最下面
						// if (mapType == 'vec' || mapType == 'img' || mapType == 'ter') {
						// 	mapLayer.setZIndex(0);
						// } else {
						// 	mapLayer.setZIndex(0);
						// }
					}

					map.setMinZoom(3);
					map.setMaxZoom(mapZoom);


					return mapLayer;
				}

			}
		}
	}
</script>

<style lang="scss">
	.home-container {
		position: relative;

		.home-container-map {
			height: 100vh;
			width: 100vw;
		}

		.home-container-left {
			position: absolute;
			z-index: 1000;
			top: 40%;
			left: 32rpx;
			width: 80rpx;

			.home-container-left-baojing,
			.home-container-left-luxian {
				width: 80rpx;
				height: 80rpx;
				border-radius: 20rpx;
				background: #FFFFFF;
				margin-bottom: 12rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}

		.home-container-right {
			position: absolute;
			z-index: 1000;
			top: 10%;
			right: 32rpx;
			width: 80rpx;
		}

		.home-container-right-top {
			padding: 16rpx;
			width: 80rpx;
			border-radius: 20rpx;
			background: #FFFFFF;
			margin-bottom: 12rpx;

			.home-container-right-top-fankui,
			.home-container-right-top-tuceng,
			.home-container-right-top-lvyou,
			.home-container-right-top-quanlan {
				text-align: center;
				
				
				image {
					width: 48rpx;
					height: 48rpx;
					
				}

				view {
					
					font-size: 18rpx;
					color: #333333;
						margin-top: -10rpx;
				}
				.border-bottom{
					padding-bottom: 12rpx;
					border-bottom: 2rpx solid #D8D8D8;					
					margin-bottom: 10rpx;
				}
				
			}
		}

		.home-container-right-tianqi,
		.home-container-right-dingwei {
			width: 80rpx;
			height: 80rpx;
			border-radius: 20rpx;
			background: #FFFFFF;
			margin-bottom: 12rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 48rpx;
				height: 48rpx;
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
