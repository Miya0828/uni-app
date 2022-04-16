<template>
	<view class="baseInfo">
		<form @submit="onAuth" @reset="formReset">
			<view>
				<view class="baseInfo-group">
					<view class="title">工作单位</view>
					<input placeholder="请输入工作单位" v-model="userInfo.username" name="username"></input>
				</view>
				<view class="baseInfo-group" @click="onFinishPersonIntroduce">
						<text class="item title">个人介绍</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
				</view>
				<view class="baseInfo-group baseInfo-group-skill" @click="onFinishSkilledIn">
						<text class="item title">擅长区域</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
				</view>
				<view class="baseInfo-group baseInfo-group-area" @click="onFinishGoodType()">
						<text class="item title">擅长类型</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
				</view>
				<view class="baseInfo-tips">
					<tex class="baseInfo-tips-flag">*</tex>
					 擅长区域和擅长类型决定可领活动的范围
				</view>
			</view>
			<view class="btn">
				<button form-type="submit">下一步</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				smsCountDown: 0,
				smsCountInterval: null,
				userInfo:{
					username:'',
					phone:'',
					identityCard:'',
					smsCode:''
				}
			}
		},
		computed: {
			isSendSMSEnable() {
				return this.smsCountDown <= 0 && this.userInfo.phone.length > 4;
			},
			getSendBtnText() {
				if (this.smsCountDown > 0) {
					return this.smsCountDown + '秒后发送';
				} else {
					return '发送验证码';
				}
			},
		},
		mounted(){
			
		},
		methods: {
			onChange(){},
			onFinishPersonIntroduce(){
				uni.navigateTo({
					url:"/pages/mine/captainApplication/personInfo"
				});
			},
			onFinishSkilledIn(){
				uni.navigateTo({
					url:"/pages/mine/captainApplication/skilledIn"
				});
			},
			onFinishGoodType(){
				uni.navigateTo({
					url:"/pages/mine/captainApplication/goodType"
				});
			},
			onSMSSend() {
				let smsParams = {};
				smsParams.mobile = this.phoneNo;
				smsParams.smsmode = SMS_MODE.register;
				let checkPhone = new RegExp(/^[1]([3-9])[0-9]{9}$/);
				if (!smsParams.mobile || smsParams.mobile.length == 0) {
					this.$tip.toast('请输入手机号');
					return false;
				}
				if (!checkPhone.test(smsParams.mobile)) {
					this.$tip.toast('请输入正确的手机号');
					return false;
				}
				loginService.sendCaptcha(smsParams).then(res => {
					if (res.data.success) {
						this.smsCountDown = 60;
						this.startSMSTimer();
					} else {
						this.smsCountDown = 0;
						this.$tip.toast(res.data.message);
					}
				});
			},
			startSMSTimer() {
				this.smsCountInterval = setInterval(() => {
					this.smsCountDown--;
					if (this.smsCountDown <= 0) {
						clearInterval(this.smsCountInterval);
					}
				}, 1000);
			},
			beforeDestroy() {
				if (this.smsCountInterval) {
					clearInterval(this.smsCountInterval);
				}
			},
			onAuth(e){
				//进行表单检查
				// var formData = e.detail.value;
				// //定义表单规则
				// var rule = [
				// 	{name:"username", checkType : "notnull", checkRule:"",  errorMsg:"请输入姓名"},
				// 	{name:'phone',checkType:'phoneno',errorMsg:'请输入正确的手机号码'},
				// 	{name:'identityCard',checkType:'identityCard',errorMsg:'请输入正确格式的身份证号'},
				// ];
				// var checkRes = graceChecker.check(formData, rule);
				// if(!checkRes){
				//     uni.showToast({ title: graceChecker.error, icon: "none" });
				// 	return;
				// }
				uni.navigateTo({
					url:"/pages/mine/captainApplication/ability"
				})
			}
		}
	}
</script>

<style lang="less">
.baseInfo{
	background-color:rgba(248, 248, 248, 1);
	height: 100vh;
	position: relative;
	.baseInfo-group {
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 120upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
		justify-content: space-between;
		.baseInfo-group-item{
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
		&.baseInfo-group-skill{
			margin-bottom: 0;
		}
		&.baseInfo-group-area{
			margin-top: 0;
		}
	}
	
	.baseInfo-group+.baseInfo-group {
		border-top: 1upx solid #eee;
	}
	.baseInfo-tips{
		color:#999999;
		padding: 30upx;
		.baseInfo-tips-flag{
			color:#F90000;
			padding-right:10upx;
		}
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
