<template>
  <div class="resource">
    <div class="product-content">
      <div class="content-title">
        <span class="red-border"></span>
        <span class="title">行业相关资源</span>
      </div>
      <div class="menus">
        <span v-for="(item,index) in dataList" :class="type==index?'click-this':''" @click="changeType(index,item.Id)" >{{item.Title}}</span>
        <span></span>
      </div>
      <div class="index-wrap">
        <div class="left-word">{{showObj.Description?showObj.Description.length>115?showObj.Description.slice(0,115)+'...':showObj.Description:''}}</div>
        <div class="right-imgs">
          <div class="imgs" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;" v-for="item in showList">
            <div style="width:108px;height:138px;"  :style="{backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center',backgroundImage:'url('+item.CoverUrl+')'}" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 0,
      dataList:[],
      showObj:{},
      showList:[],
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    changeType(index) {
      this.type = index;
      this.showObj = this.dataList[index]
      this.showList = this.dataList[index].ApiContentList;
    },
    getlist(){
      this.$http.get("/Aqr/List", {
        params: {
          isGetContent: true,
        }
      })
      .then((res) => {
        if (res.data.Success) {
          this.dataList = res.data.Data;
          this.showObj = this.dataList[0]
          this.showList = this.dataList[0].ApiContentList
        }
      })
    }
  }
}

</script>
<style lang='less'>
.resource {
  width: 100%;

  .product-content {
    width: 1200px;
    margin: 0 auto;
  }

  .content-title {
    border: none;
  }

  .menus {
    height: 40px;
    line-height: 39px;
    font-size: 16px;
    color: #333;
    overflow: hidden;

    span {
      width: 220px;
      height: 38px;
      text-align: center;
      border: 1px solid #ddd;
      background-color: #ebebeb;
      border-left: none;
      cursor: pointer;
      display: block;
      float: left;
    }

    span:nth-child(1){
      border-left: 1px solid #dedede;
    }
     span:nth-child(4){
      width: 534px;
      background-color: #fff;
      border: 1px solid #fff;
      border-bottom: 1px solid #ddd;
      cursor: default;
    }
    
    .click-this {
      background-color: #fff;
      border-bottom: 1px solid #fff
    }
  }

  .index-wrap {
    border: 1px solid #dedede;
    border-top:none;
    padding: 20px 30px;
    overflow:hidden;
    width: 1138px;
  }

  .left-word {
    width: 370px;
    float: left;
    margin-right: 48px;
    line-height: 28px;
    font-size: 14px;
    color:#666;
  }
  .right-imgs {
    float: left;
    width: 720px;
  }

  .imgs {
    width: 110px;
    height: 140px;
    float: left;
    border:1px solid #ddd;
    margin-right: 30px;
    cursor:pointer;
  }
  .imgs:nth-child(5){
    margin-right: 0;
  }
}

</style>
