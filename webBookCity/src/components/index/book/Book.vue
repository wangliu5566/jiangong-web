<template>
  <div class="book-page">
    <search :sendObj="sendObj"></search>
    <div class='power-content'>
      <div class="aside-left">
        <!-- <ul>
          <li :class="0==menuIndex?'active':''" @click="clickMenu(0,'')">全部</li>
          <li v-for="(item,index) in menuList" :class="index+1==menuIndex?'active':''" @click="clickMenu(index+1,item.Id)">{{item.Category.Title}}</li>
        </ul> -->
        <ul class="type-menus1">
          <li v-for="(item,index) in menuList" :class="index+1==menuIndex?'active':'lis'">
            <div style="width:220px;overflow:hidden" @mouseenter="showTwoMenu(item.Id)" @click="clickMenu(index+1,item.Id)">
              {{item.Category.Title}}
            </div>
            <ul class="type-child-menu" v-if="twoMenuList.length>0">
              <li v-for="inItem in twoMenuList" @click="clickMenu(index+1,inItem.Id)">{{inItem.Title}}</li>
            </ul>
          </li>
        </ul>
        <relateRes :ObjectTypes="104"></relateRes>
      </div>
      <!-- 搜索条件 -->
      <div class="aside-right">
        <div class="menus">
          <div :class="bookType==1?'click-this':''" @click="changeType(1,'/wrap/book/sellBook')">畅销榜单</div>
          <div :class="bookType==2?'click-this':''" @click="changeType(2,'/wrap/book/newBook')">新书榜单</div>
          <div></div>
        </div>
        <router-view :menuId="menuId"></router-view>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import search from "../../common/Search.vue"
import relateRes from "../relateRes.vue"

export default {
  data() {
    return {
      sendObj: {
        word: '图书榜单',
        index: 1
      },
      bookType: 1, //1是畅销榜单,2是新书榜单

      menuList: [],
      menuId: '',
      menuIndex: 0,
      twoMenuList: [],
    }
  },
  components: {
    search,
    relateRes
  },
  mounted() {
    var path = this.$route.path;
    if (path.indexOf('sellBook') > 0) {
      this.bookType = 1;
    } else if (path.indexOf('newBook') > 0) {
      this.bookType = 2
    }

    this.getMenulist('CabpCourse', this.getMenu)
  },
  methods: {
    /**
     * [getTypeList 获取主菜单]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @return   {[type]}   [description]
     */
    getMenu(menuList) {
      this.menuList = menuList;
    },
    /**
     * [showTwoMenu 显示二级菜单]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @param    {[type]}   id [description]
     * @return   {[type]}      [description]
     */
    showTwoMenu(id) {
      this.twoMenuList = []
      if (localStorage.getItem("twoMenuList" + id)) {
        if (JSON.parse(localStorage.getItem("twoMenuList" + id)).length > 0) {
          this.twoMenuList = JSON.parse(localStorage.getItem("twoMenuList" + id));
        } else {
          this.twoMenuList = []
        }
        return false;
      }
      this.$http.get("/Category/ChildList", {
          params: {
            parentId: id,
            cp: 1,
            ps: 999999,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.twoMenuList = res.data.Data.ItemList;
            localStorage.setItem("twoMenuList" + id, JSON.stringify(res.data.Data.ItemList))
          }
        })
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
      console.log(index)
      this.menuIndex = index;
      this.menuId = id;
    },
    changeType(index, path) {
      this.bookType = index;
      this.$router.push(path)
    },
  },
}

</script>
<style lang='less'>
@red-color: #e71515;
.book-page {
  width: 100%;

  .power-content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  /*下拉菜单部分*/
  .type-menus1 {
    width: 241px;
    z-index: 99;

    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 20px;
    .lis{
      width: 221px;
      padding-left: 20px;
      font-size: 14px;
      color: #464646;
      line-height: 45px;
      background-color: #fff;
      border-left: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      cursor: pointer;
      position: relative;
    }

    .active {
      width: 221px;
      font-size: 14px;
      line-height: 45px;
      border-right: 1px solid #e5e5e5;
      cursor: pointer;
      position: relative;
      color: @red-color;
      background-color: #e5e5e5;
      padding-left: 19px;
      border-left: 2px solid @red-color;
    }

    .lis:hover {
      color: @red-color;
      background-color: #e5e5e5;
      padding-left: 19px;
      border-left: 2px solid @red-color;

      .type-child-menu {
        display: block;
      }
    }
    /*二级目录*/
    .type-child-menu {
      position: absolute;
      top: 0px;
      left: 240px;
      width: 240px;
      border-top: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      z-index: 99;
      display: none;
      background-color: #e5e5e5;
      overflow: hidden;

      li {
        width: 200px;
        margin: 0 20px;
        font-size: 14px;
        color: #464646;
        line-height: 45px;
        border-bottom: 1px solid #999;
        background-color: #e5e5e5;
        cursor: pointer;
        overflow: hidden;
      }
      li:last-child {
        border-bottom: none;
      }
      li:hover {
        color: @red-color;
      }
    }
  }

  .menus {
    margin-top: 20px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #333;

    div {
      width: 120px;
      text-align: center;
      float: left;
      border: 1px solid #dedede;
      border-right: none;
      background-color: #ebebeb;
      cursor: pointer;
    }
    div:nth-child(3) {
      height: 41px;
      width: 694px;
      border: none;
      border-bottom: 1px solid #dedede;
      border-left: 1px solid #dedede;
      background-color: #fff;
      cursor: default;
    }
    .click-this {
      background-color: #fff;
      border-bottom: 1px solid #fff
    }
  }
}

</style>
