<template>
  <div class="account"> 
   <!-- logo搜索部分 -->
    <search :selectType='6'></search>
    <div class="account-right">
        <a href="#">账户设置</a>
        <ul class="account-center">
        <li>
            <img src="../../assets/gou1.png" alt="">
            <span style="font-size: 20px;font-weight: bold;margin-left: 20px;flex-grow:2">登录密码</span>
            <span class='account-url'>
                <a  v-if="user.MobileNumber"  @click='goPath("accountVerify")' >手机修改 ></a>
                <br>
                <a  v-if="user.Email" @click='goPath("accountVerifyEmail")'>邮箱修改 ></a>
            </span>
        </li>
        <li>
            <img v-if="user.MobileNumber" src="../../assets/gou1.png" alt="">
            <img v-if="!user.MobileNumber" src="../../assets/gantanhao1.png" alt="">
            <span style="font-size: 20px;font-weight: bold;margin-left: 20px;flex-grow:2">手机绑定</span>
            <span class='account-url'>
                <a v-if="!user.MobileNumber" @click='goPath("accountBindTel")'>首次绑定 ></a>
                <a v-if="user.MobileNumber" @click='goPath("accountVerifyTel")'>修改 ></a>
                <br>
            </span>
        </li>
        <li>
            <img v-if="user.Email" src="../../assets/gou1.png" alt="">
            <img v-if="!user.Email" src="../../assets/gantanhao1.png" alt="">
            <span style="font-size: 20px;font-weight: bold;margin-left: 20px;flex-grow:2">邮箱绑定</span>
            <span class='account-url'>
               <a  v-if="!user.Email" @click='goPath("accountBindEmail")'>首次绑定 ></a>
                <a v-if="user.Email" @click='goPath("amend")'>修改 ></a>
                <br>
            </span>
        </li>
        <li>
            <img v-if="user.ExtendData.OrganizationTitle" src="../../assets/gou1.png" alt="">
            <img v-if="!user.ExtendData.OrganizationTitle" src="../../assets/gantanhao1.png" alt="">
            <span style="font-size: 20px;font-weight: bold;margin-left: 20px;flex-grow:2">机构验证码绑定</span>
            <span class='account-url'>
                <a  v-if="!user.ExtendData.OrganizationTitle" @click='goPath("accountBindOrganization")'>绑定 ></a>
                <a  v-if="user.ExtendData.OrganizationTitle" @click='goPath("accountBindOrganization")'>修改 ></a>
                <!-- <span v-if="user.ExtendData.OrganizationTitle" @click='goPath("accountBindOrganization">{{user.ExtendData.OrganizationTitle}}</span> -->
            </span>
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
                user:{
                    ExtendData:{
                        OrganizationTitle:''
                    }
                },
            }
        },
        components: {
            search,
            otherBook,
        },
        mounted() {
            this.getDetail()
        },
        methods:{
            getDetail(){
                 this.$http.get("/User/Detail", {
                        params: {
                            id:JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id
                        }
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            console.log(res.data.Data)
                            this.user=res.data.Data
                        }
                    })
            },
            goPath(url) {
                this.$router.push(url)
            },
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .account {
        .account-right {
            width: 1200px;
            margin: auto;
            color: #464646;
            margin-bottom: 250px;
            a {
                font-size: 14px;
                color: #464646;
                display: inline-block;
            }
        }
        .account-right>a {
            text-decoration: none;
            font-size: 14px;
            margin: 22px 0 15px 261px;
        }
        .account-center {
            margin-left: 261px;
            border: 1px solid #e6e6e6;
            border-radius: 5px;
            overflow: hidden;
            li {
                border-bottom: 1px solid #e6e6e6;
                display: flex;
                padding: 27px 19px;
                align-items: center;
                justify-content: space-between;
                .account-url {
                    a {
                        text-decoration: none;
                        font-size: 14px;
                        float: right;
                        cursor: pointer;
                    }
                }
            }
        }
    }

</style>
