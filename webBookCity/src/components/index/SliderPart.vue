<template>
  <div class="slider-part">
    <!-- 轮播 -->
    <slider class="slider"></slider>
    <!-- 右下角公告和最新资源 -->
    <div class="product-content">
      <!-- 公告 -->
      <div class="content-title border-bottom-red" style="padding-top: 0;position: relative;">
        <span class="front-icon"></span>
        <span class="title titles">公告：</span>
        <span class="content-more"  @click="goPath('noticeList')">更多 ></span>
        <div class="notice-ul">
           <ul  :style="{top:ulTop+'px'}">
            <li v-for="item in noticeList">{{item.Title}}</li>
          </ul>
        </div>
      </div>
      <!-- 最新资源 -->
      <div class="content-title" style="padding-top: 0">
        <span class="red-border1"></span>
        <span class="title">最新资源</span>
        <span class="content-more" @click="goPath('newRes')">更多 ></span>
      </div>
      <div class="img-part">
        <div class="img-wrap" v-for="item in dataList">
          <div class="imgs" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
          <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
          </div>
          <p class="names"  @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
          <p class="price red">&yen;{{handleCurrentPrice(item.ObjectType, item)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import slider from "../common/slider.vue"

export default {
  data() {
    return {
      dataList:[],
      noticeList:[],
      noticeObj:{},
      ulTop:0,
    }
  },
  components:{
    slider
  },
  mounted() {
    this.getlist()
    this.getNoticelist()
  },
  methods: {
   /**
     * [getlist 最新资源]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @return   {[type]}   [description]
     */
    getlist() {
      this.$http.post("/Content/Search", {
          cp: 1,
          ps: 10,
          query: JSON.stringify({
            ObjectTypes: [104,108,109], 
            SearchOrderBy: {
              ColumnName:'onShelfDate',
              Descending: true,
            },
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList
          }
        })
    },
    /**
     * [getlist 获取公告]
     * @Author   赵雯欣
     * @DateTime 2017-12-22
     * @return   {[type]}   [description]
     */
    getNoticelist() {
      this.$http.get("/Message/GetMessageList", {
        params:{
          cp:1,
          ps:9999,
          IsPublish:true,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.noticeList = res.data.Data.ItemList;
            this.totalCount = res.data.Data.RecordCount;
            if(this.noticeList.length>1){
              this.setTime()
            }
          }
        })
    },
    setTime(){
      this.timer = setInterval((index)=>{
        if((this.noticeList.length-1)*30<= (-this.ulTop)){
          this.ulTop = 0
        }else{
          this.ulTop = this.ulTop-30 
        }
      },2000)
    }
  }
}

</script>
<style lang='less'>
.slider-part {
  width: 100%;
  overflow:hidden;

  .slider {
    height: 350px;
    overflow:hidden;
  }

  .product-content {
    width: 917px;
    padding-left: 281px;
    margin: 0 auto;
  }

  .notice-ul{
    height: 30px;
    width: 750px;
    position: absolute;
    line-height: 30px;
    left: 100px;
    top:15px;
    overflow: hidden;

    ul{
      position: absolute;
      left:0;
    }
  }

  .front-icon{
    display: inline-block;
    width: 30px;
    height: 34px;
    background:url('../../../static/images/laba.png') no-repeat 0 15px;
  }

  .content-title .titles{
    margin-left: 0
  }

  .img-part {
    overflow:hidden;
    margin-top: 20px;
  }

  .img-wrap {
    width: 140px;
    height: 257px;
    float: left;
    margin-right: 53px;
  }
  .img-wrap:nth-child(5n){
    margin-right: 0;
  }
  .imgs{
    width: 100%;
    height: 184px;
    border:1px solid #ddd;
    cursor: pointer;
  }
   .names {
    width:140px;
    height: 30px;
    margin-top: 8px;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 30px;
    font-size: 16px;
    color: #333;
  }
}

</style>
