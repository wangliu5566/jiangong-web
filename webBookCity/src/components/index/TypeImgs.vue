<template>
  <div class="type-imgs">
    <div class="leftImg" @click="preImg()">
      <img v-if="isRight" src="../../../static/images/left_normal.png" style="width:100%;">
      <img v-if="!isRight" src="../../../static/images/left_hover.png" style="width:100%;">
    </div>
    <div class="box-wrap">
      <ul class="ul-wrap" id="ul-wrap">
        <li v-for="item in MenuContentList">
          <div class="imgs" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
            <div style="width: 100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center',backgroundImage:'url('+item.CoverUrl+')'}"></div>
          </div>
          <p class="names" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
          <p class="price red">&yen;{{handleCurrentPrice(item.ObjectType, item)}}</p>
        </li>
      </ul>
    </div>
    <div class="rightImg" @click="nextImg()">
      <img v-if="!isRight" src="../../../static/images/reight_normal.png" style="width:100%;">
      <img v-if="isRight" src="../../../static/images/reight_hover.png" style="width:100%;">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isRight: true,
    }
  },
  mounted() {
    var Ele = document.getElementById('ul-wrap')
    Ele.style.left = '0px';
    this.isRight = true;
  },
  props: ['MenuContentList'],
  methods: {
    nextImg() {
      if (this.isRight) {
        var Ele = document.getElementById('ul-wrap')
        this.isRight = false;
        Ele.style.left = '-800px';
      }
    },
    preImg() {
      if (!this.isRight) {
        var Ele = document.getElementById('ul-wrap')
        Ele.style.left = '0px';
        this.isRight = true;
      }
    },
  }
}

</script>
<style lang='less'>
@red-color: #e71515;
.type-imgs {
  .leftImg,
  .box-wrap,
  .rightImg {
    float: left;
  }
  .leftImg,
  .rightImg {
    width: 44px;
    height: 44px;
    padding: 15px;
    margin-top: 75px;
    cursor: pointer;
  }
  .box-wrap {
    width: 743px;
    height: 240px;
    overflow: hidden;
    position: relative;

    .ul-wrap {
      width: 1550px;
      height: 100%;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;

      li {
        float: left;
        width: 140px;
        height: 269px;
        margin-right: 60px;
        overflow: hidden;
        cursor: pointer;
      }

      li:nth-child(8) {
        margin-right: 0
      }
      .imgs {
        width: 138px;
        height: 178px;
        border: 1px solid #ddd;
      }
      .names {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #464646;
        overflow: hidden;
      }

      .names:hover{
        color:@red-color;
      }
      .price {
        width: 100%;
        height: 30px;
        overflow: hidden;
      }
    }
  }
}

</style>
