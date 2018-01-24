<template>
  <div class="searchs">
    <div class="content">
      <headInfo></headInfo>
      <ul class="content-bottom">
        <li class="menu-child">{{sendObj.word}}</li>
        <li class="menu-child" :class="sendObj.index==1?'active':''"  @click="goPath('book')">图书榜单</li>
        <li class="no-content">|</li>
        <li class="menu-child" :class="sendObj.index==2?'active':''"  @click="goOtherUrl('course')">考试课程</li>
        <li class="no-content">|</li>
        <li class="menu-child" :class="sendObj.index==3?'active':''" @click="goOtherUrl(1)">教育在线</li>
        <li class="no-content">|</li>
        <li class="menu-child" :class="sendObj.index==4?'active':''" @click="goPath('building')">建筑图库</li>
        <li class="no-content">|</li>
        <li class="menu-child" :class="sendObj.index==5?'active':''"  @click="goOtherUrl('standard')">标准规范</li>
        <li class="no-content">|</li>
        <li class="menu-child" :class="sendObj.index==6?'active':''"  @click="goPath('toolBook')">工具书</li>
      </ul>
    </div>
  </div>
</template>
<script>
import headInfo from "../common/headInfo.vue"
export default {
  data() {
    return {
     
    }
  },
  props: ['sendObj'],
  components:{
    headInfo
  },
}

</script>
<style lang='less'>
@red-color: #e71515;
.searchs {
  width: 100%;
  height: 140px;
  border-bottom: 2px solid #e6e6e6;
  background-color: #fff;

  .content {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;
  }

  /*men部分*/
  .content-bottom {
    height: 42px;
    line-height: 38px;
    font-size: 16px;
    color: #333;

    li {
      float: left;
      height: 40px;
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
    .active {
      color: @red-color;
      border-bottom: 4px solid @red-color;
    }
    .no-content {
      margin: 0 35px;
      cursor: default;
      color:#979797;
    }
    .menu-child {
      cursor: pointer;
      font-weight: bold;
    }
    .menu-child:not(:nth-child(1)):hover {
      color: @red-color;
    }
  }
}

</style>
