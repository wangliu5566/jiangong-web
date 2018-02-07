<template>
  <div class="order-detail"> 
   <!-- logo搜索部分 -->
    <search :selectType='6'></search>
    <div class="global-box-top">
        <span @click="gopath('index')">首页 &gt; </span>
        <span @click="gopath('center')">个人中心 &gt; </span>
        <span @click="gopath('myOrder')">我的订单</span>
    </div>
    <div class="order-details">
        <div class="box-con mt20 global-box">
            <div class="order-code">
                <div class="order-code-left">
                    <p>
                        <span>订 单 号 ：</span>
                        <span>{{this.$route.query.orderId}}</span>
                    </p>
                    <p>
                        <span>下单时间：</span>
                        <span>{{orderdata.CreateTime}}</span>
                    </p>
                    <h2 v-if="orderdata.Status!=1&&orderdata.Status!=2" >等待付款</h2>
<!--                    <p v-if="orderdata.Status!=1" >剩余23时：22分</p>-->
                    <h2 v-if="orderdata.Status==1" style='color: #71b247'>完成</h2>
                    <h2 v-if="orderdata.Status==2" >订单取消</h2>
                </div>
                <div class="order-code-right">
<!--                    <p v-if="orderdata.Status!=1">该订单会为您保留24.0小时（从下单之日算起），24.0小时之后如果还未付款，系统将自动取消该订单。</p>-->
                    <div class='tempo'>
                        <img  src="../../assets/dingdan2.png">
                        <img  src="../../assets/jindu1.png">
                        
                        <img v-if="orderdata.Status==1" src="../../assets/fukuan2.png">
                        <img v-if="orderdata.Status!=1" src="../../assets/fukuan.png">
                        <img v-if="orderdata.Status==1" src="../../assets/jindu1.png">
                        <img v-if="orderdata.Status!=1" src="../../assets/jindu2.png">
                        
                        <img v-if="orderdata.Status==1" src="../../assets/chuku2.png">
                        <img v-if="orderdata.Status!=1" src="../../assets/chuku.png">
                        <img v-if="orderdata.Status==1" src="../../assets/jindu1.png">
                        <img v-if="orderdata.Status!=1" src="../../assets/jindu2.png">
                        
                        <img v-if="orderdata.Status==1" src="../../assets/shouhuo2.png">
                        <img v-if="orderdata.Status!=1" src="../../assets/shouhuo.png">
                        <img v-if="orderdata.Status==1" src="../../assets/jindu1.png">
                        <img v-if="orderdata.Status!=1" src="../../assets/jindu2.png">
                        
                        <img v-if="orderdata.Status==1" src="../../assets/wancheng2.png">
                        <img v-if="orderdata.Status!=1" src="../../assets/wancheng.png">
                    </div>
                    <div class='orderTime'>
                        <span>提交订单</span>
                        <span>付款完成</span>
                        <span>商品出库</span>
                        <span>等待收货</span>
                        <span>完成</span>
                    </div>
                    <div class='noworderTime'>
                        <span>{{orderdata.CreateTime}}</span>
                        <span style="margin-left: 95px;">{{orderdata.PayTime}}</span>
<!--
                        <span>商品出库</span>
                        <span>等待收货</span>
-->
                        <span style="margin-left: 480px;">{{orderdata.PayTime}}</span>
                    </div>
                </div>
            </div>
        </div>
<!--
        <div class="box-con mt20 global-box">
            <div class="time">
                处理时间
            </div>
        </div>
-->
<!--
        <div class="box-con mt20 global-box">
            <div class="buyer-info">
               <ul>
                    <li>
                       <h6>收货人信息</h6>
                       <p>收货人：<span>吕杰</span></p>
                       <p>地&nbsp;&nbsp;&nbsp;址：<span>中国，北京，北京市，海定区，西三旗路31号，444444</span></p>
                       <p>电&nbsp;&nbsp;&nbsp;话：<span>12345678900</span></p>
                    </li>
                    <li>
                        <h6>配送信息</h6>
                        <p>配送方式：<span>普通快递</span></p>
                    </li>
                    <li>
                        <h6>配送信息</h6>
                        <p>配送方式：<span>普通快递</span></p>
                    </li>
                    <li>
                        <h6>发票信息</h6>
                        <p>发票类型：<span>公司</span></p>
                        <p>发票抬头：<span>中新金桥科技有限公司</span></p>
                        <p>发票内容：<span>图片</span></p>
                    </li>
               </ul>
            </div>
        </div>
-->
        
        <div class="box-con mt20 global-box">
            <div class="goods-info">
                <template>
                    <el-table
                      :data="tableData"
                      style="width: 100%">
                      <el-table-column  align="center" prop="Content.Id"  label="商品ID"  width="120"> </el-table-column>
                      <el-table-column show-overflow-tooltip class-name="border-left" align="center" label="商品信息"  >
                        <template slot-scope='props'>
                            <!-- {{scope.row.goodsInfo}} -->
                            <div @click="goDetail(getDetailPath(props.row.ObjectType),props.row.ObjectId)" class="goods-info-detail">
                                <div class="divimg1" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                                <div class="divimg" :style="{background:'url('+props.row.Content.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div></div>
                                <span class="hover">{{props.row.Content.Title}}</span>
                               <span v-if='props.row.ObjectType==108&&props.row.MediaType=="OriginalPic"' style='color: #999'>请联系人工客服获取文件，服务热线4008-188-688</span>
                            </div>
                        </template>
</el-table-column>
<el-table-column class-name="border-left" align="center" prop="goodsType" label="商品类型" width="120">
    <template slot-scope='props'>
                        {{props.row.ObjectType==104?returnType(props.row.MediaType):returnObjectType(props.row.ObjectType)}}
                        </template>
</el-table-column>
<el-table-column class-name="border-left" align="center" label="原价" width="120">
    <template slot-scope='props'>
                            &yen;{{formatPrice(props.row.Price, 2)}}
                        </template>
</el-table-column>
<el-table-column class-name="border-left" align="center" prop="Count" label="数量" width="120">
    <template slot-scope='props'>
                           {{props.row.Count}}
                        </template>
</el-table-column>
<el-table-column class-name="border-left" align="center" prop="onSale" label="优惠" width="120">
    <template slot-scope='props'>
                           &yen; {{props.row.ExtendData&&props.row.ExtendData.Benefit?formatPrice(props.row.ExtendData.Benefit, 2):'0.00'}}
                        </template>
</el-table-column>
<el-table-column class-name="border-left" align="center" label="小计" width="120">
    <template slot-scope='props'>
                            &yen;{{formatPrice(props.row.TotalMoney, 2)}}
                        </template>
</el-table-column>
</el-table>
</template>
</div>
</div>


<div class="box-con mt20 global-box">
    <div class="go-pay">
        <p>商品金额：<span>&yen;{{formatPrice(orderdata.UndiscountTotalMoney?orderdata.UndiscountTotalMoney:0, 2)}}</span></p>
        <!--        <p>运费：<span>&yen;10.00</span></p>-->
        <p>促销优惠：<span>-&yen;{{formatPrice(orderdata.ExtendData&&orderdata.ExtendData.Benefit?orderdata.ExtendData.Benefit:0, 2)}}</span></p>
        <div class="line"></div>
        <p>合计：<span class="red-word">&yen;{{formatPrice(orderdata.TotalMoney, 2)}}</span></p>
        <p class="mt20">实付总额：
            <b class="red-word total">&yen;{{formatPrice(orderdata.TotalMoney, 2)}}</b>
            <el-button v-if="orderdata.Status==3&&!orderdata.IsPaid" @click="$router.push({ path: '/wrap/paid', query: { orderId: $route.query.orderId }})" type="primary">去支付</el-button>
        </p>
    </div>
</div>
</div>
</div>
</template>

<script>
    import search from "./module/Search.vue"
    // import otherBook from "./module/OtherBook.vue"
    export default {
        data() {
            return {
                orderdata: '',
                tableData: []
            }
        },
        components: {
            search,
            // otherBook,
        },
        methods: {
            over() {
                console.log('over!');
            },
            gopath(url) {
                this.$router.push(url)
            },
            //获取详情
            getlist() {
                this.$http.get("/Order/Detail", {
                        params: {
                            id: this.$route.query.orderId,
                            ps: 20,
                            cp: 1
                        }
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.orderdata = res.data.Data
                            this.tableData = res.data.Data.OrderDetails
                        }
                    })
            },
        },
        mounted() {
            this.getlist()
            let liOfMycenter = document.getElementsByClassName('content-bottom')[0].children[0];
            liOfMycenter.style.opacity = 0;
            let noUl = document.getElementsByClassName('type-menus')[0];
            noUl.style.display = 'none';
            console.log(liOfMycenter, noUl);
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .red-word {
        color: #e71515;
    }

    .border-left {
        box-sizing: border-box;
        border-left: 1px solid #e6e6e6;
    }

    .order-detail {
        .type-menus {
            display: none
        }
        width: 100%;
        padding-bottom: 20px;
        .global-box>a {
            display: block;
            margin: 20px 0;
            text-decoration: none;
            font-size: 14px;
        }
        .global-box-top {
            width: 1200px;
            margin: auto;
        }
        .global-box-top>span {
            /*             display: block;*/
            margin: 20px 0;
            text-decoration: none;
            font-size: 14px;
            margin: 20px 0;
            display: inline-block;
            color: #666;
            cursor: pointer;
        }
        .order-details {
            padding-bottom: 20px;
            width: 100%;
            background: #f2f2f2;
            overflow: hidden;
            &>.box-con {
                background: #fff;
                border-radius: 5px;
                &>.order-code {
                    overflow: hidden;
                    p {
                        font-size: 14px;
                        color: #666;
                        line-height: 30px;
                    }
                    &>.order-code-left {
                        float: left;
                        padding: 20px;
                        width: 290px;
                        /*height: 180px;*/
                        box-sizing: border-box;
                        border-right: 1px solid #e6e6e6;
                        h2 {
                            margin: 12px 0;
                            color: #e71515;
                        }
                    }
                    &>.order-code-right {
                        float: left;
                        color: #666;
                        margin-left: 20px;
                        .tempo {
                            display: flex;
                            width: 820px;
                            align-items: center;
                            margin-top: 35px;
                            margin-left: 30px;
                        }
                        .orderTime>span {
                            display: inline-block;
                            width: 115px;
                            font-size: 14px;
                            margin-right: 60px;
                            margin-left: 15px;
                            /*                            text-align: center;*/
                        }
                        .orderTime>span:last-child {
                            margin-right: 0px;
                            margin-left: 27px;
                            width: 40px;
                        }
                        .noworderTime>span {
                            display: inline-block;
                            width: 93px;
                            font-size: 14px;
                            text-align: center
                        }
                    }
                }
                &>.time {
                    padding: 20px;
                    height: 100px;
                }
                &>.buyer-info {
                    ul {
                        overflow: hidden;
                        li {
                            height: 166px;
                            padding: 20px;
                            float: left;
                            width: 25%;
                            box-sizing: border-box;
                            border-right: 1px solid #e6e6e6;
                            h6 {
                                margin-bottom: 6px;
                                font-size: 14px;
                            }
                            p {
                                font-size: 14px;
                                color: #666;
                                line-height: 30px;
                                &>span {
                                    margin-left: 8px;
                                    /*display: inline-block;*/
                                }
                            }
                        }
                    }
                }
                &>.goods-info {
                    .goods-info-detail {
                        width: 430px;
                        .divimg1 {
                            border: 1px solid #eee;
                            float: left;
                            width: 80px;
                            height: 112px;
                            margin-right: 10px;
                        }
                        .divimg {

                            float: left;
                            width: 78px;
                            height: 110px;

                        }
                        span {
                            width: 330px;
                            margin-top: 28px;
                            float: left;
                            text-align: left;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
                &>.go-pay {
                    padding: 20px;
                    text-align: right;
                    p {
                        line-height: 32px;
                        &>span {
                            display: inline-block;
                            width: 100px;
                        }
                        &>b {
                            /*                            margin: 0 20px;*/
                            font-size: 24px;
                        }
                    }
                    .line {
                        margin: 20px 0;
                        height: 1px;
                        background: #e7e7e7;
                    }
                }
            }
        }
    }

</style>
