<template>
	<view class="baseInfo">
		<form @submit="onAuth">
			<uniStep :list="stepList" :step="1"></uniStep>
			<view>
				<view class="baseInfo-group">
					<view class="title">工作单位</view>
					<input placeholder="请输入工作单位" v-model="userInfo.workUnit" name="workUnit"></input>
				</view>
				<view class="baseInfo-group" @click="onFinishPersonIntroduce">
						<text class="item title">个人介绍</text>
						<view class="content" v-if="userInfo.personalIntroduction">{{this.cutString(userInfo.personalIntroduction,15)}}</view>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
				</view>
				<view class="baseInfo-group baseInfo-group-skill" @click="onFinishSkilledIn">
						<text class="item title">擅长区域</text>
						<view class="content" v-if="userInfo.beGoodAtRegion">{{this.cutString(userInfo.beGoodAtRegion,15)}}</view>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
				</view>
				<view class="baseInfo-group baseInfo-group-area" @click="onFinishGoodType()">
						<text class="item title">擅长类型</text>
						<view class="content" v-if="userInfo.beGoodAtType">{{this.cutString(userInfo.beGoodAtType,15)}}</view>
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
	import graceChecker from '@/common/biz/graceChecker.js';
	import { userService } from "@/api/index.js";
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
				stepList:['基本资料','能力说明']
			}
		},
		mounted(){
			this.queryTeamLeader();
		},
		onLoad(){
			uni.$on("personalIntroduction",data=>{
				this.userInfo.personalIntroduction = data;
			});
			uni.$on("beGoodAtRegion",data=>{
				this.userInfo.beGoodAtRegion = data;
			});
			uni.$on("beGoodAtType",data=>{
				this.userInfo.beGoodAtType = data;
			});
		},
		methods: {
			cutString(text, numSub){
				 if(text == null){
					return "";
				 }
				 if(text.length > numSub){
					return text.substring(0, numSub - 1) + "...";
				 }
				 return text;
			},
			queryTeamLeader(){
				userService.queryTeamLeader().then((res)=>{
					let data = res.data;
					if(data.success){
						let { 
							workUnit,
							personalIntroduction,
							beGoodAtRegion,
							beGoodAtType,
							guideCertificatesNumber,
							guideCertificates,
							teamLeaderCertificates,
							teamLeaderExp 
						} = data.result || {};
						this.userInfo = Object.assign({},{
							workUnit,
							personalIntroduction,
							beGoodAtRegion,
							beGoodAtType,
							guideCertificatesNumber,
							guideCertificates,
							teamLeaderCertificates,
							teamLeaderExp
						})
					}
				})
			},
			onFinishPersonIntroduce(){
				let { personalIntroduction = '' } = this.userInfo;
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
				//定义表单规则
				var rule = [
					{name:"workUnit", checkType : "notnull", checkRule:"",  errorMsg:"请输入工作单位"},
					{name:"beGoodAtRegion", checkType : "notnull", checkRule:"",  errorMsg:"请选择擅长区域"},
					{name:"beGoodAtType", checkType : "notnull", checkRule:"",  errorMsg:"请选择擅长技能"},
				];
				var checkRes = graceChecker.check(this.userInfo, rule);
				if(!checkRes){
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				uni.navigateTo({
					url:"/pages/mine/captainApplication/ability?teamBaseInfo="+JSON.stringify(this.userInfo)
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
			font-size: 28upx;
			position: relative;
			height: 60upx;
			line-height: 60upx;
			color: #333333;
		}
		.content{
			flex:1;
			text-align: left;
		}
		input {
			flex: 1;
			font-size: 28upx;
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
		font-size: 24upx;
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
