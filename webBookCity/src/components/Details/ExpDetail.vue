<template>
  <div>
    <div class="exp-container">
      <!-- 导航路径 -->
      <HeaderNav></HeaderNav>
      <div class="exp-intro">
        <h2 class="exp-title text-center ellipsis">
          {{detailsData.Title}}
        </h2>
        <div class="area-title">
          <b class="title">详细信息</b>
          <span class="btn pull-right no-cursor">
            阅读量：{{detailsData.ViewCount?detailsData.ViewCount:'0'}}
          </span>
          <span class="btn pull-right" @click="collectDetail(detailsData.ExtendData.IsFavorited)" :class="detailsData.ExtendData.IsFavorited=='true'?'has-collect':''">
            <span class="icon">
              
            </span>
          <span>收藏</span>
          </span>
          <!--           <span v-show="expRecords.length>1" class="btn pull-right" @click="returnExpRecords">
            <span>返回</span>
          </span> -->
        </div>
        <div class="intro-main">
          <p>
            名称：{{detailsData.Title}}
          </p>
          <p>
            另名：{{detailsData.AliasWordList.length!=0?formatRelatedExp(detailsData.AliasWordList):'-'}}
          </p>
          <p class="link-list">
            <span class="name">相关知识标签：</span>
            <ul class="knowledge-link" v-show="detailsData.RelatedWordList.length!=0">
              <li @click="checkExpRelated(item.Id)" v-for="(item,index) in detailsData.RelatedWordList" :key="index">{{item.Title}}</li>
            </ul>
          </p>
          <p>
            描述：{{detailsData.Abstracts?detailsData.Abstracts:'-'}}
          </p>
          <p>
            参考资料：{{detailsData.Source?detailsData.Source:'-'}}
          </p>
          <p>
            编辑者：{{detailsData.Author?detailsData.Author:'-'}}
          </p>
        </div>
        <div class="area-title">
          <b class="title">知识地图</b>
          <span class="pull-right default-level">
            <el-select v-model="levelType" @change="levelChange"  placeholder="请选择" style="width:84px;">
              <el-option
                v-for="item in levelList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span class="btn pull-right go-back" @click="expRelatedBack" v-show="expRelatedBackIds.length!=0">
            <span>退回</span>
          </span>
        </div>
        <div class="exp-charts">
          <div style='height:360px;width:600px;' v-show="expRelatedList.length!=0" ref="expChartsHas">
          </div>
          <div class="exp-charts-no" v-show="expRelatedList.length==0">
            暂无数据
          </div>
        </div>
        <div class="area-title" v-show="relatedProduct.length!=0">
          <b class="title">相关产品</b>
        </div>
        <ul class="related-product">
          <li @click="pushDeatilsPath(item.ObjectType,item.Id)" v-for="(item,index) in relatedProduct" :key="index">
            <div class="product-cover" style="background-image:url('/static/images/no_cover_m.jpg')">
              <div class="product-cover" :style="{backgroundImage:'url('+item.CoverUrl+')'}">
              </div>
            </div>
            <div class="product-info">
              <h3 class="title ellipsis">
                {{item.Title}}
              </h3>
              <p>
                简介：{{item.Abstracts?item.Abstracts:'-'}}
              </p>
              <span>
                阅读量：{{item.ReadCount?item.ReadCount:'0'}}
              </span>
            </div>
          </li>
          <!-- <li>
            <div class="product-info no-cover">
              <h3 class="title">
                超高速拽引式电梯
              </h3>
              <p>
                简介：超高速曳引式电梯指额定速度大于6.0m/s的电梯。超高速曳引式电梯指额定速度大于6.0m/s的电梯。超高速曳引式电梯指额定速度大于6.0m/s的电梯。超高速曳引式电梯指额定速度大于6.0m/s的电梯。超高速曳引式电梯指额定速度大于6.0m/s的电梯。超高速曳引式电梯指额定速度大于6.0m/s的电梯。超高速曳引式电梯指额定速度大于6.0m/s的电梯。超高速曳引式电梯指额定速度大于6.0m/s的电梯。超高速曳引式电梯指额定速度大于6.0m/s的电梯。超高速曳引式电梯指额定速度大于6.0m/s的电梯。超高速曳引式电梯指额定速度大于6.0m/s的电梯。超高速曳引式电梯指额定速度大于6.0m/s的电梯。
              </p>
              <span>
                阅读量：132
              </span>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderNav from "details/common/HeaderNav"
import { mapGetters } from 'vuex'

let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/graph');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
  data() {
    return {
      nowExpId: this.$route.query.id,
      //默认显示层级
      levelType: 1,

      levelList: [{
        value: 1,
        label: '一级'
      }, {
        value: 2,
        label: '二级'
      }, {
        value: 3,
        label: '三级'
      }],

      detailsData: {
        ExtendData: {
          IsOrdered: false,
          IsJoinedCart: false,

        },
        AliasWordList: [],
        RelatedWordList: [],
      },
      //知识元详情相关知识标签
      expRecords: [],
      //知识元相关知识地图
      expRelatedList: [],

      //level1
      relationLevel1Data: [],
      firstNodesIds: [],

      //level2
      relationLevel2Data: [],
      secondNodesIds: [],

      //level3
      relationLevel3Data: [],

      //echart相关配置
      echartOption: null,
      echartDraggable: true,
      echartTitle: '',

      //存储知识地图被点击的id
      expRelatedBackIds: [],

      //相关产品推荐
      relatedProduct: [],
    }
  },
  components: {
    HeaderNav
  },
  computed: mapGetters([
    'loginModal',
    'callbackAfterLogin',
  ]),
  created() {
    this.getDetails();

    // this.expRecords.push(this.$route.query.id);
    this.getExpRelated();

    this.getRelatedProduct();
  },

  watch: {
    "$route": function() {
      this.getDetails();

      // this.expRecords.push(this.$route.query.id);

      this.getExpRelated();

      this.getRelatedProduct();
    },
    'loginModal': function(val, oldVal) {
      if (!val && this.callbackAfterLogin.position == 'detail') {
        if (this.callbackAfterLogin.callback == 'collectExp') {
          this.collectAndloginCallback();
        }
      }
    }
  },
  methods: {
    collectAndloginCallback() {
      this.$http.get('/ExplicitWord/Detail', {
        params: {
          id: this.nowExpId
        }
      }).then((res) => {
        this.detailsData = res.data.Data;

        if (this.detailsData.ExtendData.IsFavorited == "true") {
          this.$message({
            message:'收藏成功',
            type:'success',
          })
        }else{
          this.$http.post('/Favorite/CreateOrUpdate', {
            state: true,
            objectIds: this.detailsData.Id,
            objectTypes: 101
          })
          .then((res) => {
            this.$message({
              message: res.data.Description,
              type: 'success'
            });
            this.detailsData.ExtendData = Object.assign({}, this.detailsData.ExtendData, {
              IsFavorited: 'true',
            })
          })
        }

      })
    },
    getRelatedProduct() {
      this.$http.post('/Content/Search', {
          query: JSON.stringify({
            "objectTypes": [104, 107, 108],
            "SearchOrderBy": {
              "ColumnName": "onShelfDate",
              "Descending": true
            },
          }),
          ps: 5,
          cp: 1
        })
        .then((res) => {
          if (res.data.Success) {
            this.relatedProduct = res.data.Data.ItemList;
          }
        })
    },
    formatRelatedExp(expList) {
      let data = [];
      if (expList.length != 0) {
        expList.forEach((item, index) => {
          data.push(item.Title);
        })
      }
      return data.join(',');
    },
    collectDetail() {

      let hasLogin = window.sessionStorage.getItem('accessToken') && JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id ? true : false;
      if (!hasLogin) {
        this.$store.dispatch('setLoginByModal', true);
        this.$store.dispatch('loginByModalAndCallback', {
          callback: 'collectExp',
          position: 'detail'
        })
      } else {
        let state = this.detailsData.ExtendData.IsFavorited == "true" ? 'false' : 'true';
        this.$http.post('/Favorite/CreateOrUpdate', {
            state: state,
            objectIds: this.detailsData.Id,
            objectTypes: 101
          })
          .then((res) => {
            this.$message({
              message: res.data.Description,
              type: 'success'
            });
            this.detailsData.ExtendData = Object.assign({}, this.detailsData.ExtendData, {
              IsFavorited: state,
            })
          })
      }

    },
    checkExpRelated(id) {
      this.expRelatedBackIds.push(this.nowExpId)
      // this.expRecords.push(id);
      this.nowExpId = id;

      this.getDetails(id);
      this.getExpRelated();
      this.getRelatedProduct();
    },
    closeForm(status) {
      this.loginModal = !status;
    },
    getDetails(id) {
      this.$http.get('/ExplicitWord/Detail', {
        params: {
          id: id ? id : this.nowExpId
        }
      }).then((res) => {
        this.detailsData = Object.assign({}, this.detailsData, res.data.Data)
      })
    },
    returnExpRecords() {
      this.expRecords.pop();
      let nowIndex = this.expRecords.length;
      if (nowIndex != 0) {
        this.nowExpId = this.expRecords[nowIndex - 1];
        this.getDetails(this.nowExpId);
        this.getExpRelated();
        this.getRelatedProduct();
      }

    },

    getExpRelated() {
      // this.getListByLevel(1);
      this.getRelatedExpByLevel(this.levelType);
    },

    levelChange() {
      this.getRelatedExpByLevel(this.levelType);
    },

    //获取知识标签层数
    getListByLevel(level = 1) {
      this.$http.get("/ExplicitWordRelation/Map", {
          params: {
            id: this.nowExpId,
            type: 1,
            level: level,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            //保存每次请求的层级对应的数据
            switch (level) {
              case 1:
                this.relationLevel1Data = res.data.Data;
                this.firstNodesIds = this.relationLevel1Data.map((item) => {
                  return item.Id;
                })
                break;

              case 2:
                this.relationLevel2Data = res.data.Data;
                this.secondNodesIds = this.relationLevel2Data.map((item) => {
                  return item.Id;
                })

                break;

              case 3:
                this.relationLevel3Data = res.data.Data;
                break;

              default:
                // statements_def
                break;
            };

          }
        })
    },

    //获取知识地图
    getRelatedExpByLevel(level = 1, type = 1) {
      this.$http.get("/ExplicitWordRelation/Map", {
          params: {
            id: this.nowExpId,
            type: type, //1:知识地图，2知识束
            level: level,
          }
        })
        .then((res) => {
          if (res.data.Success) {
            //请求成功，根据type渲染知识地图或知识束
            if (res.data.Data.length === 0) return;

            if (type == 1) {
              this.expRelatedList = res.data.Data;
              this.renderMap(res.data.Data);
            }
            //暂不处理知识束
            // else if (type == 2) { 
            //   this.renderBeam(res.data.Data);
            //   this.beamDataList = res.data.Data;
            // }
          }
        })
    },

    //渲染知识地图
    renderMap(data) {
      let newData = []; //处理成新的数组，满足echarts
      let links = [];
      let hash = []; //存放所有的知识元名称，不能重复

      data.forEach((item, index) => {
        if (hash.indexOf(item.FirstWordTitle) == -1) {
          hash.push(item.FirstWordTitle);
          newData.push({
            nodeData: item, //节点数据
            nodeId: item.FirstWordId, //节点知识元Id
            name: item.FirstWordTitle,
          })
        }

        if (hash.indexOf(item.SecondWordTitle) == -1) {
          hash.push(item.SecondWordTitle);
          newData.push({
            nodeData: item,
            nodeId: item.SecondWordId,
            name: item.SecondWordTitle,
          })
        }

      })

      newData = newData.map((item) => {
        //处理根节点颜色改变
        if (item.nodeId == this.nowExpId) {
          item.itemStyle = {
            normal: { //默认样式
              label: {
                show: true
              },
              borderColor: '#f32d37',
              color: '#fe6d67',
            }
          }
        }

        if (item.nodeData.Level == 2) {
          item.itemStyle = {
            normal: { //默认样式
              label: {
                show: true
              },
              borderColor: '#629fb7',
              color: '#7ccae3',
            }
          }
        } else if (item.nodeData.Level == 3) {
          item.itemStyle = {
            normal: { //默认样式
              label: {
                show: true
              },
              borderColor: '#8799a2',
              color: '#b3c8ce',
            }
          }
        }


        // //处理二层节点
        // if (this.ralationLevel == 2) {
        //   //说明这是第二层的节点，重新变个色
        //   if (this.firstNodesIds.indexOf(item.nodeData.Id) == -1) {
        //     item.itemStyle = {
        //       normal: { //默认样式
        //         label: {
        //           show: true
        //         },
        //         borderColor: '#629fb7',
        //         color: '#7ccae3',
        //       }
        //     }
        //   }
        // }

        // //处理三层节点
        // if (this.ralationLevel == 3) {
        //   //说明这是第三层的节点，重新变个色
        //   if (this.firstNodesIds.indexOf(item.nodeData.Id) == -1) {
        //     item.itemStyle = {
        //       normal: { //默认样式
        //         label: {
        //           show: true
        //         },
        //         borderColor: '#629fb7',
        //         color: '#7ccae3',
        //       }
        //     }
        //   }

        //   if (this.secondNodesIds.indexOf(item.nodeData.Id) == -1) {
        //     item.itemStyle = {
        //       normal: { //默认样式
        //         label: {
        //           show: true
        //         },
        //         borderColor: '#8799a2',
        //         color: '#b3c8ce',
        //       }
        //     }

        //   }
        // }
        return item;
      })


      //处理关系数组
      links = data.map((item) => {
        return {
          source: item.SecondWordTitle,
          target: item.FirstWordTitle,
          value: item.Label,
        }
      })

      this.setOptions(newData, links, true);
      this.renderEcharts('expChartsHas');
    },

    //设置知识地图配置
    setOptions(data, links, draggable) {
      if (data.length > 100) data = data.slice(0, 100);
      let _this = this;
      this.echartOption = {
        title: {
          text: _this.echartTitle,
          x: 'center'
        },

        tooltip: {
          show: true, //默认显示
          showContent: true, //是否显示提示框浮层
          trigger: 'item', //触发类型，默认数据项触发
          triggerOn: 'mousemove', //提示触发条件，mousemove鼠标移至触发，还有click点击触发
          confine: false, //是否将 tooltip 框限制在图表的区域内。
          transitionDuration: 0.4, //提示框浮层的移动动画过渡时间，
        },

        series: [{
          type: 'graph', //关系图
          name: "知识元", //系列名称
          layout: 'force', //图的布局，类型为力导图，'circular' 采用环形布局，
          legendHoverLink: true, //是否启用图例 hover(悬停) 时的联动高亮。
          hoverAnimation: true, //是否开启鼠标悬停节点的显示动画
          force: { //力引导图基本配置
            repulsion: 200, //节点之间的斥力因子。
            gravity: 0, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢
            edgeLength: 110, //边的两个节点之间的距离，
            layoutAnimation: true
            //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死  
          },
          roam: 'move', //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          nodeScaleRatio: 0.8, //鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
          draggable: draggable, //节点是否可拖拽，只在使用力引导布局的时候有用。
          focusNodeAdjacency: false, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [0, 8], //边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
          symbolSize: 60,

          itemStyle: { //图形样式
            normal: { //默认样式
              label: {
                show: true
              },
              borderType: 'solid', //图形描边类型，默认为实线， 
              borderWidth: 2, //图形的描边线宽。为 0 时无描边。
              opacity: 1,
              color: '#1ab9f0',
              borderColor: '#1499c1',
            }
          },
          edgeLabel: {
            normal: {
              show: true,
              formatter: "{c}",
              align: 'center',
            }
          },
          lineStyle: { //==========关系边的公用线条样式。
            normal: {
              width: '1',
              type: 'solid', //线的类型 
              curveness: 0, //线条的曲线程度，从0到1
              opacity: 1
            }
          },
          label: { //=============图形上的文本标签
            normal: {
              show: true, //是否显示标签。
              position: 'inside', //标签的位置。['50%', '50%'] [x,y]
              textStyle: { //标签的字体样式
                color: '#444', //字体颜色
                fontStyle: 'normal', //文字字体的风格 
                fontWeight: 'normal',
                fontFamily: 'sans-serif', //文字的字体系列
                fontSize: 13, //字体大小
              },
              formatter: function(val) { //让series 中的文字进行换行 
                let limit = 4;
                if (val.name.length != 0 && val.name.length >= limit+1) {
                  if (val.name.length <= limit*2) {
                    return val.name.slice(0, limit) + '\n' + val.name.slice(limit, val.name.length);
                  } else {
                    return val.name.slice(0, limit) + '\n' + val.name.slice(limit, limit*2-1) + '...'
                  }
                } else {
                  return val.name;
                }
              },
            },

          },

          categories: [ //symbol name：用于和 legend 对应以及格式化 tooltip 的内容。 label有效
            {
              symbol: 'rect',
            }, {
              symbol: 'rect'
            }, {
              symbol: 'roundRect'
            }, {
              //     symbol : 'roundRect'
              // }, {
              symbol: 'roundRect'
            }
          ],
          //name:影响图形标签显示,value:影响选中后值得显示,category:所在类目的index,symbol:类目节点标记图形,
          data: [...data],
          links: [...links],
        }],

      }
    },

    //绘制echarts
    renderEcharts(echartNodes) {
      let myChart = echarts.init(this.$refs[echartNodes]);
      myChart.setOption(this.echartOption);
      let _this = this;
      myChart.on('click', function(params) {
        //这里面可以判断是不是点击的知识元
        //切换根节点

        if (params.data.nodeId != _this.nowExpId) {
          //先存储当前知识元id
          if (params.data.nodeData) {
            //此时是知识地图
            _this.expRelatedBackIds.push(_this.nowExpId);
          }

          _this.nowExpId = params.data.nodeId;

          // else {
          //    _this.beamRollbackData.push(_this.expId);
          // }


          //重绘地图
          _this.resetMap('expChartsHas');
          _this.getDetails(_this.nowExpId);
          _this.getRelatedProduct();
        }
      });

    },

    resetMap(chartName) {
      //销毁现有画布
      let myChart = echarts.getInstanceByDom(this.$refs[chartName]);
      myChart.dispose();

      //重新获取每层数据
      this.relationLevel1Data = [];
      this.relationLevel2Data = [];
      this.relationLevel3Data = [];



      //获取新的知识元地图
      this.getExpRelated();
      // this.getRelatedExpByLevel(1,1);

      //获取知识元详情
      // this.getDetail();
    },



    //知识地图回退
    expRelatedBack() {
      let nowIndex = this.expRelatedBackIds.length;

      if (nowIndex == 0) return;

      this.nowExpId = this.expRelatedBackIds.pop();

      console.log(this.expRelatedBackIds)

      this.resetMap('expChartsHas');
      this.getDetails(this.nowExpId);
      this.getRelatedProduct();
    }
  }

}

</script>
