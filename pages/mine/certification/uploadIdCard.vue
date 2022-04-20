<template>
	<view class="uploadIdCard">
		<view class="upload-group">
			<view class="upload-title">
				上传身份证正反面
			</view>
			<view class="upload-group-box">
				<view class="box">
					<view v-if="userInfo.frontOfImgUrl" class="upload-item upload-item-ready">
						<uni-icons type="clear" size="30" color="gray" class="cloable" @click="deleteImg('frontOfImgUrl')"></uni-icons>
						<view class="upload-pic-large">
							<image v-if="userInfo.frontOfImgUrl" :src="userInfo.frontOfImgUrl"  v-on:click="previewImage(userInfo.frontOfImgUrl)"></image>
							<image v-else src='/static/mine/bg_sfz.png' v-on:click="previewImage('/static/mine/bg_sfz.png')"></image>
						</view>
					</view>
					<view v-else class="upload-item upload-item-not-ready" @click="uploadImg('frontOfImgUrl')">+</view>
					<view class="upload-item-title">上传身份证正面</view>
				</view>
				<view class="box">
					<view v-if="userInfo.reverseSideImgUrl" class="upload-item upload-item-ready">
						<uni-icons type="clear" size="30" color="gray" class="cloable" @click="deleteImg('reverseSideImgUrl')"></uni-icons>
						<view class="upload-pic-large">
							<image :src="userInfo.reverseSideImgUrl" v-on:click="previewImage(userInfo.reverseSideImgUrl)"></image>
						</view>
					</view>
					<view v-else class="upload-item upload-item-not-ready" @click="uploadImg('reverseSideImgUrl')">+</view>
					<view class="upload-item-title">上传身份证反面</view>
				</view>
			</view>
			<view class="upload-title margin-tb-sm"><view>上传手持证件照</view></view>
			<view class="upload-hand-pic">
				<view>
					<view v-if="userInfo.inHandImgUrl" class="upload-item">
						<uni-icons type="clear" size="30" color="gray" class="cloable" @click="deleteImg('inHandImgUrl')"></uni-icons>
						<image v-if="userInfo.inHandImgUrl" :src="userInfo.inHandImgUrl" v-on:click="previewImage(userInfo.inHandImgUrl)"></image>
						<image v-else src="/static/mine/bg_scsczjz.png" v-on:click="previewImage('/static/mine/bg_scsczjz.png')"></image>
					</view>
					<view v-else class="upload-item upload-item-not-ready" @click="uploadImg('inHandImgUrl')">+</view>
					<view class="upload-item-title">上传手持证件照</view>
				</view>
			</view>
			<view class="upload-title upload-hand-pic-example">
				<view>照片示例</view>
				<navigator url="/pages/mine/certification/picRequire">
					<view class="upload-hand-pic-example-tip">查看拍照要求</view>
				</navigator>
			</view>
			<view class="pic-require"><image src="/static/mine/bg_zpsl.png"></image></view>
		</view>
		<view class="btn">
			<button @click="onSubmitInfo">下一步</button>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
import { pathToBase64, base64ToPath } from '@/js_sdk/mmmm-image-tools/index.js';
import { uploadFile } from "@/common/biz/common.js";
import { userService } from "@/api/index.js";
export default {
	data() {
		return {
			userInfo:{
				areaCode:'',
				name:'',
				phone:'',
				identityCard:'',
				frontOfImgUrl:"",
				reverseSideImgUrl:'',
				inHandImgUrl:''
			}
		};
	},
	onLoad(param) {
	    let data = JSON.parse(param.userInfo);
		//赋值
		this.userInfo = data;
	},
	methods: {
		deleteImg(type) {
			switch (type) {
				case 'frontOfImgUrl':
					this.userInfo.frontOfImgUrl = '';
					break;
				case 'reverseSideImgUrl':
					this.userInfo.reverseSideImgUrl = '';
					break;
				case 'inHandImgUrl':
					this.userInfo.inHandImgUrl = '';
					break;
			}
		},
		uploadImg(type) {
			switch (type) {
				case 'frontOfImgUrl':
					this.chooseImage(path => {
						this.userInfo.frontOfImgUrl = path;
					});
					break;
				case 'reverseSideImgUrl':
					this.chooseImage(path => {
						this.userInfo.reverseSideImgUrl = path;
					});
					break;
				case 'inHandImgUrl':
					this.chooseImage(path => {
						this.userInfo.inHandImgUrl = path;
					});
					break;
			}
		},
		chooseImage(callback) {
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album'],
				success: function(chooseImageRes){
					let {tempFilePaths} = chooseImageRes;
					uploadFile(tempFilePaths[0],(path)=>{
						callback&&callback(path);
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
			if(!this.userInfo.frontOfImgUrl || this.userInfo.frontOfImgUrl =='/static/mine/bg_sfz.png' || !this.userInfo.reverseSideImgUrl || !this.userInfo.inHandImgUrl || this.userInfo.inHandImgUrl =="/static/mine/bg_scsczjz.png"){
				this.$tip.toast("请完成身份证照片上传");
				return;
			}
			userService.certification(this.userInfo).then((res)=>{
				if(res.data.success){
					
					uni.navigateTo({
						url:"/pages/mine/certification/checking"
					})
				}
			})
			
		}
	}
};
</script>

<style lang="less">
.uploadIdCard {
	background-color: #f8f8f8;
	.upload-group{
		padding-top: 20upx;
		.upload-title{
			background-color: #ffffff;
			padding: 1upx 30upx;
			display: flex;
			align-items: center;
			min-height: 106upx;
			justify-content: space-between;
			border-bottom: 1px solid #f8f8f8;
			margin-top: 20upx;
			margin-bottom: 20upx;
			font-size: 28upx;
			color:#333333;
		}
		.upload-group-box {
			background-color: #ffffff;
			padding: 1upx 30upx;
			min-height: 422upx;
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
	}
	.upload-item {
		position: relative;
		width: 200upx;
		height: 200upx;
		border-radius: 16upx;
		background-color: #f8f8f8;
		color: #999999;
		.cloable {
			position: absolute;
			top: 2upx;
			right: 10upx;
			color: #999999;
			font-size: 40upx;
			z-index: 1;
		}
	}
	.upload-item-title{
		color:#0089FF;
		margin-top: 20upx;
		font-size: 24upx;
	}
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
	.upload-item-not-ready {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 80upx;
		overflow: hidden;
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
	.upload-hand-pic-example{
		display: flex;
		justify-center:justify-between;
		margin: 10upx 0;
		.upload-hand-pic-example-tip{
			color:#0089FF;
		}
	}
	.pic-require {
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
		margin-top: 50upx;
		margin-bottom: 50upx;
		font-size: 32upx;
		button {
			color:#0089FF;
			margin-left: 50upx;
			margin-right: 50upx;
			border-radius: 38upx;
			background: rgba(0, 134, 255, 0.1);
		}
		uni-button:after {
			border: 0;
		}
	}
}
</style>