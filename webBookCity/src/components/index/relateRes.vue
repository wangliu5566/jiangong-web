<template>
  <el-row>
    <el-col :span="8">
      <div class="leftSidebar">
        <p class="related">
          <span class="relatedText">相关资源推荐</span>
        </p>
        <!-- 分割线 -->
        <div class="partition"></div>
        <div class="productBook" v-for="(item,index) in dataList">
          <el-col :span="10">
            <div class="books" style="border:none;background:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
               <div class="books" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="booksName">
              <p style="overflow:hidden;height:45px;">
                <span class="hover" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title?item.Title.length>12?item.Title.slice(0,12)+'...':item.Title:''}}</span>
              </p>
              <p class="hostPrice">&yen;{{handleMarketPrice(item.ObjectType, item)}}</p>
              <p class="nowPrice">&yen;{{handleCurrentPrice(item.ObjectType, item)}}</p>
            </div>
          </el-col>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      dataList:[],
    }
  },
  props: ['ObjectTypes'],
  mounted() {
    if(!!this.ObjectTypes&&this.ObjectTypes!=''){
      this.getlist(this.ObjectTypes)
    }else{
       this.getlist('')
    }
    
    
  },
  methods: {
    getlist(ObjectTypes) {
      if(ObjectTypes==101){
         this.$http.post("/ExplicitWord/Search", {
          cp: 1,
          ps: 10,
          // query: JSON.stringify({
            // ObjectTypes: [101], //知识标签
            // Keyword: this.title,
            // CategoryIds: this.typeId,
            // SearchOrderBy: {
            //   ColumnName: this.searchKey == 1 ? 'readCount' : this.searchKey == 2 ? 'onShelfDate' : '',
            //   Descending: true,
            // },
            //  ExtendProperties:{
            //   IsOnShelf:true,
            // }
          // })
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList;
            // this.totalCount = res.data.Data.RecordCount;
          }
        })
      }else{
        this.$http.get("/Content/Recommend", {
          params:{
            count:10,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data;
          }
        })
      }
      
    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.leftSidebar {
  border: 1px solid #ccc;
  width: 240px;
  margin-bottom: 20px;
}

.related {
  line-height: 60px;
  font-size: 16px;
  font-weight: 600;
  height: 46px;
}

.relatedText {
  margin-left: 15px;
  color: #464646;
}

.full {
  margin: 15px 20px;
  font-size: 14px;
  color: #999;
}

.partition {
  width: 212px;
  height: 1px;
  margin: 0 auto;
  background: #ccc;
}

.productBook {
  margin:0 15px;
  width: 212px;
  height: 95px;
  margin-top: 18px;
  margin-bottom: 20px;
}

.books {
  width: 70px;
  height: 95px;
  border: 1px solid #ddd;
  cursor: pointer;
}

.booksName {
  height: 95px;
}

.booksName span {
  font-size: 14px;
  font-weight: 400;
}

.hostPrice {
  margin-top: 14px;
  text-decoration: line-through;
  font-size: 14px;
  color: #bbb;
}

.nowPrice {
  font-size: 16px;
  color: #e83534;
}

</style>
