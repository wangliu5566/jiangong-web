<template>
  <div class="header-wrap">
    <div class="head-content">
      <span @click="goLogin" v-if="!userInfo.isLogin">你好，请登录</span>
      <span v-if="userInfo.isLogin">{{userInfo.NickName+',您好'}}</span>
      <span class="lines">|</span>
      <span @click="exitSystem()" v-if="userInfo.isLogin">退出登录</span>
      <span v-if="userInfo.isLogin" class="lines">|</span>
      <span class="red" style="font-size: 14px;line-height: 32px;" v-if="!userInfo.isLogin" @click="$router.push('/register')">免费注册</span>
      <span @click="goPath('center')" v-if="userInfo.isLogin">个人中心</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {

    }
  },
  computed: mapGetters([
    'userInfo',
  ]),
  created() {
    this.$store.dispatch('setUserInfo');
  },
  methods: {
    //退出系统
    exitSystem() {
      this.$http.post("/Passport/Logout", {})
        .then((res) => {
          if (res.data.Success) {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('bg_user_info');

            this.$store.dispatch('getShoppingCount');
            this.$store.dispatch('setUserInfo');
            this.$router.push('/wrap/index');
          }
        })
    },
    goLogin(){
      this.$router.push({
        path:'/login',
        query:{
          redirect:this.$route.fullPath
        }
      })
    },
  }
}

</script>
<style lang='less'>
.header-wrap {
  width: 100%;
  min-width: 1200px;
  height: 32px;
  background-color: #e6e6e6;

  .head-content {
    width: 1200px;
    margin: 0 auto;
    text-align: right;
    line-height: 32px;
    font-size: 14px;
    color: #333;

    span {
      cursor: pointer;
    }
  }

  .lines {
    margin: 0 10px;
    cursor: default;
    color: #b3b3b3;
  }
}

</style>
