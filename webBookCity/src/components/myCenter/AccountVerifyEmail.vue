<template>
  <div class="account-password">
    <!-- logo搜索部分 -->
    <search :selectType='6'></search>
    <div class="account-right">
      <span>账户设置 &gt; 修改密码</span>
      <ul class="account-center">
        <li v-if='first'>
          <img src="../../assets/38.png">
          <div class="form-box">
            <el-form label-position="left" ref="formIn" :model="form" :rules="regRules" label-width="100px">
              <el-form-item label="邮箱：">
                {{MobileNumber.substr(0,3)}}****{{MobileNumber.substr(MobileNumber.indexOf('@') + 1)}}
              </el-form-item>
              <!-- <p>*邮箱验证码已发出，请注意查收，如未收到，可在120秒后要求系统重新发送</p> -->
              <el-button class="mt20" type="primary" style="margin-left: 165px;" @click="next('formIn')">发送邮件</el-button>
            </el-form>
          </div>
        </li>
        <li v-if='!first'>
          <img src="../../assets/39.png">
          <div class="form-box">
            <el-form label-position="left" ref="formIn" :model="form" :rules="regRules" label-width="100px">
              <p style='font-size:16px;margin: 10px 0 10px 41px;color:#666'>验证邮件已发送您的邮箱,请登录邮箱完成密码修改</p>
              <el-button class="mt20" type="primary" style="margin-left: 165px;" @click="$router.push('accountSetting')">完成</el-button>
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
    import { mapGetters } from 'vuex'
    export default {
          computed: mapGetters([
            'userInfo',
          ]),
        data() {
            const validatecode = (rule, value, callback) => {
                if (!value || value.trim().length == 0) {
                    return callback(new Error('验证码不能为空'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    noteCode: '',
                },
                MobileNumber: '',
                first: true,
                regRules: {
                    noteCode: [{
                        validator: validatecode,
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
                this.MobileNumber = this.userInfo.Email
            },
            next(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post("/Sms/Send", {
                                type: 2,
                                sendAddress: this.MobileNumber
                            })
                            .then((res) => {
                                if (res.data.Code == 200) {
                                    this.first = false
                                } else {
                                    this.$message.error(res.data.Description)
                                }
                            })
                    }
                })
                //                 this.$router.push("accountSetPwd")
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
        .account-right>span{
            display: block;
            margin: 20px 0;
            text-decoration: none;
            font-size: 14px;
            margin-left: 261px;
        }
        .account-center {
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
