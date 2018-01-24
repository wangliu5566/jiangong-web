<template>
  <div class="related-exp-main">
    <div v-show="expList.length!=0">
      <div class="area-title">
        <b class="title">知识标签</b>
      </div>
      <ul class="knowledge-link">
        <li @click="checkExpDetail(item.ExplicitWord.Id)" v-for="(item,index) in expList" :key="index">{{item.ExplicitWord.Title}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      expList: [],
    }
  },
  props:{
  	objectType:{
  		required:true,
  	}
  },
  created() {
  	this.getExpList();
  },
  watch:{
    '$route':'getExpList'
  },
  methods: {
  	checkExpDetail(id){
  		this.$router.push({
  			path:'/wrap/details/exp',
  			query:{
  				id:id
  			}
  		})
  	},
    getExpList() {
      this.$http.get('/ExplicitWordLabel/DetailLabelList', {
          params: {
            objectId: this.$route.query.id,
            type: this.objectType,
            listCount:14
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.expList = res.data.Data;
          }
        })
    },
  }
}

</script>
