
export default {
  //电子书确认页面
  elePaid: resolve => require.ensure([], () => resolve(require('@/components/Business/ElePaidPage.vue')), 'shopping1'),
  
  //纸质书确认页面
  paperPaid: resolve => require.ensure([], () => resolve(require('@/components/Business/PaperPaid.vue')), 'shopping2'),
  
  //支付完成
  paymentAccomplish: resolve => require.ensure([], () => resolve(require('@/components/Business/PaymentAccomplish.vue')), 'shopping3'),
  //购物车
  shoppingCart: resolve => require.ensure([], () => resolve(require('@/components/Business/ShoppingCart.vue')), 'shopping4'),
  // 支付页面
  paid: resolve => require.ensure([], () => resolve(require('@/components/Business/PaidMoney.vue')), 'shopping5'),
   // 重复提交页面
  noContent: resolve => require.ensure([], () => resolve(require('@/components/Business/NoContent.vue')), 'shopping6'),

}