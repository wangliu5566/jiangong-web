<template>
  <div class="footer">
    <p style="height:20px;width:100%;background:#fff;border-bottom: 1px solid #e71515;"></p>
    <p class="tabs">
      友情链接：
      <span class="span-hover" @click="goOtherPage('http://www.mohurd.gov.cn/')">住房与城乡建设部</span>
      <span class="line-content">|</span>
      <span class="span-hover" @click="goOtherPage('http://www.china-building.com.cn/default.aspx')">中国建筑书店</span>
      <span class="line-content">|</span>
      <span class="span-hover" @click="goOtherPage('http://book.dichan.com/')">新浪地产网书城</span>
      <span class="line-content">|</span>
      <span class="span-hover" @click="goOtherPage('http://www.ktbook.com.cn:88/Default_sckt.aspx')">科图建筑图书网</span>
      <span class="line-content">|</span>
      <span class="span-hover" @click="goOtherPage('http://www.buildingbooks.com.cn/')">中国建筑图书网</span>
      <span class="line-content">|</span>
      <span class="span-hover" @click="goOtherPage('http://www.jzts.cn/')">重庆建兴图书</span>
      <span class="line-content">|</span>
      <span class="span-hover" @click="goOtherPage('http://www.bztsbook.com/')">四川标准图书发行公司</span>
      <span class="line-content">|</span>
      <span class="span-hover" @click="goOtherPage('http://www.winxuan.com/')">文轩网</span>
    </p>
    <div class="foot-bottom">
      <p>
        <span>服务热线：4008-188-688</span>
        <span>服务时间：周一至周五 9：00-17：00</span>
      </p>
      <p>
        <span class="span-hover" @click="goOtherPage('http://www.cabp.com.cn/cbwjyxk.jsp?id=63915&nodeid=1713')">出版物经营许可</span>
      </p>
      <p>
        <span class="span-hover" @click="goOtherPage('http://www.cabp.com.cn/about.jsp?id=9712&nodeid=1316')">关于我们</span>
        <span class="line-content">|</span>
        <span class="span-hover" @click="goOtherPage('http://www.cabp.com.cn/newsdetail.jsp?id=59192&nodeid=1705')">联系我们</span>
      </p>
      <p>
        <span>中国建筑工业出版社主办</span>
        <span>京ICP备：13006569号-1</span>
        <span>版权声明</span>
        <span class="icon-s span-hover"  @click="goOtherPage('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802023620')">京公网安备 11010802023620号</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goOtherPage(path) {
      window.open(path);
    }

  }
}

</script>
<style lang='less'>
.footer {
  width: 100%;
  height: 248px;
  min-width: 1200px;
  overflow: hidden;
  -webkit-background-size: 100%;
  background-size: 100%;
  color:#666;

  .tabs {
    width: 1200px;
    margin:0 auto;
    height: 70px;
    line-height: 70px;
    font-size: 14px;
    border-bottom: 1px solid #7c7c7c;
    text-align: center;
    color:#666;
  }

  .span-hover {
    cursor: pointer;
  }

  .span-hover:hover {
    color: #ea742c;
    border-bottom: 1px solid #ea742c;
  }

  .line-content {
    margin: 0 12px;
    color:#7c7c7c;
  }

  .icon-s{
    background:url('../../../static/images/gobngan.png') no-repeat 0 2px;
    padding-left: 23px;
  }

  .foot-bottom {
    padding-top: 20px;
    height: 100px;
    line-height: 24px;
    font-size: 14px;
    text-align: center;

    span {
      margin:0 12px;
    }
    .line-content {
      margin: 0;
      /*color: #949494;*/
    }
  }
}

</style>
