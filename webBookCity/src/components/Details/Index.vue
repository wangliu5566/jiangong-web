<template>
  <div class="detail-container">
    <Search></Search>
    <router-view :clientHeight="clientHeight-142"></router-view>
    <!-- 收藏modal -->
    <el-dialog custom-class="collect-modal" :visible.sync="collectModalNative" @close="closeModal">
      <div class="collect-modal-container">
        <i class="collect-icon-success"></i>
        <!--  <i class="el-icon-success" style="font-size: 42px;color:#22b92c;"></i> -->
        <span>已成功加入收藏夹！</span>
      </div>
      <a href="#" class="check-collect" @click="$router.push('/wrap/collect')">查看我的收藏夹 ></a>
    </el-dialog>
  </div>
</template>
<script>
import Search from "@/components/common/SearchNoMenu"
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      headerHeight: '',
      collectModalNative: false,
    }
  },
  components: {
    Search
  },
  props: ['clientHeight'],
  computed:{
    ...mapGetters([
      'collectModal',
    ])
  },
  watch: {
    'collectModal': function(val, oldVal) {
      this.collectModalNative = val;
    },

  },
  methods:{
    closeModal() {
      this.$store.dispatch('closeCollectModal');
    },
  }
}

</script>
<style lang="less" src="assets/details.less">


</style>
