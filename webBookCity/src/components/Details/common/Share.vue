<template>
  <div class="social-share-container">
    <div class="jiathis_style_24x24">
      <a class="jiathis_button_qzone" @click='setConfig'></a>
      <a class="jiathis_button_tsina"></a>
      <a class="jiathis_button_weixin"></a>
      <!-- <a class="jiathis_counter_style"></a> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  data() {
    return {

    }
  },

  mounted() {
    this.initShare();
  },
  computed: mapGetters([
    'detailsData'
  ]),
  methods: {
    setConfig() {
      jiathis_config = {
        imageUrl: this.$route.fullpath,
        url: this.$route.fullpath,
        title: this.detailsData.Title,
        summary: '',
        pic: this.detailsData.CoverUrl,
        data_track_clickback: true,
        "shortUrl": 'false',
      }
    },
    initShare: function() {
      let url = 'http://v3.jiathis.com/code/jia.js'
      let script = document.createElement('script')
      script.setAttribute('charset', 'utf-8')
      script.setAttribute('src', url);
      document.getElementsByTagName('head')[0].appendChild(script)
    }
  },
  beforeDestroy() {
    jiathis_config = '';
    //移除jiathis
    //js、css、iframe、创建的div等
    let url = 'http://v3.jiathis.com/code/jia.js'
    let headEl = document.getElementsByTagName('head')[0];
    let jiathisEl = headEl.childNodes;
  }

}

</script>
