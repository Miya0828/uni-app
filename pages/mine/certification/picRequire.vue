<template>
	<view class="pic-require">
		<view class="pic-require-modal show">
			<view class="pic-require-dialog">
				<view class="padding-xl">
					<view class="large-title">一、请上传清晰彩色，完整的原件扫 描或者照片；</view>
					<view class="large-title">二、身份证各项信息及头像清晰可见 容易识别；</view>
					<view class="large-title">三、证件照必须真是拍摄，不能使用 复印件；</view>
					<view class="large-title">四、建议横屏拍摄，以满足照片上传 的效果；</view>
					<view class="large-title">五、手持照需免冠、五官可见，完整 露出手臂耳朵。</view>
				</view>
			</view>
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
.pic-require{
	.pic-require-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}
	
	.pic-require-modal::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}
	
	.pic-require-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}
	.pic-require-dialog {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 680upx;
		max-width: 100%;
		background-color: #f8f8f8;
		border-radius: 10upx;
		overflow: hidden;
		.pic-require-dialog-content{
			padding: 50upx;
		}
	}
	.pic-require-dialog{
		text-align: left;
		border-radius: 20upx;
		.large-title{
			font-size: 32upx;
			font-weight: 500;
			color: #333333;
			margin-bottom: 30upx;
			line-height: 54upx;
		}
	}
}
</style>
