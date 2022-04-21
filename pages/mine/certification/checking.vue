<template>
	<view class="certification-application">
		<image src="/static/mine/bg_underreview.png"></image>
		<view class="certification-application-checking">正在审核中…</view>
		<view class="btn">
			<button @click="onBack">返回个人主页</button>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
		};
	},
	methods:{
		onBack(){
			uni.reLaunch({
				url:'/pages/mine/mine'
			});
		}
	}
}
</script>

<style lang="less">
	.certification-application{
		text-align: center;
		margin-top: 30upx;
		image{
			width: 80%;
			border: 1px dashed #333;
		}
		.certification-application-checking{
			margin-top: 40upx;
			color:#333333;
			font-size: 28upx;
		}
		.btn {
			width: 100%;
			margin-top: 50upx;
			margin-bottom: 50upx;
			font-size: 32upx;
			button {
				color:#0089FF;
				margin-left: 50upx;
				margin-right: 50upx;
				border-radius: 38upx;
				background: rgba(0, 134, 255, 0.1);
			}
			uni-button:after {
				border: 0;
			}
		}
	}
</style>