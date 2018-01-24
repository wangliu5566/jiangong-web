<template>
  <div class="intro-section">
    <ul class="nav-details">
      <li :class="defaultType==0?'selected':''" @click="typeChange(0)">目录</li>
      <li :class="defaultType==1?'selected':''" @click="typeChange(1)">测验</li>
      <li :class="defaultType==2?'selected':''" @click="typeChange(2)">考试</li>
      <li :class="defaultType==3?'selected':''" @click="typeChange(3)">能力评价</li>
    </ul>
    <div v-show="defaultType==0" class="section-container">
      <div class="no-data" v-if="showListDatas.length==0">
        暂无目录数据
      </div>
      <ul class="section-list">
        <li v-for="(item,index) in showListDatas" :key="index">
          <span>{{item.Title}}</span>
          <!-- <ul class="menu-list">
            <li>
              <b class="play-icon"></b>
              <span class="pull-left title">构建物理环境</span>
              <span class="pull-right course-time">时长：10分钟</span>
              <span class="pull-right course-level">难度：一般</span>
            </li>
            <li>
              <b class="play-icon"></b>
              <span class="pull-left title">构建物理环境</span>
              <span class="pull-right course-time">时长：10分钟</span>
              <span class="pull-right course-level">难度：一般</span>
            </li>
            <li>
              <b class="play-icon"></b>
              <span class="pull-left title">构建物理环境</span>
              <span class="pull-right course-time">时长：10分钟</span>
              <span class="pull-right course-level">难度：一般</span>
            </li>
          </ul> -->
        </li>
      </ul>
      <p class="more-btn" v-show="showMore" @click="showMoreList">
        查看目录详情
      </p>
    </div>
    <div v-show="defaultType==1" class="test-container">
      <div class="test-header">
        本课程共 {{listDatas.length}} 章测验，已做 <span class="green">0</span> 章，正确率 <span class="red">0%</span>
      </div>
      <ul class="test-list">
        <li v-for="(item,index) in showListDatas" :key="index">
          <span>{{item.Title}}</span>
          <span class="btn pull-right" @click="beginTest">
            开始测验
          </span>
        </li>
      </ul>
    </div>
    <div v-show="defaultType==2" class="test-container">
      <div class="exam-header">
        <p>本课程你共进行了 0 次考试，平均得分：<span class="green">10</span> ,最高得分：<span class="red">0</span></p>
        <span class="exam-btn">再次考试</span>
      </div>
      <ul class="test-list">
        <!-- <li>
          <b class="exam-count">第一次考试</b>
          <b class="exam-score">得分：<span class="green">0</span></b>
          <span class="btn pull-right">
            查看详情
          </span>
        </li>
        <li>
          <b class="exam-count">第一次考试</b>
          <b class="exam-score">得分：<span class="green">0</span></b>
          <span class="btn pull-right">
            查看详情
          </span>
        </li>
        <li>
          <b class="exam-count">第一次考试</b>
          <b class="exam-score">得分：<span class="green">0</span></b>
          <span class="btn pull-right">
            查看详情
          </span>
        </li>
        <li>
          <b class="exam-count">第一次考试</b>
          <b class="exam-score">得分：<span class="green">0</span></b>
          <span class="btn pull-right">
            查看详情
          </span>
        </li>
        <li>
          <b class="exam-count">第一次考试</b>
          <b class="exam-score">得分：<span class="green">0</span></b>
          <span class="btn pull-right">
            查看详情
          </span>
        </li>
        <li>
          <b class="exam-count">第一次考试</b>
          <b class="exam-score">得分：<span class="green">0</span></b>
          <span class="btn pull-right">
            查看详情
          </span>
        </li>
        <li>
          <b class="exam-count">第一次考试</b>
          <b class="exam-score">得分：<span class="green">0</span></b>
          <span class="btn pull-right">
            查看详情
          </span>
        </li>
        <li>
          <b class="exam-count">第一次考试</b>
          <b class="exam-score">得分：<span class="green">0</span></b>
          <span class="btn pull-right">
            查看详情
          </span>
        </li>
        <li>
          <b class="exam-count">第一次考试</b>
          <b class="exam-score">得分：<span class="green">0</span></b>
          <span class="btn pull-right">
            查看详情
          </span>
        </li>
        <li>
          <b class="exam-count">第一次考试</b>
          <b class="exam-score">得分：<span class="green">0</span></b>
          <span class="btn pull-right">
            查看详情
          </span>
        </li> -->
      </ul>
    </div>
    <div v-show="defaultType==3" class="evaluate-container">
      <div class="evaluate-header">
        系统根据您的考试情况，智能评价您的技能水平。
      </div>
      <div class="evaluate-title">
        技能能力评价图
      </div>
      <div class="evaluate-radar" style="width:892px;height:410px;" ref='evaluateRadar' id="evaluateRadarMain">
      </div>
      <div class="evaluate-title">
        与其他学习者比较
      </div>
      <div class="evaluate-bar" style="width:892px;height:446px;" ref="evaluateBar" id="evaluateBarMain">
      </div>
      <div class="evaluate-course">
        <p class="title">根据您的评分结果，您可能还需要学习一下课程</p>
        <ul class="course-list">
          <li v-for="(item,index) in relatedCourse" :key="index"  @click="pushDeatilsPath(item.ObjectType,item.Id)">
            <div class="cover" style="background-image:url('/static/images/no_cover_m.jpg')">
              <div class="cover" :style="{backgroundImage:'url('+item.CoverUrl+')'}">
                
              </div>
            </div>
            <p class="course-title ellipsis">
              {{item.Title}}
            </p>
            <p class="course-price">
              &yen;{{formatPrice(item.CurrentPrice,2)}}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 测验modal -->
    <el-dialog custom-class="detail-modal" :visible.sync="testModal" width="1000px" :before-close="handleCloseTest" :close-on-click-modal="false">
      <div slot="title" class="modal-header">
        <p class="title">第一章 混泥土初级 考试详情</p>
        <!-- <span class="count-down">倒计时：1:00:00</span> -->
        <span v-show="testStep==2" class="submit-btn pull-right">提交</span>
      </div>
      <div v-if="testStep==1">
        <div class="test-begin" v-loading="testLoading" element-loading-text="测试试卷生成中，请稍后...">
        </div>
      </div>
      <div v-if="testStep==2">
        <ExamTestModal :isCheckAnswer="true"></ExamTestModal>
      </div>
      <div v-if="testStep==3">
        <!-- 考试结果 -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/radar');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import ExamTestModal from "details/common/ExamTestModal"
export default {
  components: {
    ExamTestModal
  },
  data() {
    return {
      //考试/测验进度
      testStep: 1,
      examStep: 1,

      testLoading: true,

      //顶部导航栏
      defaultType: 0,

      //目录
      listDatas: [],
      showListDatas: [],
      showMore: false,

      //modal状态
      testModal: false,
      examModal: false,

      //雷达图配置
      radarOption: null,

      //柱状图配置
      barOption: null,

      relatedCourse:[]


    }
  },
  methods: {
    showMoreList() {
      this.showListDatas = this.listDatas;
    },
    typeChange(val) {
      if (val == this.defaultType) return;
      if (val == 3) {
        if (this.defaultType != 3) {

          this.redrawCharts();
          this.getRelatedCourse();
        }
      } else {
        if (this.defaultType == 3) {
          echarts.dispose(document.getElementById("evaluateRadarMain"));
          echarts.dispose(document.getElementById("evaluateBarMain"));
        }
      }
      this.defaultType = val;
    },

    getRelatedCourse() {
      this.$http.post('/Content/Search', {
          query: JSON.stringify({
            "objectTypes": [104, 107],
            "SearchOrderBy": {
              "ColumnName": "onShelfDate",
              "Descending": true
            },
          }),
          ps: 3,
          cp: 1
        })
        .then((res) => {
          if (res.data.Success) {
            this.relatedCourse = res.data.Data.ItemList;
          }
        })
    },
    //获取雷达图数据
    getRadarData() {
      let _this = this;
      window.setTimeout(() => {

        //设置雷达图配置
        _this.radarOption = {
          title: {
            text: ''
          },
          tooltip: {},
          legend: {},
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '基础概念/理论', max: 2.5 },
              { name: '设备和仪器', max: 2.5 },
              { name: '设计制图', max: 2.5 },
              { name: '建筑材料', max: 2.5 },
              { name: '工艺实操', max: 2.5 },
              { name: '协同共享', max: 2.5 },
              { name: '综合运用', max: 2.5 },
            ]
          },
          series: [{
            name: '技能能力评分',
            type: 'radar',
            lineStyle: {
              normal: {
                color: '#ffd100'
              }
            },
            itemStyle: {
              normal: {
                color: '#ffd100'
              }
            },
            data: [{ value: [1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0] }],

          }]
        };

      }, 100)
    },

    getBarData() {
      let _this = this;
      window.setTimeout(() => {

        //设置柱状图配置
        _this.barOption = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['我的水平', '平均水平'],
            y:'top'
          },
          grid: {
            left: '40',
            right: '6%',
            bottom: '6%',
            containLabel: true
          },
          yAxis: [{
            type: 'category',
            axisTick: { show: false },
            data: ['1212323 建筑工程法律体系考试', '1212323 建筑工程法律体系考试', '1212323 建筑工程法律体系考试', '1212323 建筑工程法律体系考试', '1212323 建筑工程法律体系考试'],
            axisLabel: {
              showMinLabel: true,
              interval: 0,
              formatter: function(value, index) {
                let str = '';
                let limit = 16;
                if (value.length > limit) {
                  str = value.slice(0, limit - 1) + '...'
                } else {
                  str = value;
                }
                return str;
              }
            }
          }],
          xAxis: [{
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: '我的水平',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#e71515',
              },
            },
            data: [20, 12, 31, 34, 31]
          }, {
            name: '平均水平',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#808080',
              },
            },
            data: [10, 20, 5, 9, 3]
          }]
        }

      }, 100)
    },

    /**
     * [handleCloseTest 关闭测验modal]
     * @Author   李志明
     * @DateTime 2017-12-15
     * @return   {[type]}   [description]
     */
    handleCloseTest() {
      this.testModal = false;
    },

    beginTest() {
      this.testModal = true;
      this.testLoading = true;

      window.setTimeout(() => {
        this.testStep = 2;
      }, 3000)
    },

    getMenuList() {
      this.$http.get('/TableOfContent/List', {
          params: {
            isRecursive: true,
            objectId: this.$route.query.id
          }
        })
        .then((res) => {
          if (res.data.Success) {
            this.listDatas = res.data.Data;

            //课程需要处理二级目录
            let limit = 7;
            if (this.listDatas.length >= limit) {
              this.showListDatas = this.listDatas.slice(0, limit-1);
              this.showMore = true;
            } else {
              this.showListDatas = this.listDatas;
              this.showMore = false;
            }
          }
        })
    },

    //切换标签时重绘
    redrawCharts() {
      document.getElementById("evaluateRadarMain").style.display = "block";

      document.getElementById("evaluateBarMain").style.display = "block";

      let myChartRadar = echarts.init(document.getElementById("evaluateRadarMain"));
      let myChartbar = echarts.init(document.getElementById("evaluateBarMain"));

      if (this.radarOption) {
        myChartRadar.setOption(this.radarOption);
      }
      if (this.barOption) {
        myChartbar.setOption(this.barOption);
      }
    }
  },

  created() {
    this.getMenuList();

    this.getBarData();
    this.getRadarData();

    this.getRelatedCourse();
  },
  watch: {
    'testModal': function(val, oldVal) {
      if (!val && oldVal) {
        this.testStep = 1;
      }
    },
    '$route': function() {
      this.defaultType = 0;
      this.getMenuList();

      this.getBarData();
      this.getRadarData();
    }

  }
}

</script>
i
<style lang="less">
/* .detail-modal {
  .test-begin {
    height: 540px;
    border-top: 1px solid #d7d6db;
  }
  .el-dialog__headerbtn {
    top: -30px;
    right: 20px;
    z-index: 100;
    font-size: 24px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .modal-header {
    height: 40px;
    padding: 10px 20px;
    margin-top: -15px;
    font-size: 20px;
    line-height: 40px;
    overflow: hidden;

    .title {
      display: inline-block;
      width: 440px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      float: left;
    }



    .count-down {
      display: inline-block;
      font-size: 16px;
      color: #e71518;
      float: left;
    }
    .submit-btn {
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
  }
} */

</style>
