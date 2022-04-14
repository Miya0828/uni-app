<template>
	<view class="team-create-container">
		<view class="team-create-container-item">
			<view class="team-create-container-item-title">
				头像
			</view>
			<view class="team-create-container-item-box">
				<image src="/static/logo.png" mode="aspectFit"></image>
				<uni-icons class="team-create-container-item-box-arrow" color="#3D3D3D" type="forward" size="18">
				</uni-icons>
			</view>
		</view>
		<view class="team-create-container-item mb20" @click="changeValue('teamName')">
			<view class="team-create-container-item-title">
				团队名称
			</view>
			<view class="team-create-container-item-box">
				<view class="team-create-container-item-box-1">
					{{form.teamName}}
				</view>
				<uni-icons class="team-create-container-item-box-arrow" color="#3D3D3D" type="forward" size="18">
				</uni-icons>
			</view>
		</view>

		<view class="team-create-container-item mb20" @click="changeValue('routeName')">
			<view class="team-create-container-item-title">
				徒步路线
			</view>
			<view class="team-create-container-item-box">
				<view class="team-create-container-item-box-1">
					{{form.routeName}}
				</view>
				<uni-icons class="team-create-container-item-box-arrow" color="#3D3D3D" type="forward" size="18">
				</uni-icons>
			</view>
		</view>

		<view class="team-create-container-item" @click="copy(form.teamInvitationCode)">
			<view class="team-create-container-item-title">
				团队邀请码
			</view>
			<view class="team-create-container-item-box">
				<view class="team-create-container-item-box-1">
					{{form.teamInvitationCode}}
				</view>
				<uni-icons class="team-create-container-item-box-arrow" color="#3D3D3D" type="forward" size="18">
				</uni-icons>
			</view>
		</view>

		<view class="team-create-container-item mb20">
			<view class="team-create-container-item-title">
				团队二维码
			</view>
			<view class="team-create-container-item-box">
				<image src="/static/logo.png" mode="aspectFit"></image>
				<uni-icons class="team-create-container-item-box-arrow" color="#3D3D3D" type="forward" size="18">
				</uni-icons>
			</view>
		</view>

		<view class="team-create-container-item" @click="changeValue('teamIntroduce')">
			<view class="team-create-container-item-title">
				团队介绍
			</view>
			<view class="team-create-container-item-box">
				<view class="team-create-container-item-box-1">
					{{form.teamIntroduce}}
				</view>
				<uni-icons class="team-create-container-item-box-arrow" color="#3D3D3D" type="forward" size="18">
				</uni-icons>
			</view>
		</view>

		<view class="team-create-container-save">
			<view class="team-create-container-save-btn">
				保存
			</view>
		</view>

		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog :title="title" :value='value' mode="input" message="成功消息" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '请修改',
				value: '',
				type: '',
				form: {
					avatar: '',
					teamName: '请填写团队名称',
					routeName: '请填写路线名称',
					teamInvitationCode: '123456',
					teamQRcode: '',
					teamIntroduce: '请填写团队介绍'
				}
			}
		},
		methods: {
			changeValue(type) {
				console.log(type)
				this.type = type
				this.value = this.form[type]
				this.$refs.popup.open()
			},
			close() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				// ...
				this.$refs.popup.close()
			},
			confirm(value) {
				// 输入框的值
				console.log(value)
				this.form[this.type] = value
				// TODO 做一些其他的事情，手动执行 close 才会关闭对话框
				// ...
				this.$refs.popup.close()
			},
			copy(data){
				uni.setClipboardData({
					data,
					success: function () {
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

		.team-create-container-save {
			position: absolute;
			bottom: 8%;
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

				image {
					width: 56rpx;
					height: 56rpx;
					border-radius: 50%;
				}
			}
		}
	}
</style>
