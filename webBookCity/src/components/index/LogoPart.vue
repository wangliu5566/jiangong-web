<template>
  <div class="logo-part">
    <div class="content">
      <Search :sendObj="sendObj"></Search>
      <ul class="type-menu">
        <li v-for="item in menuList" class="lis">
          <div style="width:220px;overflow:hidden" @mouseenter="showTwoMenu(item.Id)" @click="goSearchList(0,item.Category.Id,'',item.Category.Title,2)">
            {{item.Category.Title}}
          </div>
          <ul class="type-child-menu" v-if="twoMenuList.length>0">
            <li v-for="inItem in twoMenuList" @click="goSearchList(item.Id,inItem.Id,item.Category.Title,inItem.Title,2)">{{inItem.Title}}</li>
          </ul>
        </li>
      </ul>
      <!--知识标签 -->
      <div class='knowledge-label'>
        <h4>知识标签 
          <span @click="changeLabelPageSize" style="float: right;font-size: 13px;position: relative;padding-right: 23px;cursor: pointer;">换一换
            <span class="get-other-labels"></span>
          </span>
        </h4>
        <div class="labels">
          <span v-for="(item,index) in labelList" @click="goDetail('exp',item.Id)" :style="{fontSize:getFontObj['style'+index*2],opacity: getFontObj['style'+(index*2+1)]}">{{item.Title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from "../common/Search.vue"
export default {
  data() {
    return {
      sendObj: {
        word: '图书分类',
        index: 45
      },
      menuList: [],
      twoMenuList: [],
      labelList: [],
      getFontObj: {},
      labelPage: 1,
      pageSize: 12,
    }
  },
  components: {
    Search
  },
  mounted() {
    this.getTypeList()
    this.getLabelList() //获取知识标签
  },
  methods: {
    /**
     * [goOtherUrl 跳转到建工网站]
     * @Author   赵雯欣
     * @DateTime 2017-12-22
     * @return   {[type]}   [description]
     */
    goOtherUrl() {
      window.open('http://www.cabp.com.cn/');
    },
    /**
     * [getRandom 获取知识标签随机颜色和字体]
     * @Author   赵雯欣
     * @DateTime 2017-12-13
     * @return   {[type]}   [description]
     */
    getFontSize(index) {
      var fontSize = ['13px', '14px', '15px', '16px', '17px', '18px']
      var fontOpcity = ['0.3', '0.4', '0.5', '0.7', '0.9', '1']
      var random = Math.random() * 5
      random = Math.round(random)

      if (index == 1) {
        return fontSize[random]
      } else if (index == 2) {
        return fontOpcity[random]
      }
    },
    /**
     * [getTypeList 获取主菜单]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @return   {[type]}   [description]
     */
    getTypeList() {
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
    changeLabelPageSize() {
      this.labelPage++;
      this.getLabelList()
    },
    /**
     * [getLabelList 获取知识标签]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @return   {[type]}   [description]
     */
    getLabelList() {
      this.labelList = []
      this.$http.post("/ExplicitWord/Search", {
          ps: this.pageSize,
          cp: this.labelPage,
          query: JSON.stringify({
            SearchOrderBy: {
              SearchOrderBy: 'hot',
              Descending: true
            }
          })
        })
        .then((res) => {
          if (res.data.Success) {

            res.data.Data.ItemList.forEach((item) => {
              if (item.Title && item.Title.length < 7) {
                this.labelList.push(item)
              }
            })
            this.getStyleFn()
          }
        })
    },
    getStyleFn() {
      var len = this.labelList.length * 2
      for (var i = 0; i < len; i++) {
        if (i % 2 == 0) {
          this.getFontObj['style' + i] = this.getFontSize(1)
        } else {
          this.getFontObj['style' + i] = this.getFontSize(2)
        }
      }
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
  }
}

</script>
<style lang='less'>
@red-color: #e71515;
.logo-part {
  width: 100%;
  height: 140px;

  .content {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  /*下拉菜单部分*/
  .type-menu {
    width: 241px;
    position: absolute;
    top: 140px;
    z-index: 99;
    border-bottom: 1px solid #e5e5e5;
    .lis {
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

  .knowledge-label {
    width: 180px;
    padding: 0 10px 0 15px;
    height: 338px;
    background: url('../../../static/images/ban.png') no-repeat;
    -webkit-background-size: 205px 338px;
    background-size: 205px 338px;
    position: absolute;
    top: 146px;
    right: 0;
    z-index: 99;

    h4 {
      font-size: 14px;
      color: #464646;
      line-height: 40px;
    }

    .get-other-labels {
      display: block;
      width: 20px;
      height: 20px;
      background: url('../../../static/images/huan.png') no-repeat 2px 2px;
      cursor: pointer;
      position: absolute;
      right: 3px;
      top: 12px;
    }

    .labels span {
      line-height: 40px;
      margin-right: 15px;
      color: #333;
      cursor: pointer;
    }
    .labels span:hover {
      color: @red-color;
    }
  }
}

</style>
