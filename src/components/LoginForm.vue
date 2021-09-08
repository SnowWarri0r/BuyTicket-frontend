<template>
  <div class="login-wrapper" ref="loginForm">
    <div style="height:50px;"></div>
    <h1 class="title">用户登录</h1>
    <div class="loginForm-container">
      <el-form
        ref="userLoginForm"
        class="login-container"
        :rules="rules"
        :model="userLoginForm"
        :label-position="labelPosition"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="userLoginForm.username"
            prefix-icon="el-icon-user-solid"
            autocomplete="off"
            ref="username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="userLoginForm.password"
            prefix-icon="el-icon-lock"
            autocomplete="off"
            ref="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            style="width:100%;"
            @click="doLoginSubmit('userLoginForm')"
            >提交</el-button
          >
        </el-form-item>
        <el-row style="justify-content:right;margin-top:-5px;">
          <el-link type="primary" @click="toRegister()">用户注册</el-link>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
import { ElMessage } from 'element-plus';
export default {
  name: 'LoginForm',
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
    let checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'right',
      userLoginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ validator: checkUsername, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }],
      },
    };
  },
  methods: {
    doLoginSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let username = this.userLoginForm.username;
          let password = this.userLoginForm.password;
          axios
            .post('http://localhost:8081/api/auth/login', {
              username: username,
              password: password,
            })
            .then((response) => {
              ElMessage('登陆成功');
              localStorage.setItem(
                'Authorization',
                response.headers.authorization
              );
            })
            .catch((error) => {
              this.$alert(error.message);
            });
        } else {
          ElMessage('表单参数有误！');
          return false;
        }
      });
    },
    toRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scope>
h1 {
  text-align: center;
}
.loginForm-container {
  width: 380px;
}
.login-wrapper {
  margin: 200px auto;
  width: 420px;
  height: 500px;
  border: none;
  border-radius: 15px;
  box-shadow: rgb(195 180 146) 0px 0px 9px 4px;
  background-color: whitesmoke;
}
</style>
