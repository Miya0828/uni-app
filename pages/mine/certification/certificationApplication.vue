<template>
	<view class="certificationApplication">
		<image src="/static/mine/bg_underreview.png"></image>
		<view class="margin-top-lg">正在审核中…</view>
		<view class="btn margin-tb-xl">
			<button class="text-blue margin-lr-xl" @click="onBack">返回个人主页</button>
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
			uni.switchTab({
				url:'/pages/mine/mine'
			})
		}
	}
}
</script>

<style lang="less">
	.certificationApplication{
		text-align: center;
		margin-top: 30upx;
		image{
			width: 80%;
			border: 1px dashed #333;
		}
		.btn {
			width: 100%;
			button {
				border-radius: 38upx;
				background: rgba(0, 134, 255, 0.1);
			}
			uni-button:after {
				border: 0;
			}
		}
	}
</style>