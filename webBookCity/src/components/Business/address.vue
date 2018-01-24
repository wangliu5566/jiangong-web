<template>
  <div class="add-address">
    <el-form label-width="100px" :rules="rules" ref="ruleForm" :model="formLabelAlign">
      <el-form-item label="收 货 人：" prop="Reciver">
        <el-input v-model="formLabelAlign.Reciver"></el-input>
      </el-form-item>
      <el-form-item label="地　　区：" prop="Province">
        <!--
                <el-input v-model="formLabelAlign.region" style="width:160px"></el-input>
                <el-input v-model="formLabelAlign.region" style="width:160px"></el-input>
-->
        <el-select v-model="formLabelAlign.Province" placeholder="请选择">
          <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="街道地址：" prop="DetailedAddress">
        <el-input v-model="formLabelAlign.DetailedAddress"></el-input>
      </el-form-item>
      <el-form-item label="邮　　编：" prop="PostCode">
        <el-input v-model="formLabelAlign.PostCode"></el-input>
      </el-form-item>
      <el-form-item label="手　　机：" prop="MobilePhone">
        <el-input v-model="formLabelAlign.MobilePhone"></el-input>
      </el-form-item>
      <el-form-item label="固定电话：">
        <el-input v-model="formLabelAlign.Telephone"></el-input>
      </el-form-item>
      <el-checkbox style="margin-left: 100px;margin-bottom: 20px" v-model="formLabelAlign.IsDefault">设为默认地址</el-checkbox>
      <el-form-item label="">
        <el-button type="primary" @click="submitForm('ruleForm')" style="padding:12px 24px;border-radius: 0">提交保存</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="overflow:hidden;"></div>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value || this.formLabelAlign.Telephone) {
        var myreg = /^1[34578]\d{9}$/;
        if (value) {
          if (!myreg.test(value)) {
            return callback(new Error('请输入有效电话'));
          } else {
            callback();
          }
        }
      } else {
        return callback(new Error('请输入手机号码'));
      }
    };
    return {
      rules: {
        Reciver: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        Province: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ],
        DetailedAddress: [
          { required: true, message: '请输入具体地址', trigger: 'change' }
        ],
        PostCode: [
          { message: '请输入邮编', trigger: 'change' }
        ],
        MobilePhone: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],

      },
      formLabelAlign: {
        userId: JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id
      },
      openModalType:1,
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
  mounted() {
    this.openModalType = localStorage.openModalType;
    if (this.openModalType == 1) {
      this.formLabelAlign = {}
    } else {
      this.formLabelAlign = JSON.parse(localStorage.changeAddressObj)
    }
    this.formLabelAlign.userId = JSON.parse(window.sessionStorage.getItem('bg_user_info')).Id
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.openModalType==1){
            this.CreateAddress()
          }else if(this.openModalType ==2){
            this.uodateAddress()
          }
        }
      });
    },
    CreateAddress(){
      this.$http.post("/UserAddressBook/Create",
        this.formLabelAlign
      )
      .then((res) => {
        if (res.data.Success) {
          this.$message.success('新增成功')
          this.$emit('ClickChild', 1)
        }
      })
    },
    uodateAddress(){
       this.$http.post("/UserAddressBook/Edit",
        this.formLabelAlign
      )
      .then((res) => {
        if (res.data.Success) {
          this.$message.success('修改成功')
          this.$emit('ClickChild', 1)
        }
      })
    }
  }
}

</script>
<style lang='less'>
.add-address {
  overflow: hidden;

  
}

</style>
