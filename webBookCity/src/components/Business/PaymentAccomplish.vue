<template>
  <div class="paid-success">
    <searchNoMenu></searchNoMenu>
    <div class="shopping1">
      <div class="shopp global-box mt20">
        <span class="red-border"></span>
        <b style="font-size: 18px;">支付</b>
      </div>
    </div>
    <div class="shopping">
      <div class='global-box' style="padding-bottom: 56px;margin-top: 20px;">
        <div class='power-content'>
          <div>
            <h4>
              <img src="../../../static/images/gou12.png">
              支付成功
            </h4>
            <p>
              <el-button plain v-if="hasEleContent" @click="$router.push('/wrap/Myshop')">阅读资源</el-button>
              <el-button plain @click="goOrderDetail()">查看订单</el-button>
              <el-button plain @click="goPath('index')">返回首页</el-button>
            </p>
          </div>
        </div>
        <!-- 相关推荐 -->
        <div class="recommend">
          <div class="shopp-bottom">
            <p style="line-height: 50px;border-bottom: 1px solid #e6e6e6;font-weight: bold;">
              <span class="red-border"></span>同类已购资源推荐
            </p>
            <ul style="overflow: hidden;margin-top: 20px;">
              <li class="small-img" v-for="(item,index) in dataList">
                <div class="img-box" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
                <p class="names" style="margin: 5px 0 2px;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
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
export default {
  data() {
    return {
      dataList: [],
      hasEleContent: false,

      orderList: [],
      page: 1,
      pageSize: 10,
      totalCount: 0,
    }
  },
  components: {
    searchNoMenu,
  },
  mounted() {
    this.getOrderDetail()
    this.getlist()
  },
  methods: {
    goOrderDetail() {
      this.$router.push('/wrap/myOrder')
    },
    /**
     * [getOrderList 获取订单列表]
     * @Author   赵雯欣
     * @DateTime 2018-01-08
     * @return   {[type]}   [description]
     */
    getOrderDetail() {
      this.$http.get("/Order/Detail", {
          params: {
            id: this.$route.query.orderId
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.orderList = res.data.Data.OrderDetails;
            this.orderList.forEach((item) => {
              if (item.MediaType == "Elec" || item.MediaType == "MediumPic") {
                this.hasEleContent = true;
              }
            })
          }
        })
    },
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
    /**
     * [isReadFn 阅读资源]
     * @Author   赵雯欣
     * @DateTime 2018-01-08
     * @return   {Boolean}  [description]
     */
    // isReadFn() {
    //   if (this.orderList.length > 1) {
    //     this.$router.push("/wrap/Myshop")
    //   } else {  //直接阅读
    //     this.getContentDetail(this.orderList[0].ObjectId)
    //   }
    // },
    /**
     * [getOrderDetail 获取内容详情]
     * @Author   赵雯欣
     * @DateTime 2018-01-08
     * @return   {[type]}   [description]
     */
    // getContentDetail(id) {
    //   this.$http.get("/Content/Detail", {
    //       params: {
    //         id: id
    //       }
    //     })
    //     .then((res) => {
    //       if (res.data.Success) {
    //         this.readMydata(res.data.Data)
    //       }
    //     })
    // },
    //跳转悦读
    // readMydata(data) {
    //   if (data.AuthorizeUrl) {
    //     this.$http({
    //       url: '',
    //       baseURL: data.AuthorizeUrl,
    //       method: 'post',
    //       data: {
    //         extId: data.ExternalId,
    //         authorizeToken: data.ExtendData.AuthorizeToken,
    //         appId: 7
    //       }
    //     }).then((res) => {
    //       if (res.data.Success) {
    //         this.readMyResource(data.DefaultFileExtension, data.Id, data.ObjectType, res.data.Data)
    //       } else {
    //         this.$message({
    //           message: res.data.Description,
    //           type: 'warning'
    //         })
    //       }
    //     })
    //   } else {
    //     this.$message({
    //       message: '资源错误',
    //       type: 'warning'
    //     })
    //   }
    // },
  },

}

</script>
<style lang='less'>
.paid-success {
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
  .power-content {
    margin-top: 20px;
    height: 447px;
    background: #fff;
    &>div {
      margin: 0 auto;
      padding-top: 110px;
      width: 490px;
      height: 220px;
      &>h4 {
        text-align: center;
        font-size: 30px;
        &>img {
          position: relative;
          margin-right: 20px;
          top: 25px;
          width: 77px;
          height: 77px;
        }
      }
      &>p {
        text-align: center;
        margin-top: 150px;
        font-size: 20px;
        &>.el-button {
          border-radius: 7px;
          width: 150px;
          height: 42px;
        }
      }
    }
  }
  .recommend {
    background: #fff;
    .shopp-bottom {
      margin: 20px 20px 0;
      height: 326px;
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
      
      .price-text {
        color: #e71617;
      }
    }
  }

  #myModal {
    .el-dialog__header {
      border-bottom: 1px solid #ddd;
    }
    .el-dialog__body {
      padding: 30px 90px 0 90px;
    }
    .boxs {
      height: 210px;
      float: left;
      margin-right: 30px;
      margin-bottom: 30px;

      .el-button {
        padding: 7px 20px;
      }
    }
    .boxs:nth-child(5n) {
      margin-right: 0;
    }
    .boxs:last-child {
      margin-right: 0;
    }
    .img-box {
      width: 138px;
      height: 138px;
      border: 1px solid #ddd;
      cursor: pointer;
    }
  }
}

</style>
