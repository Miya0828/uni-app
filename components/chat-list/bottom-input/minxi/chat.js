const recorderManager = uni.getRecorderManager(); //录音
import {
	sizeDeal
} from "../util.js"
import emoji from './emoji.js'
import {
	uploadFile
} from "@/common/biz/common.js";
export default {
	data() {
		return {
			// 语音录制相关
			voiceText: '按住 说话',
			voiceTis: "手指上滑 取消发送",
			voiceFlg: false,
			voiceStop: false,
			voiceTimer: null,
			voiceLength: 0,
			voicePageY: 0,

			// 输入框行数
			lineCount: 1,
			// 显示工具箱, 用工具箱顶起键盘
			showBoxTools: false,
			// 键盘高度
			keyboardHeight: '',
			// 当前点击的表情和工具箱的索引
			currentBoxTools: '',
			// 输入框内容
			textareaVal: '',
			// 语音录制模式和输入模式切换
			isVoice: false,
			// 表情数据
			emojiList: [],
			// 设备底部安全区域高度
			deviceBottom: 0,
		}
	},
	computed: {
		boxToolsStyles() {
			// 用工具盒子顶起输入框
			let keyboardHeight = this.keyboardHeight || '257'
			let boxHeight = this.isSafeArea ? keyboardHeight : (keyboardHeight - this.getSafeAreaInsets().deviceBottom)

			return {
				height: this.showBoxTools ? boxHeight + 'px' : 0
			}
		}
	},	
	onBackPress(){
		console.log('onBackPress')
	},
	created(info) {
		// 获取底部安全区域高度 兼容苹果X 以上机型 
		if (this.isSafeArea) {
			this.deviceBottom = this.getSafeAreaInsets().deviceBottom
		}
		// 加载表情
		this.emojiList = emoji

		this.keyboardHeightChange()
		this.onRecorderManager()
	},
	onShow() {
		console.log('onShow')
	},
	onHide() {
		console.log('onhide')		
	},
	onUnload() {},
	methods: {
		getSafeAreaInsets() {
			return plus.navigator.getSafeAreaInsets()
		},
		// 关闭输入状态
		closeToolsBoxAndKeyboard() {
			this.showBoxTools = false
			this.currentBoxTools = 0
			this.textareaBlur()
		},

		// 录音监听
		onRecorderManager() {
			// #ifdef APP-NVUE
			//录音开始
			recorderManager.onStart((e) => {
				console.log('录音开始')
			})
			// 录音报错
			recorderManager.onError((e) => {
				console.log(e)
				console.log('录音报错')
			})
			//录音结束
			recorderManager.onStop((e) => {
				console.log('录音结束')
				if (this.voiceStop) {
					uni.showToast({
						icon: "none",
						title: "取消发送"
					})
				} else {
					if (this.voiceLength < 1) {
						uni.showToast({
							icon: "none",
							title: "发送时间过短"
						})
					} else {
						let path = e.tempFilePath
						// let name = path.substr(path.lastIndexOf('/') + 1);
						
						console.log(parseInt(this.voiceLength))
						console.log(path)
						
						uploadFile(path, (_path) => {							 
							 this.addMsg({
							 	type: 'sound',
							 	content: _path,
							 	length: parseInt(this.voiceLength)
							 })
							 this.$nextTick(() => {
							 	this.voiceLength = 0
							 })
						});
						
					}
				}
			})
			// #endif
		},
		// 键盘监听
		keyboardHeightChange() {			
			uni.onKeyboardHeightChange(res => {
				this.$emit('keyboardHeightChange', res.height)
				if (res.height) {
					this.keyboardHeight = res.height
					this.showBoxTools = true
				} else {
					this.textareaBlur()
					if (!this.currentBoxTools) {
						this.showBoxTools = false
					}
				}
			})
		},
		// 检测语音时间
		isVoiceTime() {
			if (this.voiceLength < 1) {
				uni.showToast({
					icon: "none",
					title: "发送时间过短"
				})
			} else {
				this.voiceLength = 0
			}
		},
		// 按下触发
		touchstartVoice(e) {
			this.voicePageY = (e.changedTouches[0].pageY).toFixed(2)
			this.voiceText = '松开 结束'
			this.voiceFlg = true
			recorderManager.start({
				format: "mp3"
			}); //录音开始,
			this.voiceTimer = setInterval(() => {
				this.voiceLength += 0.1
			}, 100)
			console.log('touchstartVoice', this.voicePageY)
		},
		// 滑动触发
		touchmoveVoice(e) {
			let numTemp = this.voicePageY - ((e.changedTouches[0].pageY).toFixed(2))
			if (numTemp >= 60) {
				// console.log('取消发送')
				this.voiceStop = true
				this.voiceTis = "松开手指 取消发送"
			} else {
				// console.log('继续发送')
				this.voiceStop = false
				this.voiceTis = "手指上滑 取消发送"
			}
		},
		// 松开触发
		touchendVoice() {
			this.voiceFlg = false
			this.voiceText = '按住 说话'
			this.voiceTis = "手指上滑 取消发送"
			console.log('touchendVoice')
			console.log(this.voiceStop)
			clearInterval(this.voiceTimer);
			this.voiceTimer = null

			recorderManager.stop(); //录音结束
		},
		// 打断触发
		touchcancelVoice() {
			clearInterval(this.voiceTimer);
			this.voiceTimer = null
			this.voiceFlg = false
			this.voiceText = '按住 说话'
			this.voiceTis = "手指上滑 取消发送"
			console.log('touchcancelVoice')
			recorderManager.stop(); //录音结束
		},
		// 点击工具
		toolItem(item, index) {
			this.$emit('menuClick', item)
			console.log(item, index)
			switch (item.type) {
				case 0:
					console.log('相册')
					this.getChooseImage()
					break;
				case 1:
					console.log('拍摄')
					// this.getChooseImage(['camera'])
					this.getChooseVideo()
					break;
					// case 2:
					// 	console.log('视频')
					// 	this.getChooseVideo()
					// 	break;
				default:
			}
		},
		getChooseVideo(type) {			

			uni.chooseVideo({
				sourceType: ['camera', 'album'],
				compressed: true,
				success: (res) => {
					console.log(res)
					
					uploadFile(res.tempFilePath, (_path) => {						
						 this.addMsg({
						 	type: 'video',
						 	content: _path,
						 	length: res.duration
						 })
					});
					this.showBoxTools = false
				},
				fail(err) {
					console.log(err)
				}
			});
		},
		//调起相册或拍摄
		getChooseImage() {

			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: (res) => {
					console.log(res)
					uploadFile(res.tempFilePaths[0], (_path) => {
						 this.addMsg({
						 	type: 'image',
						 	content: _path
						 })
					});
					
					this.showBoxTools = false
				},
				fail(err) {
					console.log(err)
				}
			});
		},
		texTlinechange(e) {
			// 获取行高
			this.lineCount = e.detail.lineCount
		},
		// 添加表情
		setEmoj(item, index) {
			this.textareaVal += item
		},
		// 点击发送按钮
		clickMsg() {
			let val = this.textareaVal

			if (val.trim() == '') {
				uni.showToast({
					icon: 'none',
					title: "消息不能为空"
				})
			} else {
				this.textareaVal = ''
				this.$nextTick(() => {
					this.addMsg({
						type: 'text',
						content: val
					})
				})
			}
		},
		// 添加消息
		addMsg({
			type,
			content,
			length = ''
		}) {
			this.$emit('sendMessage', {
				type,
				content,
				length
			})
						
		},
		// 切换语音录制模式
		clickVoice() {
			let isVoice = !this.isVoice

			if (isVoice) {
				this.closeToolsBoxAndKeyboard()
			} else {
				this.textareaFocus()
			}

			setTimeout(() => {
				this.isVoice = isVoice
			}, 50)
		},
		// 点击工具栏
		clickEmoj(i) {
			this.showBoxTools = true
			this.currentBoxTools = i
			if (this.keyboardHeight) {
				this.textareaBlur()
			}
			// 点击表情和工具栏，隐藏录音模式
			this.isVoice = false
		},
		// 输入框主动获焦
		textareaFocus() {
			setTimeout(() => {
				this.$refs.textareaRef && this.$refs.textareaRef.focus()
			}, 100)
		},
		// 失去焦点触发
		textareaBlur() {
			this.$refs.textareaRef && this.$refs.textareaRef.blur()
						
		},
		keyboardInput() {
			console.log(222)
		},
	}
};
