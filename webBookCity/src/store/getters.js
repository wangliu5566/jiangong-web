/*
  这里面定义所有页面需要的展示数据，具体的内容根据具体组件要求来定义
 */
export default {
   //返回购物车数量
   shoppingCount:(state)=>{
    return state.mutations.shoppingCarCount;
   },

   //返回详情数据
   detailsData:(state)=>{
   	return state.mutations.detailsData;
   },

   //返回类型和价格
   typeAndPrice:(state)=>{
   	return state.mutations.typeAndPrice;
   },

   //返回是否登录
   userInfo:(state)=>{
   	return state.mutations.userInfo;
   },

   collectModal:(state)=>{
   	return state.mutations.collectModal;
   },

   loginModal:(state)=>{
      return state.mutations.loginModal;
   },

   loginIsByModal:(state)=>{
      return state.mutations.loginIsByModal;
   },

   callbackAfterLogin:(state)=>{
      return state.mutations.callbackAfterLogin;
   },

   detailLoading:(state)=>{
      return state.mutations.detailLoading;
   }

}