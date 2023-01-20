import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
import axios from 'axios'
import '@/assets/global.css'

const app = createApp(App)
app.config.globalProperties.$axios = axios // axios 전역에서 사용
app.config.globalProperties.baseURL = 'http://localhost:3000' //API 주소 공통화 설정
app.use(router).use(createPinia()).mount('#app')

const loginStore = useLoginStore() // useLoginStore 함수 호출
loginStore.getUserInfo() // 페이지 Refresh 시 getUserInfo 함수 실행 하여 로그인 상태 유지
