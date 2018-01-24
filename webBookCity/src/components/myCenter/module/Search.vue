<template>
  <div class="logo-part">
    <div class="content">
<!--
      <div class="content-top">
        <div class="logo" @click='goPath("index")'><img src="static/images/logo.jpg"></div>
        <div class="search">
          <el-input placeholder="请输入内容" v-model="searchObj" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="height-search hover">高级搜索</div>
        <div class="shopping-icon">
          <div class="shopping-num">2</div>
        </div>
        <div class="erwei"></div>
      </div>
-->
     <head-info></head-info>
      <ul class="content-bottom">
        <li @mouseenter="showmenu=true" @mouseleave="hidemenu">个人中心</li>
        <li class="menu-child"  @click="goPath('book')">图书榜单</li>
        <li class="no-content">|</li>
        <li class="menu-child"   @click="goOtherUrl('course')">考试课程</li>
        <li class="no-content">|</li>
        <li class="menu-child" @click="goOtherUrl(1)">教育在线</li>
        <li class="no-content">|</li>
        <li class="menu-child" @click="goPath('building')">建筑图库</li>
        <li class="no-content">|</li>
        <li class="menu-child" @click="goOtherUrl('standard')">标准规范</li>
        <li class="no-content">|</li>
        <li class="menu-child"  @click="goPath('toolBook')">工具书</li>
      </ul>
      <ul class="type-menus">
        <li :class='selectType==0?"type-menu-select":""'  @click='goPath("center")'>我的建工</li>
        <li :class='selectType==1?"type-menu-select":""'  @click='goPath("myOrder")'>我的订单</li>
        <li :class='selectType==2?"type-menu-select":""' @click='goPath("Myshop")'>已购资源</li>
        <li :class='selectType==3?"type-menu-select":""' @click='goPath("collect")'>我的收藏</li>
        <li :class='selectType==4?"type-menu-select":""' @click='goPath("track")'>我的足迹</li>
        <li :class='selectType==5?"type-menu-select":""' @click='goPath("mycomment")'>我的评论</li>
        <li :class='selectType==6?"type-menu-select":""' @click='goPath("accountSetting")'>账户设置</li>
      </ul>
    </div>
  </div>
</template>
<script>
    import headInfo from "../../common/headInfo.vue"
    export default {
        data() {
            return {
                searchObj: '',
                select: "",
                showmenu: false,
            }
        },
        props: ['selectType'],
        components: {
            headInfo,
        },
        methods: {
            goPath(url) {
                this.$router.push(url)
            },
            hidemenu() {
                setTimeout(() => {
                    // this.showmenu = false;
                }, 300)

            }
        }

    }

</script>
<style lang='less'>
    @red-color: #e71515;
    .logo-part {
        width: 100%;
        height: 140px;
        border-bottom: 2px solid #e6e6e6;
        .content {
            width: 1200px;
            margin: 0 auto;
            position: relative;
            .type-menu-select {
                  color: @red-color;
                background-color: #e5e5e5;
                padding-left: 19px;
                border-left: 2px solid @red-color;
            }
        }
/*
        上面搜索部分
        .content-top {
            height: 98px;
            overflow: hidden;
        }
*/

/*
        .logo {
            width: 354px;
            overflow: hidden;
            float: left;
            cursor: pointer;
        }

        .search {
            width: 574px;
            height: 38px;
            float: left;
            margin-top: 29px;
            line-height: 38px;

            .el-select .el-input-group__append,
            .el-input-group__prepend {
                border: 1px solid @red-color;
                background-color: white;
                width: 70px;
                color: @red-color;
            }

            .el-select .el-input .el-select__caret {
                color: @red-color;
            }

            .el-input__inner {
                border-color: @red-color;
                border-left: none;
            }

            .el-input-group__append {
                width: 40px;
                background-color: @red-color;
                border: 1px solid @red-color;
                color: white;
                font-size: 30px;
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
        }

        .shopping-icon {
            width: 90px;
            height: 98px;
            float: left;
            background: url('../../../../static/images/che.png') no-repeat 10px 30px;
            .shopping-num {
                width: 30px;
                height: 30px;
                background-color: @red-color;
                color: white;
                text-align: center;
                line-height: 30px;
                font-weight: 700;
                border-radius: 20px;
                margin: 14px 0 0 30px;
            }
        }

        .erwei {
            width: 80px;
            height: 80px;
            float: left;
            background-color: #ddd;
        }
*/

        /*men部分*/
        .content-bottom {
            line-height: 38px;
            font-size: 16px;
            color: #333;


            li {
                float: left;
                height: 38px;
            }

            li:nth-child(1) {
                width: 222px;
                padding-left: 20px;
                color: white;
                background-color: @red-color;
                border-bottom: 4px solid @red-color;
                cursor: pointer;
                margin-right: 35px;
            }
            .no-content {
                margin: 0 35px;
                cursor: default;
                color: #979797;
            }
            .menu-child {
                cursor: pointer;
                font-weight: bold;
            }
            .menu-child:hover {
                color: @red-color;
                border-bottom: 4px solid @red-color;
            }
        }
        /*下拉菜单部分*/
        .type-menus {
            width: 242px;
/*            border-right: 1px solid #e5e5e5;*/
            border-bottom: 1px solid #e5e5e5;
            position: absolute;
            top: 140px;
            li {
                font-size: 14px;
                color: #464646;
                line-height: 42px;
                background-color: #fff;
                border-left: 1px solid #e5e5e5;
                border-right: 1px solid #e5e5e5;
                padding: 2px 0 2px 20px;
                cursor: pointer;
            }
            li:hover {
                color: @red-color;
/*
                background-color: #e5e5e5;
                padding-left: 19px;
                border-left: 2px solid @red-color;
*/
            }
        }
        /*二级目录*/
        .type-child-menu {
            position: absolute;
            top: 140px;
            left: 242px;
            width: 240px;
            height: 200px;
            border-top: 1px solid #e5e5e5;

            li {
                padding-left: 20px;
                font-size: 14px;
                color: #464646;
                line-height: 42px;
                background-color: #fff;
                cursor: pointer;
            }
            li:hover {
                color: @red-color;
                background-color: #e5e5e5;
            }

        }
    }

</style>
