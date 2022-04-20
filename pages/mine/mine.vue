<template>
	<view class="minePage">
		<view class="center-bg">
			<view class="mine-page-top-part">
				<view class="mine-page-top-part-left">
					<image v-bind:src="userInfo.avatar"  mode="scaleToFill"></image>
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
				<view class="cu-list menu card-menu shadow-lg">
					<view class="mine-page-group mine-page-group-item radius" @click="onGoPage('/pages/mine/certification/certification')">
						<text class="item title">实名认证</text>
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
	</view>
</template>

<script>
import { userService } from "@/api/index.js";
import { ACCESS_TOKEN,USER_INFO } from '@/common/util/constants';
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
			usList: [
			  {title: '点亮景点',number:'26' },
			  {title: '走过温州',number:'86%' },
			  {title: '打卡路线',number:'23' },
			  {title: '徒步旅程',number:'123.4' },
			],
		};
	},
	mounted(){
		this.queryByUserId();
	},
	methods: {
		queryByUserId(){
			let userInfo = uni.getStorageSync(USER_INFO),$this = this;
			if(!userInfo){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
			userService.queryByUserId({userId:userInfo.id}).then((res)=>{
				if(res.data.success){
					console.log(res);
					let {id,avatar,birthday,signature,post,realname,telephone,emergencyContact} = res.data.result;
					$this.userInfo.id = id;
					$this.userInfo.avatar = avatar || '../../static/mine/ic_avatar.png';
					$this.userInfo.realname = realname;
					$this.userInfo.birthday = birthday;
					$this.userInfo.signature = signature;
					$this.userInfo.post = post;
					$this.userInfo.emergencyContact = emergencyContact;
					$this.userInfo.emergencyContactPhone = telephone;
				}
				
			});
		},
		onGoPage(url){
			if(url){
				uni.navigateTo({
					url
				})
			}
		},
		modifyUser(){
			uni.navigateTo({
				url:"/pages/mine/personalCenter/personalCenter"
			})
		},
		logout() {
			store.commit('clearUser')
			
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
		height: 500rpx;
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
					color:rgba(153, 153, 153, 1);
					font-size: 30upx;
					padding: 8upx 0;
				}
				.person-introduce{
					margin-top: 10upx;
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
						color: #000;
						margin-left: 30upx;
						margin-right: 30upx;
					}
					.person-introduce-profess{
						background: #FFFFFF;
						padding:10upx 30upx;
						border-radius: 30upx;
						color: #000;
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
					font-size: 30upx;
					position: relative;
					height: 60upx;
					line-height: 60upx;
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
			}
			.logout{
				color:#666666;
				border-radius: 50upx;
				background-color: #FFFFFF;
				margin: 40upx 0;
				font-weight: bold;
			}
			uni-button:after{
				border: 0;
			}
		}
	}
}
</style>
