<template>
	<view class="uploadActivityInfo">
		<form @submit="onUploadActivityInfo" @reset="formReset">
			<view class="cu-list menu card-menu shadow-lg margin-top-sm">
				<view class="cu-item arrow">
					<view class="content flex">
						<text class="item">活动类型</text>
						<picker @change="bindPickerChange" :value="activityTypeIndex" :range="activityType">
							<view class="uni-input">{{activityType[activityTypeIndex]}}</view>
						</picker>
					</view>
				</view>
			</view>	
			<view class="cu-list menu card-menu shadow-lg">
				<view class="cu-item arrow">
					<view class="content flex">
						<text class="item">活动地址</text>
					</view>
				</view>
			</view>	
			<view class="cu-form-group">
				<view class="title ">活动人数</view>
				<input name="username"></input>
			</view>
			<view class="cu-list menu card-menu shadow-lg">
				<view class="cu-item arrow">
					<view class="content flex">
						<text class="item">活动时间</text>
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>	
			<view class="cu-list menu card-menu shadow-lg">
				<view class="cu-item arrow">
					<view class="content flex">
						<text class="item">活动路线</text>
					</view>
				</view>
			</view>	
			<view class="cu-list menu card-menu shadow-lg">
				<view class="cu-item arrow">
					<view class="content flex">
						<text class="item">材料提交</text>
					</view>
				</view>
			</view>	
			<view class="btn">
				<button class="text-blue margin-lr-xl">提交审核</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activityTypeIndex:0,
				activityType:['徒步','登山','雪山','沙漠','攀冰','骑行','攀岩','滑翔伞','探洞','漂流','皮划艇','速降'],
				date: this.getDate({format: true}),
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			onUploadActivityInfo(){},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="less">
.uploadActivityInfo{
	background-color:rgba(248, 248, 248, 1);
	position: relative;
	height: 100vh;
	uni-scroll-view {
	    height: calc(100% - 45px);
	}
	.cu-list.card-menu{
		margin-left: 0;
		margin-right: 0;
		border-radius: 0;
	}
	.cu-list.menu>.cu-item:last-child:after {
		border-bottom: 1upx solid #ddd;
	}
	.cu-list+.cu-list {
	    margin-top: 0px;
		&.cu-list+.cu-list:nth-last-child(2){
			margin-top: 20upx;
		}
	}
	.cu-form-group{
		min-height: 57px;
	}
	.item{
		width: 180upx;
		flex: 1;
	}
	.btn{
		width: 100%;
		position: absolute;  
		bottom: 100upx;
		button{
			border-radius: 38upx;
			background: rgba(0, 134, 255, 0.1);
		}
	}
}
</style>
