<template>
  <div class="index">
    <!-- logo搜索部分 -->
    <logoPart></logoPart>
    <!-- 轮播一大坨 -->
    <sliderPart></sliderPart>
    <!-- 畅销榜单 -->
    <BestSellers></BestSellers>
    <!-- 产品应用 -->
    <product></product>
    <!-- 课程推荐 -->
    <!-- <course :title="type"></course> -->
    <!-- 建筑图库 -->
    <course :title="type1"></course>
    <!-- 行业相关资源 -->
    <resource></resource>
    <!-- 底部图片 -->
    <div class="bottom-img">
      <img src="../../../static/images/downbanner.jpg">
    </div>

  </div>
</template>
<script>
import logoPart from "./LogoPart.vue"
import sliderPart from "./SliderPart.vue"
import BestSellers from "./BestSellers.vue"
import product from "./Product.vue"
import course from "./Course.vue"
import resource from "./Resource.vue"

export default {
  data() {
    return {
      type: '课程推荐',
      type1: '建筑图库',
    }
  },
  props:['widthData'],
  components: {
    logoPart,
    sliderPart,
    BestSellers,
    product,
    course,
    resource,
  }
}

</script>
<style lang='less' >
@red-color: #e71515;
.index {
  overflow: hidden;
  width: 100%;
  min-width: 1200px;

  .bottom-img {
    width: 1200px;
    height: 200px;
    margin: 20px auto;
  }

  
}

</style>
