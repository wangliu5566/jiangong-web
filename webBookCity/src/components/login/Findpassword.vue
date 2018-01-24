<template>
  <div class="findpassword"> 
       <div class="center">
           <div class="logimg">
               <img  @click='gotoPath("/wrap/index")' src="../../assets/login.jpg">
               <span>密码找回</span>
                <span>已有账号？<a @click='$router.push("login")' style="cursor: pointer;">请登录</a></span>
           </div>
       </div>
       <div class="find">
          <div v-if='first' class="find-centerk">
            <div class="find-center">
            <img class="step" src="../../assets/zhaohui1.png" alt="">
             <div class="select">
              <span>找回方式 :</span>
               <el-select v-model="value" @change='resetform()' style='width: 333px' size='small' placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </div>
              
              <el-form :model="findemail" v-if='value=="email"' :rules="rules" ref="ruleForm" class='email' label-width="100px" >
                  <el-form-item label="电子邮箱 :" prop="email">
                    <el-input v-model="findemail.email"></el-input>
                  </el-form-item>
                  <el-form-item>
                   <el-button  @click='$router.push("login")'>返回</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                  </el-form-item>
                </el-form>
                 
                 
                 
                 
                 <el-form :model="findphone" v-if='value=="phone"' :rules="rules" ref="rulephone" class='email' label-width="100px" >
                  <el-form-item label="手机号码 :" prop="phone">
                    <el-input v-model="findphone.phone"></el-input>
                  </el-form-item>
                    <el-form-item label="手机验证码 :" width="100px">
                     <el-col :span="10">
                         <el-form-item prop="code">
                            <el-input :maxlength='maxl' v-model="findphone.code"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="10">
                        <span @click='getPhoneCode' class="getcode" style=''>{{PhoneCode?'获取验证码':phonetime+'s'}}</span>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="新密码 :" prop="pass">
                    <el-input type="password" v-model="findphone.pass" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码 :" prop="checkPass">
                    <el-input type="password" v-model="findphone.checkPass" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                     <el-button  @click='$router.push("login")'>返回</el-button>
                    <el-button type="primary" @click="submitForm1('rulephone')">下一步</el-button>
                  </el-form-item>
                </el-form>
                
                
                
                
                
            </div>
              
              
           <el-dialog
             close-on-press-escape
             close-on-click-modal
              title=""
              :visible.sync="centerDialogVisible"
              width="30%"
              center>
              <span><img src="../../assets/tanhaoda.png"  style="vertical-align:middle;" alt="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;验证邮件已发送您的邮箱,请登录邮箱完成密码找回</span>
              <span slot="footer" class="dialog-footer">
                <el-button style='border:1px solid #e71715;color: #e71715;border-radius: 7px'  @click='$router.push("login")'>完成找回</el-button>
                <el-button style='border-radius: 7px' @click="centerDialogVisible = false">未收到邮件</el-button>
              </span>
            </el-dialog>
              
          </div>
          
          
         
          <div v-if='!first' class="find-centerk">
            <div class="find-center"> 
             <img class="step" src="../../assets/zhaohui2.png" alt="">
             <p style='font-size: 16px;color: #656565;font-weight: 700;text-align: center;margin: 70px 0 48px'>恭喜您，密码修改成功</p>
             <div style='text-align: center'><el-button style='padding: 12px 49px;' type="primary" @click="$router.push('login')">完成</el-button></div>
             
            </div> 
            </div>
          
          
        </div>
        <footers></footers>
    </div>
</template>

<script>
    import footers from "../common/Footer.vue"
    export default {
        data() {
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
            //           var validatePass = (rule, value, callback) => { // if (value === '') { // callback(new Error('请输入密码')); // } else { // if (this.findphone.checkPass !== '') { // this.$refs.rulephone.validateField('checkPass'); // } // callback(); // } // };
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
                        if (this.findphone.checkPass !== '') {
                            this.$refs.rulephone.validateField('checkPass');
                        }
                        callback();
                    }
                }

            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.findphone.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                phonetime: 120,
                PhoneCode: true,
                first: true,
                maxl: 6,
                findemail: {
                    email: ''
                },
                findphone: {
                    phone: '',
                    code: '',
                    pass: '',
                    checkPass: '',
                },
                options: [{
                    value: 'phone',
                    label: '手机找回'
                }, {
                    value: 'email',
                    label: '邮箱找回'
                }],
                value: 'phone',
                rules: {
                    code: [{
                        required: true,
                        message: '请输入验证码',
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
                    phone: [{
                        validator: validatePhones,
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        message: '邮箱不能为空',
                        trigger: 'blur'
                    }, {
                        type: 'email',
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }]
                },
                centerDialogVisible: false
            }

        },
        methods: {
            resetform() {
                if (this.value == 'phone') {
                    this.$refs.ruleForm.resetFields();
                } else {
                    this.$refs.rulephone.resetFields();
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
                            type: 2,
                            sendAddress: this.findphone.phone
                        })
                        .then((res) => {
                            if (res.data.Code == 200) {
                                this.minusphonetime()
                            } else {
                                this.$message.error('请输入正确电话')
                                this.PhoneCode = true
                            }
                        })
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post("/Sms/Send", {
                                type: 2,
                                sendAddress: this.findemail.email
                            })
                            .then((res) => {
                                if (res.data.Code == 200) {
                                    this.centerDialogVisible = true
                                } else {
                                    this.$message.error('请输入正确邮箱')
                                }
                            })
                    }
                });
            },
            submitForm1(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post("/Passport/UpdatePassword", {
                                validateCode: this.findphone.code,
                                account: this.findphone.phone,
                                password: this.findphone.pass,
                            })
                            .then((res) => {
                                if (res.data.Success) {
                                    this.first = false
                                } else {
                                    this.$message.error(res.data.Description)
                                }
                            })
                    }
                });
            },
            gotoPath(path) {
                this.$router.push(path)
            }
        },
        components: {
            footers
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .findpassword {
        .el-form-item.is-required .el-form-item__label:before {
            /*    content: '*';*/
            color: #fff;
            margin-right: 4px;
        }
        .el-button {
            border-radius: 0px;
        }
        .el-form-item__content {
            line-height: 28px;
            position: relative;
            font-size: 14px;
            height: 28px;
        }
        .el-form-item__label {

            line-height: 28px;

        }
        input {
            height: 28px;
            border-radius: 0px;
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
        .find {
            .getcode {
                color: #e71715;
                border-color: #e71715;
                border: 1px solid #e71715;
                border-radius: 5px;
                padding: 4px 13px;
                margin-left: 10px;
                cursor: pointer;
            }
            border-top: 2px solid #e6e6e6;
            background: url("../../assets/banner.jpg") no-repeat;
            height: 730px;
            .find-centerk {
                width: 1200px;
                margin: auto;
                .find-center {
                    .step {
                        margin: 19px 0 0 73px;
                    }
                    width: 548px;
                    height: 505px;
                    margin: 30px 0px 0 612px;
                    background-color: #fff;
                    overflow: hidden;
                    .select {
                        margin: 30px 0 0 66px;
                        span {
                            font-size: 14px;
                            color: #606266;
                            line-height: 40px;
                            margin-right: 9px;
                        }

                    }
                    .email {
                        width: 432px;
                        margin: 14px 0 0 43px;
                    }
                }
            }

        }
    }

</style>
