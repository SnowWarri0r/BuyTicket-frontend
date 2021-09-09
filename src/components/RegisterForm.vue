<template>
  <div class="register-wrapper" ref="registerForm">
    <div style="height:30px;"></div>
    <h1 class="title">用户注册</h1>
    <div class="form-container">
      <el-form
        ref="userRegisterForm"
        class="register-container"
        :rules="rules"
        :model="userRegisterForm"
        :label-position="labelPosition"
        label-width="90px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="userRegisterForm.username"
            prefix-icon="el-icon-user-solid"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="账户余额" prop="balance">
          <el-input
            type="text"
            v-model="userRegisterForm.balance"
            prefix-icon="el-icon-coin"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="userRegisterForm.password"
            prefix-icon="el-icon-lock"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="repeatPassword">
          <el-input
            type="password"
            v-model="userRegisterForm.repeatPassword"
            prefix-icon="el-icon-lock"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            style="width:100%;"
            @click="doRegisterSubmit('userRegisterForm')"
            >提交</el-button
          >
        </el-form-item>
        <el-row style="justify-content:right;margin-top:-5px;">
          <el-link type="primary" @click="toLogin()">用户登录</el-link>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '../plugins/axios';
import { ElMessage } from 'element-plus';
export default {
  name: 'RegisterForm',
  mounted() {
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:antiquewhite');
  },
  beforeUnmount() {
    document.querySelector('body').removeAttribute('style');
  },
  data() {
    let checkUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('用户名不能为空'));
      }
      callback();
    };
    let checkBalance = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('余额不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }, 1000);
    };
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.userRegisterForm.repeatPassword !== '') {
          this.$refs.userRegisterForm.validateField('repeatPassword');
        }
        callback();
      }
    };
    let validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userRegisterForm.password) {
        callback(new Error('两次输入密码不一致！'));
      } else {
        callback();
      }
    };
    return {
      userRegisterForm: {
        username: '',
        balance: '',
        password: '',
        repeatPassword: '',
      },
      rules: {
        balance: [{ validator: checkBalance, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        repeatPassword: [{ validator: validatePassword2, trigger: 'blur' }],
        username: [{ validator: checkUsername, trigger: 'blur' }],
      },
    };
  },
  methods: {
    doRegisterSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let username = this.userRegisterForm.username;
          let password = this.userRegisterForm.password;
          let balance = this.userRegisterForm.balance;
          request
            .post('http://localhost:8081/api/user/register', {
              username: username,
              balance: balance,
              password: password,
            })
            .then(() => {
              ElMessage('注册成功');
              setTimeout(() => this.$router.push('/login'), 1500);
            })
            .catch((error) => {
              ElMessage.error(error.message);
            });
        } else {
          ElMessage('表单信息有误!');
        }
      });
    },
    toLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scope>
h1 {
  text-align: center;
}
.form-container {
  width: 400px;
}
.register-wrapper {
  margin: 200px auto;
  width: 450px;
  height: 500px;
  border: none;
  border-radius: 15px;
  box-shadow: rgb(195 180 146) 0px 0px 9px 4px;
  background-color: whitesmoke;
}
</style>
