<template>
	<view class="team-create-container">
		<view class="team-create-container-item" @click="changeAvatar">
			<view class="team-create-container-item-title">
				头像
			</view>
			<view class="team-create-container-item-box">
				<image class="team-create-container-item-box-avatar" @click.stop="preview(form.avatar)" :src="form.avatar" mode="aspectFit"></image>
				<uni-icons v-if="isLoader" class="team-create-container-item-box-arrow" color="#3D3D3D" type="forward"
					size="18">
				</uni-icons>
			</view>
		</view>
		<view class="team-create-container-item" @click="changeValue('teamName')">
			<view class="team-create-container-item-title">
				团队名称
			</view>
			<view class="team-create-container-item-box">
				<view class="team-create-container-item-box-1">
					{{form.teamName||'请填写团队名称'}}
				</view>
				<uni-icons v-if="isLoader" class="team-create-container-item-box-arrow" color="#3D3D3D" type="forward"
					size="18">
				</uni-icons>
			</view>
		</view>
		<view class="team-create-container-item mb20" @click="changeValue('teamIntroduce')">
			<view class="team-create-container-item-title">
				团队介绍
			</view>
			<view class="team-create-container-item-box">
				<view class="team-create-container-item-box-1">
					{{form.teamIntroduce||'请填写团队介绍'}}
				</view>
				<uni-icons v-if="isLoader" class="team-create-container-item-box-arrow" color="#3D3D3D" type="forward"
					size="18">
				</uni-icons>
			</view>
		</view>
		<view class="team-create-container-item mb20" @click="chooseRouteLine">
			<view class="team-create-container-item-title">
				徒步路线
			</view>
			<view class="team-create-container-item-box">
				<view class="team-create-container-item-box-1">
					{{teamRoute.routeName}}
				</view>
				<uni-icons v-if="isLoader" class="team-create-container-item-box-arrow" color="#3D3D3D" type="forward"
					size="18">
				</uni-icons>
			</view>
		</view>

		<view class="team-create-container-item" @click="copy(form.teamInviteCode)">
			<view class="team-create-container-item-title">
				团队邀请码
			</view>
			<view class="team-create-container-item-box">
				<view class="team-create-container-item-box-1">
					{{form.teamInviteCode}}
				</view>
				<uni-icons v-if="isLoader" class="team-create-container-item-box-arrow" color="#3D3D3D" type="forward"
					size="18">
				</uni-icons>
			</view>
		</view>

		<view class="team-create-container-item mb20" @click="showQR">
			<view class="team-create-container-item-title">
				团队二维码
			</view>
			<view class="team-create-container-item-box">
				<image class="team-create-container-item-box-qr" src="/static/chat/ic_qrcode@3x.png" mode="aspectFit">
				</image>
				<uni-icons v-if="isLoader" class="team-create-container-item-box-arrow" color="#3D3D3D" type="forward"
					size="18">
				</uni-icons>
			</view>
		</view>



		<view class="team-create-container-save" v-if="isLoader">
			<view class="team-create-container-save-btn" @click="save">
				保存
			</view>
		</view>

		<uni-popup ref="popupInvite" type="center">
			<view class="team-create-container-uni-popupInvite">
				<yz-qr :qrPath.sync="qrPath" :text="form.teamInviteCode" :size="size" :quality="quality"
					:colorDark="colorDark" :colorLight="colorLight"></yz-qr>
			</view>
		</uni-popup>
		<view class="team-create-container-image-clip">
			<image :src="url" v-if="url" mode="widthFix"></image>
			<l-clipper v-if="show" :image-url="imageUrl" @success="clipSuccess"
				@cancel="show = false" />
		</view>
		<view class="team-create-container-uni-popup">
			<uni-popup ref="popup" type="center">
				<uni-popup-dialog :title="title" mode="input" :duration="2000" :before-close="true" @close="close"
					@confirm="confirm">
					<uni-easyinput :focus="true" :clearable="false" type="textarea" v-model="value" />
				</uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';
	import {
		uploadFile
	} from "@/common/biz/common.js";
	import {
		teamService
	} from "@/api/index.js";
	export default {
		data() {
			return {

				imageUrl: '',
				show: false,
				url: '',
				
				qrPath: '',
				text: 'hello',
				size: 200,
				quality: 'L',
				colorDark: '#000000',
				colorLight: '#ffffff',

				title: '请输入',
				value: '',
				type: '',
				teamRoute: {
					routeName: '请选择路线'
				},
				form: {
					id: '',
					avatar: '',
					teamName: '',
					// 邀请码
					teamIntroduce: ''
				},
				teamList: [],
				isLoader: false
			}
		},
		onLoad(options) {
			if (options.isLoader == 'true') {
				this.isLoader = true
			}
			// console.log(options)
			teamService.queryTeam().then(res => {
				// console.log(res)
				if (res.data.success) {
					this.teamList = res.data.result
					var currentTeam = this.teamList.filter(team => team.id == options.teamId)
					console.log(currentTeam)
					this.initData(currentTeam[0])
				}
			})

		},
		onShow() {
			if (store.state.teamRoute) {
				this.teamRoute = store.state.teamRoute
			}
		},
		methods: {
			preview(url){
				if(!url)return
				uni.previewImage({
					urls: [url]
				});
			},
			initData(currentTeam) {
				this.form.id = currentTeam.id
				this.form.avatar = currentTeam.teamIcon
				this.form.teamName = currentTeam.teamName
				this.form.teamIntroduce = currentTeam.teamIntroduce
				// 邀请码
				this.form.teamInviteCode = currentTeam.teamInviteCode

				teamService.queryById({
					id: currentTeam.hikingRouteId
				}).then(res => {
					if (res.data.success) {
						this.teamRoute = res.data.result.onfootRouteInfo
					}
				})
			},
			showQR() {
				this.$refs.popupInvite.open()
			},
			chooseRouteLine() {
				if (!this.isLoader) {
					return
				}
				uni.navigateTo({
					url: '/pages/home/route?teamCreate=1',
				})
			},
			changeAvatar() {
				if (!this.isLoader) {
					return
				}
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						uni.compressImage({
						  src: res.tempFilePaths[0],
						  quality: 80,
						  success: res => {
							  this.imageUrl = res.tempFilePath
							  this.show = true							  						
						  }
						})
					}
				});
			},
			clipSuccess(e){
				console.log(e)
				uploadFile(e.url, (path) => {			
					this.form.avatar = path
					this.show = false
				});			
			},
			changeValue(type) {
				if (!this.isLoader) {
					return
				}

				this.type = type
				this.value = this.form[type]
				this.$refs.popup.open()
			},
			close() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				// ...
				this.$refs.popup.close()
			},
			confirm() {
				// 输入框的值
				console.log(this.value)
				this.form[this.type] = this.value
				// TODO 做一些其他的事情，手动执行 close 才会关闭对话框
				// ...
				this.$refs.popup.close()
			},
			save() {
				if (!this.isLoader) {
					return
				}

				if (!this.form.avatar) {
					uni.showToast({
						icon: 'error',
						title: '请选择头像',
						duration: 2000
					});
					return
				}
				if (!this.form.teamName) {
					uni.showToast({
						icon: 'error',
						title: '请填写团队名称',
						duration: 2000
					});
					return
				}
				if (!this.teamRoute.id) {
					uni.showToast({
						icon: 'error',
						title: '请选择路线',
						duration: 2000
					});
					return
				}
				if (!this.form.teamIntroduce) {
					uni.showToast({
						icon: 'error',
						title: '请填写团队介绍',
						duration: 2000
					});
					return
				}
				teamService.updateTeam({
					id: this.form.id,
					// 徒步路线
					hikingRouteId: this.teamRoute.id,
					// 团队图标
					teamIcon: this.form.avatar,
					// 团队名称
					teamName: this.form.teamName,
					// 团队介绍
					teamIntroduce: this.form.teamIntroduce
				}).then(res => {
					if (res.data.success) {
						uni.switchTab({
							url: '/pages/teamChat/teamChat'
						});
						store.state.teamRoute = null
					}
				})
			},
			copy(data) {
				uni.setClipboardData({
					data,
					success: function() {
						console.log('success');
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.team-create-container {
		height: 100vh;
		background: #F8F8F8;
		padding-top: 18rpx;
		position: relative;

		.team-create-container-uni-popup {
			background-color: pink;
		}

		.team-create-container-uni-popupInvite {
			padding: 5rpx;
			background-color: white;
		}

		.team-create-container-save {
			position: absolute;
			bottom: 15%;
			width: 100%;

			.team-create-container-save-btn {
				width: 686rpx;
				height: 100rpx;
				background: #0086FF;
				border-radius: 50px;
				text-align: center;
				margin: 0 auto;
				line-height: 100rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
		}

		.team-create-container-item+.team-create-container-item {
			border-top: 1rpx solid #F8F8F8;
		}

		.team-create-container-item.mb20 {
			margin-bottom: 20rpx;
		}

		.team-create-container-item {
			display: flex;
			background-color: white;
			justify-content: space-between;
			align-items: center;
			padding: 0 32rpx;
			height: 108rpx;

			.team-create-container-item-title {
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}

			.team-create-container-item-box {
				display: flex;
				align-items: center;

				.team-create-container-item-box-arrow {
					margin-left: 56rpx;
				}

				.team-create-container-item-box-1 {
					font-size: 28rpx;
					font-weight: 500;
					color: #000000;
				}

				.team-create-container-item-box-avatar {
					width: 56rpx;
					height: 56rpx;
					border-radius: 50%;
				}

				.team-create-container-item-box-qr {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>
