import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { useLoginStore } from '@/stores/login'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import( '../views/Signup.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/brand',
    name: 'Brand',
    component: () => import( '../views/Brand.vue')
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import( '../views/Member.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => { // 로그인 상태 아닐 시 전역 네비게이션 가드 실행
  const loginStore = useLoginStore() // loginStore 스토어 불러오기 (피니아 상태관리)
  const publicPages = ['/', '/login', '/signup'] // 로그인이 필요없는 페이지
  const authRequired = !publicPages.includes(to.path) // 로그인이 필요한 페이지 주소 일 시
  console.log(authRequired, loginStore.isLogin, '로그인url체크')
  
  if( authRequired && !loginStore.isLogin ) { // 로그인 필요 페이지 접근 && 로그인 안된 상태라면
    console.log(loginStore.isLogin, '로그인상태체크', to.fullPath)
    loginStore.returnUrl = to.fullPath // 요청된 경로(to.fullPath)를 pinia store의 returnUrl에 저장
    console.log(loginStore.returnUrl, 'index.js url')
    return '/login' // 로그인 페이지로 리다이렉션
  }
})

export default router
