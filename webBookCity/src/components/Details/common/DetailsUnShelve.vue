<template>
  <div>
    <div class="unshelve-header">
      <div class="unshelve-cover">
      </div>
      <div class="unshelve-btns">
<!--         <el-button class="unshelve-btn" @click="$router.go(-1)">返回之前的页面</el-button> -->
        <el-button class="unshelve-btn" @click="$router.push('/')">返回首页</el-button>
      </div>
    </div>
    <div>
      <div class="area-title" v-show="recommendListDatas.length!=0">
        <b class="title">同类资源推荐</b>
      </div>
      <ul class="details-recommend">
				<li @click="pushDeatilsPath(item.ObjectType,item.Id)" v-for="(item,index) in recommendListDatas" :key="index" :class="objectType==true?'other-list':'book-list'">
					<div class="cover">
						<div class="cover" :style="{backgroundImage:'url('+item.CoverUrl+')'}">
						</div>
					</div>
					<p class="title">
            <ellipsis :data="item.Title" :line-height="'28px'"></ellipsis>     
          </p>
					<span class="price">&yen;{{handleCurrentPrice(item.ObjectType,item)}}</span>
				</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    	showRecommendListDatas:[],
    	recommendListDatas: [],
    }
  },
  props:{
  	objectType:{
  		type:Boolean,
  		default:false,
  	}
  },
  methods: {
    getRecommendList() {
    	this.recommendListDatas=[];
      this.$http.get('/Content/Recommend', {
          params: {
            objectId: this.$route.query.id,
            count:12
          }
        })
        .then((res) => {
          if (res.data.Success) {

            this.recommendListDatas = res.data.Data;
            if (this.recommendListDatas != 0) {
              this.recommendListDatas.forEach((item, index) => {
                if (item.ObjectType == 102) {
                  //处理章节封面
                  item.CoverUrl = "/static/images/section_zw_list.jpg"
                }
              })
            }
            if (this.recommendListDatas.length >= 12) {
              this.showRecommendListDatas = this.recommendListDatas.slice(0, 11);
            } else {
              this.showRecommendListDatas = this.recommendListDatas
            }
          }
        })
    }
  },
  watch: {
    '$route': 'getRecommendList'
  },
  created(){
  	this.getRecommendList();
  }
}

</script>
