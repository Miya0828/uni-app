<template>
	<view class="captain-guide">
		<view class="captain-guide-modal show">
			<view class="captain-guide-dialog">
				<view class="captain-guide-dialog-content">
					<view class="large-title">一、认证条件</view>
					<view class="large-title-content">具有经营资质且存续运营的企业。</view>
					<view class="large-title">二、资料及审核</view>
					<view class="large-title-content">
						1.企业营业执照原件；<br/>
						2.旅行社经营许可证原件；<br/>
						3.旅行社责任险原件；<br/>
						4.运营人员身份证正反照片+手持身份证正面照片
					</view>
					<view class="large-title">三、审核标准</view>
					<view class="large-title-content">
						1.所填信息与相关执照信息一致；<br/>
						2.所上传证件内容清晰可见；<br/>
						3.相关执照未过期。
					</view>
					<view class="large-title">四、审核时间</view>
					<view class="large-title-content">我们将在1-3个工作日完成审核，并告知您结果。</view>
				</view>
				<view class="start-application">
					<navigator url="/pages/mine/captainApplication/baseInfo">
						<button style="background:#0089FF;color:#FFFFFF">知道了，开始申请</button>
					</navigator>
					<button style="background:rgba(38, 132, 255, 0.1);" @click="onGoBack">退出申请</button>
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
				uni.switchTab({
					url:'/pages/mine/mine'
				});
			}
		}
	}
</script>

<style lang="less">
.captain-guide{
	font-size: 22upx;
	.captain-guide-modal {
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
	
	.captain-guide-modal::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}
	
	.captain-guide-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}
	.captain-guide-dialog {
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
		.captain-guide-dialog-content{
			padding: 50upx 50upx 10upx 50upx;
		}
		// .start-application{
		// 	margin:0 40upx 20upx 40upx;
		// }
	}
	.captain-guide-dialog{
		text-align: left;
		border-radius: 20upx;
		.large-title{
			font-size: 32upx;
			font-weight: 500;
			color: #333333;
			margin-bottom: 30upx;
			line-height: 54upx;
		}
		.large-title-content{
			margin-bottom: 34upx;
		}
	}
	button{
		font-size: 32upx;
		color:#0089FF;
		border-radius: 50upx;
		margin:0 50upx 30upx 50upx;
	}
	uni-button:after{
		border: 0;
	}
}
</style>
