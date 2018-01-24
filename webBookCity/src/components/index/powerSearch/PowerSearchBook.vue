<template>
  <div class="power-search">
    <searchNoMenu></searchNoMenu>
    <div class='power-content'>
      <div class="path" style="cursor: pointer;"><span @click="goPath('index')">首页</span> &gt; <span>高级搜索</span></div>
      <div class="menus">
        <span class="click-this" @click="$router.push('/wrap/searchBook')">图书</span>
        <span @click="$router.push('/wrap/searchKnowledgeTag')">知识标签</span>
        <!-- <span @click="$router.push('/wrap/searchCourse')">课程</span> -->
        <span @click="$router.push('/wrap/searchVideo')">视频</span>
        <span @click="$router.push('/wrap/searchImg')">图片</span>
        <!-- <span @click="$router.push('/wrap/searchChapter')">章节</span> -->
      </div>
      <div class="index-wrap">
        <el-form ref="form" :model="sizeForm" label-width="100px">
          <el-form-item label="图书名称：" @keyup.enter.native="searchBook()">
            <el-input v-model="sizeForm.Title" style="width: 322px"></el-input>
          </el-form-item>
          <el-form-item label="作者/译者：" @keyup.enter.native="searchBook()">
            <el-input v-model="sizeForm.Author" style="width: 322px"></el-input>
          </el-form-item>
          <el-form-item label="关 键 词：" @keyup.enter.native="searchBook()">
            <el-input v-model="sizeForm.Keywords" style="width: 322px"></el-input>
          </el-form-item>
          <el-form-item label="出 版 社：" @keyup.enter.native="searchBook()">
            <el-input v-model="sizeForm.Publisher" style="width: 322px"></el-input>
          </el-form-item>
          <el-form-item label="I S B N：" @keyup.enter.native="searchBook()">
            <el-input v-model="sizeForm.isbn" style="width: 322px"></el-input>
          </el-form-item>
          <el-form-item label="征 订 号：" @keyup.enter.native="searchBook()">
            <el-input v-model="sizeForm.zhengdinghao" style="width: 322px"></el-input>
          </el-form-item>
          <el-form-item label="价格区间：">
            <el-col :span="9">
              <el-input v-model="sizeForm.lowerPrice" placeholder="请输入内容" style="width:148px"></el-input>
            </el-col>
            <el-col class="line" :span="1">&nbsp;-</el-col>
            <el-col :span="10">
              <el-input v-model="sizeForm.heighterPrice" placeholder="请输入内容" style="width:156px"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="出版时间：">
            <el-col :span="9">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="sizeForm.StartTime" style="width:148px"></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">&nbsp;-</el-col>
            <el-col :span="9">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="sizeForm.EndTime" style="width:156px"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-button type="primary" @click="searchBook" style="width: 164px;margin-left: 150px">搜索</el-button>
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
      type: 1,

      sizeForm: {
        ObjectTypes: 104,
        Title: '',
        Author: '',
        Keywords: '',
        Publisher: '',
        isbn: '',
        zhengdinghao: '',
        lowerPrice: '',
        heighterPrice: '',
        StartTime: '',
        EndTime: '',
      },
    }
  },
  components: {
    searchNoMenu,
  },
  methods: {
    searchBook() {
      var len = 0;
      for (var i in this.sizeForm) {
        if (this.sizeForm[i] != '') {
         len++;
        }
      }
      if (len > 1) {
        this.resuResSearch(this.sizeForm)
        return false;
      } else {
        this.$message.warning('请填写搜索条件')
      }
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
