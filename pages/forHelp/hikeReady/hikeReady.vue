<template>
	<view class="hike-ready">
		<view style="white-space: pre-wrap;" v-text="dataContent">
		</view>
	</view>
</template>
<script>
	import { forHelpService } from "@/api/index.js";
	export default {
		data() {
			return {
				dataContent:''
			}
		},
		onLoad(option) {
			this.onfootContent(JSON.parse(option.id));
		},
		methods: {
			onfootContent(param){
				forHelpService.onfootContent(param).then((res)=>{
					let data = res.data;
					if(data.success){
						this.dataContent = data.result.dataContent;
					}
				})
			}
		}
	}
</script>

<style>
.hike-ready{
	padding: 40upx;
}
</style>
