<template>
	<view class="certificationPage">
		<form @submit="onAuth">
			<view>
				<view class="certificate-group">
					<view class="title">姓名</view>
					<input placeholder="请输入真实姓名"  name="name"></input>
				</view>
				<view class="certificate-group">
					<view class="title">区号</view>
					<input placeholder="86" value="86" disabled="true" name="areaCode"></input>
				</view>
				<view class="certificate-group certificate-group-item">
					<view class="title">手机号码</view>
					<input placeholder="请输入手机号码" type="number" maxlength="11" name="phone"></input>
				</view>
				<view class="certificate-group">
					<view class="title">身份证号</view>
					<input placeholder="请输入证件号码" name="identityCard"></input>
				</view>
			</view>
			<view class="btn">
				<button form-type="submit">下一步</button>
			</view>
		</form>
	</view>
</template>

<script>
	import graceChecker from '@/common/biz/graceChecker.js';
	export default {
		data() {
			return {
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
					{name:"name", checkType : "notnull", checkRule:"",  errorMsg:"请输入姓名"},
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
	.certificate-group {
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 120upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
		justify-content: space-between;
		.certificate-group-item{
			margin-bottom: 20upx;
		}
	}
	
	.certificate-group+.certificate-group {
		border-top: 1upx solid #eee;
	}
	
	.certificate-group .title {
		text-align: justify;
		width: 180upx;
		padding-right: 30upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
	}
	
	.certificate-group input {
		flex: 1;
		font-size: 30upx;
		color: #555;
		padding-right: 20upx;
	}
	.uni-input-placeholder{
		color: rgba(184, 184, 184, 1);
	}
	.btn{
		width: 100%;
		position: absolute;  
		bottom: 100upx;
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
}
</style>
