<template>
  <div class="course">
    <div class="product-content">
      <div class="content-title">
        <span class="red-border"></span>
        <span class="title">{{title}}</span>
        <span class="content-more" @click="goPath(title=='课程推荐'?'course':'building')">更多 ></span>
      </div>
      <div class="products">
        <div class="img-wrap" v-for="item in dataList">
          <div class="imgs" style="background:url('/static/images/no_cover_s.jpg');background-size: 100% 100%;">
            <div style="width:100%;height:100%;" @click="goDetail(title=='课程推荐'?'course':'picture',item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"> </div>
          </div>
          <p class="names" style="width:100%;" @click="goDetail(title=='课程推荐'?'course':'picture',item.Id)">{{item.Title}}</p>
          <p class="price red">&yen;{{handleCurrentPrice(item.ObjectType, item)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList:[],
    }
  },
  props:['title'],
  mounted(){
    this.getlist()
  },
   methods: {
    getlist(){
      if(this.title=='课程推荐'){
        this.$http.post("/Content/Search", {
          cp: this.page,
          ps: this.pageSize,
          query: JSON.stringify({
            objectTypes: [107], //课程
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList;
          }
        })
      }else{
        this.$http.post("/Content/Search", {
          cp: this.page,
          ps: this.pageSize,
          query: JSON.stringify({
            objectTypes: [108], //课程
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList;
          }
        })
      }
    },
  }
}

</script>

<style lang='less'>

.course {
  width: 100%;
  overflow: hidden;

  .product-content {
    width: 1200px;
    margin: 0 auto;
  }
  .products {
    height: 256px;
    overflow: hidden;
  }

  .img-wrap {
    width: 254px;
    height: 252px;
    margin-top: 20px;
    overflow: hidden;
    margin-right: 60px;
    float: left;
  }
  .imgs {
    width:252px;
    height: 184px;
    border:1px solid #ddd;
    overflow: hidden;
    cursor:pointer;
  }

  .img-wrap:nth-child(4) {
    margin-right: 0;
  }

  .names {
    margin-top: 8px;
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    color: #333;
    overflow:hidden;
    text-overflow: ellipsis;
  }
  .price{
    /*color:@red-color;*/
  }
}

</style>
