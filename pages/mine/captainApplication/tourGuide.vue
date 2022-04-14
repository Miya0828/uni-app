<template>
	<view class="tourGuide">
		<view class="cu-form-group margin-tb-sm">
			<view class="title">导游证号</view>
			<input placeholder="请输入导游证号" v-model="tourGuide" name="tourGuide"></input>
		</view>
		<view class="picture">
			<view class="bg">
				<image v-if="tourGuideUrl" :src="tourGuideUrl"></image>
			</view>
		</view>
		<view class="upload-btn"  @click="uploadPicture">
			<text class="cuIcon-roundadd margin-right-sm"></text>
			上传导游证
		</view>
		<view class="btn">
			<button class="text-blue margin-lr-xl" form-type="submit">确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tourGuide:'',
				tourGuideUrl:''
			}
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
						$this.tourGuideUrl = tempFilePaths[0];
						// uni.uploadFile({
						// 	url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
						// 	filePath: tempFilePaths[0],
						// 	name: 'file',
						// 	success: (uploadFileRes) => {
						// 		callback && callback(tempFilePaths);
						// 	}
						// });
						
					}
				});
			}
		}
	}
</script>

<style lang="less">
.tourGuide{
	background-color: #FFFFFF;
	.cu-form-group{
		border-bottom: 2upx solid #F8F8F8;
	}
	.picture{
		text-align: center;
		.bg{
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
	.upload-btn{
		color:#0095FF;
		margin-top:60upx;
		text-align: center;
	}
	.btn{
		width: 100%;
		position: absolute;  
		bottom: 100upx;
		button{
			border-radius: 38upx;
			background: rgba(0, 134, 255, 0.1);
		}
		uni-button:after{
			border: 0;
		}
	}
}
</style>
