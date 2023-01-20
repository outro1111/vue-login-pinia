import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { useLoginStore } from '@/stores/login'

// const rejectAuth = (to, from, next) => {
//   const loginStore = useLoginStore()
//   console.log(loginStore.getUserInfo())
  
//   if( loginStore.isLogin === true ) {
//     console.log('login user')
//     next()
//   } else {
//     console.log('not login user')
//     // if (confirm('로그인이 필요한 페이지입니다. \n로그인 페이지로 이동 하시겠습니까?')) { // comfirm 창 먼저 실행 - 확인 시 밑 소스 실행
//       next("/login")
//     // }
//   }
// }

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
    // beforeEnter: rejectAuth,
    component: () => import( '../views/About.vue')
  },
  {
    path: '/brand',
    name: 'Brand',
    // beforeEnter: rejectAuth,
    component: () => import( '../views/Brand.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  const loginStore = useLoginStore()
  const publicPages = ['/', '/login', '/signup'];
  const authRequired = !publicPages.includes(to.path)
  console.log(authRequired, loginStore.isLogin, '로그인url체크')
  
  if( authRequired && !loginStore.isLogin ) {
    console.log(loginStore.isLogin, '로그인상태체크')
    loginStore.returnUrl = to.fullPath
    console.log(loginStore.returnUrl, 'index.js url');
    return '/login'
  }
})

export default router
