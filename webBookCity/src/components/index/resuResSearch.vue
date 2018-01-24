<template>
  <div class="resu-res-list" :style="{minHeight:clientHeight+'px'}">
    <searchNoMenu></searchNoMenu>
    <div class='power-content global-box' v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(256, 256, 256, 0.8)">
      <div class="navtext">
        <div class="path" style="cursor: pointer;"><span @click="goPath('index')">首页</span> &gt; <span>高级搜索</span></div>
        <p style="margin-bottom: 15px;">搜索结果：
          <span class="commodity">{{keyWordObj.Keyword}} </span>
          <span class="commodity">共{{totalCount}}件商品</span>
        </p>
      </div>
      <div class="classify" style="border-top: 1px solid #ddd;cursor: pointer;" v-if="!showMoreBox">
        <el-row>
          <el-col :span="2">
            <div class="classifyText">分类：</div>
          </el-col>
          <el-col :span="20" class="colorText">
            <span class="span hover" @click="choiceMenu(0)" :class="menuId==0?'red':''">全部</span>
            <span class="span hover" v-for="(item,index) in menuList" @click="choiceMenu(item.Id)" :class="menuId==item.Id?'red':''">{{item.Category&&item.Category.Title?item.Category.Title:''}}</span>
          </el-col>
          <el-col :span="2" class="CyMore">
            <span v-if="menuList.length>8" @click="showMoreBoxFn(true)">更多<i class="el-icon-arrow-down"></i></span>
          </el-col>
        </el-row>
      </div>
      <div class="classify-more" style="border-top: 1px solid #ddd;" v-if="menuList.length>8&&showMoreBox">
        <el-row>
          <el-col :span="2">
            <div class="classifyText-more">分类：</div>
          </el-col>
          <el-col :span="20" class="colorText-more">
            <span class="span hover" @click="choiceMenu(0)">全部</span>
            <span class="span hover" v-for="(item,index) in menuList" @click="choiceMenu(item.Id)" :class="menuId==item.Id?'red':''">{{item.Category&&item.Category.Title?item.Category.Title:''}}</span>
          </el-col>
          <el-col :span="2" class="CyMore">
            <span @click="showMoreBoxFn(false)" style="line-height: 130px;cursor: pointer;font-size: 14px;"> 收起<i class="el-icon-arrow-up"></i></span>
          </el-col>
        </el-row>
      </div>
      <div class="classify btop">
        <el-row>
          <el-col :span="2">
            <div class="classifyText"> 类型：</div>
          </el-col>
          <el-col :span="22" class="colorText">
            <span class="span hover" @click="choiceType(0)" :class="keyWordObj.ObjectTypes==0?'red':''">全部</span>
            <span class="span hover" v-for="item in typeList" @click="choiceType(item.Type)" v-if="item.Type!=113||item.Type!=114" :class="keyWordObj.ObjectTypes==item.Type?'red':''">{{item.TypeDescription+'('+item.Count+')'}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="classify btop bbtm">
        <el-row>
          <el-col :span="2">
            <div class="classifyText"> 载体：</div>
          </el-col>
          <el-col :span="21" class="colorText">
            <span class="span hover" :class="mediaType==0?'red':''" @click="changeMedia(0)">全部</span>
            <span class="span hover" :class="mediaType==2?'red':''" @click="changeMedia(2)">纸质书</span>
            <span class="span hover" :class="mediaType==1?'red':''" @click="changeMedia(1)">电子书</span>
            <span class="span hover" :class="mediaType==3?'red':''" @click="changeMedia(3)">POD</span>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <!-- 左侧导航头 -->
        <el-col :span="19" class="LeftList">
          <div class="container">
            <div class="navbtns">
              <span class="line-1"></span>
              <span class="price-1">&yen;</span>
              <span class="price-2">&yen;</span>
              <el-button class="myBtn1" :class="btnsIndex==0?'red-active':''" @click="changeBtnsIndex(0,'')">综合</el-button>
              <el-button class="myBtn1" :class="btnsIndex==1?'red-active':''" @click="changeBtnsIndex(1,'sellConnt')">销售</el-button>
              <el-button class="myBtn" :class="btnsIndex==2?'red-active':''" @click="changeBtnsIndex(2,'onShelfDate')">上架时间
                <i class="el-icon-sort-down"></i>
              </el-button>
              <el-button class="myBtn" :class="btnsIndex==3?'red-active':''" @click="changeBtnsIndex(3,'publishDate')">出版时间
                <i class="el-icon-sort-down"></i>
              </el-button>
              <el-button class="myBtn" :class="btnsIndex==4?'red-active':''" @click="changeBtnsIndex(4,'readCount')">阅读量
                <i class="el-icon-sort-down"></i>
              </el-button>
              <el-button class="myBtn1" :class="btnsIndex==5?'red-active':''" @click="changeBtnsIndex(5,'price')">价格</el-button>
              <el-input v-model="keyWordObj.lowerPrice" @focus="btnsIndex=5" style="width:50px;height: 30px;margin-left: 10px;"></el-input>
              -
              <el-input v-model="keyWordObj.heighterPrice" @focus="btnsIndex=5" style="width:50px;height: 30px;"></el-input>
              <el-button class="myBtn1" @click="changeBtnsIndex(5,'price')" v-if="btnsIndex==5">确定</el-button>
            </div>
            <div class="nav-text" style="font-size: 14px;margin-right: 10px;">
              每页显示：
              <span @click="changePageSize(0,20)" :class="pageIndex==0?'red':''">20</span>
              <span @click="changePageSize(1,50)" :class="pageIndex==1?'red':''">50</span>
              <span @click="showImg(2)" :class="showListOrImg==2?'active':''">
                <i class="el-icon-menu" style="font-size: 17px;"></i> 大图
                </span>
              <span @click="showImg(1)" :class="showListOrImg==1?'active':''">
              <i class="el-icon-tickets" style="font-size: 17px;"></i>列表
            </span>
            </div>
          </div>
          <!-- 展示列表 -->
          <div class="list-detail" v-if="showListOrImg==1&&dataList.length>0">
            <div class="div-wrap" v-for="item in dataList">
              <div class="left-div">
                <div class="leftImg" style="background:url('/static/images/no_cover_m.jpg')">
                  <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
                </div>
                <div class="left-word-list">
                  <p class="hover" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
                  <p>作者：{{item.Author?item.Author:'暂无'}}</p>
                  <p>简介：{{item.Abstracts?item.Abstracts.slice(0,110)+'...':'暂无'}}</p>
                </div>
              </div>
              <div class="right-con">
                <p style="margin-top: 90px;text-align: center;line-height: 40px;">
                  <span class="price" style="margin-right: 20px;">&yen;{{formatPrice(item.CurrentPrice,2)}}</span>
                  <span class="market-price">&yen;{{formatPrice(item.MarketPrice,2)}}</span>
                </p>
                <div style="width: 56px;margin:0 auto;">
                   <p :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" @click="collectFn(item.Id,item.ObjectType,!item.ExtendData.IsFavorited,getlist)" style="background-position: 0;">收藏 </p>
                </div>
              </div>
            </div>
          </div>
          <!-- 内容区 -->
          <div class="Resucon" v-if="showListOrImg==2&&dataList.length>0">
            <ul>
              <li v-for="(item,index) in dataList">
                <div class="img-box" style="background:url('/static/images/no_cover_m.jpg')">
                  <div class="img-box" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
                </div>
                <p class="names" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
                <p>
                  <span>&yen;{{formatPrice(item.CurrentPrice,2)}}</span>
                  <span>&yen;{{formatPrice(item.MarketPrice,2)}}</span>
                </p>
                <p :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" @click="collectFn(item.Id,item.ObjectType,!item.ExtendData.IsFavorited,getlist)" style="font-size: 14px;color:#666;line-height: 27px;">收藏</p>
              </li>
            </ul>
          </div>
          <div v-if="noContent" style="overflow: hidden;padding:140px 440px;" >
            <img src="../../../static/images/no_detail.png" height="60" width="311">
          </div>
        </el-col>
        <!-- 右侧相关推荐 -->
        <el-col :span="4" class="RightList">
          <relateRes :ObjectTypes="104"></relateRes>
        </el-col>
      </el-row>
      <div class="page mt20">
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../common/SearchNoMenu.vue"
import relateRes from "./relateRes.vue"
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading:false,
      noContent:false,
      page: 1,
      pageSize: 20,
      pageIndex: 0,
      totalCount: 0,

      showListOrImg: 1,
      dataList: [],

      menuList: [],
      menuId: '0',

      typeList: [],

      mediaType: 0,

      btnsIndex: 0,
      SearchWord: '',

      showMoreBox: false,

      keyWordObj: {
        CategoryIds: '',
        ObjectTypes: 0,
        Keyword: '',

        Title: '',
        Author: '',
        Keywords: '',
        Publisher: '',
        isbn: '',
        zhengdinghao: '',

        lowerPrice: '',
        heighterPrice: '',
        StartTime: '',
        EndTime: '',
      }
    }
  },
  components: {
    searchNoMenu,
    relateRes,
  },
  props: ['clientHeight'],
  created() {
    this.fetchDate();
  },
  computed: mapGetters([
    'loginModal',
    'callbackAfterLogin',
  ]),
  mounted() {
    var getObj = JSON.parse(localStorage.keyWordObj)

    // 处理数据：
    this.keyWordObj.ObjectTypes = getObj.ObjectTypes ? getObj.ObjectTypes : ''
    var keyArr = []

    for(var i in getObj){
      if(!!getObj[i]&&getObj[i]!=''&&i!='ObjectTypes'){
        keyArr.push(getObj[i])
      }
    }

    this.keyWordObj.lowerPrice = getObj.lowerPrice ? getObj.lowerPrice : ''
    this.keyWordObj.heighterPrice = getObj.heighterPrice ? getObj.heighterPrice : ''
    this.keyWordObj.StartTime = getObj.StartTime ? getObj.StartTime : ''
    this.keyWordObj.EndTime = getObj.EndTime ? getObj.EndTime : ''

    console.log(getObj)

    this.keyWordObj.Keyword = keyArr.join(',')
    console.log(this.keyWordObj.Keyword)


    this.getlist()
    this.getMenuList() //获取分类
  },
  methods: {
    fetchDate() {
      var path = this.$route.fullPath;
      if (location.href.indexOf('inSearch') > 0) {
        this.keyWordObj.Keyword = decodeURI(location.href.split('=')[1])
        this.getlist()
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlist()
    },
    changePageSize(index, pageSize) {
      this.pageIndex = index;
      this.pageSize = pageSize;
      this.getlist()
    },
    getlist() {
      this.loading = true;

      if (this.mediaType == 0) {
        var searchParam = {}
      } else if (this.mediaType == 1) {
        var searchParam = {
          HasElectronicalBook: true
        };
      } else if (this.mediaType == 2) {
        var searchParam = {
          HasPaperBook: true
        };

      } else if (this.mediaType == 3) {
        var searchParam = {
          HasPod: true
        };
      }

      this.$http.post("/Content/Search", {
          cp: this.page,
          ps: this.pageSize,
          query: JSON.stringify({
            // AggregationAll: true,
            ObjectTypes: this.keyWordObj.ObjectTypes == '' ? [104, 108, 109] : [this.keyWordObj.ObjectTypes], //类型
            CategoryIds: this.keyWordObj.CategoryIds ? [this.keyWordObj.CategoryIds] : '',
            Keyword: this.keyWordObj.Keyword,

            // SearchOrderBy: {
            //   ColumnName: this.SearchWord == 'price' ? '' : this.SearchWord,
            //   Descending: true,
            // },

            ExtendProperties: Object.assign({}, searchParam, {
              IsOnShelf:true,
              marketPrice: this.keyWordObj.lowerPrice != '' && this.keyWordObj.heighterPrice != '' ? this.keyWordObj.lowerPrice + '@' + this.keyWordObj.heighterPrice : '',
              publishDate: this.keyWordObj.EndTime != '' && this.keyWordObj.StartTime != '' ? this.keyWordObj.StartTime + '@' + this.keyWordObj.EndTime : '',
            })
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.typeList = res.data.Data.Aggregation
            this.dataList = res.data.Data.ItemList;
            this.totalCount = res.data.Data.RecordCount;
            this.loading = false;
            if(this.dataList.length==0){
              this.noContent = true;
            }else{
              this.noContent = false;
            }
          }
        })
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
    /**
     * [getMenuList 获取主菜单]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @return   {[type]}   [description]
     */
    getMenuList() {
      this.$http.get("/Hierarchy/GetCategoryList", {
          params: {
            id: '',
            name: 'CabpCourse'
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.menuList = res.data.Data
          }
        })
    },
    /**
     * [choiceType 帅选类型]
     * @Author   赵雯欣
     * @DateTime 2017-12-20
     * @param    {[type]}   index [description]
     * @param    {[type]}   Type  [description]
     * @return   {[type]}         [description]
     */
    choiceType(Type) {
      this.keyWordObj.ObjectTypes = Type
      this.getlist()
    },
    /**
     * [choiceMenu 帅选类型]
     * @Author   赵雯欣
     * @DateTime 2017-12-20
     * @param    {[type]}   index [description]
     * @param    {[type]}   Type  [description]
     * @return   {[type]}         [description]
     */
    choiceMenu(Type) {
      this.menuId = Type;
      this.keyWordObj.CategoryIds = Type
      this.getlist()
    },
    changeMedia(index) {
      this.mediaType = index;
      this.getlist()
    },
    showMoreBoxFn(bool) {
      this.showMoreBox = bool;

    },
    changeBtnsIndex(index, SearchWord) {
      this.btnsIndex = index
      this.SearchWord = SearchWord;
      this.getlist()
    }
  },
  watch: {
    "$route": "fetchDate",
    'loginModal': function(val, oldVal) {
      if (!val && this.callbackAfterLogin.position == 'index'&&this.callbackAfterLogin.callback == 'indexCollect') {
       this.collectFn(this.callbackAfterLogin.id,this.callbackAfterLogin.ObjectType,true,this.getlist)
      }
    }
  },
}

</script>
<style lang='less'>
@red-color: #e71515;
.resu-res-list {
  width: 100%;
  .power-content {
    &>.navtext {
      color: #8c8c8c;
      & .commodity {
        color: #333;
        margin-right: 10px;
      }
    }
    .classify {
      font-size: 14px;
      line-height: 40px;
      width: 100%;
      overflow: hidden;
    }

    .classifyText {
      padding-left: 10px;
      width: 85px;
      background: #ebebeb;
      overflow: hidden;
    }
    .classifyText-more {
      height: 130px;
      line-height: 160px;
      padding-left: 10px;
      width: 85px;
      background: #ebebeb;
      overflow: hidden;
      font-size: 14px;
    }
    .colorText {
      color: #586ba0;
      overflow: hidden;
      height: 40px;
    }
    .colorText-more {
      color: #586ba0;
      padding-left: 10px;
      overflow: hidden;
    }
    .span {
      margin: 0 10px;
      cursor: pointer;
      line-height: 40px;
      font-size: 14px;
    }
    .CyMore {
      float: right;
      color: #666;
      width: 65px;
      text-align: right;
    }
    .container {
      margin-top: 10px;
      border: 1px solid #ccc;
      width: 940px;
      height: 50px;
      background: #ebebeb;
    }
    .navbtns {
      float: left;
      margin-left: 5px;
      position: relative;

      .line-1 {
        display: inline-block;
        width: 1px;
        height: 26px;
        border-right: 1px dashed #666;
        position: absolute;
        left: 482px;
        top: 10px;
      }
      .price-1 {
        position: absolute;
        left: 496px;
        top: 14px;
        z-index: 9;
      }
      .price-2 {
        position: absolute;
        left: 562px;
        top: 14px;
        z-index: 9;
      }
      .myBtn {
        padding: 8px 0 8px 10px;
      }
      .myBtn1 {
        padding: 8px 15px;
      }
      .el-input__inner {
        height: 32px;
        border-radius:0;
      }
    }
    .el-button {
      border-radius: 0px;
      margin-top: 8px;
      margin-left: 5px!important;
    }
    .nav-text {
      float: right;

      .active {
        color: @red-color;
      }
    }
    .nav-text span {
      text-align: center;
      font-size: 14px;
      line-height: 50px;
      margin-left: 5px;
      cursor: pointer;
    }
    .LeftList {
      margin-right: 10px;
    }
    /*展示列表*/
    .list-detail {
      overflow: hidden;
      width: 940px;

      .div-wrap {
        width: 878px;
        height: 250px;
        border: 1px solid #e6e6e6;
        overflow: hidden;
        margin: 20px auto 0;
      }

      .left-div {
        margin-bottom: 20px;
        width: 690px;
        height: 250px;
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
        width: 480px;
        height: 212px;
        margin: 20px 0;
        line-height: 30px;
        float: left;
      }

      .right-con {
        width: 180px;
        height: 252px;
        box-sizing: border-box;
        border-left: 1px solid #e6e6e6;
        text-align: center;
        float: left;
      }
    }

    .Resucon {
      margin: 0 auto;
      margin-top: 20px;
      width: 900px;
      &>ul {
        color: #464646;
        margin-bottom: 20px;
        overflow: hidden;
        li:nth-child(4n) {
          margin-right: 0;
        }
        li {
          margin-right: 110px;
          height: 291px;
          width: 140px;
          float: left;
          &>.img-box {
            width: 140px;
            height: 184px;
            border: 1px solid #ddd;

            .img-box {
              width: 140px;
              height: 184px;
              cursor: pointer;
            }
          }

          &>p {
            font-size: 16px;
            line-height: 25px;
          }
          &>p:nth-of-type(2) {
            &>span:first-child {
              font-size: 16px;
              color: #e71712;
            }
            &>span:last-child {
              margin-left: 16px;
              color: #989898;
              font-size: 14px;
              text-decoration: line-through;
            }
          }

          &>p:nth-of-type(3) {
            &>span {
              margin-left: 3px;
            }
            &>span:first-child {
              margin-left: 0;
            }
            color: #333;
            img {
              width: 15px;
              height: 15px;
            }
          }
        }
      }
    }
    .RightList {
      margin-top: 10px;
    }
  }
}

</style>
