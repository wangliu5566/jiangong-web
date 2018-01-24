<template>
  <div class="detail-cover">
    <div class="cover-main" :class="detailCover">
      <div class="cover-image" style="background-image:url('/static/images/no_cover_g.jpg')">
        <div class="cover-image" :style="{backgroundImage:'url('+detailsData.CoverUrl+')'}">
        </div>
        <img :src="detailsData.CoverUrl" id="detailsCover" style="display:none">
        <div class="corner-mark" v-if="detailsData.ObjectType==102">
        </div>
      </div>
    </div>
    <div class="details-handle">
      <span @click.stop="socialShare" class="social-share">
        <i class="share"></i>
        分享
        <div class="social-share-content" v-show="showShare">
          <Share></Share>
        </div>
      </span>
      <span @click="collectDetail(detailsData.ExtendData.IsFavorited)" :class="detailsData.ExtendData.IsFavorited=='true'?'has-collect':''">
        <span class="i-collect"></span>收藏
      </span>
    </div>
    <p class="declare" v-show="detailsData.ObjectType==108" :class="detailCover" style='height:auto;'>
      【声明】:中国建筑出版在线网是正版商业图库，未经权利人许可，任何人不得随意使用本网站的原创作品（含预览图），否则将按照我国著作权法的相关规定被要求承担最高达50万元人民币的赔偿责任。
    </p>
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
import Share from "details/common/Share"
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      showShare: false,

      collectModalNative: false,
    }
  },

  computed: {
    ...mapGetters([
      'detailsData',
      'collectModal',
      'callbackAfterLogin',
      'loginModal'
    ]),
    detailCover() {
      switch (parseInt(this.detailsData.ObjectType)) {
        case 109:
          return 'cover-video';
          break;
        case 108:
          return 'cover-pic';
          break;
        case 104:
          return "cover-book";
          break;
        case 107:
          return 'cover-video';
          break;
        case 102:
          return 'cover-other';
          break;
        default:
          return '';
          break;
      }
    },
  },
  components: {
    Share
  },
  mounted() {
    let _this = this;
    document.onclick = function() {
      _this.showShare = false;
    };
  },
  watch: {
    'collectModal': function(val, oldVal) {
      this.collectModalNative = val;
    },

  },
  methods: {
    closeModal() {
      this.$store.dispatch('closeCollectModal');
    },
    socialShare() {
      this.showShare = !this.showShare;
    },
    collectDetail() {
      let hasLogin = window.sessionStorage.getItem('accessToken') && JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id ? true : false;

      if (!hasLogin) {
        this.$store.dispatch('setLoginByModal', true);
        this.$store.dispatch('loginByModalAndCallback', {
          callback: 'collectDetail',
          position: 'detail'
        })
      } else {

        let state = this.detailsData.ExtendData.IsFavorited == "true" ? 'false' : 'true';
        this.$http.post('/Favorite/CreateOrUpdate', {
            state: state,
            objectIds: this.detailsData.Id,
            objectTypes: this.detailsData.ObjectType
          })
          .then((res) => {
            if (res.data.Success) {
              if (state == "false") {
                this.$message({
                  message: res.data.Description,
                  type: 'success'
                });
              }
              this.$store.dispatch('setDeatilDataCollect', state)
            }

          })


      }

    }
  },
}

</script>
