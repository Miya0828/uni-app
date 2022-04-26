<template>
	<view class="personal-center">
		<view class="personal-center-group" @click="onShowBottomModal">
				<text class="item title">头像</text>
				<view class="personal-center-group-avatar" @click.stop="onPreview(userInfo.avatar)" :style="getStyle"></view>
				<uni-icons color="#3D3D3D" type="forward" size="18">
				</uni-icons>
		</view>
		<view class="personal-center-group" @click="onChange('realname')">
				<text class="item title">昵称</text>
				<view>{{userInfo.realname}}</view>
				<uni-icons color="#3D3D3D" type="forward" size="18">
				</uni-icons>
		</view>
		<view class="personal-center-group personal-center-group-flex">
				<text class="item title">出生日期</text>
				<picker mode="date" :value="userInfo.birthday" @change="bindDateChange">
					<view class="personal-center-group-item" >
						<view class="uni-input">{{userInfo.birthday==0?'':userInfo.birthday}}</view>
						<image src="/static/register/ic_date.png"></image>
					</view>
				</picker>
		</view>
		<view class="personal-center-group" @click="onChange('signature')">
				<text class="item title">个性签名</text>
				<view>{{userInfo.signature}}</view>
				<uni-icons color="#3D3D3D" type="forward" size="18">
				</uni-icons>
		</view>
		<view class="personal-center-group" @click="onChange('post')">
				<text class="item title">职业</text>
				<view>{{userInfo.post}}</view>
				<uni-icons color="#3D3D3D" type="forward" size="18">
				</uni-icons>
		</view>
		<view class="personal-center-group" @click="onChange('emergencyContact')">
				<text class="item title">紧急联系人</text>
				<view>{{userInfo.emergencyContact}}</view>
				<uni-icons color="#3D3D3D" type="forward" size="18">
				</uni-icons>
		</view>
		<view class="personal-center-group" @click="onChange('emergencyContactPhone')">
				<text class="item title">紧急联系人电话</text>
				<view>{{userInfo.emergencyContactPhone}}</view>
				<uni-icons color="#3D3D3D" type="forward" size="18">
				</uni-icons>
		</view>
		<view class="btn">
			<button @click="onSubmit">保存</button>
		</view>
		<view class="container-uni-popup">
			<uni-popup ref="popup" type="center">
				<uni-popup-dialog :title="title" mode="input" :duration="2000" :before-close="true" @close="onClose"
					@confirm="confirm">
					<uni-easyinput :focus="true" :clearable="false" type="textarea" v-model="value" />
				</uni-popup-dialog>
			</uni-popup>
		</view>
		<view class="pull-down-modal  bottom-modal" :class="isShowBottomModal?'show':''" >
			<view class="pull-down-dialog">
				<button style="background:#0089FF;color:#FFFFFF" @click="onUploadImg">更换图像</button>
				<button style="background: rgba(0, 134, 255, 0.1);color:#0089FF" @tap="hideModal">取消</button>
			</view>
		</view>
	</view>
</template>
<script>
	import { userService } from "@/api/index.js";
	import { USER_INFO } from "@/common/util/constants";
	import { uploadFile } from "@/common/biz/common.js";
	import store from '@/store/index.js';
	export default {
		data() {
			return {
				userInfo:{
					id:'',
					avatar:'',
					realname:'',
					birthday:'',
					signature:'',
					post:'',
					emergencyContact:'',
					emergencyContactPhone:''
				},
				title: '请输入',
				value: '',
				type: '',
				isShowBottomModal:false
			}
		},
		computed:{
			getStyle(){
				return {                
					  'background-image':`url(${this.userInfo.avatar||'/static/mine/ic_avatar.png'})`,                 
				}   
			}
		},
		mounted(){
			this.queryByUserId();
		},
		methods: {
			queryByUserId(){
				let userInfo = uni.getStorageSync(USER_INFO),$this = this;
				if(!userInfo){
					uni.navigateBack({
						url:"/pages/login/login"
					})
				}
				userService.queryByUserId({userId:userInfo.id}).then((res)=>{
					if(res.data.success){
						let {sysUser, check_status,realName_Indentity} = res.data.result;
						store.commit('setUserInfo',sysUser);
						store.commit('setCheckStatus',check_status);
						let {id,avatar,birthday,signature,post,realname,telephone,emergencyContact,checkStatus} = sysUser;
						$this.userInfo.id = id;
						$this.userInfo.avatar = avatar;
						$this.userInfo.realname = realname;
						$this.userInfo.birthday = birthday;
						$this.userInfo.signature = signature;
						$this.userInfo.post = post;
						$this.userInfo.emergencyContact = emergencyContact;
						$this.userInfo.emergencyContactPhone = telephone;
					}
					
				});
			},
			bindDateChange(e) {
				this.birthday = e.detail.value;
			},
			onShowBottomModal(){
				this.isShowBottomModal = true;
			},
			hideModal(){
				this.isShowBottomModal = false;
			},
			onUploadImg(){
				let $this = this;
				this.isShowBottomModal = false;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(chooseImageRes){
						let {tempFilePaths} = chooseImageRes;
						uploadFile(tempFilePaths[0],(path)=>{
							$this.userInfo.avatar = path;
						});
					}
				});
			},
			onPreview(url){
				// 预览图片
				uni.previewImage({
					urls: [url],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			onChange(type){
				this.type = type;
				this.value = this.userInfo[type];
				this.$refs.popup.open();
			},
			onClose(){
				this.$refs.popup.close();
			},
			confirm(){
				this.userInfo[this.type]=this.value;
				this.$refs.popup.close();
			},
			onSubmit(){
				let profession = this.userInfo.post;
				let params = Object.assign({},this.userInfo,{profession});
				userService.editUser(params).then((res)=>{
					if(res.data.success){
						store.commit('setUserInfo',this.userInfo);
						uni.reLaunch({
							url:"/pages/mine/mine"
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
.personal-center{
	background-color:rgba(248, 248, 248, 1);
	height: 100vh;
	position: relative;
	.personal-center-group {
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 120upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
		justify-content: space-between;
		&.personal-center-group-flex{
			display: flex;
			justify-content: space-between;
		}
		.personal-center-group-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.title {
			flex: 1;
			text-align: justify;
			padding-right: 30upx;
			font-size: 28upx;
			position: relative;
			height: 60upx;
			line-height: 60upx;
			color: #333333;
		}
		.personal-center-group-avatar {
			font-variant: small-caps;
			margin: 0;
			padding: 0;
			display: inline-flex;
			text-align: center;
			justify-content: center;
			align-items: center;
			background-color: #ccc;
			color: #ffffff;
			white-space: nowrap;
			position: relative;
			width: 64upx;
			height: 64upx;
			background-size: cover;
			background-position: center;
			vertical-align: middle;
			font-size: 1.5em;
			border-radius:50%;
		}
		uni-image{
		    width: 40upx;
		    height: 40upx;
		}
	}
	
	.personal-center-group+.personal-center-group {
		border-top: 1upx solid #eee;
	}
	.btn{
		width: 100%;
		position: absolute;  
		bottom: 100upx;
		font-size: 32upx;
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
	.pull-down-modal {
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
	
	.pull-down-modal::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}
	
	.pull-down-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}
	
	.pull-down-dialog {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 680upx;
		max-width: 100%;
		background: #FFFFFF;
		border-radius: 10upx;
		overflow: hidden;
		uni-button{
			border-radius: 24upx;
			margin: 40upx;
		}
		uni-button:after{
			border: 0;
		}
	}
	
	.pull-down-modal.bottom-modal::before {
		vertical-align: bottom;
	}
	
	.pull-down-modal.bottom-modal .pull-down-dialog {
		width: 100%;
		border-radius: 0;
	}
	
	.pull-down-modal.bottom-modal {
		margin-bottom: -1000upx;
	}
	
	.pull-down-modal.bottom-modal.show {
		margin-bottom: 0;
	}
}
</style>
