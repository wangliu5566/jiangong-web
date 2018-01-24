<template>
  <div class="book-page" :style="{minHeight:clientHeight+'px'}">
    <search :sendObj="sendObj"></search>
    <div class='power-content'>
      <div class="aside-left">
        <ul>
          <li v-for="(item,index) in menuList" :class="index==menuIndex?'active':''" @click="clickMenu(index,item.Id)">{{item.Category.Title}}</li>
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
      menuIndex: 98,
    }
  },
  props: ['clientHeight'],
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

    this.getMenu()
  },
  methods: {
    /**
     * [getMenulist 获取菜单]
     * @Author   赵雯欣
     * @DateTime 2017-12-19
     * @return   {[type]}   [description]
     */
    getMenu() {
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
    },
    changeType(index, path) {
      this.bookType = index;
      this.$router.push(path)
    },
  },
}

</script>
<style lang='less'>
.book-page {
  width: 100%;

  .power-content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
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
    }
    .click-this {
      background-color: #fff;
      border-bottom: 1px solid #fff
    }
  }
}

</style>
