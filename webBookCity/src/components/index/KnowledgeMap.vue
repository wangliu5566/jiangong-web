<template>
  <div class="knowledge-map" :style="{minHeight:clientHeight+'px'}">
    <!-- 引用头部 -->
    <searchNoMenu></searchNoMenu>
    <!-- 内容区 -->
    <div class='content'>
      <div class="path" style="cursor: pointer;"><span @click="goPath('index')">首页</span> &gt; <span>知识图谱</span></div>
      <!-- 循环部分 -->
      <div class="knowCon" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(256, 256, 256, 0.8)">
        <div v-for="item in knowledgeList" class='wrap-line'>
          <div class="map-img" @click="goDetail('exp',item.Id)">
            <img src="../../../static/images/biaoqian.png">
          </div>
          <div class="map-word">
            <h4 class="title" @click="goDetail('exp',item.Id)">{{item.Title}}</h4>
            <div style="line-height: 25px;">{{item.Abstracts?item.Abstracts.length>110?item.Abstracts.slice(0,110)+"...":item.Abstracts:''}}</div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div class="page">
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
      
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../common/SearchNoMenu.vue"
export default {
  data() {
    return {
      loading:false,
      page: 1,
      pageSize: 10,
      totalCount: 0,
      knowledgeList: [],
    }
  },
  props: ['clientHeight'],
  components: {
    searchNoMenu,
  },
  mounted() {
    this.getKnowdgeList()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getKnowdgeList()
    },
    /**
     * [getKnowdgeList 获取知识图谱]
     * @Author   赵雯欣
     * @DateTime 2017-12-18
     * @return   {[type]}   [description]
     */
    getKnowdgeList() {
      this.loading = true;
      this.$http.get("/ExplicitWord/Search", {
          params: {
            cp: this.page,
            ps: this.pageSize,
            keyword: '',
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.knowledgeList = res.data.Data.ItemList
            this.totalCount = res.data.Data.RecordCount
            this.loading = false;
          }
        })
    },
  },

}

</script>
<style lang='less'>
@red-color: #e71515;
.knowledge-map {
  width: 100%;
  overflow: hidden;

  .content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .knowCon {
    overflow: hidden;
    padding: 0 30px;
  }

  .wrap-line {
    width: 570px;
    float: left;
    margin: 20px 0;
    overflow: hidden;
  }

  .wrap-line:nth-child(2n+1) {
    width: 540px;
    margin-left: 30px;
  }

  .map-img {
    float: left;
    width: 158px;
    height: 190px;
    cursor: pointer;
    overflow: hidden;
    background: url('../../../static/images/pic12.jpg') no-repeat;
  }
  .map-word {
    padding-left: 20px;
    float: left;
    width: 356px;
    height: 190px;
    overflow: hidden;

    .title {
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .title:hover{
        color:@red-color;
        cursor: pointer;
    }
  }
}

</style>
