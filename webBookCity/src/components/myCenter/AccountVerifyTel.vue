<template>
  <div class="account-password"> 
   <!-- logo搜索部分 -->
    <search :selectType='6'></search>
    <div class="account-right">
        <a href="#">账户设置 &gt; 验证身份</a>
        <ul class="account-center">
            <li>
                <img src="../../assets/imagesMy-Center/25.png">
                <div class="form-box">
                    <el-form label-position="left" ref="formIn" :model="form" :rules="regRules" label-width="100px">
                        <el-form-item label="验证方式：">
                            手机验证
                        </el-form-item>
                        <el-form-item label="手机号码：">
                            {{MobileNumber.substr(0,3)}}****{{MobileNumber.substr(7,4)}}
                        </el-form-item>
                        <el-form-item label="获取验证码：" prop="noteCode">
                            <el-input class="fl" v-model="form.noteCode" style="width: 100px;"></el-input>
                            <el-button class="fl ml20"  type="primary" @click="getcode()" plain>获取验证码</el-button>
                        </el-form-item>
                        <p>*短信验证码已发出，请注意查收，如未收到，可在120秒后要求系统重新发送</p>
                        <p>*没有收到短信验证码？</p>
                        <p>1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试</p>
                        <p>2、请核实手机是否已欠费停机，或者屏蔽了系统短信。</p>
                        <p>3、如果手机已丢失或停用，请拔打人员服务热线：4008-188-688 (服务时间：周一至周五 9:00-17:00)</p>
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
                this.MobileNumber = this.userInfo.MobileNumber
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
                                     {path:"accountNewTel",query:{ oldCode:this.form.noteCode,
                                                                  oldaccount:this.MobileNumber,}}
                                                    )
                                } else {
                                    this.$message.error(res.data.Description)
                                }
                            })
                    }
                })
//                 this.$router.push("accountNewTel")
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
