<template>
	<div class="detail-container">
		<Search></Search>
		<router-view/>
	</div>
</template>

<script>
import Search from "@/components/common/SearchNoMenu"
	export default {
		data(){
			return {
				
			}
		},
		components:{
			Search
		}
	}
</script>

<style lang="less"  src="assets/details.less">
</style>