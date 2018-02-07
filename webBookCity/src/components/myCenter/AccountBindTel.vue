<template>
  <div class="accountBindTel"> 
   <!-- logo搜索部分 -->
    <search :selectType='6'></search>
    <div class="account-right">
        <span>账户设置 &gt; 绑定手机</span>
        <ul class="account-center">
            <li>
<!--                <img src="../../assets/imagesMy-Center/07.png">-->
                <div class="form-box">
                    <el-form label-position="left" ref="formIn" :model="form" label-width="100px":rules="regRules" >
                        <el-form-item label="用　户　名：" prop="username">
                            <el-input v-model="form.username" style="width: 300px;"></el-input>
                        </el-form-item>
                        <el-form-item label="密　　　码：" prop="password">
                            <el-input v-model="form.password" type='password' style="width: 300px;"></el-input>
                        </el-form-item>
                        <el-form-item label="绑定手机号：" prop="phone">
                            <el-input v-model="form.phone" style="width: 300px;"></el-input>
                        </el-form-item>
                        <el-form-item label="获取验证码：" prop="code">
                            <el-input class="fl" v-model="form.code" style="width: 100px;"></el-input>
                            <el-button class="fl ml20" type="primary" @click="getcode" plain>获取验证码</el-button>
                        </el-form-item>
                        <p>*短信验证码已发出，请注意查收，如未收到，可在120秒后要求系统重新发送</p>
                        <p>*没有收到短信验证码？</p>
                        <p>1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试</p>
                        <p>2、请核实手机是否已欠费停机，或者屏蔽了系统短信。</p>
                        <p>3、如果手机已丢失或停用，请拔打人员服务热线：4008-188-688 (服务时间：周一至周五 9:00-17:00)</p>
                        <el-button class="mt20" type="primary" @click="next('formIn')"  style="margin-left: 165px;">绑定</el-button>
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

            const validateName = (rule, value, callback) => {
                if (!value || value.trim().length == 0) {
                    return callback(new Error('用户名不能为空'));
                } else if (value.trim().length > 20) {
                    callback(new Error('用户名不能超过20字'));
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
            const validatecode = (rule, value, callback) => {
                if (!value || value.trim().length == 0) {
                    return callback(new Error('验证码不能为空'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    username: '',
                    password: '',
                    phone: '',
                    code: '',
                },
                regRules: {
                    username: [{
                        validator: validateName,
                        trigger: 'blur'
                    }],
                    password: [{
                        validator: validatePassword,
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
                    }],
                    phone: [{
                        validator: validatePhones,
                        trigger: 'blur'
                    }],
                    code: [{
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
        methods: {
            next(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/User/ModifyMobileOrEmail', {
                                nickName: this.form.username,
                                passWord: this.form.password,
                                validateCode: this.form.code,
                                newAccount: this.form.phone,
                            })
                            .then((res) => {
                                if (res.data.Code == 200) {
                                    this.$router.push("successBindTel")
                                    //                                    this.$message.success("成功")
                                } else {
                                    this.$message.error(res.data.Description)
                                }
                            })
                    }
                })
            },
            getcode() {
                var myreg = /^1[34578][0-9]{9}/;
                if (!this.form.phone) {
                    this.$message.error("电话不能为空")
                } else if (!myreg.test(this.form.phone)) {
                    this.$message.error("请输入有效电话")
                } else {
                    this.$http.post('/Sms/Send', {
                            type: 3,
                            sendAddress: this.form.phone
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
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .accountBindTel {
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
                padding: 20px 0 30px 240px;
                width: 938px;
                img {
                    width: 476px;
                }
                .form-box {
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
