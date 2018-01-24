<template>
  <div class="intro-section">
    <ul class="nav-details">
      <li class="selected">简介</li>
    </ul>
    <div class="intro-container">
      <div class="no-data" v-if="!detailsData.Abstracts">
        暂无简介
      </div>
      <p>{{detailsData.Abstracts}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    
    }
  },
  props:{
    detailsData: {
      type: Object,
      default: {
        CoverUrl:'',
      },
      required: true,
    }
  },
}

</script>
