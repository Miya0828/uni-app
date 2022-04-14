<template>
	<view class="personInfo">
		<view class="box">
			<textarea placeholder="请输入个人介绍"/>
		</view>
		<view class="btn">
			<button class="text-blue margin-lr-xl" form-type="submit">下一步</button>
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
.personInfo{
	width: 100%;
	height: 100vh;
	position: relative;
	.box{
		height: 100%;
		padding:0 40upx;
		uni-textarea{
			width: 100%;
			height: calc(100% - 380upx);
			background-color: #F8F8F8;
			padding: 40upx;
			.uni-textarea-textarea{
				width: 100%;
				padding: 10upx;
			}
		}
	}
	.btn{
		width: 100%;
		position: absolute;  
		bottom: 100upx;
		button{
			border-radius: 38upx;
			background: rgba(0, 134, 255, 0.1);
		}
	}
}
</style>
