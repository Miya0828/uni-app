<template>
	<view class="home-container">
		<view id="map" class="home-container-map">
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
				slowLoading: true
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
		}
	}
</script>

<script module="map" lang="renderjs">
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
			initEcharts() {
				var map;
				var zoom = 12;

				// map = new T.Map('echarts', {
				// 	projection: 'EPSG:4326'
				// });
				// map.centerAndZoom(new T.LngLat(116.40769, 39.89945), zoom);
				map = new T.Map('map', {
					center: [37.550339, 104.114129],
					maxZoom: 18,
					zoom: 3,
				});
				// map.centerAndZoom(new T.LngLat(116.40769, 39.89945), zoom);

				// var e = _.a.map("mapDiv", {
				//                     center: [37.550339, 104.114129],
				//                     maxZoom: 18,
				//                     zoom: 3,
				//                     attributionControl: !1
				//                 });
				//                 $.switchMap(e, {
				//                     y: -135
				//                 })

				//   //创建对象
				// var ctrl = new T.Control.MapType();
				// //添加控件
				// map.addControl(ctrl);

				// T.TileLayer.TiandituLayer = T.TileLayer.extend({
				// 	getTileUrl: function(tilePoint) {
				// 		var h = parseInt(Math.random() * 7);
				// 		var layerType = this.options.layerType;
				// 		var url = "https://t" + h + ".tianditu.gov.cn/" + layerType +
				// 			"_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=" + layerType +
				// 			"&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&" + "TILECOL=" + tilePoint.x +
				// 			"&TILEROW=" + tilePoint.y + "&TILEMATRIX=" + tilePoint.z +
				// 			"&tk=0b79a07d2808103ab84aa56485c331a8";
				// 		return url;
				// 	}
				// });
				// console.log(T.TileLayer.TiandituLayer)
				// T.tileLayer = {}
				// T.tileLayer.tiandituLayer = function(options) {
				// 	return new T.TileLayer.TiandituLayer('', options);
				// };

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
						minZoom: 1,
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

					map.setMinZoom(1);
					map.setMaxZoom(mapZoom);


					return mapLayer;
				}
				// var imageURL1 = "http://t0.tianditu.gov.cn/img_c/wmts?" +
				// 	"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
				// 	"&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=db90eeb1243c57a713f5b12fd6662871";

				// var lay1 = new T.TileLayer(imageURL1, {
				// 	minZoom: 1,
				// 	maxZoom: 18
				// });


				// //将图层增加到地图上
				// map.addLayer(lay1);


			}
		}
	}
</script>

<style lang="scss">
	.home-container {
		.home-container-map {
			background-color: pink;
			height: 100vh;
			width: 100vw;
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
