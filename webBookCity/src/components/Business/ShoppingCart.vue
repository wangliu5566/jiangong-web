<template>
  <div class="shopping-page" :style="{minHeight:clientHeight+'px'}">
    <searchNoMenu></searchNoMenu>
    <div style="width:100%;background-color: #fff">
      <div class="shopp global-box">
        <span class="red-border"></span>
        <b>购物车</b>
      </div>
    </div>
    <div class='power-content' v-loading="loadings" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)">
      <div class="top-table-head">
        <div class="list-1 list">
          <el-checkbox style="margin:0 0 0 20px;" @change="handleCheckAllChange" v-model="selectAll">全选</el-checkbox>
        </div>
        <div class="list-2 list">商品名称</div>
        <div class="list-3 list">类型</div>
        <div class="list-4 list">单价</div>
        <div class="list-5 list" style="text-align: center;">数量</div>
        <div class="list-6 list">金额(元)</div>
        <div class="list-7 list">操作</div>
      </div>
      <!-- 电子资源 -->
      <p class="elec-title" v-if="ElecList.length>0">
        <el-checkbox style="margin:0" @change="changElecSelect" v-model="elecSelectAll">电子资源</el-checkbox>
      </p>
      <div style="overflow: hidden;" v-for="(item,index) in ElecList" v-if="ElecList.length>0">
        <div class="list-1 box-list">
          <el-checkbox v-model="item.checked" :key="item.Id" @change="elecSelect" v-if="item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.IsOnShelf"></el-checkbox>
          <div v-if="!(item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.IsOnShelf)" class="not-shelf">下架</div>
        </div>
        <div class="list-2 box-list">
          <div class="img-box" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
            <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.ObjectId)" :style="{backgroundImage:'url('+item.RelatedObject.Content.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
          </div>
          <p class="detail hover" @click="goDetail(getDetailPath(item.ObjectType),item.ObjectId)">
            {{item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.Title?item.RelatedObject.Content.Title:'-'}}</p>
          <p  class="detail-del">{{item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.ExtendData.SaleStrategy?'优惠活动：'+item.RelatedObject.Content.ExtendData.SaleStrategy:''}}</p>
        </div>
        <div class="list-3 box-list">
          <p>{{item.ObjectType==104?returnType(item.MediaType):confirmType(item.ObjectType)}}</p>
        </div>
        <div class="list-4 box-list">
          <p>&yen;{{item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.CurrentPrice?formatPrice(item.RelatedObject.Content.CurrentPrice,2):'0.00'}}</p>
        </div>
        <div class="list-5 box-list">
          <el-input-number size="small" v-model="item.Count" :min="1" :max="item.MediaType=='Elec'?1:99"></el-input-number>
        </div>
        <div class="list-6 box-list">
          <p class="figure"><b>&yen; <span>{{item.ExtendData&&item.ExtendData.TotalMoney?formatPrice(item.ExtendData.TotalMoney,2):'0.00'}}</span></b></p>
          <p class="reduce-price">{{item.ExtendData&&item.ExtendData.DiscountMoney&&item.ExtendData.DiscountMoney!="0"&&item.ExtendData.DiscountMoney!="0.0"&&item.ExtendData.DiscountMoney!="0.00"?'已减'+formatPrice(item.ExtendData.DiscountMoney,2)+'元':''}}</p>
        </div>
        <div class="list-7 box-list">
          <el-popover ref="popover5" placement="top" v-model="item.visible2" width="160" v-if="!!item.RelatedObject.Content.IsOnShelf">
            <p>移入收藏后，将不在购物车显示，是否继续操作？</p>
            <div style="text-align: right; margin: 10px 0 0 0 ">
              <el-button size="mini" type="text" @click="item.visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="cancleCollect(item)">确定</el-button>
            </div>
            <p class="hover" slot="reference">移入收藏</p>
          </el-popover>
          <p class="hover" @click="orderDelete(item.Id)">删除</p>
        </div>
      </div>
      <!-- 纸质图书 -->
      <p class="elec-title" v-if="PaperList.length>0">
        <el-checkbox style="margin:0" v-model="paperSelectAll" @change="changPaperSelect">纸质图书</el-checkbox>
      </p>
      <div style="overflow: hidden;" v-for="(item,index) in PaperList" v-if="PaperList.length>0">
        <div class="list-1 box-list">
          <el-checkbox v-model="item.checked" :key="item.Id" @change="PaperSelect" v-if="item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.IsOnShelf"></el-checkbox>
          <div v-if="!(item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.IsOnShelf)" class="not-shelf">下架</div>
        </div>
        <div class="list-2 box-list">
          <div class="img-box" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
            <div style="width:100%;height:100%;" @click="goDetail('book',item.ObjectId?item.ObjectId:'')" :style="{backgroundImage:'url('+item.RelatedObject.Content.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
          </div>
          <p class="detail hover" @click="goDetail('book',item.ObjectId?item.ObjectId:'')">
            {{item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.Title?item.RelatedObject.Content.Title:'-'}}</p>
          <p class="detail-del">{{item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.ExtendData.SaleStrategy?'优惠活动：'+item.RelatedObject.Content.ExtendData.SaleStrategy:''}}</p>
        </div>
        <div class="list-3 box-list">
          <p>{{item.ObjectType==104?returnType(item.MediaType):confirmType(item.ObjectType)}}</p>
        </div>
        <div class="list-4 box-list">
          <p>&yen;{{item.RelatedObject.Content?returnTypePrice(item.MediaType,item.RelatedObject.Content):'0.00'}}</p>
        </div>
        <div class="list-5 box-list" @click="updateShoppingCar(item.Id,item.SaleStrategyId)">
          <el-input-number size="small" :value="item.Count" :min="1" @change="updateCount"  :max="item.MediaType=='Elec'?1:99"></el-input-number>
        </div>
        <div class="list-6 box-list">
          <p class="figure"><b>&yen; <span>{{item.ExtendData&&item.ExtendData.TotalMoney?formatPrice(item.ExtendData.TotalMoney,2):'0.00'}}</span></b></p>
          <p class="reduce-price">{{item.ExtendData&&item.ExtendData.DiscountMoney&&item.ExtendData.DiscountMoney!="0"&&item.ExtendData.DiscountMoney!="0.0"&&item.ExtendData.DiscountMoney!="0.00"?'已减'+formatPrice(item.ExtendData.DiscountMoney,2)+'元':''}}</p>
        </div>
        <div class="list-7 box-list">
          <el-popover ref="popover5" placement="top" v-model="item.visible2" width="160" v-if="!!item.RelatedObject.Content.IsOnShelf">
            <p>移入收藏后，将不在购物车显示，是否继续操作？</p>
            <div style="text-align: right; margin: 10px 0 0 0 ">
              <el-button size="mini" type="text" @click="item.visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="cancleCollect(item)">确定</el-button>
            </div>
            <p class="hover" slot="reference">移入收藏</p>
          </el-popover>
          <p class="hover" @click="orderDelete(item.Id)">删除</p>
        </div>
      </div>
    </div>
    <!-- 总计价格 -->
    <div class="power-bottom global-box" v-if="tableData.length>0">
      <div class="power-bottom-con">
        <div class="aggregate">
          <p>总计(不含运费)：<span>&yen;{{formatPrice(elecTotalMoney+paperTotalMoney,2)}}</span></p>
          <p>{{elecDiscountMoney+elecDiscountMoney==0?'':'已节省:&yen;'+formatPrice(elecDiscountMoney+elecDiscountMoney,2)}}</p>
        </div>
        <div class="btn">
          <button @click="goPaidPageFn()" style="cursor:pointer;" :loading="paidLoading">结算</button>
        </div>
      </div>
    </div>
    <!-- 相关推荐 -->
    <div class="content-btm">
      <p>同类已购资源推荐</p>
      <ul>
        <li class="small-img" v-for="(item,index) in bookList">
          <div class="img-wrap" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
            <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{background:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
          </div>
          <p class="book-name names" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
          <p class="price-text">&yen;{{formatPrice(item.CurrentPrice,2)}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../common/SearchNoMenu.vue"
export default {
  data() {
    return {
      loadings: false,
      paidLoading: false,
      page: 1,
      pageSize: 9999,
      totalCount: 0,

      tableData: [],
      PaperList: [],
      ElecList: [],
      selectAll: false,
      allCheckedList: [],

      elecTotalMoney: 0,
      elecDiscountMoney: 0,
      elecSelectAll: false,

      paperTotalMoney: 0,
      papeDiscountMoney: 0,
      paperSelectAll: false,

      bookList: [],
      changeValue:'',
    }
  },
  props: ['clientHeight'],
  components: {
    searchNoMenu,
  },
  mounted() {
    this.getlist()
    this.getSameType()
  },
  methods: {
    //获取电子书的总价格
    getElecMoney() {
      this.elecTotalMoney = 0;
      this.ElecList.forEach((item) => {
        if (item.RelatedObject.Content.IsOnShelf && item.checked) {
          this.elecTotalMoney = this.elecTotalMoney + parseFloat(item.ExtendData.TotalMoney ? item.ExtendData.TotalMoney : 0)
          this.elecDiscountMoney = this.elecDiscountMoney + parseFloat(item.ExtendData.DiscountMoney ? item.ExtendData.DiscountMoney : 0)
        }
      })
    },
    //获取纸质书的总价格
    getPaperMoney() {
      this.paperTotalMoney = 0;
      this.PaperList.forEach((item) => {
        if (item.RelatedObject.Content.IsOnShelf && item.checked) {
          this.paperTotalMoney = this.paperTotalMoney + parseFloat(item.ExtendData.TotalMoney ? item.ExtendData.TotalMoney : 0)
          this.papeDiscountMoney = this.papeDiscountMoney + parseFloat(item.ExtendData.DiscountMoney ? item.ExtendData.DiscountMoney : 0)
        }
      })
    },
    //电子书的全选
    changElecSelect(val) {
      this.elecTotalMoney = 0;
      this.elecDiscountMoney = 0;
      if (val) {
        if (this.paperSelectAll || this.PaperList.length == 0) {
          this.selectAll = true;
        }
        this.ElecList.forEach((item, index) => {
          item.checked = true;
        })
        this.getElecMoney()
      } else {
        this.selectAll = false;
        this.ElecList.forEach((item, index) => {
          item.checked = false;
        })
      }
    },
    // 电子书单选
    elecSelect() {
      var count = 0;
      this.ElecList.forEach((item) => {
        if (item.checked) {
          count++;
        }
      })

      if (this.ElecList.length == count) {
        this.elecSelectAll = true;
        if (this.paperSelectAll || this.PaperList.length == 0) {
          this.selectAll = true;
        }
      } else {
        this.selectAll = false;
        this.elecSelectAll = false;
      }

      this.getElecMoney()
    },
    //纸质书的全选
    changPaperSelect(val) {
      this.paperTotalMoney = 0;
      this.papeDiscountMoney = 0;

      if (val) {
        if (this.elecSelectAll) {
          this.selectAll = true;
        }
        this.PaperList.forEach((item, index) => {
          item.checked = true;
        })

        this.getPaperMoney()
      } else {
        this.selectAll = false;
        this.PaperList.forEach((item, index) => {
          item.checked = false;
        })
      }
    },
    // 纸质书单选
    PaperSelect() {
      var count = 0;
      this.PaperList.forEach((item) => {
        if (item.checked) {
          count++;
        }
      })

      if (this.PaperList.length == count) {
        this.paperSelectAll = true;
        if (this.elecSelectAll || this.ElecList.length == 0) {
          this.selectAll = true;
        }
      } else {
        this.selectAll = false;
        this.paperSelectAll = false;
      }

      this.getPaperMoney()
    },
    //处理顶部的全选
    handleCheckAllChange(val) {
      if (val) {
        this.elecSelectAll = true;
        this.paperSelectAll = true;
      } else {
        this.paperSelectAll = false;
        this.elecSelectAll = false;
      }

      this.changElecSelect(val)
      this.changPaperSelect(val)

    },
    getlist() {
      this.loadings = true;
      this.$http.get("/ShoppingCart/List", {
          params: {
            cp: this.page,
            ps: this.pageSize,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.tableData = []
            this.PaperList = []
            this.ElecList = []
            res.data.Data.ItemList.forEach((item, index) => {
              item = Object.assign({}, item, { visible2: false, checked: false })
              this.tableData.push(item)
              if (item.ObjectType == 104 && item.MediaType != "Elec") {
                this.PaperList.push(item)
              } else {
                this.ElecList.push(item)
              }
            })
            this.totalCount = res.data.Data.RecordCount;
            this.elecTotalMoney = 0;
            this.elecDiscountMoney = 0;
            this.elecSelectAll=false;

            this.paperTotalMoney = 0;
            this.papeDiscountMoney= 0;
            this.paperSelectAll = false;
            this.selectAll = false;
            this.loadings = false;
          }
        })
    },
    /**
     * [getSameType 获取同类资源]
     * @Author   赵雯欣
     * @DateTime 2017-12-22
     * @return   {[type]}   [description]
     */
    getSameType() {
      this.$http.post("/Content/Search", {
          cp: 1,
          ps: 6,
          query: JSON.stringify({
            ObjectTypes: [104], //图书
            // SearchOrderBy: {
            //   ColumnName: this.bookType == 1 ? 'hot' : 'onShelfDate',
            //   Descending: true,
            // },
            // ExtendProperties: {
            //   readCount: 'startDate=' + this.calculateOneDate(0) + '@endTime=' + this.calculateOneDate(this.dateLength)
            // }
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.bookList = res.data.Data.ItemList;
          }
        })
    },
    /**
     * [updateShoppingCar 修改购物车]
     * @Author   赵雯欣
     * @DateTime 2017-12-21
     * @param    {[type]}   id    [description]
     * @param    {[type]}   count [description]
     * @return   {[type]}         [description]
     */
    updateCount(value) {
      this.changeValue = value
    },
    updateShoppingCar(id,SaleStrategyId){
      this.loadings = true;
      this.$http.post("/ShoppingCart/Update", {
          id: id,
          count: this.changeValue,
          saleStrategyId: SaleStrategyId,
        })
        .then((res) => {
          if (res.data.Success) {
            this.getlist()
          }
        })
    },
    /**
     * [cancleCollect 移入收藏]
     * @Author   赵雯欣
     * @DateTime 2018-01-17
     * @param    {[type]}   obj [description]
     * @return   {[type]}       [description]
     */
    cancleCollect(obj) {
      obj.visible2 = false;
      this.$http.post("/ShoppingCart/Delete", {
          ids: obj.Id
        })
        .then((res) => {
          if (res.data.Success) {
            this.$store.dispatch('getShoppingCount');
            this.collectFn(obj.ObjectId, obj.ObjectType, true, this.getlist)
          }
        })
    },
    /**
     * [goPaidPage 跳转确认订单页面]
     * @Author   赵雯欣
     * @DateTime 2017-12-20
     * @return   {[type]}   [description]
     */
    goPaidPageFn() {
      this.paidLoading = true;
      var hasPaper = 0;
      var hasEle = 0;
      var checkedCount = 0;
      this.allCheckedList = []

      this.tableData.forEach((item, index) => {
        if (item.checked&&(item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.IsOnShelf)) {
          checkedCount++;
          this.allCheckedList.push(item)
        }
      })
      if (checkedCount == 0) {
        this.$message.warning('请选择商品')
      } else {

        this.allCheckedList.forEach((item, index) => {
          if (item.ObjectType == 104 && item.MediaType != 'Elec') {
            hasPaper++;
          } else {
            hasEle++;
          }
        })
        this.paidLoading = false;
        if (hasEle > 0 && hasPaper == 0) { //调到电子书确认页面
          localStorage.shoppingObj = JSON.stringify(this.allCheckedList)
          this.$router.push('/wrap/elePaid')

        } else { //调到纸质书确认页面
          localStorage.shoppingObj = JSON.stringify(this.allCheckedList)
          this.$router.push('/wrap/paperPaid')
        }
      }
    },
    /**
     * [orderDelete 删除订单]
     * @Author   赵雯欣
     * @DateTime 2017-12-21
     * @param    {[type]}   id [description]
     * @return   {[type]}      [description]
     */
    orderDelete(id) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletefn(id)
      })
    },
    deletefn(id) {
      this.$http.post("/ShoppingCart/Delete", {
          ids: id
        })
        .then((res) => {
          if (res.data.Success) {
            this.$message.success('删除成功!');
            this.$store.dispatch('getShoppingCount');
            this.getlist()
          }
        })
    }
  },
}

</script>
<style lang='less'>
@red-color: #e71515;
.shopping-page {
  width: 100%;
  min-width: 1200px;
  overflow: hidden;
  background-color: #f2f2f2;

  .not-shelf {
    width: 40px;
    height: 24px;
    line-height: 24px;
    background-color: #999;
    color: white;
    text-align: center;
    border-radius: 4px;
    margin: 30px 0 0 20px;
    font-size: 14px;
    overflow: hidden;
  }

  .shopp {
    overflow: hidden;
    width: 1200px;
    line-height: 50px;
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
  .reduce-price {
    color: #e71617;
    font-size: 14px;
  }
  .figure {
    font-size: 16px;
    color: #333;
    margin-bottom: 6px;
  }

  /*列表*/
  .power-content {
    width: 1160px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px 20px 10px 20px;
    background-color: #fff;
    overflow: hidden;
  }

  .top-table-head {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #666;
    overflow: hidden;
    background-color: #f2f2f2;
  }

  .list {
    float: left;
    overflow: hidden;
    color: #333;
    font-size: 14px;
  }

  .list-1 {
    width: 100px;
  }
  .el-checkbox {
    margin: 30px 0 0 40px;
  }

  .list-2 {
    width: 410px;
  }
  .list-3 {
    width: 110px;
  }

  .list-4 {
    width: 125px;
    font-size: 14px;
  }

  .list-5 {
    width: 135px;
    padding-right: 40px;
  }
  .list-6 {
    width: 160px;
  }

  .list-7 {
    width: 80px;
  }

  .elec-title {
    font-size: 14px;
    color: #666;
    line-height: 44px;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 20px;
    padding-left: 20px;
  }

  .box-list {
    float: left;
    height: 126px;
    padding-top: 20px;
    overflow: hidden;
    margin-bottom: 10px;
    color: #333;
    font-size: 14px;
    line-height: 30px;
    background-color: #f2f2f2;
    overflow: hidden;

    .img-box {
      float: left;
      width: 85px;
      height: 107px;
      margin-right: 10px;
      border: 1px solid #ddd;
      cursor: pointer;
    }
    .detail {
      float: right;
      width: 280px;
      font-size: 16px;
      line-height: 30px;
      margin-right: 20px;
      height: 80px;
    }
    .detail-del{
      color: #e71617;
      float: right;
      width: 280px;
      font-size: 14px;
      margin-right: 20px;
    }
  }

  .el-input__inner {
    padding-left: 10px;
    padding-right: 10px;
  }

  .el-input-number__decrease {
    width: 20px;
  }

  .el-input-number__increase {
    width: 20px;
  }

  .power-bottom {
    height: 64px;
    .power-bottom-con {
      float: right;
      width: 380px;
      .aggregate {
        float: left;
        font-size: 14px;
        color: #7e7e7e;
        text-align: right;
        p {
          margin-top: 13px;
        }
        span {
          font-size: 18px;
          font-weight: 600;
          color: #e71617;
        }
      }
      .btn {
        margin-top: 10px;
        float: right;
        button {
          width: 168px;
          height: 45px;
          border: none;
          border-radius: 5px;
          background: #e71617;
          color: #fff;
          font-size: 18px;
          outline: none;
        }
      }
    }
  }
  /*资源推荐*/
  .content-btm {
    background: #fff;
    padding: 20px 30px 0;
    width: 1140px;
    height: 306px;
    margin: 20px auto;
    overflow: hidden;
    ul {
      overflow: hidden;
      .small-img:nth-child(6) {
        margin-right: 0;
      }
      .small-img {
        margin-top: 20px;
        float: left;
        width: 140px;
        height: 245px;
        margin-right: 59px;
        .img-wrap {
          width: 100%;
          height: 180px;
          border: 1px solid #ddd;
          cursor: pointer;
        }
      }
      .book-name {
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 10px;
        color: #464646;
      }
      .price-text {
        margin-top: 5px;
        color: #e71617;
      }
    }
  }
}

</style>
