<template>
  <div class="center-shop"> 
   <!-- logo搜索部分 -->
    <search :selectType='2'></search>
    <div class="shop-center">
       <div class='shop-notification'>
        <div class="content-title">
            <span class="red-border"></span>
            <span class="title">已购资源</span>
        </div>
         <ul  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(256, 256, 256, 0.8)">
               <li class='classify'>
                   <span @click="type=false;cp=1;classtype=0;alldata=[];getlist()" :class="!type?'classify-select':''">个人资源</span>
                   <span  @click="type=true;cp=1;classtype=0;alldata=[];getlist()" :class="type?'classify-select':''">机构资源</span>
                </li>
                <li class='classify-list'>
                    <span @click="classtype='0';alldata=[];cp=1;getlist();" :class="classtype==0?'select':''">全部</span>
                    <span @click="classtype='104';bookdata=[];cp=1;getlist();" :class="classtype==104?'select':''">图书</span>
                    <span @click="classtype='109';videodata=[];cp=1;getlist()" :class="classtype==109?'select':''">视频</span>
                    <span @click="classtype='108';photodata=[];cp=1;getlist()" :class="classtype==108?'select':''">图片</span>
<!--
                    <span @click="classtype='102';sectiondata=[];cp=1;getlist();" :class="classtype==102?'select':''">章节</span>
                    <span @click="classtype='107';coursedata=[];cp=1;getlist()" :class="classtype==107?'select':''">课程</span>
-->
                </li> 
<!--                全部-->
                <li v-if="classtype=='0'" class="classify-list-book">
                   <div @click="readMydata(item)" v-for="item in alldata">
                       <div class="book-list hover" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                                              <div class="book-list hover" :style="{background:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
                            </div>
                         

                       <p class="hover">{{item.Title}}</p>
<!--                       <span class="schedule"><img src="../../assets/yanjin1.png" alt="">已阅读：{{item.ExtendData.Percentage}}%</span>-->
                   </div> 
                    <span v-if='alldata.length==0&&!loading' class='notdata'>
                       <img src="../../assets/wuziyuan.png" alt="">
                   </span> 
                </li>
<!--                图书-->
                <li v-if="classtype=='104'" class="classify-list-book">
                   <div @click="readMydata(item)" v-for="item in bookdata">
                       <div class="book-list hover" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                                              <div class="book-list hover" :style="{background:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
                            </div>
                         

                       <p class="hover">{{item.Title}}</p>
                   </div> 
                    <span v-if='bookdata.length==0&&!loading' class='notdata'>
                      <img src="../../assets/wuziyuan.png" alt="">
                   </span> 
                </li>
<!--                视频窄版-->                
                <li v-if="classtype=='109'" class="classify-list-book">
                   <div @click="readMydata(item)"  v-for="item in videodata" >
                       <div class="book-list hover" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                                              <div class="book-list hover" :style="{background:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
                            </div>
                         

                       <p class="hover">{{item.Title}}</p>
                   </div> 
                    <span v-if='videodata.length==0&&!loading' class='notdata'>
                      <img src="../../assets/wuziyuan.png" alt="">
                   </span> 
                </li>
                
<!--                视频-->
<!--
                <li v-if="classtype=='109'"  class="classify-list-video">
                   <div  @click="readMydata(item)"  v-if='videodata.length>0'   v-for="item in videodata" style="position: relative">
                         <div class="book-list hover" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                        
                        <div :style="{background:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center',width: '200px',height: '146px'}"><img src="../../assets/mengban.png"  alt=""></div>
                        
                        </div>
                       <p>{{item.Title}}</p>
                   </div> 
                   <span v-if='videodata.length==0&&!loading' class='notdata'>
                      <img src="../../assets/wuziyuan.png" alt="">
                   </span> 
                </li>
-->
                
<!--                图片-->
                <li v-if="classtype=='108'" class="classify-list-book">
                   <div @click="readMydata(item)" v-for="item in photodata">
                      
                        <div class="book-list hover" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                                              <div class="book-list hover" :style="{background:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
                            </div>
                       
                       <p class="hover">{{item.Title}}</p>
<!--                       <span class="schedule"><img src="../../assets/yanjin1.png" alt="">已阅读：{{item.ExtendData.Percentage}}%</span>-->
                   </div> 
                    <span v-if='photodata.length==0&&!loading' class='notdata'>
                       <img src="../../assets/wuziyuan.png" alt="">
                   </span>  
                </li>
                
<!--                章节-->
                <li v-if="classtype=='102'" class="classify-list-book">
                   <div @click="readMydata(item)"  v-for="item in sectiondata">
                        <div class="book-list hover" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                                              <div class="book-list hover" :style="{background:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
                            </div>
                       <p>{{item.Title}}</p>
<!--                       <span class="schedule"><img src="../../assets/yanjin1.png" alt="">已阅读：{{item.ExtendData.Percentage}}%</span>-->
                   </div> 
                    <span  v-if='sectiondata.length==0&&!loading' class='notdata'>
                       <img src="../../assets/wuziyuan.png" alt="">
                   </span>
                </li>
                
<!--                课程-->
               <li v-if="classtype=='107'"  class="classify-list-video">
                   <div  @click="readMydata(item)"  v-if='coursedata.length>0'   v-for="item in coursedata" style="position: relative">
                        <div class="book-list hover" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                        
                        <div :style="{background:'url('+item.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center',width: '200px',height: '146px'}"><img src="../../assets/mengban.png"  alt=""></div>
                        
                        </div>
                       <p class="hover">{{item.Title}}</p>
<!--                       <span class="schedule"><img src="../../assets/yanjin1.png" alt="">已阅读：{{item.ExtendData.Percentage}}%</span>-->
                   </div> 
                   <span v-if='coursedata.length==0&&!loading' class='notdata'>
                       <img src="../../assets/wuziyuan.png" alt="">
                   </span> 
                </li>
                
                
                
                <li>
                    <el-pagination
                     style='float: right'
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
    import otherBook from "./module/OtherBook.vue"
    export default {
        data() {
            return {
                type: false,
                loading: false,
                classtype: 0,
                allcount: '',
                userid: '',
                cp: 1,
                bookdata: [],
                videodata: [],
                sectiondata: [],
                photodata: [],
                coursedata: [],
                alldata: [],
                allcount: 0
            }
        },
        components: {
            search,
            otherBook,
        },
        methods: {
            //跳转悦读
            readMydata(data) {
                //                console.log(data.AuthorizeUrl.split('/')[data.AuthorizeUrl.split('/').length - 2], data.AuthorizeUrl.split('/')[data.AuthorizeUrl.split('/').length - 1])
                if(data.AuthorizeUrl){
                this.$http({
                    url: '',
                    baseURL: data.AuthorizeUrl,
                    method: 'post',
                    data: {
                        extId: data.ExternalId,
                        authorizeToken: data.ExtendData.AuthorizeToken,
                        appId: 7
                    }
                }).then((res) => {
                    if (res.data.Success) {
                        this.readMyResource(data.DefaultFileExtension, data.Id, data.ObjectType, res.data.Data)
                    } else {
                        this.$message({
                            message: res.data.Description,
                            type: 'warning'
                        })
                    }
                })}else{
                     this.$message({
                            message: '资源错误',
                            type: 'warning'
                        })
                }

            },
            //分页
            changecp(val) {
                this.cp = val;
                this.getlist()
            },
            getDetail() {
                this.$http.get("/User/Detail", {
                        params: {
                            id: JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id
                        }
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            console.log(res.data.Data.ExtendData)
                            this.userid = res.data.Data.ExtendData.OrganizationId
                        }
                    })
            },
            //获取
            getlist() {
                if (!this.type) {
                    this.loading = true
                    this.$http.get("/OrderDetail/UserBuyContenList", {
                            params: {
                                cp: this.cp,
                                ps: 20,
                                objectTypeId: this.classtype!=0?this.classtype:'',
                                IsOrganization: this.type
                            }
                        })
                        .then((res) => {
                            if (res.data.Success) {
                                window.scrollTo(0, 0);
                                if (this.classtype == 104) {
                                    this.bookdata = res.data.Data.ItemList
                                } else if (this.classtype == 109) {
                                    this.videodata = res.data.Data.ItemList
                                } else if (this.classtype == 102) {
                                    this.sectiondata = res.data.Data.ItemList
                                } else if (this.classtype == 108) {
                                    this.photodata = res.data.Data.ItemList
                                } else if (this.classtype == 107) {
                                    this.coursedata = res.data.Data.ItemList
                                }else if (this.classtype == 0) {
                                    this.alldata = res.data.Data.ItemList
                                }
                                this.allcount = res.data.Data.RecordCount
                                this.loading = false

                            }
                        })
                } else if (this.type) {
                    this.loading = true
                    this.$http.get("/Organization/ContentList", {
                            params: {
                                cp: this.cp,
                                ps: 20,
                                objectType: this.classtype,
                                organizationIds: this.userid
                            }
                        })
                        .then((res) => {
                            if (res.data.Success) {
                                //                                console.log(res.data.Data.ItemList)
                                window.scrollTo(0, 0);
                                   if (this.classtype == 104) {
                                    this.bookdata = res.data.Data.ItemList
                                } else if (this.classtype == 109) {
                                    this.videodata = res.data.Data.ItemList
                                } else if (this.classtype == 102) {
                                    this.sectiondata = res.data.Data.ItemList
                                } else if (this.classtype == 108) {
                                    this.photodata = res.data.Data.ItemList
                                } else if (this.classtype == 107) {
                                    this.coursedata = res.data.Data.ItemList
                                }else if (this.classtype == 0) {
                                    this.alldata = res.data.Data.ItemList
                                }
                                this.allcount = res.data.Data.RecordCount
                                this.loading = false
                            }
                        })
                }
            }
        },
        mounted() {
            this.getDetail()
            this.getlist()
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .center-shop {
        .notdata {
            text-align: center;
            font-size: 30px;
            display: block;
            height: 60px;
            margin: 30px 0;
        }
        .shop-center {
            width: 1200px;
            margin: auto;
            min-height: 600px;
            .shop-notification {
                margin-left: 261px;
                font-size: 16px;
                .content-title {
                    border-bottom: 0px
                }
            }
            .shop-notification>ul {
                border: 1px solid #e6e6e6;
                border-radius: 5px;
                overflow: hidden;
                margin-bottom: 39px;
                padding: 0px 30px 36px;
                color: #666;
                .classify-select {
                    border-color: 2px solid #e71515;
                    background-color: #e71515;
                    color: #fff;
                }
                .classify>span {
                    width: 430px;
                    display: inline-block;
                    text-align: center;
                    border: 1px solid #e6e6e6;
                    float: left;
                    margin-top: 23px;
                    padding: 7px 0;
                }
                .classify-list {
                    text-align: center;
                    span {
                        padding: 0 0 4px;
                        font-size: 16px;
                        margin: 30px 25px 42px;
                        display: inline-block;
                        cursor: pointer;
                    }
                    .select {
                        color: #e71515;
                        border-bottom: 1px solid #e71515;
                    }
                }
                .classify-list-book {
                    padding: 0 16px;
                    p {
                        color: #464646;
                    }
                    .schedule {
                        font-size: 14px;
                        img {
                            vertical-align: -1px;
                            margin-right: 7px;
                        }

                    }
                }
                .classify-list-book {
                    overflow: hidden;
                    .book-list {
                        width: 140px;
                        height: 180px;
                        border: 1px solid #eee
                    }
                }
                .classify-list-book>div>div>img:first-child {
                    width: 140px;
                    height: 180px;
                }
                .classify-list-book>div {
                    float: left;
                    margin-right: 90px;
                    margin-bottom: 36px;
                    width: 140px;
                }
                .classify-list-book>div p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-top: 11px;
                }
                .classify-list-book>div:nth-child(4n) {
                    float: left;
                    margin-right: 0;
                }


                /*                视屏*/
                .classify-list-video {
                    padding: 0 16px;
                    p {
                        color: #464646;
                    }
                    .schedule {
                        font-size: 14px;
                        img {
                            vertical-align: -1px;
                            margin-right: 7px;
                        }

                    }
                }
                .classify-list-video {
                    overflow: hidden;
                }
                .classify-list-video>div>img:first-child {
                    width: 200px;
                    height: 146px;
                }
                .classify-list-video>div>div:first-child {
                    width: 200px;
                    height: 146px;
                }
                .classify-list-video>div {
                    float: left;
                    margin-right: 15px;
                    margin-bottom: 36px;
                    width: 200px;
                }
                .classify-list-video>div p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                     margin-top: 11px;
                }
                .classify-list-video>div:nth-child(4n) {
                    float: left;
                    margin-right: 0;
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
