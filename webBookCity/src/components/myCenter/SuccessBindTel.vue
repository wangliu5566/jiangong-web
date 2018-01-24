<template>
  <div class="accountOver"> 
   <!-- logo搜索部分 -->
    <search :selectType='6'></search>
    <div class="account-right">
        <a href="#">账户设置 &gt; 绑定成功</a>
        <ul class="account-center">
            <li>
                <!-- <img src="../../assets/imagesMy-Center/06.png"> -->
                <p>手机绑定成功！</p>
                <el-button type="primary" @click="over">完成</el-button>
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
            return {}
        },
        components: {
            search,
            otherBook,
        },
        methods: {
          over() {
            this.$router.push("accountSetting")
          },
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .accountOver {
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
                width: 938px;
                padding: 20px 0 30px;
                text-align: center;
                img {
                    width: 832px;
                }
                p {
                    margin: 60px 0 50px;
                    font-size: 20px;
                    color: #666;
                    font-weight: bolder;
                }
            }
        }
    }

</style>
