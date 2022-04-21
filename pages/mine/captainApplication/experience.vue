<template>
	<view class="experience">
		<view class="box">
			<textarea placeholder="请填写领队经验说明（附上至少一条活动链接，限500字内"  value="teamLeaderExp"  v-model="teamLeaderExp" @input="onInput"/>
		</view>
		<view class="btn">
			<button class="text-blue margin-lr-xl" @click="onFinish">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teamLeaderExp:''
			}
		},
		onLoad(options){
			this.teamLeaderExp = JSON.parse(options.teamLeaderExp);
		},
		methods: {
			onInput(event){
				this.teamLeaderExp = event.detail.value;
			},
			onFinish(){
				uni.$emit("teamLeaderExp",this.teamLeaderExp);
				uni.navigateBack({
					url:'/pages/mine/captainApplication/ability'
				})
			}
		}
	}
</script>

<style lang="less">
.experience{
	width: 100%;
	height: 100vh;
	position: relative;
	.box{
		height: 100%;
		padding:0 40upx;
		uni-textarea{
			width: 100%;
			height: calc(100% - 380upx);
			background-color: #F8F8F8;
			padding: 40upx;
			.uni-textarea-textarea{
				width: 100%;
				padding: 10upx;
			}
		}
	}
	.btn{
		width: 100%;
		position: absolute;  
		bottom: 100upx;
		button{
			border-radius: 38upx;
			background: rgba(0, 134, 255, 0.1);
		}
		uni-button:after{
			border: 0;
		}
	}
}
</style>
