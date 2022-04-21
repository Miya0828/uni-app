<template>
	<view class="personInfo">
		<view class="grid"></view>
		<view class="box">
			<view class="box-item">
				<!-- <uni-section title="多行文本" subTitle="指定属性 type=textarea 使用多行文本框" type="line" padding>
							<uni-easyinput type="textarea" v-model="value" placeholder="请输入内容"></uni-easyinput>
						</uni-section> -->
				<textarea placeholder="请输入个人介绍" maxlength="500" value="personalIntroduction"  v-model="personalIntroduction" @input="onInput" />
				<view class="tips">{{this.personalIntroduction.length}}/500</view>
			</view>
		</view>
		<view class="grid"></view>
		<view class="btn">
			<button @click="onFinish">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				personalIntroduction:''
			}
		},
		onLoad(options){
			this.personalIntroduction = options.personalIntroduction;
		},
		methods: {
			onInput(event){
				this.personalIntroduction = event.detail.value;
			},
			onFinish(){
				uni.$emit("personalIntroduction",this.personalIntroduction);
				uni.navigateBack({
					url:'/pages/mine/captainApplication/baseInfo'
				})
			}
		}
	}
</script>

<style lang="less">
.personInfo{
	height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
	.grid{
		width: 100%;
		height: 20upx;
		background-color: #F8F8F8;
	}
	.box{
		flex: 1;
		padding:4%;
		.box-item{
			width: 100%;
			height: 100%;
			position: relative;
			textarea{
				width: 92%;
				padding: 4%;
				height: 94%;
				font-size: 28upx;
				color:#333333;
				background: #F8F8F8;
				border-radius: 8px;
			}
			.tips{
				position: absolute;
				bottom: 4%;
				right:6%;
				color: #999999;
			}
		}
	}
	.btn{
		height: 130upx;
		line-height: 130upx;
		padding:0 40upx;
		box-shadow: 0px -1px 2px 0px rgba(209, 209, 209, 0.5);
		button{
			border-radius: 38upx;
			margin-top:20upx;
			background: rgba(0, 134, 255, 0.1);
			color:#0089FF;
		}
		uni-button:after{
			border: 0;
		}
	}
}
</style>
