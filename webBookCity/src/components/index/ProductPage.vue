<template>
  <div class="product-page">
    <searchNoMenu></searchNoMenu>
    <div class='product-content'>
      <div class="path" style="cursor: pointer;"><span @click="goPath('index')">首页</span> &gt; <span>产品应用</span></div>
      <div class="menus">
        <div v-for="(item,index) in dataList" :class="type==index?'click-this':''" @click="changeType(index)">{{item.Title}}</div>
        <div></div>
      </div>
      <div class="index-wrap">
        <div class="left-imgs">
          <img :src="productObj.pic">
        </div>
        <div class="right-word">
          <p class="heigt" style="font-size: 18px;margin-bottom: 12px;">{{productObj.Title}}</p>
          <div class="heigt">
            <el-row>
              <el-col :span="2">
                <div class="grid-content bg-purple">简介:</div>
              </el-col>
              <el-col :span="22">
                <div class="grid-content bg-purple-light"> {{productObj.Abstracts}}</div>
              </el-col>
            </el-row>
          </div>
          <div class="heigt">
            <el-row>
              <el-col :span="2">
                <div class="grid-content bg-purple">内容:</div>
              </el-col>
              <el-col :span="22">
                <div class="grid-content bg-purple-light"> {{productObj.Content}}</div>
              </el-col>
            </el-row>
          </div>
          <div v-if="productObj.Id==1" style="line-height: 30px;position: relative;overflow: hidden;height:100px;">
            二维码：
            <div class="img-wrap">
              <img src="../../../static/images/isgongerweima.png" style="width:74px;">
            </div>
          </div>
          <div v-if="productObj.Id==3" style="line-height: 50px;">
            链接地址：<a href="http://www.cabp.com.cn/" target="_blank">http://www.cabp.com.cn/</a>
          </div>
        </div>
      </div>
      <div class="bottom-img">
        <img src="../../../static/images/downbanner.jpg">
      </div>
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../common/SearchNoMenu.vue"

export default {
  data() {
    return {
      type: 1,
      productObj: {},
      dataList: [{
        Id: 1,
        Title: 'I施工',
        pic: '../../../static/images/首页图/ishigong.jpg',
        Abstracts: '中国建筑工业出版社的“i施工”产品是从建筑施工领域从业人员的实际需要出发，以《建筑施工手册（第五版）》内容为基本架构，针对建筑施工专业特点而开发的建筑施工专业知识资源库与信息服务平台。',
        Content: '划分为建筑施工工艺工法资源库、建筑施工管理与技术文件资源库、建筑材料与施工机具设备产品选型库、建筑施工全过程可视化资源库和建筑施工专业人员的在线学习互动平台，为建筑施工从业人员和学习研究人员提供高品质的专业知识服务，即四库一平台。'
      }, {
        Id: 2,
        Title: 'I土木',
        pic: '../../../static/images/首页图/itumu.jpg',
        Abstracts: '建筑结构与岩土工程专业知识资源库是中国建筑工业出版社从建筑结构与岩土工程专业领域从业人员的实际需求出发，搭建的面向建筑结构和岩土工程领域全体从业人员的知识服务平台。',
        Content: '划分为建筑结构及岩土工程两个子库，覆盖标准规范，设计资料，设计软件，工程案例以及在线学习互动平台（包括注册考试培训、专家微课、会议报告、访谈视频、专家答疑）等方面。',
      }, {
        Id: 3,
        Title: '中国建筑出版社官网',
        pic: '../../../static/images/首页图/jianzhuzaixian.jpg',
        Abstracts: '中国建筑工业出版社的“i施工”产品是从建筑施工领域从业人员的实际需要出发，以《建筑施工手册（第五版）》内容为基本架构，针对建筑施工专业特点而开发的建筑施工专业知识资源库与信息服务平台。',
        Content: '划分为建筑施工工艺工法资源库、建筑施工管理与技术文件资源库、建筑材料与施工机具设备产品选型库、建筑施工全过程可视化资源库和建筑施工专业人员的在线学习互动平台，为建筑施工从业人员和学习研究人员提供高品质的专业知识服务，即四库一平台。'
      }]

    }
  },
  components: {
    searchNoMenu,
  },
  mounted() {
    this.type = this.$route.query.id - 1;
    this.productObj = this.dataList[this.$route.query.id - 1]
  },
  methods: {
    changeType(index) {
      this.type = index;
      this.productObj = this.dataList[index]
    },
  },

}

</script>
<style lang='less'>
.product-page {
  width: 100%;
  overflow: hidden;

  .product-content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .menus {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #333;

    div {
      padding: 0 25px;
      border: 1px solid #dedede;
      border-right:none;
      background-color: #ebebeb;
      cursor: pointer;
      float: left;
    }
    div:nth-child(4){
      width: 778px;
      border-top: none;
      height: 41px;
      border-bottom: 1px solid #dedede;
      background-color: #fff;
    }
    .click-this{
      background-color: #fff;
      border-bottom: 1px solid #fff
    }
  }
  .index-wrap {
    width: 1158px;
    height: 350px;
    border: 1px solid #dedede;
    border-top: none;
    padding: 20px;
    overflow: hidden;
  }

  .left-imgs,
  .right-word {
    float: left;
    height: 100%;
    overflow: hidden;
  }

  .left-imgs {
    width: 580px;
    height: 100%;
  }

  .right-word {
    width: 555px;
    height: 100%;
    margin-left: 20px;
  }

  .heigt {
    line-height: 30px;
  }

  .img-wrap {
    position: absolute;
    left: 70px;
    top: 5px;
    padding: 5px 5px 0 5px;
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 10px;

  }

  .bottom-img {
    margin: 20px 0;
  }
}

</style>
