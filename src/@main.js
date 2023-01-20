import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useLoginStore } from '@/stores/login'
import axios from 'axios'
import '@/assets/global.css'

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.baseURL = 'http://localhost:3000'
app.use(router).use(createPinia()).mount('#app')

const loginStore = useLoginStore()
loginStore.getUserInfo()
