<template>
  <div class="account-password"> 
   <!-- logo搜索部分 -->
    <search :selectType='6'></search>
    <div class="account-right">
        <a href="#">账户设置 &gt; 验证身份</a>
        <ul class="account-center">
            <li>
                <img src="../../assets/imagesMy-Center/32.png">
                <div class="form-box">
                    <el-form label-position="left" ref="formIn" :model="form" :rules="regRules" label-width="100px">
                        <el-form-item label="验证方式：">
                            邮箱验证
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            {{MobileNumber.substr(0,3)}}****{{MobileNumber.substr(MobileNumber.indexOf('@') + 1)}}
                        </el-form-item>
                        <el-form-item label="获取验证码：" prop="noteCode">
                            <el-input class="fl" v-model="form.noteCode" style="width: 100px;"></el-input>
                            <el-button class="fl ml20"  type="primary" @click="getcode()" plain>获取验证码</el-button>
                        </el-form-item>
                        <p>*邮箱验证码已发出，请注意查收，如未收到，可在120秒后要求系统重新发送</p>
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
                        this.$http.post('/User/CheckMobileOrEmail', {
                            validateCode:this.form.noteCode,
                            account:this.MobileNumber,
                            type:3,
                        })
                            .then((res) => {
                                if (res.data.Code == 200) {
                                     this.$router.push(
                                                      {path:"accountNewEmail",query:{ oldCode:this.form.noteCode,
                                                                  oldaccount:this.MobileNumber,}}
                                                      )
                                } else {
                                    this.$message.error(res.data.Description)
                                }
                            })
                    }
                })
//                 this.$router.push("accountNewEmail")
            },
            getcode() {
                this.$http.post('/Sms/Send', {
                    type:3,
                    sendAddress:this.MobileNumber
                })
                    .then((res) => {
                        if (res.data.Code == 200) {
                            
                        } else {
                            this.$message.error(res.data.Description)
                        }
                    })
            }
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
            margin-left: 261px;
            border: 1px solid #e6e6e6;
            border-radius: 5px;
            overflow: hidden;
            li {
                padding: 20px 0 30px;
                width: 938px;
                img {
                    margin-left: 53px;
                    width: 832px;
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
