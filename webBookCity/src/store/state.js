//state是保存整个仓库的状态
export default {
  count: 10,
  shoppingCarCount: 0,

  //详情页面数据
  detailsData: {
    ExtendData: {
      IsOrdered: false,
      IsJoinedCart: false,
      HasElectronicalBook: false,
      HasPod: false,
      HasPaperBook: false,
      IsFavorited:false,
    },
    ObjectType:'',
    CoverUrl:'',
  },
	//详情资源类型
  typeAndPrice: {
    bookType: '',
    bookCurrentPrice: '',
    bookMarketPrice: '',
  },

  //收藏成功模态框
  collectModal:false,

  //详情页面收藏
  collectDetail:false,

  detailLoading:false,

  userInfo:{
  	isLogin:false,
  	NickName:'',
  },

  //登录弹窗
  loginModal:false,
  loginIsByModal:false,


  //登录后回调
  callbackAfterLogin:{},
}
