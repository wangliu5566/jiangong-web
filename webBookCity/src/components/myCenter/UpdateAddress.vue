<template>
  <div class="center-collect"> 
   <!-- logo搜索部分 -->
   <search :selectType='0'></search>
   <div class="shipping-updataress">
        <div class='address-con'>
            <p>修改收货地址</p>
            <div class="line"></div>
            <el-form :label-position="labelPosition" label-width="100px" :rules="rules" ref="ruleForm" :model="formLabelAlign" >
              <el-form-item label="收货人：" prop="Reciver">
                <el-input v-model="formLabelAlign.Reciver" style="width:322px"></el-input>
              </el-form-item>
              <el-form-item label="地区：" prop="Province">
<!--
                <el-input v-model="formLabelAlign.region" style="width:160px"></el-input>
                <el-input v-model="formLabelAlign.region" style="width:160px"></el-input>
-->
                   <el-select v-model="formLabelAlign.Province" placeholder="请选择">
                        <el-option
                          v-for="item in cityList" :key="item.value" :label="item.label"  :value="item.value">
                        </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="街道地址：" prop="DetailedAddress">
                <el-input v-model="formLabelAlign.DetailedAddress"></el-input>
              </el-form-item>
              <el-form-item label="邮编：" prop="PostCode">
                <el-input v-model="formLabelAlign.PostCode" style="width:322px"></el-input>
              </el-form-item>
              
              
               <el-col >
              <el-form-item label="手机："  prop="MobilePhone" >
                <el-input v-model="formLabelAlign.MobilePhone"  style="width:322px"></el-input>
              </el-form-item>
                </el-col>
                 <el-col >
              <el-form-item  label="固定电话：">
                <el-input v-model="formLabelAlign.Telephone" style="width:322px"></el-input>
              </el-form-item>
              </el-col>
              
              
              
              
              
              
<!--              <el-form-item style="display: block" label="">-->
                  <el-checkbox style="margin-left: 100px;margin-bottom: 20px"  v-model="formLabelAlign.IsDefault">设为默认地址</el-checkbox>
<!--              </el-form-item>-->
              <el-form-item label="">
                  <el-button type="primary" @click="submitForm('ruleForm')">提交保存</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
  </div>
</template>

<script>
    import search from "./module/Search.vue"
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if(value){
                var myreg = /^1[34578]\d{9}$/;
                    if(value){
                       if (!myreg.test(value)) {
                            return callback(new Error('请输入有效电话'));
                        } else {
                            callback();
                        }}
                }else{
                     return callback(new Error('请输入手机号码'));
                }
            };
            return {
                rules:{
                    Reciver: [ { required: true, message: '请输入名称', trigger: 'blur' }],
                    Province: [
            { required: true, message: '请选择省份', trigger: 'change' }
          ],
                    DetailedAddress: [
            { required: true, message: '请输入具体地址', trigger: 'change' }
          ], 
                    PostCode: [
            { required: true, message: '请输入邮编', trigger: 'change' }
          ],
                    MobilePhone: [
             { required: true,validator: validatePass, trigger: 'blur' }
          ],
                
                },
                labelPosition: 'right',
                formLabelAlign: {
                   userId:JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id
                },
                checked: false,
                cityList: [
                    {
                        value: '北京',
                        label: '北京'
                    },
                    {
                        value: '天津',
                        label: '天津'
                    },
                    {
                        value: '河北',
                        label: '河北'
                    },
                    {
                        value: '山西',
                        label: '山西'
                    },
                    {
                        value: '内蒙古',
                        label: '内蒙古'
                    },
                    {
                        value: '辽宁',
                        label: '辽宁'
                    },
                    {
                        value: '吉林',
                        label: '吉林'
                    },
                    {
                        value: '黑龙江',
                        label: '黑龙江'
                    },
                    {
                        value: '上海',
                        label: '上海'
                    },
                    {
                        value: '江苏',
                        label: '江苏'
                    }, {
                        value: '浙江',
                        label: '浙江'
                    },
                    {
                        value: '安徽',
                        label: '安徽'
                    },
                    {
                        value: '福建',
                        label: '福建'
                    },
                    {
                        value: '江西',
                        label: '江西'
                    },
                    {
                        value: '山东',
                        label: '山东'
                    },
                    {
                        value: '河南',
                        label: '河南'
                    },
                    {
                        value: '湖北',
                        label: '湖北'
                    },
                    {
                        value: '湖南',
                        label: '湖南'
                    },
                    {
                        value: '广东',
                        label: '广东'
                    },
                    {
                        value: '广西',
                        label: '广西'
                    },
                    {
                        value: '海南',
                        label: '海南'
                    },
                    {
                        value: '重庆',
                        label: '重庆'
                    },
                    {
                        value: '四川',
                        label: '四川'
                    },
                    {
                        value: '贵州',
                        label: '贵州'
                    },
                    {
                        value: '云南',
                        label: '云南'
                    },
                    {
                        value: '西藏',
                        label: '西藏'
                    },
                    {
                        value: '陕西',
                        label: '陕西'
                    },
                    {
                        value: '甘肃',
                        label: '甘肃'
                    },
                    {
                        value: '青海',
                        label: '青海'
                    },
                    {
                        value: '宁夏',
                        label: '宁夏'
                    },
                    {
                        value: '新疆',
                        label: '新疆'
                    },
                    {
                        value: '香港',
                        label: '香港'
                    },
                    {
                        value: '澳门',
                        label: '澳门'
                    },
                    {
                        value: '台湾',
                        label: '台湾'
                    }

                ],

            }
        },
        components: {
            search,
        },
        mounted() {
            this.getlist()
        },
        methods: {
            //获取列表
            getlist() {
                   this.$http.post("/UserAddressBook/Detail", {
                          id:this.$route.query.Address  
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.formLabelAlign=res.data.Data
                        }
                    })
            },
            //修改
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    
                    if (valid) {
                         this.$http.post("/UserAddressBook/Edit", 
                       this.formLabelAlign
                    )
                    .then((res) => {
                        if (res.data.Success) {
                           this.$router.push("listOfAddress")
                        }
                    })
                    } 
                });
            }
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .center-collect {
        .shipping-updataress {
            width: 1200px;
            margin: auto;
            min-height: 600px;
            .address-con {
                margin-top: 20px;
                margin-left: 262px;
                font-size: 16px;
                .content-title {
                    border-bottom: 0px
                }
            }
            .address-con {
                width: 938px;
                box-sizing: border-box;
                border: 1px solid #e6e6e6;
                border-radius: 5px;
                overflow: hidden;
                margin-bottom: 39px;
                padding: 24px 30px;
                .line {
                    margin: 10px 0 34px;
                    height: 1px;
                    background: #e7e7e7;
                }
                .warning-address {
                    color: #e71715;
                    line-height: 20px;
                    position: absolute;
                }
                .fixed-line-tel {
                    display: inline-block;
                    width: 134px;
                    text-align: center;
                }

            }
        }
    }

</style>
