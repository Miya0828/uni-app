<template>
    <view class="clipImage">
	<view class="pic-box">
		<image class="pic" :src="imageUrl || '/static/mine/ic_avatar.png'" mode="aspectFill" v-if="!url" @click="onPreview(imageUrl || '/static/mine/ic_avatar.png')"></image>
	</view>
	<image :src="url" v-if="url" mode="widthFix"></image>
	<l-clipper v-if="show" :image-url="imageUrl"  @success="onSuccess" @cancel="onCancel"/>
	<view class="pull-down-modal  bottom-modal" :class="isShowBottomModal?'show':''" >
		<view class="pull-down-dialog">
			<button style="background:#0089FF;color:#FFFFFF" @click="chooseImage">更换图像</button>
			<button style="background: rgba(0, 134, 255, 0.1);color:#0089FF" @tap="hideModal">取消</button>
		</view>
	</view>
    </view>
</template>

<script>
	import { USER_INFO } from "@/common/util/constants";
	import { uploadFile } from "@/common/biz/common.js";
	import store from '@/store/index.js';
	import { userService } from "@/api/index.js";
    export default {
        data() {
            return {
				isShowBottomModal:false,
				show: false,
				url: '',
				imageUrl:'',
            }
        },
		mounted(){
			let userInfo = uni.getStorageSync(USER_INFO),$this = this;
			if(!userInfo){
				uni.navigateBack({
					url:"/pages/login/login"
				})
			}
			this.imageUrl = userInfo.avatar;
		},
        methods: {
			onNavigationBarButtonTap() {
				console.log("点击了右上角 添加按钮");
				this.isShowBottomModal = true;
			},
			hideModal(){
				this.isShowBottomModal = false;
			},
			/* 选择图片  */
			chooseImage: function() {
				let _this = this;
				uni.chooseImage({
					success: function(res) {
						_this.imageUrl = res.tempFilePaths[0],
						_this.isShowBottomModal = false;
						_this.show = true;
					},
				});
			},
			onCancel(){
				let userInfo = uni.getStorageSync(USER_INFO),$this = this;
				if(!userInfo){
					uni.navigateBack({
						url:"/pages/login/login"
					})
				}
				this.show = false;
				this.imageUrl = userInfo.avatar;
			},
			onSuccess(event){
				let userInfo = uni.getStorageSync(USER_INFO);
				this.imageUrl = event.url;
				this.show = false;
				uploadFile(event.url,(path)=>{
					userInfo.avatar = path;
					userService.editUser(userInfo).then((res)=>{
						if(res.data.success){
							store.commit('setUserInfo',userInfo);
							uni.navigateTo({
								url:"/pages/mine/personalCenter/personalCenter"
							})
						}
					})
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
        }
    }
</script>

<style lang="less">
	page{
		width: 100%;
		height: 100%;
	}
	.clipImage{
		width: 100%;
		height: 100%;
		background: rgb(0, 0, 0);
		.pic-box{
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.pic{
				width: 100%;
				height: 600upx;
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