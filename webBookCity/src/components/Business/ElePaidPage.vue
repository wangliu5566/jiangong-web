<template>
  <div class="elec-paid">
    <searchNoMenu></searchNoMenu>
    <p class="global-box mt20 sub-title">
      <span class="red-border"></span>
      <span>确认订单</span>
    </p>
    <div class="con-box" v-loading="loadings" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)">
      <!-- 商品信息 -->
      <div class="global-box power-content">
        <h5 style="border-bottom: 1px solid #e6e6e6;line-height: 48px;">确认订单信息</h5>
        <p style=";font-weight: 400;margin-top:15px;">电子资源</p>
        <template>
          <el-table :data="tableData" style="width: 100%;margin-top: 20px" :header-row-class-name="tableRowClassName">
            <el-table-column label="" width="15">
              <template slot-scope='scope'>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="goodsName">
              <template slot-scope='scope'>
                <p>{{scope.row.RelatedObject&&scope.row.RelatedObject.Content&&scope.row.RelatedObject.Content.Title?scope.row.RelatedObject.Content.Title:'-'}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品类型" width="170">
              <template slot-scope='scope'>
                <p>{{confirmType(scope.row.ObjectType,scope.row.MediaType)}}</p>
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
           <!--  <el-table-column align="center" prop="onSale" label="优惠" width="170">
              <template slot-scope='scope'>
                <p>&yen;{{scope.row.ExtendData&&scope.row.ExtendData.DiscountMoney?formatPrice(scope.row.ExtendData.DiscountMoney,2):'0.00'}}</p>
              </template>
            </el-table-column> -->
            <el-table-column align="center" label="小计" width="120">
              <template slot-scope='scope'>
                <p>&yen;{{scope.row.ExtendData&&scope.row.ExtendData.TotalMoney?formatPrice(scope.row.ExtendData.TotalMoney,2):'0.00'}}</p>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!-- 去支付 -->
      <div class="global-box power-content">
        <div class="go-pay">
          <p style="margin-top: 15px;">商品金额：<span>&yen;{{formatPrice(OriginalTotalMoney,2)}}</span></p>
          <p>促销优惠：<span>- &yen;{{formatPrice(DiscountMoney,2)}}</span></p>
          <div class="line"></div>
          <p>合计：<span class="red-word">&yen;{{formatPrice(totalMoney,2)}}</span></p>
          <p class="mt20">应付总额：
            <b class="red-word total">&yen;{{formatPrice(totalMoney,2)}}</b>
            <el-button type="primary" @click="PaidFn()" style="padding:12px 30px" :loading="paidLoading">去支付</el-button>
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
      loadings: true,
      tableData: [],
      totalMoney: 0,
      DiscountMoney: 0,
      OriginalTotalMoney:0,
      selectIdsArr:[],

      paidLoading: false,
      shoppingCartIdsArr: [],
      objectIdsArr: [],
      countsArr: [],
      objectTypesArr: [],
      MediaType: [],
    }
  },
  components: {
    searchNoMenu,
  },
  mounted() {
    var ObjectIds = this.$route.query.ObjectIds.toString()
    
    this.getlist() //获取资源
  },
  methods: {
    /**
     * [getlist 根据购物车Id拿回相关数组]
     * @Author   赵雯欣
     * @DateTime 2018-01-25
     * @return   {[type]}   [description]
     */
    getlist() {
      this.loadings = true;
      this.$http.get("/ShoppingCart/List", {
          params: {
            ids:this.$route.query.ObjectIds.toString(),
            cp: this.page,
            ps: this.pageSize,
          }
        })
        .then((res) => {
          this.loadings = false;
          if (res.data.Success) {
            this.tableData = res.data.Data.ItemList;
            res.data.Data.ItemList.forEach((item, index) => {
                //为支付和计算总价做准备
                this.shoppingCartIdsArr.push(item.Id)
            })
            if(this.tableData.length>0){
              this.getTotalMoney() //计算总价
            }else{
              this.$router.push('/wrap/noContent')
            }

          } else if (res.data.Code == 14) {
            this.$message.error(res.data.Description)
          }
        })
    },
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
      this.loadings = true;
      this.$http.post("/Order/CalcTotalAmount", {
          shoppingCartIds: this.shoppingCartIdsArr.join(','),
        })
        .then((res) => {
          this.loadings = false;
          if (res.data.Success) {
            this.totalMoney = res.data.Data.TotalMoney
            this.DiscountMoney = res.data.Data.DiscountAmount
            this.OriginalTotalMoney = res.data.Data.OriginalTotalMoney;
            this.loadings = false;
          }
        })
    },
    /**
     * [PaidFn 生成订单并跳转支付页面]
     * @Author   赵雯欣
     * @DateTime 2017-12-26
     */
    PaidFn() {
      this.paidLoading = true;
      this.$http.post("/Order/Create", {
          shoppingCartIds: this.shoppingCartIdsArr.join(','),
        })
        .then((res) => {
          if (res.data.Success) {
            var orderId = res.data.Data;
            this.paidLoading = false;
            this.$router.push({ path: '/wrap/paid', query: { orderId: orderId } })
          } else {
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
        border: 1px solid #ebeef5;
        border-bottom: none;
      }

      .el-table__header {
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
