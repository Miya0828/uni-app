<template>
	<view class="ability">
		<form @submit="onAuth" @reset="formReset">
			<view>
				<view  class="text-gray padding-lr padding-top">本页内容仅用于平台审核，不对其他用户公开</view>
				<view class="cu-list menu card-menu margin-tb-sm">
					<view class="cu-item arrow">
						<navigator class="content" url="/pages/mine/captainApplication/tourGuide" hover-class="none">
							<text class="item title">导游证</text>
						</navigator>
					</view>
				</view>
				<view class="cu-list menu card-menu margin-top-sm">
					<view class="cu-item arrow">
						<navigator class="content" url="/pages/mine/captainApplication/teamLeader" hover-class="none">
							<text class="item title">领队证</text>
						</navigator>
					</view>
				</view>
				<view class="cu-list menu card-menu margin-top-sm">
					<view class="cu-item arrow">
						<navigator class="content" url="/pages/mine/captainApplication/experience" hover-class="none">
							<text class="item title">领队经验</text>
						</navigator>
					</view>
				</view>
				<view class="text-gray padding">
					<tex class="text-red padding-right-sm">*</tex>
					 根据国家旅游局规定，需要导游资格证才可带队，若无导游资
					    格证，在认领活动时需邀请一位导游同行
				</view>
			</view>
			<view class="btn">
				<button class="text-blue margin-lr-xl" form-type="submit">下一步</button>
				<view class="margin-top-sm flex justify-center align-center">
					<radio-group name="agree">
						<label>
							<radio value="1" class="form-radio"/>我已阅读并同意遵守
						</label>
						<text selectable="true" class="text-blue" @tap="showModal" data-target="Modal">领队认证协议</text>
					</radio-group>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">领队认证协议</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						领队认证协议
					</view>
				</view>
			</view>
		</form>
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
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
			onAuth(e){
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
	uni-scroll-view {
	    height: calc(100% - 45px);
	}
	.cu-list.card-menu{
		margin-left: 0;
		margin-right: 0;
		border-radius: 0;
	}
	.form-radio{
		transform: scale(0.7);
	}
	.cu-form-group{
		.title{
			width: 180upx;
		}
	}
	.item.title{
		display: inline-block;
		width: 180upx;
	}
	.tips,.uni-input-placeholder{
		color: rgba(184, 184, 184, 1);
	}
	.cu-form-group{
		min-height: 57px;;
	}
	.btn{
		width: 100%;
		position: absolute;  
		bottom: 100upx;
		button{
			border-radius: 38upx;
			background: rgba(0, 134, 255, 0.1);
		}
		uni-button:after{
			border: 0;
		}
	}
}
</style>
