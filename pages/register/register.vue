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
					<input class="uni-input" placeholder="请输入验证码" name="smsCode" v-model="smsCode" />
					<button class="cu-btn line-blue sm" :disabled="!isSendSMSEnable" @click="onSMSSend">
						{{ getSendBtnText }}</button>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="请输入账号" name="account"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="输入密码" password name="password"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input ref="input1" placeholder="输入密码确认" password name="surePassword"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="请输入姓名" name="userName"></input>
				</view>
				<view class="cu-form-group flex margin-top form-item">
					<text class="item uni-input-placeholder">请选择出生日期</text>
					<view class="flex birthday">
						<picker mode="date" :value="birthday" @change="bindDateChange">
							<view class="flex justify-end" >
								<view class="uni-input">{{birthday==0?'':birthday}}</view>
								<image src="/static/register/ic_date.png"></image>
							</view>
						</picker>
					</view>
					
				</view>
				<view class="cu-form-group margin-top form-item" >
					<input placeholder="请选择性别" name="sex"></input>
					<radio-group name="gender">
						<label>
							<radio value="先生" class="form-radio" /><text>先生</text>
						</label>
						<label>
							<radio value="女士" checked="true" class="form-radio"/><text>女士</text>
						</label>
					</radio-group>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="紧急联系人"  type="number" maxlength="11"  name="iosName"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="紧急联系人号码"  type="number" maxlength="11"  name="iosPhone"></input>
				</view>
				<view class="margin-top-xl">
					<button class="bg-blue line-blue text-white register-btn"  form-type="submit">注册</button>
				</view>
				<view class="margin-top-sm">
					<radio-group name="agreement">
						<label>
							<radio value="1" class="form-radio" />
						</label>
					</radio-group>
					我已阅读并同意遵守
					<text selectable="true" class="text-blue" @tap="showModal" data-target="Modal">用户协议 隐私政策</text>
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
	import graceChecker from "../../common/biz/graceChecker.js"
	export default {
		data() {
			return {
				phoneNo: '',
				smsCode: '',
				array: ['+86'],
				index: 0,
				smsCountDown: 0,
				modalName:'',
				birthday: 0,
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
			onSMSSend() {
				let smsParams = {};
				smsParams.mobile = this.phoneNo;
				smsParams.smsmode = "1";
				let checkPhone = new RegExp(/^[1]([3-9])[0-9]{9}$/);
				if (!smsParams.mobile || smsParams.mobile.length == 0) {
					this.$tip.toast('请输入手机号');
					return false;
				}
				if (!checkPhone.test(smsParams.mobile)) {
					this.$tip.toast('请输入正确的手机号');
					return false;
				}
				this.$http.post("/sys/sms", smsParams).then(res => {
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
			bindDateChange(e) {
				this.birthday = e.detail.value
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
				console.log(this.$refs.input1)
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				var rule = [
					{name:'phone',checkType:'phoneno',errorMsg:'请输入正确的手机号码'},
					{name:'smsCode',checkType:'zipcode',errorMsg:'请输入6位数的验证码'},
					{name:"account", checkType : "notnull", checkRule:"",  errorMsg:"请输入账号"},
				    {name:"password", checkType : "password", checkRule:"",errorMsg:"密码格式不正确"},
					{name:"surePassword", checkType : "notsame", checkRule:"password",errorMsg:"两次密码不一致"},
					{name:"userName", checkType : "notnull", checkRule:"",  errorMsg:"请输入姓名"},
					{name:"birthday", checkType : "notnull", checkRule:"",  errorMsg:"请输入出生日期"},
				    {name:"gender", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
					{name:"iosName", checkType : "notnull", checkRule:"",  errorMsg:"请输入紧急联系人"},
				    {name:"iosPhone", checkType : "phoneno", checkRule:"",  errorMsg:"请输入正确的紧急联系人号码"}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
				    uni.showToast({title:"验证通过!", icon:"none"});
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
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
