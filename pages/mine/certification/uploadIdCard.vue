<template>
	<view class="uploadIdCard">
		<view class="upload-group padding-top-sm">
			<view class="upload-title margin-tb-sm"><view>上传身份证正反面</view></view>
			<view class="upload-group-box">
				<view class="box">
					<view v-if="fontImg" class="upload-item upload-item-ready">
						<view class="cloable" @click="deleteImg('fontImg')">x</view>
						<view class="upload-pic-large"><image :src="fontImg"></image></view>
					</view>
					<view v-else class="upload-item upload-item-not-ready" @click="uploadImg('fontImg')">+</view>
					<view class="text-blue margin-top">上传身份证正面</view>
				</view>
				<view class="box">
					<view v-if="contraryImg" class="upload-item upload-item-not-ready">
						<view class="cloable" @click="deleteImg('contraryImg')">x</view>
						<view class="upload-pic-large"><image :src="contraryImg"></image></view>
					</view>
					<view v-else class="upload-item upload-item-not-ready" @click="uploadImg('contraryImg')">+</view>
					<view class="text-blue margin-top">上传身份证反面</view>
				</view>
			</view>
			<view class="upload-title margin-tb-sm"><view>上传手持证件照</view></view>
			<view class="upload-hand-pic">
				<view>
					<view v-if="handIdCardImg" class="upload-item">
						<view class="cloable" @click="deleteImg('handIdCardImg')">x</view>
						<image :src="handIdCardImg" v-on:click="previewImage(handIdCardImg)"></image>
					</view>
					<view v-else class="upload-item upload-item-not-ready" @click="uploadImg('handIdCardImg')">+</view>
					<view class="text-blue margin-top">上传手持证件照</view>
				</view>
			</view>
			<view class="upload-title flex justify-between margin-tb-sm">
				<view>照片示例</view>
				<navigator url="/pages/mine/certification/picRequire"><view class="text-blue">查看拍照要求</view></navigator>
			</view>
			<view class="pic-require"><image src="/static/mine/bg_zpsl.png"></image></view>
		</view>
		<view class="btn margin-tb-xl">
			<button class="text-blue margin-lr-xl" @click="onSubmitInfo">提交</button>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
import { pathToBase64, base64ToPath } from '@/js_sdk/mmmm-image-tools/index.js';
import { ACCESS_TOKEN } from "@/common/util/constants";
export default {
	data() {
		return {
			fontImg: '/static/mine/bg_sfz.png',
			contraryImg: '',
			handIdCardImg: '/static/mine/bg_scsczjz.png',
			userInfo:{}
		};
	},
	onLoad(options) {
		this.userInfo = JSON.parse(options.userInfo);
	},
	methods: {
		deleteImg(type) {
			switch (type) {
				case 'fontImg':
					this.fontImg = '';
					break;
				case 'contraryImg':
					this.contraryImg = '';
					break;
				case 'handIdCardImg':
					this.handIdCardImg = '';
					break;
			}
		},
		uploadImg(type) {
			switch (type) {
				case 'fontImg':
					this.chooseImage(path => {
						this.fontImg = path;
					});
					break;
				case 'contraryImg':
					this.chooseImage(path => {
						this.contraryImg = path;
					});
					break;
				case 'handIdCardImg':
					this.chooseImage(path => {
						this.handIdCardImg = path;
					});
					break;
			}
		},
		chooseImage(callback) {
			let token = uni.getStorageSync(ACCESS_TOKEN);
			if (!token) {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album'],
				success: function(chooseImageRes){
					let {tempFilePaths} = chooseImageRes;
					// callback && callback(tempFilePaths[0]);
					uni.uploadFile({
						url: 'http://119.23.214.166:8080/tour-palsys/common/upload', //仅为示例，非真实的接口地址
						header:{
							// "Content-Type": "multipart/form-data", // formdata提交格式
							'X-Access-Token':token
						},
						filePath: tempFilePaths[0],
						name: 'file',
						success: (uploadFileRes) => {
							callback && callback(tempFilePaths);
						}
					});
					
				}
			});
		},
		previewImage(url) {
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
		onSubmitInfo() {
			if(!this.fontImg || this.fontImg =='/static/mine/bg_sfz.png' || !this.contraryImg || !this.handIdCardImg || this.handIdCardImg =="/static/mine/bg_scsczjz.png"){
				this.$tip.toast("请完成身份证照片上传");
				return;
			}
			//上传数据
			uni.navigateTo({
				url:"/pages/mine/certification/certificationApplication"
			});
		}
	}
};
</script>

<style lang="less">
.uploadIdCard {
	background-color: #f8f8f8;
	.upload-item {
		position: relative;
		width: 200upx;
		height: 200upx;
		border-radius: 16upx;
		background-color: #f8f8f8;
		color: #999999;
	}
	.cloable {
		position: absolute;
		top: 2upx;
		right: 16upx;
		color: #999999;
		font-size: 40upx;
		z-index: 1;
	}
	.upload-item-not-ready {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 80upx;
		overflow: hidden;
	}
	.upload-title {
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 106upx;
		justify-content: space-between;
		border-bottom: 1px solid #f8f8f8;
	}
	.upload-group-box {
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 422upx;
		justify-content: space-around;
		.box {
			.upload-item-ready {
				width: 200upx;
				height: 200upx;
				border-radius: 16upx;
				background-color: #f8f8f8;
				color: #999999;
				border: 1px solid #1495ff;
				> .upload-pic-large {
					width: 100%;
					text-align: center;
					margin-top: 40upx;
					image {
						width: 188upx;
						height: 144upx;
					}
				}
			}
		}
	}
	.upload-hand-pic {
		width: 100%;
		height: 314upx;
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.pic-require {
		width: 100%;
		height: 202upx;
		padding: 20upx 32upx;
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		image {
			height: 136upx;
		}
	}
	.btn {
		width: 100%;
		button {
			border-radius: 38upx;
			background: rgba(0, 134, 255, 0.1);
		}
		uni-button:after {
			border: 0;
		}
	}
}
</style>
