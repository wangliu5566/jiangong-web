<template>
  <div class="center"> 
   <!-- logo搜索部分 -->
    <search :selectType='0'></search>
    <div class="mycenter">
        <div class="message">
           <span class="username">{{user.NickName}}</span>
            <div class='message-select'>
                <div class="portrait " @click='goPath("EditPersonaInfo")'>
                    <img :src="user.UserFace" alt="">
                </div>
                <img src="../../assets/biaoqian.png" class='lable' alt="">
                <span class='tag'>{{user.ExtendData.OrganizationTitle?"机构用户":"个人用户"}}</span>
                <ul class='message-list'>
                    <li class="hover" @click='goPath("listOfAddress")'><img src="../../assets/icon2.png" alt="">收货地址</li>
                    <li class="hover"  @click='goPath("accountSetting")'><img src="../../assets/icon3.png" alt="">修改密码</li>
                    <li class="hover"  @click='goPath("accountSetting")'><img src="../../assets/icon4.png" alt="">{{user.MobileNumber?"手机已绑定":"手机未绑定"}}</li>
                    <li class="hover"  @click='goPath("accountSetting")'><img src="../../assets/icon5.png" alt="">{{user.Email?"邮箱已绑定":"邮箱未绑定"}}</li>
                    <li  class="hover" @click='goPath("accountSetting")'><img src="../../assets/icon6.png" alt="">{{user.ExtendData.OrganizationTitle?user.ExtendData.OrganizationTitle:"机构码未绑定"}}</li>
<!--                    <li @click='goPath("news")'><img src="../../assets/icon1.png" alt="">消息通知</li>-->
                </ul>
                
            <ul class="state">
                <li class="hover" @click='goPath({path:"myOrder",query:{"name":"5"}})'>
                    <img src="../../assets/icon7.png" alt="">
                    <p>待付款：<span>{{ordernum}}</span></p>
                </li>
                <li class="hover" @click='goPath({path:"myOrder",query:{"name":"3"}})'>
                    <img src="../../assets/icon8.png" alt="">
                  <p>待发货：<span>{{shipmentsnum}}</span></p>
                </li>
                <li class="hover" @click='goPath({path:"myOrder",query:{"name":"4"}})'>
                    <img src="../../assets/icon9.png" alt="">
                <p>待收货：<span>{{deliverynum}}</span></p>
                </li>
                <li>
<!--
                    <img src="../../assets/icon10.png" alt="">
                    <p>退款：<span>0</span></p>
-->
                </li>
            </ul>
            </div>
        </div>
    </div>
    <div class="center-down">
       <div class="down-center">
            <div class="left">
                <p class='left-title'>相关资源推荐</p>
                
                <other-book @click="goDetail(getDetailPath(item.ObjectType),item.Id)" v-for="(item,index) in correlationList" :key="index" :ObjectType="item.ObjectType" 
                :Id="item.Id":title='item.Title' :CoverUrl="item.CoverUrl" :oldmoney='item.MarketPrice' :money='item.CurrentPrice'></other-book>
                
            </div>
            <div class="right">
                <already-shop></already-shop>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import search from "./module/Search.vue"
    import otherBook from "./module/OtherBook.vue"
    import alreadyShop from "./AlreadyShop.vue"
    import { mapGetters } from 'vuex'
    export default {
          computed: mapGetters([
            'userInfo',
          ]),
        data() {
            return {
                correlationList: [],
                ordernum: '',
                shipmentsnum: '',
                deliverynum: '',
                user: {
                    username: '',
                    MobileNumber: '',
                    username: '',
                    Email: '',
                    ExtendData: {
                        OrganizationTitle: ""
                    }
                },
            }
        },
        methods: {
            //相关推荐
            correlation() {
                this.$http.get("/Content/Recommend", {
                        params: {
                            count: 8
                        }
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.correlationList = res.data.Data
                        }
                    })
            },
            getDetail() {
                this.$http.get("/User/Detail", {
                        params: {
                            id: this.userInfo.Id
                        }
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.user = res.data.Data
                        }
                    })
            },

            //代付款的数量
            getorderlist() {
                this.$http.get("/Order/List", {
                        params: {
                            ps: 1,
                            cp: 1,
                            status: 3,
                            paidType: 2
                        }
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.ordernum = res.data.Data.RecordCount
                        }
                    })
            },

            //代发货的数量
            shipmentlist() {
                this.$http.get("/Order/List", {
                        params: {
                            ps: 1,
                            cp: 1,
                            status: 3,
                            paidType: 1
                        }
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.shipmentsnum = res.data.Data.RecordCount
                        }
                    })
            },
            //代收货的数量
            deliverylist() {
                this.$http.get("/Order/List", {
                        params: {
                            ps: 1,
                            cp: 1,
                            status: 4
                        }
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.deliverynum = res.data.Data.RecordCount
                        }
                    })
            },
            goPath(url) {
                this.$router.push(url)
            },
            getUseMessage() {
                this.username = this.userInfo.NickName
                this.MobileNumber = this.userInfo.MobileNumber
                this.Email = this.userInfo.Email
                this.UserType =this.userInfo.UserType
                this.UserFace = this.userInfo.UserFace ? this.userInfo.UserFace : ""
            },
        },
        components: {
            search,
            otherBook,
            alreadyShop,
        },
        mounted() {
            this.getUseMessage()
            this.getDetail()
            this.getorderlist()
            this.correlation()
            this.shipmentlist()
            this.deliverylist()
        },
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .center {
        /*        overflow: hidden;*/
        .mycenter {
            height: 340px;
            .message {
                width: 1200px;
                margin: auto;
                .username {
                    float: left;
                    margin-left: 412px;
                    margin-top: 45px;
                    font-size: 16px;
                    color: #333333;
                    font-weight: bold;
                }
                .state {
                    position: relative;
                    top: -56px;
                    margin-left: 20px;
                    li {
                        float: left;
                        margin-right: 60px;
                        text-align: center;
                        span {
                            color: #e71515
                        }
                    }
                }
                .message-select {
                    border: 1px solid #f2f2f2;
                    border-radius: 5px;
                    padding: 29px 0;
                    width: 936px;
                    margin-top: 72px;
                    margin-left: 262px;
                    height: 26px;
                    position: absolute;
                    .message-list>li {
                        float: left;
                        margin-left: 22px;
                        cursor: pointer;
                    }
                    .message-list {
                        position: relative;
                        overflow: hidden;
                        width: 100%;
                        top: -120px;
                        left: 129px
                    }
                    .message-list img {
                        vertical-align: -3px;
                        margin-right: 10px;
                    }
                    .lable {
                        float: left;
                        width: 100px;
                        height: 34px;
                        position: relative;
                        left: -128px;
                        top: 19px
                    }
                    .tag {
                        float: left;
                        width: 100px;
                        height: 34px;
                        position: relative;
                        left: -218px;
                        top: 23px;
                        color: #fff;
                        font-weight: 700
                    }
                    .portrait {
                        cursor: pointer;
                        float: left;
                        padding: 5px;
                        border: 1px solid #f2f2f2;
                        border-radius: 50%;
                        width: 110px;
                        height: 110px;
                        position: relative;
                        top: -90px;
                        left: 20px;
                        background-color: #fff;
                        img {
                            width: 110px;
                            height: 110px;
                            border-radius: 50%
                        }
                    }
                }
            }
        }
        .center-down {
            background-color: #f2f2f2;
            padding: 20px;
            margin-bottom: 20px
        }
        .down-center {
            width: 1200px;
            margin: auto;
            overflow: hidden;
            .left {
                float: left;
                background-color: #fff;
                padding: 16px 20px;
                width: 202px;
                margin-right: 15px;
                .left-title {
                    font-size: 16px;
                    color: #464646;
                    font-weight: bold;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #e6e6e6
                }
                .left-down {
                    margin-top: 57px;
                    padding-top: 20px;
                    border-top: 1px solid #e6e6e6;
                    color: #999;
                    font-size: 14px;
                }
            }
            .right {
                float: left;
                background-color: #fff;
                padding: 16px 20px 20px 20px;
                width: 902px;
            }
        }
        .bottom-img {
            width: 1200px;
            height: 200px;
            margin: 20px auto;
            background-color: #ddd;
        }
    }

</style>
