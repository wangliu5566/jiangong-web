import R from "./require.js"

 export default [{
    path: 'details',
  	component:R.Details,
  	children:[{
  		path:'',
  		name:'details',
  		redirect:'book'
  	},{
  		path:'book',
  		name:'book',
  		component:R.Book,
  	},{
      path:'section',
      name:'section',
      component:R.Section,
    },{
      path:'picture',
      name:'picture',
      component:R.Picture,
    },{
      path:'video',
      name:'video',
      component:R.Video,
    },{
      path:'exp',
      name:'exp',
      component:R.Exp,
    },{
      path:'course',
      name:'course',
      component:R.Course,
    }]
  }]
