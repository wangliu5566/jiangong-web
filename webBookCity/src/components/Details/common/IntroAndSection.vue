<template>
  <div class="intro-section">
    <ul class="nav-details">
      <li :class="defaultType==0?'selected':''" @click="defaultType=0">简介</li>
      <li :class="defaultType==1?'selected':''" @click="defaultType=1">目录</li>
    </ul>
    <div class="intro-container" v-show="defaultType==0">
      <div class="no-data" v-if="!detailsData.Abstracts">
        暂无简介
      </div>
      <p>{{detailsData.Abstracts}}</p>
    </div>
    <div v-show="defaultType==1" class="section-container">
      <div class="no-data" v-if="showListDatas.length==0">
        暂无目录
      </div>
      <ul class="section-list" v-show="listDatas">
        <li v-for="(item,index) in showListDatas" @click="checkList(item)"><span>{{item.Title}}</span></li>
      </ul>
      <p class="more-btn" v-show="showMore" @click="showMoreList">
      	{{isShowMore?'收起目录详情':'查看目录详情'}}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultType: 0,
      listDatas:[],
      showListDatas:[],
      showMore:false,
      isShowMore:false,
    }
  },
  props:{
    detailsData: {
      type: Object,
      default: {
        CoverUrl:'',
      },
      required: true,
    }
  },
  created(){
    this.getList();
  },
  watch:{
    '$route':function(){
      this.defaultType=0;
      this.getList();

    }
  },
  methods:{
    checkList(item){
      console.log(item.Id)
    },
    getList(){
      this.$http.get('/TableOfContent/List',{
        params:{
          isRecursive:true,
          objectId:this.$route.query.id
        }
      })
      .then((res)=>{
        if (res.data.Success) {
          this.listDatas  = res.data.Data;
          let limit = 7;
          if (this.listDatas.length>=limit) {
            this.showListDatas = this.listDatas.slice(0,limit-1);
            this.showMore = true;
          }else{
            this.showListDatas = this.listDatas;
          }
        }
      })
    },
    showMoreList(){
      let limit = 7;
      if (!this.isShowMore) {
        this.showListDatas = this.listDatas;

      }else{
        this.showListDatas = this.listDatas.slice(0,limit-1);
      }

      this.isShowMore = !this.isShowMore;
      
    }
  }
}

</script>
