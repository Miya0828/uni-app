<template>
	<view class="register-page">
		<view class="register-page-title">新用户注册</view>
		<form @submit="onSMRegister" class="register-page-form">
			<view class="register-page-form-view">
				<view class="register-page-group">
					<picker class="angle" @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
					<input placeholder="请输入手机号" type="number" maxlength="11" name="phone" v-model="phoneNo"></input>
				</view>
				<view class="register-page-group">
					<input class="uni-input" placeholder="请输入验证码" type="number" maxlength="6" name="captcha" />
					<button class="regiter-page-group-smscode" :disabled="!isSendSMSEnable" @click="onSMSSend">
						{{ getSendBtnText }}</button>
				</view>
				<view class="register-page-group">
					<input placeholder="请输入账号" name="username"></input>
				</view>
				<view class="register-page-group">
					<input placeholder="6-12位,必须包含大小写字母及数字" :type="passwordType" name="password"></input>
					<uni-icons :type="passwordType=='password'?'eye-slash':'eye'" size="24" @tap="onShowPassword"></uni-icons>
				</view>
				<view class="register-page-group">
					<input placeholder="输入密码确认" :type="confirmPasswordType" name="confirmPassword"></input>
					<uni-icons :type="confirmPasswordType=='password'?'eye-slash':'eye'" size="24" @tap="onShowConfirmPassword"></uni-icons>
				</view>
				<view class="register-page-group">
					<input placeholder="请输入昵称" name="realname"></input>
				</view>
				<view class="register-page-group register-page-group-flex">
					<text class="item" :style="{'color': birthday== 0?'#B8B8B8':'#333333'}">{{birthday==0?'请选择出生日期':birthday}}</text>
					<picker mode="date" :value="birthday" @change="bindDateChange">
						<image src="/static/register/ic_date.png"></image>
					</picker>
				</view>
				<view class="register-page-group register-page-group-flex" >
					<text class="item" style="color: #333333;">{{sexName}}</text>
					<radio-group name="sex" @change="onChangSex">
						<label v-for="item in sexList" :key="item.label">
							<radio :value="item.value" :checked="item.checked" class="form-radio" />
							<text>{{item.label}}</text>
						</label>
					</radio-group>
				</view>
				<view class="register-page-group">
					<input placeholder="请输入职业" name="profession"></input>
				</view>
				<view class="register-page-group">
					<input placeholder="紧急联系人" name="emergencyContact"></input>
				</view>
				<view class="register-page-group">
					<input placeholder="紧急联系人号码"  type="number" maxlength="11"  name="emergencyContactPhone"></input>
				</view>
				<view class="register-page-btn-box">
					<button form-type="submit">注册</button>
				</view>
				<view class="register-page-agree">
					<radio-group name="agree">
						<label>
							<radio value="1" class="form-radio"/>我已阅读并同意遵守
							<text selectable="true" class="register-page-agree-title" @tap="showModal" data-target="Modal">用户协议 隐私政策</text>
						</label>
					</radio-group>
				</view>
				<view class="register-to-login">
					<navigator url="/pages/login/login" hover-class="none">已有账号？返回登录</navigator>
				</view>
				<view class="register-page-modal" :class="modalName=='Modal'?'show':''">
					<view class="register-page-dialog">
						<view class="register-page-dialog-bar">
							<view class="title">《用户服务协议》</view>
							<uni-icons type="closeempty" size="18" color="gray" class="cloable" @tap="hideModal"></uni-icons>
						</view>
						<view class="register-page-dialog-content">
							《用户服务协议》
						</view>
					</view>
				</view>
			</view>
		</form>
	</view>
</template>
<script>
	import graceChecker from "../../common/biz/graceChecker.js";
	import { loginService } from "@/api/index.js";
	import { SMS_MODE,SEX_LIST } from "@/common/util/constants.js";
	export default {
		data() {
			return {
				phoneNo: '',
				array: ['+86'],
				index: 0,
				smsCountDown: 0,
				smsCountInterval: null,
				modalName:'',
				birthday: 0,
				isAgree:1,
				sexName:SEX_LIST[0].label,
				sexList:SEX_LIST,
				passwordType:'password',
				confirmPasswordType:'password',
				isShowPassword:false,
				isShowConfirmPassword:false,
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
		beforeDestroy() {
			if (this.smsCountInterval) {
				clearInterval(this.smsCountInterval);
			}
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
			onShowPassword(){
				this.isShowPassword = !this.isShowPassword;
				this.passwordType = this.isShowPassword?'text':'password';
			},
			onShowConfirmPassword(){
				this.isShowConfirmPassword = !this.isShowConfirmPassword;
				this.confirmPasswordType = this.isShowConfirmPassword?'text':'password';
			},
			onChangSex(e){
				for(let item of SEX_LIST){
					if(e.detail.value == item.value){
						this.sexName = item.label;
					}
				}
			},
			bindPickerChange(e){
				this.index = e.detail.value;
			},
			bindDateChange(e) {
				this.birthday = e.detail.value;
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			onSMRegister(e){
				//进行表单检查
				var formData = e.detail.value;
				//定义表单规则
				var rule = [
					{name:'phone',checkType:'phoneno',errorMsg:'请输入正确的手机号码'},
					{name:'captcha',checkType:'zipcode',errorMsg:'请输入6位数的验证码'},
					{name:"username", checkType : "notnull", checkRule:"",  errorMsg:"请输入账号"},
				    {name:"password", checkType : "password", checkRule:"",errorMsg:"6-12位,必须包含大小写字母及数字"},
					{name:"confirmPassword", checkType : "same", checkRule:formData.password,errorMsg:"两次密码不一致"},
					{name:"realname", checkType : "notnull", checkRule:"",  errorMsg:"请输入姓名"},
					{name:"birthday", checkType : "notnull", checkRule:"",  errorMsg:"请输入出生日期"},
				    {name:"sex", checkType : "in", checkRule:"1,0",  errorMsg:"请选择性别"},
					{name:"agree",checkType:'notnull',checkRule:'',errorMsg:'请阅读并选择遵守协议'},
				];
				formData.birthday = this.birthday;
				var checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				delete formData.agree;
				loginService.register(formData).then((res)=>{
					if(res.data.success){
						this.$tip.success('注册成功!')
						uni.reLaunch({
							url: '/pages/login/login',
							animationType: 'slide-in-left',
							animationDuration: 200
						});
					}else {
						this.$tip.toast(res.data.message);
					}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
		}
	}
</script>

<style lang='less'>
.register-page{
	color: #333333;
	.register-page-title{
		font-size: 44upx;
		padding-left: 30upx;
		padding-right: 30upx;
		font-weight: bold;
	}
	.register-page-form{
		margin-left: 50upx;
		margin-right: 50upx;
		.register-page-form-view{
			padding-left: 50upx;
			padding-right: 50upx;
		}
		.register-page-group{
			background-color: #ffffff;
			display: flex;
			align-items: center;
			min-height: 100upx;
			justify-content: space-between;
			margin-top: 30upx;
			border-bottom-style: solid;
			border-bottom-color: #f0f0f0;
			border-bottom-width: 2upx;
			.icon-eye{
				width: 36upx;
				height: 36upx;
				margin-right: 16upx;
			}
			uni-input{
				font-size: 28upx;
				flex:1;
			}
			.regiter-page-group-smscode{
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
			uni-picker.angle {
				flex: 0.2;
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
			
			uni-image{
				width: 40upx;
				height: 40upx;
			}
			.icon-eye{
				width: 36upx;
				height: 36upx;
				margin-right: 16upx;
			}
		}
		.register-page-group-flex{
			display: flex;
			justify-content: space-between;
		}
		.register-page-btn-box{
			margin-top: 70upx;
			button{
				background-color: #0086FF;
				color: #FFFFFF;
				border-radius: 40upx;
			}
		}
		.register-page-agree{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 50upx;
			.register-page-agree-title{
				color: #0086FF;
			}
		}
		.register-to-login{
			text-align: center;
			color:#0086FF;
			margin-top: 30upx;
		}
		.form-radio{
			transform: scale(0.7);
		}
	}
	.register-page-modal {
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
	
	.register-page-modal::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}
	
	.register-page-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}
	.register-page-dialog {
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
		.register-page-dialog-content{
			padding: 50upx;
		}
	}
	.register-page-dialog-bar{
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

