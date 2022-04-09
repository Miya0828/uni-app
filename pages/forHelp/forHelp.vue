<template>
	<scroll-view scroll-y class="forHelpPage">
		<cu-custom bgColor="bg-white"><block slot="content">求助</block></cu-custom>
			<view class="flex justify-center align-center">
				<view class="padding-sm animation-slide-left" :style="[{animationDelay: '0.3s'}]"  @tap="goPage()">
					<view class="padding-xs radius text-center shadow-blur solid-right ">
						<view class="cu-avatar lg sos">
						</view>
						<view class="text-xs margin-top">一键求助</view>
					</view>
				</view> 
			</view>
			<view class="bg-white grid col-3 padding-sm radius margin-left margin-right">
				<view class="padding-sm animation-slide-left" :style="[{animationDelay: '0.3s'}]" v-for="(item,index) in usList" :key="index">
					<navigator v-if="item.url" class="content" :url="item.url" hover-class="none">
						<view class="padding-xs radius text-center shadow-blur solid-right ">
							<view class="cu-avatar lg " 
							 :style="{background: 'url(' + item.icon + ') no-repeat',backgroundSize:'100upx 100upx'}">
							</view>
							<view class="text-xs margin-top">{{item.title}}</view>
						</view>
					</navigator>
					<view v-else class="padding-xs radius text-center shadow-blur solid-right ">
						<view class="cu-avatar lg " 
						 :style="{background: 'url(' + item.icon + ') no-repeat',backgroundSize:'100upx 100upx'}">
						</view>
						<view class="text-xs margin-top">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view class="bg-white padding-top-sm margin-top margin-left margin-right">
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==tabCurent?'text-blue cur':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
				<!-- 列表list-->
				<view v-if="tabCurent=== 0" class="cu-list menu card-menu margin-top-xs margin-bottom-xl shadow-lg radius">
					<view class="cu-item arrow animation-slide-left" :style="[{ animationDelay: '0.3s' }]">
						<view class="content">
							<text class="cuIcon-redpacket_fill text-red"></text>
							<text class="text-grey">蜇伤/咬伤</text>
						</view>
					</view>
					<view class="cu-item arrow animation-slide-left" :style="[{ animationDelay: '0.5s' }]">
						<navigator class="content" url="/pages/user/userdetail" hover-class="none">
							<text class="cuIcon-settingsfill text-cyan"></text>
							<text class="text-grey">拉伤和扭伤</text>
						</navigator>
					</view>
					<view class="cu-item arrow animation-slide-left" :style="[{ animationDelay: '0.5s' }]">
						<navigator class="content" url="/pages/user/userdetail" hover-class="none">
							<text class="cuIcon-settingsfill text-cyan"></text>
							<text class="text-grey">中风</text>
						</navigator>
					</view>
					<view class="cu-item arrow animation-slide-left" :style="[{ animationDelay: '0.5s' }]">
						<navigator class="content" url="/pages/user/userdetail" hover-class="none">
							<text class="cuIcon-settingsfill text-cyan"></text>
							<text class="text-grey">过敏</text>
						</navigator>
					</view>
					<view class="cu-item arrow animation-slide-left" :style="[{ animationDelay: '0.5s' }]">
						<navigator class="content" url="/pages/user/userdetail" hover-class="none">
							<text class="cuIcon-settingsfill text-cyan"></text>
							<text class="text-grey">人事不省</text>
						</navigator>
					</view>
					<view class="cu-item arrow animation-slide-left" :style="[{ animationDelay: '0.3s' }]">
						<view class="content">
							<text class="cuIcon-redpacket_fill text-red"></text>
							<text class="text-grey">哮喘发作</text>
						</view>
					</view>
					<view class="cu-item arrow animation-slide-left" :style="[{ animationDelay: '0.1s' }]">
						<view class="content">
							<text class="cuIcon-favorfill text-yellow"></text>
							<text class="text-grey">出血</text>
						</view>
					</view>
					<view class="cu-item arrow animation-slide-left" :style="[{ animationDelay: '0.5s' }]">
						<navigator class="content" url="/pages/user/userdetail" hover-class="none">
							<text class="cuIcon-settingsfill text-cyan"></text>
							<text class="text-grey">骨折</text>
						</navigator>
					</view>
					<view class="cu-item arrow animation-slide-left" :style="[{ animationDelay: '0.7s' }]">
						<navigator class="content" url="/pages/user/userexit" hover-class="none">
							<text class="cuIcon-exit text-cyan"></text>
							<text class="text-grey">烧伤</text>
						</navigator>
					</view>
					<view class="cu-item arrow animation-slide-bottom" :style="[{ animationDelay: '0.7s' }]">
						<navigator class="content" url="/pages/user/userexit" hover-class="none">
							<text class="cuIcon-exit text-cyan"></text>
							<text class="text-grey">哽塞</text>
						</navigator>
					</view>
				</view>
				<view v-else class="bg-white padding-top-sm margin-top margin-left margin-right">暂无数据</view>
			</view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			usList: [
			  {icon: '/static/forHelp/SketchPng1', title: '自助报警柱位置' },
			  {icon: '/static/forHelp/SketchPng2', title: '下载离线地图' },
			  {icon: '/static/forHelp/SketchPng3', title: '周围驴友救助' },
			  {icon: '/static/forHelp/SketchPng4', title: '附近警示点' },
			  {icon: '/static/forHelp/SketchPng5', title: '短时天气预警' },
			  {icon: '/static/forHelp/SketchPng6', title: '队内紧急联络', url:'/pages/forHelp/chat'},
			],
			tabList:[
				'学习急救',
				'准备',
				'紧急',
				'小测'
			],
			tabCurent:0,
		};
	},
	onLoad(option) {
		console.log("forHelp");
	},
	methods:{
		tabSelect(e) {
			this.tabCurent = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		}
	}
};
</script>

<style lang="less">
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
.forHelpPage {
	background-color: #F8F8F8;
	.sos{
		background: red url('/static/forHelp/SketchPngSoS.png') center center no-repeat;
		backgroundSize:100upx 100upx;
		border-radius: 20upx;
	}
	.nav .cu-item.cur {
	    border-bottom: 2px solid;
	    background: #0081ff;
	    color: #FFF;
	    border-radius: 20px;
	}
	.nav .cu-item {
	    height: 68upx;
	    line-height: 68upx;
	}
}
</style>
