<template>
	<view class="uni-step">
		<view class="uni-step-item" v-for="(item,index) in list" :key="index">
			<view v-if="step > index" class="uni-step-item-child active">
				<uni-icons color="#0089FF" size="18" type="checkbox-filled"></uni-icons>
				<text class="name">{{item}}</text>
				<view class="ellipse" v-if="index != list.length-1">·········</view>
			</view>
			<view v-if="step == index" class="uni-step-item-child active">
				<view class="number">{{index + 1}}</view>
				<text class="name">{{item}}</text>
				<view class="ellipse" v-if="index != list.length-1">·········</view>
			</view>
			<view v-if="step < index" class="uni-step-item-child">
				<view class="number">{{index + 1}}</view>
				<text class="name">{{item}}</text>
				<view class="ellipse" v-if="index != list.length-1">·········</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props:{
			list:{
				type:Array,
				default:[]
			},
			step:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				
			};
		},
		
	};
</script>

<style>
	page{
		width: 100%;
	}
	.uni-step{ 
		width:100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30upx 0;
		background-color: #FFFFFF;
	 }
	.uni-step .uni-step-item-child{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.uni-step .uni-step-item-child.active{
		color:#0089FF;
	}
	.uni-step .uni-step-item-child .ellipse{
		padding: 0 20upx;
		line-height: 34upx;
	}
	.uni-step .uni-step-item-child .number{
		width: 32upx;
		height: 32upx;
		font-size: 24upx;
		border-radius: 50%;
		text-align: center;
		color:#333333;
		border:2upx solid #333333;
	}
	.uni-step .uni-step-item-child.active .number{
		border:2upx solid #0089FF;
		color:#0089FF;
	}
	.uni-step .uni-step-item-child .name{
		margin-left: 8upx;
	}
</style>