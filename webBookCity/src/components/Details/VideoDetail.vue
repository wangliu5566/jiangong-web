<template>
  <div class="detail-wrap" v-loading="detailLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" customClass="detail-loading">
    <div class="book-container" v-if="detailsData.Id&&detailsData.IsOnShelf==true">
      <!-- 导航路径 -->
      <HeaderNav :detailsData="detailsData"></HeaderNav>
      <!-- 图书详情介绍 -->
      <div class="detail-intro">
        <div class="book-cover">
          <DetailsCover></DetailsCover>
        </div>
        <div class="book-intro" v-show="detailsData.Id" style="margin-left: 470px;">
          <div>
            <h2 class="title ellipsis" id="detailsTitle">
          {{detailsData.Title}}
        </h2>
          </div>
          <div class="book-intro-main">
            <div class="book-intro-header">
              <!-- <p class="intro-header"> -->
                <ellipsis :data="detailsData.Abstracts?detailsData.Abstracts:''" :line-clamp="2" :line-height="'22px'">
                </ellipsis>
              <!-- </p> -->
              <p>
                <span>讲师：{{detailsData.Author?detailsData.Author:detailsData.ExtendData.ZhuZhe?detailsData.ExtendData.ZhuZhe:detailsData.ExtendData.Lecturer?detailsData.ExtendData.Lecturer:'-'}}</span>
                <span>时长：{{detailsData.ExtendData.VideoDuration?detailsData.ExtendData.VideoDuration:'-'}}</span>
              </p>
            </div>
          </div>
          <RecommendedExp :objectType="109"></RecommendedExp>
          <div class="price-handle">
            <p style="display:table-cell;">
              <span class="name">
            促销价格：
            </span>
              <span class="price-main">
              <span>&yen;{{formatPrice(nowTypeAndPrice.bookCurrentPrice,2)}}</span>
              <b class="original-price">&yen;{{formatPrice(nowTypeAndPrice.bookMarketPrice,2)}}</b>
              </span>
              </span>
              <ul class="special">
                <el-popover placement="top" v-for="(item,index) in SaleStrategy" title="" trigger="hover" :key="index" :open-delay="500" :content="item.Description">
                  <li slot="reference" class="special-list red">
                    {{item.Title}}
                  </li>
                </el-popover>
              </ul>
              <!-- <span class="name" v-show="detailsData.ExtendData.SaleStrategyExpireIn&&detailsData.ExtendData.SaleStrategyExpireIn>0">
              剩余时间：
              </span>
              <span class="expiration-time" v-show="detailsData.ExtendData.SaleStrategyExpireIn&&detailsData.ExtendData.SaleStrategyExpireIn>0">
                {{secondToHMS(detailsData.ExtendData.SaleStrategyExpireIn?detailsData.ExtendData.SaleStrategyExpireIn:0)}}
              </span> -->
            </p>
            <!-- <div class="ovh type-btns">
              <span class="name">选择类型：</span>
              <ul class="type-btns-list">
                <li class="selected">原图</li>
                <li>非原图</li>
              </ul>
            </div> -->
          </div>
          <div class="handle-container">
            <div v-show="nowTypeAndPrice.bookCurrentPrice!=0">
              <el-button type="button" class="handle-btn red-red" @click="buyResource">立即购买</el-button>
              <el-button type="button" class="handle-btn red-white" @click="pushInShoppingCar">加入购物车</el-button>
            </div>
            
            <!-- <el-button type="button" class="handle-btn gray-black">购买整本</el-button> -->
            <div class="pull-right">
              <router-link class="handle-btn no-margin gray-red" v-if="detailsData.ExtendData.IsOrdered" :to="{path:'/accredit',query:{baseURL:detailsData.AuthorizeUrl,Id:detailsData.Id,authorizeToken:detailsData.ExtendData.AuthorizeToken,appId:7,DefaultFileExtension:detailsData.DefaultFileExtension,ObjectType:detailsData.ObjectType,}}" target="_blank">立即观看</router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- 图书其它 -->
    </div>
    <div class="detail-footer" v-if='detailsData.Id&&detailsData.IsOnShelf==true'>
      <div class="detail-footer-container">
        <div class="footer-left">
          <BookRecommended :detailType="detailType"></BookRecommended>
        </div>
        <div class="footer-right">
          <IntroOnly :detailsData="detailsData"></IntroOnly>
          <CommentPart :objectType="109"></CommentPart>
          <RelatedResources :objectType="true"></RelatedResources>
        </div>
      </div>
    </div>
    <div class="detail-unshelve" v-if="detailsData.Id&&detailsData.IsOnShelf==false">
      <HeaderNav :detailsData="detailsData"></HeaderNav>
      <DetailsUnShelve :objectType="true"></DetailsUnShelve>
    </div>
  </div>
</template>
<script>
import HeaderNav from "details/common/HeaderNav"
import DetailsCover from 'details/common/DetailsCover'
import BookRecommended from 'details/common/BookRecommended'
import IntroOnly from 'details/common/IntroOnly'
import CommentPart from 'details/common/CommentPart'
import RelatedResources from 'details/common/RelatedResources'

import RecommendedExp from 'details/common/RecommendedExp'
import DetailsUnShelve from "details/common/DetailsUnShelve"

import { mapGetters } from "vuex"
export default {
  components: {
    HeaderNav,
    DetailsCover,
    BookRecommended,
    IntroOnly,
    CommentPart,
    RelatedResources,
    RecommendedExp,
    DetailsUnShelve
  },
  data() {
    return {
      detailType: {
        name: '视频',
        type: '109',
        flag: 1
      },
    }
  },
  created() {
    this.getDetails();

  },
  computed: {
    ...mapGetters([
      'detailsData',
      'typeAndPrice',
      'loginModal',
      'callbackAfterLogin',
      'detailLoading',
      'hasLogin',
      'nowTypeAndPrice'
    ]),
    'SaleStrategy': function() {
      return !!this.detailsData.ExtendData.SaleStrategy ? JSON.parse(this.detailsData.ExtendData.SaleStrategy) : []
    }
  },
  watch: {
    '$route': function(){
      this.getDetails();
    },
    'loginModal': function(val, oldVal) {
      if (!val && this.callbackAfterLogin.position == 'detail') {
        this.$store.dispatch('getDeatilsByAjaxAndCallback', {
          params: {
            id: this.$route.query.id
          },
          callback: this.callbackAfterLogin.callback,
        })
      }
    }
  },
  methods: {
    readResource() {
      this.$http({
        url: '',
        baseURL: this.detailsData.AuthorizeUrl,
        method: 'post',
        data: {
          Id: this.detailsData.Id,
          authorizeToken: this.detailsData.ExtendData.AuthorizeToken,
          appId: 7
        }
      }).then((res) => {
        if (res.data.Success) {
          this.readMyResource(this.detailsData.DefaultFileExtension, this.detailsData.Id, this.detailsData.ObjectType, {
            authorizeToken: this.detailsData.ExtendData.AuthorizeToken,
            authorizeUrl: this.detailsData.AuthorizeUrl,
          })
        } else {
          this.$message({
            message: res.data.Description,
            type: 'warning'
          })
        }
      })


    },

    buyResource() {
      if (!this.hasLogin) {
        this.$store.dispatch('setLoginByModal', true);
        this.$store.dispatch('loginByModalAndCallback', {
          callback: 'buyResourceDetail',
          position: 'detail'
        })
      } else {
        this.buyResourceByAjax();

      }
    },
    // 创建订单
    buyResourceByAjax() {
      let type = this.nowTypeAndPrice.bookType;
      this.$http.post('/ShoppingCart/Create', {
          mediaType: type,
          count: 1,
          objectId: this.$route.query.id,
          objectType: this.detailsData.ObjectType,
          isOneOff:true,
        })
        .then((res) => {
          if (res.data.Success) {
            if (type == 'Elec') {
              this.$router.push({ path: '/wrap/elePaid', query: { ObjectIds: res.data.Data } })
            } else {
              this.$router.push({ path: '/wrap/paperPaid', query: { ObjectIds: res.data.Data } })
            }
          } else {
            this.$confirm(res.data.Description, '', {
                showCancelButton: false,
                showConfirmButton: false,
                type: 'warning',
                customClass: 'detail-confirm',
                center: true
              })
              .then(() => {

              })
              .catch(() => {

              })
          }
        })
    },
    pushInShoppingCar() {
      if (!this.hasLogin) {
        this.$store.dispatch('setLoginByModal', true);
        this.$store.dispatch('loginByModalAndCallback', {
          callback: 'pushInShoppingCarDetail',
          position: 'detail'
        })
      } else {
        let type = this.nowTypeAndPrice.bookType;
        this.$http.post('/ShoppingCart/Create', {
            mediaType: type,
            count: 1,
            objectId: this.$route.query.id,
            objectType: this.detailsData.ObjectType
          })
          .then((res) => {
            if (res.data.Success) {
              this.$message({
                message: '已成功加入购物车',
                type: 'success'
              });

              this.$store.dispatch('getShoppingCount');

            } else {
              this.$confirm(res.data.Description, '', {
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: 'warning',
                  customClass: 'detail-confirm',
                  center: true
                })
                .then(() => {

                })
                .catch(() => {

                })
            }
          })
      }
    },
    showOrHide() {
      this.isShowIntroOther = !this.isShowIntroOther;
    },
    getDetails() {
      if (this.$route.query.id && this.$route.query.id != '' && this.$route.query.id != undefined) {
        this.$store.dispatch('resetDetailData');
        this.$store.dispatch('getDeatilsByAjax', { id: this.$route.query.id })
      } else {
        this.$router.back();
      }

    }
  }
}

</script>
