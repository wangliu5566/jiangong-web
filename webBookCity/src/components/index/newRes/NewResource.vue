<template>
  <div class="new-res" :style="{minHeight:clientHeight+'px'}">
    <searchNoMenu></searchNoMenu>
    <div class='content' >
      <div class="path" style="cursor: pointer;"><span @click="goPath('index')">首页</span> &gt; <span>最新资源</span></div>
      <div class="menus">
        <span :class="type==1?'click-this':''" @click="changeType(1,'/wrap/newRes/resBook')">新书速递</span>
        <span :class="type==2?'click-this':''" @click="changeType(2,'/wrap/newRes/resVideo')">视频教程</span>
        <span :class="type==3?'click-this':''" @click="changeType(3,'/wrap/newRes/resPicture')">最新图片</span>
        <span>&nbsp;</span>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../../common/SearchNoMenu.vue"

export default {
  data() {
    return {
      type: 1,
    }
  },
  props: ['clientHeight'],
  components: {
    searchNoMenu,
  },
  mounted() {
    var path = this.$route.path;
    if (path.indexOf('resBook') > 0) {
      this.type = 1;
    } else if (path.indexOf('resVideo') > 0) {
      this.type = 2
    }else if (path.indexOf('resPicture') > 0) {
      this.type = 3
    }
  },
  methods: {
    changeType(index, path) {
      this.type = index;
      this.$router.push(path)
    },
  },
}

</script>
<style lang='less'>
.new-res {
  width: 100%;

  .content {
    width: 1200px;
    overflow: hidden;
    margin: 0 auto;
  }

  .menus {
    height: 40px;
    line-height: 39px;
    font-size: 16px;
    color: #333;

    span {
      width: 120px;
      text-align: center;
      border: 1px solid #ddd;
      background-color: #ebebeb;
      border-left: none;
      cursor: pointer;
      display: block;
      float: left;
    }

    span:nth-child(1) {
      border-left: 1px solid #dedede;
    }
    span:nth-child(4) {
      width: 834px;
      background-color: #fff;
      border: 1px solid #fff;
      border-bottom: 1px solid #dedede;
      cursor: default;
    }

    .click-this {
      background-color: #fff;
      border-bottom: 1px solid #fff
    }
  }
}

</style>
