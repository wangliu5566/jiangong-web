import Require from "./require.js"

export default [{
    path: '',
    redirect: '/wrap/index',
  }, {
    path: 'index',
    name: '首页',
    component: Require.index,
  }, {
    path: 'newRes',
    name: '最新资源',
    component: Require.newRes,
    redirect: '/wrap/newRes/resBook',
    children: [{
      path: 'resBook',
      name: '新书速递',
      component: Require.resBook,
    }, {
      path: 'resVideo',
      name: '视频教程',
      component: Require.resVideo,
    }, {
      path: 'resPicture',
      name: '最新图片',
      component: Require.resPicture,
    }]
  }, {
    path: 'book',
    name: '图书榜单',
    component: Require.book,
    redirect: '/wrap/book/sellBook',
    children: [{
      path: 'sellBook',
      name: '畅销榜单',
      component: Require.sellBook,
    }, {
      path: 'newBook',
      name: '新书榜单',
      component: Require.newBook,
    }]
  }, {
    path: 'knowledgeMap',
    name: '知识图谱',
    component: Require.knowledgeMap,
  },
  {
    path: 'product',
    name: '产品应用',
    component: Require.product,
  }, {
    path: 'course',
    name: '考试课程',
    component: Require.course,
  }, {
    path: 'building',
    name: '建筑图库',
    component: Require.building,
  }, {
    path: 'standard',
    name: '标准规范',
    component: Require.standard,
  }, {
    path: 'toolBook',
    name: '工具书',
    component: Require.toolBook,
  }, {
    path: 'noticeList',
    name: '公告列表',
    component: Require.noticeList,
  }, {
    path: 'noticeContent',
    name: '公告内容',
    component: Require.noticeContent,

  }, {
    path: 'resuKnowledgeSearch',
    name: '知识标签搜索结果页',
    component: Require.resuKnowledgeSearch,
  }, {
    path: 'resCategoryList',
    name: '资源分类页',
    component: Require.resCategoryList,
  }, {
    path: 'resuResSearch',
    name: '资源搜索结果页',
    component: Require.resuResSearch,
  }, {
    path: 'searchBook',
    name: '高级搜索-图书',
    component: Require.searchBook,
  }, {
    path: 'searchKnowledgeTag',
    name: '高级搜索-知识标签',
    component: Require.searchKnowledgeTag,
  }, {
    path: 'searchImg',
    name: '高级搜索-图片',
    component: Require.searchImg,
  }, {
    path: 'searchCourse',
    name: '高级搜索-课程',
    component: Require.searchCourse,
  }, {
    path: 'searchVideo',
    name: '高级搜索-视频',
    component: Require.searchVideo,
  }, {
    path: 'searchChapter',
    name: '高级搜索-章节',
    component: Require.searchChapter,
  },

]
