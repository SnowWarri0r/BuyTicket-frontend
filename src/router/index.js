import Login from '../components/LoginForm.vue';
import Register from '../components/RegisterForm.vue';
import Home from '../components/Home.vue';
import Charge from '../components/Charge.vue';
import { createRouter, createWebHistory } from 'vue-router';
import request from '../plugins/axios';
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path:'/charge', component:Charge },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  if (
    from.path === '/' ||
    from.path === '/login' ||
    from.path === '/register'
  ) {
    if (to.path === '/home') {
      if (localStorage.getItem('Authorization') === null) {
        next({ path: '/login' });
      } else {
        request({
          url: '/user/profile',
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('Authorization'),
          },
        }).catch(() => {
          next({ path: '/login' });
        });
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
