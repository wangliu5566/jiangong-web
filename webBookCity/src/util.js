export default {
  install(Vue, options) {

    // 不带参数的页面跳转
    Vue.prototype.goPath = function(path) {
      this.$router.push('/wrap/' + path)
    };
    // 类型判断
    Vue.prototype.returnType = function(type) {
      if (type == 'Elec') {
        return '电子书'
      } else if (type == 'Entity') {
        return '纸质书'
      } else if (type == 'POD' || type == 'Pod') {
        return 'POD'
      } else if (type == 'OriginalPic') {
        return "原图"
      } else if (type == 'MediumPic') {
        return "中图"
      } else {
        return '-';
      }
    };

    // 返回类型   -- 用于电子商务
    Vue.prototype.confirmType = function(ObjectType, MediaType) {
        if (ObjectType == 104) {
          if (MediaType == 'Elec') {
            return '电子书'
          } else if (MediaType == 'Entity') {
            return '纸质书'
          } else if (MediaType == 'POD' || MediaType == 'Pod') {
            return 'POD'
          }
        } else if (ObjectType == 108) {
          if (MediaType == 'OriginalPic') {
            return "原图"
          } else if (MediaType == 'MediumPic') {
            return "中图"
          } else {
            return '-';
          }
        } else if (ObjectType == 109) {
          return '视频';
        }
      },
      // 类型判断
      Vue.prototype.returnObjectType = function(type) {
        let name = ''
        this.allType.map((item) => {
          if (item.value == type) {
            name = item.label
          }
        })
        return name
      };

    // 判断资源类型价格
    Vue.prototype.returnTypePrice = function(MediaType, obj) {
      if (MediaType == 'Elec') {
        return obj.CurrentPrice ? this.formatPrice(obj.CurrentPrice, 2) : '0.00'
      } else if (MediaType == 'Entity') {
        return obj.ExtendData && obj.ExtendData.PaperBookPrice ? this.formatPrice(obj.ExtendData.PaperBookPrice, 2) : '0.00'
      } else if (MediaType == 'POD' || obj.MediaType == 'Pod') {
        return obj.ExtendData && obj.ExtendData.PodPrice ? this.formatPrice(obj.ExtendData.PodPrice, 2) : '0.00'
      } else if (MediaType == 'OriginalPic') {
        return obj.ExtendData && obj.ExtendData.OriginalImagePrice ? this.formatPrice(obj.ExtendData.OriginalImagePrice, 2) : '0.00'
      } else if (MediaType == 'MediumPic') {
        return obj.ExtendData && obj.ExtendData.MediumImagePrice ? this.formatPrice(obj.ExtendData.MediumImagePrice, 2) : '0.00'
      } else {
        return obj.CurrentPrice ? this.formatPrice(obj.CurrentPrice, 2) : '0.00'
      }
    };

    // 处理列表市场价  --红色价格
    Vue.prototype.handleCurrentPrice = function(objectType, item) {
      if (objectType == 108) { //图片    处理列表的默认显示价格  
        // if (!!item.ExtendData.HasMediumPic && item.ExtendData.HasMediumPic != '' && item.ExtendData.HasMediumPic != 'False') {
        return this.formatPrice(item.ExtendData.MediumImagePrice ? item.ExtendData.MediumImagePrice : 0)
        // } else if (!!item.ExtendData.HasOriginalPic && item.ExtendData.HasOriginalPic != '' && item.ExtendData.HasOriginalPic != 'False') {
        //   return this.formatPrice(item.ExtendData.OriginalImagePrice ? item.ExtendData.OriginalImagePrice : 0)
        // } else {
        //   return "0.00"
        // }
      } else {
        return this.formatPrice(item.CurrentPrice ? item.CurrentPrice : 0)
      }
    }

    // 处理列表原价  --灰色价格
    Vue.prototype.handleMarketPrice = function(objectType, item) {
      if (objectType == 108) { //图片    处理列表的默认显示价格  
        // if (!!item.ExtendData.HasMediumPic && ExtendData.HasMediumPic != '' && ExtendData.HasMediumPic != 'False') {
        //   return this.formatPrice(item.ExtendData.MediumImagePrice ? item.ExtendData.MediumImagePrice : 0)
        // } else if (!!ExtendData.HasOriginalPic && ExtendData.HasOriginalPic != '' && ExtendData.HasOriginalPic != 'False') {
        return this.formatPrice(item.ExtendData.OriginalImagePrice ? item.ExtendData.OriginalImagePrice : 0)
        // } else {
        //   return "0.00"
        // }
      } else {
        return this.formatPrice(item.MarketPrice ? item.MarketPrice : 0)
      }
    }
    //挑转到详情页
    Vue.prototype.goDetail = function(type, id) {
      var path = location.href.split('/wrap')[0]
      if (type == 'book') {
        window.open(path + '/wrap/details/book?id=' + id)
        // this.$router.push({ path: '/wrap/details/book', query: { id: id } })
      } else if (type == 'course') {
        window.open("http://exam.cabplink.com/")
        // this.$router.push({ path: '/wrap/details/course', query: { id: id } })
      } else if (type == 'picture') {
        window.open(path + '/wrap/details/picture?id=' + id)
        // this.$router.push({ path: '/wrap/details/picture', query: { id: id } })
      } else if (type == 'section') {
        window.open(path + '/wrap/details/section?id=' + id)
        // this.$router.push({ path: '/wrap/details/section', query: { id: id } })
      } else if (type == 'video') {
        window.open(path + '/wrap/details/video?id=' + id)
        // this.$router.push({ path: '/wrap/details/video', query: { id: id } })
      } else if (type == 'exp') {
        window.open(path + '/wrap/details/exp?id=' + id)
        // this.$router.push({ path: '/wrap/details/exp', query: { id: id } })
      } else if (type == 'product') {
        window.open(path + '/wrap/product?id=' + id)
        // this.$router.push({ path: '/wrap/product', query: { id: id } })
      } else if (type == 'standard') {
        window.open("http://www.cabplink.com/theme/theme.action")
      } else {
        // alert(`不支持${type}`)
      }
    };

    /**
     * [goSearchList 跳转到分类页面]
     * @Author   赵雯欣
     * @DateTime 2018-01-23
     * @param    {[type]}   ParentId      [点击该级的父级id]
     * @param    {[type]}   categoryId    [点击该级的id]
     * @param    {[type]}   ParentTitle   [点击该级的父级Title]
     * @param    {[type]}   categoryTitle [点击该级的Title]
     * @return   {[type]}                 [description]
     */
    Vue.prototype.goSearchList = function(ParentId, categoryId, ParentTitle, categoryTitle) {
      if (ParentId != null) {
        this.$router.push({ path: '/wrap/resCategoryList', query: { ParentId: ParentId, categoryId: categoryId, ParentTitle: ParentTitle, categoryTitle: categoryTitle } })
      } else {
        this.$router.push('/wrap/resCategoryList')
      }
    };

    //跳转到资源搜索结果页
    Vue.prototype.resuResSearch = function(keyWordObj) {
      localStorage.keyWordObj = JSON.stringify(keyWordObj)
      this.$router.push('/wrap/resuResSearch')
    };

    //跳转到购物车
    Vue.prototype.goShoppingCar = function(path, hasLogin) {
      if (hasLogin) {
        this.$router.push('/wrap/' + path)
      } else {
        this.$message.warning('您还没登录，请先登录')
      }
    }


    //跳转到建工网页
    Vue.prototype.goOtherUrl = function(index) {
      if (index == 1) {
        window.open('http://www.cabp.com.cn/');
      } else if (index == 'course') {
        window.open('http://exam.cabplink.com/ ');
      } else if (index == 'standard') {
        window.open('http://www.cabplink.com/theme/theme.action');
      }
    }

    //type-资源类型
    //objectId-资源id
    //objectType-资源类型
    //resData-授权接口返回的数据
    Vue.prototype.readMyResource = function(type, objectId, objectType, resData) {

        let classlist = this.getReaderSupportExtension();

        for (let i = 0; i < classlist.length; i++) {
          if (classlist[i].ext == type) {
            if (classlist[i].reader == "图片") {

              let href = '/static/public/imgView.html?data=' + encodeURIComponent(JSON.stringify(Object.assign(resData, {
                objectId: objectId,
                objectType: objectType
              })));
              window.location.href = href;
              // newTab.location = window.location.host + href;
              // aPoint.setAttribute('href', href);
              // aPoint.setAttribute('target', '_blank');
              // aPoint.click();
            } else if (classlist[i].reader == "视频") {

              let href = '/static/public/multimediaView.html?data=' + encodeURIComponent(JSON.stringify(Object.assign(resData, {
                objectId: objectId,
                objectType: objectType
              })));
              window.location.href = href;
            } else if (classlist[i].reader == "PDF") {

              let href = '/static/public/pdf.html?data=' + encodeURIComponent(JSON.stringify(Object.assign(resData, {
                objectId: objectId,
                objectType: objectType
              })))
              window.location.href = href;
            } else if (classlist[i].reader == "图书") {

              let href = '/static/public/reader.html?data=' + encodeURIComponent(JSON.stringify(Object.assign(resData, {
                objectId: objectId,
                objectType: objectType
              })))
              window.location.href = href;
            }
          }
        }
      },

      //获取页面菜单 分类推荐：RecommendWeb,图书榜单：TopBook,考试课程：ExamCourse,建筑图库：BuildingImg,标准规范：StandardWeb，工具书：ToolBook
      Vue.prototype.getMenulist = function(type, callback) {
        if(type=='PictureCabpCourse'||type=='CabpCourse'){
          this.$http.get("/Hierarchy/GetCategoryList", {
            params: {
              id: '',
              name: type
            }
          })
          .then((res) => {
            if (res.data.Success) {
              callback(res.data.Data)
            }
          })
        }else{
          this.$http.get("/Category/ListByGroupName", {
            params: {
              groupName: type,
            }
          })
          .then((res) => {
            if (res.data.Success) {
              callback(res.data.Data)
            }
          })
        }
      };

      //是否是免费书籍
     Vue.prototype.showShoppingIcon = function(item) { 
      if(item.CurrentPrice&&item.CurrentPrice>0){
        return true;
      }else{
        return false;
      }
     }

    //新增购物车
    Vue.prototype.addShopping = function(item, hasLogin) { //列表页默认加入电子书, 中图
      if (this.$store.getters.hasLogin) {
        this.$http.post("/ShoppingCart/Create", {
            mediaType: item.ObjectType == 104 ? 'Elec' : item.ObjectType == 108 ? 'MediumPic' : '',
            count: 1,
            objectId: item.Id,
            objectType: item.ObjectType,
          })
          .then((res) => {
            if (res.data.Success) {
              this.$store.dispatch('getShoppingCount');
              this.$message.success('加入购物车成功')
            } else {
              this.$message.warning(res.data.Description)
            }
          })
      } else {
        this.$store.dispatch('setLoginByModal', true); //判断登录时跳页面（false），还是弹登录框（true）
        this.$store.dispatch('loginByModalAndCallback', { //弹出登录模态框
          callback: 'indexAddShopping',
          position: 'index',
          item: item
        })
      }
    };

    Vue.prototype.dateToSeconds = function(date) {
      let d = new Date(date);
      let formatDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
      let seconds = new Date(formatDate).getTime();
      return seconds;
    };
    Vue.prototype.secondsToDate = function(seconds) {
      let d = new Date(parseInt(seconds));
      return d;
    };
    Vue.prototype.secondsToNormalDate = function(seconds) {
      let d = new Date(seconds);
      let formatDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      return formatDate;
    };

    Vue.prototype.scrollTop = function(el, from = 0, to, duration = 500) {
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
              return window.setTimeout(callback, 1000 / 60);
            }
          );
        }
        const difference = Math.abs(from - to);
        const step = Math.ceil(difference / duration * 50);

        function scroll(start, end, step) {
          if (start === end) return;

          let d = (start + step > end) ? end : start + step;
          if (start > end) {
            d = (start - step < end) ? end : start - step;
          }
          if (el === window) {
            window.scrollTo(d, d);
          } else {
            el.scrollTop = d;
          }
          window.requestAnimationFrame(() => scroll(d, end, step));
        }
        scroll(from, to, step);
      },

      //快捷计算时间
      Vue.prototype.calculateDate = function(value) {
        let date = new Date();
        let nowDate = this.secondsToNormalDate(date.getTime())
        switch (parseInt(value)) {
          //昨天
          case 0:
            return [this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24), this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24)];
            break;
            //今天
          case 1:
            return [nowDate, nowDate];
            break;
            //最近7天
          case 7:
            return [this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 7), nowDate]
            break;
            //最近1月
          case 30:
            return [this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 30), nowDate]
          case 90:
            return [this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 90), nowDate]
            break;
            //最近7天
          case 180:
            return [this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 180), nowDate]
            break;
            //最近1月
          case 360:
            return [this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 360), nowDate]
          case -1:
            return ['', '']
          default:
            // statements_def
            break;
        }
      },
      //快捷计算时间-只返回指定的时间
      Vue.prototype.calculateOneDate = function(value) {
        let date = new Date();
        let nowDate = this.secondsToNormalDate(date.getTime())
        switch (parseInt(value)) {
          //昨天
          case 0:
            return nowDate;
            break;
            //昨天
          case 1:
            return this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24)
            break;
            //最近7天
          case 7:
            return this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 7)
            break;
            //最近1月
          case 30:
            return this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 30)
            break;
          case 90:
            return this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 90)
            break;
            //最近7天
          case 180:
            return this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 180)
            break;
            //最近1月
          case 360:
            return this.secondsToNormalDate(date.getTime() - 3600 * 1000 * 24 * 360)
          case -1:
            return ['', '']
          default:
            // statements_def
            break;
        }
      },
      // 收藏
      Vue.prototype.collectFn = function(item, index, callback) {
        if (this.$store.getters.hasLogin) {
          if (item.ExtendData.IsFavorited) {
            this.$message.warning('您已收藏该资源')
          } else {
            this.$http.post('/Favorite/CreateOrUpdate', {
                state: true,
                objectIds: item.Id,
                objectTypes: item.ObjectType
              })
              .then((res) => {
                if (res.data.Success) {
                  callback(index)
                  this.$message.success(res.data.Description)
                } else {
                  this.$message.error(res.data.Description)
                }
              })
          }
        } else {
          this.$store.dispatch('setLoginByModal', true); //判断登录时跳页面（false），还是弹登录框（true）
          this.$store.dispatch('loginByModalAndCallback', { //弹出登录模态框
            callback: 'indexCollect', //首页
            position: 'index',
            id: id,
            ObjectType: ObjectType,
            state: state,
          })
        }
      }

    //格式化价格
    Vue.prototype.formatPrice = function(s, n) {
        /*
         * 参数说明：
         * s：要格式化的数字
         * n：保留几位小数
         * */
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
          r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
      },

      //格式化日期
      Vue.prototype.formatDate = function(date) {
        if (date.indexOf(':') != -1 && date.indexOf(' ') != -1) {
          return date.split(' ')[0];
        }
      },

      // 资源跳转详情页时处理类型
      Vue.prototype.getDetailPath = function(type) {
        var path = ''
        this.allType.forEach((item) => {
          if (item.value == type) {
            path = item.detailPath
          }
        })
        return path;
      },

      //跳转详情
      Vue.prototype.pushDeatilsPath = function(type, id) {
        switch (parseInt(type)) {
          case 101:
            this.detailsPath('exp', id)
            break;
          case 102:
            this.detailsPath('section', id)
            break;
          case 104:
            this.detailsPath('book', id)
            break;
          case 107:
            this.detailsPath('course', id)
            break;
          case 108:
            this.detailsPath('picture', id)
            break;
          case 109:
            this.detailsPath('video', id)
            break;
          default:
            break;
        }
      },

      Vue.prototype.detailsPath = function(path, id) {
        this.$router.push({
          path: '/wrap/details/' + path,
          query: {
            id: id
          }
        })
      },


      // 所有类型
      Vue.prototype.allType = [{
          value: 0,
          label: '全部'
        },
        {
          value: 101,
          label: '知识元',
          detailPath: 'exp'
        }, {
          value: 102,
          label: '章节',
          detailPath: 'section'
        }, {
          value: 103,
          label: '电子标准',
          detailPath: "standard"
        },
        {
          value: 104,
          label: '图书',
          detailPath: 'book'
        },
        {
          value: 105,
          label: 'OA论文'
        },
        {
          value: 106,
          label: '电子电路包'
        },
        {
          value: 107,
          label: '课程',
          detailPath: 'course'
        },
        {
          value: 108,
          label: '图片',
          detailPath: 'picture'
        },
        {
          value: 109,
          label: '视频',
          detailPath: 'video'
        },
        {
          value: 110,
          label: '音频'
        },
        {
          value: 111,
          label: '动画'
        },
        {
          value: 112,
          label: '期刊'
        },
        {
          value: 113,
          label: '试题'
        },
        {
          value: 114,
          label: '试卷'
        },
        {
          value: 123,
          label: '自定义内容包'
        },
        {
          value: 124,
          label: '目录'
        },
        {
          value: 122,
          label: '题库'
        },
      ]



    /**
     * [getReaderSupportExtension 根据阅读器类型获取其支持的格式]
     * @Author   罗文
     * @DateTime 2017-12-12
     * @param    {[String]}   type [阅读器类型  '所有'  图书   pdf  视频  图片]
     * @return   {[Array]}        [该类型支持的格式]
     */
    Vue.prototype.getReaderSupportExtension = function() {

      let all = ['.mp4', '.bmp', '.jpg', '.png', '.jpeg', '.gif', '.epub', '.pdf'];

      let ext = [];

      let video = ['.mp4']; //视频
      let image = ['.bmp', '.jpg', '.png', '.jpeg', '.gif']; //图片
      let epub = ['.epub']; //图书
      let pdf = ['.pdf']; //pdf

      ext = all.map((item) => {
        if (video.indexOf(item) !== -1) {
          return {
            ext: item,
            reader: '视频',
          }
        } else if (image.indexOf(item) !== -1) {
          return {
            ext: item,
            reader: '图片',
          }
        } else if (epub.indexOf(item) !== -1) {
          return {
            ext: item,
            reader: '图书',
          }
        } else if (pdf.indexOf(item) !== -1) {
          return {
            ext: item,
            reader: 'PDF',
          }
        }
      })

      return ext;
    }





    //秒转换为活动倒计时HH/MM/dd
    Vue.prototype.secondToHMS = function(value) {
      var theTime = parseInt(value); // 秒
      var theTime1 = 0; // 分
      var theTime2 = 0; // 小时
      // alert(theTime);
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        // alert(theTime1+"-"+theTime);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
        }
      }

      return this.addEge(theTime2) + ':' + this.addEge(theTime1) + ':' + this.addEge(theTime);
    }

    Vue.prototype.addEge = function(a) {
      return a < 10 ? a = "0" + a : a = a
    }

    //记录知识元阅读次数
    Vue.prototype.recordHistory = function(id, type1, type2) {
      //type:1-浏览，2-搜索，3-阅读，4-分享，5-打印，6-点赞，7-下载，8-订阅，9-登录
      this.$http.post('/History/Record', {
          id: id,
          actionType: type2,
          objectType: type1,
        })
        .then((res) => {
          if (res.data.Success) {

          }
        })
    }


  }
}
