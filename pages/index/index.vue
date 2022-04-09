<template>
	<view>
	
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
