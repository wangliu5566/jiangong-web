<template>
  <div class="index-sell-book" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)">
    <p class='times'>时间：
      <span @click="choiceData(0,1)" :class="DateIndex==0?'red':''">近24小时</span>
      <span @click="choiceData(1,7)" :class="DateIndex==1?'red':''">近7日</span>
      <span @click="choiceData(2,30)" :class="DateIndex==2?'red':''">近30日</span>
    </p>
    <!-- 畅销榜单 -->
    <div style="overflow:hidden;padding: 0 30px;">
      <div class="boxs" v-for="(item,index) in bookList">
        <div class="img-index">{{index+1}}.</div>
        <div class="img-right">
          <div class="img-box" style="background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
            <div style="width:138px;height:100%;" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
          </div>
          <p class="title" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
          <p class="price-line">
            <span class="price">&yen;{{formatPrice(item.CurrentPrice,2)}}</span>
            <span class="market-price" style="float:right;">&yen;{{formatPrice(item.MarketPrice,2)}}</span>
          </p>
          <p :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" @click="collectFn(item.Id,item.ObjectType,!item.ExtendData.IsFavorited,getlist)" style="background-position: 0 4px;">收藏</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: true,
      sendObj: {
        word: '图书榜单',
        index: 1
      },
      page: 1,
      pageSize: 52,
      totalCount: 0,
      bookList: [],

      DateIndex: 0,
      dateLength: 1,
    }
  },
  props:['menuId'],
  computed: mapGetters([
    'loginModal',
    'callbackAfterLogin',
  ]),
  mounted() {
    this.getlist()
  },
  methods: {
    /**
     * [choiceData 时间天数的选择]
     * @Author   赵雯欣
     * @DateTime 2017-12-19
     * @param    {[type]}   index      [description]
     * @param    {[type]}   dateLength [description]
     * @return   {[type]}              [description]
     */
    choiceData(index, dateLength) {
      this.DateIndex = index;
      this.dateLength = dateLength
      this.getlist()
    },
    getlist() {
      this.loading = true;
      this.$http.post("/Content/Search", {
          cp: this.page,
          ps: this.pageSize,
          query: JSON.stringify({
            ObjectTypes: [104], //图书
            CategoryIds: !this.menuId||this.menuId == '' ? '' : [this.menuId],
            SearchOrderBy: {
              ColumnName: 'readCount',
              Descending: true,
            },
            ExtendProperties: {
              IsOnShelf:true,
              onShelfDate: 'startDate=' + this.calculateOneDate(this.dateLength) + '@endTime=' + this.calculateOneDate(0)
            }
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.bookList = res.data.Data.ItemList;
            this.totalCount = res.data.Data.RecordCount;
            this.loading = false;
          }
        })
    },
  },
  watch: {
    'loginModal': function(val, oldVal) {
      if (!val && this.callbackAfterLogin.position == 'index') {
        this.collectFn(this.callbackAfterLogin.id, this.callbackAfterLogin.ObjectType, true, this.getlist)
      }
    },
    'menuId':function(val,old){
      this.getlist()
    }
  }
}

</script>
<style lang='less'>
@red-color: #e71515;
.index-sell-book {
  width: 100%;
  width: 936px;
  min-height: 280px;
  border: 1px solid #dedede;
  border-top: none;
  overflow: hidden;
  padding-bottom: 20px;

  .times {
    height: 41px;
    line-height: 41px;
    width: 878px;
    margin: 0 auto;
    border-bottom: 1px solid #dedede;
    color: #666;
    font-size: 14px;

    span {
      margin-right: 20px;
      cursor: pointer;
    }
  }

  /*图书样式*/
  .boxs {
    width: 181px;
    height: 270px;
    margin-top: 20px;
    margin-right: 50px;
    float: left;
    overflow: hidden;
  }

  .boxs:nth-child(4n) {
    margin-right: 0;
  }

  .img-index {
    float: left;
    width: 40px;
    text-align: center;
  }

  .img-right {
    width: 140px;
    float: left;
    overflow: hidden;
  }

  .img-box {
    width: 138px;
    height: 182px;
    margin-bottom: 6px;
    overflow: hidden;
    border: 1px solid #ddd;
    cursor: pointer;
  }

  .title {
    font-size: 16px;
    color: #464646;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .title:hover {
    color: @red-color;
  }
  .price-line {
    font-size: 16px;
    line-height: 24px;
    color: @red-color;
  }

  .shopping-car3 {
    padding-left: 22px;
    line-height: 20px;
    background: url('../../../../static/images/che.png') no-repeat 0 2px;
    -webkit-background-size: 16px;
    background-size: 17px;
    cursor: pointer;
  }
}

</style>
