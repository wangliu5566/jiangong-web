<template>
  <div class="center-collect"> 
   <!-- logo搜索部分 -->
   <search :selectType='3'></search>
   <div class="collect-center">
        <div class='collect-notification'>
            <div class="content-title">
                <span class="red-border"></span>
                <span class="title">我的收藏</span>
                <span class="content-more">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <span class="ml20 hover" @click="clearCollect">取消收藏</span>
                </span>
            </div>
            <div  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(256, 256, 256, 0.8)" class="collect-con">
                <ul>
                       <el-checkbox-group v-model="checkedId" @change="handleCheckedBookChange">
                        <li  v-for="(item,index) in checkedBooks">
                            <div><el-checkbox :label="item.ObjectId"></el-checkbox></div>
                            <div></div>
                            
                            <div @click="judge(item.ObjectType,item.ObjectId,item.Content.IsOnShelf)"  style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;" class="imgdiv hover">
                            <div  :style="{backgroundImage:'url('+item.Content.CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}" class="imgdiv1 hover"></div>
                            </div>
                            
                            <p @click="judge(item.ObjectType,item.ObjectId,item.Content.IsOnShelf)"   class="omit hover">{{item.Content.Title}}</p>
                            <p style="color: #e71515;font-size: 14px;"><span style='display: inline-block; overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;width: 95px;'>&yen;{{formatPrice(item.Content.CurrentPrice,2)}}</span><span style="float: right;color: #999;font-size: 14px" v-if='!item.Content.IsOnShelf'>已下架</span></p>
                        </li>
                      </el-checkbox-group>
                </ul>
                <img src="../../assets/wuziyuan.png" v-if='checkedBooks.length<1' class="not-data" alt="">
                <div class="pagination mb20">
                    <el-pagination
                      style='float: right'
                       small
                        :current-page="cp"
                       @current-change="changecp"
                       layout="prev, pager, next"
                       :total="allcount" :page-size="20">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import search from "./module/Search.vue"
    export default {
        data() {
            return {
                checkedBooks: [],
                checkedId: [],
                bookOptions: [],
                isIndeterminate: false,
                loading: false,
                cp: 1,
                allcount: 0,
                checkAll: false,
            }
        },
        components: {
            search
        },
        methods: {
//            判断是否可点击
            judge(ObjectType,ObjectId,IsOnShelf){
                if(IsOnShelf){
                this.goDetail(this.getDetailPath(ObjectType),ObjectId)
                    }else{
                        this.$message.warning('该商品已下架')
                    }
            },
            changecp(val){
                this.cp=val;
                this.checkedId=[]
                this.bookOptions=[]
                this.isIndeterminate=false;
                this.checkAll=false;
                this.getlist()
            },
            clearCollect(){
                if(this.checkedId.length>0){
                    this.$confirm('此操作将取消收藏, 是否确定继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/Favorite/Delete', {
                           objectIds:this.checkedId.toString()
                        })
                            .then((res) => {
                                if (res.data.Code == 200) {
                                    this.checkedId=[]
                this.bookOptions=[]
                                    this.cp=1
                                      this.checkAll=false;
                                     this.isIndeterminate=false;
                                    this.getlist()
                                } else {
                                    this.$message.error(res.data.Description)
                                }
                            })
        }).catch(() => {        
        });
                    
                    
                    }else{
                        this.$message.warning('请选择商品')
                    }
            },
            getlist() {
                this.loading=true
                this.$http.get("/Favorite/List", {
                        params: {
                            ps: 20,
                            cp: this.cp
                        }
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            res.data.Data.ItemList.map((item) => {
                                this.bookOptions.push(item.ObjectId)
                            })
                            this.checkedBooks = res.data.Data.ItemList
                            this.allcount = res.data.Data.RecordCount ? res.data.Data.RecordCount : 1
                            this.loading=false
                        }
                    })
            },
            goPath(url) {
                this.$router.push(url)
            },
            handleCheckedBookChange(value) {
//                console.log(this.checkedId)
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.bookOptions.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.bookOptions.length;
            },
            handleCheckAllChange(val) {
                this.checkedId = val ? this.bookOptions : [];
                this.isIndeterminate = false;
            }
        },
        mounted() {
            this.getlist()
        },
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .center-collect {
        .collect-center {
            width: 1200px;
            margin: auto;
            min-height: 600px;
            .collect-notification {
                margin-left: 262px;
                font-size: 16px;
                .content-title {
                    border-bottom: 0px
                }
            }
            .not-data{
                margin:80px 0 60px 280px ;
            }
            .collect-notification>.collect-con {
                width: 938px;
                box-sizing: border-box;
                border: 1px solid #e6e6e6;
                border-radius: 5px;
                padding: 0px 30px;
                margin-bottom: 30px;
                .omit {
                    margin-top: 182px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 140px;
                    font-size: 16px;
                    padding: 8px 0;
                }
                &>ul {
                    overflow: hidden;
                    li:first-child,
                    li:nth-child(4n +1) {
                        margin-left: 0;
                    }
                    li {
                        .el-checkbox__label {
                            display: none;
                        }
                        float: left;
                        margin-top: 36px;
                        margin-left: 46px;
                        position: relative;
                        &>div {
                            /*width: 18px;
                            height: 18px;*/
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                        .imgdiv {
                            margin-left: 40px;
                            width: 140px;
                            height: 180px;
                            border: 1px solid #eee;
                        }
                        .imgdiv1 {
                            width: 140px;
                            height: 180px;
/*                            border: 1px solid #eee;*/
                        }
                        p {
                            margin-left: 40px;
                        }
                    }
                }
                .pagination {
                    margin: 45px 0;
                    overflow: hidden;
                }
                .el-pager li.active {
                    color: #fff;
                    cursor: default;
                    background-color: #e81615;
                    border-radius: 50%;

                }
            }
        }
    }

</style>
