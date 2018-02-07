<template>
  <div class="shopping-page">
    <searchNoMenu></searchNoMenu>
    <div style="width:100%;background-color: #fff">
      <div class="shopp global-box">
        <span class="red-border"></span>
        <b>购物车</b>
      </div>
    </div>
    <div v-if="!noContent" class='power-content' v-loading="loadings" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)">
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
        <div class="list-2 box-list" style="position: relative;">
          <div class="img-box" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
            <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.ObjectId)" :style="{backgroundImage:'url('+item.RelatedObject.Content.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
          </div>
          <p class="detail">
            <span class="hover" @click="goDetail(getDetailPath(item.ObjectType),item.ObjectId)"> {{item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.Title?item.RelatedObject.Content.Title:'-'}}</span>
          </p>
          <div v-if="getSaleStrategy(item.RelatedObject.Content.ExtendData)" class="detail-del">
            <el-popover placement="top" v-for="(item,index) in getSaleStrategy(item.RelatedObject.Content.ExtendData)" trigger="hover" :key="index" :open-delay="500" :content="item.Description">
              <span slot="reference" style="padding:4px 10px;margin-right: 10px;cursor: pointer;">
                {{item.Title}}
              </span>
            </el-popover>
          </div>
          
         <!--  <el-popover placement="top" v-for="(item,index) in SaleStrategy" title="" trigger="hover" :key="index" :open-delay="500" :content="item.Description">
          <p class="detail-del">{{item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.ExtendData.SaleStrategyDescription?'优惠活动：'+item.RelatedObject.Content.ExtendData.SaleStrategyDescription:''}}</p>
           </el-popover> -->
        </div>
        <div class="list-3 box-list">
          <p>{{confirmType(item.ObjectType,item.MediaType)}}</p>
        </div>
        <div class="list-4 box-list">
          <p>&yen;{{returnTypePrice(item.MediaType,item.RelatedObject.Content)}}</p>
        </div>
        <div class="list-5 box-list" @click="updateShoppingCar(item.Id,index,1,item.checked)">
          <el-input-number size="small" v-model="item.Count" :min="1" :max="99" @change="updateCount"></el-input-number>
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
        <div class="list-2 box-list" style="position: relative;">
          <div class="img-box" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
            <div style="width:100%;height:100%;" @click="goDetail('book',item.ObjectId?item.ObjectId:'')" :style="{backgroundImage:'url('+item.RelatedObject.Content.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
          </div>
          <p class="detail">
            <span class="hover" @click="goDetail('book',item.ObjectId?item.ObjectId:'')">{{item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.Title?item.RelatedObject.Content.Title:'-'}}</span>
          </p>
          <div v-if="getSaleStrategy(item.RelatedObject.Content.ExtendData)" class="detail-del">
            <el-popover placement="top" v-for="(item,index) in getSaleStrategy(item.RelatedObject.Content.ExtendData)" trigger="hover" :key="index" :open-delay="500" :content="item.Description">
              <span slot="reference" style="padding:4px 10px;margin-right: 10px;cursor: pointer;">
                {{item.Title}}
              </span>
            </el-popover>
          </div>
          <!-- <p class="detail-del">{{item.RelatedObject&&item.RelatedObject.Content&&item.RelatedObject.Content.ExtendData.SaleStrategyDescription?'优惠活动：'+item.RelatedObject.Content.ExtendData.SaleStrategyDescription:''}}</p> -->
        </div>
        <div class="list-3 box-list">
          <p>{{confirmType(item.ObjectType,item.MediaType)}}</p>
        </div>
        <div class="list-4 box-list">
          <p>&yen;{{item.RelatedObject.Content?returnTypePrice(item.MediaType,item.RelatedObject.Content):'0.00'}}</p>
        </div>
        <div class="list-5 box-list" @click="updateShoppingCar(item.Id,index,2,item.checked)">
          <el-input-number size="small" :value="item.Count" :min="1" @change="updateCount" :max="99"></el-input-number>
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
    <div class="power-bottom global-box" v-if="!noContent">
      <p style="margin-top: 20px;overflow: hidden;width: 400px;float: left;font-size: 14px;color:#606266">
        <el-checkbox style="margin:0 0 0 20px;" @change="handleCheckAllChange" v-model="selectAll">全选</el-checkbox>
        <span class="hover" style="margin-left: 15px;" @click="doMySelects('del')">删除</span>
        <span class="hover" style="margin-left: 15px;" @click="doMySelects('collectAndDel')">移入收藏</span>
      </p>
      <div class="power-bottom-con">
        <div class="aggregate">
          <p>总计(不含运费)： <span>&yen;{{formatPrice(totalMoney,2)}}</span></p>
          <p>已节省： &yen;{{formatPrice(DiscountMoney,2)}}</p>
        </div>
        <div class="btn">
          <button @click="goPaidPageFn()" style="cursor:pointer;" :loading="paidLoading">结算</button>
        </div>
      </div>
    </div>
    <div class="shopping-no-content" v-if="noContent">
      <p class="ti1">您的购物车还是空的，赶紧行动吧！您可以：
        <span @click="goPath('index')">去看看&gt;</span>
      </p>
    </div>
    <!-- 相关推荐 -->
    <div class="content-btm">
      <p style="line-height: 50px;border-bottom: 1px solid #e6e6e6;font-weight: bold;">
        <span class="red-border"></span>精选资源推荐
      </p>
      <ul>
        <li class="small-img" v-for="(item,index) in bookList">
          <div class="img-wrap" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
            <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{background:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
          </div>
          <p class="book-name names" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
          <p class="price-text">&yen;{{handleCurrentPrice(item.ObjectType, item)}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../common/SearchNoMenu.vue"
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      loadings: false,
      paidLoading: false,
      noContent: false,
      page: 1,
      pageSize: 9999,

      selectAll: false,

      PaperList: [],
      ElecList: [],

      allElecIds: [],
      elecIds: [],
      elecSelectAll: false,

      allPaperIds: [], //所有的实体书id
      paperIds: [], //勾选的实体书id
      paperSelectAll: false,

      totalMoney: 0,
      DiscountMoney: 0,

      bookList: [], //推荐资源
      changeValue: '', //保存购物车数量
    }
  },
  components: {
    searchNoMenu,
  },
  computed: mapGetters([
    'shoppingCount',
    'hasLogin'
  ]),
  mounted() {
    this.getlist() //获取列表
  },
  methods: {
    getSaleStrategy(obj){
      if(obj.SaleStrategy&&obj.SaleStrategy!=''){
        return JSON.parse(obj.SaleStrategy)
      }else{
        return false;
      }

    },
    /**
     * [getBottomMoney 从后台获取总价格]]
     * @Author   赵雯欣
     * @DateTime 2018-01-25
     * @return   {[type]}         [description]
     */
    getBottomMoney() {
      this.$http.post("/Order/CalcTotalAmount", {
          shoppingCartIds: this.elecIds.concat(this.paperIds).join(',')
        })
        .then((res) => {
          if (res.data.Success) {
            this.totalMoney = res.data.Data.TotalMoney;
            this.DiscountMoney = res.data.Data.DiscountAmount;
          }
        })
    },
    //电子书的全选
    changElecSelect(val) { //控制是否计算总价,不传要计算价格，传了证明不要总价
      this.elecIds = []
      if (val) {
        if (this.paperSelectAll || this.PaperList.length == 0) {
          this.selectAll = true;
        }
        this.elecIds = this.allElecIds
      } else {
        this.selectAll = false;
        this.elecIds = []
      }
      this.getBottomMoney()

      this.ElecList.forEach((item, index) => {
        item.checked = val;
      })
    },
    // 电子书单选
    elecSelect() {
      this.elecIds = [];
      this.ElecList.forEach((item) => {
        if (item.checked) {
          this.elecIds.push(item.Id)
        }
      })

      if (this.ElecList.length == this.elecIds.length) {
        this.elecSelectAll = true;
        if (this.paperSelectAll || this.PaperList.length == 0) {
          this.selectAll = true;
        }
      } else {
        this.selectAll = false;
        this.elecSelectAll = false;
      }
      this.getBottomMoney()
    },
    //纸质书的全选
    changPaperSelect(val) {
      this.paperIds = []
      if (val) {
        if (this.elecSelectAll || this.ElecList.length == 0) {
          this.selectAll = true;
        }
        this.paperIds = this.allPaperIds
      } else {
        this.selectAll = false;
        this.paperIds = [];
      }
      this.getBottomMoney()

      this.PaperList.forEach((item, index) => {
        item.checked = val;
      })
    },
    // 纸质书单选
    PaperSelect() {
      this.paperIds = []
      this.PaperList.forEach((item) => {
        if (item.checked) {
          this.paperIds.push(item.Id)
        }
      })

      this.getBottomMoney()
      if (this.PaperList.length == this.paperIds.length) {
        this.paperSelectAll = true;
        if (this.elecSelectAll || this.ElecList.length == 0) {
          this.selectAll = true;
        }
      } else {
        this.selectAll = false;
        this.paperSelectAll = false;
      }

    },
    //处理顶部的全选
    handleCheckAllChange(val) {
      if (val) {
        this.elecIds = this.allElecIds;
        this.paperIds = this.allPaperIds;
        this.elecSelectAll = true;
        this.paperSelectAll = true;
        this.changPaperSelect(true)
        this.changElecSelect(true)
      } else {
        this.paperIds = []
        this.elecIds = []
        this.paperSelectAll = false;
        this.elecSelectAll = false;
        this.changPaperSelect(false)
        this.changElecSelect(false)
      }
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
          this.loadings = false;
          if (res.data.Success) {
            this.PaperList = [];
            this.ElecList = [];
            res.data.Data.ItemList.forEach((item, index) => {
              item = Object.assign({}, item, { visible2: false, checked: false })
              if (item.ObjectType == 104 && item.MediaType != "Elec") { //实体书
                this.PaperList.push(item);
                this.allPaperIds.push(item.Id);
              } else { //电子资源
                this.ElecList.push(item);
                this.allElecIds.push(item.Id);
              }
            })
            if (this.PaperList.length > 0 || this.ElecList.length > 0) {
              this.noContent = false;
            } else {
              this.noContent = true
            }

            this.getSameType() //获取同类资源

            this.elecSelectAll = false;
            this.paperSelectAll = false;
            this.selectAll = false;
            this.totalMoney = 0;
            this.DiscountMoney = 0;
          } else if (res.data.Code == 14) {
            this.$message.error(res.data.Description)
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
      this.$http.get("/Content/Recommend", {
          params: {
            objectId: this.ElecList.length > 0 ? this.ElecList[0].ObjectId : this.PaperList.length > 0 ? this.PaperList[0].ObjectId : '',
            count: 6,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.bookList = res.data.Data;
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
    updateShoppingCar(id, index, type, checked) { //type：1是电子书，2是实体书
      this.$http.post("/ShoppingCart/Update", {
          id: id,
          count: this.changeValue,
        })
        .then((res) => {
          if (res.data.Success) {
            res.data.Data.checked = checked;
            if (type == 1) {
              this.$set(this.ElecList, index, res.data.Data);
            } else if (type == 2) {
              this.$set(this.PaperList, index, res.data.Data);
            }

            this.getBottomMoney();
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
      this.shoppingCollect(obj.ObjectId, obj.MediaType, obj.Id)
    },
    // 收藏
    shoppingCollect(objectIds, objectTypes, shoppings) {
      this.$http.post('/Favorite/CreateOrUpdate', {
          state: true,
          objectIds: objectIds,
          objectTypes: objectTypes
        })
        .then((res) => {
          if (res.data.Success) {
            this.deletefn(shoppings)
          } else {
            this.$message.error(res.data.Description)
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
      var ObjectIds = [];

      this.ElecList.forEach((item, index) => {
        if (item.checked && (item.RelatedObject && item.RelatedObject.Content && item.RelatedObject.Content.IsOnShelf)) {
          checkedCount++;
          ObjectIds.push(item.Id)
          if (item.ObjectType == 104 && item.MediaType != 'Elec') {
            hasPaper++;
          } else {
            hasEle++;
          }
        }
      })

      this.PaperList.forEach((item, index) => {
        if (item.checked && (item.RelatedObject && item.RelatedObject.Content && item.RelatedObject.Content.IsOnShelf)) {
          checkedCount++;
          ObjectIds.push(item.Id)
          if (item.ObjectType == 104 && item.MediaType != 'Elec') {
            hasPaper++;
          } else {
            hasEle++;
          }
        }
      })

      this.paidLoading = false;
      if (checkedCount == 0) {
        this.$message.warning('请选择商品')
      } else {
        if (hasEle > 0 && hasPaper == 0) { //调到电子书确认页面
          this.$router.push({ path: '/wrap/elePaid', query: { ObjectIds: ObjectIds.join(',') } })

        } else { //调到纸质书确认页面
          this.$router.push({ path: '/wrap/paperPaid', query: { ObjectIds: ObjectIds.join(',') } })
        }
      }
    },
    //多选操作
    doMySelects(type) {
      var checkedCount = 0;
      var ObjectType = [];
      var ObjectId = []
      this.ElecList.forEach((item, index) => {
        if (item.checked && (item.RelatedObject && item.RelatedObject.Content && item.RelatedObject.Content.IsOnShelf)) {
          checkedCount++;
          ObjectType.push(item.ObjectType)
          ObjectId.push(item.ObjectId)
        }
      })

      this.PaperList.forEach((item, index) => {
        if (item.checked && (item.RelatedObject && item.RelatedObject.Content && item.RelatedObject.Content.IsOnShelf)) {
          checkedCount++;
          ObjectType.push(item.ObjectType)
          ObjectId.push(item.ObjectId)
        }
      })
      if (checkedCount > 0) {
        if (type == 'del') { //多选删除
          this.orderDelete(this.elecIds.concat(this.paperIds).join(','))
        } else if (type == "collectAndDel") {
          this.shoppingCollect(ObjectId.join(','), ObjectType.join(','), this.elecIds.concat(this.paperIds).join(','))
        }
      } else {
        this.$message.warning('请选择商品')
      }
    },
    /**
     * [orderDelete 删除订单]
     * @Author   赵雯欣
     * @DateTime 2017-12-21
     * @param    {[type]}   id [description]
     * @return   {[type]}      [description]
     */
    orderDelete(shoppingIds) {
      this.$confirm('此操作将删除这些商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletefn(shoppingIds)
      })
    },
    deletefn(shoppingIds) {
      this.$http.post("/ShoppingCart/Delete", {
          ids: shoppingIds
        })
        .then((res) => {
          if (res.data.Success) {
            var NewElecList = new Array()
            this.ElecList.forEach((item, index) => {
              if (shoppingIds.toString().indexOf(item.Id) < 0) {
                NewElecList.push(item)
                // this.ElecList.splice(index, 1)
              }
            })

            this.ElecList = NewElecList

            var NewElecIds = []
            this.elecIds.forEach((item, index) => {
              if (shoppingIds.toString().indexOf(item) > -1) {
                NewElecIds.push(item)
                // this.elecIds.splice(index, 1)
              }
            })

            this.elecIds = NewElecIds;

            if (this.elecIds == this.ElecList.length) {
              this.elecSelectAll = true;
              if (this.paperSelectAll || this.PaperList.length == 0) {
                this.selectAll = true;
              }
            }

            var NewPaperList = []
            this.PaperList.forEach((item, index) => {
              if (shoppingIds.toString().indexOf(item.Id) < 0) {
                NewPaperList.push(item)
                // this.PaperList.splice(index, 1)
              }
            })
            this.PaperList = NewPaperList

            var NewPaperIds = []
            this.paperIds.forEach((item, index) => {
              if (shoppingIds.toString().indexOf(item) > -1) {
                // this.paperIds.splice(index, 1)
                NewPaperIds.push(item)
              }
            })

            this.paperIds = NewPaperIds;

            if (this.paperIds == this.PaperList.length) {
              this.paperSelectAll = true;
              if (this.elecSelectAll || this.ElecList.length == 0) {
                this.selectAll = true;
              }
            }
            this.getBottomMoney();
            this.$message.success('操作成功!');
            this.$store.dispatch('getShoppingCount');
          }
        })
    },
  },
  watch: {
    'shoppingCount': function(val) {
      if (val == 0) {
        this.noContent = true;
      }
    }
  }
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

  .shopping-no-content {
    width: 750px;
    margin: 20px auto 0;
    height: 357px;
    padding-left: 450px;
    background: url('../../../static/images/noshopping.png') no-repeat #fff;
    background-position: 120px 88px;
    overflow: hidden;
    color: #333;

    .ti1 {
      font-size: 20px;
      font-weight: bold;
      margin-top: 165px;
    }

    span {
      color: #e71515;
      cursor: pointer;
      border-bottom: 1px solid #e71515;
    }
  }

  /*列表*/
  .power-content {
    width: 1160px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px 20px 10px 20px;
    background-color: #fff;
    overflow: hidden;
    min-height: 120px;
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
    overflow: hidden;
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
    overflow: hidden;
  }

  .list-5 {
    width: 135px;
    padding-right: 40px;
    overflow: hidden;
  }
  .list-6 {
    width: 160px;
    overflow: hidden;
  }

  .list-7 {
    width: 80px;
    overflow: hidden;
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
    margin-bottom: 10px;
    color: #333;
    font-size: 14px;
    line-height: 30px;
    background-color: #f2f2f2;

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
      line-height: 28px;
      margin-right: 20px;
      height: 80px;
      overflow: hidden;
    }
    .detail-del {
      color: #e71617;
      width: 500px;
      font-size: 14px;
      position: absolute;
      top: 100px;
      left: 110px;
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
    padding: 0 20px;
    width: 1160px;
    height: 326px;
    margin: 20px auto;
    overflow: hidden;
    ul {
      overflow: hidden;
      height: 274px;
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
