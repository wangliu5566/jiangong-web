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
        <div class="book-intro" style="margin-left: 375px;">
          <div>
            <h2 class="title ellipsis" id="detailsTitle">
          {{detailsData.Title}}
        </h2>
            <!-- <span class="sub-title">
          --2017年版全国一级建造师执业资格考试用书
        </span> -->
          </div>
          <div class="book-intro-main">
            <div class="book-intro-header">
              <p>
                <ellipsis :data="detailsData.Author?'作者：'+detailsData.Author:detailsData.ExtendData.ZhuZhe?'作者：'+detailsData.ExtendData.ZhuZhe:'作者：-'" :line-clamp='1'>
                </ellipsis>
              </p>
              <p>出版社：{{detailsData.Publisher?detailsData.Publisher:'-'}}</p>
              <span class="pack-updown" @click="showOrHide">
            <span v-show="isShowIntroOther" class="open-detail">收起 <b></b></span>
              <span v-show="!isShowIntroOther" class="close-detail">展开 <b></b></span>
              </span>
            </div>
            <div class="book-intro-pack" v-show="isShowIntroOther">
              <p>
                <span>出版时间：{{detailsData.PublishDate?formatDate(detailsData.PublishDate):'-'}}</span>
                <span>上架时间：{{detailsData.OnShelfDate?formatDate(detailsData.OnShelfDate):'-'}}</span>
                <span>征订号：{{detailsData.ExtendData.SubscriptionNumber?detailsData.ExtendData.SubscriptionNumber:'-'}}</span>
              </p>
              <p>
                <span>版次：{{detailsData.ExtendData.Edition?detailsData.ExtendData.Edition:'-'}}</span>
                <span>页数：{{detailsData.ExtendData.PagesNumber?detailsData.ExtendData.PagesNumber:'-'}}</span>
                <span>装帧：{{detailsData.ExtendData.Binding?detailsData.ExtendData.Binding:'-'}}</span>
                <span>开本：{{detailsData.ExtendData.BookSize?detailsData.ExtendData.BookSize:'-'}}</span>
                <span>印张：{{detailsData.ExtendData.PrintSheet?detailsData.ExtendData.PrintSheet:'-'}}</span>
              </p>
              <p>
                <span>ISBN：{{detailsData.ExtendData.Isbn?detailsData.ExtendData.Isbn:'-'}}</span>
              </p>
            </div>
          </div>
          <RecommendedExp :objectType="104"></RecommendedExp>
          <div class="price-handle">
            <p style="display:table-cell;">
              <span class="name">
            促销价格：
            </span>
              <span class="price-main">
              <span>&yen;{{formatPrice(nowTypeAndPrice.bookCurrentPrice,2)}}</span>
              <b class="original-price">&yen;{{formatPrice(nowTypeAndPrice.bookMarketPrice,2)}}</b>
              </span>
              <ul class="special">
                <el-popover placement="top" v-for="(item,index) in SaleStrategy" title="" trigger="hover" :key="index" :open-delay="500" :content="item.Description">
                  <li slot="reference" class="special-list red">
                    {{item.Title}}
                  </li>
                </el-popover>
              </ul>
              <!--               <span class="name" v-show="detailsData.ExtendData.SaleStrategyExpireIn&&detailsData.ExtendData.SaleStrategyExpireIn>0">
              剩余时间：
              </span> -->
              <!--               <span class="expiration-time" v-show="detailsData.ExtendData.SaleStrategyExpireIn&&detailsData.ExtendData.SaleStrategyExpireIn>0">
                {{secondToHMS(detailsData.ExtendData.SaleStrategyExpireIn?detailsData.ExtendData.SaleStrategyExpireIn:0)}}
              </span> -->
            </p>
            <div class="ovh type-btns">
              <span class="name">选择类型：</span>
              <ul class="type-btns-list">
                <li v-for="(item,index) in typeAndPrice" @click="setBookType(item)" :class="item.bookType == nowTypeAndPrice.bookType?'selected':''">
                  {{item.label}}
                </li>
              </ul>
              <span class="hint" v-show="nowTypeAndPrice.bookType=='POD'">*POD为按需印刷纸质图书</span>
            </div>
          </div>
          <div class="handle-container">
            <div class="handle-container">
              <div v-show="nowTypeAndPrice.bookCurrentPrice!=0">
                <el-button type="button" class="handle-btn red-red" @click="buyResource">立即购买</el-button>
                <el-button type="button" class="handle-btn red-white" @click="pushInShoppingCar">加入购物车</el-button>
              </div>
              <!-- v-if="!detailsData.ExtendData.IsOrdered" :disabled="detailsData.ExtendData.IsJoinedCart" -->
              <!-- <el-button type="button" class="handle-btn gray-black">购买整本</el-button> -->
              <div class="pull-right">
                <router-link class="handle-btn no-margin gray-red" v-if="detailsData.ExtendData.IsOrdered" :to="{path:'/accredit',query:{baseURL:detailsData.AuthorizeUrl,Id:detailsData.Id,authorizeToken:detailsData.ExtendData.AuthorizeToken,appId:7,DefaultFileExtension:detailsData.DefaultFileExtension,ObjectType:detailsData.ObjectType,}}" target="_blank">立即阅读</router-link>
              </div>
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
          <IntroAndSection :detailsData='detailsData'></IntroAndSection>
          <CommentPart :objectType="104"></CommentPart>
          <RelatedResources></RelatedResources>
        </div>
      </div>
    </div>
    <div class="detail-unshelve" v-if="detailsData.Id&&detailsData.IsOnShelf==false">
      <HeaderNav :detailsData="detailsData"></HeaderNav>
      <DetailsUnShelve></DetailsUnShelve>
    </div>
  </div>
</template>
<script>
import HeaderNav from "details/common/HeaderNav"
import DetailsCover from 'details/common/DetailsCover'
import BookRecommended from 'details/common/BookRecommended'
import IntroAndSection from 'details/common/IntroAndSection'
import CommentPart from 'details/common/CommentPart'
import RelatedResources from 'details/common/RelatedResources'

import RecommendedExp from "details/common/RecommendedExp"

import DetailsUnShelve from "details/common/DetailsUnShelve"

import { mapGetters } from 'vuex'
export default {
  components: {
    HeaderNav,
    DetailsCover,
    BookRecommended,
    IntroAndSection,
    CommentPart,
    RelatedResources,
    RecommendedExp,
    DetailsUnShelve
  },
  data() {
    return {
      //详情是否折叠
      isShowIntroOther: false,
      detailType: {
        name: '图书',
        type: '104'
      },
    }
  },
  props: ['clientHeight'],


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
  created() {
    this.getDetails();

  },
  methods: {
    readResource(event) {
      console.log(event)
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
    setBookType(item) {
      this.$store.dispatch('setNowTypeAndPrice', item);
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
          isOneOff: true,
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
        this.$store.dispatch('getDeatilsByAjax', { id: this.$route.query.id });
      } else {
        this.$router.back();
      }

    }
  },
  watch: {
    '$route': function() {
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
    },
  }
}

</script>
