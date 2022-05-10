<template>
	<view>

	</view>
</template>

<script>
	export default {		
		onLoad() {
			uni.preloadPage({
				url: `/pages/home/home`
			})
			uni.preloadPage({
				url: `/pages/login/login`
			})
		},		
	}
</script>

<style>

</style>
