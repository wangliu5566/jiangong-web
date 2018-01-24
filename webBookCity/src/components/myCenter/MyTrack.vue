<template>
  <div class="center-track"> 
   <!-- logo搜索部分 -->
    <search :selectType='4'></search>
    <div class="track-center">
       <div class='track-notification'>
        <div class="content-title">
            <span class="red-border"></span>
            <span class="title">我的足迹</span>
        </div>
         <ul  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(256, 256, 256, 0.8)">
               
                <li v-for="item in datalist" class='track-book'>
                   <div @click="goDetail(getDetailPath(item.ObjectType),item.ObjectId)"  style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;" class="imgdiv hover">
                    <div  :style="{background:'url('+item.Content.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"  class="imgdiv1 hover"></div></div>
                    
                    <div class="track-book-center">
                       <span @click="goDetail(getDetailPath(item.ObjectType),item.ObjectId)" class="hover onespan">{{item.Content.Title}}</span>
                        <div>
                            <p class='onespan'>作者：{{item.Content.Author}}</p>
                            <span style="float: left">简介：</span><p style="float: left;margin-top: 0px; width: 500px">{{item.Content.Abstracts&&item.Content.Abstracts.length>105?item.Content.Abstracts.substring(0,100)+'...':item.Content.Abstracts}}</p>
                        </div>
                    </div>
                    <time>{{item.Content.CreateTime}}</time>
                </li>
<!--
                <li class='track-video'>
                     <img src="../../assets/tupian.png" alt="">
                    <div class="track-video-center">
                       <a href="#">《电子CAD技术（第4版）》</a>
                        <div>
                            <p>出版社：电子出版社</p>
                            <p>作者：李瑶</p>
                        </div>
                    </div>
                    <time>2017-08-29 13:22:00</time>
                </li>
                
-->
                
                
                
                
                <li>
                   <el-pagination
                      style='float: right;margin-top: 30px'
                       small
                        :current-page="cp"
                       @current-change="changecp"
                       layout="prev, pager, next"
                       :total="allcount" :page-size="20">
                    </el-pagination>
                </li>
         </ul>
        </div>
    </div>
  </div>
</template>

<script>
    import search from "./module/Search.vue"
    export default {
        data() {
            return {
                datalist:[],
                cp:1,
                allcount:0,
                loading:false,
            }
        },
        components: {
            search,
        },
         methods: {
             //分页
              changecp(val){
                this.cp=val;
                this.datalist=[]
                this.getlist()
            },
            getlist() {
                this.loading=true
                this.$http.get("/History/List", {params:{
                        cp: this.cp,
                        ps: 20,
                    }})
                    .then((res) => {
                    this.loading=false
                        if (res.data.Success) {
                            console.log(res.data.Data.ItemList)
                            this.datalist = res.data.Data.ItemList
                            this.allcount = res.data.Data.RecordCount
                        }
                    })
            }
        },
        mounted() {
            this.getlist()
        },
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .center-track {
        .track-center {
            width: 1200px;
            margin: auto;
            min-height: 600px;
            .track-notification {
                margin-left: 261px;
                font-size: 16px;
                color: #333;
                .content-title {
                    border-bottom: 0px
                }
            }
            .track-notification>ul {
                a{
                     color: #333;
                    display: block;
                    text-decoration: none
                }
                border: 1px solid #e6e6e6;
                border-radius: 5px;
                overflow: hidden;
                margin-bottom: 39px;
                padding: 0px 30px 36px;
                time {
                   float: right;
                    color: #999;
                    font-size: 14px;
                    line-height: 25px
                }
                .track-book {
                    .onespan{
                        overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;width: 500px
                    }
                    overflow: hidden;
                    border-bottom: 1px solid #e6e6e6;
                    margin-top: 32px;
                    padding-bottom: 20px;
                    .imgdiv {
                        width: 97px;
                        height: 110px;
                        float: left;
                         border: 1px solid #e6e6e6;
                    }
                    .imgdiv1 {
                        width: 97px;
                        height: 110px;
                        float: left;
/*                         border: 1px solid #e6e6e6;*/
                    }
                    .track-book-center {
                        float: left;
                        margin-left: 20px;
                        width: 620px;
                        div {
                            margin-top: 10px;
                            font-size: 14px;
                            color: #666;
                            float: left;
                            margin-right: 55px;
                            p{
                                margin-top: 7px;
                            }
                        }
                    }
                }
                .track-video {
                    overflow: hidden;
                    border-bottom: 1px solid #e6e6e6;
                    margin-top: 32px;
                    padding-bottom: 20px;
                    img {
                        width: 106px;
                        height: 76px;
                        float: left;
                    }
                    .track-video-center {
                        float: left;
                        margin-left: 20px;
                        width: 620px;
                        div {
                            margin-top: 10px;
                            font-size: 14px;
                            color: #666;
                            float: left;
                            margin-right: 55px;
                            p{
                                margin-top: 4px;
                            }
                        }
                    }
                }
            }

            .el-pager li.active {
                color: #fff;
                cursor: default;
                background-color: #e81615;
                border-radius: 50%;

            }
        }
    }

</style>
