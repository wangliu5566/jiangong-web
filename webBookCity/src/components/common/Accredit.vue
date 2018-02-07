<template>
  <div class="accredit-main" v-loading.fullscreen.lock='loading' element-loading-text="验证授权中，请等待" element-loading-spinner="el-icon-loading" >

  </div>
</template>
<script>
export default {
  data() {
    return {
      loading:false
    }
  },
  created() {
    this.accredit();
  },
  methods: {
    accredit() {
      this.loading = true;
      this.$http({
        url: '',
        baseURL: this.$route.query.baseURL,
        method: 'post',
        data: {
          Id: this.$route.query.Id,
          authorizeToken: this.$route.query.authorizeToken,
          appId: this.$route.query.appId
        }
      }).then((res) => {
        this.loading = false;
        if (res.data.Success) {
          this.readMyResource(this.$route.query.DefaultFileExtension, this.$route.query.Id, this.$route.query.ObjectType, {
            authorizeToken: this.$route.query.authorizeToken,
            authorizeUrl: this.$route.query.baseURL,
          })
        } else {
          this.$message({
            message: res.data.Description+'，页面4秒后自动关闭',
            type: 'warning',
            duration:4000
          });
          let _window = window;
          window.setTimeout(function(){
            _window.close();
          },4000)

        }
      })
    }
  }

}

</script>
<style>
.accredit-main {
  font-size: 18px;
  color: #e71515;
}

</style>
