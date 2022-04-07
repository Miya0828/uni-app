<template>
	<scroll-view scroll-y class="login-view" :style="{height:screenHeight+'px'}" >
		<view class="logo margin-left-xl margin-top-xl">
			<image style="width: 100upx; height: 100upx; background-color: #eeeeee;" src="../../static/logo.png">
			</image>
		</view>
		<view class="margin-left-lg text-lg  text-bold text-xxl login-tip">欢迎来到驴友通</view>
		<block v-if="loginWay == 1">
			<view class="padding-lr-xl login-paddingtop">
				<view class="cu-form-group margin-top form-item">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
					<input placeholder="请输入手机号" type="number" maxlength="11" v-model="phoneNo"></input>
				</view>
				<view class="cu-form-group margin-top form-item">
					<input class="uni-input" placeholder="请输入验证码" v-model="smsCode" />
					<button class="cu-btn line-blue sm" :disabled="!isSendSMSEnable" @click="onSMSSend">
						{{ getSendBtnText }}</button>
				</view>
				<view class="margin-top-xl">
					<button class="bg-blue line-blue text-white login-btn" @click="onSMLogin">登录</button>
				</view>
				<view class="flex justify-between margin-top-lg bg-white">
					<text>账号密码登录</text>
					<text @click="goToRegister">新用户注册</text>
				</view>
			</view>
			<view class="way padding-xl text-center">
				<view class="operLine bg-white">
					<text class="line">第三方账号登录</text>
				</view>
				<view class="login-way flex justify-between margin-top margin-bottom">
					<text class="cuIcon-weixin text-green"></text>
					<text class="cuIcon-weixin"></text>
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
		</block>
	</scroll-view>
</template>
<script>
	import {
		ACCESS_TOKEN,
		USER_NAME,
		USER_INFO
	} from "@/common/util/constants"
	export default {
		data() {
			return {
				loginWay: 1,
				phoneNo: '',
				smsCode: '',
				array: ['+86'],
				index: 0,
				smsCountDown: 0,
				modalName:'',
				screenHeight:0
			};
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
		mounted(){
			this.screenHeight = uni.getSystemInfoSync().windowHeight
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
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
			onSMLogin() {
				let checkPhone = new RegExp(/^[1]([3-9])[0-9]{9}$/);
				if (!this.phoneNo || this.phoneNo.length == 0) {
					this.$tip.toast('请填写手机号');
					return;
				}
				if (!checkPhone.test(this.phoneNo)) {
					this.$tip.toast('请输入正确的手机号');
					return false
				}
				if (!this.smsCode || this.smsCode.length == 0) {
					this.$tip.toast('请填短信验证码');
					return;
				}
				let loginParams = {
					mobile: this.phoneNo,
					captcha: this.smsCode
				};
				uni.setStorageSync(ACCESS_TOKEN, '111');
				this.$tip.success('登录成功!')
				this.$Router.replaceAll({
					name: 'index'
				})
			},
			goToRegister(){
				this.$Router.push({
					name: 'register'
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
			beforeDestroy() {
				if (this.smsCountInterval) {
					clearInterval(this.smsCountInterval);
				}
			},
		}
	};
</script>

<style lang="less">
	.login-view {
		position: relative;
		.logo{
			margin-top:250upx;
		}
		.login-tip {
			margin-top: 36upx;
		}
		.login-paddingtop {
			padding-top: 50upx;
			.form-item {
				border-bottom-style: solid;
				border-bottom-color: #f0f0f0;
				border-bottom-width: 2upx;
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
			}
		}
	}
</style>
