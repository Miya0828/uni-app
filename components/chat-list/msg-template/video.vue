<template>
	<view class="chat-video-wrap">
		<image class="chat-video" mode="aspectFit" :src="data.cover"></image>

		<image v-if="downProgress==0" class="video-play-icon" src="@/static/img/chat/play.png" mode="aspectFit"
			@click="imageClick"></image>
		<text v-else class="video-tip-text">下载中{{downProgress}}%</text>

		<view class="mask">
			<!-- <view class="mask-progress" :style="{ 'height': downProgress}">
			</view> -->
			<text class="mask-text">{{data.duration}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: () => {}
			},
		},
		data() {
			return {
				downProgress: 0
			}
		},
		mounted() {
			// console.log(this.downProgress)
		},
		methods: {
			toVideoPlayer() {
				let win = uni.getSubNVueById('video-player')
				win.show('slide-in-bottom', 200, () => {
					uni.$emit('chat-video-player', this.data)
				})
				this.downProgress = 0
			},
			imageClick() {

				console.log(this.data.content)
				if (this.data.content.includes('doc/uniapp_save/')) {
					this.toVideoPlayer()
					return
				} else {

					const savedFilePath = uni.getStorageSync(this.data.content);
					if (savedFilePath) {
						console.log(savedFilePath)
						this.data.content = savedFilePath
						this.toVideoPlayer()
						return
					}
				}				
				const downloadTask = uni.downloadFile({
					url: this.data.content,
					fail() {
						uni.showToast({
							icon: 'none',
							title: '网络异常'
						})
					},
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
							console.log(res)

							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success: (res) => {
									var savedFilePath = res.savedFilePath;
									console.log('保存地址', savedFilePath)

									uni.setStorage({
										key: this.data.content,
										data: savedFilePath,
									});
									this.data.content = savedFilePath

									this.toVideoPlayer()
								}
							});
						}
					}
				});
				console.log('downloadTask')
				console.log(downloadTask)
				this.downProgress = 1
				downloadTask.onProgressUpdate((res) => {
					this.downProgress = res.progress
					// console.log('下载进度' + res.progress);
					// console.log('已经下载的数据长度' + res.totalBytesWritten);
					// console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				});
			},
		}
	}
</script>




<style lang="scss">
	.chat-video-wrap {
		position: relative;
		height: 240px;
		width: 160px;

		.video-tip-text {
			position: absolute;
			top: 100px;
			width: 160px;
			text-align: center;
			font-size: 18px;
			font-weight: 200;
			color: white;
		}

		.chat-video {
			height: 240px;
			width: 160px;
			border-radius: 8px;
		}

		.mask {
			position: absolute;
			border-radius: 8px;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			background-color: rgba($color: #000000, $alpha: 0.3);

			.mask-progress {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 240px;
				background-color: rgba($color: #000000, $alpha: 0.7);
				height: 100px;
			}

			.mask-text {
				position: absolute;
				right: 8px;
				bottom: 5px;
				font-size: 12px;
				font-weight: 200;
				color: rgba(255, 255, 255, 0.8);
			}
		}


		.video-play-icon {
			position: absolute;
			width: 32px;
			height: 32px;
			top: 96px;
			left: 64px;
			z-index: 100;
		}
	}
</style>
