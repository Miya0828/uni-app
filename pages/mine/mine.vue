<template>
	<view class="minePage">
		<view class="center-bg">
			<view class="mine-page-top-part">
				<view class="mine-page-top-part-left">
					<image v-bind:src="userInfo.avatar || '/static/mine/ic_avatar.png'"  mode="scaleToFill"></image>
				</view>
				<view class="mine-page-top-part-right">
					<view class="user-info">
						<text class="userName">{{userInfo.realname}}</text>
						<image src="../../static/mine/ic_edit.png"  @click="modifyUser"></image>
					</view>
					<view class="description">{{userInfo.signature}}</view>
					<view class="person-introduce">
						<text class="person-introduce-grade">Lv:12</text>
						<text class="person-introduce-hobby">攀登者</text>
						<text class="person-introduce-profess">学生</text>
					</view>
				</view>
			</view>
			<view class="mine-page-grid mine-page-item">
				<uni-grid :column="4" :showBorder="false">
					<uni-grid-item v-for="(item, index) in usList" :index="index" :key="index">
						<view class="mine-page-grid-item-box">
							<view class="mine-page-number">{{item.number}}</view>
							<view class="mine-page-title">{{item.title}}</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>
		<!-- 列表list-->
		<view class="list-content">
			<scroll-view scroll-y="true" style="height: 100%;" class="scrool-more">
				<view class="list-content-menu">
					<view class="mine-page-group mine-page-group-item radius" @click="onGoPage('/pages/mine/certification/certification')">
						<text class="item title">实名认证</text>
						<image v-if="check_status == 2" src="@/static/mine/ic_verifiedIdCard.png"></image>
						<image v-else src="@/static/mine/ic_notcertified.png"></image>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
					</view>
					<view class="mine-page-group top-radius bottom-boder" @click="onGoPage()">
						<text class="item title">安全培训进度</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
					</view>
					<view class="mine-page-group bottom-boder" @click="onGoPage('/pages/mine/captainApplication/captainGuide')">
						<text class="item title">成为队长</text>
						<image  v-if="realName_Indentity == 2"  src="@/static/mine/ic_verifiedTeam.png"></image>
						<image v-else src="@/static/mine/ic_notcertifiedTeam.png"></image>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
					</view>
					<view class="mine-page-group bottom-boder" @click="onGoPage()">
						<text class="item title">行前登记</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
					</view>
					<view class="mine-page-group bottom-boder" @click="onGoPage()">
						<text class="item title">团队历史群管理</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
					</view>
					<view class="mine-page-group mine-page-group-item bottom-radius" @click="onGoPage()">
						<text class="item title">下载离线地图</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
					</view>
					<view class="mine-page-group top-radius bottom-boder" @click="onGoPage()">
						<text class="item title">收藏夹</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
					</view>
					<view class="mine-page-group bottom-boder" @click="onGoPage()">
						<text class="item title">发布驴记、评价</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
					</view>
					<view class="mine-page-group bottom-radius" @click="onGoPage('/pages/mine/uploadActivityInfo/uploadActivityInfo')">
						<text class="item title">活动信息上传</text>
						<uni-icons color="#3D3D3D" type="forward" size="18">
						</uni-icons>
					</view>
					<button class="logout" @tap="logout">退出</button>
				</view>
			</scroll-view>
		</view>
		<view class="mine-require-modal" :class="show?'show':''">
			<view class="mine-require-dialog">
				<view class="pic-require-dialog-box">
					<image src="@/static/mine/ic_clickmine.png"></image>
					<view class="pic-require-dialog-box-tips">请完成实名验证…</view>										
					<view class="pic-require-dialog-btn">
						<button style="background:#0089FF;color:#FFFFFF" @click="onGoCertification">实名认证</button>
						<button style="background:rgba(38, 132, 255, 0.1);" @click="onClose">取消</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { userService } from "@/api/index.js";
import { ACCESS_TOKEN,USER_INFO,CHECK_STATUS,REALNAME_INDETITY } from '@/common/util/constants';
import store from '@/store/index.js';
export default {
	data() {
		return {
			userInfo:{
				id:'',
				avatar:'',
				realname:'',
				birthday:'',
				signature:'',
				post:'',
				emergencyContact:'',
				emergencyContactPhone:''
			},
			checkStatus:'',
			checkMsg:'',
			usList: [
			  {title: '点亮景点',number:'26' },
			  {title: '走过温州',number:'86%' },
			  {title: '打卡路线',number:'23' },
			  {title: '徒步旅程',number:'123.4' },
			],
			show:false,
			check_status:'',
			realName_Indentity:""
		};
	},
	mounted(){
		this.getUserInfo();
	},
	onPullDownRefresh(){
		this.queryByUserId();
	},
	methods: {
		getUserInfo(){
			let userInfo = uni.getStorageSync(USER_INFO),
				check_status = uni.getStorageSync(CHECK_STATUS),
				realName_Indentity = uni.getStorageSync(REALNAME_INDETITY);
			if(!userInfo){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
			let {id,avatar,birthday,signature,post,realname,telephone,emergencyContact} = userInfo;
			this.userInfo.id = id;
			this.userInfo.avatar = avatar;
			this.userInfo.realname = realname;
			this.userInfo.birthday = birthday;
			this.userInfo.signature = signature;
			this.userInfo.post = post;
			this.userInfo.emergencyContact = emergencyContact;
			this.userInfo.emergencyContactPhone = telephone;
			this.check_status = check_status;
			this.realName_Indentity = realName_Indentity;
		},
		queryByUserId(){
			let userInfo = uni.getStorageSync(USER_INFO),$this = this;
			if(!userInfo){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
			userService.queryByUserId({userId:userInfo.id}).then((res)=>{
				//关闭下拉刷新
				uni.stopPullDownRefresh();
				if(res.data.success){
					let {sysUser, check_status,realName_Indentity} = res.data.result;
					store.commit('setUserInfo',sysUser);
					store.commit('setCheckStatus',check_status);
					store.commit('setRealNameIndentity',realName_Indentity);
					let {id,avatar,birthday,signature,post,realname,telephone,emergencyContact,checkStatus} = sysUser;
					$this.userInfo.id = id;
					$this.userInfo.avatar = avatar;
					$this.userInfo.realname = realname;
					$this.userInfo.birthday = birthday;
					$this.userInfo.signature = signature;
					$this.userInfo.post = post;
					$this.userInfo.emergencyContact = emergencyContact;
					$this.userInfo.emergencyContactPhone = telephone;
					$this.check_status = check_status;
					$this.realName_Indentity = realName_Indentity;
				}
				
			});
		},
		onGoPage(url){
			if(url){
				if(url === '/pages/mine/captainApplication/captainGuide'){
					switch(this.checkStatus){
						case 2:
							uni.navigateTo({
								url
							});
							break;
						default:
							this.show = true;
					}
				}else{
					uni.navigateTo({
						url
					});
				}
			}
		},
		onGoCertification(){
			uni.navigateTo({
				url:'/pages/mine/certification/certification'
			});
		},
		modifyUser(){
			uni.navigateTo({
				url:"/pages/mine/personalCenter/personalCenter"
			})
		},
		onClose(){
			this.show = false;
		},
		logout() {
			store.commit('clearUser')
			uni.$emit('closeHeartbeat')
			
			uni.reLaunch({
				url: '/pages/login/login',				
			});
		}
	}
};
</script>

<style lang="scss">	
page{
	width: 100%;
	height: 100%;
}
.minePage {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background-color:#f7f8fe;
	color:#666666;
	.center-bg {
		height: 360rpx;
		padding-top: 108rpx;
		overflow: hidden;
		color: #fff;
		font-weight: 300;
		.mine-page-top-part{
			width: 100%;
			display: flex;
			margin-left: 40upx;
			margin-right: 40upx;
			.mine-page-top-part-left{
				image{
					width: 160upx;
					height: 160upx;
					margin-bottom: 20upx;
					border-radius: 50%;
				}
			}
			.mine-page-top-part-right{
				margin-left: 30upx;
				.user-info{
					display: flex;
					align-items: center;
					.userName{
					  font-size: 40upx;
					  font-weight: 500;
					  color: #333333;
					  padding-right: 20upx;
					}
					image{
						width: 32upx;
						height: 32upx;
					}
				}
				.description{
					color:#999999;
					font-size: 28upx;
					padding: 8upx 0;
					min-height: 40upx;
				}
				.person-introduce{
					margin-top: 10upx;
					font-size: 22upx;
					.person-introduce-grade{
						background: #2684FF;
						padding:10upx 30upx;
						border-radius: 30upx;
						color: #FFFFFF;
					}
					.person-introduce-hobby{
						background: #FFFFFF;
						padding:10upx 30upx;
						border-radius: 30upx;
						color: #999999;
						margin-left: 30upx;
						margin-right: 30upx;
					}
					.person-introduce-profess{
						background: #FFFFFF;
						padding:10upx 30upx;
						border-radius: 30upx;
						color: #999999;
						margin-right: 30upx;
					}
				}
			}
		}
	}
	.center-bg .mine-page-grid{
		color:#000;
		text-align: center;
		.mine-page-grid-item-box{
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			border-radius: 12upx;
		}
		.uni-grid-item__box{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
		.mine-page-number{
			font-size: 44upx;
			font-weight: 600;
			color: #000000;
			padding-bottom: 4upx;
		}
		.mine-page-title{
			font-size: 24upx;
			color: #666666;
		}
	}
	.list-content{
		flex: 1;
		position: relative;
		color:#666666;
		font-size: 28upx;
		.scrool-more{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			.list-content-menu {
			    overflow: hidden;
			    margin-right: 15px;
			    margin-left: 15px;
			    border-radius: 10px;
				.mine-page-group {
					background-color: #ffffff;
					padding: 1upx 30upx;
					display: flex;
					align-items: center;
					min-height: 120upx;
					justify-content: space-between;
					&.mine-page-group-item{
						margin-bottom: 20upx;
					}
					&.bottom-boder{
						border-bottom: 2upx solid #F6F6F6;
					}
					.title {
						flex: 1;
						text-align: justify;
						padding-right: 30upx;
						font-size: 28upx;
						position: relative;
						height: 60upx;
						line-height: 60upx;
						color: #666666;
					}
					.radius{
						border-radius:16upx;
					}
					.top-radius{
						border-radius:16upx 16upx 0 0;
					}
					.bottom-radius{
						border-radius: 0 0 16upx 16upx;
					}
					uni-image{
						width: 130upx;
						height: 50upx;
						padding-right: 20upx;
					}
				}
				.logout{
					color:#666666;
					border-radius: 50upx;
					background-color: #FFFFFF;
					margin: 40upx 0;
					font-weight: bold;
					font-size: 32upx;
				}
				uni-button:after{
					border: 0;
				}
				.bottom{
					height: 40upx;
				}
			}
		}
	}
	.mine-require-modal {
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
	
	.mine-require-modal::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}
	
	.mine-require-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}
	.mine-require-dialog {
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
		.pic-require-dialog-content{
			padding: 50upx;
		}
	}
	.mine-require-dialog{
		text-align: left;
		border-radius: 20upx;
		.pic-require-dialog-box{
			margin-top: 84upx;
			text-align: center;
			uni-image{
				border: 2upx dashed #666666;
				width: 80%;
			}
			.pic-require-dialog-box-tips{
				text-align: center;
				font-size: 28upx;
				font-weight: 400;
				color: #333333;
				margin:30upx 0 0 0;
			}
			.pic-require-dialog-btn{
				padding: 100upx 0 100upx 0;
				button{
					color:#0089FF;
					margin-left: 50upx;
					margin-right: 50upx;
					border-radius: 38upx;
					background: rgba(0, 134, 255, 0.1);
					margin-top:30upx;
				}
				uni-button:after{
					border: 0;
				}
			}
		}
	}
}
</style>
