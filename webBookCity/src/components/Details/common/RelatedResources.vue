<template>
  <div class="related-resources" v-show="relatedResource.length!=0">
    <div class="area-title">
      <b class="title">
        精选推荐
      </b>
    </div>
    <ul class="related-list">
      <li :class="objectType==true?'other':'book'" v-for="(item,index) in relatedResource" :key="index" @click="pushDeatilsPath(item.ObjectType,item.Id)">
        <div class="cover" :style="{backgroundImage:'url('+setCover()+')'}">
          <div class="cover" :style="{backgroundImage:'url('+item.CoverUrl+')'}">
          </div>
        </div>
        <p class="title">
          <ellipsis :data="item.Title" :line-height="'28px'"></ellipsis>
        </p>
        
        <span class="price">
          &yen;{{handleCurrentPrice(item.ObjectType,item)}}
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      relatedResource: [],
    }
  },
  created() {
    this.getRelatedResource();
  },
  watch: {
    '$route': 'getRelatedResource'
  },
  props:{
    objectType:{
      type:Boolean,
      default:false,
    }
  },
  methods: {
    setCover(){
      if (this.ObjectType) {
        return 'static/images/no_cover_m.jpg'
      }else{
        return 'static/images/no_cover_s.jpg'
      }
    },
    getRelatedResource() {
      this.$http.get('/Content/Recommend', {
          params:{
            objectId:this.$route.query.id,
            count:10
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.relatedResource = [...res.data.Data,]
          }
        })
    }
  }
}

</script>
