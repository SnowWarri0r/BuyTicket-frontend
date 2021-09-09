<template>
  <el-container direction="vertical" class="" style="height:100%">
    <el-main class="container">
      <el-form
        :model="chargeForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="chargeForm"
      >
        <div class="split"></div>
        <h1 class="title">汇款单</h1>
        <el-form-item label="接收人" prop="receiver">
          <el-input
            v-model="chargeForm.receiver"
            prefix-icon="el-icon-user-solid"
            prop="receiver"
          ></el-input>
        </el-form-item>
        <div class="split"></div>
        <el-form-item label="金额" prop="amount">
          <el-input
            v-model="chargeForm.amount"
            prefix-icon="el-icon-coin"
            prop="amount"
            suffix-icon="el-icon-money"
          ></el-input>
        </el-form-item>
        <div class="split"></div>
        <el-form-item>
          <el-button @click="backToHome()" style="width:200px;margin-left:70px"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="submitCharge('ruleForm')"
            style="width:200px;float:right;margin-right:70px"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import { ElMessage } from 'element-plus';
import request from '../plugins/axios';
export default {
  data() {
    let checkAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('金额不能为空！'));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          return callback(new Error('请输入数字值'));
        } else {
          if (+value < 1 || +value > 50000) {
            callback(new Error('请输入一个金额小于5万大于1的值'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      chargeForm: {
        receiver: '',
        amount: '',
      },
      rules: {
        receiver: [
          { required: true, message: '请输入汇款接收账户', trigger: 'blur' },
          {
            min: 4,
            max: 30,
            message: '长度在4到30个字符',
            trigger: 'blur',
          },
        ],
        amount: [{ required: true, validator: checkAmount, trigger: 'blur' }],
      },
    };
  },
  methods: {
    backToHome() {
      this.$router.back();
    },
    submitCharge(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let receiver = this.chargeForm.receiver;
          let amount = this.chargeForm.amount;
          const authorization = localStorage.getItem('Authorization');
          request({
            url: '/user/charge',
            method: 'POST',
            headers: {
              Authorization: authorization,
            },
            data: {
              receiver: receiver,
              amount: amount,
            },
          })
            .then((response) => {
              ElMessage(response.data.message);
              this.$router.back();
            })
            .catch((error) => {
              ElMessage.error(error.response.data.message);
            });
        } else {
          ElMessage.warning('表单信息有误');
        }
      });
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-block-end: 60px;
}
.split {
  height: 40px;
}
.container {
  width: 70%;
  height: 30%;
  margin: 200px 200px 500px 200px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.chargeForm {
  padding-inline-end: 100px;
}
</style>
