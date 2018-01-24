<template>
  <div class="AccountBindOrganization"> 
   <!-- logo搜索部分 -->
    <search :selectType='6'></search>
    <div class="account-right">
        <a href="#">账户设置 &gt; 绑定机构验证码</a>
        <ul class="account-center">
            <li>
                <img src="../../assets/imagesMy-Center/14.png">
                <div class="form-box">
                    <el-form ref="form" :model="form" label-width="130px">
<!--
                        <el-form-item label="输入机构验证码：">
                            <el-input v-model="form.code" style="width: 300px;"></el-input>
                        </el-form-item>
-->
                        <el-button type="primary" @click="$router.push('accountSetting')" style="margin-left: 165px;">完成</el-button>
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
            return {
                form: {
                    code: '',
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
                        this.$http.post('/User/BindOrganization', {
                               validateCode:this.form.code
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
    .AccountBindOrganization {
        .account-right {
            width: 1200px;
            margin: auto;
            padding-bottom: 395px;
        }
        .account-right > a {
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
                }
            }
        }
    }

</style>
