<template>
	<view class="home-container">
		<view id="map" class="home-container-map" :prop="option" :change:prop="map.update">
		</view>
		<view class="home-container-left">
			<view class="home-container-left-baojing" @click="openWarn">
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
			<view class="home-container-right-tianqi" @click="openWeather">
				<image :src="'/static/home/weather_icons/'+weather.icon+'.svg'" mode="aspectFit"></image>
			</view>
			<view class="home-container-right-dingwei" @click="location">
				<image src="/static/home/ic_aim@3x.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="home-container-chat">
			<view class="chat-area-line-box" v-for="(item,index) in msgList"
				@click="toChatRoom(item.teamId,item.teamTitle)">
				<view class="chat-area-line">
					<text class="chat-area-line-name">
						{{item.name}}
					</text>
					<template v-if="item.des.mediaType==1">
						{{item.des.content}}
					</template>
					<template v-if="item.des.mediaType==2">
						发来一张图片
					</template>
					<template v-if="item.des.mediaType==3">
						发来一条语音
					</template>
					<template v-if="item.des.mediaType==4">
						发来一条视频
					</template>
				</view>
			</view>
			<!-- <scroll-view :scroll-with-animation="true" class="home-container-chat-scroll" @scroll="scroll"
				show-scrollbar="false" scroll-y :scroll-top="scrollTop">
				
			</scroll-view> -->
		</view>
		<uni-popup ref="popupWeather" type="bottom" class="home-weather-box">
			<view class="home-weather-box-container">
				<view class="home-weather-box-container-1">
					<view class="home-weather-box-container-1-left">
						<image src="/static/home/ic_position@3x.png" mode="aspectFit"></image>
						<text>{{''+addressObj['province']+addressObj['city']}}</text>
					</view>
					<view class="home-weather-box-container-1-right">
						<image :src="'/static/home/weather_icons/'+weather.icon+'-fill.svg'" mode="aspectFit"></image>
						<text>{{weather.text}}</text>
					</view>
				</view>
				<view class="home-weather-box-container-2">
					{{weather.temp}}°
				</view>
				<view class="home-weather-box-container-3">
					<view class="home-weather-box-container-3-left">
						<image src="/static/home/ic_air@3x.png" mode="aspectFit"></image>
						空气
						<text>{{weather.humidity}}</text>
					</view>
					<view class="home-weather-box-container-3-right">
						<image src="/static/home/ic_wind@3x.png" mode="aspectFit"></image>
						风
						<text>{{weather.windScale}}级</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupWarn" type="bottom" class="home-warn-box">
			<view class="home-warn-box-container">
				<view class="home-warn-box-container-title">
					偏离路线
				</view>
				<view class="home-warn-box-container-des">
					<view class="home-warn-box-container-des-left">
						<image src="/static/home/ic_oneclickhelp@3x.png" mode="aspectFit"></image>
						<view class="home-warn-box-container-des-left-t">
							一键求助
						</view>
					</view>
					<view class="home-warn-box-container-des-right">
						<image src="/static/home/ic_backtoroute@3x.png" mode="aspectFit"></image>
						<view class="home-warn-box-container-des-right-t">
							回到路线
						</view>
					</view>
				</view>
				<view class="home-warn-box-container-tip">
					<text>4:58</text>
					后将自动求助，请选择回到路线并及时返回
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupRoute" type="bottom" class="home-route-box">
			<view class="home-route-box-container">
				<view class="home-route-box-container-finish" @click="routePunch">
					<image src="/static/home/ic_medal@3x.png" mode="aspectFit"></image>
					<view>
						<view>
							完成路线
						</view>
						<view>
							打卡成就
						</view>
					</view>
				</view>
				<view class="home-route-title">
					{{route.routeName}}
				</view>
				<view class="home-route-modify-time">
					队长 编辑于 {{route.createTime}}
				</view>
				<view class="home-route-start-end">
					<view class="home-route-start">
						<text>●</text>
						{{route.originName}}
					</view>
					<view class="home-route-arrow">
						→
					</view>
					<view class="home-route-end">
						<text>●</text>
						{{route.destinationName}}
					</view>
				</view>
				<view class="home-route-distance">
					<view class="home-route-total-distance">
						总里程：
						<text>{{route.totalMileage}}</text>
					</view>
					<view class="home-route-total-time">
						总需耗时：
						<text>{{route.totalTime}}</text>
					</view>
				</view>
				<view class="home-route-scenery-box">


					<view class="home-route-scenery-spot" v-for="(item,index) in option.footprintsjson" :key='index'>
						<view class="home-route-scenery-spot-title">
							<text>{{item.routeSort}}</text>
							{{item.siteName}}
						</view>
						<view class="home-route-scenery-spot-des">
							<view :class="index<=siteIndex?'current':''">
								<image v-if="index<=siteIndex" src="/static/home/ic_walked@3x.png" mode="aspectFit">
								</image>
								<image v-else src="/static/home/ic_walk@3x.png" mode="aspectFit"></image>
								约{{item.intervalKilometers}}
							</view>
							<view :class="index<=siteIndex?'current':''">
								约{{item.intervalTime}}
							</view>
							<view>
								约{{item.punchTimes}}人走过
							</view>
							<view>
								难度：{{difficultyLevel[item.difficultyLevel]}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>

</template>
<script>
	import {
		ACCESS_TOKEN,
		USER_NAME,
		USER_INFO,
		SMS_CODE
	} from "@/common/util/constants";
	import data from './data/demo.js'
	import store from '@/store/index.js';
	import {
		homeService,
		teamService
	} from "@/api/index.js";

	export default {
		data() {
			return {
				siteIndex: 0,
				userId: null,
				difficultyLevel: ['', '低', '中', '高'],
				route: {},				
				addressObj:{},
				weather: {
					"obsTime": "2022-04-16T15:06+08:00",
					"temp": "17",
					"feelsLike": "14",
					"icon": "104",
					"text": "阴",
					"wind360": "45",
					"windDir": "东北风",
					"windScale": "3",
					"windSpeed": "12",
					"humidity": "29",
					"precip": "0.0",
					"pressure": "1020",
					"vis": "18",
					"cloud": "91",
					"dew": "-3"
				},
				scrollTop: 0,
				msgList: [],
				msgList2: [{
						name: '用户123:',
						des: {
							mediaType: 1, // 文本
							content: '王杰，你现在在哪？你到 了四街峰等我一下呀！王杰，你现在在哪？你到 了四街峰等我一下呀！王杰，你现在在哪？你到 了四街峰等我一下呀！'
						}
					},
					{
						name: '用户123:',
						des: {
							mediaType: 1, // 文本
							content: '王杰，你现在在哪？你到 了四街峰等我一下呀！王杰，你现在在哪？你到 了四街峰等我一下呀！王杰，你现在在哪？你到 了四街峰等我一下呀！'
						}
					},
					{
						name: '用户123:',
						des: {
							mediaType: 1, // 文本
							content: '王杰，你现在在哪？你到 了四街峰等我一下呀！王杰，你现在在哪？你到 了四街峰等我一下呀！王杰，你现在在哪？你到 了四街峰等我一下呀！'
						}
					},
					{
						name: '用户123:',
						des: {
							mediaType: 1, // 文本
							content: '王杰，你现在在哪？你到 了四街峰等我一下呀！王杰，你现在在哪？你到 了四街峰等我一下呀！王杰，你现在在哪？你到 了四街峰等我一下呀！'
						}
					},
					{
						name: '李白:',
						des: {
							mediaType: 2, // 图片
							content: 'https://prd-bs-oss.oss-cn-shanghai.aliyuncs.com/mkl/logo3.png'
						}
					},
					{
						name: '妲己:',
						des: {
							mediaType: 3, // 语言
							content: 'https://prd-bs-oss.oss-cn-shanghai.aliyuncs.com/mkl/475517.mp3'
						}
					},
					{
						name: '公孙离:',
						des: {
							mediaType: 4, // 视频
							content: 'https://prd-bs-oss.oss-cn-shanghai.aliyuncs.com/mkl/25.mp4'
						}
					},
					{
						name: '公孙离:',
						des: {
							mediaType: 1, // 文本
							content: '😂'
						}
					},
				],
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
						avatar: '',
						orientation: 0
					},
					// 绘制已走地图
					drawAlreadyFlag: false,
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
			toChatRoom(teamId, teamTitle) {
				uni.navigateTo({
					url: `/pages/teamChat/chat?title=${teamTitle}&id=${teamId}`
				})
			},
			routePunch() {
				if (!store.state.map.route) {
					uni.showToast({
						icon: 'none',
						title: '请先选择路线',
					})
					return
				}
				homeService.routePunch({
					routeId: store.state.map.route.onfootRouteInfo.id
				}).then(res => {
					if (res.data.success) {
						uni.showToast({
							title: res.data.message,
						})
						this.$refs.popupRoute.close()
					}
				})
			},
			scroll(e) {
				// console.log(e)
			},
			warnTip() {
				uni.vibrateLong({
					success: function() {
						console.log('success');
					}
				});
			},
			mergeOptions(obj) {
				this.option = Object.assign({}, this.option, obj)
			},
			openWeather() {
				this.$refs.popupWeather.open()
			},
			openWarn() {
				this.$refs.popupWarn.open()
			},
			openRoute() {
				if (!store.state.map.route) {
					uni.showToast({
						icon: 'none',
						title: '请先选择路线',
					})
					return
				}
				this.$refs.popupRoute.open()
			},
			showTourlist() {
				// 如果已显示就取消
				if (this.option.touristFlag) {
					this.mergeOptions({
						touristFlag: !this.option.touristFlag,
						tourist: []
					})
					return
				}
				teamService.queryTeam().then(res => {
					if (res.data.success) {

						var teamList = res.data.result
						var team = teamList[0] || {}
						console.log(team.id)
						homeService.queryUserRealtime({
							teamId: team.id
						}).then(res => {
							console.log(res)
							if (res.data.success) {
								var currentId = this.userInfo.id
								var tourist = res.data.result.filter(item => item.id != currentId)
							}
							this.mergeOptions({
								touristFlag: !this.option.touristFlag,
								tourist: tourist
							})
						})
					}
				})
			},
			location() {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {

						var longitude = res.longitude
						var latitude = res.latitude
						longitude = "120.93589338209433"
						latitude = "28.347535197969975"
						

						this.getWeather(longitude + ',' + latitude)

						store.state.map.longitude = longitude
						store.state.map.latitude = latitude
						this.mergeOptions({
							longitude: longitude,
							latitude: latitude,
							coordinateFlag: !this.option.coordinateFlag,
						})
						setTimeout(() => {
							this.mergeOptions({
								drawAlreadyFlag: !this.option.drawAlreadyFlag,
							})
						}, 100)
					}
				});
			},
			// 获取天气
			getWeather(location) {
				homeService.getRealTimeWeather({
					"dataType": "now",
					"location": location
				}).then(res => {
					// console.log(res)
					if (res.data.result.data && JSON.parse(res.data.result.data).code == 200) {
						this.weather = JSON.parse(res.data.result.data).now
					}
				})
			},
			overview() {
				this.mergeOptions({
					overviewFlag: !this.option.overviewFlag
				})
			},
			chooseLayer() {
				uni.navigateTo({
					url: '/pages/home/layer'
				});
			},
			initMap() {
				setTimeout(() => {
					this.mergeOptions({
						init: true
					})
				})
			},
			setAddress(addressObj) {
				this.addressObj = addressObj				
			},
			uploadPosition(longitude, latitude, altitude) {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {

						var longitude = res.longitude
						var latitude = res.latitude
						var altitude = res.altitude

						this.mergeOptions({
							drawAlreadyFlag: !this.option.drawAlreadyFlag,
						})

						homeService.uploadPosition({
							"high": altitude,
							"latitude": latitude,
							"longitude": longitude,
							"userId": this.userInfo.id
						}).then(res => {
							// console.log(res)
						})

					}
				});
			},
			listeningGPS() {
				// 方向
				uni.onCompassChange((res) => {
					// console.log("方向" + res.direction);
					store.state.map.orientation = res.direction
					this.option.currentUser.orientation = res.direction
				});

				uni.$on('triggerHeartbeat', () => {
					this.uploadPosition()
				})
			},
			afterInit() {
				this.drawRoute()

				setTimeout(() => {
					this.mergeOptions({
						currentUser: {
							...this.option.currentUser,
							avatar: this.userInfo.avatar
						}
					})
				}, 1000)
			},
			currentRoute() {
				homeService.queryRouteByUserId({
					"userId": this.userInfo.id
				}).then(res => {
					if (res.data.result && res.data.result.id) {
						homeService.queryRouteSiteByRouteId({
							id: res.data.result.id
						}).then(res => {
							store.state.map.route = res.data.result
							// console.log(store.state.map.route )
							this.drawRoute()
						})
					}
				})
			},
			drawRoute() {
				if (store.state.map.route && store.state.map.route.onfootRouteInfo) {
					this.route = store.state.map.route.onfootRouteInfo
					let trackjson = store.state.map.route.routeLngLatMapList
					this.mergeOptions({
						routeFlag: !this.option.routeFlag,
						footprintsjson: store.state.map.route.siteList.sort((a, b) => a.routeSort - b.routeSort),
						trackjson: trackjson
					})
				} else {
					this.currentRoute()
				}
			},
			showSite(site) {
				this.siteIndex = site
			},
		},
		onUnload() {
			console.log('onUnload')

		},
		onLoad() {

			this.initMap()
			this.listeningGPS()

			this.userInfo = store.state.userInfo
			console.log(this.userInfo)

			uni.$on('socketMessage', (data) => {
				console.log('home:socketMessage')
				console.log(data)

				let userId = data.userId
				let content = JSON.parse(data.msgTxt)
				console.log(content)
				var typeMap = {
					text: 1,
					image: 2,
					sound: 3,
					video: 4
				}

				this.msgList.push({
					name: content.name,
					teamTitle: content.teamTitle,
					teamId: data.groupId,
					des: {
						mediaType: typeMap[content.type], // 文本
						content: content.content
					}
				})
				if (this.msgList.length > 6) {
					this.msgList.shift()
				}

			})


		},
		onShow() {
			this.mergeOptions({
				currentLayer: store.state.map.layer
			})

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

	// 已走过的路线点集合
	let pointslineAlready = [];
	// 已走过的路线对象
	let lineObjAlready = null

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
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'http://api.tianditu.gov.cn/api?v=4.0&tk=db90eeb1243c57a713f5b12fd6662871'
				script.onload = this.createMap.bind(this)

				document.head.appendChild(script)
			}
		},
		methods: {
			update(newValue, oldValue, ownerInstance, instance) {
				if (!oldValue) return
				if (oldValue.init == false) {
					console.log("初始化render实例")
					_ownerInstance = ownerInstance
				} else if (newValue.coordinateFlag != oldValue.coordinateFlag) {
					console.log("定位用户位置")
					map.centerAndZoom(new T.LngLat(newValue.longitude, newValue.latitude), 16);
					// map.setViewport(pointsline.concat(new T.LngLat(newValue.longitude, newValue.latitude)))
					console.log("设置用户位置")
					currentPositionObj.setLnglat(new T.LngLat(newValue.longitude, newValue.latitude))
				
					console.log("逆地理编码")
					var geocode = new T.Geocoder();
					geocode.getLocation(new T.LngLat(newValue.longitude, newValue.latitude),function(res){
						// console.log(res.addressComponent)
						_ownerInstance.callMethod('setAddress',res.addressComponent)
					});
					
				} else if (newValue.drawAlreadyFlag != oldValue.drawAlreadyFlag) {
					if (newValue.trackjson.length) {
						// console.log('绘制已走过路线')
						this.drawAlreadyPath(newValue.trackjson, {
							longitude: newValue.longitude,
							latitude: newValue.latitude
						}, newValue.footprintsjson)
					}
				} else if (newValue.currentLayer != oldValue.currentLayer) {
					console.log("设置图层")
					this.changeLayer(newValue.currentLayer)
				} else if (newValue.routeFlag != oldValue.routeFlag) {
					if (newValue.trackjson && newValue.trackjson.length) {
						console.log("设置路线")
						this.drawPath(newValue.trackjson, newValue.footprintsjson)
					}
				} else if (newValue.currentUser.orientation != oldValue.currentUser.orientation) {
					// console.log("设置用户方向")
					currentPositionObj && currentPositionObj.updateOrientation(newValue.currentUser.orientation)
				} else if (newValue.currentUser.avatar != oldValue.currentUser.avatar) {
					console.log("设置用户头像")
					currentPositionObj && currentPositionObj.updateImage(newValue.currentUser.avatar ||
						'static/home/user.png')
				} else if (newValue.overviewFlag != oldValue.overviewFlag) {
					console.log("全揽")
					map.setViewport(pointsline)
				} else if (newValue.touristFlag != oldValue.touristFlag) {
					console.log("获取最新驴友位置")
					this.addTouristPosition(newValue.tourist)
				}
			},
			createMap() {
				map = new T.Map('map', {
					maxZoom: 18,
					minZoom: 1,
					zoom: 5,
				});
				console.log('初始化地图')
				map.centerAndZoom(new T.LngLat(longitude, latitude), 14);
				map.setMaxBounds(new T.LngLatBounds(new T.LngLat(0, 90), new T.LngLat(180, -90)));

				// 创建用户图标
				currentPositionObj = this.addUserPosition({
					longitude,
					latitude,
					orientation: 0,
					avatar: 'static/home/user.png'
				})

				// currentPositionObj.updatedStatus('red')

				_ownerInstance.callMethod('afterInit')
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
						this.addUserPosition({
							...tour,
							orientation: false,
						})
					)
				})
			},
			// 绘制已走过路线
			drawAlreadyPath(trackjson, currentPosition, footprintsjson) {
				lineObjAlready && map.removeOverLay(lineObjAlready)

				trackjson = trackjson.map(res => [res.longitude, res.latitude])

				var line = turf.lineString(trackjson);
				// var pt = turf.point(["120.91986447403987", "28.341998223837688"]);
				var pt = turf.point([currentPosition.longitude, currentPosition.latitude]);


				var snapped = turf.nearestPointOnLine(line, pt, {
					units: 'kilometers'
				});

				// 500米内算开始
				if (snapped.properties.dist < 0.5) {
					var coordinates = snapped.geometry.coordinates

					// 清空上次线段集合
					pointslineAlready = []
					var _pointslineAlready = []
					// 绘制线段
					for (let i = 0, len = trackjson.length; i < len; i++) {

						pointslineAlready.push(new T.LngLat(trackjson[i][0], trackjson[i][1]));

						// 判断包含哪几个站点,然后通知
						_pointslineAlready.push({
							longitude: trackjson[i][0],
							latitude: trackjson[i][1]
						})

						if (trackjson[i][0] == coordinates[0] && trackjson[i][1] == coordinates[1]) {
							break
						}
					}
					// 清除上次路线
					lineObjAlready && map.removeOverLay(lineObjAlready);
					//创建线对象
					lineObjAlready = new T.Polyline(pointslineAlready, {
						color: '#00C435',
						weight: 6,
						opacity: 1
					});
					//向地图上添加路线
					map.addOverLay(lineObjAlready);



					var site = 0
					for (var j = 0, jlen = footprintsjson.length; j < jlen; j++) {

						let {
							"positionLongitude": longitude,
							"positionLatitude": latitude
						} = {
							...footprintsjson[j]
						}
						for (var i = 0, len = _pointslineAlready.length; i < len; i++) {
							var item = _pointslineAlready[i]

							if (item.longitude == longitude && item.latitude == latitude) {
								site = j
							}

						}
					}

					_ownerInstance.callMethod('showSite', site)
				}

			},
			drawPath(trackjson, footprintsjson) {
				// console.log(trackjson)
				// console.log(footprintsjson)
				// 清空上次脚印
				footPrintSet.forEach(foot => {
					map.removeOverLay(foot)
				})
				footPrintSet = []
				// 绘制脚印
				footprintsjson.forEach((foot, index) => {
					this.addFoot(foot.positionLongitude, foot.positionLatitude, foot.routeSort)
				})
				// 清空上次线段集合
				pointsline = []
				// 绘制线段
				trackjson.forEach(track => {
					pointsline.push(new T.LngLat(track.longitude, track.latitude));
				})
				// 清除上次路线
				lineObj && map.removeOverLay(lineObj);
				//创建线对象
				lineObj = new T.Polyline(pointsline, {
					color: '#2684FF',
					weight: 6,
					opacity: 1
				});
				//向地图上添加路线
				map.addOverLay(lineObj);
				// 根据提供的坐标点数组设置地图视野，调整后的视野会保证包含提供的坐标点。
				map.setViewport(pointsline)

			},
			// 添加用户标识
			addUserPosition({
				longitude,
				latitude,
				orientation,
				avatar
			}) {
				var definedOverlay = T.Overlay.extend({
					initialize: function(lnglat, orientation, options) {
						this.lnglat = lnglat;
						this.orientation = orientation
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

						if (this.orientation === false) {
							div.style.visibility = "hidden";
						}

						var img = this._img = document.createElement("img");
						img.style.position = "absolute";
						img.style.border = "2px solid #FFFFFF";
						this._src = '/static/home/user.png'
						img.src = this._src
						img.style.width = "25px";
						img.style.height = "25px";
						img.style.borderRadius = "50%";
						img.style.top = "-2.5px";
						img.style.left = "0px";

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
					userPositionObj.updateImage(avatar)
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
					updatedzIndex: function(zIndex) {
						this._zIndex = zIndex
						this.update();
					},
					/**
					 * 更新位置
					 */
					update: function() {
						var pos = this.map.lngLatToLayerPoint(this.lnglat);
						this._div.style.top = (pos.y - 30) + "px";
						this._div.style.left = (pos.x - 10) + "px";

						this._div.style.zIndex = this._zIndex
					}
				});


				var point = new T.LngLat(lng, lat);
				var pdefinedOverlay = new definedOverlay(point, content, {});
				setTimeout(() => {
					pdefinedOverlay.updatedzIndex(zIndex--)
				})
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

		.home-container-chat {
			position: absolute;
			z-index: 999;
			left: 0;
			bottom: 0;

			.home-container-chat-scroll {
				height: 400rpx;
			}

			.chat-area-line-box {
				padding-bottom: 8rpx;
			}

			.chat-area-line {
				background: rgba(0, 0, 0, 0.6);
				border-radius: 0rpx 34rpx 34rpx 0rpx;
				padding: 12rpx 34rpx;
				max-width: 524rpx;
				width: fit-content;
				font-size: 24rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 40rpx;

				display: -webkit-box;
				/* 将对象作为弹性伸缩盒子模型显示 */
				-webkit-box-orient: vertical;
				/* 设置或检索伸缩盒对象的子元素的排列方式 */
				-webkit-line-clamp: 2;
				/* 2行，只有 webkit内核支持 */
				word-break: break-all;
				/* 纯英文换行 */
				overflow: hidden;

				text {
					color: #0086FF;
					margin-right: 8rpx;
				}
			}
		}

		.home-weather-box {
			z-index: 1000;

			.home-weather-box-container {
				padding: 32rpx 60rpx 72rpx;
				background-color: white;
				border-radius: 32rpx 32rpx 0px 0px;
				text-align: center;

				.home-weather-box-container-1 {
					display: flex;
					font-size: 32rpx;
					font-weight: 400;
					color: #333333;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 50rpx;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 20rpx;
					}

					.home-weather-box-container-1-left,
					.home-weather-box-container-1-right {
						display: flex;
						align-items: center;
					}
				}

				.home-weather-box-container-2 {
					font-size: 120rpx;
					font-weight: 500;
					color: #333333;
					line-height: 168rpx;
					margin-bottom: 20rpx;
				}

				.home-weather-box-container-3 {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					font-size: 32rpx;
					font-weight: 400;
					color: #666666;

					.home-weather-box-container-3-left,
					.home-weather-box-container-3-right {
						display: flex;
						justify-content: space-evenly;
						align-items: center;
					}

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 6rpx;
					}

					text {
						font-size: 40rpx;
						font-weight: 500;
						color: #05B018;
						margin-left: 6rpx;
					}

					.home-weather-box-container-3-right text {
						color: #D8CB00;
					}
				}
			}
		}

		.home-warn-box {
			z-index: 1000;

			.home-warn-box-container {
				padding: 32rpx 60rpx 44rpx;
				background-color: white;
				border-radius: 32rpx 32rpx 0px 0px;
				text-align: center;

				.home-warn-box-container-title {
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					margin-bottom: 52rpx;
				}

				.home-warn-box-container-des {
					display: flex;
					padding: 0 60rpx;
					justify-content: space-between;
					margin-bottom: 52rpx;

					image {
						width: 172rpx;
						height: 172rpx;
						margin-bottom: 20rpx;
					}

					.home-warn-box-container-des-left-t,
					.home-warn-box-container-des-right-t {
						font-size: 28rpx;
						font-weight: 500;
						color: #666666;
					}
				}

				.home-warn-box-container-tip {
					background: #F8F8F8;
					border-radius: 16px;
					font-size: 24rpx;
					padding: 16rpx;
					font-weight: 400;
					color: #666666;
					text-align: center;

					text {
						color: #E41000;
					}
				}
			}
		}

		.home-route-box {
			z-index: 1000;

			.home-route-box-container {
				padding: 32rpx 60rpx 1rpx;
				background-color: white;
				border-radius: 32rpx 32rpx 0px 0px;
				position: relative;
				height: 60vh;
				display: flex;
				flex-direction: column;
				overflow: hidden;

				.home-route-scenery-box {
					flex-grow: 1;
					overflow-y: auto;
				}

				.home-route-box-container-finish {
					position: absolute;
					bottom: 62rpx;
					right: 0;
					background: rgba(38, 132, 255, 0.1);
					border-radius: 20rpx 0rpx 0rpx 20rpx;
					padding: 16rpx 16rpx 16rpx 8rpx;
					font-size: 20rpx;
					font-weight: 500;
					color: #2684FF;
					display: flex;

					image {
						width: 48rpx;
						height: 48rpx;
					}
				}

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

				.home-route-distance {
					font-size: 24rpx;
					font-weight: 400;
					color: #B8B8B8;
					display: flex;
					justify-content: space-between;
					margin-bottom: 32rpx;

					text {
						color: #333333;
					}
				}

				.home-route-scenery-spot {
					margin-bottom: 32rpx;

					.home-route-scenery-spot-title {
						font-size: 32rpx;
						font-weight: 400;
						color: #333333;
						display: flex;
						align-items: center;

						text {
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

					.home-route-scenery-spot-des {
						display: flex;
						justify-content: space-between;
						background: #F8F8F8;
						border-radius: 8rpx;
						padding: 8rpx 14rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #B8B8B8;

						&>view {
							display: flex;
							align-items: center;
						}

						.current {
							color: #E41000;
						}
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
			box-sizing: border-box;
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
