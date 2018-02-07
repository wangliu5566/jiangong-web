<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/wrap/resCategoryList' }">全部分类</el-breadcrumb-item>
      <el-breadcrumb-item @click.native="pushCategory(item,index)" v-for="(item,index) in breadCrumbList" :key="index">{{item.Title}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="detailsData.Title">{{detailsData.Title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      breadCrumbList: []
    }
  },
  props:{
    detailsData:{
      default:{
        Title:''
      }
    }
  },
  methods: {
    getBreadCrumbList() {
      this.$http.get('/Category/GetObjectCategoryList', {
          params: {
            objectId: this.$route.query.id
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.breadCrumbList = res.data.Data;
          }
        })
    },
    pushCategory(item, index) {
      if (item.ParentId && item.ParentId != 0) {
        this.goSearchList(item.ParentId, item.Id, this.breadCrumbList[index - 1].Title, item.Title)
        
      } else{
        this.goSearchList('', item.Id, '', item.Title)
      }

    }
  },
  created() {
    this.getBreadCrumbList();
  }
}

</script>
