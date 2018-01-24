<template>
  <div class="login">
    <div class="header"></div>
    <div class="center">
      <div class="logimg">
        <img @click='goPath("/wrap/index")' src="../../assets/login.jpg">
        <span>欢迎注册</span>
        <span>已有账号？<a @click='goreg' style="cursor: pointer;">请登录</a></span>
      </div>
    </div>
    <div style="border-top: 2px solid #e6e6e6">
      <div class="tag">
        <div :class='phone?"select":""' @click='phone=true;resetForm("ruleForm2") '>手机注册</div>
        <div :class='phone?"":"select"' @click='phone=false;resetForm("ruleForm1") '>邮箱注册</div>
      </div>
      <div class='login-center'>
        <el-form v-if='phone' status-icon label-position='left' :model="enrollphone" :rules="regRules" ref="ruleForm1" label-width="100px">
          <el-form-item label="用 户 名 ：" prop="username">
            <el-input v-model='enrollphone.username' auto-complete="off">
              <template slot="prepend"><i class="login_user"></i></template>
            </el-input><span style="color: #999">*用户名注册后不能修改</span>
          </el-form-item>
          <el-form-item label="密　　码：" prop="password">
            <el-input type="password" v-model='enrollphone.password' auto-complete="off">
              <template slot="prepend"><i class="login_psd"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="confirm">
            <el-input type="password" v-model='enrollphone.confirm' auto-complete="off">
              <template slot="prepend"><i class="login_psd"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phone">
            <el-input v-model='enrollphone.phone'>
              <template slot="prepend"><i class="login_tel"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item label="短信验证码：" prop="code">
            <el-col :span="6">
              <el-input v-model='enrollphone.code'></el-input>
            </el-col>
            <span @click='getPhoneCode' :class='{code:PhoneCode,notcode:!PhoneCode}'>{{PhoneCode?'获取验证码':phonetime+'s'}}</span>
          </el-form-item>
          <el-checkbox class='checkbox' v-model="checked">我已经阅读并接受《用户注册协议》</el-checkbox>
          <el-button class='putin' type="primary" @click="submitForm('ruleForm1')">注册</el-button>
        </el-form>
        <el-form v-if='!phone' status-icon label-position='left' :model="enrollemail" ref="ruleForm2" :rules="regRules" label-width="100px">
          <el-form-item label="用 户 名 ：" prop="username">
            <el-input v-model='enrollemail.username' auto-complete="off">
              <template slot="prepend"><i class="login_user"></i></template>
            </el-input>
            <span style="color: #999">*用户名注册后不能修改</span>
          </el-form-item>
          <el-form-item label="密　　码：" prop="password">
            <el-input v-model='enrollemail.password' type="password" auto-complete="off">
              <template slot="prepend"><i class="login_psd"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="passwordcheck">
            <el-input v-model='enrollemail.passwordcheck' type="password" auto-complete="off">
              <template slot="prepend"><i class="login_psd"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item label="电子邮箱：" prop="email">
            <el-input v-model='enrollemail.email'>
              <template slot="prepend"><i class="login_email"></i></template>
            </el-input>
          </el-form-item>
          
    <el-form-item label="邮箱验证码：" prop="emailcode">
        <el-col :span="6">
            <el-input v-model='enrollemail.emailcode'></el-input>
        </el-col>
        <span @click='getemailCode' :class='{code:EmailCodezt,notcode:!EmailCodezt}'>{{EmailCodezt?'获取验证码':emailtime+'s'}}</span>
    </el-form-item>

          <!--
          <el-form-item label="验 证 码 ：" prop="code">
            <el-col :span="6">
              <el-input v-model='enrollemail.code'></el-input>
            </el-col>
-->
          <!--        <div class="verificationCode">-->
          <!--        <Tooltip content="点击切换验证码" placement="bottom-end" class="code-area">-->
          <!--
            <canvas @click="changeCode" class="verificationCode" :height="38" :width="58" ref="canvasCode">
              您的浏览器不支持canvas，请换个浏览器试试~
            </canvas>
-->
          <!--            <a href="" style="line-height: 50px;color:#e75820;text-decoration: underline;" @click.prevent="changeCode">获取验证码</a>-->
          <!--        </Tooltip>-->
          <!--        </div>-->
          <!--          </el-form-item>-->
          <el-checkbox class='checkbox' v-model="checked">我已经阅读并接受《用户注册协议》</el-checkbox>
          <el-button class='putin' type="primary" @click="submit('ruleForm2')">注册</el-button>
        </el-form>
      </div>
      <el-dialog title="" :visible.sync="centerDialogVisible" width="30%" center>
        <span>请到邮箱打开连接激活账号</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click='$router.push("login")'>已激活</el-button>
        <el-button  @click="centerDialogVisible = false">未激活</el-button>
      </span>
      </el-dialog>
    </div>
    <footers></footers>
  </div>
</template>
<script>
import footers from "../common/Footer.vue"
export default {
  data() {
    //验证密码
    const validatePassword = (rule, value, callback) => {
      var reg = /^[^\u4e00-\u9fa5]{0,20}$/
      if (value == '') {
        callback(new Error('请输入密码'));
      } else {
        if (value.length < 6 || value.length > 20) {
          callback(new Error('密码长度为6-20'));
        } else if (!reg.test(value)) {
          callback(new Error('密码不能含有中文'));
        } else {
          callback();
        }
      }

    };
    //密码是否一致
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.enrollphone.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    //密码是否一致
    const validatePassCheck2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.enrollemail.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validatePhones = (rule, value, callback) => {
      var myreg = /^1[34578][0-9]{9}/;
      if (!value) {
        return callback(new Error('电话不能为空'));
      } else if (!myreg.test(value)) {
        return callback(new Error('请输入有效电话'));
      } else {
        callback();
      }
    };
    const validateName = (rule, value, callback) => {
      if (!value || value.trim().length == 0) {
        return callback(new Error('用户名不能为空'));
      } else if (value.trim().length > 20) {
        callback(new Error('用户名不能超过20字'));
      } else {
        callback();
      }
    };
    const validatecode = (rule, value, callback) => {
      if (!value || value.trim().length == 0) {
        return callback(new Error('验证码不能为空'));
      } else if (!this.phone && value.toLowerCase() != this.code.toLowerCase()) {
        return callback(new Error('验证码为6位数'));
      } else {
        callback();
      }
    };
    const validateemailcode = (rule, value, callback) => {
      if (!value || value.trim().length == 0) {
        return callback(new Error('验证码不能为空'));
      } else if (value.trim().length != 6) {
        return callback(new Error('验证码为6位数'));
      } else {
        callback();
      }
    };
    return {
      phonetime: 120,
      emailtime: 120,
      PhoneCode: true,
      EmailCodezt: true,
      baseUrl: baseUrl,
      checked: false,
      centerDialogVisible: false,
      code: '',
      phone: true,
      enrollphone: {
        phone: '',
        username: '',
        password: '',
        confirm: '',
        code: '',
      },
      enrollemail: {
        email: '',
        username: '',
        password: '',
        passwordcheck: '',
        emailcode: '',
      },
      regRules: {
        email: [{
          required: true,
          message: '邮箱不能为空',
          trigger: 'blur'
        }, {
          type: 'email',
          message: '邮箱格式不正确',
          trigger: 'blur'
        }],
        username: [{
          validator: validateName,
          trigger: 'blur'
        }],
        password: [{
          validator: validatePassword,
          trigger: 'blur'
        }],
        confirm: [{
          validator: validatePassCheck,
          trigger: 'blur'
        }],
        passwordcheck: [{
          validator: validatePassCheck2,
          trigger: 'blur'
        }],
        phone: [{
          validator: validatePhones,
          trigger: 'blur'
        }],
        code: [{
          validator: validatecode,
          trigger: 'blur'
        }],
        emailcode: [{
          validator: validateemailcode,
          trigger: 'blur'
        }],
      },
    }

  },
  mounted() {
    //            this.getCaptcha()
  },
  methods: {
    goreg() {
      this.$router.push("login")
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      //                this.$refs[formName].resetFields();
    },
    getCaptcha() {
      this.code = '';
      for (var i = 0; i < 4; i++) {
        var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
        //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
        this.code += String.fromCharCode(65 + ranNum);
      }
      this.renderCode()
    },
    getcode() {
      setTimeout(() => {
        this.getCaptcha()
      }, 200);
    },
    //canvas绘制验证码
    renderCode() {
      let mycanvas = this.$refs.canvasCode;
      //                let width = mycanvas.width;
      //                let height = mycanvas.height;
      let cxt = mycanvas.getContext('2d');

      cxt.textBaseline = 'bottom';

      cxt.fillStyle = 'rgb(255,255,255)';

      //                if (this.isPhone) {
      //                    cxt.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      //                } else {
      cxt.fillRect(0, 0, 58, 38);
      //                }

      /**绘制文字**/
      let code = this.code.split('');

      for (var i = 0; i < this.code.length; i++) {
        let txt = code[i];

        cxt.fillStyle = 'rgb(0,0,0)'; //随机生成字体颜色
        //                    if (!this.isPhone) {
        cxt.font = this.randomNum(20, 26) + 'px Tahoma'; //随机生成字体大小
        //                    } else {
        //                        cxt.font = this.randomNum(28, 32) + 'px Tahoma'; //随机生成字体大小
        //                    }

        //                    if (!this.isPhone) {
        var x = 9 + i * 10;
        var y = this.randomNum(25, 35);
        //                    } else {
        //                        var x = 13 + i * 20;
        //                        var y = this.randomNum(35, 40);
        //                    }

        var deg = this.randomNum(-15, 15);
        //修改坐标原点和旋转角度
        cxt.translate(x, y);
        cxt.rotate(deg * Math.PI / 180);
        cxt.fillText(txt, 0, 0);
        //恢复坐标原点和旋转角度
        cxt.rotate(-deg * Math.PI / 180);
        cxt.translate(-x, -y);

      }

      /*生成干扰线10条*/
      //                for (var j = 0; j < 10; j++) {
      //                    cxt.strokeStyle = this.randomColor(140, 180);
      //                    cxt.beginPath(); //若省略beginPath，则每点击一次验证码会累积干扰线的条数
      //                    cxt.moveTo(this.randomNum(0, width), this.randomNum(0, height));
      //                    cxt.lineTo(this.randomNum(0, width), this.randomNum(0, height));
      //                    cxt.lineWidth = 0.5;
      //                    cxt.closePath();
      //                    cxt.stroke();
      //                }
      //
      //                /**绘制干扰点**/
      //                for (var i = 0; i < 20; i++) {
      //                    cxt.fillStyle = this.randomColor(0, 255);
      //                    cxt.beginPath();
      //                    cxt.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
      //                    cxt.fill();
      //                }
    },

    /*生成随机颜色*/
    //            randomColor(min, max) {
    //                var r = this.randomNum(min, max);
    //                var g = this.randomNum(min, max);
    //                var b = this.randomNum(min, max);
    //                return "rgb(" + r + "," + g + "," + b + ")";
    //            },

    /**生成一个随机数**/
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    changeCode() {
      this.getCaptcha();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!this.checked) {
          this.$message({
            message: '请同意用户协议后可正常注册',
            type: 'warning'
          });
        }
        if (valid && this.checked) {
          this.$http.post('/Passport/Register', {
              validateCode: this.enrollphone.code,
              account: this.enrollphone.username,
              password: this.enrollphone.password,
              mobileNumber: this.enrollphone.phone
            })
            .then((res) => {
              if (res.data.Code == 200) {
                this.$router.push("login")
              } else {
                this.$message.error(res.data.Description)
              }
            })
        }
      })
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!this.checked) {
          this.$message({
            message: '请同意用户协议后可正常注册',
            type: 'warning'
          });
        }
        if (valid && this.checked) {
          this.$http.post('/Passport/Register', {
              account: this.enrollemail.username,
              password: this.enrollemail.password,
              email: this.enrollemail.email,
              validateCode: this.enrollemail.emailcode,
            })
            .then((res) => {
              if (res.data.Code == 200) {
                this.centerDialogVisible = true
              } else {
                this.$message.error(res.data.Description)
              }
            })
        }
      })
    },
    goPath(path) {
      this.$router.push(path)
    },
    //邮箱验证码
    getemailCode() {
      if (this.EmailCodezt) {
        this.EmailCodezt = false
        this.$http.post('/Sms/Send', {
            type: 1,
            sendAddress: this.enrollemail.email
          })
          .then((res) => {
            if (res.data.Code == 200) {
              //                                sessionStorage.deviceToken = res.data.Data.DeviceToken
              this.minusemailtime()
            } else {
              this.$message.error(res.data.Description)
              this.EmailCodezt = true
            }
          })
      }
    },
    minusemailtime() {
      if (this.emailtime > 0) {
        this.emailtime--;
        window.setTimeout(this.minusemailtime, 1000);
      } else {
        this.EmailCodezt = true
        this.emailtime = 120
      }
    },
    minusphonetime() {
      if (this.phonetime > 0) {
        this.phonetime--;
        window.setTimeout(this.minusphonetime, 1000);
      } else {
        this.PhoneCode = true
        this.phonetime = 120
      }
    },
    //手机验证码
    getPhoneCode() {
      if (this.PhoneCode) {
        this.PhoneCode = false
        this.$http.post('/Sms/Send', {
            type: 1,
            sendAddress: this.enrollphone.phone
          })
          .then((res) => {
            if (res.data.Code == 200) {
              //                                sessionStorage.deviceToken = res.data.Data.DeviceToken
              this.minusphonetime()
            } else {
              this.$message.error(res.data.Description)
              this.PhoneCode = true
            }
          })
      }
    }
  },
  components: {
    footers
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.login {
  .el-form-item.is-required .el-form-item__label:before {
    display: none
  }
  .login_user,
  .login_psd,
  .login_tel,
  .login_email {
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
  .login_tel {
    background-image: url('/static/images/login_tel.png');
  }
  .login_email {
    background-image: url('/static/images/login_email.png');
  }
  .el-input-group__prepend {
    padding: 0 4px!important;
    background: none;
  }
  .header {
    height: 33px;
    width: 100%;
    background-color: #e6e6e6;
  }
  .center {
    .logimg {
      display: flex;
      align-items: center;
      width: 1200px;
      margin: auto;
      span:nth-child(2) {
        font-size: 26px;
        color: #666;
      }
      span:nth-child(3) {
        margin-left: 600px;
        font-size: 14px;
        color: #666;
        a {
          text-decoration: none;
          color: #e71515;
        }
      }
    }
  }
  .tag {
    width: 560px;
    margin: auto;
    overflow: hidden;
    margin-bottom: -1px;
    margin-top: 30px;
    cursor: pointer;
    div {
      width: 110px;
      border: 1px solid #e6e6e6;
      float: left;
      font-size: 16px;
      color: #333;
      text-align: center;
      padding: 12px 0;
      background-color: #ebebeb;
    }
    .select {
      background-color: #fff;
      border-bottom: 1px solid #fff;
    }
  }
  .login-center {
    width: 500px;
    border: 1px solid #e6e6e6;
    margin: 0 auto 260px;
    padding: 29px;
    .el-form-item__label {
      color: #666;
    }
    .code {
      margin-left: 20px;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #e71515;
      color: #e71515;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      -webkit-transition: .1s;
      transition: .1s;
      font-weight: 500;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
    .notcode {
      margin-left: 20px;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #999;
      color: #999;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      -webkit-transition: .1s;
      transition: .1s;
      font-weight: 500;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
    .verificationCode {
      margin-left: 20px;
      cursor: pointer;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
    }
    .putin {
      background-color: #e71515;
      border: 0px;
      font-size: 20px;
      width: 100%;
    }
    .el-checkbox .el-checkbox__label {
      font-size: 16px;
      color: #666;
    }
    .checkbox {
      margin: 20px 0 30px;
    }
  }
}

</style>
