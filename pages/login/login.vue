<template>
	<view class="login-view">
		<view class="logo">
			<image src="../../static/logo.png"></image>
		</view>
		<view class="login-view-title">欢迎来到驴友通</view>
		<block v-if="loginWay == 1">
			<view class="login-view-padding-top">
				<view class="login-view-group">
					<input placeholder="请输入账户名" type="text" v-model="username"></input>
				</view>
				<view class="login-view-group">
					<input placeholder="请输入登录密码" :type="passwordType" v-model="password"></input>
					<image class="icon-eye" src="/static/login/ic_eye.png" @tap="onShowPassword"></image>
				</view>
				<view class="login-view-btn-box">
					<button @click="onLogin">登录</button>
				</view>
				<view class="login-view-login-way">
					<text @tap="onSelectLoginWay(2)">手机号登录</text>
					<view class="login-view-operation" >
						<text class="forgetPassword">忘记密码</text>
						<text @click="goToRegister">快速注册</text>
					</view>
					
				</view>
			</view>
		</block>
		<block v-if="loginWay == 2">
			<view class="login-view-padding-top">
				<view class="login-view-group">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="login-view-group-area">{{array[index]}}</view>
					</picker>
					<input class="login-view-group-phone" placeholder="请输入手机号" type="number" maxlength="11" v-model="phoneNo"></input>
				</view>
				<view class="login-view-group">
					<input class="uni-input" type="number" maxlength="6" placeholder="请输入验证码" v-model="smsCode" />
					<button class="login-view-group-smscode" :disabled="!isSendSMSEnable" @click="onSMSSend">
						{{ getSendBtnText }}</button>
				</view>
				<view class="login-view-btn-box">
					<button @click="onSMLogin">登录</button>
				</view>
				<view class="login-view-login-way">
					<text @tap="onSelectLoginWay(1)">账号密码登录</text>
					<text @click="goToRegister">快速注册</text>
				</view>
			</view>
		</block>
		<view class="login-view-thirdth-way">
			<view class="operLine">
				<text class="line">第三方账号登录</text>
			</view>
			<view class="login-way">
				<text class="cuIcon-weixin text-green"></text>
				<image src='/static/login/ic_qq.png'></image>
				<text class="cuIcon-weibo text-yellow"></text>
			</view>
			<view class="login-view-agree">
				登录即同意，<text selectable="true" class="login-view-agree-title" @tap="showModal" data-target="Modal">《用户服务协议》</text>
			</view>
			<view class="login-view-modal" :class="modalName=='Modal'?'show':''">
				<view class="login-view-dialog">
					<view class="login-view-dialog-bar">
						<view class="title">《用户服务协议》</view>
						<uni-icons type="closeempty" size="18" color="gray" class="cloable" @tap="hideModal"></uni-icons>
					</view>
					<view class="login-view-dialog-content">
						《用户服务协议》
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
	import store from '@/store/index.js';
	export default {
		data() {
			return {				
				loginWay: 1,
				phoneNo: '',
				username:'Miya1',
				smsCode: '',
				password:'P@ssw0rd',
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
		onLoad() {
						
			store.commit('closeSocket')
			store.commit('clearUser')
			uni.$emit('closeHeartbeat')
			
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
						// uni.setStorageSync(ACCESS_TOKEN,token);
						// uni.setStorageSync(USER_INFO,userInfo);
						store.commit('setToken',token)
						store.commit('setUserInfo',userInfo)
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
						
						// uni.setStorageSync(ACCESS_TOKEN,token);
						// uni.setStorageSync(USER_INFO,userInfo);
						store.commit('setToken',token)
						store.commit('setUserInfo',userInfo)
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
				// uni.setStorageSync(ACCESS_TOKEN, '111');
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
		.logo{
			margin-left: 50upx;
			image{
				width: 100upx; 
				height: 100upx;
			}
		}
		uni-input,input{
			font-size: 34upx;
			flex: 1;
			font-weight: 500;
			color: #333333;
		}
		.login-view-title {
			margin-top: 36upx;
			margin-left: 40upx;
			font-weight: bold;
			font-size: 44upx;
		}
		.login-view-padding-top {
			padding: 50upx 50upx 0 50upx;
			.login-view-group{
				background-color: #ffffff;
				padding: 1upx 30upx;
				display: flex;
				align-items: center;
				min-height: 100upx;
				justify-content: space-between;
				margin-top: 30upx;
				border-bottom-style: solid;
				border-bottom-color: #f0f0f0;
				border-bottom-width: 2upx;
				.login-view-group-smscode{
					padding: 0 20upx;
					font-size: 20upx;
					height: 48upx;
					position: relative;
					border: 0upx;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					text-align: center;
					overflow: visible;
				}
				uni-picker {
					flex: 0.2;
					font-size: 32upx;
					position: relative;
					.login-view-group-area::after{
						content: "";
						width: 0px;
						height: 0px;
						border-top: 12upx solid #333333;
						border-left: 8upx solid transparent;
						border-right: 8upx solid transparent;
						position: absolute;
						top: 20upx;
						left: 74upx
					}
				}
				.login-view-group-area{
					flex: 0.1;
					font-size: 19px;
					font-weight: 500;
					color: #333333;
					padding-right: 52upx;
				}
				.login-view-group-phone{
					flex: 1;
					font-size: 19px;
					color: #555;
					padding-right: 10px;
				}
				.icon-eye{
					width: 36upx;
					height: 36upx;
					margin-right: 16upx;
				}
			}
			.login-view-btn-box{
				margin-top: 70upx;
				button{
					background-color: #0086FF;
					color: #FFFFFF;
					border-radius: 40upx;
				}
			}
			.login-view-login-way{
				display: flex;
				justify-content:space-between ;
				background-color: #FFFFFF;
				margin-top: 40upx;
				.login-view-operation{
					display: flex;
					justify-content: space-between;
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
		}
		.login-view-thirdth-way {
			padding: 40upx 120upx;
			width: 100%;
			position: absolute;  
			bottom: 20upx;
			text-align: center;
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
				display: flex;
				justify-content: space-between;
				margin: 30upx 0;
				font-size: 60upx;
				>uni-image{
					width: 31px;
					height: 34px;
				}
			}
			.login-view-agree{
				margin-top: 50upx;
				text-align: center;
				background-color: #FFFFFF;
				.login-view-agree-title{
					color: #0086FF;
				}
			}
		}
		.login-view-modal {
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
		
		.login-view-modal::before {
			content: "\200B";
			display: inline-block;
			height: 100%;
			vertical-align: middle;
		}
		
		.login-view-modal.show {
			opacity: 1;
			transition-duration: 0.3s;
			-ms-transform: scale(1);
			transform: scale(1);
			overflow-x: hidden;
			overflow-y: auto;
			pointer-events: auto;
		}
		.login-view-dialog {
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
			.login-view-dialog-content{
				padding: 50upx;
			}
		}
		.login-view-dialog-bar{
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
		}
	}
</style>