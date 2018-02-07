<template>
  <div class="course-page">
    <search :sendObj="sendObj"></search>
    <div class='power-content'>
      <div class="aside-left">
        <ul>
          <li :class="menuIndex==0?'active':''" @click="clickMenu(0,'')">全部</li>
          <li v-for="(item,index) in menuList" :class="index+1==menuIndex?'active':''" @click="clickMenu(index+1,item.Id)">{{item.Title}}</li>
        </ul>
         <relateRes :ObjectTypes="107"></relateRes>
      </div>
      <!-- 搜索条件 -->
      <div class="aside-right">
        <div id="divWrap" v-if="dataList.length>0">
          <div class="box" v-for="item in dataList">
            <div class="box-img" @click="goDetail(getDetailPath(item.ObjectType),item.Id)" :style="{backgroundImage:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
            <p class="title" @click="goDetail(getDetailPath(item.ObjectType),item.Id)">{{item.Title}}</p>
            <p class="price-line">
              <span class="price">&yen;{{handleCurrentPrice(item.ObjectType, item)}}</span>
            </p>
            <p :class="item.ExtendData&&item.ExtendData.IsFavorited?'collect1':'collect'" @click="collectFn(item,index,changeIsFavorited)" style="width:50px;float:right;margin-top: -30px;line-height: 30px;">收藏</p>
          </div>
        </div>
         <div v-if="dataList.length==0">
          <p style="line-height: 300px;font-size: 20px;text-align: center;">暂无数据</p>
        </div>
        <div class="page">
          <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import search from "../common/Search.vue"
import relateRes from "./relateRes.vue"
export default {
  data() {
    return {
      loading: true,
      sendObj: {
        word: '考试课程',
        index: 2,
        type: 107
      },
      keyWord: '',
      page: 1,
      pageSize: 21,
      totalCount: 0,
      dataList: [],

      menuList: [],
      menuIndex: 98,
      menuId:'',
    }
  },
  components: {
    search,
    relateRes
  },
  props: ['clientHeight'],
  mounted() {
    this.getMenulist('ExamCourse', this.getMenu)  //获取左边菜单栏
    this.getlist()
  },
  methods: {
    /**
     * [getMenulist 获取菜单]
     * @Author   赵雯欣
     * @DateTime 2017-12-19
     * @return   {[type]}   [description]
     */
    getMenu(menuList) {
      this.menuList = menuList;
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
     * [clickMenu 点击左边菜单栏]
     * @Author   赵雯欣
     * @DateTime 2017-12-19
     * @param    {[type]}   index [description]
     * @param    {[type]}   id    [description]
     * @return   {[type]}         [description]
     */
    clickMenu(index, id) {
      this.menuIndex = index;
      this.menuId = id;
      this.getlist()
    },
    getlist() { 
      this.loading = true
      this.$http.post("/Content/Search", {
          cp: this.page,
          ps: this.pageSize,
          query: JSON.stringify({
            objectTypes: [107], //课程
            CategoryIds:this.menuId==''?'':[this.menuId]
          })
        })
        .then((res) => {
          if (res.data.Success) {
            this.dataList = res.data.Data.ItemList;

            this.totalCount = res.data.Data.RecordCount;
            this.loading = false;
          }
        })
    },
    /**
     * [handleCurrentChange 切換分頁]
     * @Author   赵雯欣
     * @DateTime 2017-12-17
     * @return   {[type]}   [description]
     */
    handleCurrentChange(page) {
      this.page = page;
      this.getlist()
    },
  }
}

</script>
<style lang='less'>
@red-color: #e71515;
.course-page {
  width: 100%;

  .power-content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  #divWrap {
    overflow: hidden;
    margin-bottom: 30px;

    .box {
      margin-top: 18px;
      width: 254px;
      height: 246px;
      float: left;
      font-size: 16px;
      color: #333;
      overflow: hidden;

      .box-img {
        width: 252px;
        height: 184px;
        border: 1px solid #ddd;
        cursor: pointer;
      }
      .title {
        overflow: hidden;
        height: 30px;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 30px;
         cursor: pointer;
      }
      .title:hover{
        color:@red-color;
      }

      .price-line {
        line-height: 30px;
      }

      .collect {
        float: right;
      }
    }

    .box:nth-child(3n+2) {
      margin-left: 88px;
      margin-right: 88px;
    }
  }
}

</style>
