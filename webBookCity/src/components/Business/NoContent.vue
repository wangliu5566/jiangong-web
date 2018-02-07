<template>
  <div class="no-content-page">
    <searchNoMenu></searchNoMenu>
    <div class="shopping1">
      <div class="shopp global-box mt20">
        <span class="red-border"></span>
        <b style="font-size: 18px;">提交订单</b>
      </div>
    </div>
    <div class="shopping">
      <div class='global-box' style="padding-bottom: 56px;margin-top: 20px;">
        <!-- 上面提示 -->
        <div class='power-content'>
          <p class="ti1">对不起，您已经从购物车购买过此商品，请勿重复提交</p>
          <p class="p-bottom">返回：
            <span @click="$router.push('/wrap/myOrder')">我的订单</span>
            <span class="lines">|</span>
            <span @click="goPath('index')">首页</span>
            <span class="lines">|</span>
            <span @click="goPath('center')">个人中心</span>
          </p>
        </div>
        <!-- 相关推荐 -->
        <div class="recommend">
          <div class="shopp-bottom">
            <p>同类已购资源推荐</p>
            <ul>
              <li class="small-img" v-for="(item,index) in dataList">
                <div class="img-box" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
                <p class="names" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
                <p class="price-text">&yen;{{handleCurrentPrice(item.ObjectType, item)}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../common/SearchNoMenu.vue"
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      dataList: [],
    }
  },
   computed: mapGetters([
    'hasLogin'
  ]),
  components: {
    searchNoMenu,
  },
  mounted() {
    this.getlist()
  },
  methods: {
    /**
     * [getlist 获取同类资源]
     * @Author   赵雯欣
     * @DateTime 2018-01-08
     * @return   {[type]}   [description]
     */
    getlist() {
      this.$http.get("/Content/Recommend", {
          params: {
            objectId: '',
            count: 6,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data;
          }
        })
    },
  },

}

</script>
<style lang='less'>
.no-content-page {
  width: 100%;
  .shopping {
    width: 100%;
    background: #f2f2f2;
    overflow: hidden;
  }
  .content-btm {
    width: 100%;
    padding-bottom: 50px;
    background: #f2f2f2;
  }
  .shopp {
    overflow: hidden;
    line-height: 55px;
    background: #fff;
    height: 55px;
    width: 1200px;
    margin: 0 auto;
    &>.red-border {
      position: relative;
      top: 3px;
      display: inline-block;
      margin-right: 10px;
      width: 8px;
      height: 20px;
      background: #e71515;
    }
  }
  .power-content {
    margin-top: 20px;
    height: 357px;
    padding-left: 420px;
    background: url('../../../static/images/chongfu.png') no-repeat #fff;
    background-position: 60px 80px;
    overflow: hidden;
    color: #333;


    .ti1 {
      font-size: 20px;
      font-weight: bold;
      margin-top: 130px;
    }
    .p-bottom {
      line-height: 50px;

      span{
        cursor: pointer;
      }
      span:first-child{
       color:#e71515;
      }
    }

    .lines {
      margin: 0 10px;
      cursor: default;
      color: #b3b3b3;
    }
  }
  .recommend {
    background: #fff;
    &>.shopp-bottom {
      margin: 20px 20px 0;
      height: 326px;
      &>p {
        height: 70px;
        line-height: 70px;
      }
      .small-img {
        display: inline-block;
        width: 140px;
        height: 240px;
        margin-right: 50px;
        .img-box {
          width: 100%;
          height: 180px;
          border: 1px solid #ddd;
          cursor: pointer;
        }
      }
      .book-name {
        height: 20px;
        overflow: hidden;
        margin-top: 10px;
        color: #464646;
      }
      .price-text {
        margin-top: 10px;
        color: #e71617;
      }
    }
  }
}
</style>
