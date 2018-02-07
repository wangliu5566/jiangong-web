<template>
  <div class="head-info">
    <div class="content">
      <div class="content-top">
        <div class="logo"><img src="../../../static/images/logo.jpg" @click="goPath('index')"></div>
        <div class="search">
          <el-select v-model="select1" placeholder="请选择" class="head-select">
            <el-option label="资源" value="资源" key="资源"></el-option>
            <el-option label="标签" value="标签" key="标签"></el-option>
          </el-select>
          <el-input placeholder="请输入关键字" v-model="Title" class="head-input" @keyup.enter.native="dealJump()" @change="controlLength">
          </el-input>
          <el-button icon="el-icon-search" @click="dealJump()" class="head-button"></el-button>
        </div>
        <div class="height-search hover" @click="goPath('searchBook')">高级搜索</div>
        <div class="shopping-icon" @click="goShoppingCar('shoppingCart',hasLogin)">
          <div class="shopping-num">{{shoppingCount}}</div>
        </div>
        <div class="erwei"> <img src="http://124.204.40.3:50683/files/apk_url.png" style="width:100%;"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      select1: "资源",
      Title: '',
      keyWordObj: {
        Title: ''
      }
    }
  },
  computed: mapGetters([
    'shoppingCount',
    'hasLogin'
  ]),
  created() {
    this.fetchDate();
    this.getShoppingCount()
  },

  methods: {
    fetchDate() {
      if (location.href.indexOf('resuKnowledgeSearch') > 0) {
        this.select1 = "标签"
      }
    },
    /**
     * [dealJump 处理跳转]
     * @Author   赵雯欣
     * @DateTime 2017-12-20
     * @return   {[type]}   [description]
     */
    dealJump() {
      if (this.Title.trim() == '') {
        this.$message.warning('请输入关键字')
      } else {
        if (this.select1 == "资源") {
          this.keyWordObj.Title = this.Title
          if (this.$route.path.indexOf('resuResSearch') > 0) {  //本页面
            if (location.href.indexOf('inSearch') > 0) {
              location.href = location.href.split('inSearch=')[0] + "?inSearch=" + this.Title
            } else {
              location.href = location.href + "?inSearch=" + encodeURI(this.Title)
            }

          } else {
            this.resuResSearch(this.keyWordObj)
          }
        } else if (this.select1 == "标签") {
          console.log(location.href)
          if (this.$route.path.indexOf('resuKnowledgeSearch') > 0) {
            if (location.href.indexOf('Keyword') > 0) {
              location.href = location.href.split('Keyword=')[0] + "?Keyword=" + this.Title
            } else {
              location.href = location.href + "?Keyword=" + encodeURI(this.Title)
            }
          } else {
            this.$router.push({ path: '/wrap/resuKnowledgeSearch', query: { Keyword: this.Title } })
          }
        } else {
          this.$message.warning('请选择搜索类型')
        }
      }
    },
    /**
     * [getShoppingCount 获取购物车数量]
     * @Author   赵雯欣
     * @DateTime 2017-12-21
     * @return   {[type]}   [description]
     */
    getShoppingCount() {
      this.$store.dispatch('getShoppingCount');
    },
    controlLength(value) {
      console.log(value)
    }
  },
  watch: {
    "$route": "fetchDate",
  },
}

</script>
<style lang='less'>
@red-color: #e71515;
.head-info {
  width: 100%;
  height: 98px;

  .content {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;
  }
  /*上面搜索部分*/
  .content-top {
    height: 98px;
    overflow: hidden;
  }

  .logo {
    width: 354px;
    overflow: hidden;
    float: left;
    cursor: pointer;
  }

  .search {
    width: 574px;
    height: 41px;
    float: left;
    margin-top: 29px;
    position: relative;

    .head-select {
      width: 100px;
      position: absolute;
      top:0;
      left: 0;

      .el-select__caret,.el-input__inner{
        color:@red-color;
      }
    }
    .head-input {
      width: 380px;
      position: absolute;
      top:0;
      left: 100px;
    }

    .head-button {
      position: absolute;
      width: 75px;
      border-radius: 0;
      background-color:@red-color;
      height: 40px!important;
      color:white;
      left:480px;
      .el-icon-search{
         font-size: 22px;
         line-height: 15px;
      }
    }

    .head-select,
    .head-input,
    .head-button {
      height: 38px;
      border: 1px solid @red-color;

      .el-input,.el-input__inner,.el-input--suffix{
        height: 38px;
        border:none;
      }
    }
  }

  .height-search {
    float: left;
    height: 100%;
    width: 100px;
    font-size: 16px;
    color: #666;
    line-height: 98px;
    text-align: center;
    cursor: pointer;
  }

  .shopping-icon {
    width: 50px;
    height: 60px;
    float: left;
    margin: 10px 20px 0 10px;
    background: url('../../../static/images/che.png') no-repeat 0 25px;
    cursor: pointer;
  }

  .shopping-num {
    width: 20px;
    height: 20px;
    background-color: @red-color;
    color: white;
    text-align: center;
    line-height: 20px;
    border-radius: 20px;
    margin: 18px 0 0 24px;
    font-size: 14px;
  }

  .erwei {
    width: 70px;
    height: 70px;
    float: left;
    border: 1px solid #ddd;
    padding: 5px;
    overflow: hidden;
  }
}

</style>
