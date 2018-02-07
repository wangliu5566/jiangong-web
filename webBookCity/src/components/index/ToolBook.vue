<template>
  <div class="standard">
    <searchNoMenu :sendObj="sendObj"></searchNoMenu>
    <div class='power-content'>
      <div class="aside-left">
        <ul>
          <li v-for="(item,index) in menuList" :class="index==menuIndex?'active':''" @click="clickMenu(index,item.Id)">{{item.Title}}</li>
        </ul>
        <relateRes :ObjectTypes="104"></relateRes>
      </div>
      <!-- 子导航 -->
      <div class="aside-right" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)" style="min-height: 300px;">
        <div class="subnav" id="controlSize">
          <el-button class="myBtn1" :class="btnsIndex==1?'red-active':''" @click="changeBtnsIndex(1,'soldCount')">销量</el-button>
          <el-button class="myBtn" :class="btnsIndex==2?'red-active':''" @click="changeBtnsIndex(2,'onShelfDate',isOnShelfDescend)">上架时间
            <i class="el-icon-sort-down" v-if="isOnShelfDescend"></i>
            <i class="el-icon-sort-up" v-if="!isOnShelfDescend"></i>
          </el-button>
          <el-button class="myBtn" :class="btnsIndex==3?'red-active':''" @click="changeBtnsIndex(3,'publishDate',publishDateDescend)">出版时间
            <i class="el-icon-sort-down" v-if="publishDateDescend"></i>
            <i class="el-icon-sort-up" v-if="!publishDateDescend"></i>
          </el-button>
          <el-button class="myBtn" :class="btnsIndex==4?'red-active':''" @click="changeBtnsIndex(4,'readCount',readCountDescend)">阅读量
            <i class="el-icon-sort-down" v-if="readCountDescend"></i>
            <i class="el-icon-sort-up" v-if="!readCountDescend"></i>
          </el-button>
          <el-button class="myBtn" :class="btnsIndex==5?'red-active':''" @click="changeBtnsIndex(5,'currentPrice',currentPriceDescend)">价格
            <i class="el-icon-sort-down" v-if="currentPriceDescend"></i>
            <i class="el-icon-sort-up" v-if="!currentPriceDescend"></i>
          </el-button>
          <el-input v-model="lowerPrice" style="width:50px;height: 30px;margin-left: 10px;"></el-input>
          -
          <el-input v-model="heighterPrice"  style="width:50px;height: 30px;"></el-input>
          <el-button class="myBtn1" @click="changeBtnsIndex(6,'price')">确定</el-button>
          <span class="line-1" style="left: 417px;"></span>
          <span class="price-1" style="left:430px;">&yen;</span>
          <span class="price-2" style="left: 498px;">&yen;</span>
          <span class="float-span">
             每页显示：
          <span @click="changePageSize(0,20)" :class="pageIndex==0?'red14':''">20</span>
          <span @click="changePageSize(1,50)" :class="pageIndex==1?'red14':''">50</span>
          <!-- <span @click="changePageSize(2,80)" :class="pageIndex==2?'red14':''">80</span> -->
          <span @click="showImg(2)" :class="showListOrImg==2?'active':''">
            <i class="el-icon-menu" style="font-size: 17px;"></i> 大图
          </span>
          <span @click="showImg(1)" :class="showListOrImg==1?'active':''">
            <i class="el-icon-tickets" style="font-size: 17px;"></i>
          列表</span>
          </span>
        </div>
        <!-- 内容 -->
        <ul id="imgWrap" v-if="showListOrImg==2&&dataList.length>0">
          <li v-for="(item,index) in dataList">
            <div class="leftImg" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
              <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
            </div>
            <div class="right-word ml20">
              <p class="names hover" style="width:100%;margin-bottom: 3px;font-size: 18px;color:#333;line-height: 20px;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
              <p>作者：{{item.Author?item.Author.length>10?item.Author.slice(0,10)+'...':item.Author:'-'}}</p>
              <p>出版日期：{{item.PublishDate?item.PublishDate.slice(0,10):'-'}}</p>
              <p>征订号：{{item.ExtendData&&item.ExtendData.SubscriptionNumber?item.ExtendData.SubscriptionNumber:'-'}}</p>
              <p>ISBN：{{item.ExtendData&&item.ExtendData.Isbn?item.ExtendData.Isbn:'-'}}</p>
              <p style="margin-top:5px">
                <span class="price" style="margin-right: 15px;font-size: 18px;">&yen;{{formatPrice(item.CurrentPrice)}}</span>
                <span class="market-price">&yen;{{formatPrice(item.MarketPrice)}}</span>
              </p>
              <!--   <div :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" style="background-position:0 9px;height:30px;line-height: 30px;" @click="collectFn(item,index,changeIsFavorited)">收藏</div> -->
              <div style="width: 160px;margin-top:2px;">
                <el-row>
                  <el-col :span="12">
                    <p :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" @click="collectFn(item,index,changeIsFavorited)" style="background-position: 0 7px;height:25px;line-height: 25px;">收藏</p>
                  </el-col>
                  <el-col :span="12">
                    <div class="shopping-car" v-if="showShoppingIcon(item)" @click="addShopping(item)" style="background-position: 0 6px;height:25px;line-height: 25px;">购物车</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </li>
        </ul>
        <!-- 展示列表 -->
        <div class="list-detail" v-if="showListOrImg==1&&dataList.length>0">
          <div class="div-wrap" v-for="item in dataList">
            <div class="left-div">
              <div class="leftImg" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
              </div>
              <div class="left-word-list">
                <p class="hover" style="height: 70px;font-size: 18px;color:#333" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
                <p>作者：{{item.Author?item.Author.length>100?item.Author.slice(0,100)+'...':item.Author:'暂无'}}</p>
                <!-- <p>出版社：{{item.Publisher?item.Publisher:'-'}}</p> -->
                <p>出版日期：{{item.PublishDate?item.PublishDate.slice(0,10):'-'}}</p>
                <p>征订号：{{item.ExtendData&&item.ExtendData.SubscriptionNumber?item.ExtendData.SubscriptionNumber:'-'}}</p>
                <p>ISBN：{{item.ExtendData&&item.ExtendData.Isbn?item.ExtendData.Isbn:'-'}}</p>
              </div>
            </div>
            <div class="right-con">
              <p style="margin-top: 90px;text-align: center;line-height: 40px;">
                <span class="price" style="margin-right: 20px;">&yen;{{handleCurrentPrice(item.ObjectType, item)}}</span>
                <span class="market-price">&yen;{{handleMarketPrice(item.ObjectType, item)}}</span>
              </p>
              <!-- <div style="width: 65px;margin:0 auto;">
                <p :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" @click="collectFn(item,index,changeIsFavorited)" style="background-position: 0">收藏</p>
              </div> -->
              <div style="width: 130px;margin:0 auto;">
                <el-row>
                  <el-col :span="12">
                    <p :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" @click="collectFn(item,index,changeIsFavorited)" style="width:45px;background-position: 0 4px;padding-left: 14px;">收藏</p>
                  </el-col>
                  <el-col :span="12">
                    <div class="shopping-car" v-if="showShoppingIcon(item)" @click="addShopping(item)" style="background-position: 0 2px">购物车</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <div v-if="noContent" style="overflow: hidden;padding:140px 310px;">
          <img src="../../../static/images/no_detail.png" height="60" width="311">
        </div>
        <div class="page mt20">
          <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../common/Search.vue"
import relateRes from "./relateRes.vue"

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      noContent: false,
      sendObj: {
        word: '工具书',
        index: 6
      },
      bookType: 1, //1是畅销榜单,2是新书榜单
      menuList: [],
      menuIndex: 0,
      menuId: '',

      page: 1,
      pageSize: 20,
      totalCount: 0,
      pageIndex: 0,
      dataList: [],

      showListOrImg: 2,

      btnsIndex: 989,
      SearchWord: '',
      lowerPrice: '',
      heighterPrice: '',

      isOnShelfDescend: true,
      publishDateDescend: true,
      readCountDescend: true,
      currentPriceDescend: true,
    }
  },
  components: {
    searchNoMenu,
    relateRes,
  },
  computed: mapGetters([
    'loginModal',
    'callbackAfterLogin',
  ]),
  mounted() {
    this.getMenulist('ToolBook', this.getMenu)
    this.getlist()
  },
  methods: {
     changeIsFavorited(index){
      this.dataList[index].ExtendData.IsFavorited = true ;
      this.$set(this.dataList,index,this.dataList[index])
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlist()
    },
    /**
     * [getMenulist 获取菜单]
     * @Author   赵雯欣
     * @DateTime 2017-12-19
     * @return   {[type]}   [description]
     */
    getMenu(menuList) {
      this.menuList = menuList
    },
    /**
     * [clickMenu 点击左边菜单栏]
     * @Author   赵雯欣
     * @DateTime 2017-12-19
     * @param    {[type]}   index [description]
     * @param    {[type]}   id    [description]
     * @return   {[type]}         [description]
     */
    clickMenu(index, id) {
      this.menuIndex = index;
      this.menuId = id;
      this.getlist()
    },
    getlist(Descending) {
      this.loading = true;

      var SearchOrderBy = {};
      if (this.SearchWord != 'price'&&this.SearchWord!='') {
        SearchOrderBy = {
          SearchOrderBy: {
            ColumnName: this.SearchWord,
            Descending: Descending!=undefined?Descending:true,
          }
        }
      }

      var currentPrice={};
      if (this.lowerPrice != '' && this.heighterPrice != '') {
        currentPrice = {
          currentPrice:this.lowerPrice + '@' + this.heighterPrice
        }
      }

      var CategoryIds={};
      if (this.menuId != '') {
        CategoryIds = {
          CategoryIds:[this.menuId]
        }
      }

      this.$http.post("/Content/Search", {
          cp: this.page,
          ps: this.pageSize,
          query: JSON.stringify(Object.assign({},CategoryIds,{
            objectTypes: [104], //图书
            
            ExtendProperties: Object.assign({},{
              IsOnShelf: true,
            },currentPrice)
          },SearchOrderBy))
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList;
            this.totalCount = res.data.Data.RecordCount;
            this.loading = false;
            if (this.dataList.length == 0) {
              this.noContent = true;
            } else {
              this.noContent = false;
            }
          }
        })
    },
    /**
     * [changeBtnsIndex 点击btn]
     * @Author   赵雯欣
     * @DateTime 2017-12-19
     * @return   {[type]}   [description]
     */
    changeBtnsIndex(index, SearchWord,Descending) {
      if(index==2){
        this.isOnShelfDescend = !Descending;
      }else if(index==3){
        this.publishDateDescend = !Descending;
      }else if(index==4){
        this.readCountDescend = !Descending;
      }else if(index==5){
        this.currentPriceDescend = !Descending;
      }
      // if(index<6){
      this.btnsIndex = index;
      this.SearchWord = SearchWord;
      this.getlist(!Descending)
      // }else if(index==6){  //搜索价格区间

      // }
      // 
    },
    /**
     * [showImg  切换大图或者列表]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @param    {[type]}   index [1是展示列表，2是展示大图]
     * @return   {[type]}         [description]
     */
    showImg(index) {
      this.showListOrImg = index;
    },
    changePageSize(index, pageSize) {
      this.pageIndex = index;
      this.pageSize = pageSize;
      this.getlist()
    },
  },
  watch: {
    'loginModal': function(val, oldVal) {
      if (!val && this.callbackAfterLogin.position == 'index') {
        if (this.callbackAfterLogin.callback == 'indexCollect') {
          this.collectFn(this.callbackAfterLogin.id, this.callbackAfterLogin.ObjectType, true, this.getlist)
        } else if (this.callbackAfterLogin.callback == 'indexAddShopping') {
          this.addShopping(this.callbackAfterLogin.item)
        }
      }
    }
  }
}

</script>
<style lang='less'>
@red-color: #e71715;
.standard {
  overflow: hidden;

  .power-content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  #controlSize {
    .myBtn {
      padding: 8px 0 8px 10px;
      border-radius: 0!important;
      margin-left: 5px!important;
    }
    .myBtn1 {
      padding: 8px 15px;
      border-radius: 0!important;
    }

    .active {
      border-color: @red-color;
      color: @red-color;
    }
    .el-input__inner {
      height: 32px;
      border-radius: 0!important;
    }
  }

  /*展示列表*/
  .list-detail {
    overflow: hidden;

    .div-wrap {
      width: 936px;
      height: 250px;
      border: 1px solid #e6e6e6;
      overflow: hidden;
      margin: 22px auto 8px;
      font-size: 14px;
      color: #666;
    }

    .left-div {
      margin-bottom: 20px;
      width: 716px;
      overflow: hidden;
      float: left;
    }

    .leftImg {
      float: left;
      width: 140px;
      height: 212px;
      border: 1px solid #ddd;
      margin: 20px;
      cursor: pointer;
    }

    .left-word-list {
      width: 515px;
      height: 212px;
      margin: 20px 0;
      line-height: 30px;
      float: left;
    }

    .right-con {
      width: 220px;
      height: 252px;
      box-sizing: border-box;
      border-left: 1px solid #e6e6e6;
      text-align: center;
      float: left;
    }
  }

  /*展示大图*/
  #imgWrap {
    overflow: hidden;

    li:nth-child(2n+1) {
      margin-right: 75px;
    }
    li:nth-child(2n) {
      margin-left: 75px;
    }

    li {
      width: 394px;
      float: left;
      margin: 20px 0;
      height: 184px;
      color: #464646;

      .leftImg {
        float: left;
        width: 140px;
        height: 184px;
        border: 1px solid #ddd;
        cursor: pointer;
      }

      .right-word {
        width: 230px;
        overflow: hidden;
        float: left;
        height: 184px;
        color: #666;
        font-size: 14px;
        line-height: 24px;

        span:nth-child(2) {
          text-decoration: line-through;
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
}

</style>
