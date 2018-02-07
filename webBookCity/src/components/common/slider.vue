<template>
  <div class="sliders">
    <!-- 轮播 -->
    <div class="slider-box" @mouseenter="stopPlay()" @mouseleave="autoPlay()">
      <img id="img" :src="url" style="width:100%;" @click="goOtherUrl">
      <!-- <div class="leftImg" @click="preImg()"><img src="../assets/left.png"  style="width:100%;"></div> -->
      <!-- <div class="rightImg" @click="nextImg()"><img src="../assets/right.png" style="width:100%;"></div> -->
      <ul id="sliderUl" class="sliderUl">
        <li v-for="(item,index) in imgs" @click='clickImgLi(index)' :class="{'activeImg':setIndex==index}"></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      setIndex: 0,
      imgs: [],
      url: "",
      timer11: "",
      otherUrl:'',

    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    goOtherUrl(){
      window.open(this.otherUrl)
    },
     getlist() {
      this.$http.get("/AdPosition/GetAppAdList", {
        params:{
            PlatFormType:4
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.imgs = res.data.Data.ItemList[0].Ads?res.data.Data.ItemList[0].Ads:[]
            if(this.imgs.length>1){
              this.autoPlay()
            }else if(this.imgs.length==1){
              this.url = this.imgs[0].CoverUrl;
              this.otherUrl = this.imgs[0].Url
            }else{

            }
          }
        })
    },
    autoPlay() {
     this.timer11 = setInterval(()=> {
        ++this.setIndex;
        if (this.setIndex > this.imgs.length-1) {
          this.setIndex = 0;
        }
        this.url = this.imgs[this.setIndex].CoverUrl;
        this.otherUrl = this.imgs[this.setIndex].Url;
      }, 4000)
    },
    stopPlay() {
      clearInterval(this.timer11)
    },
    nextImg() {
      if (this.setIndex == this.imgs.length-1) {
        this.setIndex = 0;
      }
      this.setIndex += 1;
      this.url = this.imgs[this.setIndex].CoverUrl;
      this.otherUrl = this.imgs[this.setIndex].Url;
    },
    preImg() {
      if (this.setIndex == 0) {
        this.setIndex = this.imgs.length;
      }
      this.url = this.imgs[this.setIndex].CoverUrl;
      this.otherUrl = this.imgs[this.setIndex].Url;
      this.setIndex -= 1;
    },
    clickImgLi(thisIndex) {
      this.setIndex = thisIndex;
      this.url = this.imgs[this.setIndex].CoverUrl;
      this.otherUrl = this.imgs[this.setIndex].Url;
    }

  },
  beforeDestroy(){
    clearInterval(this.timer11)
  },
}

</script>
<style lang='less'>
.sliders {
  .slider-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      cursor:pointer;
    }
  }

  .leftImg,
  .rightImg {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 120px;
  }

  .leftImg {
    left: 100px;
  }

  .rightImg {
    right: 100px;
  }

  .sliderUl {
    position: absolute;
    left: 48%;
    left: 47%;
    bottom: 18px;
    overflow: hidden;
    text-align: center;
  }

  .sliderUl li {
    width: 12px;
    height: 12px;
    float: left;
    margin-right: 30px;
    background-color: #fff;
    opacity: 0.2;
    border-radius: 10px;
    cursor:pointer;
  }
  .sliderUl li:last-child{
    margin-right: 0;
  }

  #sliderUl .activeImg {
    opacity: 1;
  }
}

</style>
