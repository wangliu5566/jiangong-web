<template>
  <div class="account"> 
   <!-- logo搜索部分 -->
    <search :selectType='6'></search>
    <div class="account-right">
        <a href="#">账户设置 &gt; 找回密码</a>
        <ul class="account-center">
            <li>
                <img src="../../assets/imagesMy-Center/03.png">
                <div class="form-box">
                    <el-form label-position="left" ref="form" :model="form" label-width="80px">
                        <el-form-item label="用户名：">
                            <el-input v-model="form.username" style="width: 300px;"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码：">
                            <el-input class="fl" v-model="form.noteCode" style="width: 230px;"></el-input>
                            <el-button class="fl ml10" style="width: 60px;text-align: center;padding:12px 0" plain>ESR4</el-button>
                        </el-form-item>
                        <el-button class="mt20" type="primary" @click="next"  style="margin-left: 165px;">下一步</el-button>
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
                    username: '',
                    noteCode: '',
                },
            }
        },
        components: {
            search,
            otherBook,
        },
        methods: {
          next() {
            console.log('next!');
          },
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .ml10 {
        margin-left: 10px;
    }
    .account {
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
