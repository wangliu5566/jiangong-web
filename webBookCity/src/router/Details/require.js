
export default {
	Details: resolve => require.ensure([], () => resolve(require('details/Index.vue')), 'bgSystem01'),
  //book
  Book:resolve => require.ensure([], () => resolve(require('details/BookDetail.vue')), 'd001'),
 	//section
  Section:resolve => require.ensure([], () => resolve(require('details/SectionDetail.vue')), 'd002'),
  //picture
  Picture:resolve => require.ensure([], () => resolve(require('details/PictureDetail.vue')), 'd003'),
  //video
  Video:resolve => require.ensure([], () => resolve(require('details/VideoDetail.vue')), 'd004'),
  //exp
  Exp:resolve => require.ensure([], () => resolve(require('details/ExpDetail.vue')), 'd005'),
  //course
  Course:resolve => require.ensure([], () => resolve(require('details/CourseDetail.vue')), 'd005'),
}