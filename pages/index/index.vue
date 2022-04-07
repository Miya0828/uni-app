<template>
	<view>
		<home :cur="PageCur" v-if="PageCur=='home'" :key="commponent1Key"></home>
		<forHelp :cur="PageCur" v-if="PageCur=='forHelp'" :key="commponent2Key"></forHelp>
		<community :cur="PageCur" v-if="PageCur=='community'" :key="commponent3Key"></community>
		<mine v-if="PageCur=='mine'" :key="commponent4Key"></mine>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view :class="PageCur=='home'?'action  text-blue':'action text-gray'" @click="NavChange" data-cur="home">
				<view class='cuIcon-homefill'></view>首页
			</view>
			<view :class="PageCur=='forHelp'?'action text-blue':'action text-gray'" @click="NavChange" data-cur="forHelp">
				<view class='cuIcon-creative'></view>求助
			</view>
			<view :class="PageCur=='community'?'action text-blue':'action text-gray'" @click="NavChange" data-cur="community">
				<view class='cuIcon-command'></view>社区
			</view>
			<view :class="PageCur=='mine'?'action text-blue':'action text-gray'" @click="NavChange" data-cur="mine">
				<view class='cuIcon-people'></view>我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'home',
				commponent1Key: 0,
				commponent2Key: 0,
				commponent3Key: 0,
				commponent4Key: 0,
			}
		},
		onLoad:function(){
			this.PageCur='home'
			++this.commponent1Key;
			++this.commponent2Key;
			++this.commponent3Key;
			++this.commponent4Key;
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur;
			}
			
		}
	}
</script>

<style>

</style>
