<template>
	<view class="uploadIdCard">
		<view class="upload-group">
			<view class="upload-title">
				上传身份证正反面
			</view>
			<view class="upload-group-box">
				<view class="box">
					<view v-if="frontOfFile" class="upload-item upload-item-ready">
						<uni-icons type="clear" size="30" color="gray" class="cloable" @click="deleteImg('frontOfFile')"></uni-icons>
						<view class="upload-pic-large">
							<image :src="frontOfFile"></image>
						</view>
					</view>
					<view v-else class="upload-item upload-item-not-ready" @click="uploadImg('frontOfFile')">+</view>
					<view class="upload-item-title">上传身份证正面</view>
				</view>
				<view class="box">
					<view v-if="reverseSideFile" class="upload-item upload-item-ready">
						<uni-icons type="clear" size="30" color="gray" class="cloable" @click="deleteImg('reverseSideFile')"></uni-icons>
						<view class="upload-pic-large">
							<image :src="reverseSideFile"></image>
						</view>
					</view>
					<view v-else class="upload-item upload-item-not-ready" @click="uploadImg('reverseSideFile')">+</view>
					<view class="upload-item-title">上传身份证反面</view>
				</view>
			</view>
			<view class="upload-title margin-tb-sm"><view>上传手持证件照</view></view>
			<view class="upload-hand-pic">
				<view>
					<view v-if="inHandFile" class="upload-item">
						<uni-icons type="clear" size="30" color="gray" class="cloable" @click="deleteImg('inHandFile')"></uni-icons>
						<image :src="inHandFile" v-on:click="previewImage(inHandFile)"></image>
					</view>
					<view v-else class="upload-item upload-item-not-ready" @click="uploadImg('inHandFile')">+</view>
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
			<button @click="onSubmitInfo">提交</button>
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
			frontOfFile: '/static/mine/bg_sfz.png',
			reverseSideFile: '',
			inHandFile: '/static/mine/bg_scsczjz.png',
			userInfo:{},
		};
	},
	onLoad(options) {
		this.userInfo = JSON.parse(options.userInfo);
	},
	methods: {
		deleteImg(type) {
			switch (type) {
				case 'frontOfFile':
					this.frontOfFile = '';
					break;
				case 'reverseSideFile':
					this.reverseSideFile = '';
					break;
				case 'inHandFile':
					this.inHandFile = '';
					break;
			}
		},
		uploadImg(type) {
			switch (type) {
				case 'frontOfFile':
					this.chooseImage(path => {
						this.frontOfFile = path;
					});
					break;
				case 'reverseSideFile':
					this.chooseImage(path => {
						this.reverseSideFile = path;
					});
					break;
				case 'inHandFile':
					this.chooseImage(path => {
						this.inHandFile = path;
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
			if(!this.frontOfFile || this.frontOfFile =='/static/mine/bg_sfz.png' || !this.reverseSideFile || !this.inHandFile || this.inHandFile =="/static/mine/bg_scsczjz.png"){
				this.$tip.toast("请完成身份证照片上传");
				return;
			}
			let param = {
				...this.userInfo,
				frontOfFile:this.frontOfFile,
				reverseSideFile:this.reverseSideFile,
				inHandFile:this.inHandFile
			}
			userService.certification(param).then((res)=>{
				if(res.data.success){
					
				}
			})
			// TODO
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
		margin-top: 50upx;
		margin-bottom: 50upx;
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
