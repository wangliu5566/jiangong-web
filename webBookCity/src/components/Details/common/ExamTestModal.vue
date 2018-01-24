<template>
  <div class="test-edit-area">
    <!-- 答题页面 -->
    <el-row>
      <el-col :span="8" class="test-list-area">
        <!-- 单选题 -->
        <div v-if="singleTest.length">
          <p class="small-title">选择题19/19</p>
          <div>
            <b @click="changeSingleTest(index)" v-for="(item,index) in singleTest" :key="item.id+index" :class="item.answer!=-1?'selected':''">{{ index+1 }}</b>
          </div>
        </div>
        <!-- 多选题 -->
        <!-- <div v-if="multipleTest.length">
        <p class="small-title">多选题</p>
        <div style="padding-left: 20px;">
          <b @click="changeMultipleTest(index)" v-for="(item,index) in multipleTest" :key="item.id+index" :class="item.answer.length?'selected':''">{{ index+1 }}</b>
        </div>
      </div> -->
        <!-- 判断题 -->
        <div v-if="judgeTest.length">
          <p class="small-title">判断题19/19</p>
          <div>
            <b @click="changeJudgeTest(index)" v-for="(item,index) in judgeTest" :key="item.id+index" :class="item.answer?'selected':''">{{ index+1 }}</b>
          </div>
        </div>
      </el-col>
      <!-- 右边展示试题 -->
      <el-col :span="16" class="test-main-area">
        <!--       <p class="test-main-type">[ 本题为<span v-if="currentTest.type==1">单选题</span><span v-if="currentTest.type==2">多选题</span><span v-if="currentTest.type==3">判断题</span> ]</p> -->
        <div class="exam-main">
          <p class="mb5">{{currentSingleIndex+1}}、{{currentTest.content}}</p class="mb5">
          <div v-if="currentTest.type==1">
            <el-radio-group v-model="currentTest.answer" :disabled="isCheckAnswer">
              <el-radio :label="index" v-for="(item,index) in currentTest.answerList" :key="item.id+index" :disabled="isCheckAnswer">
                <span>{{optionIndex[index]}}、{{item.content}}</span>
              </el-radio>
            </el-radio-group>
          </div>
          <div v-if="currentTest.type==2">
            <el-checkbox-group v-model="currentTest.answer">
              <el-checkbox :label="index" v-for="(item,index) in currentTest.answerList" :key="item.id+index" :disabled="isCheckAnswer">
                <span>{{optionIndex[index]}}、{{item.content}}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-if="currentTest.type==3">
            <el-radio-group v-model="currentTest.answer">
              <el-radio label="true" :disabled="isCheckAnswer">
                <span>正确</span>
              </el-radio>
              <el-radio label="false" :disabled="isCheckAnswer">
                <span>错误</span>
              </el-radio>
            </el-radio-group>
          </div>
          <div v-if="isCheckAnswer" class="show-test-answer">
            <p>答题结果：<span>A、B、C</span></p>
            <p>本题正确答案：<span>A、B</span></p>
            <p>本题解析：<span>暂无</span></p>
          </div>
        </div>
        <div>
          
          <span class="btn" :disabled="nextBtnDisabled" @click="nextTest">
            下一题
          </span>
          <span class="btn" :disabled="true" @click="prevTest">
            上一题
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      optionIndex: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

      //定义当前题目的编号、内容和总编号
      currentSingleIndex: 0,
      currentTest: {},
      currentIndex: 0,

      //上一道和下一道按钮提示和状态
      prevTooltipDisabled: false,
      nextTooltipDisabled: true,
      prevBtnDisabled: true,
      nextBtnDisabled: false,

      //多选题
      multipleTest: [


      ],

      //单选题
      singleTest: [{
        id: '1111',
        type: '2',
        answer: [0, 1, 2],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: true,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }]
      }, {
        id: '1111',
        type: '2',
        answer: [],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '5',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: true,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }]
      }, {
        id: '1111',
        type: '1',
        answer: [0],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }],
      }, {
        id: '1111',
        type: '1',
        answer: -1,
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '5',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: false,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }],
      }, {
        id: '1111',
        type: '2',
        answer: [0, 1, 2],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: true,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }]
      }, {
        id: '1111',
        type: '2',
        answer: [],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '5',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: true,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }]
      }, {
        id: '1111',
        type: '1',
        answer: [0],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: false,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }],
      }, {
        id: '1111',
        type: '1',
        answer: -1,
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '5',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: false,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }],
      }, {
        id: '1111',
        type: '2',
        answer: [0, 1, 2],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: true,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }]
      }, {
        id: '1111',
        type: '2',
        answer: [],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '5',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: true,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }]
      }, {
        id: '1111',
        type: '1',
        answer: [0],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: false,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }],
      }, {
        id: '1111',
        type: '1',
        answer: -1,
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '5',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: false,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }],
      }, {
        id: '1111',
        type: '2',
        answer: [0, 1, 2],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: true,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }]
      }, {
        id: '1111',
        type: '2',
        answer: [],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '5',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: true,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }]
      }, {
        id: '1111',
        type: '1',
        answer: [0],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: false,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }],
      }, {
        id: '1111',
        type: '1',
        answer: -1,
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '5',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: false,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }],
      }, {
        id: '1111',
        type: '2',
        answer: [0, 1, 2],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: true,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }]
      }, {
        id: '1111',
        type: '2',
        answer: [],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '5',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: true,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }]
      }, {
        id: '1111',
        type: '1',
        answer: [0],
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含默认情况下，一个工作薄中包含',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: false,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }],
      }, {
        id: '1111',
        type: '1',
        answer: -1,
        content: '默认情况下，一个工作薄中包含（）个工作表。',
        answerList: [{
          id: '11111',
          content: '5',
          isAnswer: true,
        }, {
          id: '11112',
          content: '2',
          isAnswer: false,
        }, {
          id: '11113',
          content: '5',
          isAnswer: false,
        }, {
          id: '11114',
          content: '5',
          isAnswer: false,
        }],
      }],

      //判断题
      judgeTest: [{
          id: '1111',
          type: '3',
          answer: '',
          content: '默认情况下，一个工作薄中包含（）个工作表。默认情况下，一个工作薄中包含（）个工作表。默认情况下，一个工作薄中包含（）个工作表。默认情况下，一个工作薄中包含（）个工作表。默认情况下，一个工作薄中包含（）个工作表。默认情况下，一个工作薄中包含（）个工作表。默认情况下，一个工作薄中包含（）个工作表。默认情况下，一个工作薄中包含（）个工作表。',
          answerList: [],
          isAnswer: false,
        }, {
          id: '1111',
          type: '3',
          answer: '',
          content: '默认情况下，一个工作薄中包含（）个工作表。',
          answerList: [],
          isAnswer: false,
        }

      ],

    }
  },
  props: {
    isCheckAnswer: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  watch: {
    currentIndex(newValue, oldValue) {
      if (newValue == 0) {
        this.prevTooltipDisabled = false;
        this.prevBtnDisabled = true;
        this.nextTooltipDisabled = true;
        this.nextBtnDisabled = false;
      } else if (newValue == this.singleTest.length + this.multipleTest.length + this.judgeTest.length - 1) {
        this.prevTooltipDisabled = true;
        this.prevBtnDisabled = false;
        this.nextTooltipDisabled = false;
        this.nextBtnDisabled = true;
      } else {
        this.prevTooltipDisabled = true;
        this.prevBtnDisabled = false;
        this.nextTooltipDisabled = true;
        this.nextBtnDisabled = false;
      }
    }
  },
  methods: {

    // 初始化当前题目为单选第一题
    setCurrentTest() {
      this.currentSingleIndex = 0;
      if (this.singleTest.length) {
        this.currentTest = this.singleTest[this.currentSingleIndex];
      } else if (this.multipleTest.length) {
        this.currentTest = this.multipleTest[this.currentSingleIndex];
      } else {
        this.currentTest = this.judgeTest[this.currentSingleIndex];
      }

    },


    //左侧切换单选
    changeSingleTest(index) {
      this.currentSingleIndex = index;
      this.currentIndex = this.currentSingleIndex;
      this.currentTest = this.singleTest[this.currentSingleIndex];
    },

    //左侧切换多选
    changeMultipleTest(index) {
      this.currentSingleIndex = index;
      this.currentIndex = this.currentSingleIndex + this.singleTest.length;
      this.currentTest = this.multipleTest[this.currentSingleIndex];
    },

    //左侧切换判断
    changeJudgeTest(index) {
      this.currentSingleIndex = index;
      this.currentIndex = this.currentSingleIndex + this.singleTest.length + this.multipleTest.length;
      this.currentTest = this.judgeTest[this.currentSingleIndex];
    },

    //上一题
    prevTest() {

      if (this.currentTest.type == 3 && this.currentSingleIndex != 0) {
        this.currentIndex -= 1;
        this.currentSingleIndex = this.currentIndex - this.singleTest.length - this.multipleTest.length;
        this.currentTest = this.judgeTest[this.currentSingleIndex];
      } else if (this.currentTest.type == 3 && this.currentSingleIndex == 0) {
        if (this.multipleTest.length) {
          this.currentIndex -= 1;
          this.currentSingleIndex = this.currentIndex - this.singleTest.length;
          this.currentTest = this.multipleTest[this.currentSingleIndex];
        } else {
          this.currentIndex -= 1;
          this.currentSingleIndex = this.currentIndex;
          this.currentTest = this.singleTest[this.currentSingleIndex];
        }
      } else if (this.currentTest.type == 2 && this.currentSingleIndex != 0) {
        this.currentIndex -= 1;
        this.currentSingleIndex = this.currentIndex - this.singleTest.length;
        this.currentTest = this.multipleTest[this.currentSingleIndex];
      } else if ((this.currentTest.type == 2 && this.currentSingleIndex == 0) || (this.currentTest.type == 1 && this.currentSingleIndex != 0)) {
        this.currentIndex -= 1;
        this.currentSingleIndex = this.currentIndex;
        this.currentTest = this.singleTest[this.currentSingleIndex];
      }
    },

    //下一题
    nextTest() {
      if (this.currentTest.type == 1 && this.currentSingleIndex != this.singleTest.length - 1) {
        this.currentIndex += 1;
        this.currentSingleIndex = this.currentIndex;
        this.currentTest = this.singleTest[this.currentSingleIndex];
      } else if (this.currentTest.type == 1 && this.currentSingleIndex == this.singleTest.length - 1) {
        if (this.multipleTest.length) {
          this.currentIndex += 1;
          this.currentSingleIndex = this.currentIndex - this.singleTest.length;
          this.currentTest = this.multipleTest[this.currentSingleIndex];
        } else {
          this.currentIndex += 1;
          this.currentSingleIndex = this.currentIndex - this.singleTest.length - this.multipleTest.length;
          this.currentTest = this.judgeTest[this.currentSingleIndex];
        }
      } else if (this.currentTest.type == 2 && this.currentSingleIndex != this.multipleTest.length - 1) {
        this.currentIndex += 1;
        this.currentSingleIndex = this.currentIndex - this.singleTest.length
        this.currentTest = this.multipleTest[this.currentSingleIndex];
      } else if ((this.currentTest.type == 2 && this.currentSingleIndex == this.multipleTest.length - 1) || (this.currentTest.type == 3 && this.currentSingleIndex != this.judgeTest.length - 1)) {
        this.currentIndex += 1;
        this.currentSingleIndex = this.currentIndex - this.singleTest.length - this.multipleTest.length;
        this.currentTest = this.judgeTest[this.currentSingleIndex];
      }
    },

  },
  mounted() {
    this.setCurrentTest();
  }

}

</script>
<style lang="less">

.test-edit-area {
  border-top: 1px solid #d7d6db;
  .small-title {
    background-size: 16px;
    font-weight: normal;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .exam-main {
    height: 470px;
    overflow-y: auto;
    padding-right: 20px;
  }
  .test-list-area {
    height: 540px;
    width: 296px;
    padding: 0 65px 0 20px;
    border-right: 1px solid #d7d6db;
    b {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      margin-bottom: 10px;
      border: 1px solid #d7d7df;
      line-height: 30px;
      text-align: center;
      font-size: 15px;
      cursor: pointer;
      font-weight: normal;
    }
    .selected {
      background: #d7d7df;
    }
  }
  .btn {
    float: right;
    display: inline-block;
    font-size: 16px;
    color: #343434;
    height: 40px;
    width: 128px;
    text-align: center;
    line-height: 40px;
    border-radius: 4px;
    border: 1px solid #a0a0a0;
    cursor: pointer;

    &:hover {
      background-color: #fdefef;
      border-color: #f29898;
      color: #e71515;
    }
  }
  .btn+.btn {
    margin-right: 20px;
  }
  .a-list li {
    min-height: 22px;
    margin-bottom: 10px;
  }
  .a-list label {
    padding-left: 36px;
    display: inline-block;
    min-height: 22px;
    font-size: 16px;
  }
  .a-list .no-check {
    background: url("/static/images/radio-on.png") no-repeat;
  }
  .a-list .checked {
    background: url("/static/images/radio-off.png") no-repeat;
  }
  .test-main-area {
    padding-left: 40px;
    padding-top: 20px;
    width: 694px;
    height: 540px;

    .test-main-type {
      font-size: 12px;
      span {
        color: red;
      }
    }
    .el-radio {
      display: block;
      margin-top: 28px;
    }

    .el-radio+.el-radio {
      margin-left: 0;
    }
    .el-checkbox {
      display: block;
      margin-top: 28px;
    }
    .el-checkbox+.el-checkbox {
      margin-left: 0;
    }
    .el-checkbox__label,
    .el-radio__label {
      display: inline-block;
      width: 600px;
      white-space: normal;
      line-height: 20px;
    }
    .el-checkbox__input {
      vertical-align: top;
      line-height: 2;
    }
    .el-radio__input {
      vertical-align: top;
      line-height: 1.8;
    }
    /* .ivu-radio-group-vertical .ivu-radio-wrapper {
      height: auto;
      min-height: 30px;
      overflow: hidden;
      >span {
        display: block!important;
        width: 95%;
        float: right;
      }
      .ivu-radio {
        display: inline-block!important;
        width: 3%;
        float: left;
        margin-top: 7px;
      }
    } */
    /* .ivu-checkbox-wrapper {
      display: block;
      height: auto;
      min-height: 30px;
      line-height: 30px;
    }
    .ivu-radio-wrapper {
      white-space: normal;
    }
    .ivu-checkbox {
      margin-right: 4px;
    }
    .ivu-checkbox-wrapper {
      overflow: hidden;
      >span {
        display: block;
        float: right;
        width: 95%;
      }
      .ivu-checkbox {
        display: inline-block;
        width: 3%;
        float: left;
        margin-top: 7px;
      }
    }
    .ivu-checkbox-disabled+span {
      color: #000;
    } */
    .show-test-answer {
      p {
        line-height: 24px;
        span {
          color: #5ec5ed;
        }
      }
    }
  }
}

</style>
