<template>
	<view class="skilled-in-container">
		<view class="skilled-in-container-header">
			<uni-search-bar class="uni-mt-10" radius="5" placeholder="地名、地名首字母" clearButton="auto"
				cancelButton="none" @confirm="search" />
		</view>
		<view class="skilled-in-container-address">
			<view class="skilled-in-container-address-des">
				目前您的位置
			</view>
			<view class="skilled-in-container-address-content">
				<view class="skilled-in-container-address-content-left">
					<image src="/static/mine/ic_position@3x.png" mode="aspectFit"></image>
					<text>永州市道县</text>
				</view>
				<view class="skilled-in-container-address-content-right">
					重新定位
				</view>
			</view>
		</view>

		<view class="skilled-in-container-country">
			<view class="skilled-in-container-country-item current">
				国内
			</view>
			<view class="skilled-in-container-country-item">
				国外
			</view>
		</view>
		<view class="list-cont">
			<scroll-view class="scrool-more" style="height: 100%" scroll-y="true" scroll-with-animation="true">
				<view class="skilled-in-container-list">
					<uni-collapse accordion @change="change">
						<uni-collapse-item :title="item.key" v-for="(item) of area" :open="isIncludeElement(item)">
							<view class="skilled-in-container-city-list">
								<view v-for="ite of item.value" class="list" @click="getSelectedTypes(ite.code)">
									<view class="item">
										<text>{{ite.name}}</text>
										<uni-icons  v-if="(selected.includes(ite.code))" color="#0089FF" type="checkmarkempty" size="18"></uni-icons>
									</view>
								</view>
							</view>
							
						</uni-collapse-item>
					</uni-collapse>
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
				area:[],
				selected:[]
			}
		},
		onLoad(options){
			let  beGoodAtRegion = JSON.parse(options.beGoodAtRegion);
			if(beGoodAtRegion){
				if(beGoodAtRegion.indexOf(',') > -1){
					this.selected = beGoodAtRegion.split(',');
				}else{
					this.selected = [beGoodAtRegion];
				}
				
			}
		},
		mounted(){
			this.queryArea();
		},
		methods: {
			change(e) {
				console.log(e);
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			},
			isIncludeElement(data){
				let flag = false;
				for(let item of data.value){
					if(this.selected.includes(item.code)){
						flag = true;
						break;
					}
				}
				return flag;
			},
			getSelectedTypes(item){
				let index = this.selected.indexOf(item);
				if(index > -1){
					this.selected.splice(index,1);
					return;
				}
				this.selected.push(item);
			},
			queryArea(){
				userService.queryArea().then((res)=>{
					let data = res.data;
					if(data.success){
						let area = [];
						for(let item of data.result || []){
							area.push({key:item.province,value:item.cities});
						}
						this.area = area;
					}
				})
			},
			onFinish(){
				uni.$emit("beGoodAtRegion",this.selected.join(','));
				uni.navigateBack({
					url:'/pages/mine/captainApplication/baseInfo'
				})
			}
		}
	}
</script>

<style lang="scss">
	.skilled-in-container {
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		height: 100vh;
		.skilled-in-container-header {}

		.skilled-in-container-address {
			.skilled-in-container-address-des {
				background-color: #F8F8F8;
				font-size: 24rpx;
				font-weight: 400;
				color: #333333;
				padding: 20rpx 32rpx;
			}

			.skilled-in-container-address-content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 24rpx 32rpx;

				.skilled-in-container-address-content-left {
					display: flex;
					align-items: center;

					image {
						width: 30rpx;
						height: 30rpx;

						margin-right: 32rpx;
					}
				}

				.skilled-in-container-address-content-right {
					font-size: 24rpx;
					font-weight: 400;
					color: #008CFF;
				}
			}
		}

		.skilled-in-container-country {
			background: #F8F8F8;
			padding: 0 32rpx;
			display: flex;
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;

			.skilled-in-container-country-item {
				padding: 20rpx 0;
				margin-right: 60rpx;
			}

			.skilled-in-container-country-item.current {
				color: #0089FF;
				border-bottom: 5rpx solid #0089FF;
			}
		}
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
				.skilled-in-container-list {
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
							.cuIcon-check{
								color:#0089FF;
								font-size: 40upx;
							}
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
	}
</style>
