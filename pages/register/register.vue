<template>
	<view class="registerPage">
		<view class="text-lg padding-lr text-bold text-xxl">新用户注册</view>
		<form @submit="onSMRegister" @reset="formReset" class="margin-lr-xl">
			<view class="padding-lr-xl">
				<view class="cu-form-group form-item">
					<picker class="angle" @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
					<input placeholder="请输入手机号" type="number" maxlength="11" name="phone" v-model="phoneNo"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input class="uni-input" placeholder="请输入验证码" type="number" maxlength="6" name="captcha" />
					<button class="cu-btn line-blue sm" :disabled="!isSendSMSEnable" @click="onSMSSend">
						{{ getSendBtnText }}</button>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="请输入账号" name="username"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="输入密码" password name="password"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="输入密码确认" password name="confirmPassword"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="请输入姓名" name="realname"></input>
				</view>
				<view class="cu-form-group flex margin-top form-item">
					<text class="item uni-input-placeholder">请选择出生日期</text>
					<view class="flex birthday align-center">
						<picker mode="date" :value="birthday" @change="bindDateChange">
							<view class="flex justify-end" >
								<view class="uni-input">{{birthday==0?'':birthday}}</view>
								<image src="/static/register/ic_date.png"></image>
							</view>
						</picker>
					</view>
					
				</view>
				<view class="cu-form-group flex margin-top form-item" >
					<text class="item" style="color: grey;">请选择性别</text>
					<radio-group name="sex" >
						<label  v-for="item in sexList" :key="item.label">
							<radio :value="item.value" :checked="item.checked" class="form-radio" />
							<text>{{item.label}}</text>
						</label>
					</radio-group>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="请输入职业" name="profession"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="紧急联系人" name="emergencyContact"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="紧急联系人号码"  type="number" maxlength="11"  name="emergencyContactPhone"></input>
				</view>
				<view class="margin-top-xl">
					<button class="bg-blue line-blue text-white register-btn" form-type="submit">注册</button>
				</view>
				<view class="margin-top-sm flex justify-center align-center">
					<radio-group name="agree">
						<label>
							<radio value="1" class="form-radio"/>我已阅读并同意遵守
							<text selectable="true" class="text-blue" @tap="showModal" data-target="Modal">用户协议 隐私政策</text>
						</label>
					</radio-group>
				</view>
				<view class="text-center text-blue margin-top">
					<navigator url="/pages/login/login" hover-class="none">已有账号？返回登录</navigator>
				</view>
				<view class="cu-modal" :class="modalName=='Modal'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">用户协议 隐私政策</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							用户协议 隐私政策
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
				sexList:SEX_LIST
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
				    {name:"password", checkType : "password", checkRule:"",errorMsg:"密码格式不正确"},
					{name:"confirmPassword", checkType : "same", checkRule:formData.password,errorMsg:"两次密码不一致"},
					{name:"realname", checkType : "notnull", checkRule:"",  errorMsg:"请输入姓名"},
					{name:"birthday", checkType : "notnull", checkRule:"",  errorMsg:"请输入出生日期"},
				    {name:"sex", checkType : "in", checkRule:"1,0",  errorMsg:"请选择性别"},
					{name:"profession", checkType : "notnull", checkRule:"",  errorMsg:"请输入职业"},
					{name:"emergencyContact", checkType : "notnull", checkRule:"",  errorMsg:"请输入紧急联系人"},
				    {name:"emergencyContactPhone", checkType : "phoneno", checkRule:"",  errorMsg:"请输入正确的紧急联系人号码"},
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
.registerPage{
	.form-item {
		border-bottom-style: solid;
		border-bottom-color: #f0f0f0;
		border-bottom-width: 2upx;
	}
	.cu-form-group+.cu-form-group {
		border-top: 0;
	}
	.cu-form-group{
		padding:0;
		position: relative;
		uni-picker.angle {
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
		.birthday{
			flex:1;
			text-align: right;
			uni-image{
				width: 40upx;
				height: 40upx;
			}
		}
	}
	.form-radio{
		transform: scale(0.7);
	}
	.register-btn {
		border-radius: 40upx;
	}
	 
}
</style>
