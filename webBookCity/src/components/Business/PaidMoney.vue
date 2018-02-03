<template>
  <div class="paid-confirm">
    <searchNoMenu></searchNoMenu>
    <div style="overflow: hidden;">
      <div class="shopp global-box mt20 ">
        <span class="red-border"></span>
        <b style="font-size: 18px;">支付</b>
      </div>
    </div>
    <div class="shopping">
      <div class='global-box' style="margin-top: 20px;">
        <!-- 中间信息 -->
        <div class="middle-box">
          <!-- 支付方式 -->
          <div class="pay-method">
            <p>支付方式</p>
            <div style="margin-top: 50px;">
              <div class="wenxin-btn" :class="hasBGpic==1?'has-bgi':''" @click='changePaidMethod(1)'>
                <div class="wenxins"></div>
                微信
              </div>
              <div class="paid-btn" :class="hasBGpic==2?'has-bgi':''" @click='changePaidMethod(2)'>
                <div class="paids"></div>
                支付宝
              </div>
            </div>
          </div>
          <!-- 商品信息 -->
          <div class="goods-info">
            <p style="font-weight: bold;font-size: 16px;line-height: 20px;margin-bottom: 25px;">商品金额</p>
            <p>商品金额：<span>&yen;{{orderObj.TotalMoney?formatPrice(orderObj.TotalMoney,2):'0.00'}}</span></p>
            <p>运费：<span>&yen;{{orderObj.ExtendData&&orderObj.ExtendData.Freight?formatPrice(orderObj.ExtendData.Freight,2):'0.00'}}</span></p>
            <p>促销优惠：<span>- &yen;{{orderObj.ExtendData&&orderObj.ExtendData.DiscountMoney?formatPrice(orderObj.ExtendData.DiscountMoney,2):'0.00'}}</span></p>
            <p>合计：<span class="red">&yen;{{orderObj.TotalMoney?formatPrice(orderObj.TotalMoney,2):'0.00'}}</span></p>
          </div>
          <!-- 支付按钮一栏 -->
          <div class="pay-btn">
            <p style="font-weight: bold;font-size: 16px;line-height: 20px;margin-bottom: 60px;">应付总额：</p>
            应付总额：<span style="font-size: 30px;font-weight: bold;color:#e71515;margin-left: 15px;">&yen;{{orderObj.TotalMoney?formatPrice(orderObj.TotalMoney,2):'0.00'}}</span>
          </div>
          <div style="text-align: center;position: absolute;bottom: 60px;width: 1160px;">
            <el-button type="primary" @click="PaidFn()" style="padding:12px 66px;font-size: 18px;">支付</el-button>
          </div>
        </div>
        <!-- 相关推荐 -->
        <div class="shopp-bottom">
          <p style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;">
            <span class="red-border"></span>同类已购资源推荐
          </p>
          <ul>
            <li class="small-img" v-for="(item,index) in dataList">
              <div class="img-box" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
              </div>
              <p class="names" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
              <p class="price-text">&yen;{{formatPrice(item.CurrentPrice,2)}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../common/SearchNoMenu.vue"
export default {
  data() {
    return {
      orderObj: {},
      dataList: [],
      hasBGpic: 1,
    }
  },
  components: {
    searchNoMenu,
  },
  mounted() {
    this.getDetail()
    this.getlist()
  },
  methods: {
    getDetail() {
      this.$http.get("/Order/Detail", {
          params: {
            id: this.$route.query.orderId
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.orderObj = res.data.Data
          }
        })
    },
    /**
     * [PaidFn 支付]
     * @Author   王柳
     * @DateTime 2017-12-25
     */
    PaidFn() {
      this.$http.post("/Pay/Execute", {
          orderId: this.$route.query.orderId,
          userid: JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id ? JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id : '',
        })
        .then((res) => {
          if (res.data.Success) {
            this.$message.success('支付成功')
            this.$router.push({ path: '/wrap/paymentAccomplish', query: { orderId: this.$route.query.orderId } })
          } else {
            // this.$message.error(res.data.Des) 
          }
        })
    },
    // goOrderDetail() {
    //   this.$router.push({ path: 'OrderDetail', query: { orderId: this.$route.query.orderId } })
    // },
    getlist() {
      this.$http.post("/Content/Search", {
          cp: 1,
          ps: 6,
          query: JSON.stringify({
            objectTypes: [104], //图书
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList;
            this.totalCount = res.data.Data.RecordCount;
          }
        })
    },
    /**
     * [changePaidMethod 切换支付方式]
     * @Author   王柳
     * @DateTime 2017-12-26
     * @param    {[type]}   index [description]
     * @return   {[type]}         [description]
     */
    changePaidMethod(index) {
      this.hasBGpic = index;
    }
  },

}

</script>
<style lang='less'>
@red-color: #e71515;
.paid-confirm {
  width: 100%;
  .shopping {
    width: 100%;
    background: #f2f2f2;
    overflow: hidden;
  }

  .shopp {
    overflow: hidden;
    height: 35px;
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .red-border {
    position: relative;
    top: 3px;
    display: inline-block;
    margin-right: 10px;
    width: 8px;
    height: 20px;
    background: #e71515;
  }
  /*中间内容*/
  .middle-box {
    background-color: #fff;
    width: 1160px;
    height: 300px;
    overflow: hidden;
    padding: 30px 20px;
    margin-bottom: 20px;
    position: relative;
  }
  .pay-method,
  .goods-info,
  .pay-btn {
    float: left;
    height: 165px;
    width: 33%;
  }
  /*支付方式一栏*/
  .pay-method {
    width: 360px;
    font-size: 16px;
    font-weight: bold;
    font-size: 16px;
  }

  .wenxin-btn,
  .paid-btn {
    float: left;
    width: 70px;
    padding-left: 70px;
    height: 50px;
    border: 1px solid #e6e6e6;
    margin-right: 20px;
    line-height: 50px;
    cursor: pointer;
    position: relative;
  }

  .wenxins {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 5px;
    left: 20px;
    background: url('../../../static/images/weixing.png') no-repeat;
  }

  .paids {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 5px;
    left: 20px;
    background: url('../../../static/images/zhifubao.png') no-repeat;
  }

  .has-bgi {
    border: none;
    height: 52px;
    background: url('../../../static/images/kuangda.png') no-repeat;
  }

  .wenxin-btn:hover,
  .paid-btn:hover {
    border-color: @red-color;
    color: @red-color;
  }

  /*商品信息一栏*/
  .goods-info {
    overflow: hidden;
    width: 160px;
    padding-left: 60px;
    padding-right: 150px;
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    font-size: 14px;
    color: #333;
    line-height: 32px;
    span {
      float: right;
    }
  }
  .pay-btn {
    padding-left: 60px;
    width: 340px;
    overflow: hidden;
  }

  .shopp-bottom {
    overflow: hidden;
    width: 1160px;
    margin: 20px 0;
    padding:10px 20px 0;
    height: 316px;
    line-height: 40px;
    background: #fff;
    .small-img {
      display: inline-block;
      width: 140px;
      height: 240px;
      margin-right: 64px;
      .img-box {
        width: 100%;
        height: 180px;
        border: 1px solid #ddd;
        cursor: pointer;
      }
    }
    .small-img:nth-child(6){
      margin-right: 0;
    }
    .price-text {
      color: #e71617;
      line-height: 30px;
    }
  }
}

</style>
