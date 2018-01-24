<template>
  <div class="my-order">
    <!-- logo搜索部分 -->
    <search :selectType='1'></search>
    <div class="collect-center">
      <div class='collect-notification'>
        <div class="collect-con">
          <div class="order-detail">
            <!--             高级搜索-->
            <el-form :inline="true" :model="formInline" ref="ruleForm" label-width="80px" class="demo-form-inline">
              <!--
                <el-form-item label="商 品 ID ：">
                  <el-input v-model="formInline.goodsId" style="width:100px"></el-input>
                </el-form-item>
-->
              <!--
                <el-form-item label="订单编号：">
                  <el-input v-model="formInline.orderId" style="width:180px"></el-input>
                </el-form-item>
-->
              <el-form-item label="商品名称：">
                <el-input v-model="formInline.goodsName" style="width:400px" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="订单类型：">
                <el-select v-model="formInline.mediaType" style="width:150px" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单状态：">
                <el-select v-model="formInline.goodssStatus" style="width:150px" placeholder="请选择">
                  <el-option label="全部订单" value="999"></el-option>
                  <el-option label="待付款" value="5"></el-option>
                  <el-option label="待发货" value="3"></el-option>
                  <el-option label="待收货" value="4"></el-option>
                  <el-option label="订单完成" value="1"></el-option>
                  <el-option label="订单关闭" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="下单时间：">
                <el-date-picker style="width:400px" v-model="formInline.time" type="daterange" format="yyyy 年 MM 月 dd 日" range-separator="-" :picker-options="pickerOptions1" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-form>
            <div class="search-btn">
              <el-button class='searchform' @click="searchOrder">搜索</el-button>
              <el-button class='reserform' @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </div>
          <div class="num">
            <span v-if='notPaynum' class='notPaynum'>{{notPaynum}}</span>
            <span v-if='shipmentsnum' class='shipmentsnum'>{{shipmentsnum}}</span>
            <span v-if='deliverynum' class='deliverynum'>{{deliverynum}}</span>
          </div>
          <div class="tabs">
            <template>
              <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)" :disabled='loading' label="全部订单" name="999">
                  <div class="order-box">
                    <ul class="order-header">
                      <li class="width360">订单详情</li>
                      <li class="width84">商品类型</li>
                      <li class="width72">数量</li>
                      <li class="width110">原价</li>
                      <li class="width110">合计金额</li>
                      <li class="width84">订单状态</li>
                      <li class="width110">订单操作</li>
                    </ul>
                    <div v-for='item in orderList' class="order-con mt20">
                      <p>
                        <span> {{item.CreateTime}}</span>
                        <span class="ml20">订单号：</span>
                        <span style="color: #333">{{item.ExternalId}}</span>
                      </p>
                      <div class="order-detail-table">
                        <table cellspacing="0" cellpadding="0">
                          <tbody>
                            <tr>
                              <td>
                                <div v-for='book in item.OrderDetails' class="order-list">
                                  <div class="fl pd10 order-book-name">
                                    <div class="imgdiv" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                                      <div @click="goDetail(getDetailPath(book.ObjectType),book.ObjectId)" :style="{backgroundImage:'url('+book.Content.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" class="imgdiv1 hover"></div>
                                    </div>
                                    <span style="width: 185px;margin-right: 65px;text-align:left;" @click="goDetail(getDetailPath(book.ObjectType),book.ObjectId)" class="hover">{{book.Content.Title}}</span>
                                    <span style="display:inline-block;float:left;width:70px;margin-left: 16px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">{{book.ObjectType==104?returnType(book.MediaType):returnObjectType(book.ObjectType)}}</span>
                                    <span style="display:inline-block;float:left;width:56px;margin-left: 16px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">x{{book.Count}}</span>
                                    <span style="display:inline-block;float:left;width:80px;margin-left: 26px;">
                                                <span style="display:inline-block;float:left;width:80px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">&yen;{{formatPrice(book.Price,2)}}</span>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td class="width110" valign="top">
                                <p class="top20">
                                  <span style="display:inline-block;width:90px;text-decoration: line-through;height: 24px;float:left;margin-left: 10px;
                                                font-size: 12px;color: #999;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">&yen;{{formatPrice(item.TotalMoney,2)}}</span>
                                  <span style="display:inline-block;width:90px;height: 24px;float:left;margin-left: 10px;color: #e01222;font-size: 14px;font-weight: bold;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">&yen;{{formatPrice(item.TotalMoney,2)}}</span>
                                </p>
                              </td>
                              <!--                                    待付款-->
                              <td valign="top" v-if='item.Status==3&&!item.IsPaid' class="width84">
                                <p class="top20">待付款</p>
                              </td>
                              <td valign="top" v-if='item.Status==3&&!item.IsPaid' class="width110">
                                <p class="look-word top20" @click="orderDetail(item.Id,item.MediaType)">订单详情</p>
                                <p class="look-word" @click="cancelOrder(item.Id)">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</p>
                                <p>
                                  <el-button size="small" style='border-radius: 0px' @click="$router.push({ path: '/wrap/paid', query: { orderId: item.Id } })" type="primary">支 付</el-button>
                                </p>
                              </td>
                              <!--                                    待收货-->
                              <td valign="top" v-if='item.Status==4' class="width84">
                                <p class="top20">待收货</p>
                              </td>
                              <td valign="top" v-if='item.Status==4' class="width110">
                                <p class="look-word top20" @click="orderDetail(item.Id,item.MediaType)">订单详情</p>
                                <span class='look-btn' @click='logistics(item.ExtendData)'>查看物流</span>
                                 <span class='sure-btn' @click='logisticsDialogVisible=true;confirmId=item.Id'>确认收货</span>
                              </td>
                              <!--                                    待发货-->
                              <td valign="top" v-if='item.Status==3&&item.IsPaid' class="width84">
                                <p class="top20">待发货</p>
                              </td>
                              <td valign="top" v-if='item.Status==3&&item.IsPaid' class="width110">
                                <p class="look-word top20" @click="orderDetail(item.Id,item.MediaType)">订单详情</p>
                              </td>
                              <!--                                    订单完成-->
                              <td valign="top" v-if='item.Status==1' class="width84">
                                <p class="top20">订单完成</p>
                              </td>
                              <td valign="top" v-if='item.Status==1' class="width110">
                                <p class="look-word top20" @click="orderDetail(item.Id,item.MediaType)">订单详情</p>
                              </td>
                              <!--                                    订单取消-->
                              <td valign="top" v-if='item.Status==2' class="width84">
                                <p class="top20">订单取消</p>
                              </td>
                              <td valign="top" v-if='item.Status==2' class="width110">
                                <p class="look-word top20" @click="orderDetail(item.Id,item.MediaType)">订单详情</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="not-data">
                      <img v-if='orderList.length==0' src="../../assets/wuziyuan.png" alt="">
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)" :disabled='loading' label="待付款" name="5">
                  <div class="order-box">
                    <ul class="order-header">
                      <li class="width360">订单详情</li>
                      <li class="width84">商品类型</li>
                      <li class="width72">数量</li>
                      <li class="width110">原价</li>
                      <li class="width110">合计金额</li>
                      <li class="width84">订单状态</li>
                      <li class="width110">订单操作</li>
                    </ul>
                    <div v-for='item in orderList' class="order-con mt20">
                      <p>
                        <span> {{item.CreateTime}}</span>
                        <span class="ml20">订单号：</span>
                        <span style="color: #333">{{item.ExternalId}}</span>
                      </p>
                      <div class="order-detail-table">
                        <table cellspacing="0" cellpadding="0">
                          <tbody>
                            <tr>
                              <td>
                                <div v-for='book in item.OrderDetails' class="order-list">
                                  <div class="fl pd10 order-book-name">
                                    <div class="imgdiv" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                                      <div @click="goDetail(getDetailPath(book.ObjectType),book.ObjectId)" :style="{backgroundImage:'url('+book.Content.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" class="imgdiv1 hover"></div>
                                    </div>
                                    <span style="width: 185px;margin-right: 65px;text-align:left;" @click="goDetail(getDetailPath(book.ObjectType),book.ObjectId)" class="hover">{{book.Content.Title}}</span>
                                    <span style="display:inline-block;float:left;width:70px;margin-left: 16px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">{{book.ObjectType==104?returnType(book.MediaType):returnObjectType(book.ObjectType)}}</span>
                                    <span style="display:inline-block;float:left;width:56px;margin-left: 16px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">x{{book.Count}}</span>
                                    <span style="display:inline-block;float:left;width:80px;margin-left: 26px;">
                                                <span style="display:inline-block;float:left;width:80px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">&yen;{{formatPrice(book.Price,2)}}</span>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td class="width110" valign="top">
                                <p class="top20">
                                  <span style="display:inline-block;width:90px;text-decoration: line-through;height: 24px;float:left;margin-left: 10px;
                                                font-size: 12px;color: #999;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">&yen;{{formatPrice(item.TotalMoney,2)}}</span>
                                  <span style="display:inline-block;width:90px;height: 24px;float:left;margin-left: 10px;color: #e01222;font-size: 14px;font-weight: bold;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">&yen;{{formatPrice(item.TotalMoney,2)}}</span>
                                </p>
                              </td>
                              <!--                                    待付款-->
                              <td valign="top" v-if='item.Status==3&&!item.IsPaid' class="width84">
                                <p class="top20">待付款</p>
                              </td>
                              <td valign="top" v-if='item.Status==3&&!item.IsPaid' class="width110">
                                <p class="look-word top20" @click="orderDetail(item.Id,item.MediaType)">订单详情</p>
                                <p class="look-word" @click="cancelOrder(item.Id)">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</p>
                                <p>
                                  <el-button size="small" style='border-radius: 0px' @click="$router.push({ path: '/wrap/paid', query: { orderId: item.Id } })" type="primary">支 付</el-button>
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="not-data">
                      <img v-if='orderList.length==0' src="../../assets/wuziyuan.png" alt="">
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)" :disabled='loading' label="待发货" name="3">
                  <div class="order-box">
                    <ul class="order-header">
                      <li class="width360">订单详情</li>
                      <li class="width84">商品类型</li>
                      <li class="width72">数量</li>
                      <li class="width110">原价</li>
                      <li class="width110">合计金额</li>
                      <li class="width84">订单状态</li>
                      <li class="width110">订单操作</li>
                    </ul>
                    <div v-for='item in orderList' class="order-con mt20">
                      <p>
                        <span> {{item.CreateTime}}</span>
                        <span class="ml20">订单号：</span>
                        <span style="color: #333">{{item.ExternalId}}</span>
                      </p>
                      <div class="order-detail-table">
                        <table cellspacing="0" cellpadding="0">
                          <tbody>
                            <tr>
                              <td>
                                <div v-for='book in item.OrderDetails' class="order-list">
                                  <div class="fl pd10 order-book-name">
                                    <div class="imgdiv" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                                      <div @click="goDetail(getDetailPath(book.ObjectType),book.ObjectId)" :style="{backgroundImage:'url('+book.Content.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" class="imgdiv1 hover"></div>
                                    </div>
                                    <span style="width: 185px;margin-right: 65px;text-align:left;" @click="goDetail(getDetailPath(book.ObjectType),book.ObjectId)" class="hover">{{book.Content.Title}}</span>
                                    <span style="display:inline-block;float:left;width:70px;margin-left: 16px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">{{book.ObjectType==104?returnType(book.MediaType):returnObjectType(book.ObjectType)}}</span>
                                    <span style="display:inline-block;float:left;width:56px;margin-left: 16px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">x{{book.Count}}</span>
                                    <span style="display:inline-block;float:left;width:80px;margin-left: 26px;">
                                                <span style="display:inline-block;float:left;width:80px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">&yen;{{formatPrice(book.Price,2)}}</span>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td class="width110" valign="top">
                                <p class="top20">
                                  <span style="display:inline-block;width:90px;text-decoration: line-through;height: 24px;float:left;margin-left: 10px;
                                                font-size: 12px;color: #999;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">&yen;{{formatPrice(item.TotalMoney,2)}}</span>
                                  <span style="display:inline-block;width:90px;height: 24px;float:left;margin-left: 10px;color: #e01222;font-size: 14px;font-weight: bold;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">&yen;{{formatPrice(item.TotalMoney,2)}}</span>
                                </p>
                              </td>
                              <!--                                    待发货-->
                              <td valign="top" v-if='item.Status==3&&item.IsPaid' class="width84">
                                <p class="top20">待发货</p>
                              </td>
                              <td valign="top" v-if='item.Status==3&&item.IsPaid' class="width110">
                                <p class="look-word top20" @click="orderDetail(item.Id,item.MediaType)">订单详情</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="not-data">
                      <img v-if='orderList.length==0' src="../../assets/wuziyuan.png" alt="">
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)" :disabled='loading' label="待收货" name="4">
                  <div class="order-box">
                    <ul class="order-header">
                      <li class="width360">订单详情</li>
                      <li class="width84">商品类型</li>
                      <li class="width72">数量</li>
                      <li class="width110">原价</li>
                      <li class="width110">合计金额</li>
                      <li class="width84">订单状态</li>
                      <li class="width110">订单操作</li>
                    </ul>
                    <div v-for='item in orderList' class="order-con mt20">
                      <p>
                        <span> {{item.CreateTime}}</span>
                        <span class="ml20">订单号：</span>
                        <span style="color: #333">{{item.ExternalId}}</span>
                      </p>
                      <div class="order-detail-table">
                        <table cellspacing="0" cellpadding="0">
                          <tbody>
                            <tr>
                              <td>
                                <div v-for='book in item.OrderDetails' class="order-list">
                                  <div class="fl pd10 order-book-name">
                                    <div class="imgdiv" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
                                      <div @click="goDetail(getDetailPath(book.ObjectType),book.ObjectId)" :style="{backgroundImage:'url('+book.Content.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" class="imgdiv1 hover"></div>
                                    </div>
                                    <span style="width: 185px;margin-right: 65px;text-align:left;" @click="goDetail(getDetailPath(book.ObjectType),book.ObjectId)" class="hover">{{book.Content.Title}}</span>
                                    <span style="display:inline-block;float:left;width:70px;margin-left: 16px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">{{book.ObjectType==104?returnType(book.MediaType):returnObjectType(book.ObjectType)}}</span>
                                    <span style="display:inline-block;float:left;width:56px;margin-left: 16px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">x{{book.Count}}</span>
                                    <span style="display:inline-block;float:left;width:80px;margin-left: 26px;">
                                                <span style="display:inline-block;float:left;width:80px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">&yen;{{formatPrice(book.Price,2)}}</span>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td class="width110" valign="top">
                                <p class="top20">
                                  <span style="display:inline-block;width:90px;text-decoration: line-through;height: 24px;float:left;margin-left: 10px;
                                                font-size: 12px;color: #999;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">&yen;{{formatPrice(item.TotalMoney,2)}}</span>
                                  <span style="display:inline-block;width:90px;height: 24px;float:left;margin-left: 10px;color: #e01222;font-size: 14px;font-weight: bold;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;">&yen;{{formatPrice(item.TotalMoney,2)}}</span>
                                </p>
                              </td>
                              <!--                                    待收货-->
                              <td valign="top" v-if='item.Status==4' class="width84">
                                <p class="top20">待收货</p>
                              </td>
                              <td valign="top" v-if='item.Status==4' class="width110">
                                <p class="look-word top20" @click="orderDetail(item.Id,item.MediaType)">订单详情</p>
                                <span class='look-btn' @click='logistics(item.ExtendData)'>查看物流</span>
                                <span class='sure-btn' @click='logisticsDialogVisible=true;confirmId=item.Id'>确认收货</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="not-data">
                      <img v-if='orderList.length==0' src="../../assets/wuziyuan.png" alt="">
                    </div>
                  </div>
                </el-tab-pane>
                <!--
                  <el-tab-pane label="退款" name="five">
                    <div class="order-box">
                      <ul class="order-header">
                        <li class="width380">订单详情</li>
                        <li class="width84">商品类型</li>
                        <li class="width110">原价</li>
                        <li class="width58">数量</li>
                        <li class="width110">优惠后价格</li>
                        <li class="width84">订单状态</li>
                        <li class="width110">订单操作</li>
                      </ul>
-->
                <!-- 待收货 -->
                <!--
                      <div class="order-con mt20">
                        <p>
                          <el-checkbox v-model="checked"></el-checkbox>
                          <span>2017-12-19 19:38:34</span>
                          <span class="ml20">订单号：</span>
                          <span>12345678909</span>
                        </p>
                        <div class="order-detail-table">
                          <table cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr>
                                <td class="width380">
                                  <div class="order-list">
                                    <div class="fl pd10 order-book-name">
                                      <img src="http://placehold.it/80x80">
                                      <span>职业资格考试用书</span>
                                    </div>
                                  </div>
                                </td>
                                <td valign="top" class="width84">电子书</td>
                                <td valign="top" class="width110">&yen;34.50</td>
                                <td valign="top" class="width58">x3</td>
                                <td valign="top" class="width110">&yen;24.50</td>
                                <td valign="top" class="width84">退款</td>
                                <td valign="top" class="width110">
                                  <p>订单详情</p>
                                  <p><el-button size="mini">查看退款进度</el-button></p>
                                   <p><el-button size="mini" type="primary" plain>确认收货</el-button></p> 
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
-->
              </el-tabs>
            </template>
</div>
<div class="pagination mb20">
    <el-pagination v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)" style='float: right' small :current-page="cp" @current-change="changecp" layout="prev, pager, next" :total="allcount" :page-size="20">
    </el-pagination>
</div>
</div>
</div>
</div>
<el-dialog title="物流信息" :visible.sync="centerDialogVisible" width="544px" center>
    <p>物流公司 : {{logisticsName}}</p>
    <p>运单号码 : {{logisticsNumber}}</p>
    <p>请登录快递网站 查询 物流信息</p>
</el-dialog>

<el-dialog title="确认收货" :visible.sync="logisticsDialogVisible" width="544px" center>
    <p style='margin-left:30px'>请您确认已接受到商品后,再确认收货</p>
    <span slot="footer" class="dialog-footer">
    <el-button @click="confirm()">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
    import search from "./module/Search.vue"
    export default {
        data() {
            return {
                //未来时间不可用
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                options: [{
                    label: '电子书',
                    value: 'Elec'
                }, {
                    label: '纸质书',
                    value: 'Entity'
                }, {
                    label: 'POD',
                    value: 'POD'
                }, ],
                checked: false,
                visible2: false,
                activeName2: '999',
                confirmId: '', //确认收货
                formInline: {
                    goodsId: '',
                    orderId: '',
                    goodsName: '',
                    goodssStatus: '',
                    startTime: '',
                    endTime: '',
                    mediaType: '',
                    time: '',
                },
                orderList: [],
                isIndeterminate: false,
                centerDialogVisible: false,
                logisticsDialogVisible: false,
                loading: false,
                cp: 1,
                allcount: 0,
                notPaynum: 0,
                shipmentsnum: 0,
                deliverynum: 0,
                logisticsName: '',
                logisticsNumber: '',
                seekOrder: {
                    state: false,
                    number: ''
                }
            }
        },
        components: {
            search
        },
        methods: {
            //物流窗口
            logistics(data) {
                this.logisticsName = ''
                this.logisticsNumber = ''
                this.logisticsName = data.LogisticsName
                this.logisticsNumber = data.LogisticsNumber
                this.centerDialogVisible = true
            },
            //确认收货
            confirm(id) {
                this.$http.post("/Order/SetOrderState", {
                        id: this.confirmId,
                        isPaid: 1,
                        type: 1
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.confirmId = ''
                            this.logisticsDialogVisible = false
                            this.getlist()
                        }
                    })
            },
            //            未支付
            notPay() {
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
                            this.notPaynum = res.data.Data.RecordCount
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
            centername() {
                //                console.log(this.$route.query.name)
                if (this.$route.query.name) {
                    this.activeName2 = this.$route.query.name
                }
            },
            //重置
            resetForm(formName) {
                this.activeName2 = '999'
                this.formInline = {
                    goodsId: '',
                    orderId: '',
                    goodsName: '',
                    goodssStatus: '',
                    startTime: '',
                    time: '',
                }
                this.seekOrder = {
                    state: false,
                    number: ''
                }
                this.getlist()
            },
            //订单取消
            cancelOrder(id) {
                this.$confirm('此操作将取消该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post("/Order/Cancel", {
                        id
                    }).then((res) => {
                        if (res.data.Success) {
                            this.cp = 1;
                            this.orderList = []
                            this.getlist()
                        }
                    })
                }).catch(() => {

                });

            },
            //订单高级搜索
            searchOrder() {
                //                console.log(this.formInline.goodssStatus)
                if (this.formInline.goodssStatus == 1 || this.formInline.goodssStatus == 2) {
                    this.activeName2 = '999'
                    this.seekOrder = {
                        state: true,
                        number: this.formInline.goodssStatus
                    }
                    this.getlist()
                } else {
                    this.seekOrder = {
                        state: false,
                        number: ''
                    }
                    this.activeName2 = this.formInline.goodssStatus ? this.formInline.goodssStatus : '999'
                    this.getlist()
                }
            },
            //分页
            changecp(val) {
                this.cp = val;
                this.orderList = []
                this.getlist()
            },
            handleClick() {
                this.seekOrder = {
                    state: false,
                    number: ''
                }
                this.formInline = {
                    goodsId: '',
                    orderId: '',
                    goodsName: '',
                    goodssStatus: '',
                    startTime: '',
                    time: '',
                }
                if (!this.loading) {
                    this.cp = 1;
                    this.allorderList = []
                    this.notPayorderList = []
                    this.notGetorderList = []
                    this.waitorderList = []
                    console.log(this.activeName2)
                    this.getlist()
                }
            },
            //跳转详情
            orderDetail(id, type) {
                if (type.indexOf("POD") > -1 || type.indexOf("Entity") > -1) {
                    this.$router.push({
                        path: "PaperDetail",
                        query: {
                            orderId: id
                        }
                    })
                } else {
                    this.$router.push({
                        path: "OrderDetail",
                        query: {
                            orderId: id
                        }
                    })
                }
            },
            //全部的列表
            getlist() {
                this.loading = true
                this.notPay()
                this.shipmentlist()
                this.deliverylist()
                this.$http.get("/Order/List", {
                        params: {
                            ps: 20,
                            cp: this.cp,
                            startTime: this.formInline.time ? this.formInline.time[0] : '',
                            endTime: this.formInline.time ? this.formInline.time[1] : '',
                            mediaType: this.formInline.mediaType,
                            orderId: this.formInline.orderId,
                            status: this.seekOrder.state ? this.seekOrder.number : (this.activeName2 == 999 ? '' : (this.activeName2 == 5 ? 3 : this.activeName2)),
                            paidType: this.activeName2 == 5 ? 2 : this.activeName2 == 3 ? 1 : ''
                        }
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.loading = false
                            this.orderList = res.data.Data.ItemList
                            this.allcount = res.data.Data.RecordCount ? res.data.Data.RecordCount : 1
                        }
                    })
            },
            goPath(url) {
                this.$router.push(url)
            },
        },
        mounted() {
            //个人中心跳转
            this.centername()
            this.getlist()
        },
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .red-word {
        color: #e71515;
    }

    .look-word:hover {
        color: red;
        cursor: pointer;
    }

    .el-tabs__header {
        margin: 0;
    }

    .top20 {
        margin-top: 10px
    }

    .pd10 {
        padding: 10px;
    }

    .width438 {
        width: 438px;
    }

    .width58 {
        width: 58px;
    }

    .width84 {
        width: 84px;
    }

    .width110 {
        width: 110px;
    }

    .width380 {
        width: 380px;
    }

    .width360 {
        width: 360px;
    }

    .width72 {
        width: 72px;
    }

    .my-order {
        .num {
            position: relative;
            .notPaynum {
                width: 20px;
                height: 20px;
                background-color: #e71515;
                display: inline-block;
                border-radius: 50%;
                font-size: 12px;
                color: #fff;
                text-align: center;
                line-height: 20px;
                position: absolute;
                z-index: 9;
                left: 184px;
                top: 2px;
            }
            .shipmentsnum {
                width: 20px;
                height: 20px;
                background-color: #e71515;
                display: inline-block;
                border-radius: 50%;
                font-size: 12px;
                color: #fff;
                text-align: center;
                line-height: 20px;
                position: absolute;
                z-index: 9;
                left: 280px;
                top: 2px;
            }
            .deliverynum {
                width: 20px;
                height: 20px;
                background-color: #e71515;
                display: inline-block;
                border-radius: 50%;
                font-size: 12px;
                color: #fff;
                text-align: center;
                line-height: 20px;
                position: absolute;
                z-index: 9;
                left: 375px;
                top: 2px;
            }
        }
        .look-btn {
            cursor: pointer;
            display: inline-block;
            border: 1px solid #e6e6e6;
            font-size: 14px;
            border-radius: 0px;
            padding: 4px;
        }
        .sure-btn {
            cursor: pointer;
            margin-top: 6px;
            display: inline-block;
            border: 1px solid #e71715;
            color: #e71715;
            font-size: 14px;
            border-radius: 0px;
            padding: 4px;
        }
        .el-dialog__footer {
            padding: 0 0 20px 0;
        }
        .el-dialog__body {
            padding: 55px 0 79px 122px;
            font-size: 14px;
            color: #666;
            line-height: 27px;
        }
        .el-dialog__header {
            border-bottom: 1px solid #f1f1f1;
            padding: 18px 0;
        }
        .order-detail {
            overflow: hidden
        }
        .not-data {
            text-align: center;
            margin: 30px
        }
        .search-btn {
            float: left;
            width: 148px;
            padding-left: 30px;
            border-left: 1px solid #eee;
            .reserform {
                width: 118px;
                height: 37px;
                margin-left: 0px;
                margin-bottom: 10px;
            }
            .searchform {
                margin: 6px 0 8px;
                width: 118px;
                height: 37px;
                color: #e71715;
                border-color: #e71715
            }
        }
        .el-input__inner {
            border-radius: 0px
        }
        .demo-form-inline {
            width: 757px;
            float: left;
        }
        .demo-form-inline input {
            border-radius: 0px
        }
        .el-tabs__item {
            background-color: rgb(235, 235, 235);
            font-size: 16px;
            padding: 0 24px;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item {
            border-left: 1px solid rgb(222, 222, 222);
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
            border-left: none;
        }
        .el-tabs__item.is-active {
            color: #000;
        }
        .el-tabs__item.is-active {
            border-bottom-color: #fff;
            background-color: #fff
        }
        .collect-center {
            width: 1200px;
            margin: auto;
            min-height: 600px;
            .collect-notification {
                margin-left: 262px;
                font-size: 16px;
                &>.collect-con {
                    padding-top: 20px;
                    width: 938px;
                    .el-form-item {
                        margin-bottom: 18px;
                    }
                    .el-form-item__label {
                        padding: 0 !important;
                        font-size: 16px !important;
                        /*font-weight: bold !important;*/
                        color: #333 !important;
                    }
                    .order-box {
                        padding-top: 20px;
                        box-sizing: border-box;
                        /*                        border: 1px solid #dedede;*/
                        border-top: none;
                        &>.order-header {
                            margin-bottom: 20px;
                            overflow: hidden;
                            border: 1px solid #dedede;
                            background-color: #f2f2f2;
                            li {
                                float: left;
                                text-align: center;
                                font-size: 14px;
                                color: #666;
                                background: #f2f2f2;
                                height: 30px;
                                line-height: 30px;
                            }
                        }
                        &>.order-con {
                            border-top: 1px solid #e6e6e6;
                            border-left: 1px solid #e6e6e6;
                            border-right: 1px solid #e6e6e6;
                            &>p {
                                padding-left: 10px;
                                height: 30px;
                                line-height: 30px;
                                font-size: 14px;
                                color: #666;
                                background: #f2f2f2;
                            }
                        }
                        .order-detail-table {
                            &>table {
                                tr td {
                                    text-align: center;
                                    border: 1px solid #e6e6e6;
                                    font-size: 14px;
                                    color: #666;
                                    &>.order-list {
                                        width: 100%;
                                        border-bottom: 1px solid #e6e6e6;
                                        overflow: hidden;
                                        .imgdiv {
                                            float: left;
                                            margin-right: 10px;
                                            width: 80px;
                                            height: 112px;
                                            box-sizing: border-box;
                                            border: 1px solid #e6e6e6;
                                        }
                                        .imgdiv1 {
                                            float: left;
                                            /*                                            margin-right: 10px;*/
                                            width: 78px;
                                            height: 110px;
                                            /*                                            box-sizing: border-box;*/
                                            /*                                            border: 1px solid #e6e6e6;*/
                                        }
                                        .order-book-name {
                                            width: 610px;
                                            &>span {
                                                float: left;
                                                margin-top: 40px;
                                                width: 250px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;
                                            }
                                        }
                                    }
                                    &>.order-list:last-child {
                                        border-bottom: none;
                                    }
                                    p {
                                        line-height: 30px;
                                    }
                                }
                            }
                        }
                    }
                    .pagination {
                        padding: 20px 0;
                        overflow: hidden;
                        /*                        border: 1px solid #e6e6e6;*/
                        border-top: none;
                    }
                    .el-pager li.active {
                        color: #fff;
                        cursor: default;
                        background-color: #e81615;
                        border-radius: 50%;
                    }
                }
            }
        }
    }

</style>
