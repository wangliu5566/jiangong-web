<template>
  <div class="comment-container">
    <div class="area-title">
      <b class="title">
        评论
      </b>
      <span class="btn pull-right comment-btn" @click="addComment">
        <span class="icon">
        </span>
      <span>我来说两句</span>
      </span>
    </div>
    <ul class="comment-list" v-show="showCommentList.length!=0">
      <li v-for="(item,index) in showCommentList" :key="index">
        <div class="user-cover" style="background-image:url('/static/images/user_cover_default.png')">
          <div class="user-cover" :style="{backgroundImage:'url('+item.User.UserFace+')'}">
        </div>
        </div>
        <div class="comment-info">
          <p class="user-name">
            {{item.User.NickName}}
          </p>
          <p>
            {{item.Contents}}
          </p>
        </div>
      </li>
    </ul>
    <div v-show="parseInt(tp)>10 && !showMoreComment" style="margin-top:20px;padding-bottom: 20px;text-align: right;">
      <el-pagination small background @current-change="currentChange" :current-page.sync="cp" :page-size="10" layout="prev, pager, next" :total="tp">
      </el-pagination>
    </div>
    <div class="comment-no" v-show="showCommentList.length==0">
      暂无评论
    </div>
    <p class="more-btn" v-show="showMoreComment" @click="moreComment">
      查看更多评论
    </p>
    <!-- 评论modal -->
    <el-dialog custom-class="detail-modal" :visible.sync="commentModal" width="800px" :close-on-click-modal="false">
      <div class="comment-modal">
        <span>发表评论</span>
        <el-form :model="addCommentDatas" ref="addCommentForm" label-width="0" :rules="addCommentRules">
          <el-form-item prop="contents">
            <el-input v-model="addCommentDatas.contents" type="textarea" :rows="20" class="comment-textarea" resize='none'>
            </el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: right;">
          <el-button class="handle-btn  no-margin" @click="submitAddComment('addCommentForm')">发表</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cp: 1,
      tp: 0,
      commentModal: false,

      cpIsChange:false,

      commentList: [],
      showCommentList: [],
      showMoreComment: false,

      addCommentDatas: {
        contents: '',
        objectId: '',
        objectType: '',
      },

      addCommentRules: {
        contents: [{
          required: true,
          message: '快来发表您的评论吧',
          trigger: 'blur'
        }]
      },

    }
  },
  props: {
    objectType: {
      required: true,
    }
  },
  created() {
    this.getCommentListData();
  },
  methods: {
    currentChange(value) {
      this.cp = value;
      this.cpIsChange = true;
      this.getCommentListData();
    },
    getCommentListData() {
      this.$http.get('/Comment/List', {
        params: {
          objectId: this.$route.query.id,
          ps: 10,
          cp: this.cp,
          fp:10,
        }
      }).then((res) => {
        if (res.data.Success) {
          this.commentList = res.data.Data.ItemList;
          this.tp = res.data.Data.RecordCount;

          if (this.cp == 1 && !this.cpIsChange) {
            let limit = 5;
            if (this.commentList.length >= limit) {
              this.showCommentList = this.commentList.slice(0, limit - 1);
              this.showMoreComment = true;
            } else {
              this.showCommentList = this.commentList;
            }
          } else {
            this.showCommentList = this.commentList;
          }
        }
      })
    },

    moreComment() {
      this.showCommentList = this.commentList;
      this.showMoreComment = false;
    },


    addComment() {
      let hasLogin = window.sessionStorage.getItem('accessToken') && JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id ? true : false;
      if (!hasLogin) {
        this.$emit('loginForm', true)
      } else {
        this.commentModal = true;
      }
    },

    submitAddComment(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addCommentByAjax();
        }
      })
    },

    addCommentByAjax() {
      this.$http.post('/Comment/Create', Object.assign({}, this.addCommentDatas, {
          objectId: this.$route.query.id,
          objectType: this.objectType,
        }))
        .then((res) => {

          if (res.data.Success) {
            this.$message({
              message: '评论发布成功',
              type: 'success'
            });
            this.commentModal = false;
            this.cp = 1;
            this.cpIsChange = true;
            this.getCommentListData();
          }
        })
    }
  },
  watch: {
    commentModal: function(val, oldVal) {
      if (!val && oldVal) {
        this.$refs.addCommentForm.resetFields();
      }
    },
    '$route':function(){
      this.cp= 1;
      this.cpIsChange=false;
      this.showMoreComment=false,
      this.getCommentListData();

    }
  }
}

</script>
