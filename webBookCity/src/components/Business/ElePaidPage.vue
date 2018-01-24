<template>
  <div class="elec-paid" :style="{minHeight:clientHeight+'px'}">
    <searchNoMenu></searchNoMenu>
    <p class="global-box mt20 sub-title">
      <span class="red-border"></span>
      <span>确认订单</span>
    </p>
    <div class="con-box" :style="{minHeight:(clientHeight-237)+'px'}">
      <!-- 商品信息 -->
      <div class="global-box power-content">
        <h5 style="border-bottom: 1px solid #e6e6e6;line-height: 48px;">确认订单信息</h5>
        <p style=";font-weight: 400;margin-top:15px;">电子资源</p>
        <template>
          <el-table :data="tableData" style="width: 100%;margin-top: 20px" :header-row-class-name="tableRowClassName">
            <el-table-column  label="" width="15">
              <template slot-scope='scope'>
              </template>
            </el-table-column>
            <el-table-column  label="商品名称" prop="goodsName">
              <template slot-scope='scope'>
                <p>{{scope.row.RelatedObject&&scope.row.RelatedObject.Content&&scope.row.RelatedObject.Content.Title?scope.row.RelatedObject.Content.Title:'-'}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品类型" width="170">
              <template slot-scope='scope'>
                <p>{{scope.row.ObjectType==104?returnType(scope.row.MediaType):confirmType(scope.row.ObjectType)}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="oldPrice" label="价格" width="170">
              <template slot-scope='scope'>
                <p>&yen;{{scope.row.Price?formatPrice(scope.row.Price,2):'0.00'}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="num" label="数量" width="120">
              <template slot-scope='scope'>
                <p>{{scope.row.Count?scope.row.Count:'-'}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="onSale" label="优惠" width="170">
              <template slot-scope='scope'>
                <p>&yen;{{scope.row.ExtendData&&scope.row.ExtendData.DiscountMoney?formatPrice(scope.row.ExtendData.DiscountMoney,2):'0.00'}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="小计" width="120">
              <template slot-scope='scope'>
                <p>&yen;{{scope.row.Price&&scope.row.Count?formatPrice(scope.row.Price*scope.row.Count,2):'0.00'}}</p>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!-- 去支付 -->
      <div class="global-box power-content">
        <div class="go-pay">
          <p style="margin-top: 15px;">商品金额：<span>&yen;{{TotalMoney?formatPrice(TotalMoney,2):'0.00'}}</span></p>
          <p>促销优惠：<span>- &yen;{{formatPrice(DiscountMoney,2)}}</span></p>
          <div class="line"></div>
          <p>合计：<span class="red-word">&yen;{{TotalMoney?formatPrice(TotalMoney,2):'0.00'}}</span></p>
          <p class="mt20">应付总额：
            <b class="red-word total">&yen;{{TotalMoney?formatPrice(TotalMoney,2):'0.00'}}</b>
            <el-button type="primary" @click="PaidFn()" style="padding:12px 30px"  :loading="paidLoading">去支付</el-button>
          </p>
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
      paidLoading:false,
      tableData: [],
      TotalMoney: 0,
      DiscountMoney: 0,
    }
  },
  components: {
    searchNoMenu,
  },
  props: ['clientHeight'],
  mounted() {
    if (!!localStorage.shoppingObj) {
      this.tableData = JSON.parse(localStorage.shoppingObj)
      console.log(this.tableData)
      this.getTotalMoney()
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'head-row';
      }
      return '';
    },
    /**
     * [getTotalMoney 获取总价]
     * @Author   赵雯欣
     * @DateTime 2017-12-26
     * @return   {[type]}   [description]
     */
    getTotalMoney() {
      if (this.tableData.length > 0) {
        this.tableData.forEach((item, index) => {
          this.TotalMoney = this.TotalMoney + parseFloat(item.ExtendData && item.ExtendData.TotalMoney ? item.ExtendData.TotalMoney : 0)
          this.DiscountMoney = this.DiscountMoney + parseFloat(item.ExtendData && item.ExtendData.DiscountMoney ? item.ExtendData.DiscountMoney : 0)
        })
      }
    },
    /**
     * [PaidFn 生成订单并跳转支付页面]
     * @Author   赵雯欣
     * @DateTime 2017-12-26
     */
    PaidFn() {
      this.paidLoading = true;
      var shoppingCartIdsArr = []
      var objectIdsArr = []
      var countsArr = []
      var objectTypesArr = [];
      var MediaType =[]
      this.tableData.forEach((item, index) => {
        shoppingCartIdsArr.push(item.Id)
        objectIdsArr.push(item.ObjectId)
        countsArr.push(item.Count)
        objectTypesArr.push(item.ObjectType)
        MediaType.push(item.MediaType)
      })

      this.$http.post("/Order/Create", {
          objectIds: objectIdsArr.join(','),
          objectTypes: objectTypesArr.join(','),
          counts: countsArr.join(','),
          shoppingCartIds: shoppingCartIdsArr.join(','),
          mediaTypes: MediaType.join(',')
        })
        .then((res) => {
          if (res.data.Success) {
            var orderId = res.data.Data;
            this.paidLoading = false;
            this.$router.push({ path: '/wrap/paid', query: { orderId: orderId } })
          }else{
            this.$message.error(res.data.Description)
          }
        })
    }
  },

}

</script>
<style lang='less'>
.red-word {
  color: #e71515;
}

.elec-paid {
  width: 100%;
  min-width: 1200px;
  overflow: hidden;

  /*确认订单*/
  .sub-title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    padding-bottom: 10px;
    .red-border {
      position: relative;
      top: 3px;
      display: inline-block;
      margin-right: 10px;
      width: 8px;
      height: 20px;
      background: #e71515;
    }
  }
  /*内容*/
  .con-box {
    width: 100%;
    background: #f2f2f2;
    padding-bottom: 40px;
    overflow: hidden;
    .power-content {
      margin-top: 20px;
      background: #fff;
      padding: 0 20px 20px;
      overflow: hidden;

      .el-table {
        border:1px solid #ebeef5;
        border-bottom: none;
      }

      .el-table__header{
        width: 1199px!important;
      }

      h5 {
        font-size: 16px;
        color: #333;
        &>span {
          float: right;
          font-size: 14px;
          font-weight: normal;
          color: #1565b5;
        }
      }
      .go-pay {
        padding-right: 10px;
        text-align: right;
        height: 211px;
        line-height: 32px;
        overflow: hidden;

        span {
          display: inline-block;
          width: 100px;
        }
        b {
          margin: 0 20px;
          font-size: 24px;
        }
        .line {
          margin: 20px 0 5px;
          height: 1px;
          background: #e7e7e7;
        }
      }
    }
  }
}

</style>
