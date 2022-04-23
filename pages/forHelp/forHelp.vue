<template>
	<view class="for-help-page">
		<view class="for-help-page-sos">
			<view class="for-help-page-item" @click="onGetSOS">
				<view class="for-help-page-logo for-help-page-logo-sos"></view>
				<view class="for-help-page-title">一键求助</view>
			</view> 
		</view>
		<view class="for-help-page-grid for-help-page-item">
			<uni-grid :column="3" :showBorder="false">
				<uni-grid-item v-for="(item, index) in usList" :index="index" :key="index">
					<view class="for-help-page-grid-item-box">
						<image class="for-help-page-logo"  :src="item.icon"></image>
						<view class="for-help-page-title">{{item.title}}</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="for-help-page-nav">
			<view class="for-help-page-nav-item">
				<view class="for-help-page-nav-item-box">
					<view class="for-help-page-nav-item-box-area flex-sub" :class="index==dataType?'active':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
			</view>
		</view>
		<!-- 列表list-->
		<view class="list-content">
			<scroll-view scroll-y="true" style="height: 100%;" class="scrool-more">
				<view class="for-help-box">
					<view class="for-help-group" v-for="(item,index) of faidList" @click="onGoAidDetail(item.id)" :key="index">
						<text class="item title">{{item.dataHeader}}</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { forHelpService } from "@/api/index.js";
import uniStep from "@/components/uni-step/uni-step.vue";
import store from '@/store/index.js';
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
				'徒步准备',
				'能力小测'
			],
			faidList:[],
			dataType:0,
		};
	},
	mounted(){
		this.onfootFirstaid();
	},
	methods: {
		onfootFirstaid(){
			forHelpService.onfootFirstaid({dataType:this.dataType}).then((res)=>{
				if(res.data.success){
					this.faidList = res.data.result;
				}
			})
		},
		onGoAidDetail(id){
			if(this.dataType == 0){
				uni.navigateTo({
					url:"/pages/forHelp/learnAid/learnAid?id="+JSON.stringify({id:id})
				})
			}else if(this.dataType == 1){
				uni.navigateTo({
					url:"/pages/forHelp/hikeReady/hikeReady?id="+JSON.stringify({id:id})
				})
			}
			
		},
		tabSelect(e) {
			this.dataType = e.currentTarget.dataset.id;
			this.onfootFirstaid();
		},
		onGetSOS(){
			let { id } = store.getters.userInfo || {};
			forHelpService.uploadWarning({warningType:1,userId:id}).then((res)=>{
				if(res.data.success){
					res.data.message&&this.$tip.toast(res.data.message);
				}
			})
		}
	}
};
</script>

<style lang="less">	
page{
	width: 100%;
	height: 100%;
}
.for-help-page {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background-color: #F8F8F8;
	.for-help-page-sos{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.for-help-page-item{
		padding: 30upx;
		.for-help-page-logo-sos{
			background:red url('/static/forHelp/SketchPngSoS.png') center center no-repeat;
			border-radius: 20upx;
		}
		.for-help-page-logo{
			width: 98upx;
			height: 98upx;
			font-size: 2em;
		}
		.for-help-page-title{
			color: #333333;
			font-size: 20upx;
			margin-top: 30upx;
		}
	}
	.for-help-page-grid{
		padding:0 32upx 32upx 32upx;
		.uni-grid-wrap{
			background: #FFFFFF;
			border-radius: 16upx;
		}
		.for-help-page-grid-item-box,{
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			border-radius: 12upx;
		}
		.uni-grid-item__box{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
		uni-image{
			width: 100upx;
			height:100upx;
		}
	}
	.for-help-page-nav{
		padding: 0upx 30upx 0 30upx;
		.for-help-page-nav-item{
			padding-top: 24upx;
			background: #FFFFFF;
			border-radius: 12px 12px 0 0;
			.for-help-page-nav-item-box{
				display: flex;
				background: #F8F8F8;
				border-radius: 30upx;
				margin: 0 26upx;
				font-size: 24upx;				
				.for-help-page-nav-item-box-area{
					flex: 1;
					height: 70upx;
					display: inline-block;
					line-height: 70upx;
					margin: 0 10upx;
					padding: 0 20upx;
					text-align: center;
					&.active{
						border-bottom: 2px solid;
						background: #0081ff;
						color: #FFF;
						border-radius: 20px;
					}
				}
			}
		}
	}
	
	.list-content{
		flex: 1;
		position: relative;
		color:#666666;
		font-size: 28upx;
		.scrool-more{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			.for-help-box{
				padding: 0 30upx 30upx 30upx;
				.for-help-group {
					background-color: #ffffff;
					padding: 1upx 30upx 1upx 40upx;
					display: flex;
					align-items: center;
					min-height: 104upx;
					justify-content: space-between;
					.title {
						text-align: justify;
						padding-right: 30upx;
						font-size: 28upx;
						position: relative;
						height: 60upx;
						line-height: 60upx;
					}
				}
				.for-help-group+.for-help-group {
					border-top: 1upx solid #eee;
				}
			}
		}
	}
}
</style>
