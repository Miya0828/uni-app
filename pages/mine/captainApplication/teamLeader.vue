<template>
	<view class="tour-leader">
		<view class="tour-leader-picture">
			<view class="tour-leader-picture-bg">
				<image v-if="tourLeaderUrl" :src="tourLeaderUrl"></image>
			</view>
		</view>
		<view class="tour-guide-upload-btn"  @click="uploadPicture">
			<uni-icons class="tour-guide--upload-btn-add" color="#0095FF" type="plus" size="24">
			</uni-icons>
			上传领队证
		</view>
		<view class="btn">
			<button>确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tourLeaderUrl:""
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
						$this.tourLeaderUrl = tempFilePaths[0];
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
.tour-leader{
	background-color: #FFFFFF;
	.tour-leader-picture{
		text-align: center;
		.tour-leader-picture-bg{
			width: 450upx;
			height: 500upx;
			margin: auto;
			margin-top: 204upx;
			background-image: url('../../../static/mine/bg_ldz.png');
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
		font-size: 28upx;
		.tour-guide--upload-btn-add{
			padding-right: 16upx;
		}
	}
	.btn{
		width: 100%;
		position: absolute;  
		bottom: 100upx;
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
