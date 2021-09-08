import { createApp } from 'vue';
import ElementUI from 'element-plus';
import router from './router/index';
import App from './App.vue';
import 'element-plus/lib/theme-chalk/index.css';
const app = createApp(App);
app.use(router);
app.use(ElementUI);
app.mount('#app');
