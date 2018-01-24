<template>
  <div class="res-category-list" :style="{minHeight:clientHeight+'px'}">
    <searchNoMenu></searchNoMenu>
    <div class='content' v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(256, 256, 256, 0.8)">
      <div class="path" style="cursor: pointer;"><span @click="goPath('index')">首页</span> 
        <span>&gt; <span @click="getMenuList">全部分类</span></span>
        <span v-if="FirstCategory!=''">&gt; <span @click="showTwoMenu($route.query.ParentId)">{{FirstCategory}}</span></span>
        <span v-if="SecondCategory!=''">&gt; <span @click="showTwoMenu($route.query.categoryId)">{{SecondCategory}}</span></span>
      </div>
      <div class="classify" style="border-top: 1px solid #ddd;cursor: pointer;border-bottom:none;" v-if="!showMoreBox &&menuList.length>0">
        <el-row>
          <el-col :span="2">
            <div class="classifyText">分类：</div>
          </el-col>
          <el-col :span="20" class="colorText">
            <!-- <span class="span hover" @click="choiceMenu($route.query.categoryId)" :class="menuId==$route.query.categoryId?'red':''">全部</span> -->
            <span class="span hover" v-for="(item,index) in menuList" @click="choiceMenu(item.Id)" :class="menuId==item.Id?'red':item.Id==$route.query.ParentId?'red':''">{{item.Category&&item.Category.Title?item.Category.Title:item.Title?item.Title:''}}</span>
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
            <!-- <span class="span hover" @click="choiceMenu($route.query.categoryId)" :class="menuId==$route.query.categoryId?'red':''">全部</span> -->
            <span class="span hover" v-for="(item,index) in menuList" @click="choiceMenu(item.Id)" :class="menuId==item.Id?'red':item.Id==$route.query.ParentId?'red':''">{{item.Category&&item.Category.Title?item.Category.Title:item.Title?item.Title:''}}</span>
          </el-col>
          <el-col :span="2" class="CyMore">
            <span @click="showMoreBoxFn(false)" style="line-height: 130px;cursor: pointer;font-size: 14px;"> 收起<i class="el-icon-arrow-up"></i></span>
          </el-col>
        </el-row>
      </div>
      <div class="classify" style="border-top: 1px solid #ddd;">
        <el-row>
          <el-col :span="2">
            <div class="classifyText">类型：</div>
          </el-col>
          <el-col :span="20" class="colorText">
            <span class="span hover" @click="changeType(0)" :class="typeIndex==0?'red':''">全部</span>
            <span class="span hover" v-for="item in typeList" :class="typeIndex==item.Type?'red':''" @click="changeType(item.Type)">{{item.TypeDescription+'('+item.Count+')'}}</span>
          </el-col>
          <!-- <el-col :span="2" class="CyMore">更多<i class="el-icon-arrow-down"></i></el-col> -->
        </el-row>
      </div>
      <div class="classify">
        <el-row>
          <el-col :span="2">
            <div class="classifyText">载体：</div>
          </el-col>
          <el-col :span="20">
            <div class="colorText">
              <span class="span hover" :class="mediaIndex==0?'red':''" @click="changeMedia(0)">全部</span>
              <span class="span hover" :class="mediaIndex==2?'red':''" @click="changeMediaType(2)">纸质书</span>
              <span class="span hover" :class="mediaIndex==1?'red':''" @click="changeMediaType(1)">电子书</span>
              <span class="span hover" :class="mediaIndex==3?'red':''" @click="changeMediaType(3)">POD</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="container">
        <div class="navbtns">
          <span class="line-1"></span>
          <span class="price-1">&yen;</span>
          <span class="price-2">&yen;</span>
          <!-- <el-button class="myBtn1" :class="btnsIndex==0?'red-active':''" @click="changeBtnsIndex(0,'')">综合</el-button> -->
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
          <el-input v-model="price1" @focus="btnsIndex=5" style="width:50px;height: 30px;margin-left: 10px;"></el-input>
          -
          <el-input v-model="price2" @focus="btnsIndex=5" style="width:50px;height: 30px;"></el-input>
          <el-button class="myBtn1" @click="changeBtnsIndex(5,'price')" v-if="btnsIndex==5">确定</el-button>
        </div>
        <div class="nav-text">
          每页显示：
          <span @click="changePageSize(0,20)" :class="pageIndex==0?'red':''">20</span>
          <span @click="changePageSize(1,50)" :class="pageIndex==1?'red':''">50</span>
          <span @click="changePageSize(2,80)" :class="pageIndex==2?'red':''">80</span>
          <span @click="showImg(2)" :class="showListOrImg==2?'active':''">
            <i class="el-icon-menu" style="font-size: 17px;"></i> 大图
          </span>
          <span @click="showImg(1)" :class="showListOrImg==1?'active':''">
            <i class="el-icon-tickets" style="font-size: 17px;"></i>
          列表</span>
        </div>
      </div>
      <!-- 展示列表 -->
      <div class="list-detail" v-if="showListOrImg==1&&dataList.length>0">
        <div class="div-wrap" v-for="item in dataList">
          <div class="left-div">
            <div class="leftImg" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
              <div style="width:100%;height:100%;"  @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
            </div>
            <div class="left-word-list">
              <p class="hover"  @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
              <p class="author-es">作者：{{item.Author?item.Author:'暂无'}}</p>
              <p>简介：{{item.Abstracts?item.Abstracts.length>200?item.Abstracts.slice(0,200)+'...':item.Abstracts:'暂无'}}</p>
            </div>
          </div>
          <div class="right-con">
            <p style="margin-top: 90px;text-align: center;line-height: 40px;">
              <span class="price" style="margin-right: 20px;">&yen;{{formatPrice(item.CurrentPrice,2)}}</span>
              <span class="market-price">&yen;{{formatPrice(item.MarketPrice,2)}}</span>
            </p>
            <div style="width: 130px;margin:0 auto;">
              <el-row>
                <el-col :span="12">
                  <p :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" @click="collectFn(item.Id,item.ObjectType,!item.ExtendData.IsFavorited,getlist)" style="width:45px;background-position: 0 4px;padding-left: 14px;">收藏</p>
                </el-col>
                <el-col :span="12">
                  <div class="shopping-car" @click="addShopping(item)" style="background-position: 0 2px">购物车</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <!-- 展示大图 -->
      <div id="indexWrap" v-if="showListOrImg==2&&dataList.length>0">
        <div class="one-wrap" v-for="item in dataList">
          <div class="imgs" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
            <div style="width:100%;height:100%;"  @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
          </div>
          <div class="left-word">
            <p class="names" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
            <p style="line-height: 22px;height: 22px;">
              <span class="price">&yen;{{formatPrice(item.CurrentPrice,2)}}</span>
              <span class="market-price" style="float: right">&yen;{{formatPrice(item.MarketPrice,2)}}</span>
            </p>
          </div>
          <div style="font-size: 14px;">
            <el-row>
              <el-col :span="12">
                <div :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" @click="collectFn(item.Id,item.ObjectType,!item.ExtendData.IsFavorited,getlist)" style="line-height: 27px;">
                  收藏
                </div>
              </el-col>
              <el-col :span="12">
                <div class="shopping-car"  @click="addShopping(item)" style="line-height: 27px;background-position: 0 6px;">购物车</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div v-if="noContent" style="overflow: hidden;padding:140px 440px;" >
        <img src="../../../static/images/no_detail.png" height="60" width="311">
      </div>
      <div class="page">
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
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
      loading:false,
      noContent:false,
      totalCount: 0,
      page: 1,
      pageSize: 20,
      pageIndex: 0,

      dataList: [],
      showListOrImg: 1, //1是展示列表，2是展示大图

      typeList: [],
      typeIndex: 0,
      typeId: '',

      menuList: [],
      menuId: 0,
      ParentId: 0,

      FirstCategory:'',
      SecondCategory:'',

      mediaIndex: 0, //媒体类型，1-电子版，2-纸质版，3-POD
      mediaList: [],

      btnsIndex: 0,
      SearchWord: '',
      price1: '',
      price2: '',

      showMoreBox: false,
    }
  },
  props: ['clientHeight'],
  components: {
    searchNoMenu,
  },
  computed: mapGetters([
    'loginModal',
    'callbackAfterLogin',
  ]),
  mounted() {
    console.log('this.$route.query.isAll='+this.$route.query.isAll)
    if (this.$route.query.isAll&&this.$route.query.isAll == 2) { //从全部分类分类跳转过来,1是，2不是
      console.log(22)

      this.menuId = this.$route.query.categoryId ? this.$route.query.categoryId : 0

      this.showTwoMenu(this.menuId) //获取分类
      this.FirstCategory = this.$route.query.ParentTitle?this.$route.query.ParentTitle:''
      this.SecondCategory = this.$route.query.categoryTitle?this.$route.query.categoryTitle:''

    } else { //显示全部分类
      console.log(11)
      this.getMenuList()
    }

    this.getlist()

  },
  methods: {
    changeBtnsIndex(index, SearchWord) {
      this.btnsIndex = index
      this.SearchWord = SearchWord;
      this.getlist()
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlist()
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
    /**
     * [getKnowdgeList 获取分类列表]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @return   {[type]}   [description]
     */
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
            ObjectTypes: this.typeIndex == 0 ?[104]  : [this.typeIndex],
            CategoryIds: this.menuId == 0 ? '' : [this.menuId],

            SearchOrderBy: {
              ColumnName: this.SearchWord == 'price' ? '' : this.SearchWord,
              Descending: true,
            },
            ExtendProperties: Object.assign({}, searchParam, {
              IsOnShelf:true,
              marketPrice: this.price1 != '' && this.price2 != '' ? this.price1 + '@' + this.price2 : '',
            })
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList;
            this.totalCount = res.data.Data.RecordCount;
            this.typeList = res.data.Data.Aggregation;
            this.loading = false;
            if(this.dataList.length==0){
              this.noContent = true;
            }else{
              this.noContent = false;
            }
          }
        })
    },
    changeType(type) {
      this.typeIndex = type;
      this.getlist()
    },
    /**
     * [getMenuList 获取主菜单]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @return   {[type]}   [description]
     */
    getMenuList() {
      this.loading = true;
      this.$http.get("/Hierarchy/GetCategoryList", {
          params: {
            id: '',
            name: 'CabpCourse'
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.loading = false;
            this.menuList = res.data.Data
          }
        })
    },
    /**
     * [choiceType 帅选分类]
     * @Author   赵雯欣
     * @DateTime 2017-12-20
     * @param    {[type]}   index [description]
     * @param    {[type]}   Type  [description]
     * @return   {[type]}         [description]
     */
    choiceMenu(Type) {
      this.menuId = Type;
      this.getlist()
    },

    changeMediaType(index) {
      this.mediaIndex = index;
      this.getlist()
    },
    showMoreBoxFn(bool) {
      this.showMoreBox = bool;

    },
    /**
     * [showTwoMenu 显示二级菜单]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @param    {[type]}   id [description]
     * @return   {[type]}      [description]
     */
    showTwoMenu(id) {
       this.loading = true;
      this.$http.get("/Category/ChildList", {
          params: {
            parentId: id,
            cp: 1,
            ps: 999999,
          }
        })
        .then((res) => {
          if (res.data.Success) {
             this.loading = false;
            this.menuList = res.data.Data.ItemList
          }
        })
    },
  },
  watch:{
    'loginModal': function(val, oldVal) {
      if (!val && this.callbackAfterLogin.position == 'index') {
        if(this.callbackAfterLogin.callback == 'indexCollect'){
           this.collectFn(this.callbackAfterLogin.id,this.callbackAfterLogin.ObjectType,true,this.getlist)
        }else if (this.callbackAfterLogin.callback == 'indexAddShopping') {
           this.addShopping(this.callbackAfterLogin.item)
        }
      }
    }
  }

}

</script>
<style lang='less'>
@red-color: #e71515;
.res-category-list {
  width: 100%;

  .content {
    width: 1200px;
    overflow: hidden;
    margin: 0 auto;
  }

  .classify {
    font-size: 14px;
    line-height: 40px;
    width: 100%;
    border-bottom: 1px solid #ddd;
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
  }
  /*筛选按钮*/
  .container {
    margin-top: 10px;
    border: 1px solid #ccc;
    height: 50px;
    background: #ebebeb;
  }
  .navbtns {
    float: left;
    margin-left: 5px;
    margin-top: 10px;
    position: relative;

    .line-1{
      display: inline-block;
      width:1px;
      height:26px;
      border-right:1px dashed #666;
      position: absolute;
      left:443px;
      top:2px;
    }
    .price-1{
      position: absolute;
      left:456px;
      top:5px;
      z-index: 9;
    }
    .price-2{
      position: absolute;
      left:523px;
      top:5px;
      z-index: 9;
    }
    .el-input__inner {
      height: 32px;
    }
  }

  .myBtn{
    padding: 8px 0 8px 15px;
  }
   .myBtn1{
    padding: 8px 15px;
  }
  .btns {
    border-radius: 0px;
    margin-top: 8px;
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
    margin: 5px;
    cursor: pointer;
  }
  /*展示大图*/
  #indexWrap {
    width: 1140px;
    margin: 0 auto;
    margin-top: -2px;
    color: #464646;
    padding: 20px 29px;
    overflow: hidden;


    .one-wrap {
      width: 140px;
      height: 292px;
      float: left;
      margin-right: 110px;
      font-size: 14px;
      line-height: 30px;
      overflow: hidden;
    }

    .imgs {
      width: 138px;
      height: 182px;
      border: 1px solid #ddd;
      cursor: pointer;
    }

    .one-wrap:nth-child(5n) {
      margin-right: 0;
    }
  }

  /*展示列表*/
  .list-detail {
    overflow: hidden;

    .div-wrap {
      width: 1178px;
      height: 250px;
      border: 1px solid #e6e6e6;
      overflow: hidden;
      margin: 20px auto 0;
    }

    .left-div {
      margin-bottom: 20px;
      width: 890px;
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
      width: 680px;
      height: 212px;
      margin: 20px 0;
      line-height: 30px;
      float: left;
    }

    .right-con {
      width: 285px;
      height: 252px;
      box-sizing: border-box;
      border-left: 1px solid #e6e6e6;
      text-align: center;
      float: left;
    }
    .author-es{
      width: 680px;
      height: 30px;
      overflow: hidden;
      line-height: 30px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

</style>
