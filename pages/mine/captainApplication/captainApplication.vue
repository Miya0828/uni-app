<template>
	<view class="captain-application">
		<uniStep :list="stepList" :step="0"></uniStep>
		<view class="captain-application-tips">本页内容仅用于平台审核，不对其他用户公开</view>
		<form @submit="onAuth">
			<view>
				<view class="captain-application-group">
					<view class="title">姓名</view>
					<input placeholder="请输入真实姓名" v-model="userInfo.name" name="name"></input>
				</view>
				<view class="captain-application-group">
					<view class="title">区号</view>
					<input placeholder="86" disabled="true" value="86" name="areaCode"></input>
				</view>
				<view class="captain-application-group captain-application-group-item">
					<view class="title">手机号码</view>
					<input placeholder="请输入手机号码" type="number" v-model="userInfo.phone"  maxlength="11" name="phone"></input>
				</view>
				<view class="captain-application-group">
					<view class="title">身份证号</view>
					<input placeholder="请输入证件号码" v-model="userInfo.identityCard"  name="identityCard"></input>
				</view>
				<view class="captain-application-group" @click="onUploadImg">
						<text class="item title">证件照片</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
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
	import { userService } from "@/api/index.js";
	import graceChecker from '@/common/biz/graceChecker.js';
	export default {
		components: {
			uniStep
		},
		data() {
			return {
				userInfo:{
					areaCode:'',
					name:'',
					phone:'',
					identityCard:'',
					frontOfImgUrl:"",
					reverseSideImgUrl:'',
					inHandImgUrl:''
				},
				stepList:['身份信息','基本资料','能力说明']
			}
		},
		created() {
			// 监听
			uni.$once('captainUserInfo', data=>{
				this.userInfo = data;
			});
		},
		mounted(){
			this.queryByUserId();
		},
		methods: {
			onUploadImg(){
				let {frontOfImgUrl,reverseSideImgUrl,inHandImgUrl} = this.userInfo;
				if(frontOfImgUrl || reverseSideImgUrl || inHandImgUrl){
					uni.navigateTo({
						url:'/pages/mine/captainApplication/uploadIdCard?userInfo='+JSON.stringify({frontOfImgUrl,reverseSideImgUrl,inHandImgUrl})
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/captainApplication/uploadIdCard?userInfo'
					})
				}
			},
			queryByUserId(){
				userService.queryIdentityCard().then((res)=>{
					let data = res.data;
					if(data.success){
						if(!data.result) return;
						let { areaCode,name,phone,identityCard,frontOfImgUrl,reverseSideImgUrl,inHandImgUrl } = data.result;
						this.userInfo.areaCode = areaCode;
						this.userInfo.name = name;
						this.userInfo.phone = phone;
						this.userInfo.identityCard = identityCard;
						this.userInfo.frontOfImgUrl = frontOfImgUrl;
						this.userInfo.reverseSideImgUrl = reverseSideImgUrl;
						this.userInfo.inHandImgUrl = inHandImgUrl;
					}
				})
			},
			onAuth(e){
				// 进行表单检查
				var formData = e.detail.value;
				formData = {...this.userInfo,...formData};
				//定义表单规则
				var rule = [
					{name:"name", checkType : "notnull", checkRule:"",  errorMsg:"请输入姓名"},
					{name:'phone',checkType:'phoneno',errorMsg:'请输入正确的手机号码'},
					{name:'identityCard',checkType:'identityCard',errorMsg:'请输入正确格式的身份证号'},
					{name:"frontOfImgUrl", checkType : "notnull", checkRule:"",  errorMsg:"请上传正面证件照片"},
					{name:"reverseSideImgUrl", checkType : "notnull", checkRule:"",  errorMsg:"请反面证件照片"},
					{name:"inHandImgUrl", checkType : "notnull", checkRule:"",  errorMsg:"请上传手持证件照片"},
				];
				var checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				let params = {
					areaCode:this.userInfo.areaCode,
					name:this.userInfo.name,
					phone:this.userInfo.phone,
					identityCard:this.userInfo.identityCard,
					frontOfFile:this.userInfo.frontOfImgUrl,
					reverseSideFile:this.userInfo.reverseSideImgUrl,
					inHandFile:this.userInfo.inHandImgUrl
				};
				userService.certification(params).then((res)=>{
					if(res.data.success){
						uni.navigateTo({
							url:"/pages/mine/captainApplication/baseInfo"
						});
					}
				})
				
			}
		}
	}
</script>

<style lang="less">
.captain-application{
	background-color:rgba(248, 248, 248, 1);
	height: 100vh;
	position: relative;
	.captain-application-tips{
		color:#999999;
		padding: 20upx 30upx;
	}
	.captain-application-group {
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 120upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
		justify-content: space-between;
		.captain-application-group-item{
			margin-bottom: 20upx;
		}
	}
	
	.captain-application-group+.captain-application-group {
		border-top: 1upx solid #eee;
	}
	
	.captain-application-group .title {
		text-align: justify;
		width: 180upx;
		padding-right: 30upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
	}
	
	.captain-application-group input {
		flex: 1;
		font-size: 30upx;
		color: #555;
		padding-right: 20upx;
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
