<template>
	<view class="chat-video-wrap">
		<image class="chat-video" mode="aspectFit" @click="imageClick" :src="data.cover"></image>
		<view class="mask">
			<text class="mask-text">{{data.duration}}</text>
		</view>
		<image class="video-play-icon" src="@/static/img/chat/play.png" mode="aspectFit" @click="imageClick"></image>
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
		methods: {
			imageClick() {
				let win = uni.getSubNVueById('video-player')

				win.show('slide-in-bottom', 200, () => {
					uni.$emit('chat-video-player', this.data)
				})
			},			
		}
	}
</script>




<style lang="scss">
	.video {
		position: absolute;
		height: 240px;
		width: 160px;
		background-color: pink;
		z-index: 9999;
	}

	.chat-video-wrap {
		position: relative;
		height: 240px;
		width: 160px;

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
			width: 32px;
			height: 32px;
			position: absolute;
			top: 96px;
			left: 64px;
			z-index: 2;
		}
	}
</style>
