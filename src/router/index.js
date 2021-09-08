import Login from '../components/LoginForm.vue';
import Register from '../components/RegisterForm.vue';
import Home from '../components/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';
// import router from './router';
const routes = [
  { path: '/', name: 'Home', redirect: '/login' },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
