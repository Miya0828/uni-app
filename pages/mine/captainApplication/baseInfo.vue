<template>
	<view class="baseInfo">
		<form @submit="onAuth">
			<uniStep :list="stepList" :step="2"></uniStep>
			<view>
				<view class="baseInfo-group">
					<view class="title">工作单位</view>
					<input placeholder="请输入工作单位" v-model="userInfo.workUnit" name="workUnit"></input>
				</view>
				<view class="baseInfo-group" @click="onFinishPersonIntroduce">
						<text class="item title">个人介绍</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
				</view>
				<view class="baseInfo-group baseInfo-group-skill" @click="onFinishSkilledIn">
						<text class="item title">擅长区域</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
				</view>
				<view class="baseInfo-group baseInfo-group-area" @click="onFinishGoodType()">
						<text class="item title">擅长类型</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
				</view>
				<view class="baseInfo-tips">
					<text class="baseInfo-tips-flag">*</text>
					 擅长区域和擅长类型决定可领活动的范围
				</view>
			</view>
			<view class="btn">
				<button form-type="submit">下一步</button>
			</view>
		</form>
	</view>
</template>

<script>
	import uniStep from "@/components/uni-step/uni-step.vue";
	export default {
		components: {
			uniStep: uniStep
		},
		data() {
			return {
				userInfo:{
					workUnit:'', //工作单位
					personalIntroduction:'',  //个人介绍
					beGoodAtRegion:'',//擅长区域
					beGoodAtType:'',  //擅长类型
				},
				stepList:['身份信息','基本资料','能力说明']
			}
		},
		onLoad(){
			uni.$once("personalIntroduction",data=>{
				this.userInfo.personalIntroduction = data;
			});
			uni.$once("beGoodAtRegion",data=>{
				this.userInfo.beGoodAtRegion = data;
				console.log(this.userInfo.beGoodAtRegion);
			});
			uni.$once("beGoodAtType",data=>{
				this.userInfo.beGoodAtType = data;
				console.log(this.userInfo.beGoodAtType);
			});
		},
		methods: {
			onFinishPersonIntroduce(){
				let { personalIntroduction } = this.userInfo;
				uni.navigateTo({
					url:"/pages/mine/captainApplication/personInfo?personalIntroduction="+personalIntroduction
				});
			},
			onFinishSkilledIn(){
				let { beGoodAtRegion } = this.userInfo;
				uni.navigateTo({
					url:"/pages/mine/captainApplication/skilledIn?beGoodAtRegion="+JSON.stringify(beGoodAtRegion)
				});
			},
			onFinishGoodType(){
				console.log(this.userInfo);
				let { beGoodAtType } = this.userInfo;
				uni.navigateTo({
					url:"/pages/mine/captainApplication/goodType?beGoodAtType="+JSON.stringify(beGoodAtType)
				});
			},
			onAuth(e){
				//进行表单检查
				var formData = e.detail.value;
				//定义表单规则
				var rule = [
					{name:"workUnit", checkType : "notnull", checkRule:"",  errorMsg:"请输入工作单位"},
					{name:"beGoodAtRegion", checkType : "notnull", checkRule:"",  errorMsg:"请选择擅长区域"},
					{name:"beGoodAtType", checkType : "notnull", checkRule:"",  errorMsg:"请选择擅长技能"},
				];
				var checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				uni.navigateTo({
					url:"/pages/mine/captainApplication/ability"
				})
			}
		}
	}
</script>

<style lang="less">
.baseInfo{
	background-color:rgba(248, 248, 248, 1);
	height: 100vh;
	position: relative;
	.baseInfo-group {
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 120upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
		justify-content: space-between;
		.baseInfo-group-item{
			margin-bottom: 20upx;
		}
		.title {
			text-align: justify;
			width: 180upx;
			padding-right: 30upx;
			font-size: 30upx;
			position: relative;
			height: 60upx;
			line-height: 60upx;
		}
		input {
			flex: 1;
			font-size: 30upx;
			color: #555;
			padding-right: 20upx;
		}
		&.baseInfo-group-skill{
			margin-bottom: 0;
		}
		&.baseInfo-group-area{
			margin-top: 0;
		}
	}
	
	.baseInfo-group+.baseInfo-group {
		border-top: 1upx solid #eee;
	}
	.baseInfo-tips{
		color:#999999;
		padding: 30upx;
		.baseInfo-tips-flag{
			color:#F90000;
			padding-right:10upx;
		}
	}
	.btn{
		width: 100%;
		position: absolute;  
		bottom: 100upx;
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
