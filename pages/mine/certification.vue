<template>
	<view class="certificationPage">
		<form @submit="onAuth" @reset="formReset">
			<view>
				<view class="cu-form-group margin-tb-sm">
					<view class="title">姓名</view>
					<input placeholder="请输入真实姓名" name="username"></input>
				</view>
				<view class="cu-form-group margin-top-sm">
					<view class="title">区号</view>
					<input placeholder="86" disabled="true"></input>
				</view>
				<view class="cu-form-group margin-bottom-sm">
					<view class="title">手机号码</view>
					<input placeholder="请输入手机号码" name="phone"></input>
				</view>
				<view class="cu-form-group margin-tb-sm">
					<view class="title">身份证号</view>
					<input placeholder="请输入证件号码" name="idCardNo"></input>
				</view>
				<view class="cu-list menu card-menu margin-tb-sm">
					<view class="cu-item arrow">
						<navigator class="content" url="/pages/user/userdetail" hover-class="none">
							<text class="item title">证件照片</text>
							<text class="bg-white tips">未上传</text>
						</navigator>
					</view>
				</view>
			</view>
			<view class="btn">
				<button class="text-blue margin-lr-xl">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		mounted(){
			
		},
		methods: {
			onAuth(){}
		}
	}
</script>

<style lang="less">
.certificationPage{
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
