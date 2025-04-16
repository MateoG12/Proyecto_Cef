import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia' // <-- importar Pinia
import router from './components/routers/administrador';

const app = createApp(App)

const pinia = createPinia()
app.use(pinia) // <-- MUY IMPORTANTE: registrar Pinia antes de usar cualquier store
app.use(router) // <-- si estás usando vue-router

app.mount('#app')