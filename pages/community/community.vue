<template>
	<scroll-view scroll-y class="page">
		<cu-custom bgColor="bg-white"><block slot="content">社区与消息</block></cu-custom>
		<map
			v-if="polyline[0].points.length > 0"
			id="myMap"
			:markers="markers"
			:polyline="polyline"
			:include-points="polyline[0].points"
			:latitude="polyline[0].points[0].latitude"
			:longitude="polyline[0].points[0].longitude"
			style="width: 100%; height: 1000upx"
		>
			<!-- <cover-image class="cover-image" src="/static/logo.png"></cover-image> -->
			<cover-view class="cover-image" @click="getSearch"><input type="text" placeholder="搜索位置" /></cover-view>
		</map>
	</scroll-view>
</template>
<script>
export default {
	data() {
		return {
			mapContext: null, //地图对象
			startMove: false, //是否开始回放
			nextPointIndex: 1, //下一个坐标点的索引
			durationTime: 1000, //相邻两点动画持续时长默认1秒
			//路线信息
			polyline: [
				{
					width: 8,
					points: [],
					arrowLine: true,
					color: '#3591FC'
				}
			],
			//标记点(即移动标记物)
			markers: [
				{
					id: 1,
					width: 40,
					height: 40,
					latitude: 0,
					longitude: 0,
					iconPath: '/static/logo.png',
					anchor: {
						x: 0.5,
						y: 1
					}
				}
			]
		};
	},
	mounted() {
		this.getTrack(); //获取轨迹信息(只做演示，未进行远程请求)
	},
	methods: {
		//模拟获取远程数据
		getTrack() {
			this.polyline[0].points = [
				{ latitude: 39.997761, longitude: 116.478935 },
				{ latitude: 39.997825, longitude: 116.478939 },
				{ latitude: 39.998549, longitude: 116.478912 },
				{ latitude: 39.998555, longitude: 116.478998 },
				{ latitude: 39.998566, longitude: 116.479282 },
				{ latitude: 39.998528, longitude: 116.479658 },
				{ latitude: 39.998453, longitude: 116.480151 },
				{ latitude: 39.998302, longitude: 116.480784 },
				{ latitude: 39.998184, longitude: 116.481149 },
				{ latitude: 39.997997, longitude: 116.481573 },
				{ latitude: 39.997846, longitude: 116.481863 },
				{ latitude: 39.997718, longitude: 116.482072 },
				{ latitude: 39.997718, longitude: 116.482362 },
				{ latitude: 39.998935, longitude: 116.483633 },
				{ latitude: 39.998968, longitude: 116.48367 },
				{ latitude: 39.999861, longitude: 116.484648 }
			];
			this.durationTime = Math.ceil(30000 / this.polyline[0].points.length); //默认播放全程使用30秒，计算相连两点动画时长
			this.initMapData();
		},
		//设置地图
		initMapData() {
			this.initMarkers();
			this.mapContext = uni.createMapContext('myMap', this);
		},
		//设置位置（从起点开始）
		initMarkers() {
			this.markers[0].latitude = this.polyline[0].points[0].latitude;
			this.markers[0].longitude = this.polyline[0].points[0].longitude;
		},
		getSearch(e) {
			console.log(e);
		}
	}
};
</script>

<style lang="scss">
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
.cover-image {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 96px;
		height: 96px;
		z-index: 1000000;
	}
</style>
