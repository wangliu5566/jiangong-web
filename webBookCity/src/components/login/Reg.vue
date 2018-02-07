<template>
  <div class="center-reg">
    <el-form status-icon class='form' :model="loginData" label-position='left' :rules="bgSystemLoginRules" ref="bgSystemLoginForm">
      <el-form-item prop='username'>
        <el-input v-model="loginData.username" @change="changeinput()" auto-complete="off" @keyup.enter.native="handleSubmitLogin('bgSystemLoginForm')">
          <template slot="prepend"><i class="login_user"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input type="password" v-model="loginData.password" @change="changeinput" auto-complete="off" @keyup.enter.native="handleSubmitLogin('bgSystemLoginForm')">
          <template slot="prepend"><i class="login_psd"></i></template>
        </el-input>
      </el-form-item>
      <el-col>
<!--
        <span style="cursor: pointer;" @click='rememberChange(loginData.rememberMe)'><img style="vertical-align: -3px;margin-right: 14px" src="../../assets/kuang.png" v-if='!loginData.rememberMe' alt=""><img src="../../assets/gouxuan.png" style="vertical-align: -3px;margin-right: 14px"  v-if='loginData.rememberMe' alt="">
    <span v-if='!loginData.rememberMe'>记住账号密码</span>
        <span v-if='loginData.rememberMe'>请勿在公共电脑上勾选此项</span>
        </span>
-->
        <a style='cursor: pointer' @click='$router.push("findpassword")'>忘记密码</a>
      </el-col>
      <el-button class='putin' type="primary" @click="handleSubmitLogin('bgSystemLoginForm')">登录</el-button>
<!--      <span style='padding: 8px 0;display: inline-block'>使用合作网站登录</span>-->
      <ul class='tripartite'>
<!--
        <li><img src="../../assets/qq.png" alt=""></li>
        <li><img src="../../assets/weixin.png" alt=""></li>
        <li><img src="../../assets/weibo.png" alt=""></li>
-->
        <li><span @click='goreg'>注册</span></li>
      </ul>
    </el-form>
    <p class="down-text"><img src="../../assets/gantanhao.png" alt=""><span>请勿设置与邮箱和其他网站相同的登录或者支付密码</span></p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      baseUrl: baseUrl,
      loginData: {
        username: this.$cookies.get('bg_user_info') && JSON.parse(this.$cookies.get('bg_user_info')).username ? JSON.parse(this.$cookies.get('bg_user_info')).username : window.localStorage.getItem('bg_user_username') ? window.localStorage.getItem('bg_user_username') : '',
        password: '',
        rememberMe: window.localStorage.getItem('bg_user_rememberMe') == "true" ? true : false,
      },
      checked: '',
      loadLoginForm: false,
      //用户名或者密码是否更改过
      isChange: false,
      bgSystemLoginRules: {
        username: [{
          required: true,
          message: '请输入手机/邮箱',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请填写密码',
          trigger: 'blur'
        }]
      },
      //      submitLoading: false,
    }
  },
  computed: mapGetters([
    'loginIsByModal',
  ]),

  methods: {
    changeinput() {
      this.isChange = true
    },
    goreg() {
      this.$router.push("/register")
    },
    handleSubmitLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if ((this.$cookies.get('bg_user_info') && !this.isChange) || (window.localStorage.getItem('bg_user_rememberMe')) && !this.isChange) {
            if (this.$cookies.get('bg_user_psd')) {
              //this.submitLoading = true;
              this.login();
            }
          } else {
            //          this.submitLoading = true;
            this.login();
          }
        }
      })
    },
    login() {
      this.$http.post('/Passport/Login', {
          account: this.loginData.username,
          password: this.loginData.password
        })
        .then((res) => {
          //          this.submitLoading = false;
          if (res.data.Success) {
//            if (this.loginData.rememberMe) {
//              //默认存一个月
//              this.$cookies.set('bg_user_psd', this.loginData.password, '30d','/');
//            }
            this.$cookies.set('bg_user_info', JSON.stringify(res.data.Data),null,'');
            this.$cookies.set('accessToken', res.data.Data.ExtendData.AccessToken,null,'/');
            
            window.localStorage.setItem('bg_user_username', this.loginData.username);
            window.localStorage.setItem('bg_user_rememberMe', this.loginData.rememberMe);
            window.localStorage.setItem('bg_user_isOverdue', false); //cookie的过期时间

            //登录后刷新用户信息和购物车信息
            this.$store.dispatch('setUserInfo',res.data.Data);
            this.$store.dispatch('getShoppingCount');


            //是否是弹窗登录
            if (this.loginIsByModal) {
              this.$store.dispatch('closeLoginModal', false);
            } else {
              this.$router.push(this.$route.query.redirect || '/')
            }
            
          }else{
             this.$message.error(res.data.Description);
          }
        })
    },
    //初始化用户名
    initPsd() {
      if ((this.$cookies.get('bg_user_info') && JSON.parse(this.$cookies.get('bg_user_info')).username && JSON.parse(this.$cookies.get('bg_user_info')).rememberMe) || (window.localStorage.getItem('bg_user_username') && window.localStorage.getItem('bg_user_rememberMe')) != "false") {
        let lastPsd = this.$cookies.get('bg_user_psd');
        if (lastPsd && !this.isChange) {
          if (this.loginData.username) {
            this.loginData.password = lastPsd;
          }
        } else {
          if (window.localStorage.getItem('bg_user_isOverdue') == "false") {
            this.$Message.error({
              content: '您记录的登录有效时间已过期，请重新输入密码',
              duration: 4
            });
            window.localStorage.setItem('bg_user_isOverdue', true);
          }

          this.loginData.rememberMe = false;
        }
      }

    },
    rememberChange(value) {
      this.loginData.rememberMe = !value
      if (this.$cookies.get('bg_user_info') && JSON.parse(this.$cookies.get('bg_user_info')).username && JSON.parse(this.$cookies.get('bg_user_info')).rememberMe && !this.isChange) {
        if (!value) {
          this.loginData.password = '';
        }
      }
    },
  },
  props: {
    isForm: {
      default: false,
      type: Boolean,
    },
    callBack: {
      type: String
    }
  },
  watch: {
    'loginData.username': function(val, oldVal) {
      if (!val && oldVal) {
        this.loginData.password = '';
      } else if (val.length == 1) {
        this.loginData.password = '';
      }
    }
  },
  created() {
    setTimeout(() => {
      this.loadLoginForm = true;
    }, 0);
//    this.initPsd();
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.putin {
  background-color: #e71515;
  border: 0px;
  font-size: 20px;
  width: 100%;
  margin-top: 8px;
}

.center-reg {
  padding: 0px 24px 0;
  .login_user,
  .login_psd {
    width: 40px;
    height: 30px;
    display: inline-block;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
  .login_user {
    background-image: url('/static/images/login_user.png');
  }
  .login_psd {
    background-image: url('/static/images/login_psd.png');
  }
  .el-input-group__prepend {
    padding: 0 4px!important;
    background: none;
  }
  .form {
    .el-form-item__content {
      height: 40px;
    }
    padding: 46px 51px;
    border-bottom: 1px solid #e6e6e6;
    a {
      color: #4595d8;
      text-decoration: none;
      display: inline-block;
      float: right
    }

    .tripartite>li {
      float: left;
      margin-right: 30px;
    }
    .tripartite {
      border-bottom: 46px;
/*      overflow: hidden;*/
        margin-top: 20px;
    }
    .tripartite>li:last-child {
      float: right;
      margin: 0;
      span {
        background-color: #fcf0ef;
        color: #e71515;
        border: 1px solid #e71515;
        border-radius: 3px;
        font-size: 16px;
        padding: 6px 22px;
        outline: none;
        cursor: pointer;
        line-height: 35px;
      }
    }
  }
  .down-text {
    display: flex;
    align-items: center;
    color: #323232;
    font-size: 16px;
    padding: 20px 0 39px;
    span {
      margin-left: 10px;
    }
  }
}

</style>
