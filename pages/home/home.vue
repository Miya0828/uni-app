<template>
	<view class="home-container">
		<view id="map" class="home-container-map" :prop="option" :change:prop="map.update">
		</view>
		<view class="home-container-left">
			<view class="home-container-left-baojing">
				<image src="/static/home/ic_alarmlocation@3x.png" mode="aspectFit"></image>
			</view>
			<view class="home-container-left-luxian" @click="openRoute">
				<image src="/static/home/ic_route@3x.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="home-container-right">
			<view class="home-container-right-top">
				<view class="home-container-right-top-fankui">
					<image src="/static/home/ic_feedback@3x.png" mode="aspectFit"></image>
					<view class="border-bottom">反馈</view>
				</view>
				<view class="home-container-right-top-tuceng" @click="chooseLayer">
					<image src="/static/home/ic_layer@3x.png" mode="aspectFit"></image>
					<view class="border-bottom">图层</view>
				</view>
				<view class="home-container-right-top-lvyou" @click="showTourlist">
					<image src="/static/home/ic_alice@3x.png" mode="aspectFit"></image>
					<view class="border-bottom">驴友</view>
				</view>
				<view class="home-container-right-top-quanlan" @click="overview">
					<image src="/static/home/ic_overview@3x.png" mode="aspectFit"></image>
					<view>全览</view>
				</view>
			</view>
			<view class="home-container-right-tianqi">
				<image src="/static/home/ic_weather@3x.png" mode="aspectFit"></image>
			</view>
			<view class="home-container-right-dingwei" @click="location">
				<image src="/static/home/ic_aim@3x.png" mode="aspectFit"></image>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" class="home-route-box">
			<view class="home-route-box-container">
				<view class="home-route-title">
					雁荡山路线
				</view>
				<view class="home-route-modify-time">
					队长 编辑于 20:33
				</view>
				<view class="home-route-start-end">
					<view class="home-route-start">
						<text>●</text>
						雁荡山风景名胜区…
					</view>
					<view class="home-route-arrow">
						→
					</view>
					<view class="home-route-end">
						<text>●</text>
						雁荡山风景名胜区…
					</view>
				</view>
				<view class="home-route-distance">
					<view class="home-route-total-distance">
						总里程：
						<text>123.24公里</text>
					</view>
					<view class="home-route-total-time">
						总需耗时：
						<text>2天1小时</text>
					</view>
				</view>
				<view class="home-route-scenery-spot" v-for="item in [1,2,3,4,5]">
					<view class="home-route-scenery-spot-title">
						<text>{{item}}</text>
						雁荡山风景名胜沿湖景区（入口）
					</view>
					<view class="home-route-scenery-spot-des">
						<view>
							<image src="/static/home/ic_walk@3x.png" mode="aspectFit"></image>
							约1.3公里
						</view>
						<view>
							约55分钟
						</view>
						<view>
							约12345人走过
						</view>
						<view>
							难度：低
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>

</template>
<script>
	import {
		ACCESS_TOKEN
	} from '@/common/util/constants.js'
	import data from './data/demo.js'
	import store from '@/store/index.js';
	export default {
		data() {
			return {				
				option: {
					// 初始化
					init: false,
					// 坐标更新
					coordinateFlag: false,
					longitude: 0,
					latitude: 0,
					// 图层更新
					layerFlag: false,
					currentLayer: 0,
					// 路线更新
					routeFlag: false,
					footprintsjson: [],
					trackjson: [],
					// 全揽
					overviewFlag: true,
					// 当前人
					currentUser: {
						userImage: '',
						orientation: 0
					},
					// 同队驴友
					touristFlag: false,
					tourist: [{
						longitude: 121.306381,
						latitude: 31.213812
					}],
				}
			}
		},
		methods: {
			openRoute() {				
				this.$refs.popup.open()
			},
			showTourlist() {
				this.option.touristFlag = !this.option.touristFlag
				this.option.tourist = [{
					longitude: 121.316381,
					latitude: 31.223812
				}]
			},
			location() {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						this.option.longitude = res.longitude
						this.option.latitude = res.latitude

						this.option.coordinateFlag = !this.option.coordinateFlag
					}
				});
			},
			overview() {
				this.option.overviewFlag = !this.option.overviewFlag

			},
			chooseLayer() {
				uni.navigateTo({
					url: '/pages/home/layer'
				});
			},
			// 未登录去登录
			isLogin() {
				let token = uni.getStorageSync(ACCESS_TOKEN);
				if (!token) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			initMap() {
				setTimeout(() => {
					this.option.init = true
				})
			},
			listeningDirection() {
				uni.onCompassChange((res) => {
					// console.log(res.direction);
					// this.option.currentUser.orientation = res.direction
				});
			}
		},
		onLoad() {
			this.isLogin()
			this.initMap()
			this.listeningDirection()

			setTimeout(() => {
				this.option.currentUser.userImage = "static/logo.png"
			}, 1000)
		},
		onShow() {
			this.option.currentLayer = store.state.map.layer

			if (store.state.map.route) {
				this.option.routeFlag = !this.option.routeFlag
				this.option.footprintsjson = store.state.map.route.footprintsjson
				this.option.trackjson = store.state.map.route.trackjson
			}

		}
	}
</script>

<script module="map" lang="renderjs">
	let map
	let longitude = 116.40769
	let latitude = 39.89945
	let zIndex = 100000
	// 图层集合
	let cacheLayers = []
	// 
	let _ownerInstance = null
	// 自己位置
	let currentPositionObj = null
	// 驴友位置集合
	let touristObj = []
	// 路线点集合
	let pointsline = [];
	// 路线对象
	let lineObj = null
	// 路线上脚印集合
	let footPrintSet = []

	export default {
		mounted() {
			if (typeof window.turf === 'undefined') {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/js/turf.min.js'
				script.onload = function() {
					console.log("加载turf")
				}
				document.head.appendChild(script)
			}
			if (typeof window.T === 'function') {
				this.initMap()
			} else {
				// 动态引入较大类库避免影响页面展示
				let script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'http://api.tianditu.gov.cn/api?v=4.0&tk=db90eeb1243c57a713f5b12fd6662871'
				script.onload = this.initMap.bind(this)

				document.head.appendChild(script)
			}
		},
		methods: {
			update(newValue, oldValue, ownerInstance, instance) {
				if (oldValue.init == false) {
					console.log("初始化地图")
					_ownerInstance = ownerInstance
				} else if (newValue.coordinateFlag != oldValue.coordinateFlag) {
					console.log("定位用户位置")
					// map.centerAndZoom(new T.LngLat(newValue.longitude, newValue.latitude), 16);									
					map.setViewport(pointsline.concat(new T.LngLat(newValue.longitude, newValue.latitude)))
					console.log("设置用户位置")
					currentPositionObj.setLnglat(new T.LngLat(newValue.longitude, newValue.latitude))
					
					
				} else if (newValue.currentLayer != oldValue.currentLayer) {
					console.log("设置图层")
					this.changeLayer(newValue.currentLayer)
				} else if (newValue.routeFlag != oldValue.routeFlag) {
					if (newValue.trackjson && newValue.trackjson.length) {
						console.log("设置路线")
						this.drawPath(newValue.trackjson, newValue.footprintsjson)
					}
				} else if (newValue.currentUser.orientation != oldValue.currentUser.orientation) {
					console.log("设置用户方向")
					currentPositionObj && currentPositionObj.updateOrientation(newValue.currentUser.orientation)
				} else if (newValue.currentUser.userImage != oldValue.currentUser.userImage) {
					console.log("设置用户头像")
					currentPositionObj && currentPositionObj.updateImage(newValue.currentUser.userImage)
				} else if (newValue.overviewFlag != oldValue.overviewFlag) {
					console.log("全揽")
					map.setViewport(pointsline)
				} else if (newValue.touristFlag != oldValue.touristFlag) {
					console.log("获取最新驴友位置")
					this.addTouristPosition(newValue.tourist)
				}
			},
			initMap() {
				map = new T.Map('map', {
					maxZoom: 18,
					minZoom: 9,
					zoom: 5,
				});

				map.centerAndZoom(new T.LngLat(longitude, latitude), 14);


				// this.addUserPosition(121.306381, 31.213812, 0)

				// 创建用户图标
				currentPositionObj = this.addUserPosition(longitude, latitude, 0)
				// currentPositionObj.updatedStatus('red')

				_ownerInstance.callMethod('location')

			},
			addTouristPosition(tourist) {
				// 清除之前驴友位置
				touristObj.forEach(tObj => {
					map.removeOverLay(tObj)
				})
				touristObj = []
				tourist.forEach(tour => {
					touristObj.push(
						this.addUserPosition(tour.longitude, tour.latitude, 0)
					)
				})
			},
			drawPath(trackjson, footprintsjson) {

				// 清空上次脚印
				footPrintSet.forEach(foot => {
					map.removeOverLay(foot)
				})
				footPrintSet = []
				// 绘制脚印
				footprintsjson.forEach((foot, index) => {
					this.addFoot(foot[2], foot[1], index + 1)
				})
				// 清空上次线段集合
				pointsline = []
				// 绘制线段				
				trackjson.forEach(track => {
					pointsline.push(new T.LngLat(track[2], track[1]));
				})
				// 清除上次路线
				lineObj && map.removeOverLay(lineObj);
				//创建线对象
				lineObj = new T.Polyline(pointsline, {
					color: 'blue',
					weight: 4,
					opacity: 1
				});
				//向地图上添加路线
				map.addOverLay(lineObj);
				// 根据提供的坐标点数组设置地图视野，调整后的视野会保证包含提供的坐标点。
				map.setViewport(pointsline)

			},
			// 添加用户标识
			addUserPosition(longitude, latitude, orientation) {

				var definedOverlay = T.Overlay.extend({
					initialize: function(lnglat, options) {
						this.lnglat = lnglat;
						this.setOptions(options);
					},

					onAdd: function(map) {
						this.map = map;
						var container = this._container = document.createElement("div");
						container.style.position = "absolute";

						var div = this._div = document.createElement("div");
						div.style.backgroundColor = '#2684FF';
						div.style.border = "2px solid #FFFFFF";
						div.style.borderRadius = "50%";
						div.style.borderBottomLeftRadius = "0";
						div.style.transform = "rotate(-45deg)  skew(-10deg, -10deg)";
						div.style.color = "white";
						div.style.height = "25px";
						div.style.width = "25px";
						div.style.whiteSpace = "nowrap";
						div.style.MozUserSelect = "none";
						div.style.textalign = "center";

						var img = this._img = document.createElement("img");
						img.style.position = "absolute";
						img.style.border = "2px solid #FFFFFF";
						this._src = '/static/home/user.png'
						img.src = this._src
						img.style.width = "100%";
						img.style.borderRadius = "50%";
						img.style.top = "-7px";
						img.style.left = "-2px";

						container.appendChild(div);
						container.appendChild(img);

						var that = this;
						div.onclick = function() {
							_ownerInstance.callMethod('userInfo', {
								lng,
								lat,
								content
							})
						}

						map.getPanes().overlayPane.appendChild(this._container);
						this.update(this.lnglat);
					},

					onRemove: function() {
						var parent = this._container.parentNode;
						if (parent) {
							parent.removeChild(this._container);
							this.map = null;
							this._container = null;
						}
					},

					setLnglat: function(lnglat) {
						this.lnglat = lnglat;
						this.update();
					},
					getLnglat: function() {
						return this.lnglat;
					},
					setPos: function(pos) {
						this.lnglat = this.map.layerPointToLngLat(pos);
						this.update();
					},
					updateOrientation: function(deg) {
						this.orientation = deg
						this.update();
					},
					updateImage: function(image) {
						this._src = image
						this.update();
					},
					updatedStatus: function(statusColor) {
						this._statusColor = statusColor
						this.update();
					},
					updatedzIndex: function(zIndex) {
						this._zIndex = zIndex
						this.update();
					},
					/**
					 * 更新位置
					 */
					update: function() {
						var pos = this.map.lngLatToLayerPoint(this.lnglat);
						this._container.style.top = (pos.y - 30) + "px";
						this._container.style.left = (pos.x - 11) + "px";
						this._container.style.transform = "rotate(" + (this.orientation + 180) + "deg)";
						this._container.style.zIndex = this._zIndex

						this._div.style.backgroundColor = this._statusColor;

						this._img.src = this._src
						this._img.style.transform = "rotate(" + (-(this.orientation + 180)) + "deg)";
					}
				});

				var point = new T.LngLat(longitude, latitude);
				var userPositionObj = new definedOverlay(point, orientation, {});
				setTimeout(() => {
					userPositionObj.updateImage('static/home/user.png')
					userPositionObj.updatedzIndex(zIndex--)
				})
				map.addOverLay(userPositionObj);
				return userPositionObj

			},
			// 添加标注点
			addFoot(lng, lat, content) {
				var definedOverlay = T.Overlay.extend({
					initialize: function(lnglat, text, options) {
						this.lnglat = lnglat;
						this.setOptions(options);
						this._text = text;
					},

					onAdd: function(map) {
						this.map = map;
						var div = this._div = document.createElement("div");
						div.style.position = "absolute";
						div.style.backgroundColor = "#2684FF";
						div.style.border = "2px solid #FFFFFF";
						div.style.borderRadius = "50%";
						div.style.borderBottomLeftRadius = "0";
						div.style.transform = "rotate(-45deg)";
						div.style.color = "white";
						div.style.height = "18px";
						div.style.width = "18px";
						div.style.lineHeight = "18px";
						div.style.whiteSpace = "nowrap";
						div.style.MozUserSelect = "none";
						div.style.fontSize = "14px";
						div.style.textalign = "center";

						var span = this._span = document.createElement("p");
						span.style.transform = "rotate(45deg)";
						span.style.display = "flex";
						span.style.alignItems = "center";
						span.style.justifyContent = "center";

						span.appendChild(document.createTextNode(this._text));
						div.appendChild(span);

						var that = this;
						div.onclick = function() {
							_ownerInstance.callMethod('footDes', {
								lng,
								lat,
								content
							})
						}

						map.getPanes().overlayPane.appendChild(this._div);
						this.update(this.lnglat);
					},

					onRemove: function() {
						var parent = this._div.parentNode;
						if (parent) {
							parent.removeChild(this._div);
							this.map = null;
							this._div = null;
						}
					},

					setLnglat: function(lnglat) {
						this.lnglat = lnglat;
						this.update();
					},
					getLnglat: function() {
						return this.lnglat;
					},
					setPos: function(pos) {
						this.lnglat = this.map.layerPointToLngLat(pos);
						this.update();
					},
					/**
					 * 更新位置
					 */
					update: function() {
						var pos = this.map.lngLatToLayerPoint(this.lnglat);
						this._div.style.top = (pos.y - 30) + "px";
						this._div.style.left = (pos.x - 11) + "px";
					}
				});

				var point = new T.LngLat(lng, lat);
				var pdefinedOverlay = new definedOverlay(point, content, {});
				footPrintSet.push(pdefinedOverlay)
				map.addOverLay(pdefinedOverlay);
			},


			changeLayer(layerIndex) {


				var layer = ['vec', 'img', 'ter']
				var id = layer[layerIndex] || ''

				// 移除前图层
				for (var c = 0; c < cacheLayers.length; c++) {
					map.removeLayer(cacheLayers[c]);
				}
				// 清空缓存图层
				cacheLayers = [];


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
						minZoom: 9,
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

					map.setMinZoom(9);
					map.setMaxZoom(mapZoom);

					return mapLayer;
				}

			},

		}
	}
</script>

<style lang="scss">
	.home-container {
		position: relative;

		.home-route-box {
			z-index: 1000;

			.home-route-box-container {
				padding: 32rpx 60rpx 1rpx;
				background-color: white;
				border-radius: 32rpx 32rpx 0px 0px;

				image {
					width: 32rpx;
					height: 32rpx;
				}

				.home-route-title {
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					margin-bottom: 4rpx;
				}

				.home-route-modify-time {
					font-size: 24rpx;
					font-weight: 400;
					color: #B8B8B8;
					margin-bottom: 20rpx;
				}

				.home-route-start-end {
					background: #F8F8F8;
					border-radius: 8rpx;
					padding: 16rpx;
					display: flex;
					font-size: 24rpx;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;
					.home-route-start {
						display: flex;
						align-items: center;

						text {
							color: #00C435;
							font-size: 16rpx;
							margin-right: 16rpx;
						}
					}
					.home-route-end {
						display: flex;
						align-items: center;
					
						text {
							color: #E41000;
							font-size: 16rpx;
							margin-right: 16rpx;
						}
					}
				}
			
				.home-route-distance{
					font-size: 24rpx;					
					font-weight: 400;
					color: #B8B8B8;
					display: flex;
					justify-content: space-between;
					margin-bottom: 32rpx;
					text{
						color: #333333;
					}
				}
			
				.home-route-scenery-spot{
					margin-bottom: 32rpx;
					.home-route-scenery-spot-title{
						font-size: 32rpx;						
						font-weight: 400;
						color: #333333;
						display: flex;
						align-items: center;
						text{
							font-size: 22rpx;
							width: 26rpx;
							height: 26rpx;							
							border-radius: 50%;
							background: rgba(38, 132, 255, 0.1);
							display: flex;
							align-items: center;
							justify-content: center;
							margin-right: 10rpx;
							color: #2684FF;
						}
						margin-bottom: 20rpx;
					}
					.home-route-scenery-spot-des{
						display: flex;
						justify-content: space-between;
						background: #F8F8F8;
						border-radius: 8rpx;
						padding: 8rpx 14rpx;
						font-size: 24rpx;						
						font-weight: 400;
						color: #B8B8B8;						
					}
				}
			}
		}

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

				.border-bottom {
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
