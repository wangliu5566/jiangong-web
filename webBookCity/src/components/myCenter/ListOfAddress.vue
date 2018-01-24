<template>
  <div class="list-of-address"> 
   <!-- logo搜索部分 -->
   <search :selectType='0'></search>
   <div class="collect-center">
        <div class='address-notification'>
            <div class="content-title">
                <span class="red-border"></span>
                <span class="title">收货地址簿</span>
                <el-button @click='goPath("shippingAddress")' type="primary" class="ml20">+ 新增地址</el-button>
            </div>
            <div class="address-list">
                <p>现有收货地址</p>
                <div class="line"></div>
                <ul>
                   <el-checkbox-group v-model="selectId" @change="handleCheckAllChange">
                        <li v-for="(item,index) in dresslist">
                            <p>
                                <span style='font-size: 16px'>{{index+1}}、{{item.Reciver}}  {{item.Country}}{{item.Province}}{{item.Province=='北京'||item.Province=='重庆'||item.Province=='天津'||item.Province=='上海'?'市':'省'}}{{item.DetailedAddress}}，{{item.PostCode}}，{{item.MobilePhone}}</span>
                                <el-button type="warning" size="mini" v-if="allcount!=1" @click='dellist(item.Id)' plain class="fr">删除</el-button>
                                <el-button type="danger" size="mini" plain class="fr" @click='goDetail12(item.Id)' style="margin-right: 12px">修改</el-button>
                            </p>
                            <p><span><el-checkbox :label="item.Id" :disabled="item.Id== selectId[0]">设置为默认地址</el-checkbox></span></p>
                        </li>
                    </el-checkbox-group>
                </ul>
            </div>
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
</template>

<script>
    import search from "./module/Search.vue"
    export default {
        data() {
            return {
                dresslist: [],
                selectId: [],
                isIndeterminate: false,
                cp: 1,
                allcount:0,
            }
        },
        methods: {
              changecp(val){
                this.cp=val;
                this.selectId=[]
                this.dresslist=[]
                this.getlist()
            },
            //修改地址
            goDetail12(id){
                 this.$router.push({path:'UpdateAddress',query:{Address:id}})
            },
            //默认选择
            handleCheckAllChange(id){
                console.log(this.selectId)           
                this.$http.post("/UserAddressBook/SetDefault", {
                          id:this.selectId[this.selectId.length-1]
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.selectId=[]
                            this.getlist()
                        }
                    })
            },
            //删除订单
            dellist(id){
               console.log(id)
                    this.$http.post("/UserAddressBook/Remove", {
                          ids:id
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.getlist()
                        }
                    })
            },
            goPath(url) {
                this.$router.push(url)
            },
            //获取列表
            getlist() {
                   this.$http.post("/UserAddressBook/List", {
                            ps:20,
                            cp:this.cp,
                            userId:JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id
                        
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.allcount=res.data.Data.RecordCount
                            res.data.Data.ItemList.map((item)=>{
                                if(item.IsDefault){
                                 this.selectId.push(item.Id)
                                }
                            })
                            this.dresslist=[...res.data.Data.ItemList]
                        }
                    })
            }
        },
        mounted() {
            this.getlist()
        },
        components: {
            search
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .list-of-address {
        .collect-center {
            width: 1200px;
            margin: auto;
            min-height: 600px;
            .address-notification {
                margin-left: 262px;
                font-size: 16px;
                .content-title {
                    border-bottom: 0px
                }
            }
            .address-notification {
                .address-list {
                    margin-top: 10px;
                    width: 938px;
                    box-sizing: border-box;
                    border: 1px solid #e6e6e6;
                    border-radius: 5px;
                    overflow: hidden;
                    margin-bottom: 39px;
                    padding: 20px 20px 22px;
                    .line {
                        margin: 10px 0;
                        height: 1px;
                        background: #e7e7e7;
                    }
                    ul {
                        li {
                            margin-top: 20px;
                        }
                        p:last-child {
                            margin-top: 10px;
                            &>span {
                                margin-left: 20px;
                            }
                        }
                    }
                }
            }
            .pagination {
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

</style>
