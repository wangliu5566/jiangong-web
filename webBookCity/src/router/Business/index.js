import Require from "./require.js"

export default [
{
  path: 'elePaid',
  name: '电子支付确认',
  component: Require.elePaid,
},
{
  path: 'paperPaid',
  name: '纸质支付确认',
  component: Require.paperPaid,
},
{
  path: 'paymentAccomplish',
  name: '支付完成',
  component: Require.paymentAccomplish,
},
{
  path: 'shoppingCart',
  name: '购物车',
  component: Require.shoppingCart,
},
{
  path: 'paid',
  name: '支付页面',
  component: Require.paid,
},{
  path: 'noContent',
  name: '支付页面',
  component: Require.noContent,
},
]
