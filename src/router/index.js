import Login from '../components/LoginForm.vue';
import Register from '../components/RegisterForm.vue';
import Home from '../components/Home.vue';
import Charge from '../components/Charge.vue';
import request from '../plugins/axios';
import { createRouter, createWebHistory } from 'vue-router';
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
  { path: '/charge', component: Charge },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

let isAuthenticated = async () => {
  await request
    .get('/user/profile', {
      headers: { Authorization: localStorage.getItem('Authorization') },
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
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
        if (!isAuthenticated()) {
          console.log('here');
          next({ path: '/login' });
        } else {
          console.log('authenticated');
          next();
        }
      }
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
