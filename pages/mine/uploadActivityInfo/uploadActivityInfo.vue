<template>
	<view class="uploadActivityInfo">
		<view class="upload-activity-info-group">
			<text class="item title">活动类型</text>
			<picker @change="bindPickerChange" :value="activityTypeIndex" :range="activityType">
				<view class="uni-input">{{activityType[activityTypeIndex]}}</view>
			</picker>
			<uni-icons color="#3D3D3D" type="forward" size="18">
			</uni-icons>
		</view>
		<view class="upload-activity-info-group" @click="onChange('address')">
			<text class="item title">活动地址</text>
			<view></view>
			<uni-icons color="#3D3D3D" type="forward" size="18">
			</uni-icons>
		</view>
		<view class="upload-activity-info-group" @click="onChange('personNum')">
			<text class="item title">活动人数</text>
			<view></view>
			<uni-icons color="#3D3D3D" type="forward" size="18">
			</uni-icons>
		</view>
		<view class="upload-activity-info-group upload-activity-info-group-flex">
			<text class="item title">活动时间</text>
			<picker mode="date" :value="date" @change="bindDateChange">
				<view class="upload-activity-info-group-item" >
					<view class="uni-input">{{date==0?'':date}}</view>
					<image src="/static/register/ic_date.png"></image>
				</view>
			</picker>
		</view>
		<view class="upload-activity-info-group" @click="onChange('router')">
			<text class="item title">活动路线</text>
			<view></view>
			<uni-icons color="#3D3D3D" type="forward" size="18">
			</uni-icons>
		</view>
		<view class="upload-activity-info-group" @click="onChange('file')">
			<text class="item title">材料提交</text>
			<view></view>
			<uni-icons color="#3D3D3D" type="forward" size="18">
			</uni-icons>
		</view>
		<view class="team-create-container-uni-popup">
			<uni-popup ref="popup" type="center">
				<uni-popup-dialog :title="title" mode="input" :duration="2000" :before-close="true" @close="onClose"
					@confirm="confirm">
					<uni-easyinput :focus="true" :clearable="false" type="textarea" v-model="value" />
				</uni-popup-dialog>
			</uni-popup>
		</view>
		<view class="btn">
			<button @click="onUploadActivityInfo">提交审核</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activityTypeIndex:0,
				activityType:['徒步','登山','雪山','沙漠','攀冰','骑行','攀岩','滑翔伞','探洞','漂流','皮划艇','速降'],
				title: '请输入',
				value:'',
				type: '',
				activityInfo:{
					activityAttr:'',
					address:'',
					personNum:'',
					activityDate:this.getDate({format: true}),
					router:'',
					file:'',
				}
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
			onChange(type){
				this.type = type;
				this.value = this.activityInfo[type];
				this.$refs.popup.open();
			},
			onClose(){
				this.$refs.popup.close();
			},
			confirm(){
				this.activityInfo[this.type]=this.value;
				this.$refs.popup.close();
			},
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
	height: 100vh;
	position: relative;
	.upload-activity-info-group {
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 120upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
		justify-content: space-between;
		&.upload-activity-info-group-flex{
			display: flex;
			justify-content: space-between;
		}
		.upload-activity-info-group-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.title {
			flex: 1;
			text-align: justify;
			padding-right: 30upx;
			font-size: 28upx;
			position: relative;
			height: 60upx;
			line-height: 60upx;
			color: #333333;
		}
		uni-image{
		    width: 40upx;
		    height: 40upx;
		}
	}
	
	.upload-activity-info+.upload-activity-info {
		border-top: 1upx solid #eee;
	}
	.btn{
		width: 100%;
		position: absolute;  
		bottom: 100upx;
		font-size: 32upx;
		button{
			color:#0089FF;
			margin-left: 50upx;
			margin-right: 50upx;
			border-radius: 38upx;
			background: rgba(0, 134, 255, 0.1);
		}
		uni-button:after{
			border: 0;
		}
	}
}
</style>
