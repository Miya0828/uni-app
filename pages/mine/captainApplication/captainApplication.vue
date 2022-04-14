<template>
	<view class="captainApplication">
		<view class="text-gray padding-lr padding-tb-sm">本页内容仅用于平台审核，不对其他用户公开</view>
		<form @submit="onAuth" @reset="formReset">
			<view>
				<view class="cu-form-group margin-tb-sm">
					<view class="title">姓名</view>
					<input placeholder="请输入真实姓名" v-model="userInfo.username" name="username"></input>
				</view>
				<view class="cu-form-group margin-top-sm">
					<view class="title">区号</view>
					<input placeholder="86" disabled="true"></input>
				</view>
				<view class="cu-form-group margin-bottom-sm">
					<view class="title">手机号码</view>
					<input placeholder="请输入手机号码" type="number" v-model="userInfo.phone"  maxlength="11" name="phone"></input>
				</view>
				<view class="cu-form-group margin-bottom-sm">
					<view class="title">手机验证码</view>
					<input class="uni-input" placeholder="请输入验证码" v-model="userInfo.smsCode" type="number" maxlength="6" name="smsCode" />
					<button class="cu-btn line-blue sm" :disabled="!isSendSMSEnable" @click="onSMSSend">
						{{ getSendBtnText }}</button>
				</view>
				<view class="cu-form-group margin-tb-sm">
					<view class="title">身份证号</view>
					<input placeholder="请输入证件号码" v-model="userInfo.identityCard"  name="identityCard"></input>
				</view>
				<view class="cu-list menu card-menu margin-tb-sm">
					<view class="cu-item arrow">
						<navigator class="content" url="/pages/mine/certification/uploadIdCard" hover-class="none">
							<text class="item title">证件照片</text>
						</navigator>
					</view>
				</view>
			</view>
			<view class="btn">
				<button class="text-blue margin-lr-xl" form-type="submit">下一步</button>
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
					url:"/pages/mine/captainApplication/baseInfo"
				})
			}
		}
	}
</script>

<style lang="less">
.captainApplication{
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
