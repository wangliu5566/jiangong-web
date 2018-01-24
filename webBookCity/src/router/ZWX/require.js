export default {
  //首页
  index: resolve => require.ensure([], () => resolve(require('@/components/index/Index.vue')), 'bg01'),

  //公告
  noticeList: resolve => require.ensure([], () => resolve(require('@/components/index/notice/Noticelist.vue')), 'bg012'),
  noticeContent: resolve => require.ensure([], () => resolve(require('@/components/index/notice/NoticeContent.vue')), 'bg012'),

  //最新资源
  newRes: resolve => require.ensure([], () => resolve(require('@/components/index/newRes/NewResource.vue')), 'bg013'),
  resBook: resolve => require.ensure([], () => resolve(require('@/components/index/newRes/ResBook.vue')), 'bg013'),
  resVideo: resolve => require.ensure([], () => resolve(require('@/components/index/newRes/ResVideo.vue')), 'bg013'),
  resPicture: resolve => require.ensure([], () => resolve(require('@/components/index/newRes/ResPicture.vue')), 'bg013'),

  //知识图谱
  knowledgeMap: resolve => require.ensure([], () => resolve(require('@/components/index/KnowledgeMap.vue')), 'bg014'),

  // 图书榜单页
  book: resolve => require.ensure([], () => resolve(require('@/components/index/book/Book.vue')), 'bg015'),
  newBook: resolve => require.ensure([], () => resolve(require('@/components/index/book/NewBook.vue')), 'bg015'),
  sellBook: resolve => require.ensure([], () => resolve(require('@/components/index/book/SellBook.vue')), 'bg015'),


  //产品推荐
  product: resolve => require.ensure([], () => resolve(require('@/components/index/ProductPage.vue')), 'bg017'),

  //考试课程
  course: resolve => require.ensure([], () => resolve(require('@/components/index/CoursePage.vue')), 'bg018'),

  //建筑图库
  building: resolve => require.ensure([], () => resolve(require('@/components/index/BuildingPage.vue')), 'bg019'),

  //标准规范
  standard: resolve => require.ensure([], () => resolve(require('@/components/index/Standard.vue')), 'bg020'),
  //工具书
  toolBook: resolve => require.ensure([], () => resolve(require('@/components/index/ToolBook.vue')), 'bg020'),
  
    //知识标签搜索结果页
  resuKnowledgeSearch: resolve => require.ensure([], () => resolve(require('@/components/index/resuKnowledgeSearch.vue')), 'bg021'),
    //资源分类列表
  resCategoryList: resolve => require.ensure([], () => resolve(require('@/components/index/resCategoryList.vue')), 'bg022'),
    //资源搜索结果
  resuResSearch: resolve => require.ensure([], () => resolve(require('@/components/index/resuResSearch.vue')), 'bg023'),


  //高级搜索-图书
  searchBook: resolve => require.ensure([], () => resolve(require('@/components/index/powerSearch/PowerSearchBook.vue')), 'bg011'),

  //高级搜索-知识标签
  searchKnowledgeTag: resolve => require.ensure([], () => resolve(require('@/components/index/powerSearch/PowerSearchKnowledgeTag.vue')), 'bg011'),

  //高级搜索-图片
  searchImg: resolve => require.ensure([], () => resolve(require('@/components/index/powerSearch/PowerSearchImg.vue')), 'bg011'),

  //高级搜索-视频
  searchVideo: resolve => require.ensure([], () => resolve(require('@/components/index/powerSearch/PowerSearchVideo.vue')), 'bg011'),

  //高级搜索-课程
  searchCourse: resolve => require.ensure([], () => resolve(require('@/components/index/powerSearch/PowerSearchCourse.vue')), 'bg011'),
  
  //高级搜索-章节
  searchChapter: resolve => require.ensure([], () => resolve(require('@/components/index/powerSearch/PowerSearchChapter.vue')), 'bg011'),

}
