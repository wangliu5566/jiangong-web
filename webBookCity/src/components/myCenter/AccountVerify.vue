<template>
  <div class="account-password">
    <!-- logo搜索部分 -->
    <search :selectType='6'></search>
    <div class="account-right">
      <a href="#">账户设置 &gt; 修改密码</a>
      <ul class="account-center">
        <li>
          <img src="../../assets/38.png">
          <div class="form-box">
            <el-form label-position="left" ref="formIn" :model="form" :rules="regRules" label-width="100px">
              <el-form-item label="手机号码：">
                {{MobileNumber.substr(0,3)}}****{{MobileNumber.substr(7,4)}}
              </el-form-item>
              <el-form-item label="手机验证码 :" width="100px">
                <el-col :span="6">
                  <el-form-item prop="noteCode">
                    <el-input :maxlength='maxl' v-model="form.noteCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-button class="fl ml20" type="primary" @click="getcode()" plain>{{PhoneCode?'获取验证码':phonetime+'s'}}</el-button>
                </el-col>
              </el-form-item>
              <el-form-item label="新密码 :" prop="pass">
                <el-col :span="11">
                  <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="确认密码 :" prop="checkPass">
                <el-col :span="11">
                  <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
                </el-col>
              </el-form-item>
              <p>*短信验证码已发出，请注意查收，如未收到，可在120秒后要求系统重新发送</p>
              <p>*没有收到短信验证码？</p>
              <p>1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试</p>
              <p>2、请核实手机是否已欠费停机，或者屏蔽了系统短信。</p>
              <el-button class="mt20" type="primary" style="margin-left: 165px;" @click="next('formIn')">下一步</el-button>
            </el-form>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import search from "./module/Search.vue"
import otherBook from "./module/OtherBook.vue"
export default {
  data() {
    const validatecode = (rule, value, callback) => {
      if (!value || value.trim().length == 0) {
        return callback(new Error('验证码不能为空'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      var reg = /^[^\u4e00-\u9fa5]{0,20}$/
      if (value == '') {
        callback(new Error('请输入密码'));
      } else {
        if (value.length < 6 || value.length > 20) {
          callback(new Error('密码长度为6-20'));
        } else if (!reg.test(value)) {
          callback(new Error('密码不能含有中文'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.formIn.validateField('checkPass');
          }
          callback();
        }
      }

    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      phonetime: 120,
      PhoneCode: true,
      maxl: 6,
      form: {
        noteCode: '',
        pass: '',
        checkPass: '',
      },
      MobileNumber: '',
      regRules: {
        noteCode: [{
          validator: validatecode,
          trigger: 'blur'
        }],
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }],
      },
    }
  },
  components: {
    search,
    otherBook,
  },
  mounted() {
    this.getphone()
  },
  methods: {
    getphone() {
      this.MobileNumber = JSON.parse(window.sessionStorage.getItem('bg_user_info')).MobileNumber
    },
    next(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/Passport/UpdatePassword", {
              validateCode: this.form.noteCode,
              account: this.MobileNumber,
              password: this.form.pass,
            })
            .then((res) => {
              if (res.data.Success) {
                this.$router.push("accountOver")
              } else {
                this.$message.error(res.data.Description)
              }
            })
        }
      })
      //                 this.$router.push("accountSetPwd")
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
    getcode() {
      if (this.PhoneCode) {
        this.PhoneCode = false
        this.$http.post('/Sms/Send', {
            type: 2,
            sendAddress: this.MobileNumber
          })
          .then((res) => {
            if (res.data.Code == 200) {
              this.minusphonetime()
            } else {
              this.$message.error(res.data.Description)
              this.PhoneCode = true
            }
          })
      }

    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.account-password {
  .account-right {
    width: 1200px;
    margin: auto;
    padding-bottom: 395px;
  }
  .account-right>a {
    display: block;
    margin: 20px 0;
    text-decoration: none;
    font-size: 14px;
    margin-left: 261px;
  }
  .account-center {
    .getcode {
      color: #e71715;
      border-color: #e71715;
      border: 1px solid #e71715;
      border-radius: 5px;
      padding: 4px 13px;
      margin-left: 10px;
      cursor: pointer;
    }
    margin-left: 261px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    overflow: hidden;
    li {
      padding: 20px 0 30px;
      width: 938px;
      img {
        margin-left: 268px;
        width: 402px;
        height: 77px;
      }
      .form-box {
        padding-left: 240px;
        margin-top: 50px;
        p {
          color: #a1a1a1;
          font-size: 10px;
          line-height: 18px;
        }
      }
    }
  }
}

</style>
