<template>
  <div class="building-page" :style="{minHeight:clientHeight+'px'}">
    <!-- 顶级菜单 -->
    <search :sendObj="sendObj"></search>
    <div class='power-content'>
      <div class="aside-left">
        <ul>
          <li v-for="(item,index) in menuList" :class="index==menuIndex?'active':''" @click="clickMenu(index,item.Id)">{{item.Title}}</li>
        </ul>
        <relateRes :ObjectTypes="108"></relateRes>
      </div>
      <!-- 搜索条件 -->
      <div class="aside-right" style="min-height: 300px;" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)">
        <div class="search-line">
          <div style="float: right;overflow: hidden;width: 380px;">
            <el-input placeholder="请输入图片名称" v-model="keyWord" @keyup.enter.native="getkeyWordList()"></el-input>
            <el-button class="search-btn" icon="el-icon-search" @click="getkeyWordList()"></el-button>
          </div>
        </div>
        <div id="divWrap" v-if="dataList.length!=0">
          <div class="box" v-for="item in dataList">
            <div class="box-img" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
              <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
            </div>
            <p class="title" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
            <p class="price-line">
              <span class="price">&yen;{{formatPrice(item.CurrentPrice,2)}}</span>
              <p :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" @click="collectFn(item.Id,item.ObjectType,!item.ExtendData.IsFavorited,getlist)" style="float:right;margin-top: -40px;background-position:0 14px;height:40px;line-height: 40px;">收藏</p>
            </p>
          </div>
        </div>
        <div v-if="noContent" style="overflow: hidden;padding:140px 310px;" >
          <img src="../../../static/images/no_detail.png" height="60" width="311">
        </div>
        <div class="page" v-if="dataList.length!=0">
          <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total,total,prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import search from "../common/Search.vue"
import relateRes from "./relateRes.vue"

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: true,
      noContent:false,
      sendObj: {
        word: '建筑图库',
        index: 4
      },
      keyWord: '',
      oldkeyWord: "",
      page: 1,
      pageSize: 21,
      totalCount: 0,
      dataList: [],

      menuList: [],
      menuIndex: 98,
      menuId: '',
    }
  },
  components: {
    search,
    relateRes
  },
  computed: mapGetters([
    'loginModal',
    'callbackAfterLogin',
  ]),
  props: ['clientHeight'],
  mounted() {
    this.getMenulist('BuildingImg', this.getMenu)
    this.getlist()
  },
  methods: {
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
      this.keyWord = ''
      this.oldkeyWord = ''
      this.getlist()
    },
    /**
     * [getkeyWordList 搜索关键字]
     * @Author   赵雯欣
     * @DateTime 2017-12-13
     * @return   {[type]}   [description]
     */
    getkeyWordList() {
      if (this.oldkeyWord == this.keyWord.trim() && this.keyWord.trim() == '') {
        this.$message.warning('请输入图片名称')
        return false;
      }
      this.loading = true;
      this.page = 1
      this.$http.post("/Content/Search", {
          cp: this.page,
          ps: this.pageSize,
          query: JSON.stringify({
            keyWord: this.keyWord.trim(),
            objectTypes: [108], //图8
            CategoryIds: this.menuId == '' ? '' : [this.menuId],
            ExtendProperties:{
              IsOnShelf:true,
            }
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList;
            this.totalCount = res.data.Data.RecordCount;
            this.oldkeyWord = this.keyWord.trim();
            this.loading = false;
            if(this.dataList.length==0){
              this.noContent = true;
            }else{
              this.noContent = false;
            }
          }
        })
    },
    getlist() {
      this.loading = true
      this.$http.post("/Content/Search", {
          cp: this.page,
          ps: this.pageSize,
          query: JSON.stringify({
            keyWord: this.oldkeyWord,
            ObjectTypes: [108], //图8
            CategoryIds: this.menuId == '' ? '' : [this.menuId]
          })
        })
        .then((res) => {
          if (res.data.Success) {
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
     * [handleCurrentChange 切換分頁]
     * @Author   赵雯欣
     * @DateTime 2017-12-17
     * @return   {[type]}   [description]
     */
    handleCurrentChange(page) {
      this.page = page;
      this.getlist()
    }
  },
  watch: {
    'loginModal': function(val, oldVal) {
      if (!val && this.callbackAfterLogin.position == 'index') {
        this.collectFn(this.callbackAfterLogin.id, this.callbackAfterLogin.ObjectType, true, this.getlist)
      }
    }
  }
}

</script>
<style lang='less'>
@red-color: #e71515;
.building-page {
  width: 100%;
  overflow: hidden;
  height: auto;

  .power-content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .search-line {
    height: 50px;
    overflow: hidden;
    border-bottom: 1px solid #dedede;

    .el-input {
      display: block;
      float: left;
      margin-top: 15px;
      height: 30px;
      width: 320px;
      margin-right: 60px;

      .el-input__inner {
        height: 30px;
        border-radius: 0;
      }
    }
    .search-btn {
      display: block;
      background-color: @red-color;
      border: 1px solid @red-color;
      color: white;
      height: 30px;
      width: 60px;
      border-radius: 0;
      font-size: 18px;
      overflow: hidden;
      margin-top: -30px;
      float: right;
      margin-left: -10px;
      padding: 6px 0;
      z-index: 2;
    }
  }

  #divWrap {
    overflow: hidden;
    margin-bottom: 30px;

    .box {
      margin-top: 18px;
      width: 254px;
      height: 246px;
      float: left;
      font-size: 16px;
      color: #333;
      overflow: hidden;

      .box-img {
        width: 252px;
        height: 184px;
        border: 1px solid #ddd;
        cursor: pointer;
      }
      .title {
        line-height: 30px;
        cursor: pointer;
      }

      .title:hover {
        color: @red-color;
      }

      .price-line {
        line-height: 30px;
      }

      .collect {
        float: right;
      }
    }

    .box:nth-child(3n+2) {
      margin-left: 88px;
      margin-right: 88px;
    }
  }
}

</style>
