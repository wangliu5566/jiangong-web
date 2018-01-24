/*
  这里面定义所有action，也就是store的dispatch方法，用于处理接收组件传入的请求
  所有的流程控制、逻辑处理、异步操作都放在这里面进行
  通过commit提交给mutations，通过type作为两者相连的唯一通道
 */
import Vue from 'vue';

import * as types from './types.js';
import Router from '@/router/index'
import store from '@/store/index'
export default {

  //示例
  decrement: ({ commit, state }) => {
    if (state.mutations.count > 0) {
      commit(types.DECREMENT);
    }
  },

  /**
   * [getShoppingCount 设置购物车]
   * @Author   罗文
   * @DateTime 2018-01-09
   * @param    {[type]}   options.commit [触发mutation]
   * @return   {[type]}                  [description]
   */
  getShoppingCount: ({ commit }) => {
    //如果没有bg_user_info，则表明是退出时清空购物车数量
    if (!sessionStorage.bg_user_info) {
      commit(types.GETSHOPPINGCARCOUNT, 0);
    } else {
      Vue.prototype.$http.get("/ShoppingCart/GetCount", {
          params: {}
        })
        .then((res) => {
          if (res.data.Success) {
            commit(types.GETSHOPPINGCARCOUNT, res.data.Data);
          } else {
            // Vue.$message({
            //   message: res.data.Description,
            //   type: 'error'
            // });
          }
        })
    }
  },


  getDeatilsByAjax: ({ commit, state }, params) => {
    commit(types.SETDETAILLOADING, true)
    Vue.prototype.$http.get('/Content/Detail', {
        params: params
      })
      .then((res) => {

        if (res.data.Success) {
          commit(types.SETDETAILLOADING, false)

          let resData = res.data.Data;

          resData.ExtendData.countDown = 1254523;

          if (resData.ObjectType == 102) {
            resData = Object.assign({}, resData, {
              CoverUrl: '/static/images/section_zw_detail.jpg'
            })
          }
          //更新detailsData
          commit(types.UPDATEDETAILDATA, resData);


          if (resData.ExtendData.countDown && resData.ExtendData.countDown!=0) {
            let timer;
            timer = window.setInterval(function(){

              let nowSecond = parseInt(resData.ExtendData.countDown)-1;

              commit(types.TIMECOUNTDOWN,nowSecond);

              if (nowSecond<=0) {
                window.clearInterval(timer);
              }
            },1000)
          }


          if (resData.ObjectType == 104) {
            if (resData.ExtendData.HasElectronicalBook.toLowerCase() == 'true') {
              let params = {
                bookType: 'Elec',
                bookCurrentPrice: resData.CurrentPrice,
                bookMarketPrice: resData.MarketPrice,
              }
              commit(types.SETDETAILTYPEANDPRICE, params);
            } else if (resData.ExtendData.HasPaperBook.toLowerCase() == 'true') {
              let params = {
                bookType: 'Entity',
                bookCurrentPrice: resData.ExtendData.PaperBookPrice,
                bookMarketPrice: resData.ExtendData.PaperBookPrice,
              }
              commit(types.SETDETAILTYPEANDPRICE, params);
            } else if (resData.ExtendData.HasPod.toLowerCase() == 'true') {
              let params = {
                bookType: 'POD',
                bookCurrentPrice: resData.ExtendData.PodPrice,
                bookMarketPrice: resData.ExtendData.PodPrice,
              }
              commit(types.SETDETAILTYPEANDPRICE, params);
            }
          } else {
            let params = {
              bookType: 'Elec',
              bookCurrentPrice: resData.CurrentPrice,
              bookMarketPrice: resData.MarketPrice,
            }
            commit(types.SETDETAILTYPEANDPRICE, params);
          }
        }
      })
  },
  //获取资源详情
  getDeatilsByAjaxAndCallback: ({ commit, state }, params) => {
    Vue.prototype.$http.get('/Content/Detail', {
        params: params.params
      })
      .then((res) => {
        if (res.data.Success) {
          let resData = res.data.Data;

          if (resData.ObjectType == 102) {
            resData = Object.assign({}, resData, {
              CoverUrl: '/static/images/section_zw@3x.png'
            })
          }

          resData.ExtendData.countDown = 1254523;

          if (resData.ExtendData.countDown && resData.ExtendData.countDown!=0) {
            let timer;
            timer = window.setInterval(function(){

              let nowSecond = parseInt(resData.ExtendData.countDown)-1;

              commit(types.TIMECOUNTDOWN,nowSecond);

              if (nowSecond<=0) {
                window.clearInterval(timer);
              }
            },1000)
          }

          //更新detailsData
          commit(types.UPDATEDETAILDATA, resData);

          if (params.callback && params.callback != '') {
            store.dispatch(params.callback, resData);
          }
        }
      })
  },

  collectDetail: ({ commit, state }, data) => {
    if (data.ExtendData.IsFavorited == "true") {
      commit('SETCOLLECTMODAL', true)
    } else {
      store.dispatch('setCollectDetail', data)
    }
  },

  buyResourceDetail: ({ commit, state }, data) => {
    if (data.ExtendData.IsOrdered == 'true' && state.mutations.typeAndPrice.bookType == 'Elec') {
      Vue.prototype.$confirm('您已购买过该资源，请勿重复购买', '', {
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
      let type = state.mutations.typeAndPrice.bookType;
      let sourceData = [Object.assign({}, state.mutations.detailsData, {
        MediaType: type,
        ObjectId: data.Id,
        Count: 1
      })]
      localStorage.shoppingObj = JSON.stringify(sourceData);

      let typeNumber = type == 'Elec' ? 1 : 2;
      if (type == 'Elec') {
        Router.push({ path: '/wrap/deatilElecPaid', query: { type: typeNumber } })
      } else {
        Router.push({ path: '/wrap/detailPaperPaid', query: { type: typeNumber } })
      }
    }
  },

  pushInShoppingCarDetail: ({ commit, state }, data) => {
    let type = state.mutations.typeAndPrice.bookType;
    Vue.prototype.$http.post('/ShoppingCart/Create', {
        mediaType: type,
        count: 1,
        objectId: state.mutations.detailsData.Id,
        objectType: state.mutations.detailsData.ObjectType,
      })
      .then((res) => {
        if (res.data.Success) {
          Vue.prototype.$message({
            message: '已成功加入购物车',
            type: 'success'
          });

          store.dispatch('getShoppingCount');

        } else {
          Vue.prototype.$confirm(res.data.Description, '', {
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


  setCollectDetail: ({ commit, state }, data) => {
    Vue.prototype.$http.post('/Favorite/CreateOrUpdate', {
        state: true,
        objectTypes: data.ObjectType,
        objectIds: data.Id
      })
      .then((response) => {
        if (response.data.Success) {

          commit('SETDETAILDATACOLLECT', {
            ExtendData: {
              IsFavorited: 'true'
            }
          });

          commit('SETCOLLECTMODAL', true)

        }
      })
  },

  resetDetailData: ({ commit, state }) => {
    commit('RESETDETAILDATA', {
      ExtendData: {
        IsOrdered: false,
        IsJoinedCart: false,
        HasElectronicalBook: false,
        HasPod: false,
        HasPaperBook: false
      },
      ObjectType: '',
    })
  },

  setDeatilDataCollect: ({ commit, state }, status) => {
    commit('SETDETAILDATACOLLECT', {
      ExtendData: {
        IsFavorited: status
      }
    });

    commit('SETCOLLECTMODAL', status == "true" ? true : false)
  },

  closeCollectModal: ({ commit, state }) => {
    commit('SETCOLLECTMODAL', false)
  },

  updateTypeAndPrice: ({ commit, state }, data) => {
    commit('SETDETAILTYPEANDPRICE', data);
  },

  setUserInfo: ({ commit, state }) => {
    let userInfo = {
      isLogin: false,
      NickName: '',
    };
    if (sessionStorage.getItem('accessToken') && sessionStorage.getItem('bg_user_info')) {
      userInfo = Object.assign({}, userInfo, {
        isLogin: sessionStorage.getItem('accessToken') && JSON.parse(sessionStorage.getItem('bg_user_info')).Id ? true : false,
        NickName: JSON.parse(sessionStorage.getItem('bg_user_info')).NickName ? JSON.parse(sessionStorage.getItem('bg_user_info')).NickName : ''
      })
    }
    commit('SETUSERINFO', userInfo)
  },

  //弹出登录框，并且回调
  loginByModalAndCallback: ({ commit, state }, data) => {
    commit('OPENANDCLOSELOGINMODAL', true);
    commit('SETCALLBACKAFTERLOGIN', data);
  },

  //判断登录时跳页面（false），还是弹登录框（true）
  setLoginByModal: ({ commit, state }, status) => {
    commit('LOGINISBYMODAL', status);
  },

  resetCallback: ({ commit, state }) => {
    commit('SETCALLBACKAFTERLOGIN', {});
  },

  closeLoginModal: ({ commit, state }) => {
    commit('OPENANDCLOSELOGINMODAL', false)
  },


  //活动倒计时
  timeCountDown:({commit,val})=>{
    commit('TIMECOUNTDOWN',val);
  }

}
