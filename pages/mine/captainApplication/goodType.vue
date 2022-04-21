<template>
	<view class="scrool-page">
		<view class="list-cont">
			<scroll-view class="scrool-more" style="height: 100%" scroll-y="true" scroll-with-animation="true">
				<view v-for="item of goodTypes" class="list" @click="getSelectedTypes(item)">
					<view class="item">
						<text>{{item}}</text>
						<uni-icons  v-if="(selected.includes(item))" color="#0089FF" type="checkmarkempty" size="18"></uni-icons>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="footer">
			<button type="primary" @click="onFinish">完成</button>
		</view>
	</view>
</template>
<script>
	import { userService } from "@/api/index.js";
	export default {
		data() {
			return {
				goodTypes:[],
				selected:[]
			}
		},
		mounted(){
			this.queryBeGoodAtRegion();
		},
		onLoad(options){
			let  beGoodAtType = JSON.parse(options.beGoodAtType);
			if(beGoodAtType){
				if(beGoodAtType.indexOf(',') > -1){
					this.selected = beGoodAtType.split(',');
				}else{
					this.selected = [beGoodAtType];
				}
				
			}
		},
		methods: {
			getSelectedTypes(item){
				let index = this.selected.indexOf(item);
				if(index > -1){
					this.selected.splice(index,1);
					return;
				}
				this.selected.push(item);
			},
			queryBeGoodAtRegion(){
				userService.queryBeGoodAtRegion().then((res)=>{
					let data = res.data;
					if(data.success){
						let goodTypes = [];
						for(let item of data.result || []){
							goodTypes.push(item.itemText);
						}
						this.goodTypes = goodTypes;
					}
				})
			},
			onFinish(){
				uni.$emit("beGoodAtType",this.selected.join(','));
				uni.navigateBack({
					url:'/pages/mine/captainApplication/baseInfo'
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		height: 100%;
	}
	.scrool-page {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding-top:20upx;
		background-color: #F8F8F8;
		.list-cont{
			background-color: #FFFFFF;
			flex: 1;
			position: relative;
			.scrool-more {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
			}
			
			.list {
				border-bottom: 2upx solid #F8F8F8;
				.item {
					position: relative;
					display: flex;
					padding: 0 50upx;
					min-height: 104upx;
					background-color: #ffffff;
					justify-content: space-between;
					align-items: center;
					font-size: 28upx;
					color: #333333;
					.cuIcon-check{
						color:#0089FF;
						font-size: 40upx;
					}
				}
			}
		}
	}
	.footer {
		line-height: 100rpx;
		background-color: #FFFFFF;
		/* 不放大不缩小固定100rpx */
		flex: 0 0 100rpx;
		padding: 0 50upx;
		button{
			border-radius: 38upx;
			background: #0089FF;
		}
		uni-button:after{
			border: 0;
		}
	}
</style>
