<template>
  <el-container direction="vertical" class="">
    <el-main class="container">
      <div class="btn-container">
        <h2 style="display:inline-block;margin-block:10px;">个人信息</h2>
        <el-button type="primary" style="float: right" @click="goToCharge()"
          >前往汇款<i class="el-icon-arrow-right el-icon--right"></i
        ></el-button>
      </div>
      <el-descriptions class="margin-top" :column="1" :size="size" border>
        <el-descriptions-item class-name="username">
          <template #label>
            <i class="el-icon-user"></i>
            用户名
          </template>
          {{ username }}
        </el-descriptions-item>
        <el-descriptions-item class-name="balance">
          <template #label>
            <i class="el-icon-coin"></i>
            账户余额
          </template>
          {{ balance }}
        </el-descriptions-item>
        <el-descriptions-item class-name="role">
          <template #label>
            <i class="el-icon-lock"></i>
            权限组
          </template>
          {{ role }}
        </el-descriptions-item>
      </el-descriptions>
    </el-main>
  </el-container>
</template>

<script>
import { ElMessage } from 'element-plus';
// const axios = require('axios');
import request from '../plugins/axios';
export default {
  name: 'Home',
  mounted() {
    let authorization = localStorage.getItem('Authorization');
    request({
      url: '/user/profile',
      method: 'GET',
      headers: {
        Authorization: authorization,
      },
    })
      .then((response) => {
        this.username = response.data.username;
        this.balance = response.data.balance;
        this.role = response.data.role;
      })
      .catch((error) => {
        this.$isAuthenticated = false;
        ElMessage.error(error.message);
      });
  },
  data() {
    return {
      username: '',
      balance: '',
      role: '',
      activeIndex: '1',
      size: '',
    };
  },
  methods: {
    goToCharge() {
      this.$router.push('/charge');
    },
  },
};
</script>

<style scoped>
.container {
  margin: 300px auto;
  width: 900px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}
.btn-container {
  height: 70px;
}
</style>
