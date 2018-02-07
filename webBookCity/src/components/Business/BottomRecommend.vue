<template>
  <div class="bottom-recommend">
    <!-- 相关推荐 -->
    <div class="shopp-bottom">
      <p style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;">
        <span class="red-border"></span>同类已购资源推荐
      </p>
      <ul>
        <li class="small-img" v-for="(item,index) in dataList">
          <div class="img-box" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
            <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
          </div>
          <p class="names" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
          <p class="price-text">&yen;{{handleCurrentPrice(item.ObjectType, item)}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../common/SearchNoMenu.vue"
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      dataList: [],
    }
  },
  computed: mapGetters([
    'userInfo'
  ]),
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      this.$http.get("/Content/Recommend", {
          params: {
            objectId: '',
            count: 6,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data;
          }
        })
    },
   
  },

}

</script>
<style lang='less'>
@red-color: #e71515;
.bottom-recommend {
  width: 100%;
  .shopp-bottom {
    overflow: hidden;
    width: 1160px;
    margin: 20px 0;
    padding: 10px 20px 0;
    height: 316px;
    line-height: 40px;
    background: #fff;
    .small-img {
      display: inline-block;
      width: 140px;
      height: 240px;
      margin-right: 64px;
      .img-box {
        width: 100%;
        height: 180px;
        border: 1px solid #ddd;
        cursor: pointer;
      }
    }
    .small-img:nth-child(6) {
      margin-right: 0;
    }
    .price-text {
      color: #e71617;
      line-height: 30px;
    }
  }
}

</style>
