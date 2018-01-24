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
        <div class="book-intro" v-show="detailsData.Id" style="margin-left: 374px;">
          <div>
            <h2 class="title ellipsis" id="detailsTitle">
              {{detailsData.Title+'（章节）'}}
            </h2>
            <span class="sub-title" v-show="detailsData.ExtendData.Source">
            --出自《{{detailsData.ExtendData.Source}}》
            </span>
          </div>
          <div class="book-intro-main">
            <div class="book-intro-header">
              <p>摘要：{{detailsData.Abstracts?detailsData.Abstracts:'-'}}</p>
              <p>来源：{{detailsData.Author?detailsData.Author:'-'}}</p>
              <p>
                <span>作者：{{detailsData.Author?detailsData.Author:'-'}}</span>
                <span>出版社：{{detailsData.Publisher?detailsData.Publisher:'-'}}</span>
              </p>
            </div>
            <!--  <div class="book-intro-pack">
              <p>
                <span>出版时间：2017-05-21</span>
                <span>上架时间：199001</span>
                <span>征订：29807</span>
              </p>
              <p>
                <span>版次：第一版页数</span>
                <span>页数：346</span>
                <span>装帧：平膜</span>
                <span>开本：小16开</span>
                <span>印张：22.250</span>
              </p>
              <p>
                <span>ISBN：978-7-112-20453-3</span>
              </p>
            </div> -->
          </div>
          <RecommendedExp :objectType="102"></RecommendedExp>
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
                <li class="special-list red" v-show="detailsData.ExtendData.SaleStrategy">{{detailsData.ExtendData.SaleStrategy}}</li>
              </ul>
               <span class="name" v-show="detailsData.ExtendData.countDown&&detailsData.ExtendData.countDown>0">
              剩余时间：
              </span>
              <span class="expiration-time" v-show="detailsData.ExtendData.countDown&&detailsData.ExtendData.countDown>0">
                {{secondToHMS(detailsData.ExtendData.countDown?detailsData.ExtendData.countDown:0)}}
              </span>
            </p>
            <!-- <div class="ovh type-btns">
              <span class="name">选择类型：</span>
              <ul class="type-btns-list">
                <li class="selected">电子书</li>
                <li>纸质书</li>
                <li>POD</li>
              </ul>
            </div> -->
          </div>
          <div class="handle-container">
            <el-button @click="buyResource" type="button" class="handle-btn red-red">立即购买</el-button>
            <el-button @click="pushInShoppingCar" type="button" class="handle-btn red-white">加入购物车</el-button>
            <!-- <el-button type="button" class="handle-btn gray-black">购买整本</el-button> -->
            <div class="pull-right">
              <el-button type="button" class="handle-btn no-margin gray-red" v-if="detailsData.ExtendData.IsOrdered" @click="readResource">立即阅读</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 图书其它 -->
    </div>
    <div class="detail-footer" v-if="detailsData.Id&&detailsData.IsOnShelf==true">
      <div class="detail-footer-container">
        <div class="footer-left">
          <BookRecommended :detailType="detailType"></BookRecommended>
        </div>
        <div class="footer-right">
          <IntroAndSection :detailsData="detailsData"></IntroAndSection>
          <CommentPart :objectType="102"></CommentPart>
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
import RecommendedExp from 'details/common/RecommendedExp'
import DetailsUnShelve from "details/common/DetailsUnShelve"
import { mapGetters } from "vuex"
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
      detailType:{
        name:'章节',
        type:'102'
      }
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
    }
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
    buyResource() {
      let hasLogin = window.sessionStorage.getItem('accessToken') && JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id ? true : false;
      if (!hasLogin) {
        this.$store.dispatch('setLoginByModal', true);
        this.$store.dispatch('loginByModalAndCallback', {
          callback: 'buyResourceDetail',
          position: 'detail'
        })
      } else {
        if (this.detailsData.ExtendData.IsOrdered == 'true' && this.bookType == 'Elec') {
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
            objectType: '102'
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
    getDetails() {
      if (this.$route.query.id && this.$route.query.id != '' && this.$route.query.id != undefined) {
        this.$store.dispatch('resetDetailData');
        this.$store.dispatch('getDeatilsByAjax', { id: this.$route.query.id })
      } else {
        this.$router.back();
      }

    }
  },


}

</script>
