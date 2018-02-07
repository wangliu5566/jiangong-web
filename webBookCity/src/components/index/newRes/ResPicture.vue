<template>
  <div class="res-pictrue" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)">
    <div style="overflow: hidden;">
      <div class="one-wrap" v-for="item in dataList">
        <div class="imgs" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
          <div style="width:100%;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
        </div>
        <p class="names" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
        <p style="line-height: 22px;height: 22px;">
          <span class="price">&yen;{{formatPrice(item.ExtendData.MediumImagePrice?item.ExtendData.MediumImagePrice:0,2)}}</span>
          <span class="market-price" style="float: right">&yen;{{formatPrice(item.ExtendData.OriginalImagePrice?item.ExtendData.OriginalImagePrice:0,2)}}</span>
        </p>
        <div style="font-size: 14px;">
          <el-row>
            <el-col :span="12">
              <p :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" @click="collectFn(item,index,changeIsFavorited)">收藏</p>
            </el-col>
            <el-col :span="12">
              <div class="shopping-car" v-if="showShoppingIcon(item)" @click="addShopping(item)">购物车</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      page: 1,
      pageSize: 30,
      totalCount: 0,
      dataList: [],
    }
  },
  mounted() {
    this.getlist()
  },
   computed: mapGetters([
    'loginModal',
    'callbackAfterLogin',
  ]),
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getlist()
    },
    /**
     * [changeIsFavorited 修改收藏状态]
     * @Author   赵雯欣
     * @DateTime 2018-02-01
     * @param    {[type]}   index [description]
     * @return   {[type]}         [description]
     */
    changeIsFavorited(index){
      this.dataList[index].ExtendData.IsFavorited = true ;
      this.$set(this.dataList,index,this.dataList[index])
    },
    /**
     * [getlist 最新资源]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @return   {[type]}   [description]
     */
    getlist() {
      this.loading = true;
      this.$http.post("/Content/Search", {
          cp: this.page,
          ps: this.pageSize,
          query: JSON.stringify({
            ObjectTypes: [108], //类型
            SearchOrderBy: {
              ColumnName: 'onShelfDate',
              Descending: true,
            },
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList
            this.totalCount = res.data.Data.RecordCount
            this.loading = false;
          }
        })
    },
  },
   watch:{
    'loginModal': function(val, oldVal) {
      if (!val && this.callbackAfterLogin.position == 'index') {
        if(this.callbackAfterLogin.callback == 'indexCollect'){
           this.collectFn(this.callbackAfterLogin.id,this.callbackAfterLogin.ObjectType,true,this.getlist)
        }else if (this.callbackAfterLogin.callback == 'indexAddShopping') {
           this.addShopping(this.callbackAfterLogin.item)
        }
      }
    }
  }
}

</script>
<style lang='less'>
.res-pictrue {
  width: 1148px;
  border: 1px solid #dedede;
  min-height: 200px;
  border-top: none;
  color: #464646;
  padding: 20px 25px 0 25px;
  overflow: hidden;

  .one-wrap {
    width: 140px;
    height: 292px;
    float: left;
    margin-right: 110px;
    font-size: 14px;
    line-height: 30px;
    overflow: hidden;
  }
  .one-wrap:nth-child(5n) {
    margin-right: 0;
  }

  .imgs {
    width: 138px;
    height: 182px;
    border: 1px solid #ddd;
    cursor: pointer;
  }
}

</style>
