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
      'callbackAfterLogin',
      'loginModal',
      'hasLogin'
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

  methods: {
    
    socialShare() {
      this.showShare = !this.showShare;
    },
    collectDetail() {
      if (!this.hasLogin) {
        this.$store.dispatch('setLoginByModal', true);
        this.$store.dispatch('loginByModalAndCallback', {
          callback: 'collectDetail',
          position: 'detail'
        })
      } else {
        if (this.detailsData.ExtendData.IsFavorited == "true") {
          this.$store.dispatch('openCollectModal');
        } else {
          let state = 'true';
          this.$http.post('/Favorite/CreateOrUpdate', {
              state: state,
              objectIds: this.detailsData.Id,
              objectTypes: this.detailsData.ObjectType
            })
            .then((res) => {
              if (res.data.Success) {
                this.$store.dispatch('setDeatilDataCollect', state)
              }
            })
        }



      }

    }
  },
}

</script>
