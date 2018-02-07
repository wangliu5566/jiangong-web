<template>
  <div class="best-bellers">
    <div class="content">
      <!-- 左边菜单 -->
      <div class="left-menu">
        <p class="menu-title">畅销榜单</p>
        <ul class="left-ul">
          <li v-for="(item,index) in bookList" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">
            <div class="show-big-img">
              <div class="left-img">{{index+1}}.
                 <div class="imgs" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                <div style="width:100%;height:100%" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
                </div>
              </div>
              <div class="right-price">
                <p class="book-title">{{item.Title?item.Title.length>12?item.Title.slice(0,12)+"...":item.Title:''}}</p>
                <p class="market-price" style="font-size: 14px;line-height: 16px;">&yen;{{handleMarketPrice(item.ObjectType, item)}}</p>
                <p class="price" style="line-height: 20px;">&yen;{{handleCurrentPrice(item.ObjectType, item)}}</p>
              </div>
            </div>
            <div class="not-show-img">
              {{index+1}}.{{item.Title}}
            </div>
          </li>
        </ul>
        <p class="menu-bottom" @click="goPath('book')">查看完整榜单&gt;</p>
      </div>
      <!-- 右边分类推荐 -->
      <div class="right-type">
        <div class="content-title" style="padding-top: 0">
          <span class="red-border1"></span>
          <span class="title">知识图谱</span>
          <span class="content-more" @click="goPath('knowledgeMap')">更多 ></span>
        </div>
        <div class="knowledge-wrap">
          <div class="one-wrap" v-for="item in knowledgeList" @click="goDetail('exp',item.Id)">
            <img src="../../../static/images/biaoqian.png">
            <div class="bottom-title" >{{item.Title}}</div>
            <div class="map-word">
              <h4 class="title">{{item.Title}}</h4>
              <div style="line-height: 25px;height:150px;overflow:hidden;font-size: 14px;">{{item.Abstracts?item.Abstracts.length>100?item.Abstracts.slice(0,100)+"...":item.Abstracts:''}}</div>
            </div>
          </div>
        </div>
        <div class="content-title" style="padding-top: 0">
          <span class="red-border1"></span>
          <span class="title">分类推荐</span>
          <span class="content-more">
            <span class="type-content" v-for="(item,index) in menuList">
              <span class="span-content hover"  @click="changeType(item.Id)" :class="item.Id == menuId?'red':''">{{item.Title}}</span>
          <span class="span-icon" v-if="index<3">/</span>
          </span>
          <span @click="goSearchList()" style="margin-left: 15px;">更多 &gt;</span>
          </span>
        </div>
        <div class="type-wrap"> 
          <typeImgs  :MenuContentList="MenuContentList" v-if="listLoading"></typeImgs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import typeImgs from "./TypeImgs.vue"
export default {
  data() {
    return {
      type: 1,
      bookList: [{
        CoverUrl: '',
        Title: ''
      }],
      knowledgeList: [],

      menuList: [], //分类
      menuId: '',

      MenuContentList: [], //分类图片
      listLoading:false,

    }
  },
  components: {
    typeImgs
  },
  mounted() {
    this.getlist()
    this.getKnowdgeList() //获取知识列表
    this.getMenulist('RecommendWeb', this.getMenu)
  },
  methods: {
    /**
     * [getlist 图书列表]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @return   {[type]}   [description]
     */
    getlist() {
      this.$http.post("/Content/Search", {
          cp: 1,
          ps: 10,
          query: JSON.stringify({
            ObjectTypes: [104], //图书
            SearchOrderBy: {
              ColumnName: 'readCount',
              Descending: true,
            },
            ExtendProperties:{
              IsOnShelf:true,
            }
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.bookList = res.data.Data.ItemList
          }
        })
    },
    /**
     * [getKnowdgeList 获取知识图谱]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @return   {[type]}   [description]
     */
    getKnowdgeList() {
      this.$http.get("/ExplicitWord/Search", {
          params: {
            cp: 1,
            ps: 2,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            res.data.Data.ItemList.forEach((item, index) => {
              if (index < 2) {
                this.knowledgeList.push(item)
              }
            })
          }
        })
    },
    /**
     * [getMenulist 获取分类推荐]
     * @Author   赵雯欣
     * @DateTime 2017-12-19
     * @return   {[type]}   [description]
     */
    getMenu(menuList) {
      this.menuList = menuList
      this.menuId = this.menuList[0].Id
      this.getMenuContent()
    },
    getMenuContent() {
      this.MenuContentList =[]
      this.listLoading = false;
      this.$http.post("/Content/Search", {
          cp: 1,
          ps: 8,
          query: JSON.stringify({
            ObjectTypes: [104], //图书
            CategoryIds: this.menuId == '' ? '' : [this.menuId],
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.MenuContentList = res.data.Data.ItemList;
            this.listLoading = true;
          }
        })
    },
    changeType(id) {
      this.menuId = id
      this.getMenuContent()
    }
  }
}

</script>
<style lang='less'>
@red-color: #e71515;
.best-bellers {
  width: 100%;
  background-color: #f2f2f2;
  overflow: hidden;
  margin-bottom: 20px;

  .content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  /*左边菜单*/
  .left-menu {
    width: 207px;
    padding: 0 15px 0 20px;
    overflow: hidden;
    margin: 20px 15px 20px 0;
    float: left;
    background-color: #fff;
  }

  .menu-title {
    height: 47px;
    font-size: 16px;
    color: #464646;
    line-height: 52px;
    border-bottom: 1px solid #dadada;
    font-weight: bold;
  }
  .left-ul {
    margin-top: 8px;
    overflow: hidden;
    li {
      height: 44px;
      line-height: 43px;
      overflow: hidden;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;

      .show-big-img {
        display: none;
      }

      .not-show-img {
        display: block;
      }
    }

    li:nth-child(1) {
      margin-top: 8px;
      height: 104px;

      .show-big-img {
        display: block;
      }

      .not-show-img {
        display: none;
      }
    }
  }

  .left-ul:hover {
    li {
      height: 44px;
      line-height: 43px;
      overflow: hidden;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;

      .show-big-img {
        display: none;
      }

      .not-show-img {
        display: block;
      }
    }

    li:nth-child(1) {
      margin-top: 0;
    }

    li:hover {
      margin-top: 8px;
      height: 104px;

      .show-big-img {
        display: block;
      }

      .not-show-img {
        display: none;
      }
    }
  }

  .show-big-img {
    overflow: hidden;
  }

  .not-show-img {
    height: 40px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .left-img {
    width: 94px;
    height: 94px;
    float: left;
  }

  .imgs {
    width: 70px;
    height: 92px;
    float: right;
    border: 1px solid #ddd;
  }

  .right-price {
    width: 100px;
    height: 92px;
    float: left;
    margin-left: 12px;
  }

  .book-title {
    height: 60px;
    white-space: normal;
    line-height: 20px;
  }

  .menu-bottom {
    border-top: 1px solid #dadada;
    font-size: 14px;
    color: #999;
    line-height: 50px;
    padding-left: 5px;
    cursor: pointer;
  }

  /*右边分类推荐*/
  .right-type {
    padding: 0 24px;
    width: 894px;
    float: left;
    background-color: #fff;
    margin: 20px 0;
  }

  .knowledge-wrap {
    margin-top: 12px;
    margin-left: 3px;
    height: 226px;
    overflow: hidden;

    .one-wrap {
      width: 433px;
      height: 100%;
      float: left;
      margin-right: 12px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      background: url('../../../static/images/pic9.jpg') no-repeat;
    }

    .one-wrap:nth-child(2) {
      margin: 0 0 0 12px;
    }

    .bottom-title {
      height: 40px;
      opacity: 0.5;
      background-color: #000;
      margin-top: 122px;
      color: white;
      line-height: 40px;
      width: 90%;
      padding: 0 5%;
      text-align: center;
    }

    .title {
      height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .one-wrap:hover {
      .bottom-title {
        display: none;
      }
      .map-word {
        display: block;
      }
    }

    .map-word {
      display: none;
      padding: 45px 20px 15px;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.5;
      background-color: #000;
      color: white;
      width: 400px;
      height: 226px;
    }
  }

  .type-wrap {
    margin-top: 12px;
    margin-left: 3px;
    height: 260px;
  }
}

</style>
