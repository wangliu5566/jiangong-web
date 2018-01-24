<template>
  <div class="related-resources" v-show="relatedResource.length!=0">
    <div class="area-title">
      <b class="title">
        精选推荐
      </b>
    </div>
    <ul class="related-list">
      <li :class="objectType==true?'other':'book'" v-for="(item,index) in relatedResource" :key="index" @click="pushDeatilsPath(item.ObjectType,item.Id)">
        <div class="cover" :style="{backgroundImage:'url('+setCover(index)+')'}">
          <div class="cover" :style="{backgroundImage:'url('+item.CoverUrl+')'}">
          </div>
        </div>
        <p class="title">
          {{item.Title}}
        </p>
        <span class="price">
          &yen;{{formatPrice(item.CurrentPrice,2)}}
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
    setCover(i){
      if (i<=1) {
        return 'static/images/no_cover_s.jpg'
      }else{
        return 'static/images/no_cover_m.jpg'
      }
    },
    getRelatedResource() {
      this.$http.post('/Content/Search', {
          query:JSON.stringify({
            "objectTypes": [104,107,108],
            "SearchOrderBy": {
              "ColumnName": "onShelfDate",
              "Descending": true
            },
          }),
          ps:5,
          cp:1
        })
        .then((res) => {
          if (res.data.Success) {
            this.relatedResource = res.data.Data.ItemList
            // if (res.data.Data.ItemList.length > 4) {

            //   this.relatedResource = res.data.Data.ItemList.slice(0, 4);
            // } else {
            //   this.relatedResource = res.data.Data.ItemList
            // }

          }
        })
    }
  }
}

</script>
