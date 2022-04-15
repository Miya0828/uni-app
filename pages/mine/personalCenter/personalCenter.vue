<template>
	<view class="personalCenter">
		<view class="cu-list menu card-menu" @click="onShowBottomModal">
			<view class="cu-item arrow">
				<text class="item title">头像</text>
				<view class="cu-avatar round" @click.stop="onPreview(userInfo.avatar)" :style="getStyle"></view>
			</view>
		</view>
		<view class="cu-list menu card-menu" @click="onChange('realname')">
			<view class="cu-item arrow">
				<text class="item title">昵称</text>
				<view>{{userInfo.realname}}</view>
			</view>
		</view>
		<view class="cu-form-group flex form-item">
			<view class="title">出生日期</view>
			<view class="flex birthday align-center">
				<picker mode="date" :value="userInfo.birthday" @change="bindDateChange">
					<view class="flex justify-end align-center" >
						<view class="uni-input">{{userInfo.birthday==0?'':userInfo.birthday}}</view>
						<image src="/static/register/ic_date.png"></image>
					</view>
				</picker>
			</view>
		</view>
		<view class="cu-list menu card-menu" @click="onChange('signature')">
			<view class="cu-item arrow">
				<text class="item title">个性签名</text>
				<view>{{userInfo.signature}}</view>
			</view>
		</view>
		<view class="cu-list menu card-menu" @click="onChange('post')">
			<view class="cu-item arrow">
				<text class="item title">职业</text>
				<view>{{userInfo.post}}</view>
			</view>
		</view>
		<view class="cu-list menu card-menu" @click="onChange('emergencyContact')">
			<view class="cu-item arrow">
				<text class="item title">紧急联系人</text>
				<view>{{userInfo.emergencyContact}}</view>
			</view>
		</view>
		<view class="cu-list menu card-menu" @click="onChange('emergencyContactPhone')">
			<view class="cu-item arrow">
				<text class="item title">紧急联系人电话</text>
				<view>{{userInfo.emergencyContactPhone}}</view>
			</view>
		</view>
		<view class="btn">
			<button class="text-blue margin-lr-xl"  @click="onSubmit">保存</button>
		</view>
		<view class="team-create-container-uni-popup">
			<uni-popup ref="popup" type="center">
				<uni-popup-dialog :title="title" mode="input" :duration="2000" :before-close="true" @close="onlose"
					@confirm="confirm">
					<uni-easyinput :focus="true" :clearable="false" type="textarea" v-model="value" />
				</uni-popup-dialog>
			</uni-popup>
		</view>
		<view class="pull-down-modal  bottom-modal" :class="isShowBottomModal?'show':''" >
			<view class="pull-down-dialog">
				<button class="margin-sm" @click="onUploadImg">更换图像</button>
				<button  class="margin-lr-sm margin-bottom-sm" @tap="hideModal">取消</button>
			</view>
		</view>
	</view>
</template>
<script>
	import { userService } from "@/api/index.js";
	import { USER_INFO } from "@/common/util/constants";
	import { uploadFile } from "@/common/biz/common.js";
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
					  'background-image':`url(${this.userInfo.avatar})`,                 
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
					uni.navigateTo({
						url:"/pages/login/login"
					})
				}
				userService.queryByUserId({userId:userInfo.id}).then((res)=>{
					if(res.data.success){
						let {id,avatar,birthday,signature,post,realname,telephone,emergencyContact} = res.data.result;
						$this.userInfo.id = id;
						$this.userInfo.avatar = avatar || 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg';
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
			onclose(){
				this.$refs.popup.close();
			},
			confirm(){
				this.userInfo[this.type]=this.value;
				this.$refs.popup.close();
			},
			onSubmit(){
				userService.editUser({...this.userInfo}).then((res)=>{
					if(res.data.success){}
					console.log("修改",res);
				})
			}
		}
	}
</script>

<style lang="less">
.personalCenter{
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
	.tips,.uni-input-placeholder{
		color: rgba(184, 184, 184, 1);
	}
	.cu-form-group{
		min-height: 57px;
		.birthday{
			flex:1;
			text-align: right;
			uni-image{
				width: 40upx;
				height: 40upx;
			}
		}
		uni-picker {
		    padding-right: 0;
		}
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
		border-radius: 10upx;
		overflow: hidden;
		uni-button{
			border-radius: 24upx;
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
