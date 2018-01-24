import Require from "./require.js"

export default [
{
  path: 'elePaid',
  name: '电子支付确认',
  component: Require.elePaid,
},
{
  path: 'deatilElecPaid',
  name: '详情-电子支付确认',
  component: Require.deatilElecPaid,
},
{
  path: 'paperPaid',
  name: '纸质支付确认',
  component: Require.paperPaid,
},
{
  path: 'detailPaperPaid',
  name: '详情-纸质支付确认',
  component: Require.detailPaperPaid,
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
},
]
