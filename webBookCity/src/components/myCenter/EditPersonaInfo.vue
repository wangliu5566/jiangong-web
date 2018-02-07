<template>
  <div class="edit-personal-info"> 
   <!-- logo搜索部分 -->
   <search :selectType='0'></search>
   <div class="collect-center">
        <div class='collect-notification'>
            <div class="content-title">
                <span class="red-border"></span>
                <span class="title">编辑个人资料</span>
            </div>
            <div class="edit-detail">
                <el-form :label-position="labelPosition" label-width="86px" :model="formLabelAlign">
                  <el-form-item label="头像设置：">
<!--                    <img src="http://placehold.it/240x240">-->
                        <el-upload
                             :multiple="false"
                              class="avatar-uploader"
                              :data='updata'
                              :action="baseUrl+'/File/Upload'"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload"
                              >
                              <img v-if="imageUrl" style="width: 240px;height: 240px;" :src="imageUrl" class="avatar">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    
                    
                    <img v-if="formLabelAlign.UserFace"  class="preview-img" style="width: 100px;height: 100px;" :src="formLabelAlign.UserFace" >
                    <img v-else  class="preview-img" src="http://placehold.it/100x100">
                    
                    
                    
                    
                    <div class="under-circle-img">
                      <p class="after-nick-name preview-word">头像格式为gif或jpg,大小不超过80*80像素</p>
                    </div>
                    
                    
                    
                    <p style="clear: both;margin-top: 100px">
                      <el-button @click="imageUrl=''" plain>取消</el-button>
<!--                      <el-button type="primary" @click='uploadPhoto' plain>确定</el-button>-->
                    </p>
                  </el-form-item>
                  <el-form-item label="昵称：">
                    <el-input v-model="formLabelAlign.NickName" disabled style="width:310px"></el-input>
<!--                    <span class="after-nick-name">您的昵称可以由英文字母、中文、数字组成</span>-->
                  </el-form-item>
                  
                  <el-form-item label="居住地：">
                       <el-select v-model="formLabelAlign.ExtendData.Address" placeholder="请选择">
                        <el-option
                          v-for="item in cityList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
<!--
                  <el-form-item label="">
                    <p class="after-nick-name">较多的用户居住地在以下地区（可直接选取）：</p>
                    <div>
                      <el-button type="info" plain size="mini" v-for="(item,index) in 10">北京</el-button>
                    </div>
                  </el-form-item>
-->
                  <el-form-item label="性别：">
                    <template>
                      <el-radio-group v-model="formLabelAlign.Sex">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                      </el-radio-group>
                    </template>
</el-form-item>
<el-form-item label="出生日期：">
    <!--
                    <el-input v-model="formLabelAlign.birthday.year" style="width:104px"></el-input><span class="date">年</span>
                    <el-input v-model="formLabelAlign.birthday.month" style="width:104px"></el-input><span class="date">月</span>
                    <el-input v-model="formLabelAlign.birthday.date" style="width:104px"></el-input><span class="date">日</span>
-->
    <el-date-picker :clearable="false" v-model="formLabelAlign.ExtendData.Birthday" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="请选择出生日期">
    </el-date-picker>
</el-form-item>
<el-form-item label="身份：">
    <template>
                      <el-radio-group v-model="formLabelAlign.Profession">
                        <el-radio label="在校学生">在校学生</el-radio>
                        <el-radio label="科研人员">科研人员</el-radio>
                        <el-radio label="教师">教师</el-radio>
                        <el-radio label="建筑行业从业人员">建筑行业从业人员</el-radio>
                      </el-radio-group>
                    </template>
</el-form-item>
<el-form-item label="研究方向：">
    <el-input type="textarea" v-model="formLabelAlign.ExtendData.StudayTarget" style="width:322px"></el-input>
</el-form-item>
<el-form-item label="兴趣爱好">
    <el-input type="textarea" v-model="formLabelAlign.ExtendData.Interests" style="width:322px"></el-input>
</el-form-item>
<el-form-item label="">
    <el-button type="primary" @click="updataUser">提交保存</el-button>
    <el-button @click="$router.push('center')" plain>取消</el-button>
</el-form-item>
</el-form>
</div>
</div>
</div>
</div>
</template>

<script>
    import search from "./module/Search.vue"
    import { mapGetters } from 'vuex'
    export default {
          computed: mapGetters([
            'userInfo',
          ]),
        data() {
            return {
                baseUrl: baseUrl,
                labelPosition: 'right',
                imageUrl: '',
                myimageUrl: '',
                formLabelAlign: {
                    researchDirection: '',
                    interest: '',
                    ExtendData: {
                        Address: ''
                    }
                },
                updata: {
                    customType: 'cover',
                    ApiName: '/File/Upload',
                    BridgePlatformName: 'cabp_web'
                },
                cityList: [{
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
            search
        },
        methods: {
            updataUser() {
                //                console.log(formLabelAlign.ExtendData.Birthday)
                this.$http.post("/User/Update", {
//                        nickName: this.formLabelAlign.NickName,
                        sex: this.formLabelAlign.Sex,
                        profession: this.formLabelAlign.Profession,
                        extendData: JSON.stringify({
                            Address: this.formLabelAlign.ExtendData.Address,
                            StudayTarget: this.formLabelAlign.ExtendData.StudayTarget,
                            Interests: this.formLabelAlign.ExtendData.Interests,
                            Birthday: this.formLabelAlign.ExtendData.Birthday,
                        }),
                        userFace: this.imageUrl ? this.imageUrl : this.formLabelAlign.UserFace

                    })
                    .then((res) => {
                        if (res.data.Success) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.goPath("center")
                        } else {
                            this.$message({
                                message: res.data.Description,
                                type: 'error'
                            });
                        }
                    })
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = res.Data.Url
            },
            beforeAvatarUpload(file) {
                console.log(file.type)
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG / GIF格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            goPath(url) {
                this.$router.push(url)
            },
            getDetail() {
                this.$http.get("/User/Detail", {
                        params: {
                            id: this.userInfo.Id
                        }
                    })
                    .then((res) => {
                        if (res.data.Success) {
                            console.log(res.data.Data)
                            this.formLabelAlign = res.data.Data
                        }
                    })
            }
        },
        mounted() {
            this.getDetail()
        },
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .edit-personal-info {
        .collect-center {
            width: 1200px;
            margin: auto;
            min-height: 600px;
            .collect-notification {

                .avatar-uploader {
                    float: left;
                }
                .avatar-uploader .el-upload {
                    border: 1px dashed #d9d9d9;
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }
                .avatar-uploader .el-upload:hover {
                    border-color: #409EFF;
                }
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 240px;
                    height: 240px;
                    line-height: 240px;
                    text-align: center;
                }
                .avatar {
                    width: 178px;
                    height: 178px;
                    display: block;
                }




                margin-left: 262px;
                font-size: 16px;
                .content-title {
                    border-bottom: 0px
                }
                &>.edit-detail {
                    width: 938px;
                    box-sizing: border-box;
                    border: 1px solid #e6e6e6;
                    border-radius: 5px;
                    overflow: hidden;
                    margin-bottom: 39px;
                    padding: 30px;
                    .after-nick-name {
                        font-size: 12px;
                        color: #999;
                    }
                    .under-circle-img {
                        /*                        position: relative;*/
                        .preview-word {}

                    }
                    .preview-img {
                        border-radius: 50%;
                        margin-left: 50px;
                        /*                        position: relative;*/
                        /*
                        top: -138px;
                        left: 70px;
*/
                    }
                    .date {
                        display: inline-block;
                        margin-left: 10px;
                        margin-right: 25px;
                    }
                }
            }

        }
    }

</style>
