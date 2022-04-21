<template>
	<view class="tour-guide">
		<view class="tour-guide-group">
			<view class="title">导游证号</view>
			<input placeholder="请输入导游证号" v-model="tourGuide" name="tourGuide"></input>
		</view>
		<view class="tour-guide-picture">
			<view class="tour-guide-picture-bg">
				<image v-if="tourGuideUrl" :src="tourGuideUrl"></image>
			</view>
		</view>
		<view class="tour-guide-upload-btn"  @click="uploadPicture">
			<uni-icons class="tour-guide--upload-btn-add" color="#0095FF" type="plus" size="24">
			</uni-icons>
			上传导游证
		</view>
		<view class="btn">
			<button @click="onFinish">确认</button>
		</view>
	</view>
</template>

<script>
	import { uploadFile } from "@/common/biz/common.js";
	export default {
		data() {
			return {
				tourGuide:'',
				tourGuideUrl:''
			}
		},
		onLoad(options){
			let data = JSON.parse(options.tourGuideInfo);
			this.tourGuide = data.guideCertificatesNumber;
			this.tourGuideUrl = data.guideCertificates;
		},
		methods: {
			uploadPicture(){
				let $this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(chooseImageRes){
						let {tempFilePaths} = chooseImageRes;
						uploadFile(tempFilePaths[0],(path)=>{
							$this.tourGuideUrl = path;
						});
					}
				});
			},
			onFinish(){
				if(!this.tourGuideUrl||!this.tourGuide){
					this.$tip.toast("请完成导游信息");
					return;
				}
				uni.$emit('tourGuideInfo', {guideCertificatesNumber:this.tourGuide,guideCertificates:this.tourGuideUrl});
				//上传数据
				uni.navigateBack({
					url:"/pages/mine/captainApplication/ability"
				});
			}
		}
	}
</script>

<style lang="less">
.tour-guide{
	background-color: #FFFFFF;
	.tour-guide-group {
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 120upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
		justify-content: space-between;
		.title {
			text-align: justify;
			width: 180upx;
			padding-right: 30upx;
			font-size: 28upx;
			position: relative;
			height: 60upx;
			line-height: 60upx;
		}
		input {
			flex: 1;
			font-size: 30upx;
			color: #555;
			padding-right: 20upx;
		}
	}
	.tour-guide-picture{
		text-align: center;
		.tour-guide-picture-bg{
			width: 450upx;
			height: 500upx;
			margin: auto;
			margin-top: 204upx;
			background-image: url('../../../static/mine/bg_dlz.png');
			background-size: cover;
			background-repeat: no-repeat;
			border: 2upx dashed #000;
			uni-image{
				width: 220upx;
				height: 280upx;
				position: relative;
				top: 70upx;
				right: -6upx;
			}
		}
	}
	.tour-guide-upload-btn{
		color:#0095FF;
		margin-top:60upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24upx;
		.tour-guide--upload-btn-add{
			padding-right: 16upx;
		}
	}
	.btn{
		width: 100%;
		position: absolute;  
		bottom: 100upx;
		font-size: 32upx;
		button{
			color:#0089FF;
			margin-left: 50upx;
			margin-right: 50upx;
			border-radius: 38upx;
			background: rgba(0, 134, 255, 0.1);
		}
		uni-button:after{
			border: 0;
		}
	}
}
</style>
