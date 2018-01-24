<template>
  <div class="product">
    <div class="product-content">
      <div class="content-title">
        <span class="red-border"></span>
        <span class="title">产品应用</span>
        <!-- <span class="content-more" @click="goPath('product')">更多 ></span> -->
      </div>
      <div class="products">
        <div class="img-wrap" v-for="item in dataList">
          <div class="imgs" @click="goDetail('product',item.Id)">
            <img :src="item.corverImg">
          </div>
          <p style="margin-top: 10px;text-align: center;" class="hover" @click="goDetail('product',item.Id)">{{item.Title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [{
        Id:1,
        Title:'I施工',
        corverImg:'../../../static/images/首页图/i施工.png',
        Abstracts:'中国建筑工业出版社的“i施工”产品是从建筑施工领域从业人员的实际需要出发，以《建筑施工手册（第五版）》内容为基本架构，针对建筑施工专业特点而开发的建筑施工专业知识资源库与信息服务平台。',
        Content:'划分为建筑施工工艺工法资源库、建筑施工管理与技术文件资源库、建筑材料与施工机具设备产品选型库、建筑施工全过程可视化资源库和建筑施工专业人员的在线学习互动平台，为建筑施工从业人员和学习研究人员提供高品质的专业知识服务，即四库一平台。'
      },{
        Id:2,
        Title:'I土木',
        corverImg:'../../../static/images/首页图/I土木.png',
        Abstracts:'建筑结构与岩土工程专业知识资源库是中国建筑工业出版社从建筑结构与岩土工程专业领域从业人员的实际需求出发，搭建的面向建筑结构和岩土工程领域全体从业人员的知识服务平台。',
        Content:'划分为建筑结构及岩土工程两个子库，覆盖标准规范，设计资料，设计软件，工程案例以及在线学习互动平台（包括注册考试培训、专家微课、会议报告、访谈视频、专家答疑）等方面。',
      },{
        Id:3,
        Title:'中国建筑出版社官网',
        corverImg:'../../../static/images/首页图/建工.png',
        Abstracts:'中国建筑工业出版社的“i施工”产品是从建筑施工领域从业人员的实际需要出发，以《建筑施工手册（第五版）》内容为基本架构，针对建筑施工专业特点而开发的建筑施工专业知识资源库与信息服务平台。',
        Content:'划分为建筑施工工艺工法资源库、建筑施工管理与技术文件资源库、建筑材料与施工机具设备产品选型库、建筑施工全过程可视化资源库和建筑施工专业人员的在线学习互动平台，为建筑施工从业人员和学习研究人员提供高品质的专业知识服务，即四库一平台。'
      }]
    }
  },
  mounted() {
    // this.getlist()
  },
  methods: {
    getlist() {
      this.$http.post("/Product/List", {
          cp: 1,
          ps: 3,
          keyWord: '',
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList
          }
        })
    },
  },
}

</script>
<style lang='less'>
.product {
  width: 100%;
  overflow:hidden;

overflow:hidden;
  .product-content {
    width: 1200px;
    margin: 0 auto;
    overflow:hidden;
  }
  .products {
    overflow: hidden;
  }

  .img-wrap {
    width: 360px;
    height: 212px;
    margin-top: 20px;
    overflow: hidden;

    float: left;
  }
  .imgs {
    width: 358px;
    height: 184px;
    cursor: pointer;
  }

  .img-wrap:nth-child(2) {
    margin: 20px 58px 0;
  }

  .names {
    line-height: 48px;
    font-size: 16px;
    color: #333;
    text-align: center;
  }
}

</style>
