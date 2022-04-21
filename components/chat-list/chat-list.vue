<template>
	<view class="list-wrap" :style="{ 'height': height}">
		<slot name="list-top"></slot>
		<scroller :style="{ 'justify-content': isScrollerFlex ? 'flex-start' : 'flex-end', direction: 'rtl'}"
			@tap="chatListClick" ref="scrollerDom" class="list" @loadmore="loadmore" :loadmoreoffset="10">
			<!-- 用于定位到底部-->
			<div ref="rowTop"></div>

			<view ref="item" class="item-wrap">
				<view v-for="(item, index) in list" :key="item.id">
					<ChatItem :isError="item.isError" @retry="retryClick(item)" :showIsRead="showIsRead"
						:isRead="item.isRead" :time="item.time" :showTime="item.showTime"
						@leftAvatarClick="leftAvatarClick(item)" @rightAvatarClick="rightAvatarClick(item)"
						:loading="item.loading" :avatar="item.avatar" :name="item.name" :right="item.right">
						<ChatText v-if="item.type === 'text'" :data="item"></ChatText>
						<ChatSound v-else-if="item.type === 'sound'" :data="item"></ChatSound>
						<ChatRedPacket @redPacketClick="redPacketClick(item)" v-else-if="item.type === 'red-packet'"
							:data="item"></ChatRedPacket>
						<ChatImage :urls="images" v-else-if="item.type === 'image'" :data="item"></ChatImage>
						<ChatVideo v-else-if="item.type === 'video'" :data="item"></ChatVideo>
					</ChatItem>
				</view>

				<view class="cell" style="direction: ltr;">
					<uni-load-more v-if="!finish" :iconSize="16" iconType="snow" status="loading"></uni-load-more>
				</view>
			</view>
		</scroller>
		<BottomInput :isSafeArea="isSafeArea" :menu="bottomMenu" :value="inputValue" @menuClick="menuClick"
			@keyboardHeightChange="keyboardHeightChange" ref="bottomInput" @sendMessage="sendMessage">
			<template v-slot:input-top>
				<slot name="input-top"></slot>
			</template>
		</BottomInput>
	</view>
</template>

<script>
	import ChatItem from './chat-item.vue'
	import ChatText from './msg-template/text.vue'
	import ChatSound from './msg-template/sound.vue'
	import ChatRedPacket from './msg-template/red-packet.vue'
	import ChatImage from './msg-template/image.vue'
	import ChatVideo from './msg-template/video.vue'
	import ChatTime from './msg-template/time.vue'
	import BottomInput from './bottom-input/bottom-input.vue'
	import moment from '@/static/js/moment/moment.js'		
	const dom = weex.requireModule('dom')

	export default {
		components: {
			ChatItem,
			ChatText,
			ChatSound,
			ChatRedPacket,
			ChatImage,
			ChatVideo,
			BottomInput,
			ChatTime
		},
		props: {
			inputValue: String,
			list: {
				type: Array,
				default: () => []
			},
			// 数据加载完毕
			finish: Boolean,
			// 底部菜单
			bottomMenu: {
				type: Array,
				default: () => []
			},
			// 是否显示已读、未读
			showIsRead: Boolean,
			// 是否使用安全安全区域
			isSafeArea: Boolean
		},
		data() {
			return {
				isScrollerFlex: false,
				images: [],
				height: 0,
			}
		},
		methods: {
			// 红包点击
			redPacketClick(item) {
				console.log("红包点击", item)
				this.$emit('redPacketClick', item)
			},
			// 消息重试
			retryClick(item) {
				console.log("消息重试", item)
				this.$emit('retryClick', item)
			},
			rightAvatarClick(item) {
				console.log("点击右头像", item)
				this.$emit('rightAvatarClick', item)
			},
			leftAvatarClick(item) {
				console.log("点击左头像", item)
				this.$emit('leftAvatarClick', item)
			},
			menuClick(item) {
				console.log("菜单点击", item)
				this.$emit('menuClick', item)
			},
			keyboardHeightChange(height) {
				setTimeout(() => {
					this.setIsScroller()

					this.scrollerBottom()
				}, 100)
			},
			getScrollerDomH() {
				return new Promise((resolve, reject) => {
					this.$nextTick(() => {
						dom.getComponentRect(this.$refs.scrollerDom, res => {
							resolve(res.size.height)
						})
					})
				})
			},
			setIsScroller() {
				this.$nextTick(async () => {
					this.scrollerDomH = await this.getScrollerDomH()

					dom.getComponentRect(this.$refs.item, res => {
						let listContentHeight = res.size.height

						this.isScrollerFlex = (listContentHeight - this.scrollerDomH) > 0
					})
				})
			},
			loadmore() {
				this.$emit('loadmore')
			},
			async scrollerBottom() {
				const el = this.$refs.rowTop

				setTimeout(() => {
					dom.scrollToElement(el, {
						offset: 0,
					})
				}, 50)
			},
			// 聊天列表点击，可以用于隐藏底部工具栏
			chatListClick() {
				console.log("chatListClick")
				this.$refs.bottomInput.closeToolsBoxAndKeyboard()
			},
			sendMessage(options) {
				this.$emit('sendMessage', options)
				this.scrollerBottom()
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res.model);
					// console.log(res.pixelRatio);
					// console.log(res.windowWidth);
					// console.log(res.windowHeight);
					// console.log(res.language);
					// console.log(res.version);
					// console.log(res.platform);
					this.height = res.windowHeight
				}
			});
		},
		watch: {
			list: {
				handler() {
					let images = []
					// 是否显示时间
					this.list.forEach((item, idx) => {
						let preTime = idx - 1 === -1 ? moment().valueOf() : this.list[idx - 1].time * 1000
						let time = item.time * 1000

						// 时间差大于2分钟，显示时间
						if (moment(preTime).diff(time, 'minutes', true) > 2) {
							this.$set(item, 'showTime', true)
						}

						if (item.type === 'image') {
							images.push(item.content)
						}
					})
					this.images = images
					this.setIsScroller()
				},
				deep: true,
				immediate: true
			}
		}
	}
</script>
<style lang="scss">
	.list-wrap {
		background-color: #EDEDED;

		.list {
			transform: rotate(180deg);
		}

		.cell {
			transform: rotate(180deg);
			padding: 5px 0;
		}
	}
</style>
