<template>
	<view class="experience">
		<view class="experience-box">
			<uni-easyinput type="textarea"  maxlength="500" suffixIcon="close" v-model="value" placeholder="请填写领队经验说明（附上至少一条活动链接，限500字内）"></uni-easyinput>
		</view>
		<view class="btn">
			<button>下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
.experience{
	width: 100%;
	height: 100vh;
	position: relative;
	background: #FFFFFF;
	.experience-box{
		padding: 100upx 32upx;
		
	}
	.uni-textarea-textarea{
		background: #F8F8F8 !important;
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
