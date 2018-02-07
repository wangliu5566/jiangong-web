<template>
  <div class="wrap">
    <heads/>
    <router-view :clientHeight='clientHeight-280'></router-view>
    <footers/>
    <!-- 登录modal -->
    <el-dialog custom-class="detail-modal" :visible.sync="loginModalNative" width="550px" :before-close="closeLoginModal" :close-on-click-modal="false">
      <div slot="title" class="modal-header-login">
        <p class="title-center">登录</p>
      </div>
      <LoginForm></LoginForm>
    </el-dialog>
  </div>
</template>
<script>
import heads from "./common/Header.vue"
import footers from "./common/Footer.vue"
import LoginForm from '@/components/login/Reg'
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      clientHeight: document.documentElement.clientHeight,

      loginModalNative: false,
    }
  },
  components: {
    heads,
    footers,
    LoginForm
  },
  mounted() {
    this.setWidth()
    const that = this;
    window.onresize = () => {
      return (() => {
        that.clientHeight = document.body.clientHeight
      })()
    }
  },
  computed: mapGetters([
    'loginModal'
  ]),
  watch: {
    'loginModal': function(val, oldVal) {
      this.loginModalNative = val;

      if (!val) {
        //重置是否是modal登录和登录后的回调
        let _this = this;
        setTimeout(function() {
          _this.$store.dispatch('setLoginByModal', false);
          _this.$store.dispatch('resetCallback');
        }, 1000)

      }
    }
  },
  methods: {
    closeLoginModal() {
      this.$store.dispatch('closeLoginModal', false);
      this.$store.dispatch('setLoginByModal', false);
      this.$store.dispatch('resetCallback');
      this.loginModalNative = false;
    },
    setWidth() {
      this.clientHeight = document.documentElement.clientHeight;
    },
    getList() {
      this.$http.post('/Content/Search', {
          query: JSON.stringify({
            "objectTypes": [102],
            "SearchOrderBy": {
              "ColumnName": "onShelfDate",
              "Descending": true
            },
          })
        })
        .then((res) => {
          console.log(res)
        })
    }
  },
  created() {
    // this.getList();
  }
}

</script>
<style lang='less'>
@red-color: #e71515;
.wrap {
  min-width: 1200px;
  overflow: hidden;

  .head-row {
    background-color: #eee;
  }
  .el-input__inner {
    border-radius: 0!important;
  }

  .el-icon-sort-up {
    width: 21px;
    margin-left: -7px;
  }

  .el-table {
    /*position:static!important;*/
    border: 1px solid #cfcfcf!important;
    border-bottom: none;
  }

  .el-table th.is-leaf,
  .el-table td {
    border-bottom: 1px solid #cfcfcf;
  }

  /*首页标题统一部分*/
  .content-title {
    height: 51px;
    line-height: 60px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
    overflow: hidden;
    position: relative;
    padding-top: 18px;

    .red-border {
      position: absolute;
      top: 38px;
      display: inline-block;
      width: 6px;
      height: 22px;
      background-color: @red-color;
    }
    .red-border1 {
      position: absolute;
      top: 20px;
      display: inline-block;
      width: 6px;
      height: 22px;
      background-color: @red-color;
    }
    .title {
      font-weight: 700;
      font-size: 18px;
      margin-left: 18px;
      color: #333;
    }

    .small-title {
      font-weight: 400;
      font-size: 16px;
      color: #464646;
    }

    .content-more {
      float: right;
      color: #666;
      line-height: 70px;
      font-size: 14px;
      cursor: pointer;
    }

    .type-content {
      font-size: 16px;
      color: #464646;
      cursor: pointer;
    }
    .span-icon {
      padding: 0 10px;
      cursor: default;
    }
  }

  /*面包屑公共样式 */
  .path {
    height: 58px;
    line-height: 58px;
    font-size: 16px;
    color: #464646;
    cursor: default;
    span {
      cursor: default;
    }

    span:nth-child(1):hover {
      color: @red-color;
      cursor: pointer;
    }
  }

  .aside-left {
    float: left;
    width: 242px;
    /*ul {
      font-size: 14px;
      width: 100%;
      border: 1px solid #ccc;
      border-left: none;
      box-sizing: border-box;
      margin-bottom: 20px;

      li {
        padding-left: 20px;
        color: #464646;
        line-height: 31px;
        background-color: #fff;
        border-left: 1px solid #e5e5e5;
        cursor: pointer;
      }
      li:hover {
        color: @red-color;
        background-color: #e5e5e5;
        padding-left: 19px;
        border-left: 2px solid @red-color;
      }
      .active {
        color: @red-color;
        background: #ededed;
        padding-left: 19px;
        border-left: 2px solid @red-color;
      }
    }*/
  }

  .aside-right {
    float: right;
    width: 938px;
  }

  /*分页样式*/
  .page {
    height: 50px;
    text-align: right;
    margin-top: 20px;
  }

  /*收藏*/
  .collect {
    height: 22px;
    padding-left: 20px;
    background: url('../../static/images/shouchang.png') no-repeat 0 8px;
    cursor: pointer;
    color: #666;
    font-size: 14px;
  }

  .collect1 {
    height: 22px;
    padding-left: 20px;
    background: url('../../static/images/shouchang2.png') no-repeat 0 8px;
    cursor: pointer;
    color: #666;
    font-size: 14px;
  }

  .shopping-car {
    font-size: 14px;
    height: 22px;
    padding-left: 22px;
    background: url('../../static/images/che.png') no-repeat 0 8px;
    -webkit-background-size: 16px;
    background-size: 16px;
    cursor: pointer;
    color: #666;
  }

  /*筛选条件按钮一排*/
  .subnav {
    margin-top: 10px;
    border: 1px solid #ccc;
    width: 926px;
    height: 42px;
    background: #ebebeb;
    padding-left: 10px;
    padding-top: 8px;
    position: relative;

    .float-span {
      float: right;
      margin-right: 10px;
      line-height: 40px;
      overflow: hidden;
      font-size: 14px;

      span {
        cursor: pointer;
      }
    }
  }

  .myBtn {
    padding: 8px 0 8px 10px;
    border-radius: 0!important;
    margin-left: 5px!important;
  }
  .myBtn1 {
    padding: 8px 15px;
    border-radius: 0!important;
  }

  .line-1 {
    display: inline-block;
    width: 1px;
    height: 26px;
    border-right: 1px dashed #666;
    position: absolute;
    left: 477px;
    top: 11px;
  }
  .price-1 {
    position: absolute;
    left: 490px;
    top: 14px;
    z-index: 998;
    font-size: 14px;
    color: #333;
  }
  .price-2 {
    position: absolute;
    left: 556px;
    top: 14px;
    z-index: 998;
    font-size: 14px;
    color: #333;
  } /*按钮样式完*/

  .names {
    width: 140px;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 30px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
  }

  .names:hover {
    color: @red-color;
    ;
    cursor: pointer;
  }

  .border-bottom-red {
    border-bottom: 1px solid @red-color;
  }

  .red,
  .price {
    color: @red-color;
    font-size: 16px;
    cursor: pointer;
  }

  .red14 {
    color: @red-color;
    font-size: 14px;
    cursor: pointer;
  }

  .red-active {
    color: @red-color;
    font-size: 14px;
    border-color: @red-color;
  }


  .market-price {
    font-size: 15px;
    color: #999;
    line-height: 20px;
    text-decoration: line-through;
  }
  .border-red {
    border: 1px solid @red-color
  }

  .hover:hover {
    color: red;
    cursor: pointer;
  }
}

</style>
