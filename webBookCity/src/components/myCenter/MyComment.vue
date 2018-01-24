<template>
  <div class="center-comment"> 
   <!-- logo搜索部分 -->
    <search :selectType='5'></search>
    <div class="comment-center">
       <div class='comment-notification'>
        <div class="content-title">
            <span class="red-border"></span>
            <span class="title">我的评论</span>
        </div>
         <ul  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(256, 256, 256, 0.8)">
                <li v-for='item in dataList'>
                    <p class=''>
                       <span>{{item.ContentTitle}}</span>
                        <time style="">{{item.CreateTime}}</time>
                    </p>
                    <p class="concreteness">{{item.Contents}}</p>
                </li>
                <li v-if='dataList.length<1'>
                    <img src="../../assets/wuziyuan.png" class='not-data' alt="">
                </li>
                <li>
                     <el-pagination style='float: right' small :current-page="cp" @current-change="changecp" layout="prev, pager, next" :total="allcount" :page-size="20">
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
                dataList:[],
                cp:1,
                allcount:0,
                loading:false
            }
        },
        components: {
            search,
            otherBook,
        },
        methods: {
            //切换分页
            changecp(val) {
                this.cp = val;
                this.dataList = []
                this.getlist()
            },
            //获取列表
            getlist() {
            this.loading=true
                this.$http.get("/Comment/UserList", {params:{
                        cp:this.cp,
                        ps: 20,
                    }})
                    .then((res) => {
                        if (res.data.Success) {
//                            console.log(res.data.Data.ItemList)
                            this.dataList = res.data.Data.ItemList
                            this.allcount = res.data.Data.RecordCount
                            this.loading=false
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
    .center-comment {
        .not-data{
            margin-top: 20px;
            margin-left: 270px;
        }
        .comment-center {
            width: 1200px;
            margin: auto;
            min-height: 600px;
            .comment-notification {
                margin-left: 261px;
                font-size: 16px;
                .content-title {
                    border-bottom: 0px
                }
            }
            .comment-notification>ul {
                border: 1px solid #e6e6e6;
                border-radius: 5px;
                overflow: hidden;
                margin-bottom: 39px;
                padding: 0px 30px 36px;
            }
            .comment-notification>ul>li {
                overflow: hidden;
                margin-top: 30px;
                .concreteness {
                    word-wrap: break-word;
                    word-break: break-all;
                    overflow: hidden;
                    clear: both;
                    border-bottom: 1px solid #e6e6e6;
                    padding-bottom: 16px;
                    font-size: 14px;
                    color: #666;
                }
            }
            .comment-notification>ul>li>p:first-child {
                padding-bottom: 18px;
                float: left;
                span {
                    color: #333;
                    width: 735px;
                    display: inline-block;
                    text-decoration: none
                }
                time {
                    float: right;
                    color: #999;
                    font-size: 14px;
                    line-height: 25px
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
