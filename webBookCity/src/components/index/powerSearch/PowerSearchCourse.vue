<template>
  <div class="power-search">
    <searchNoMenu></searchNoMenu>
    <div class='power-content'>
      <div class="path" style="cursor: pointer;"><span @click="goPath('index')">首页</span> &gt; <span>高级搜索</span></div>
      <div class="menus">
        <span @click="$router.push('/wrap/searchBook')">图书</span>
        <span @click="$router.push('/wrap/searchKnowledgeTag')">知识标签</span>
        <span class="click-this" @click="$router.push('/wrap/searchCourse')">课程</span>
        <span @click="$router.push('/wrap/searchVideo')">视频</span>
        <span @click="$router.push('/wrap/searchImg')">图片</span>
        <span @click="$router.push('/wrap/searchChapter')">章节</span>
      </div>
      <div class="index-wrap">
        <el-form ref="form" :model="sizeForm" label-width="110px">
          <el-form-item label="课程名称：" @keyup.enter.native="searchCourse()">
            <el-input v-model="sizeForm.Title" style="width: 322px"></el-input>
          </el-form-item>
          <el-form-item label="讲师/教师：" @keyup.enter.native="searchCourse()">
            <el-input v-model="sizeForm.Author" style="width: 322px"></el-input>
          </el-form-item>
          <el-form-item label="分　　类：">
            <el-select v-model="sizeForm.CategoryIds" placeholder="请选择分类" style="width: 322px">
              <el-option v-for="item in menuList" :key="item.Id" :label="item.Title" :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="searchCourse" style="width: 164px;margin-left: 150px">搜索</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../../common/SearchNoMenu.vue"

export default {
  data() {
    return {
      menuList: [],
      sizeForm: {
        ObjectTypes: 107,
        Title: '',
        Author: '',
        CategoryIds: '',
      },
    }
  },
  components: {
    searchNoMenu,
  },
  mounted() {
    this.getlist()
    this.getMenulist('ExamCourse',this.getType)
  },
  methods: {
    searchCourse() {
      if (this.sizeForm.Title.trim() == "" && this.sizeForm.CategoryIds == "" && this.sizeForm.Author.trim() == "") {
        this.$message.warning('请填写搜索条件')
      } else {
        this.resuResSearch(this.sizeForm)
      }
    },
    getType(menuList){
      this.menuList = menuList;
    },
    getlist() {
      this.$http.get("/Category/ListByGroupName", {
          params: {
            groupName: 'standard'
          }
        })
        .then((res) => {
          if (res.data.Success) {
            res.data.Data.map((item) => {
              this.menuList.push({
                value: item.Id,
                label: item.Title,
              })
            })
          }
        })
    },
  }
}

</script>
<style lang='less'>
.power-search {
  width: 100%;
  overflow: hidden;

  .power-content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .menus {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #dedede;

    span {
      display:block;
      width: 112px;
      text-align: center;
      float: left;
      border: 1px solid #dedede;
      border-left: none;
      background-color: #ebebeb;
      cursor: pointer;
      overflow: hidden;
    }
    span:nth-child(1) {
      border-left: 1px solid #dedede;
      border-right: 1px solid #ddd;
    }
     
    .click-this {
      background-color: #fff;
      border-bottom: none;
    }
  }

  .index-wrap {
    width: 1148px;
    border: 1px solid #dedede;
    border-top: none;
    height: 667px;
    padding: 20px 25px;
    margin-bottom: 20px;
    overflow: hidden;
    margin-top: -1px;
  }
   .el-form{
    width:500px;
    overflow: hidden;
    margin:0 auto;
  }
   .el-form-item__label{
    font-weight: 700!important;
  }
  .el-input__inner{
    border-radius: 0;
  }
}

</style>
