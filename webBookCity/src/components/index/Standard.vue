<template>
  <div class="standard">
    <searchNoMenu :sendObj="sendObj"></searchNoMenu>
    <div class='power-content'>
      <div class="aside-left">
        <ul>
          <li v-for="(item,index) in menuList" :class="index==menuIndex?'active':''" @click="clickMenu(index,item.Id)">{{item.Title}}</li>
        </ul>
        <relateRes :ObjectTypes="103">></relateRes>
      </div>
      <!-- 子导航 -->
      <div class="aside-right">
        <div class="subnav" id="controlSize">
          <el-button class="myBtn1" @click="choiceList(0,'sellConnt')" :class="btnIndex==0?'active':''">销量
            <!-- <i class="el-icon-sort-down"></i> -->
          </el-button>
          <el-button class="myBtn" @click="choiceList(1,'onShelfDate')" :class="btnIndex==1?'active':''">上架时间
            <i class="el-icon-sort-down"></i>
          </el-button>
          <el-button class="myBtn" @click="choiceList(2,'publishDate')" :class="btnIndex==2?'active':''">出版时间
            <i class="el-icon-sort-down"></i>
          </el-button>
          <el-button class="myBtn1" @click="choiceList(3,'readCount')" :class="btnIndex==3?'active':''">阅读量
            <i class="el-icon-sort-down"></i>
          </el-button>
          <el-button class="myBtn1" @click="choiceList(5,'price')" :class="btnIndex==4?'active':''">价格</el-button>
          <span class="line-1" style="left:483px"></span>
          <span class="price-1" style="left:496px">&yen;</span>
          <el-input v-model="price1" @focus="btnIndex=5" style="width:55px;height: 30px;margin-left: 10px;"></el-input>
          -
          <span class="price-2" style="left:567px">&yen;</span>
          <el-input v-model="price2" @focus="btnIndex=5" style="width:55px;height: 30px;"></el-input>
          <el-button class="myBtn1" @click="choiceList(4,'price')" v-if="btnIndex==5">确定</el-button>
          <span class="float-span">
             每页显示：
          <span @click="changePageSize(0,20)" :class="pageIndex==0?'red14':''">20</span>
          <span @click="changePageSize(1,50)" :class="pageIndex==1?'red14':''">50</span>
          <span @click="changePageSize(2,80)" :class="pageIndex==2?'red14':''">80</span>
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
          <li class="mb20" v-for="(item,index) in dataList">
            <div class="leftImg" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
              <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
            </div>
            <div class="right-word ml20">
              <p class="names" style="width:100%;margin-bottom: 8px;font-size: 18px;color:#333" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
              <p>作者：{{item.Author?item.Author:'-'}}</p>
              <p>出版日期：{{item.PublishDate?item.PublishDate.slice(0,10):'-'}}</p>
              <p>征订号：{{item.ExtendData&&item.ExtendData.Isbn?item.ExtendData.Isbn:'-'}}</p>
              <p>ISBN：{{item.ExtendData&&item.ExtendData.Isbn?item.ExtendData.Isbn:'-'}}</p>
              <p style="margin-top: 13px;">
                <span class="price" style="margin-right: 15px;font-size: 18px;">&yen;{{formatPrice(item.CurrentPrice)}}</span>
                <span class="market-price">&yen;{{formatPrice(item.MarketPrice)}}</span>
              </p>
              <div :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" style="float: right;margin-top: -28px;background-position:0 7px ;font-size: 14px;" @click="collectFn(item,index,changeIsFavorited)">收藏</div>
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
                <p class="hover" style="font-size: 18px;color:#333;height: 70px;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
                <p>作者：{{item.Author?item.Author.length>100?item.Author.slice(0,100)+'...':item.Author:'暂无'}}</p>
                <p>出版社：{{item.Publisher?item.Publisher:'-'}}</p>
                <p>出版日期：{{item.PublishDate?item.PublishDate.slice(0,10):'-'}}</p>
                <p>征订号：{{item.ExtendData&&item.ExtendData.Isbn?item.ExtendData.Isbn:'-'}}</p>
                <p>ISBN：{{item.ExtendData&&item.ExtendData.Isbn?item.ExtendData.Isbn:'-'}}</p>
              </div>
            </div>
            <div class="right-con">
              <p style="margin-top: 90px;text-align: center;line-height: 40px;">
                <span class="price" style="margin-right: 20px;font-size: 18px;">&yen;{{handleCurrentPrice(item.ObjectType, item)}}</span>
                <span class="market-price">&yen;{{handleMarketPrice(item.ObjectType, item)}}</span>
              </p>
              <div style="width: 53px;margin:0 auto;">
                <p :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" @click="collectFn(item,index,changeIsFavorited)" style="background-position: 0 4px;color:#333">收藏</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="dataList.length==0">
          <p style="line-height: 300px;font-size: 20px;text-align: center;">暂无数据</p>
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


export default {
  data() {
    return {
      sendObj: {
        word: '标准规范',
        index: 5
      },

      menuList: [],
      menuIndex: 98,
      menuId: '',

      page: 1,
      pageSize: 40,
      totalCount: 0,
      pageIndex: 0,
      dataList: [],

      showListOrImg: 2,

      btnIndex: 989,
      SearchWord: '',
      price1: '',
      price2: '',
    }
  },
  components: {
    searchNoMenu,
    relateRes,
  },
  mounted() {
    this.getMenulist('StandardWeb', this.getMenu)
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
    getlist() {
      this.$http.post("/Content/Search", {
          cp: this.page,
          ps: this.pageSize,
          query: JSON.stringify({
            objectTypes: [103], //电子电路包
            CategoryIds: this.menuId == '' ? '' : [this.menuId],
            SearchOrderBy: {
              ColumnName: this.SearchWord == 'price' ? '' : this.SearchWord,
              Descending: true,
            },
            ExtendProperties: {
              marketPrice: this.price1 != '' && this.price2 != '' ? this.price1 + '@' + this.price2 : '',
            }
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
     * [choiceList 点击btn]
     * @Author   赵雯欣
     * @DateTime 2017-12-19
     * @return   {[type]}   [description]
     */
    choiceList(index, SearchWord) {
      this.btnIndex = index;
      this.SearchWord = SearchWord;
      if (index == 5) {

      } else {
        this.getlist()
      }
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
    i {
      font-size: 16px;
      margin-left: 3px;
    }
    .myBtn {
      padding: 8px 0 8px 15px;
      border-radius: 0!important;
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
      color: #666;
      font-size: 14px;
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


  #imgWrap {
    overflow: hidden;

    li:nth-child(2n+1){
      margin-right: 75px;
    }
    li:nth-child(2n){
      margin-left: 75px;
    }

    li {
      width: 394px;
      float: left;
      margin-top: 30px;
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
        font-size: 16px;
        line-height: 28px;

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
