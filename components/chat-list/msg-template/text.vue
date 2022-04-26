<template>
	<view :class="classes">
		<!-- <rich-text  class="chat-text" :nodes="content" style="max-width: 225px"></rich-text> -->
		<text @longpress="longpress" class="chat-text">{{data.content}}</text>
	</view>
</template>

<script>
	import parseHtml from './parseHtml.js'

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
				parseHtml,
			}
		},
		methods: {
			longpress() {

				uni.setClipboardData({
					data: this.data.content,
					success: function() {
						uni.showToast({
							title: '复制成功'
						})
					}
				});
			}
		},
		computed: {
			classes() {
				return ['chat-text-wrap', {
					'chat-text-right-wrap': this.data.right
				}]
			},
			content() {
				// root节点为div时, 内容会多占一空行, 移除掉div
				let arr = this.parseHtml(this.data.content)
				if (arr.length && arr[0].name === 'div') {
					let children = JSON.parse(JSON.stringify(arr[0].children))

					arr = arr.slice(1)
					arr.unshift(...children)
				}

				return arr
			}
		}
	}
</script>

<style lang="scss">
	.chat-text-wrap {
		padding: 20rpx 24rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 8px;

		.chat-text {
			color: rgba(51, 51, 51, 100);
			font-size: 32rpx;
		}

		&.chat-text-right-wrap {
			background-color: #AAEA7A;
			direction: ltr;

			.chat-text {
				color: #000000;
				text-align: left;
				background-color: rgba($color: #000000, $alpha: 0);
			}
		}
	}
</style>
