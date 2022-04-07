<template>
	<scroll-view scroll-y class="registerPage">
		<cu-custom bgColor="bg-white" backColor="text-black" :isBack="true">
			<block slot="backText"></block>
		</cu-custom>
		<view class="text-lg padding-lr-xl text-bold text-xxl">新用户注册</view>
		<form @submit="onSMRegister" @reset="formReset" class="margin-lr-xl">
			<view class="padding-lr-xl">
				<view class="cu-form-group margin-top form-item">
					<picker @change="bindPickerChange" :value="index" :range="array">
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
					<input placeholder="密码为6-12位数字及字母组成" password name="password"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="请输入姓名" name="userName"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="请输入年龄" name="age"></input>
				</view>
				<view class="cu-form-group margin-top form-item" >
					<input placeholder="请选择性别" name="sex"></input>
					<radio-group name="gender">
						<label>
							<radio value="男" class="form-radio" /><text>男</text>
						</label>
						<label>
							<radio value="女" checked="true" class="form-radio"/><text>女</text>
						</label>
					</radio-group>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input placeholder="请输入紧急联系人电话"  type="number" maxlength="11"  name="iosPhone"></input>
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
	</scroll-view>
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
				smsParams.smsmode = "0";
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
			onSMRegister(e){
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				var rule = [
					{name:'phone',checkType:'phoneno',errorMsg:'请输入正确的手机号码'},
					{name:'smsCode',checkType:'zipcode',errorMsg:'请输入6位数的验证码'},
					{name:"account", checkType : "notnull", checkRule:"",  errorMsg:"请输入账号"},
				    {name:"password", checkType : "reg", checkRule:/^((?=.*[a-zA-Z])(?=.*[0-9]))[a-zA-Z0-9]{6,12}$/,errorMsg:"密码格式不正确"},
					{name:"userName", checkType : "notnull", checkRule:"",  errorMsg:"请输入姓名"},
					{name:"age", checkType : "notnull", checkRule:"",  errorMsg:"年龄格式不正确"},
				    {name:"gender", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
				    {name:"iosPhone", checkType : "phoneno", checkRule:"",  errorMsg:"请输入正确的手机号码"}
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
		uni-picker {
			flex: 0.1;
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
