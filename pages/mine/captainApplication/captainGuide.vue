<template>
	<view class="captainGuide">
		<view class="cu-modal show">
			<view class="cu-dialog">
				<view class="padding-xl">
					<view class="large-title margin-bottom">一、认证条件</view>
					<view class="margin-bottom-xl">具有经营资质且存续运营的企业。</view>
					<view class="large-title margin-bottom">二、资料及审核</view>
					<view class="margin-bottom-xl">
						1.企业营业执照原件；<br/>
						2.旅行社经营许可证原件；<br/>
						3.旅行社责任险原件；<br/>
						4.运营人员身份证正反照片+手持身份证正面照片
					</view>
					<view class="large-title margin-bottom">三、审核标准</view>
					<view class="margin-bottom-xs">
						1.所填信息与相关执照信息一致；<br/>
						2.所上传证件内容清晰可见；<br/>
						3.相关执照未过期。
					</view class="margin-bottom-xl">
					<view class="large-title margin-bottom-lg">四、审核时间</view>
					<view class="margin-bottom-xl">我们将在1-3个工作日完成审核，并告知您结果。</view>
				</view>
				<view class="margin-bottom-sm margin-lr-lg">
					<navigator url="/pages/mine/captainApplication/captainApplication">
						<button class="bg-blue">知道了，开始申请</button>
					</navigator>
				</view>
				<view class="margin-bottom-xl margin-lr-lg">
					<button class="text-blue" style="background:rgba(38, 132, 255, 0.1);" @click="onGoBack">退出申请</button>
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
			onGoBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="less">
.captainGuide{
	.cu-dialog{
		text-align: left;
		border-radius: 20upx;
		.large-title{
			font-size: 32upx;
			font-weight: 500;
			color: #333333;
			line-height: 44upx;
		}
		button{
			border-radius: 50upx;
		}
		uni-button:after{
			border: 0;
		}
	}
}
</style>
