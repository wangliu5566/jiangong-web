<template>
  <div class="paper-paid">
    <searchNoMenu></searchNoMenu>
    <p class="global-box mt20 sub-title">
      <span class="red-border"></span>
      <span>确认订单</span>
    </p>
    <div class="con-box">
      <div class="global-box power-content">
        <!-- 收货人信息 -->
        <div class="buyer-info">
          <h5 style="line-height: 46px;border-bottom: 1px solid #ddd;font-weight: bold;">确认收货地址
            <span style="cursor: pointer;" @click="addAddressModal(1,{})">新增收货地址</span>
          </h5>
          <div style="overflow: hidden;" v-if="addressList.length>0">
            <h5 style="line-height: 56px;">收货人信息</h5>
            <p class="address-part">
              <span class="fir-span">{{selectAddress.Reciver}}&nbsp;&nbsp;  {{selectAddress.Province}}</span>
              <span style="margin-right: 10px;">{{selectAddress.MobilePhone}}</span>
              <span style="margin-right: 10px;">{{selectAddress.DetailedAddress}}</span>
              <span style="margin-right: 10px;">{{selectAddress.PostCode?selectAddress.PostCode:''}}</span>
            </p>
            <p class="site">
              <span>更换地址</span>
              <span class="hover" @click="showList=true" v-if="!showList">展开 <i class="el-icon-d-arrow-right top-piont"></i></span>
              <span class="hover" @click="showList=false" v-if="showList">收起 <i class="el-icon-d-arrow-left top-piont"></i></span>
            </p>
            <div v-if="showList" v-loading="getAddressListLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(256, 256, 256, 0.8)">
              <div class="address-list" v-for="(item,index) in addressList">
                <p style="font-size: 14px;">{{index+1}}.&nbsp;&nbsp;{{item.Reciver}}
                  <span style="margin-left: 10px;">
                    {{item.Country}}{{item.Province}}{{item.DetailedAddress}}{{item.PostCode&&item.PostCode!=''?','+item.PostCode:''}},{{item.MobilePhone}}
                  </span>
                </p>
                <p style="color:#999;">
                  <el-checkbox @change="changeDefaultAd(item.Id)" v-model="item.checked">设置为默认收货地址</el-checkbox>
                </p>
                <span class="change-span">
                  <el-button class="change-btn" @click="addAddressModal(2,item)">修改</el-button>
                  <el-button class="change-btn change-btn1" @click="changeAddressFn(item)">更换</el-button>
                </span>
              </div>
            </div>
          </div>
          <div style="overflow: hidden;line-height: 80px;" v-if="addressList.length==0">
            <el-button @click='addAddressModal(1,{})' type="primary">+ 新增地址</el-button>
          </div>
        </div>
        <!-- 配送方式 -->
        <div class="delivery">
          <h5>配送方式</h5>
          <div class="distribution">
            <el-radio v-model="sendMethod" label="0">快递</el-radio>
            <el-radio v-model="sendMethod" label="1">EMS</el-radio>
            <el-radio v-model="sendMethod" label="3">自提书(限北京地区)</el-radio>
          </div>
          <p style="margin-top: 10px;">快递费用说明：快递:书款151元以下，15元；151元(含)以上，书款的15%，300元以上包邮。</p>
          <p style="margin-top: 10px;">EMS:书款80元(含)以下，35元；80元以上，书款的45%，300元以上包邮。</p>
        </div>
        <!-- 发票信息 -->
        <div class="invoice">
          <h5>发票信息</h5>
          <div>
            <el-checkbox class="need-voucher" label="需要开发票" v-model="checked"></el-checkbox>
            <span style="color:#999;margin-left: 15px;font-size: 13px;">提示您：电子资源商品不提供开具发票服务</span>
          </div>
          <el-form ref="form" :model="formData" label-width="130px" :rules="rules" v-if="checked">
            <el-form-item label="发票类型：" class="no-bottom" prop="resource">
              <el-radio-group v-model="formData.resource">
                <el-radio label="1">普通发票</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发票内容：" class="no-bottom" prop="InvoiceContentType">
              <el-radio-group v-model="formData.InvoiceContentType">
                <el-radio label="1">明细</el-radio>
                <el-radio label="2">图书</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发票抬头：" class="no-bottom" prop="Type">
              <el-radio-group v-model="formData.Type">
                <el-radio label="1">个人</el-radio>
                <el-radio label="2">单位</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注：" v-if="isShowType==1">
              <el-input type="textarea" :rows="5" style="width: 95%;" v-model="formData.Comment"></el-input>
            </el-form-item>
            <el-form-item label="单位名称：" prop="Title" v-if="isShowType==2">
              <el-input style="width:370px;" v-model="formData.Title"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号：" prop="CropIdentity" v-if="isShowType==2">
              <el-input style="width:370px;" v-model="formData.CropIdentity"></el-input>
            </el-form-item>
            <el-form-item label="注册地址：" v-if="isShowType==2">
              <el-input style="width:370px;" v-model="formData.Address"></el-input>
            </el-form-item>
            <el-form-item label="注册电话：" v-if="isShowType==2">
              <el-input style="width:370px;" v-model="formData.Telephone"></el-input>
            </el-form-item>
            <el-form-item label="开户行：" v-if="isShowType==2">
              <el-input style="width:370px;" v-model="formData.BankName"></el-input>
            </el-form-item>
            <el-form-item label="开户行账号：" v-if="isShowType==2">
              <el-input style="width:370px;" v-model="formData.Account"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="global-box power-content">
        <!-- 纸质书商品信息 -->
        <div class="goods-info" v-if="paperList.length>0">
          <h5 style="line-height: 46px;border-bottom: 1px solid #ddd;margin-bottom: 15px;font-weight: bold;">确认订单信息</h5>
          <h5>纸质图书</h5>
          <el-table :data="paperList" style="width: 100%;margin-top: 20px" :header-row-class-name="tableRowClassName">
            <el-table-column label="" width="15">
              <template slot-scope='scope'>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="goodsName">
              <template slot-scope='scope'>
                <p>{{scope.row.RelatedObject&&scope.row.RelatedObject.Content&&scope.row.RelatedObject.Content.Title?scope.row.RelatedObject.Content.Title:'-'}}</p>
              </template>
            </el-table-column>
            <el-table-column label="商品类型" width="170">
              <template slot-scope='scope'>
                <p>{{scope.row.ObjectType==104?returnType(scope.row.MediaType):confirmType(scope.row.ObjectType)}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="oldPrice" label="价格" width="170">
              <template slot-scope='scope'>
                <p>&yen;{{scope.row.RelatedObject.Content?returnTypePrice(scope.row.MediaType,scope.row.RelatedObject.Content):'0.00'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="num" label="数量" width="120">
              <template slot-scope='scope'>
                <p>{{scope.row.Count?scope.row.Count:'0'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="onSale" label="优惠" width="170">
              <template slot-scope='scope'>
                <p>&yen;{{scope.row.ExtendData&&scope.row.ExtendData.DiscountMoney?formatPrice(scope.row.ExtendData.DiscountMoney,2):'0.00'}}</p>
              </template>
            </el-table-column>
            <el-table-column label="小计" width="120">
              <template slot-scope='scope'>
                <p>&yen;{{scope.row.ExtendData&&scope.row.ExtendData.TotalMoney?formatPrice(scope.row.ExtendData.TotalMoney,2):'0.00'}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 电子书商品信息 -->
        <div class="goods-info" v-if="elecList.length>0">
          <h5>电子资源</h5>
          <el-table :data="elecList" style="width: 100%;margin-top: 20px" :header-row-class-name="tableRowClassName">
            <el-table-column label="" width="15">
              <template slot-scope='scope'>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="goodsName">
              <template slot-scope='scope'>
                <p>{{scope.row.RelatedObject&&scope.row.RelatedObject.Content&&scope.row.RelatedObject.Content.Title?scope.row.RelatedObject.Content.Title:'-'}}</p>
              </template>
            </el-table-column>
            <el-table-column label="商品类型" width="170">
              <template slot-scope='scope'>
                <p>{{scope.row.ObjectType==104?returnType(scope.row.MediaType):confirmType(scope.row.ObjectType)}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="oldPrice" label="价格" width="170">
              <template slot-scope='scope'>
                <p>&yen;{{scope.row.Price?formatPrice(scope.row.Price,2):'0.00'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="num" label="数量" width="120">
              <template slot-scope='scope'>
                <p>{{scope.row.Count?scope.row.Count:'0'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="onSale" label="优惠" width="170">
              <template slot-scope='scope'>
                <p>&yen;{{scope.row.ExtendData&&scope.row.ExtendData.DiscountMoney?formatPrice(scope.row.ExtendData.DiscountMoney,2):'0.00'}}</p>
              </template>
            </el-table-column>
            <el-table-column label="小计" width="120">
              <template slot-scope='scope'>
                <p>&yen;{{scope.row.ExtendData&&scope.row.ExtendData.TotalMoney?formatPrice(scope.row.ExtendData.TotalMoney,2):'0.00'}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 去支付 -->
      <div class="global-box power-content">
        <div class="go-pay">
          <p>商品金额：<span>&yen;{{formatPrice(TotalMoney,2)?formatPrice(TotalMoney,2):'0.00'}}</span></p>
          <p>运费：<span>&yen;{{formatPrice(freight,2)}}</span></p>
          <p>促销优惠：<span>- &yen;{{formatPrice(DiscountMoney,2)?formatPrice(DiscountMoney,2):'0.00'}}</span></p>
          <div class="line"></div>
          <p>合计：<span class="red-word">&yen;{{formatPrice(TotalMoney+freight,2)}}</span></p>
          <p class="mt20">应付总额：
            <b class="red-word total">&yen;{{formatPrice(TotalMoney+freight,2)}}</b>
            <el-button type="primary" @click="PaidFn()" :loading="paidLoading">去支付</el-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 收货地址 -->
    <el-dialog :title="openModalType==1?'新增收货地址':'修改收货地址'" :visible.sync="showAddressModal" width="600px">
      <myAddress @ClickChild="cancleChildFn" v-if="showAddressModal"></myAddress>
    </el-dialog>
  </div>
</template>
<script>
import searchNoMenu from "../common/SearchNoMenu.vue"
import myAddress from "./address.vue"
export default {
  data() {
    return {
      orderObj: {},
      addressObj: {},

      tableData: [],
      elecList: [],
      paperList: [],
      TotalMoney: 0,
      DiscountMoney: 0,
      addressList: [],
      selectAddress: {},
      showAddressModal: false,
      getAddressListLoading: false,
      showList: false,
      openModalType: 1, //1新增，2是修改
      orderAddressId: '',
      freight: 0,

      hasDefault: false, //是否有收货地址

      sendMethod: "0",
      checked: false,

      paidLoading: false,
      shoppingCartIdsArr: [],
      objectIdsArr: [],
      countsArr: [],
      objectTypesArr: [],
      MediaType: [],

      isShowType: 1,
      invoiceId: '',
      formData: {
        resource: "1",
        Type: "1",
        InvoiceContentType: "1",
        Title: '',
      },
      rules: {
        resource: [
          { required: true },
        ],
        InvoiceContentType: [
          { required: true }
        ],
        Type: [
          { required: true }
        ],
        Title: [
          { required: true, message: '请填写单位名称', trigger: 'blur' }
        ],
        CropIdentity: [
          { required: true, message: '请填写纳税人识别号', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    searchNoMenu,
    myAddress
  },
  mounted() {
    this.getUserAddress() //获取地址

    if (!!localStorage.shoppingObj) {
      this.tableData = JSON.parse(localStorage.shoppingObj)
      console.log(this.tableData)
      this.tableData.forEach((item, index) => {
        if (item.ObjectType == 104 && item.MediaType != 'Elec') {
          this.paperList.push(item)
        } else {
          this.elecList.push(item)
        }
      })
      this.getTotalMoney()
      this.getFreight()
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'head-row';
      }
      return '';
    },
    /**
     * [getTotalMoney 获取总价]
     * @Author   王柳
     * @DateTime 2017-12-26
     * @return   {[]}   [description]
     */
    getTotalMoney() {
      if (this.tableData.length > 0) {
        this.tableData.forEach((item, index) => {
          this.TotalMoney = this.TotalMoney + parseFloat(item.ExtendData && item.ExtendData.TotalMoney ? item.ExtendData.TotalMoney : 0)
          this.DiscountMoney = this.DiscountMoney + parseFloat(item.ExtendData && item.ExtendData.DiscountMoney ? item.ExtendData.DiscountMoney : 0)
        })
      }
    },
    getUserAddress() {
      this.hasDefault = false;
      this.getAddressListLoading = true;
      this.$http.post("/UserAddressBook/List", {
          userId: JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id,
          ps: 9999,
          cp: 1,
        })
        .then((res) => {
          if (res.data.Success) {
            this.addressList = []
            res.data.Data.ItemList.forEach((item) => {
              item = Object.assign({}, item, { checked: false })
              this.addressList.push(item)
              if (item.IsDefault) {
                item.checked = true;
                this.hasDefault = true;
                this.selectAddress = item;
              }
            })

            if (!this.hasDefault && this.addressList.length > 0) {
              this.selectAddress = this.addressList[0];
              this.hasDefault = true;
            }

            this.getAddressListLoading = false;
          }
        })
    },
    /**
     * [PaidFn 生成订单并跳转支付页面]
     * @Author   王柳
     * @DateTime 2017-12-26
     */
    PaidFn() {
      this.shoppingCartIdsArr = []
      this.objectIdsArr = []
      this.countsArr = []
      this.objectTypesArr = [];
      this.MediaType = []
      this.tableData.forEach((item, index) => {
        this.shoppingCartIdsArr.push(item.Id)
        this.objectIdsArr.push(item.ObjectId)
        this.countsArr.push(item.Count)
        this.objectTypesArr.push(item.ObjectType)
        this.MediaType.push(item.MediaType)
      })

      this.saveOrderAddress()
    },
    //创建订单
    orderCreate() {
      this.$http.post("/Order/Create", {
          addressId: this.orderAddressId,
          sendMethod: this.sendMethod,
          invoiceId: this.invoiceId,
          objectIds: this.objectIdsArr.join(','),
          objectTypes: this.objectTypesArr.join(','),
          counts: this.countsArr.join(','),
          shoppingCartIds: this.shoppingCartIdsArr.join(','),
          mediaTypes: this.MediaType.join(',')
        })
        .then((res) => {
          this.paidLoading = false;
          if (res.data.Success) {
            var orderId = res.data.Data
            this.$router.push({ path: '/wrap/paid', query: { orderId: orderId } })
          } else {
            this.$message.error(res.data.Description)
          }
        })
    },
    changeAddressFn(item) {
      this.selectAddress = item;
    },
    /**
     * [getFreight 计算运费]
     * @Author   王柳
     * @DateTime 2018-01-22
     * @return   {[type]}   [description]
     */
    getFreight() {
      if (this.sendMethod == 0) {  //快递
        if (this.TotalMoney < 151) {
          this.freight = 15;
        } else if ((this.TotalMoney > 151 ||this.TotalMoney == 151 )&& this.TotalMoney < 300) {
          this.freight = this.TotalMoney * 0.15;
        } else {
          this.freight = 0;
        }
      }else if(this.sendMethod == 1){
        if (this.TotalMoney < 80 ||this.TotalMoney==80) {
          this.freight = 35;
        } else if (this.TotalMoney > 80 && this.TotalMoney < 300) {
          this.freight = this.TotalMoney * 0.45;
        } else {
          this.freight = 0;
        }
      }else{
        this.freight = 0;
      }

    },
    //存储订单地址
    saveOrderAddress() {
      if (this.hasDefault) {
        this.paidLoading = true;
        this.$http.get("/Order/SaveOrderAddress", {
            params: {
              userAddressBookId: this.selectAddress.Id,
            }
          })
          .then((res) => {
            if (res.data.Success) {
              this.orderAddressId = res.data.Data;
              if (this.checked) { //要发票
                this.saveInvoice()
              } else {
                this.orderCreate()
              }
            }
          })
      } else {
        this.paidLoading = false;
        this.$message.warning('请选择收货地址')
      }
    },
    /**
     * [addAddressModal 新增修改收货地址模态框]
     * @Author   王柳
     * @DateTime 2017-12-24
     */
    addAddressModal(type, item) {
      this.openModalType = type
      localStorage.changeAddressObj = JSON.stringify(item);
      localStorage.openModalType = type
      this.showAddressModal = true;
    },
    /**
     * [changeDefaultAd 修改默認收穫地址]
     * @Author   王柳
     * @DateTime 2018-01-15
     * @return   {[type]}   [description]
     */
    changeDefaultAd(id) {
      this.getAddressListLoading = true;
      this.$http.post("/UserAddressBook/SetDefault", {
          id: id,
        })
        .then((res) => {
          if (res.data.Success) {
            this.$message.success('修改成功')
            this.getUserAddress()
          }
        })
    },
    cancleChildFn(index) {
      this.showAddressModal = false;
      if (index == 1) {
        this.getUserAddress()
      }
    },
    //保存发票信息
    saveInvoice() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$http.post("/Invoice/Create", {
              InvoiceContentType: this.formData.InvoiceContentType,
              Type: this.formData.Type,
              Title: this.formData.Title,
              Comment: this.formData.Comment,
              Telephone: this.formData.Telephone,
              Address: this.formData.Address,
              BankName: this.formData.BankName,
              Account: this.formData.Account,
              CropIdentity: this.formData.CropIdentity,
            })
            .then((res) => {
              if (res.data.Success) {
                this.invoiceId = res.data.Data.InvoiceId;
                this.orderCreate()
              }
            })
        } else {
          this.paidLoading = false;
        }
      });
    }
  },
  watch: {
    'formData.Type': function(val) {
      this.isShowType = val
    },
    'sendMethod': function(val, old) {
      this.getFreight()
    }
  }
}

</script>
<style lang='less'>
.red-word {
  color: #e71515;
}

.paper-paid {
  width: 100%;
  color: #333;

  .no-bottom {
    margin-bottom: 0!important;
  }

  /*页面标题*/
  .sub-title {
    padding-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .red-border {
    position: relative;
    top: 3px;
    display: inline-block;
    margin-right: 10px;
    width: 8px;
    height: 20px;
    background: #e71515;
  }

  .con-box {
    width: 100%;
    background: #f2f2f2;
    padding-bottom: 40px;
    overflow: hidden;
    .power-content {
      margin-top: 20px;
      background: #fff;
      padding-bottom: 20px;

      .el-table__header {
        width: 1158px!important;
      }

      h5 {
        font-size: 16px;
        color: #333;
        font-weight: 400;
        &>span {
          float: right;
          font-size: 14px;
          font-weight: normal;
          color: #1565b5;
        }
      }
      /*收货人信息*/
      .buyer-info,
      .invoice,
      .pay,
      .delivery,
      .goods-info,
      .go-pay {
        padding: 10px 20px;
        overflow: hidden;
      }

      .address-part {
        height: 34px;
        overflow: hidden;
        font-size: 14px;
        line-height: 34px;
      }

      .fir-span {
        float: left;
        margin-right: 32px;
        text-align: center;
        line-height: 29px;
        display: inline-block;
        width: 150px;
        height: 33px;
        background: url('../../../static/images/kuangxiao.png') no-repeat;
      }
      .site {
        padding: 0;
        font-size: 14px;
        width: 100%;
        height: 20px;
        color: #666;
        margin-top: 10px;
        span:first-child {
          color: #1565b5;
          margin-right: 20px;
          cursor: default;
        }

        .top-piont {
          transform: rotate(90deg)
        }
      }

      .address-list {
        width: 1118px;
        height: 52px;
        padding: 5px 20px;
        border: 1px solid #e6e6e6;
        margin-top: 10px;
        overflow: hidden;
        line-height: 26px;
        color: #333;
        font-size: 16px;
        .el-checkbox__label {
          font-size: 12px!important;
          color: #999;
        }
      }

      .change-span {
        float: right;
        overflow: hidden;
        margin-top: -43px;
      }

      .change-btn {
        border-radius: 0;
        text-align: center;
        padding: 7px 25px;
      }

      .change-btn1 {
        border-color: #e71516;
        color: #e71516;
      }

      /*配送方式*/
      .delivery {
        .distribution {
          margin-top: 20px;
          .el-radio__label {
            font-size: 16px;
          }
        }
        p {
          margin-top: 20px;
          font-size: 14px;
          color: #999;
        }
      }

      /*发票信息*/
      .need-voucher {
        font-size: 20px;
        color: #333;
        margin: 20px 0;
        .el-checkbox__label {
          font-size: 16px!important;
          color: #999;
        }
      }
      /*去支付*/
      .go-pay {
        padding-right: 30px;
        text-align: right;
        line-height: 32px;
        span {
          display: inline-block;
          width: 100px;
        }
        b {
          margin: 0 20px;
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

</style>
