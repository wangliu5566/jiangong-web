<template>
  <div class="res-know-list">
    <SearchNoMenu></SearchNoMenu>
    <div class='power-content global-box' v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)">
      <div class="path" style="cursor: pointer;"><span @click="goPath('index')">首页</span> &gt; <span>高级搜索</span></div>
      <p class="navtext">搜索结果：
        <span class="commodity">{{Keyword}}</span>
        <span class="commodity"> 共{{totalCount}}个知识标签</span>
      </p>
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
      <div class="classify-more" style="border-top: 1px solid #ddd;border-bottom: 1px solid #ddd;" v-if="menuList.length>8&&showMoreBox">
        <el-row>
          <el-col :span="2">
            <div class="classifyText-more">分类：</div>
          </el-col>
          <el-col :span="20">
            <div style="padding: 10px 0;">
              <span class="span hover" @click="choiceMenu(0)">全部</span>
              <span class="span hover" v-for="(item,index) in menuList" @click="choiceMenu(item.Category.Id)" :class="menuId==item.Id?'red':''">{{item.Category&&item.Category.Title?item.Category.Title:''}}</span>
            </div>
          </el-col>
          <el-col :span="2" class="CyMore">
            <span @click="showMoreBoxFn(false)" style="line-height: 130px;cursor: pointer;font-size: 14px;"> 收起<i class="el-icon-arrow-up"></i></span>
          </el-col>
        </el-row>
      </div>
      <!-- 左边知识元部分 -->
      <div style="overflow: hidden;width: 1200px;">
        <div class="LeftList">
          <div class="container">
            <div class="navbtns">
              <el-button class="myBtn" :calss="searchKey==1?'red-active':''" @click="changeSearchKey(1)">阅读量
                <i class="el-icon-sort-down" v-if="readCountDescend"></i>
                <i class="el-icon-sort-up" v-if="!readCountDescend"></i>
              </el-button>
              <!-- <el-button class="myBtn" :calss="searchKey==2?'red-active':''" @click="changeSearchKey(2)">上架时间
                <i class="el-icon-sort-down" v-if="isOnShelfDescend"></i>
                <i class="el-icon-sort-up" v-if="!isOnShelfDescend"></i>
              </el-button> -->
            </div>
            <div class="nav-text">
              每页显示：
              <span @click="changePageSize(0,20)" :class="pageIndex==0?'red':''">20</span>
              <span @click="changePageSize(1,50)" :class="pageIndex==1?'red':''">50</span>
              <!-- <span @click="changePageSize(2,80)" :class="pageIndex==2?'red':''">80</span> -->
            </div>
          </div>
          <!-- 内容区 -->
          <div class="ResuCon" v-if="dataList.length!=0" v-for="(item,index) in dataList">
            <div class="ResuConLeft" @click="goDetail('exp',item.Id)"></div>
            <!-- 详细内容 -->
            <div class="ResuConRight">
              <p class="hover" @click="goDetail('exp',item.Id)">{{item.Title}}</p>
              <P>描述：</P>
              <p class="ResuMtext">{{item.Abstracts?item.Abstracts:'暂无'}}</p>
            </div>
          </div>
          <div v-if="dataList.length==0">
            <p style="line-height: 300px;text-align: center;font-size: 20px;">没有找到相关知识标签</p>
          </div>
        </div>
        <!-- 右侧相关推荐 -->
        <div class="RightList">
          <relateRes :ObjectTypes="104"></relateRes>
        </div>
      </div>
      <!-- 分页 -->
      <div class="page mt20">
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import SearchNoMenu from "../common/SearchNoMenu.vue"
import relateRes from "./relateRes.vue"

export default {
  data() {
    return {
      loading: false,
      page: 1,
      pageSize: 20,
      totalCount: 0,
      dataList: [],
      pageIndex: 0,

      //路由携带的参数
      Keyword: '',

      menuList: [],
      menuId: '0',

      searchKey: 98, //搜索排行：1是阅读量，2是上架时间

      showMoreBox: false,

      isOnShelfDescend: true, //上架时间
      readCountDescend: true,
    }
  },
  components: {
    relateRes,
    SearchNoMenu
  },
  created() {
    this.fetchDate();
  },
  mounted() {
    this.Keyword = this.$route.query.Keyword
    this.getlist()
    this.getMenuList() //获取分类
  },
  methods: {
    fetchDate() {
      var path = this.$route.fullPath;
      if (location.href.indexOf('Keyword') > 0) {
        this.Keyword = decodeURI(location.href.split('=')[1])
        this.getlist()
      }
    },
    /**
     * [handleCurrentChange 切换分页页数]
     * @Author   赵雯欣
     * @DateTime 2017-12-21
     * @param    {[type]}   val [description]
     * @return   {[type]}       [description]
     */
    handleCurrentChange(val) {
      this.page = val;
      this.getlist()
    },
    /**
     * [changePageSize 切换分页条数]
     * @Author   赵雯欣
     * @DateTime 2017-12-21
     * @param    {[type]}   index    [description]
     * @param    {[type]}   pageSize [description]
     * @return   {[type]}            [description]
     */
    changePageSize(index, pageSize) {
      this.pageIndex = index;
      this.pageSize = pageSize;
      this.getlist()
    },
    /**
     * [getlist 请求页面数据]
     * @Author   赵雯欣
     * @DateTime 2017-12-21
     * @return   {[type]}   [description]
     */
    getlist(Descending) {
      this.loading = true;

      var SearchOrderBy = {};
      if (this.searchKey == 1 || this.searchKey == 2) {
        this.searchKey = this.searchKey == 1 ? 'ViewCount' : this.searchKey == 2 ? 'onShelfDate' : ''
        SearchOrderBy = {
          SearchOrderBy: {
            ColumnName: this.searchKey,
            Descending: Descending != undefined ? Descending : true,
          }
        }
      }

      this.$http.post("/ExplicitWord/Search", {
          cp: this.page,
          ps: this.pageSize,
          query: JSON.stringify(Object.assign({}, {
            Keyword: this.Keyword,
            CategoryIds: this.menuId == '' || this.menuId == '0' ? '' : [this.menuId],
          }, SearchOrderBy))
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList;
            this.totalCount = res.data.Data.RecordCount;
            this.loading = false;
          }
        })
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
     * [changeSearchKey 切换搜索条件]
     * @Author   赵雯欣
     * @DateTime 2017-12-21
     * @return   {[type]}   [1是阅读量，2是上架时间]
     */
    changeSearchKey(index) {
      this.searchKey = index;
      if (index == 1) {
        this.readCountDescend = !this.readCountDescend
        this.getlist(this.readCountDescend)
      } else if (index == 2) {
        this.isOnShelfDescend = !this.isOnShelfDescend
        this.getlist(this.isOnShelfDescend)
      }
    },
    showMoreBoxFn(bool) {
      this.showMoreBox = bool;

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
      this.getlist()
    },
  },
  watch: {
    "$route": "fetchDate",
  },
}

</script>
<style lang='less'>
@red-color: #e71515;
.res-know-list {
  width: 100%;

  .power-content {
    .navtext {
      color: #8c8c8c;
      .commodity {
        color: #333;
        margin-right: 10px;
      }
    }

    .classify {
      font-size: 14px;
      line-height: 40px;
      border-top: 1px solid #d6d6d6;
      border-bottom: 1px solid #d6d6d6;
      margin-top: 15px;
      width: 100%;
      height: 40px;
      overflow: hidden;
    }
    .classifyText {
      padding-left: 10px;
      width: 85px;
      background: #ebebeb;
      overflow: hidden;
    }

    .span {
      margin: 0 10px;
      cursor: pointer;
      line-height: 35px;
      font-size: 14px;
    }
    .classifyText-more {
      line-height: 160px;
      padding-left: 10px;
      width: 85px;
      background: #ebebeb;
      overflow: hidden;
      font-size: 14px;
    }
    .colorText {
      color: #586ba0;
      span {
        margin-right: 20px;
        cursor: pointer;
      }
    }
    .CyMore {
      float: right;
      color: #666;
      width: 65px;
      text-align: right;
    }

    /*筛选部分*/
    .container {
      margin: 10px 0 8px;
      border: 1px solid #ccc;
      width: 938px;
      height: 50px;
      background: #ebebeb;
      overflow: hidden;
    }
    .navbtns {
      float: left;
      padding-top: 10px;
    }
    .myBtn {
      padding: 8px 0 8px 10px;
      border-radius: 0!important;
      margin-left: 5px!important;
    }
    .nav-text {
      float: right;
      margin-right: 5px;
    }
    .nav-text span {
      text-align: center;
      font-size: 14px;
      line-height: 50px;
      margin-left: 5px;
      cursor: pointer;
    }
    /*左边部分*/
    .LeftList {
      width: 940px;
      overflow: hidden;
      float: left;
    }
    .RightList {
      width: 242px;
      margin-top: 10px;
      overflow: hidden;
      float: right;
    }
    .ResuCon {
      border: 1px solid #ccc;
      width: 920px;
      height: 230px;
      margin: 20px auto 0;
      overflow: hidden;

     .ResuConLeft {
        float: left;
        margin: 20px;
        width: 240px;
        height: 190px;
        border: 1px solid #ddd;
        background: url('../../../static/images/zishiyuan_242.jpg');
        cursor: pointer;
      }
       .ResuConRight {
        float: left;
        margin: 20px;
        width: 580px;
        height: 190px;
        &>p:first-child {
          margin: 20px 0;
          height: 25px;
        }
        .ResuMtext {
          height: 98px;
          overflow: hidden;
          margin-top: 5px;
          line-height: 25px;
          color: #747474;
        }
      }
    }
  }
}

</style>
