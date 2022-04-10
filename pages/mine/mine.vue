<template>
	<view class="minePage">
		<view class="UCenter-bg" @click="remove">
			<view class="flex response margin-lr-lg  text-black">
				<view>
					<image src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6fd5df338f38edc75426378e11626e80f5216e314f9b0e184565d1f4c602cf2d" class="png round margin-bottom-sm" mode="scaleToFill"></image>
				</view>
				<view class="margin-left">
					<view class="username">
						<text class="text-bold padding-right-sm">袁露露</text>
						<text class="cuIcon-edit tex"></text>
					</view>
					<view class="description">是爱徒步的女侠呀</view>
					<view class="margin-top-xs">
						<text class="bg-blue padding-tb-xs padding-lr radius-lg  text-white">Lv:12</text>
						<text class="margin-lr bg-white padding-tb-xs padding-lr radius-lg  text-black">攀登者</text>
						<text class="bg-white padding-tb-xs padding-lr radius-lg  text-black">学生</text>
					</view>
				</view>
			</view>
			<view class="grid col-4 response">
				<view class="padding-sm">
					<view class="padding-xs radius text-center shadow-blur solid-right  text-black">
						<view class="text-lg text-bold">26</view>
						<view class="text-xs margin-top">点亮景点</view>
					</view>
				</view>
				<view class="padding-sm">
					<view class="padding-xs radius text-center shadow-blur solid-right  text-black">
						<view class="text-lg text-bold">86%</view>
						<view class="text-xs margin-top">走过温州</view>
					</view>
				</view>
				<view class="padding-sm">
					<view class="padding-xs radius text-center shadow-blur solid-right  text-black">
						<view class="text-lg text-bold">123.4</view>
						<view class="text-xs margin-top">徒步旅程</view>
					</view>
				</view>
				<view class="padding-sm">
					<view class="padding-xs radius text-center shadow-blur solid-right  text-black">
						<view class="text-lg text-bold">26</view>
						<view class="text-xs margin-top">点亮景点</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 列表list-->
		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
			<view class="cu-item arrow margin-bottom-sm radius">
				<navigator class="content" url="/pages/mine/certification/certification" hover-class="none">
					<text class="cuIcon-redpacket_fill text-red"></text>
					<text class="text-grey">实名认证</text>
				</navigator>
			</view>
			<view class="cu-item arrow top-radius">
				<navigator class="content" url="/pages/user/userdetail" hover-class="none">
					<text class="cuIcon-settingsfill text-cyan"></text>
					<text class="text-grey">安全培训进度</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/mine/captainGuide" hover-class="none">
					<text class="cuIcon-settingsfill text-cyan"></text>
					<text class="text-grey">成为队长</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/user/userdetail" hover-class="none">
					<text class="cuIcon-settingsfill text-cyan"></text>
					<text class="text-grey">行前登记</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/mine/teamAuth" hover-class="none">
					<text class="cuIcon-settingsfill text-cyan"></text>
					<text class="text-grey">组团与团队认证</text>
				</navigator>
			</view>
			<view class="cu-item arrow margin-bottom-sm bottom-radius">
				<navigator class="content" url="/pages/user/userdetail" hover-class="none">
					<text class="cuIcon-settingsfill text-cyan"></text>
					<text class="text-grey">下载离线地图</text>
				</navigator>
			</view>
			<view class="cu-item arrow top-radius">
				<view class="content">
					<text class="cuIcon-favorfill text-yellow"></text>
					<text class="text-grey">收藏夹</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-redpacket_fill text-red"></text>
					<text class="text-grey">发布驴记、评价</text>
				</view>
			</view>
			<view class="cu-item arrow bottom-radius">
				<navigator class="content" url="/pages/mine/uploadActivityInfo" hover-class="none">
					<text class="cuIcon-settingsfill text-cyan"></text>
					<text class="text-grey">活动信息上传</text>
				</navigator>
			</view>
			<button class="bg-white  margin-top-lg text-bold logout" @tap="logout">退出</button>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
import { ACCESS_TOKEN, USER_NAME, USER_INFO } from '@/common/util/constants';
export default {
	data() {
		return {
		};
	},
	methods: {
		logout() {
			uni.setStorageSync(ACCESS_TOKEN, '');
			uni.navigateTo({
				url: '/pages/login/login',
				animationType: 'slide-in-left',
				animationDuration: 200
			});
		}
	}
};
</script>

<style lang="less">
.minePage {
	background-color:#f7f8fe;
	color:#666666;
	.UCenter-bg {
		height: 420rpx;
		padding-top: 108rpx;
		overflow: hidden;
		color: #fff;
		font-weight: 300;
		.username{
		  overflow-wrap: break-word;
		  color: #333333;
		  font-size: 20px;
		  text-align: left;
		  white-space: nowrap;
		  line-height: 56upx;
		  display: block;
		}
		.description{
			color:rgba(153, 153, 153, 1);
			font-size: 30upx;
		}
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 150rpx;
		height: 150rpx;
	}
	.top-radius{
		border-radius:16upx 16upx 0 0;
	}
	.bottom-radius{
		border-radius: 0 0 16upx 16upx;
	}
	.logout{
		border-radius: 50upx;
	}
	uni-button:after{
		border: 0;
	}
}
</style>
