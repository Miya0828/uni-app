<template>
	<view class="ability">
		<view>
			<uniStep :list="stepList" :step="2"></uniStep>
			<view class="ability-tips">本页内容仅用于平台审核，不对其他用户公开</view>
			<view class="ability-group" @click="onUploadTourGuide">
					<text class="item title">导游证</text>
					<view class="content flag" v-if="userInfo.guideCertificates">已上传</view>
					<uni-icons color="#3D3D3D" type="forward" size="18">
					</uni-icons>
			</view>
			<view class="ability-group" @click="onUploadTeamLeader">
					<text class="item title">领队证</text>
					<view class="content flag" v-if="userInfo.teamLeaderCertificates">已上传</view>
					<uni-icons color="#3D3D3D" type="forward" size="18">
					</uni-icons>
			</view>
			<view class="ability-group" @click="onFinishExperience">
					<text class="item title">领队经验</text>
					<view class="content" v-if="userInfo.teamLeaderExp">{{this.cutString(userInfo.teamLeaderExp,15)}}</view>
					<uni-icons color="#3D3D3D" type="forward" size="18">
					</uni-icons>
			</view>
			<view class="ability-tips">
				<text class="ability-tips-flag">*</text>
				 根据国家旅游局规定，需要导游资格证才可带队，若无导游资
					格证，在认领活动时需邀请一位导游同行
			</view>
		</view>
		<view class="btn">
			<button @click="onNext">提交申请</button>
			<view class="ability-agree">
				<radio-group @change="onAgree">
					<label>
						<radio value="true" class="form-radio"/>我已阅读并同意遵守
					</label>
					<text selectable="true" class="text-blue" @tap="showModal" data-target="Modal">领队认证协议</text>
				</radio-group>
			</view>
		</view>
		<view class="ability-modal" :class="modalName=='Modal'?'show':''">
			<view class="ability-dialog">
				<view class="ability-dialog-bar">
					<view class="title">领队认证协议</view>
					<uni-icons type="closeempty" size="18" color="gray" class="cloable" @tap="hideModal"></uni-icons>
				</view>
				<view class="ability-dialog-content">
					领队认证协议
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniStep from "@/components/uni-step/uni-step.vue";
	import { userService } from "@/api/index.js";
	import graceChecker from '@/common/biz/graceChecker.js';
	import { CHECK_STATUS,REALNAME_INDETITY } from '@/common/util/constants';
	import store from '@/store/index.js';
	export default {
		components:{
			uniStep
		},
		data() {
			return {
				modalName:'',
				stepList:['基本资料','能力说明'],
				userInfo:{
					guideCertificates:'',
					guideCertificatesNumber:'',
					teamLeaderCertificates:'',
					teamLeaderExp:''
				},
				isAgree:false
			}
		},
		onLoad(options){
			this.userInfo = Object.assign({},{...JSON.parse(options.teamBaseInfo)});
			uni.$once("tourGuideInfo",data=>{
				let {guideCertificatesNumber,guideCertificates} = data;
				this.userInfo.guideCertificatesNumber = guideCertificatesNumber;
				this.userInfo.guideCertificates = guideCertificates;
			});
			uni.$once("tourLeaderInfo",data=>{
				this.userInfo.teamLeaderCertificates = data;
			});
			uni.$once("teamLeaderExp",data=>{
				this.userInfo.teamLeaderExp = data;
			});
		},
		mounted(){
			
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
			onUploadTourGuide(){
				let { guideCertificatesNumber,guideCertificates } = this.userInfo;
				uni.navigateTo({
					url:"/pages/mine/captainApplication/tourGuide?tourGuideInfo="+JSON.stringify({guideCertificatesNumber,guideCertificates}),
				})
			},
			onUploadTeamLeader(){
				let {teamLeaderCertificates} = this.userInfo;
				uni.navigateTo({
					url:"/pages/mine/captainApplication/teamLeader?teamLeaderCertificates="+JSON.stringify(teamLeaderCertificates),
				})
			},
			onFinishExperience(){
				let { teamLeaderExp = '' } = this.userInfo;
				uni.navigateTo({
					url:"/pages/mine/captainApplication/experience?teamLeaderExp="+teamLeaderExp,
				})
			},
			onAgree(e){
				this.isAgree = e.detail.value;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
			onNext(e){
				let param = Object.assign({},this.userInfo,{
					guideCertificates:this.userInfo.guideCertificates,
					guideCertificatesNumber:this.userInfo.guideCertificatesNumber,
				});
				//定义表单规则
				var rule = [
					{name:"workUnit", checkType : "notnull", checkRule:"",  errorMsg:"请输入工作单位"},
					{name:"beGoodAtRegion", checkType : "notnull", checkRule:"",  errorMsg:"请选择擅长区域"},
					{name:"beGoodAtType", checkType : "notnull", checkRule:"",  errorMsg:"请选择擅长技能"},
					{name:"guideCertificatesNumber", checkType : "notnull", checkRule:"",  errorMsg:"请输入导游证号"},
					{name:"guideCertificates", checkType : "notnull", checkRule:"",  errorMsg:"请上传导游证"},
					{name:"teamLeaderCertificates", checkType : "notnull", checkRule:"",  errorMsg:"请上传领队证"},
					{name:"teamLeaderExp", checkType : "notnull", checkRule:"",  errorMsg:"请填写领队经验"},
				];
				var checkRes = graceChecker.check(param, rule);
				if(!checkRes){
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				if(!this.isAgree){
					 uni.showToast({ title: "请阅读并勾选协议", icon: "none" });
					return;
				}
				userService.uploadTeamLeader(param).then((res)=>{
					if(res.data.success){
						store.commit('setCheckStatus',2);
						uni.navigateTo({
							url:"/pages/mine/captainApplication/checking"
						})
					}
				})
				
			}
		}
	}
</script>

<style lang="less">
	.ability{
		background-color:rgba(248, 248, 248, 1);
		height: 100vh;
		position: relative;
		.ability-group {
			background-color: #ffffff;
			padding: 1upx 30upx;
			display: flex;
			align-items: center;
			min-height: 120upx;
			margin-bottom: 20upx;
			justify-content: space-between;
			.ability-group-item{
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
			}
			.content{
				flex:1;
				text-align: left;
				&.flag{
					color: #0089FF;
				}
			}
			input {
				flex: 1;
				font-size: 30upx;
				color: #555;
				padding-right: 20upx;
			}
		}
		
		.ability-group+.ability-group {
			border-top: 1upx solid #eee;
		}
		.ability-tips{
			color:#999999;
			padding: 30upx;
			font-size: 24upx;
			.ability-tips-flag{
				color:#F90000;
				padding-right:10upx;
			}
		}
		.btn{
			width: 100%;
			position: absolute;  
			bottom: 100upx;
			.ability-agree{
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 20upx;
				.form-radio{
					transform: scale(0.7);
				}
			}
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
		.ability-modal {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 1110;
			opacity: 0;
			outline: 0;
			text-align: center;
			-ms-transform: scale(1.185);
			transform: scale(1.185);
			backface-visibility: hidden;
			perspective: 2000upx;
			background: rgba(0, 0, 0, 0.6);
			transition: all 0.3s ease-in-out 0s;
			pointer-events: none;
		}
		
		.ability-modal::before {
			content: "\200B";
			display: inline-block;
			height: 100%;
			vertical-align: middle;
		}
		
		.ability-modal.show {
			opacity: 1;
			transition-duration: 0.3s;
			-ms-transform: scale(1);
			transform: scale(1);
			overflow-x: hidden;
			overflow-y: auto;
			pointer-events: auto;
		}
		.ability-dialog {
			position: relative;
			display: inline-block;
			vertical-align: middle;
			margin-left: auto;
			margin-right: auto;
			width: 680upx;
			max-width: 100%;
			background-color: #f8f8f8;
			border-radius: 10upx;
			overflow: hidden;
			.ability-dialog-content{
				padding: 50upx;
			}
		}
		.ability-dialog-bar{
			display: flex;
			position: relative;
			align-items: center;
			min-height: 100upx;
			justify-content: space-between;
			padding: 0 20upx;
			.title{
				text-align: center;
				flex: 1;
				font-size: 32upx;
				font-weight: 500;
			}
		}
	}
</style>
