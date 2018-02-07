<template>
  <div class="alreadyShop">
    <div id='first-title' class="content-title">
      <span class="red-border"></span>
      <span class="title">已购资源</span>
      <span @click="$router.push('Myshop')" class="content-more hover">更多 ></span>
    </div>
    <div class="alreadyShop-top">
      <div v-for="item in shopdata" class="book-chunk">
        <div  style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;" class="book-photo hover">
                  <router-link :to="{path:'/accredit',query:{baseURL:item.AuthorizeUrl,Id:item.Id 

,authorizeToken:item.ExtendData.AuthorizeToken,appId:7,DefaultFileExtension:item.DefaultFileExtension,ObjectType:item.ObjectType,}}" target="_blank">
          <div :style="{background:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" class="book-photo1 hover">
          </div>
          </router-link>
        </div>
        <p class="hover">{{item.Title}}</p>
      </div>
      <img class="not-data" v-if='shopdata.length<1' src="../../assets/wuziyuan.png" alt="">
    </div>
    <div style="clear: both" class="content-title">
      <span class="red-border"></span>
      <span class="title">我的足迹</span>
      <span @click="$router.push('track')" class="content-more hover">更多 ></span>
    </div>
    <div>
     
      <div class="alreadyShop-down">
        <div v-for="item in trackdata"  class="book-chunk">
          <div @click="goDetail(getDetailPath(item.ObjectType),item.ObjectId)" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;" class="book-photo hover">
            <div :style="{background:'url('+item.Content.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" class="book-photo1 hover">
            </div>
          </div>
            <p @click="goDetail(getDetailPath(item.ObjectType),item.ObjectId)" class="hover">{{item.Content.Title}}</p>
<!--
          <div class="book-chunk-right">
            <span>{{item.Content.Abstracts&&item.Content.Abstracts.length>55?item.Content.Abstracts.substring(0,53)+'...':item.Content.Abstracts}}</span>
          </div>
-->
        </div>
      </div>
         
          <img class="not-data" v-if='trackdata.length<1' src="../../assets/wuziyuan.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

      trackdata: [],
      shopdata: [],
    }
  },
  mounted() {
    this.getTrack()
    this.getshop()
  },
  props: ['title', 'oldmoney', 'money'],
  methods: {
    readMydata(data) {
      //                console.log(data)
      if (data.AuthorizeUrl) {
        this.$http({
          url: '',
          baseURL: data.AuthorizeUrl,
          method: 'post',
          data: {
           id:data.Id,
            authorizeToken: data.ExtendData.AuthorizeToken,
            appId: 7
          }
        }).then((res) => {
          if (res.data.Success) {
            this.readMyResource(data.DefaultFileExtension, data.Id, data.ObjectType,{
                                authorizeToken: data.ExtendData.AuthorizeToken,authorizeUrl: data.AuthorizeUrl,
                            })
          } else {
            this.$message({
              message: res.data.Description,
              type: 'warning'
            })
          }
        })
      } else {
        this.$message({
          message: '资源错误',
          type: 'warning'
        })
      }

    },
    //我的足迹
    getTrack() {
      this.$http.get("/History/List", {
          params: {
            cp: 1,
            ps: 10,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.trackdata = res.data.Data.ItemList
          }
        })
    },
    //已购买
    getshop() {
      this.$http.get("/OrderDetail/UserBuyContenList", {
          params: {
            cp: 1,
            ps: 10,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.shopdata = res.data.Data.ItemList
          }
        })
    },
  }
}

</script>
<style lang='less'>
.alreadyShop {
    .not-data{
        margin-left: 295px;
        padding: 100px 0;
    }
  #first-title {
    margin-top: -34px;
  }


  .alreadyShop-top {
    font-size: 16px;
    .book-chunk:not(:nth-child(5n)) {
      float: left;
      margin-right: 46px;
    }
    .book-chunk:nth-child(5n) {
      float: left;
    }
    .book-photo {
      width: 140px;
      height: 184px;
      margin-top: 20px;
      border: 1px solid #eee
    }
    .book-photo1 {
      width: 140px;
      height: 184px;
      /*                margin-top: 20px;*/
      /*                border: 1px solid #eee*/
    }
    p {
      width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 5px 0;
    }
    .schedule {
      img {
        vertical-align: -3px;
        margin-right: 10px;
      }
      color: #999
    }
  }
  .alreadyShop-down {
    font-size: 16px;
    .book-chunk:not(:nth-child(5n)) {
      float: left;
      margin-right: 46px;
    }
    .book-chunk:nth-child(5n) {
      float: left;
    }
    .book-photo {
      width: 140px;
      height: 184px;
      margin-top: 20px;
      border: 1px solid #eee
    }
    .book-photo1 {
      width: 140px;
      height: 184px;
      /*                margin-top: 20px;*/
      /*                border: 1px solid #eee*/
    }
    p {
      width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 5px 0;
    }
    .schedule {
      img {
        vertical-align: -3px;
        margin-right: 10px;
      }
      color: #999
    }
  }
}

</style>
