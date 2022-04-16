<template>
	<view class="ability">
		<view>
			<view class="ability-tips">本页内容仅用于平台审核，不对其他用户公开</view>
			<view class="ability-group" @click="onUploadTourGuide">
					<text class="item title">导游证</text>
					<uni-icons color="#3D3D3D" type="forward" size="18">
					</uni-icons>
			</view>
			<view class="ability-group" @click="onUploadTeamLeader">
					<text class="item title">领队证</text>
					<uni-icons color="#3D3D3D" type="forward" size="18">
					</uni-icons>
			</view>
			<view class="ability-group" @click="onFinishExperience">
					<text class="item title">领队经验</text>
					<uni-icons color="#3D3D3D" type="forward" size="18">
					</uni-icons>
			</view>
			<view class="ability-tips">
				<tex class="ability-tips-flag">*</tex>
				 根据国家旅游局规定，需要导游资格证才可带队，若无导游资
					格证，在认领活动时需邀请一位导游同行
			</view>
		</view>
		<view class="btn">
			<button @click="onNext">下一步</button>
			<view class="ability-agree">
				<radio-group name="agree">
					<label>
						<radio value="1" class="form-radio"/>我已阅读并同意遵守
					</label>
					<text selectable="true" class="text-blue" @tap="showModal" data-target="Modal">领队认证协议</text>
				</radio-group>
			</view>
		</view>
		<view class="ability-modal" :class="modalName=='Modal'?'show':''">
			<view class="ability-dialog">
				<view class="ability-dialog-bar">
					<view class="title">领队认证协议</view>
					<uni-icons type="closeempty" size="18" color="gray" class="cloable" @tap="hideModal"></uni-icons>
				</view>
				<view class="ability-dialog-content">
					领队认证协议
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName:'',
			}
		},
		mounted(){
			
		},
		methods: {
			onUploadTourGuide(){
				uni.navigateTo({
					url:"/pages/mine/captainApplication/tourGuide",
				})
			},
			onUploadTeamLeader(){
				uni.navigateTo({
					url:"/pages/mine/captainApplication/teamLeader",
				})
			},
			onFinishExperience(){
				uni.navigateTo({
					url:"/pages/mine/captainApplication/experience",
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
			onNext(e){
				uni.navigateTo({
					url:"/pages/mine/captainApplication/ability"
				})
			}
		}
	}
</script>

<style lang="less">
	.ability{
		background-color:rgba(248, 248, 248, 1);
		height: 100vh;
		position: relative;
		.ability-group {
			background-color: #ffffff;
			padding: 1upx 30upx;
			display: flex;
			align-items: center;
			min-height: 120upx;
			margin-top: 20upx;
			margin-bottom: 20upx;
			justify-content: space-between;
			.ability-group-item{
				margin-bottom: 20upx;
			}
			.title {
				text-align: justify;
				width: 180upx;
				padding-right: 30upx;
				font-size: 30upx;
				position: relative;
				height: 60upx;
				line-height: 60upx;
			}
			input {
				flex: 1;
				font-size: 30upx;
				color: #555;
				padding-right: 20upx;
			}
		}
		
		.ability-group+.ability-group {
			border-top: 1upx solid #eee;
		}
		.ability-tips{
			color:#999999;
			padding: 30upx;
			.ability-tips-flag{
				color:#F90000;
				padding-right:10upx;
			}
		}
		.btn{
			width: 100%;
			position: absolute;  
			bottom: 100upx;
			.ability-agree{
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 20upx;
				.form-radio{
					transform: scale(0.7);
				}
			}
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
		.ability-modal {
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
		
		.ability-modal::before {
			content: "\200B";
			display: inline-block;
			height: 100%;
			vertical-align: middle;
		}
		
		.ability-modal.show {
			opacity: 1;
			transition-duration: 0.3s;
			-ms-transform: scale(1);
			transform: scale(1);
			overflow-x: hidden;
			overflow-y: auto;
			pointer-events: auto;
		}
		.ability-dialog {
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
			.ability-dialog-content{
				padding: 50upx;
			}
		}
		.ability-dialog-bar{
			display: flex;
			position: relative;
			align-items: center;
			min-height: 100upx;
			justify-content: space-between;
			padding: 0 20upx;
			.title{
				text-align: center;
				flex: 1;
				font-size: 32upx;
				font-weight: 500;
			}
			.action {
				display: flex;
				position: relative;
				align-items: center;
				height: 100%;
				justify-content: center;
				max-width: 100%;
			}
		}
	}
</style>
