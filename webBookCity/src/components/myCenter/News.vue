<template>
  <div class="center-news"> 
   <!-- logo搜索部分 -->
    <search></search>
    <div class="news-center">
       <div class='news-notification'>
        <div class="content-title">
            <span class="red-border"></span>
            <span class="title">消息通知</span>
        </div>
         <ul>
                <li>
                    <span class='dot'></span>
                    <p >
                       <a href="#">京东发布时间对方根本就是的规范是的覅USDhi复合丝U盾和覅USD和覅胡思ufusdufgi 数的法国个USD个覅US会丢粉红色丢分还是丢分hiUSD和覅USD好大夫is电话费</a>
                        <time style="">2017-08-29 13:22:00</time>
                    </p>
                </li>
                <li>
                    <span class='white-dot'></span>
                    <p >
                        <a href="#">京东发布时间对方根本就是的规范是的覅USDhi复合丝U盾和覅USD和覅胡思ufusdufgi 数的法国个USD个覅US会丢粉红色丢分还是丢分hiUSD和覅USD好大夫is电话费</a>
                        <time style="">2017-08-29 13:22:00</time>
                    </p>
                </li>
                <li>
                    <span class='dot'></span>
                    <p >
                       <a href="#">京东发布时间对方根本就是的规范是的覅USDhi复合丝U盾和覅USD和覅胡思ufusdufgi 数的法国个USD个覅US会丢粉红色丢分还是丢分hiUSD和覅USD好大夫is电话费</a>
                        <time style="">2017-08-29 13:22:00</time>
                    </p>
                </li>
                <li>
                    <span class='dot'></span>
                    <p >
                         <a href="#">京东发布时间对方根本就是的规范是的覅USDhi复合丝U盾和覅USD和覅胡思ufusdufgi 数的法国个USD个覅US会丢粉红色丢分还是丢分hiUSD和覅USD好大夫is电话费</a>
                        <time style="">2017-08-29 13:22:00</time>
                    </p>
                </li>
                <li>
                    <el-pagination
                     style='float: right'
                      small
                      layout="prev, pager, next"
                      :total="1000">
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
            return {}
        },
        components: {
            search,
            otherBook,
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
    .center-news {
        .news-center {
            width: 1200px;
            margin: auto;
            min-height: 600px;
            .news-notification {
                margin-left: 261px;
                font-size: 16px;
                .content-title {
                    border-bottom: 0px
                }
            }
            .dot {
                width: 7px;
                height: 7px;
                background-color: #e71617;
                display: inline-block;
                border-radius: 50%;
                margin: 0 14px 0 26px;
            }
            .white-dot {
                width: 7px;
                height: 7px;
                display: inline-block;
                border-radius: 50%;
                margin: 0 14px 0 26px;
            }
            .news-notification>ul {
                border: 1px solid #e6e6e6;
                border-radius: 5px;
                overflow: hidden;
                margin-bottom: 39px;
                padding-bottom: 46px;
            }
            .news-notification>ul>li {
                overflow: hidden;
                margin-top: 30px
            }
            .news-notification>ul>li>p {
                padding-bottom: 17px;
                float: right;
                border-bottom: 1px solid #e6e6e6;
                margin-right: 30px;
                a {
                    color: #333;
                    width: 663px;
                    display: inline-block;
                    text-decoration: none
                }
                time {
                    float: right;
                    color: #999;
                    font-size: 14px;
                    margin-left:60px;
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
