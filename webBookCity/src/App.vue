<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  created() {
    this.registerApp();
  },
  methods: {
    registerApp() {
      let nowDeviceToken = this.$cookies.get('deviceToken');
      if (nowDeviceToken && nowDeviceToken != 'undefined' && nowDeviceToken != '') {

      } else {
        this.$http.post('/Device/Register', {
            title: '建工社网上书城',
          })
          .then((res) => {
            if (res.data.Success) {
              this.$cookies.set('deviceToken', res.data.Data.DeviceToken,-1,'/');
              this.$cookies.set('deviceKey', res.data.Data.DeviceKey,-1,'/');
            }
          })
      }
    },
  },

}

</script>
<style lang='less'>
body,
p,
span,
ul,
li,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

#app {
  font-family: "Microsoft YaHei", "微软雅黑", 'Avenir', Helvetica, Arial, sans-serif;
  /*  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
  height: auto;
}

.global-box {
  margin: 0 auto;
  width: 1200px;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.mr20 {
  margin-right: 20px;
}

.ml20 {
  margin-left: 20px;
}

.mt20 {
  margin-top: 20px;
}

.mb20 {
  margin-bottom: 20px;
}

.btop {
  border-top: 1px solid #d6d6d6;
}

.bbtm {
  border-bottom: 1px solid #d6d6d6;
}

.detail-confirm {
  height: 200px;
  .el-message-box__status {
    font-size: 60px!important;
    margin-top: 30px;
  }
}

.collect-modal {
  height: 300px;
  width: 540px!important;
  color: #333;
  .collect-modal-container {
    padding-top: 70px;
    padding-left: 135px;
    overflow: hidden;
    padding-bottom: 28px;
    >i {
      float: left;
    }
    .collect-icon-success {
      display: inline-block;
      height: 42px;
      width: 42px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      background-image: url('/static/images/success_detail.png');
    }
    >span {
      float: left;
      font-size: 18px;
      line-height: 42px;
      display: inline-block;
      padding-left: 18px;
    }
  }
  .check-collect {
    display: block;
    text-decoration: none;
    color: #2967b0;
    text-align: center;
  }
}

.detail-loading {
  color: #e71516;
}

.detail-modal {
  .test-begin {
    height: 540px;
    border-top: 1px solid #d7d6db;
  }
  .el-dialog__headerbtn {
    top: -30px;
    right: 20px;
    z-index: 100;
    font-size: 24px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .comment-modal {
    /* padding: 38px 108px 30px; */
    padding: 30px;
    >span {
      font-size: 20px;
      color: #323232;
    }
    .comment-textarea {
      margin-top: 20px;
      /*       margin-bottom: 20px; */
      .el-textarea__inner {
        border-radius: 0;
      }
    }

    .comment-limit{
      font-size: 14px;
      color: #ddd;
      position: absolute;
      right: 20px;
      bottom:6px;
    }
  }
  .modal-header {
    height: 40px;
    padding: 10px 20px;
    margin-top: -15px;
    font-size: 20px;
    line-height: 40px;
    overflow: hidden;

    .title {
      display: inline-block;
      width: 440px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      float: left;
    }



    .count-down {
      display: inline-block;
      font-size: 16px;
      color: #e71518;
      float: left;
    }
    .submit-btn {
      display: inline-block;
      font-size: 16px;
      color: #343434;
      height: 40px;
      width: 128px;
      text-align: center;
      line-height: 40px;
      border-radius: 4px;
      border: 1px solid #a0a0a0;
      cursor: pointer;

      &:hover {
        background-color: #fdefef;
        border-color: #f29898;
        color: #e71515;
      }
    }
  }

  .modal-header-login {
    height: 67px;
    border-bottom: 1px solid #dedede;
    text-align: center;
    .title-center {
      font-size: 18px;
      line-height: 67px;
    }
  }
}

.el-breadcrumb__inner, .el-breadcrumb__inner a{
  font-weight: normal!important;
  color: #666666;
}

.el-breadcrumb__separator{
  color: #666666;
}

.el-breadcrumb__separator[class*=icon]{
  margin: 0 2px;
}

.el-popover--plain{
  padding: 5px 10px!important;
}

</style>
