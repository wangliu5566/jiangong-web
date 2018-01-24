<template>
  <div class="notice-list" :style="{minHeight:clientHeight+'px'}">
    <searchNoMenu></searchNoMenu>
    <div class='power-content global-box'>
      <div class="path" style="cursor: pointer;"><span @click="goPath('index')">首页</span> &gt; <span>公告</span></div>
      <ul>
        <li>
          <h6>
            <span class="fl">标题</span>
            <span class="fr">发表时间</span>
          </h6>
        </li>
        <li class="mt20 li-cover" v-for="(item,index) in dataList" @click="goNoticeDetail(item.Id)">
          <span class="fl ml20">
            <b></b>
            {{item.Title}}
          </span>
          <span class="fr mr20">{{item.CreateTime}}</span>
        </li>
      </ul>
      <div class="page">
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../../common/SearchNoMenu.vue"

export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      totalCount: 0,
      dataList: [],
    }
  },
  props: ['clientHeight'],
  components: {
    searchNoMenu,
  },
  mounted() {
    this.getlist()
  },
  methods: {
    /**
     * [getlist 获取公告]
     * @Author   赵雯欣
     * @DateTime 2017-12-22
     * @return   {[type]}   [description]
     */
    getlist() {
      this.$http.get("/Message/GetMessageList", {
          params: {
            cp: this.page,
            ps: this.pageSize,
            keyWord: '',
            IsPublish: true,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList;
            this.totalCount = res.data.Data.RecordCount;
          }
        })
    },
    /**
     * [handleCurrentChange @description 切换分页]
     * @Author   赵雯欣
     * @DateTime 2017-12-22
     * @param    {[type]}   val [description]
     * @return   {[type]}       [description]
     */
    handleCurrentChange(val) {
      this.page = val;
      this.getlist()
    },
    /**
     * [goNoticeDetail 跳转公告详情页]
     * @Author   赵雯欣
     * @DateTime 2017-12-22
     * @return   {[type]}   [description]
     */
    goNoticeDetail(id) {
      this.$router.push({ path: '/wrap/noticeContent', query: { id: id } })
    }
  },
}

</script>
<style lang='less'>
@red-color: #e71515;
.notice-list {
  width: 100%;

  .power-content {
    font-size: 14px;
    color: #666;
    &>ul {
      width: 100%;
      li {
        /*list-style-type: disc;*/
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        box-sizing: border-box;
        border: 1px solid #e6e6e6;
        b {
          margin: 13px 3px;
          float: left;
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background: #656565;
        }
      }
      .li-cover:hover {
        border-color: @red-color;
      }
      li:first-child {
        background: #f2f2f2;
        padding: 0 60px 0 178px;
        h6 {
          font-size: 14px;
        }
      }
    }
  }
}

</style>
