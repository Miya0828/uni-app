<template>
	<view class="login-view">
		<view class="logo margin-left-xl">
			<image style="width: 100upx; height: 100upx;" src="../../static/logo.png">
			</image>
		</view>
		<view class="margin-left-lg text-lg  text-bold text-xxl login-tip">欢迎来到驴友通</view>
		<block  v-if="loginWay == 1">
			<view class="padding-lr-xl login-paddingtop">
				<view class="cu-form-group margin-top form-item">
					<input placeholder="请输入账户名" type="text" v-model="username"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="请输入登录密码" :type="passwordType" v-model="password"></input>
					<image class="icon-eye" src="/static/login/ic_eye.png" @tap="onShowPassword"></image>
				</view>
				<view class="margin-top-xl">
					<button class="bg-blue line-blue text-white login-btn" @click="onLogin">登录</button>
				</view>
				<view class="flex justify-between margin-top-lg bg-white">
					<text @tap="onSelectLoginWay(2)">手机号登录</text>
					<view class="flex justify-between" >
						<text class="forgetPassword">忘记密码</text>
						<text @click="goToRegister">快速注册</text>
					</view>
					
				</view>
			</view>
		</block>
		<block v-if="loginWay == 2">
			<view class="padding-lr-xl login-paddingtop">
				<view class="cu-form-group margin-top form-item">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
					<input placeholder="请输入手机号" type="number" maxlength="11" v-model="phoneNo"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input class="uni-input" type="number" maxlength="6" placeholder="请输入验证码" v-model="smsCode" />
					<button class="cu-btn line-blue sm" :disabled="!isSendSMSEnable" @click="onSMSSend">
						{{ getSendBtnText }}</button>
				</view>
				<view class="margin-top-xl">
					<button class="bg-blue line-blue text-white login-btn" @click="onSMLogin">登录</button>
				</view>
				<view class="flex justify-between margin-top-lg bg-white">
					<text @tap="onSelectLoginWay(1)">账号密码登录</text>
					<text @click="goToRegister">快速注册</text>
				</view>
			</view>
		</block>
		<view class="way padding-xl text-center">
			<view class="operLine bg-white">
				<text class="line">第三方账号登录</text>
			</view>
			<view class="login-way flex justify-between margin-top margin-bottom">
				<text class="cuIcon-weixin text-green"></text>
				<image src='/static//login/ic_qq.png'></image>
				<text class="cuIcon-weibo text-yellow"></text>
			</view>
			<view class="margin-top-xl text-center bg-white">
				登录即同意，<text selectable="true" class="text-black" @tap="showModal" data-target="Modal">《用户服务协议》</text>
			</view>
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">Modal标题</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						Modal 内容。
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { ACCESS_TOKEN,USER_NAME,USER_INFO,SMS_MODE } from "@/common/util/constants";
	import graceChecker from "../../common/biz/graceChecker.js"
	import { loginService } from "@/api/index.js";
	export default {
		data() {
			return {
				loginWay: 1,
				phoneNo: '',
				username:'',
				smsCode: '',
				password:'',
				array: ['+86'],
				index: 0,
				modalName:'',
				passwordType:'password',
				isShowPassword:false,
				smsCountDown: 0,
				smsCountInterval: null,
			};
		},
		onBackPress() {  
		   uni.showModal({
		     title: '提示',  
		     content: '是否退出驴友通？',  
		     success: function(res) {  
		         if (res.confirm) {  
		             // 退出当前应用，改方法只在App中生效  
		             plus.runtime.quit();  
		         } else if (res.cancel) {  
		             console.log('用户点击取消');  
		         }  
		     }  
		   });  
		   return true  
		},
		beforeDestroy() {
			if (this.smsCountInterval) {
				clearInterval(this.smsCountInterval);
			}
		},
		computed: {
			isSendSMSEnable() {
				return this.smsCountDown <= 0 && this.phoneNo.length > 4;
			},
			getSendBtnText() {
				if (this.smsCountDown > 0) {
					return this.smsCountDown + '秒后发送';
				} else {
					return '发送验证码';
				}
			},
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			onLogin(){
				let params = {};
				params.username = this.username;
				params.password = this.password;
				//定义表单规则
				var rule = [
					{name:"username", checkType : "notnull", checkRule:"",  errorMsg:"请输入正确的账户名"},
				    {name:"password", checkType : "password", checkRule:"",errorMsg:"密码格式不正确"},
				];
				var checkRes = graceChecker.check(params, rule);
				if(!checkRes){
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				loginService.login(params).then(res => {
					let {data}  = res;
					if (data.success) {
						let {token,userInfo} = data.result;
						uni.setStorageSync(ACCESS_TOKEN,token);
						uni.setStorageSync(USER_INFO,userInfo);
						this.$tip.success('登录成功!')
						uni.reLaunch({
							url: '/pages/home/home',
							animationType: 'slide-in-left',
							animationDuration: 200
						});
					} else {
						this.$tip.toast(res.data.message);
					}
				});
			},
			onSMSSend() {
				let smsParams = {};
				smsParams.mobile = this.phoneNo;
				smsParams.smsmode = SMS_MODE.login;
				//定义表单规则
				var rule = [
					{name:"mobile", checkType : "phone", checkRule:"",  errorMsg:"请输入正确的手机号"},
				];
				var checkRes = graceChecker.check(smsParams, rule);
				if(!checkRes){
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
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
			onSelectLoginWay(loginWay){
				switch(loginWay){
					case 1:
						this.phoneNo ='';
						this.smsCode='';
						this.loginWay = loginWay;
						break;
					case 2:
						this.username ='';
						this.password='';
						this.loginWay = loginWay;
						break;
				}
			},
			onShowPassword(){
				this.isShowPassword = !this.isShowPassword;
				this.passwordType = this.isShowPassword?'text':'password';
			},
			onSMLogin() {
				let loginParams = {
					mobile: this.phoneNo,
					captcha: this.smsCode
				};
				//定义表单规则
				var rule = [
					{name:"mobile", checkType : "phone", checkRule:"",  errorMsg:"请输入正确的手机号"},
					{name:"captcha", checkType : "zipcode", checkRule:"",  errorMsg:"请填写格式正确的短信验证码"},
				];
				var checkRes = graceChecker.check(loginParams, rule);
				if(!checkRes){
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				loginService.phoneLogin(loginParams).then((res)=>{
					let {data}  = res;
					if (data.success) {
						let {token,userInfo} = data.result;
						uni.setStorageSync(ACCESS_TOKEN,token);
						uni.setStorageSync(USER_INFO,userInfo);
						this.$tip.success('登录成功!')
						uni.reLaunch({
							url: '/pages/home/home',
							animationType: 'slide-in-left',
							animationDuration: 200
						});
					} else {
						this.$tip.toast(res.data.message);
					}
				})
				uni.setStorageSync(ACCESS_TOKEN, '111');
				this.$tip.success('登录成功!')
				uni.reLaunch({
					url: '/pages/home/home',
					animationType: 'slide-in-left',
					animationDuration: 200
				});
			},
			goToRegister(){
				uni.navigateTo({
					url: '/pages/register/register',
					animationType: 'slide-in-left',
					animationDuration: 200
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
		}
	};
</script>

<style lang="less">
	.login-view {
		position: relative;
		height: 100vh;
		.login-tip {
			margin-top: 36upx;
		}
		.login-paddingtop {
			padding-top: 50upx;
			.form-item {
				border-bottom-style: solid;
				border-bottom-color: #f0f0f0;
				border-bottom-width: 2upx;
				.icon-eye{
					width: 36upx;
					height: 36upx;
					margin-right: 16upx;
				}
			}
			.cu-form-group+.cu-form-group {
				border-top: 0;
			}
			.login-btn {
				border-radius: 40upx;
			}
		}
		.cu-form-group{
			padding:0;
			uni-picker {
				flex: 0.1;
				font-size: 32upx;
				.uni-input::after{
					content: "";
					width: 0px;
					height: 0px;
					border-top: 12upx solid #333333;
					border-left: 8upx solid transparent;
					border-right: 8upx solid transparent;
					position: absolute;
					top: 14upx;
					left: 62upx;
				}
			}
		}
		.way {
			padding: 40upx 120upx;
			width: 100%;
			position: absolute;  
			bottom: 20upx;
			.operLine {
				width: 100%;
				height: 80ux;
				text-align: center;
				line-height: 80upx;
				margin: 20upx auto;
				.line {
					position: relative;
					display: inline-block;
					padding: 0px 60upx;
					&.line::after {
						content: '';
						width: 80upx;
						position: absolute;
						top: 40upx;
						right: -40upx;
						border-bottom: 2upx solid #f0f0f0;
					}
					&.line::before {
						content: '';
						width: 80upx;
						position: absolute;
						top: 40upx;
						left: -40upx;
						border-bottom: 2upx solid #f0f0f0;
					}
				}
			}

			.login-way {
				font-size: 60upx;
				>uni-image{
					width: 31px;
					height: 34px;
				}
			}
		}
		.forgetPassword::after {
			display: inline-block;
			height: 30upx;
			margin: 0 20upx 4upx;
			vertical-align: middle;
			border-right: 1px solid #eeeeee;
			content: '';
		}
	}
</style>
