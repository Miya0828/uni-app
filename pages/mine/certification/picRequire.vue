<template>
	<view class="picRequire">
		<view class="cu-modal show">
			<view class="cu-dialog">
				<view class="padding-xl">
					<view class="large-title margin-bottom">一、请上传清晰彩色，完整的原件扫 描或者照片；</view>
					<view class="large-title margin-bottom">二、身份证各项信息及头像清晰可见 容易识别；</view>
					<view class="large-title margin-bottom">三、证件照必须真是拍摄，不能使用 复印件；</view>
					<view class="large-title margin-bottom">四、建议横屏拍摄，以满足照片上传 的效果；</view>
					<view class="large-title margin-bottom">五、手持照需免冠、五官可见，完整 露出手臂耳朵。</view>
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
.picRequire{
	.cu-dialog{
		text-align: left;
		border-radius: 20upx;
		.large-title{
			font-size: 32upx;
			font-weight: 500;
			color: #333333;
			line-height: 54upx;
		}
	}
}
</style>
