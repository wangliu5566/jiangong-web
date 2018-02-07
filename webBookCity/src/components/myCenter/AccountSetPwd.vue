<template>
  <div class="accountSetPwd"> 
   <!-- logo搜索部分 -->
    <search :selectType='6'></search>
    <div class="account-right">
        <span>账户设置 &gt; 设置新密码</span>
        <ul class="account-center">
            <li>
                <img src="../../assets/imagesMy-Center/05.png">
                <div class="form-box">
                    <el-form label-position="right" ref="formIn" :rules="regRules"  :model="form" label-width="90px">
                        <el-form-item label="原密码：" prop="oldPwd">
                            <el-input v-model="form.oldPwd" style="width: 300px;"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码："  prop="newPwd">
                            <el-input v-model="form.newPwd" style="width: 300px;"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码："  prop="comfirmPwd">
                            <el-input v-model="form.comfirmPwd" style="width: 300px;"></el-input>
                        </el-form-item>
                        <el-button class="mt20" type="primary" @click="next('formIn')"  style="margin-left: 165px;">下一步</el-button>
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
            //验证密码
            const validatePassword = (rule, value, callback) => {
                var reg = /^[^\u4e00-\u9fa5]{0,32}$/
                if (value == '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (value.length < 6 || value.length > 32) {
                        callback(new Error('密码长度为6-32'));
                    } else if (!reg.test(value)) {
                        callback(new Error('密码不能含有中文'));
                    } else {
                        callback();
                    }
                }

            };
            //验证密码
            const validatenewPassword = (rule, value, callback) => {
                var reg = /^[^\u4e00-\u9fa5]{0,32}$/
                if (value == '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (value.length < 6 || value.length > 32) {
                        callback(new Error('密码长度为6-32'));
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
                } else if (value !== this.form.newPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    oldPwd: '',
                    newPwd: '',
                    comfirmPwd: '',
                },
                regRules: {
                    oldPwd: [{
                        validator: validatePassword,
                        trigger: 'blur'
                    }],
                    newPwd: [{
                        validator: validatenewPassword,
                        trigger: 'blur'
                    }],
                    comfirmPwd: [{
                        validator: validatePassCheck,
                        trigger: 'blur'
                    }],
                },
            }
        },
        components: {
            search,
            otherBook,
        },
        methods: {
            next(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/Passport/UpdatePassword', {
                                account:this.userInfo.MobileNumber?this.userInfo.MobileNumber:this.userInfo.Email,
                                password: this.form.newPwd,
                                oldPassword: this.form.oldPwd,
                                type: 3
                            })
                            .then((res) => {
                                if (res.data.Code == 200) {
                                    this.$router.push("accountOver")
                                } else {
                                    this.$message.error(res.data.Description)
                                }
                            })
                    }
                })
            },
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .ml10 {
        margin-left: 10px;
    }

    .accountSetPwd {
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
