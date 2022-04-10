<template>
	<view class="uploadIdCard">
		<view class="upload-group padding-top-sm">
			<view class="upload-title margin-tb-sm">
				<view>上传身份证正反面</view>
			</view>
			<view class="upload-group-box">
				<view class="box">
					<view v-if="fontImg" class="upload-item upload-item-ready">
						<view class="cloable" @click="deleteImg('fontImg')">x</view>
						<view class="upload-pic-large">
							<image :src="fontImg"></image>
						</view>
					</view>
					<view v-else class="upload-item upload-item-not-ready" @click="uploadImg('fontImg')">
						+
					</view>
					<view class="text-blue margin-top">上传身份证正面</view>
				</view>
				<view class="box">
					<view v-if="contraryImg" class="upload-item upload-item-not-ready">
						<view class="cloable" @click="deleteImg('contraryImg')">x</view>
						<view class="upload-pic-large">
							<image :src="contraryImg"></image>
						</view>
					</view>
					<view v-else class="upload-item upload-item-not-ready" @click="uploadImg('contraryImg')">
						+
					</view>
					<view class="text-blue margin-top">上传身份证反面</view>
				</view>
			</view>
			<view class="upload-title margin-tb-sm">
				<view>上传手持证件照</view>
			</view>
			<view class="upload-hand-pic">
				<view>
					<view v-if="handIdCardImg" class="upload-item">
						<view class="cloable"  @click="deleteImg('handIdCardImg')">x</view>
						<image :src="handIdCardImg" v-on:click="previewImage(handIdCardImg)"></image>
					</view>
					<view v-else class="upload-item upload-item-not-ready" @click="uploadImg('handIdCardImg')">
						+
					</view>
					<view class="text-blue margin-top">上传手持证件照</view>
				</view>
			</view>
			<view class="upload-title flex justify-between margin-tb-sm">
				<view>照片示例</view>
				<navigator url="/pages/mine/certification/picRequire">
					<view class="text-blue">查看拍照要求</view>
				</navigator>
			</view>
			<view class="pic-require">
				<image src="/static/mine/bg_zpsl.png"></image>
			</view>
		</view>
		<view class="btn margin-tb-xl">
			<navigator url="/pages/mine/certification/certificationApplication">
				<button class="text-blue margin-lr-xl">提交</button>
			</navigator>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fontImg:'/static/mine/bg_sfz.png',
				contraryImg:'',
				handIdCardImg:'/static/mine/bg_scsczjz.png'
			};
		},
		methods: {
			deleteImg(type){
				switch(type){
					case 'fontImg':
						this.fontImg ='';
						break;
					case 'contraryImg':
						this.contraryImg ='';
						break;
					case 'handIdCardImg':
						this.handIdCardImg ='';
						break;
				}
			},
			uploadImg(type){
				switch(type){
					case 'fontImg':
						this.chooseImage((address)=>{
							this.fontImg = address;
						});
						break;
					case 'contraryImg':
						this.chooseImage((address)=>{
							this.contraryImg = address;
						});
						break;
					case 'handIdCardImg':
						this.chooseImage((address)=>{
							this.handIdCardImg = address;
						});
						break;
				}
				
			},
			chooseImage(callback){
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
						let { tempFilePaths } = res;
						callback&&callback(tempFilePaths[0]);
					}
				});
			},
			previewImage(url){
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
			}
		}
	};
</script>

<style lang="less">
	.uploadIdCard{
		background-color: #f8f8f8;
		.upload-item{
			position: relative;
			width: 200upx;
			height: 200upx;
			border-radius: 16upx;
			background-color: #f8f8f8;		
			color: #999999;
		}
		.cloable{
			position: absolute;
			top:2upx;
			right:16upx;
			color: #999999;
			font-size: 40upx;
			z-index: 1;
		}
		.upload-item-not-ready{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 80upx;
			overflow: hidden;
		}
		.upload-title{
			background-color: #ffffff;
			padding: 1upx 30upx;
			display: flex;
			align-items: center;
			min-height: 106upx;
			justify-content: space-between;
			border-bottom: 1px solid #f8f8f8;
		}
		.upload-group-box{
			background-color: #ffffff;
			padding: 1upx 30upx;
			display: flex;
			align-items: center;
			min-height: 422upx;
			justify-content: space-around;
			.box{
				.upload-item-ready{
					width: 200upx;
					height: 200upx;
					border-radius: 16upx;
					background-color: #f8f8f8;		
					color: #999999;
					border:1px solid #1495ff;
					>.upload-pic-large{
						width: 100%;
						text-align: center;
						margin-top:40upx;
						image{
							width: 188upx;
							height: 144upx;
						}
					}
				}
			}
		}
		.upload-hand-pic{
			width: 100%;
			height: 314upx;
			background-color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.pic-require{
			width: 100%;
			height: 202upx;
			padding:20upx 32upx;
			background-color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				height: 136upx;
			}
		}
		.btn{
			width: 100%;
			button{
				border-radius: 38upx;
				background: rgba(0, 134, 255, 0.1);
			}
			uni-button:after{
				border: 0;
			}
		}
	}
</style>