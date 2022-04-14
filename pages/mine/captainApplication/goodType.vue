<template>
	<view class="scrool-page">
		<view class="list-cont">
			<scroll-view class="scrool-more" style="height: 100%" scroll-y="true" scroll-with-animation="true">
				<view v-for="item of goodTypes" class="list" @click="getSelectedTypes(item)">
					<view class="item">
						<text>{{item}}</text>
						<text v-if="(selected.includes(item))" class="cuIcon-check text-blue"></text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="footer">
			<button type="primary">完成</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				goodTypes:['皮划艇','徒步','登山','雪山','沙漠','皮划艇','徒步','登山','雪山','沙漠','皮划艇','徒步','登山','雪山','沙漠','皮划艇','徒步','登山','雪山','沙漠','皮划艇','徒步','登山','雪山','沙漠','皮划艇','徒步','登山','雪山','沙漠'
				],
				selected:[]
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
