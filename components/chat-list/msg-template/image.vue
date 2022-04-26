<template>
	<image class="chat-image" mode="aspectFill" @click="imageClick" :src="data.content"></image>
</template>

<script>
	export default {
		props: {
			data: String,
			urls: {
				type: Array,
				default: () => []
			}
		},
		mounted() {


			if (this.data.content.includes('_doc/uniapp_save/')) {				
				return
			} else {

				const savedFilePath = uni.getStorageSync(this.data.content);
				if (savedFilePath) {

					this.data.content = savedFilePath					
					return
				}
			}
			const downloadTask = uni.downloadFile({
				url: this.data.content,
				// fail() {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '网络异常'
				// 	})
				// },
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
		methods: {
			imageClick() {
				uni.previewImage({
					current: this.getIdx(),
					urls: this.urls.length ? this.urls : [this.data.content]
				});
			},
			getIdx() {
				return this.urls.findIndex(url => url === this.data.content) || 0
			}
		}
	}
</script>

<style lang="scss">
	.chat-image {
		height: 240px;
		width: 160px;
		border-radius: 8px;
	}
</style>
