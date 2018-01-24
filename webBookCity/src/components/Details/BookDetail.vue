<template>
  <div class="detail-wrap" v-loading="detailLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    customClass="detail-loading">
    <div class="book-container" v-if="detailsData.Id&&detailsData.IsOnShelf==true">
      <!-- 导航路径 -->
      <HeaderNav></HeaderNav>
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
              <p class="ellipsis">作者：{{detailsData.Author?detailsData.Author:'-'}}</p>
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
            <p class="ovh">
              <span class="name">
            促销价格：
            </span>
              <span class="price-main">
              <span>&yen;{{formatPrice(typeAndPrice.bookCurrentPrice,2)}}</span>
              <b class="original-price">&yen;{{formatPrice(typeAndPrice.bookMarketPrice,2)}}</b>
              </span>
              <ul class="special">
                <li class="special-list red" v-show="detailsData.ExtendData.SaleStrategy">
                {{detailsData.ExtendData.SaleStrategy}}
                </li>
              </ul>
              <span class="name" v-show="detailsData.ExtendData.countDown&&detailsData.ExtendData.countDown>0">
              剩余时间：
              </span>
              <span class="expiration-time" v-show="detailsData.ExtendData.countDown&&detailsData.ExtendData.countDown>0">
                {{secondToHMS(detailsData.ExtendData.countDown?detailsData.ExtendData.countDown:0)}}
              </span>
            </p>
            <div class="ovh type-btns">
              <span class="name">选择类型：</span>
              <ul class="type-btns-list">
                <li @click="setBookType('Elec')" :class="typeAndPrice.bookType=='Elec'?'selected':''" v-if="detailsData.ExtendData.HasElectronicalBook">电子书</li>
                <li @click="setBookType('Entity')" :class="typeAndPrice.bookType=='Entity'?'selected':''" v-if="detailsData.ExtendData.HasPaperBook">纸质书</li>
                <li @click="setBookType('POD')" :class="typeAndPrice.bookType=='POD'?'selected':''" v-if="detailsData.ExtendData.HasPod">POD</li>
              </ul>
            </div>
          </div>
          <div class="handle-container">
            <div class="handle-container">
              <el-button type="button" class="handle-btn red-red" @click="buyResource">立即购买</el-button>
              <el-button type="button" class="handle-btn red-white" @click="pushInShoppingCar">加入购物车</el-button>
              <!-- v-if="!detailsData.ExtendData.IsOrdered" :disabled="detailsData.ExtendData.IsJoinedCart" -->
              <!-- <el-button type="button" class="handle-btn gray-black">购买整本</el-button> -->
              <div class="pull-right">
                <el-button type="button" class="handle-btn no-margin gray-red" v-if="detailsData.ExtendData.IsOrdered && detailsData.ExtendData.HasElectronicalBook" @click="readResource">立即阅读</el-button>
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
      <HeaderNav></HeaderNav>
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
  computed: mapGetters([
    'detailsData',
    'typeAndPrice',
    'loginModal',
    'callbackAfterLogin',
    'detailLoading'
  ]),
  created() {
    this.getDetails();
  },
  methods: {
    readResource() {
      this.$http({
        url: '',
        baseURL: this.detailsData.AuthorizeUrl,
        method: 'post',
        data: {
          extId: this.detailsData.ExternalId,
          authorizeToken: this.detailsData.ExtendData.AuthorizeToken,
          appId: 7
        }
      }).then((res) => {
        if (res.data.Success) {
          this.readMyResource(this.detailsData.DefaultFileExtension, this.detailsData.Id, this.detailsData.ObjectType, res.data.Data)
        } else {
          this.$message({
            message: res.data.Description,
            type: 'warning'
          })
        }
      })


    },
    setBookType(value) {
      let params;
      if (value == 'Elec') {
        params = {
          bookType: value,
          bookCurrentPrice: this.formatPrice(this.detailsData.CurrentPrice, 2),
          bookMarketPrice: this.formatPrice(this.detailsData.MarketPrice, 2),
        }

      } else if (value == 'Entity') {
        params = {
          bookType: value,
          bookCurrentPrice: this.formatPrice(this.detailsData.ExtendData.PaperBookPrice ? this.detailsData.ExtendData.PaperBookPrice : 0, 2),
          bookMarketPrice: this.formatPrice(this.detailsData.ExtendData.PaperBookPrice ? this.detailsData.ExtendData.PaperBookPrice : 0, 2),
        }
      } else if (value == 'POD') {
        params = {
          bookType: value,
          bookCurrentPrice: this.formatPrice(this.detailsData.ExtendData.PodPrice ? this.detailsData.ExtendData.PodPrice : 0, 2),
          bookMarketPrice: this.formatPrice(this.detailsData.ExtendData.PodPrice ? this.detailsData.ExtendData.PodPrice : 0, 2),
        }
      }

      this.$store.dispatch('updateTypeAndPrice', params);

    },
    buyResource() {
      let hasLogin = window.sessionStorage.getItem('accessToken') && JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id ? true : false;
      if (!hasLogin) {
        this.$store.dispatch('setLoginByModal', true);
        this.$store.dispatch('loginByModalAndCallback', {
          callback: 'buyResourceDetail',
          position: 'detail'
        })
      } else {
        if (this.detailsData.ExtendData.IsOrdered == 'true' && this.typeAndPrice.bookType == 'Elec') {
          this.$confirm('您已购买过该资源，请勿重复购买', '', {
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
        } else {
          this.buyResourceByAjax();
        }

      }
    },
    // 创建订单
    buyResourceByAjax() {
      let type = this.typeAndPrice.bookType;
      let sourceData = [Object.assign({}, this.detailsData, {
        MediaType: type,
        ObjectId: this.detailsData.Id,
        Count: 1
      })]

      localStorage.shoppingObj = JSON.stringify(sourceData);

      let typeNumber = type == 'Elec' ? 1 : 2;
      if (type == 'Elec') {
        this.$router.push({ path: '/wrap/deatilElecPaid', query: { type: typeNumber } })
      } else {
        this.$router.push({ path: '/wrap/detailPaperPaid', query: { type: typeNumber } })
      }

    },
    pushInShoppingCar() {
      let hasLogin = window.sessionStorage.getItem('accessToken') && JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id ? true : false;
      if (!hasLogin) {
        this.$store.dispatch('setLoginByModal', true);
        this.$store.dispatch('loginByModalAndCallback', {
          callback: 'pushInShoppingCarDetail',
          position: 'detail'
        })
      } else {
        let type = this.typeAndPrice.bookType;
        this.$http.post('/ShoppingCart/Create', {
            mediaType: type,
            count: 1,
            objectId: this.$route.query.id,
            objectType: '104'
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
    '$route': 'getDetails',
    'loginModal': function(val, oldVal) {
      if (!val && this.callbackAfterLogin.position == 'detail') {
        this.$store.dispatch('getDeatilsByAjaxAndCallback', {
          params: {
            id: this.$route.query.id
          },
          callback: this.callbackAfterLogin.callback,
        })
      }
    },  }
}

</script>
