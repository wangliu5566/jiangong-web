<template>
  <div class="book-recommended">
    <div class="title">
      同类{{detailType.name}}推荐
    </div>
    <ul class="recommended-list" v-if="showRecommendListDatas.length!=0">
      <li @click="pushDeatilsPath(item.ObjectType,item.Id)" v-for="(item,index) in showRecommendListDatas">
        <div class="book-cover" :class="detailType.flag==1?'other-cover':''" style="background-image:url('/static/images/no_cover_m.jpg')">
          <div class="book-cover" :style="{backgroundImage:'url('+item.CoverUrl+')'}">
          </div>
        </div>
        <div class="book-info" :class="detailType.flag==1?'other-info':''">
          <p class="book-title">

          {{item.Title}}</p>
          <span class="original-price">&yen;{{formatPrice(item.MarketPrice,2)}}</span>
          <span class="price">&yen;{{formatPrice(item.CurrentPrice,2)}}</span>
        </div>
      </li>
    </ul>
    <span class="no-recommend" v-show="showRecommendListDatas.length==0">
      暂无相关推荐
    </span>
<!--     <p class="more-btn" v-show="showMore" @click="showMoreList">
      查看完整榜单
    </p> -->
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  data() {
    return {
      recommendListDatas: [],
      showRecommendListDatas: [],
      showMore: false,
    }
  },
  created() {
    this.getRecommendListDatas();
  },
  props:{
    detailType:{
      require:true,
      type:Object,
      default:{
        name:"",
        type:'',
        flag:0
      },
    },

  },
  watch: {
    '$route': 'getRecommendListDatas'
  },
  computed:mapGetters([
    'detailsData'
    ]
  ),
  methods: {
    showMoreList() {
      this.showRecommendListDatas = this.recommendListDatas;
      this.showMore = false;
    },
    getRecommendListDatas() {
      this.$http.get('/Content/Recommend', {
          params: {
            objectId: this.$route.query.id,
            ps: 15,
            cp: 1,
          }
        })
        .then((res) => {
          if (res.data.Success) {

            this.recommendListDatas = res.data.Data;
            if (this.recommendListDatas!=0) {
              this.recommendListDatas.forEach((item,index)=>{
                if (item.ObjectType==102) {
                  //处理章节封面
                  item.CoverUrl = "/static/images/section_zw_list.jpg"
                }
              })
            }
            if (this.recommendListDatas.length >= 10) {
              this.showRecommendListDatas = this.recommendListDatas.slice(0, 9);
              this.showMore = true;
            } else {
              this.showRecommendListDatas = this.recommendListDatas
            }
          }
        })
    }
  }

}

</script>
