import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    // allUsers: [
    //   { id: 1, name: 'kim', email: 'kim@gmail.com', password: '1111' },
    //   { id: 2, name: 'lee', email: 'lee@gmail.com', password: '1111' }
    // ],
    userInfo: null,
    isSignup: true,
    isSignupError: false,
    isLogin: false,
    isLoginError: false,
    returnUrl: null
  }),
  actions: {
    signup(loginObj) {
      axios.post('http://localhost:3000' + '/signup', loginObj)
      .then(res => {
        console.log(res)
        axios.get('http://localhost:3000' + '/users/' + res.data.user.id)
        .then(res => {
          console.log(res)
          console.log('Sign up')
          this.userInfo = res.data.name
          this.isSignup = false
        })
      })
      .catch(err => {
        console.log(err)
        this.isSignupError = true
      })
    },
    login(loginObj) {
      console.log(loginObj)
      axios.post('http://localhost:3000' + '/login', loginObj) // loginObj(id,pw)로 post 보내 로그인 시도
      .then(res => {
        console.log(res, '토근 반환')
        let token = res.data.accessToken // 토큰을 헤더에 포함새켜 유저 정보를 요청
        let userId = res.data.user.id
        localStorage.setItem("access_token", token)
        localStorage.setItem("access_id", userId)
        // const loginStore = useLoginStore()
        this.getUserInfo()
        router.push({ name: 'Home' })
        // let config = { 
        //   headers: {
        //     "access-token": token
        //   }
        // }
        // axios.get('http://localhost:3000' + '/users/' + res.data.user.id, config)
        // .then(res => {
        //   console.log(res, '유저 정보 반환')
        //   console.log('login')
        //   this.userInfo = res.data.name
        //   this.isLogin = true
        //   this.isLoginError = false
        //   router.push({ name: 'Home' })
        // })
      })
      .catch(err => {
        console.log(err)
        this.isLogin = false
        this.isLoginError = true
      })

      // let selectedUser = null //undefined?
      // selectedUser = this.allUsers.find(user => {
      //   return user.email === loginObj.email
      // })

      // if(selectedUser == null || selectedUser.password !== loginObj.password) {
      //   console.log('login error')
      //   this.isLogin = false
      //   this.isLoginError = true
      // } else {
      //   console.log('login')
      //   this.isLogin = true
      //   this.isLoginError = false
      //   this.userInfo = selectedUser.name
      //   router.push({ name: 'Home' })
      // }
    },
    getUserInfo() {
      let token = localStorage.getItem("access_token")
      let userId = localStorage.getItem("access_id")
      let config = { 
        headers: {
          "access-token": token,
        }
      }
      if(token !== null && userId !== null) {
        axios.get('http://localhost:3000' + '/users/' + userId, config)
        .then(res => {
          console.log(res, '유저 정보 반환')
          console.log(this.returnUrl, 'login.js url')
          this.userInfo = res.data.name
          this.isLogin = true
          this.isLoginError = false
          router.push(this.returnUrl || '/')
        })
      }
    },
    logout() {
      console.log('logout')
      localStorage.clear()
      this.isLogin = false
      this.isLoginError = false
      this.userInfo = null
      router.push({ name: 'Home' })
    }
  }
})