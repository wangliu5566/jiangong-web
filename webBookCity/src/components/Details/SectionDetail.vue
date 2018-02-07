<template>
  <div class="detail-wrap" v-loading="detailLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" customClass="detail-loading">
    <div class="book-container" v-if="detailsData.Id&&detailsData.IsOnShelf==true">
      <!-- 导航路径 -->
      <HeaderNav :detailsData = "detailsData"></HeaderNav>
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
          </div>
          <RecommendedExp :objectType="102"></RecommendedExp>
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
               <!-- <span class="name" v-show="detailsData.ExtendData.SaleStrategyExpireIn&&detailsData.ExtendData.SaleStrategyExpireIn>0">
              剩余时间：
              </span>
              <span class="expiration-time" v-show="detailsData.ExtendData.SaleStrategyExpireIn&&detailsData.ExtendData.SaleStrategyExpireIn>0">
                {{secondToHMS(detailsData.ExtendData.SaleStrategyExpireIn?detailsData.ExtendData.SaleStrategyExpireIn:0)}}
              </span> -->
            </p>
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
      <HeaderNav :detailsData = "detailsData"></HeaderNav>
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
      detailType: {
        name: '章节',
        type: '102'
      },
    }

  },

  computed:{ 
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
    showSpecial(value){
      if(value && this.detailsData.ExtendData.SaleStrategyDescription && this.detailsData.ExtendData.SaleStrategyDescription!=''){
        this.isShowSpecial = true;
      }else{
        this.isShowSpecial = false;
      }
    },
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
