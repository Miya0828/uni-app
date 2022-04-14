<template>
	<view class="certificationPage">
		<form @submit="onAuth" @reset="formReset">
			<view>
				<view class="cu-form-group margin-tb-sm">
					<view class="title">姓名</view>
					<input placeholder="请输入真实姓名"  name="username"></input>
				</view>
				<view class="cu-form-group margin-top-sm">
					<view class="title">区号</view>
					<input placeholder="86" disabled="true"></input>
				</view>
				<view class="cu-form-group margin-bottom-sm">
					<view class="title">手机号码</view>
					<input placeholder="请输入手机号码" type="number" maxlength="11" name="phone"></input>
				</view>
				<view class="cu-form-group margin-tb-sm">
					<view class="title">身份证号</view>
					<input placeholder="请输入证件号码" name="identityCard"></input>
				</view>
				<!-- <view class="cu-list menu card-menu margin-tb-sm">
					<view class="cu-item arrow">
						<navigator class="content" url="/pages/mine/certification/uploadIdCard" hover-class="none">
							<text class="item title">证件照片</text>
							<text class="bg-white tips">请上传证件照片</text>
						</navigator>
					</view>
				</view> -->
			</view>
			<view class="btn">
				<button class="text-blue margin-lr-xl" form-type="submit">下一步</button>
			</view>
		</form>
	</view>
</template>

<script>
	import graceChecker from '@/common/biz/graceChecker.js';
	export default {
		data() {
			return {
				username:'123'
			}
		},
		mounted(){
			
		},
		methods: {
			onAuth(e){
				//进行表单检查
				var formData = e.detail.value;
				//定义表单规则
				var rule = [
					{name:"username", checkType : "notnull", checkRule:"",  errorMsg:"请输入姓名"},
					{name:'phone',checkType:'phoneno',errorMsg:'请输入正确的手机号码'},
					{name:'identityCard',checkType:'identityCard',errorMsg:'请输入正确格式的身份证号'},
				];
				var checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				uni.navigateTo({
					url:"/pages/mine/certification/uploadIdCard?userInfo="+JSON.stringify(formData)
				})
			}
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
