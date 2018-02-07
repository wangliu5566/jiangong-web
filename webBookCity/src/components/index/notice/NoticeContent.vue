<template>
  <div class="notice-con">
    <div class='global-box'>
      <searchNoMenu></searchNoMenu>
    </div>
    <div class='power-content global-box'>
      <div class="path" style="cursor: pointer;">
        <span @click="goPath('index')">首页</span> &gt; 
        <span  @click="goPath('noticeList')" class="hover">公告</span>&gt; 
        <span>公告内容</span>
      </div>
      <div class="notice-con-detail">
      	<h3>{{NoticeObj.Title?NoticeObj.Title:'暂无'}}</h3>
      	<p>{{NoticeObj.CreateTime?NoticeObj.CreateTime:'暂无'}}</p>
      	<div class="line"></div>
      	<div class="detail">{{NoticeObj.Contents?NoticeObj.Contents:'暂无'}}</div>
      </div>
      <div class="mt20 mb20">
        <img src="../../../../static/images/downbanner.jpg">
      </div>
    </div>
  </div>
</template>
<script>
import searchNoMenu from "../../common/SearchNoMenu.vue"

export default {
  data() {
    return {
      NoticeObj:{}
    }
  },
  components: {
    searchNoMenu,
  },
  mounted() {
   this.getDetail()
  },
  methods: {
     getDetail() {
      this.$http.get("/Message/Detail", {
        params:{
          id:this.$route.query.id
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.NoticeObj = res.data.Data
          }
        })
    },
    
  },
}

</script>
<style lang='less'>
.notice-con {
  width: 100%;
  overflow:hidden;

  .power-content{
    font-size: 14px;
    color: #333;
    overflow: hidden;
    position: relative;

    & > .notice-con-detail {

      	h3 {
      		text-align: center;
	      	font-size: 20px;
	      	color: #333;
	      	line-height: 40px;
	      	font-weight: 500;
      	}
		& > p {
			text-align: center;
			font-size: 12px;
			line-height: 24px;
			color: #989898;
			font-weight: normal;
		}
      .line {
      	height: 1px;
      	background: #999;
      }
      .detail {
      	margin-top: 10px;
      	padding: 0 20px;
      	line-height: 30px;
        /*height:300px;*/
      }
    }
  }
}

</style>
