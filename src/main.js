import { createApp } from 'vue';
import App from './App.vue';
import router from './components/routers/administrador';

createApp(App)
  .use(router)
  .mount('#app');