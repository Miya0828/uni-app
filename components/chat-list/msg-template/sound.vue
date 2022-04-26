<template>
	<view :class="classes" @click="imageClick">
		<image class="icon" :src="'/static/img/chat/audio'+(index%3)+'.png'"></image>

		<text class="duration">{{ data.duration }}〃</text>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext(); //音频
	innerAudioContext.volume = 1
	export default {
		props: {
			data: {
				type: Object,
				default: () => {}
			},
			right: Boolean
		},
		data() {
			return {
				timer: null,
				timer2: null,
				index: 2,
			}
		},
		computed: {
			classes() {
				return ['chat-sound-wrap', {
					'chat-sound-right-wrap': this.data.right
				}]
			}
		},
		methods: {
			imageClick() {

				console.log(this.data.content)

				if (this.data.content.includes('doc/uniapp_save/')) {
					this.payAudio()
					return
				} else {

					const savedFilePath = uni.getStorageSync(this.data.content);
					if (savedFilePath) {

						this.data.content = savedFilePath
						this.payAudio()
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

									this.payAudio()
								}
							});
						}
					}
				});
				console.log('downloadTask')
				console.log(downloadTask)
				downloadTask.onProgressUpdate((res) => {
					this.downProgress = res.progress
					// console.log('下载进度' + res.progress);
					// console.log('已经下载的数据长度' + res.totalBytesWritten);
					// console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				});
			},

			payAudio() {
				innerAudioContext.stop()
				
				innerAudioContext.src = this.data.content
				console.log(innerAudioContext.src)
				clearTimeout(this.timer)

				this.$nextTick(() => {
					innerAudioContext.play();
					this.timer2 = setInterval(() => {
						this.index++
						// console.log(this.index)
						console.log(this.index % 3)
					}, 500)
					this.timer = setTimeout(() => {
						clearInterval(this.timer2)
						setTimeout(() => {
							this.index = 2
						})
						innerAudioContext.stop()
					}, this.data.duration * 1000 + 500)
				});
			},
		}
	}
</script>

<style lang="scss">
	.chat-sound-wrap {
		position: relative;
		height: 40px;
		background-color: white;
		width: 80px;
		border-radius: 8px;
		justify-content: flex-start;
		flex-direction: row;
		align-items: center;

		.duration {
			font-size: 14px;
			margin-left: 6px;
		}

		.icon {
			width: 18px;
			height: 18px;
			margin-left: 10px;
		}

		&.chat-sound-right-wrap {
			background-color: #AAEA7A;

			.icon {
				width: 18px;
				height: 18px;
				margin-right: 10px;
				transform: rotate(-110edg);
			}
		}
	}
</style>
