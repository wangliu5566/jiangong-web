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
    <el-dialog custom-class="detail-modal" :visible.sync="commentModal" width="600px" :close-on-click-modal="false">
      <div class="comment-modal">
        <span>发表评论</span>
        <el-form :model="addCommentDatas" ref="addCommentForm" label-width="0" :rules="addCommentRules" style="position:relative;">
          <el-form-item prop="contents">
            <el-input v-model="addCommentDatas.contents" type="textarea" :rows="7" class="comment-textarea" resize='none' :maxlength='commentMaxLength'>
            </el-input>
          </el-form-item>
          <span class='comment-limit'>您还可以输入{{commentMaxLength-addCommentDatas.contents.length}}/{{commentMaxLength}}字</span>
        </el-form>

        <div style="text-align: right;">
          <el-button class="handle-btn  no-margin" :loading="submitAddCommentLoading" @click="submitAddComment('addCommentForm')">发表</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      cp: 1,
      tp: 0,
      commentModal: false,

      //评论最大长度
      commentMaxLength:200,

      cpIsChange:false,

      submitAddCommentLoading:false,

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
  computed: mapGetters([
    'loginModal',
    'callbackAfterLogin',
    'hasLogin'
  ]),

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
      if (!this.hasLogin) {
        this.$store.dispatch('setLoginByModal', true);
        this.$store.dispatch('loginByModalAndCallback', {
          callback: 'openComment',
          position: 'detail'
        })
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
      this.submitAddCommentLoading = true;
      this.$http.post('/Comment/Create', Object.assign({}, this.addCommentDatas, {
          objectId: this.$route.query.id,
          objectType: this.objectType,
        }))
        .then((res) => {
          if (res.data.Success) {
            this.submitAddCommentLoading = false;
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
        this.submitAddCommentLoading = false;
      }
    },
    '$route':function(){
      this.cp= 1;
      this.cpIsChange=false;
      this.showMoreComment=false,
      this.getCommentListData();

    },
    'loginModal': function(val, oldVal) {
      if (!val && this.callbackAfterLogin.position == 'detail') {
        if (this.callbackAfterLogin.callback == 'openComment') {
          this.commentModal = true;
        }
      }
    }
  }
}

</script>
