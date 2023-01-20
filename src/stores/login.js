import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

export const useLoginStore = defineStore('loginStore', { //할당 할 변수 이름은 use..Store 사용 / 첫번째 인자(loginStore)는 고유 ID
  state: () => ({ // 상태 초기 값
    baseURL: 'http://localhost:3000', // API 주소 설정
    userInfo: { // 회원 정보 - 이름, 이메일
      name: null,
      email: null
    }, //
    isSignup: true, // 회원가입 폼 노출
    isLogin: false, // 로그인 상태 - 상단 로그인 상태 노출
    isLoginError: false, // 로그인 에러 - 로그인 페이지 에러 메시지 노출
    isAdmin: false, // 어드민 이메일로 로그인 시
    returnUrl: null // 로그인 후 새로고침 시 해당 URL 페이지 유지
  }),
  actions: { // 상태 변경 - methods 역할
    signup(signupObj) { // 회원가입 - 입력된 이름, 이메일, 패스워드 파라미터로 받아옴
      axios.post(this.baseURL + '/signup', signupObj) // axios post 메소드로 신규 등록
      .then(res => {
        console.log(res)
        axios.get(this.baseURL + '/users/' + res.data.user.id) // axios get 메소드로 신규 등록 정보 받아옴
        .then(res => {
          console.log(res, 'Sign up')
          this.userInfo = res.data // userInfo 데이터에 받아온 신규등록 정보 할당
          this.isSignup = false // 회원가입 폼 비노출
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    login(loginObj) { // 로그인 - 이메일, 패스워드 파라미터로 받아옴
      console.log(loginObj)
      axios.post(this.baseURL + '/login', loginObj) // 두번째 인자 요청 body에 데이터 loginObj(id,pw)로 post 전송 로그인 시도
      .then(res => {
        console.log(res, '토근 반환')
        let token = res.data.accessToken // 받아온 데이터 중 accessToken을 token에 할당
        let userId = res.data.user.id // 받아온 데이터 중 회원 id를 userId에 할당
        localStorage.setItem("access_token", token) // access_token 이라는 이름 설정 후 toke을 로컬스토리지에 저장
        localStorage.setItem("access_id", userId) // access_id 라는 이름 설정 후 userId를 로컬스토리지에 저장
        this.getUserInfo() // getUserInfo 함수 실행 - 토큰을 헤더에 포함시켜 유정 정보를요청
        // if(this.returnUrl) { //
        //   router.push({ path: 'this.returnUrl' })
        // }
        console.log(this.returnUrl);
      })
      .catch(err => {
        console.log(err)
        this.isLogin = false // 이메일, 패스워드가 틀릴 시 로그인 상태 false
        this.isLoginError = true // 이메일, 패스워드가 틀릴 시 오류 메시지 노출
      })
    },
    getUserInfo() { // 로그인 혹은 새로고침 시 로컬스토로지 저장된 토근을 헤더에 포함시켜 유저 정보를 요청
      let token = localStorage.getItem("access_token") // 로컬스토리지 저장된 토큰 반환
      let userId = localStorage.getItem("access_id") // 로컬스토리지 저장된 id 반환
      let config = { // config header에 access-token이라는 이름으로 토큰을 포함
        headers: {
          "access-token": token,
        }
      }
      if(token !== null && userId !== null) { // 토큰이 없거나 유저 id가 없을 시 (로그인 안된 상태)
        axios.get(this.baseURL + '/users/' + userId, config) // config를 포함시켜 해당 id의 유저정보 요청
        .then(res => {
          console.log(res, this.returnUrl, '유저 정보 반환')
          this.userInfo = res.data // 유저정보 (이름, 이메일, 패스워드, id) userInfo에 할당
          this.isLogin = true // 로그인 상태 true
          this.isLoginError = false // 로그인 에러 상태  false
          router.push(this.returnUrl || '/') // 로그인이 필요한 페이지 주소가 있으면 이동 / 없으면 홈으로 이동
          if(this.userInfo.email === 'admin@naver.com') { // userInfo의 이메일이 어드민 이메일이라면
            this.isAdmin = true // 상단 member 메뉴 노출
          }
        })
      }
    },
    logout() { // 로그아웃
      console.log('logout')
      localStorage.clear() // 로컬스토리지의 정보 (토근, 아이디) 삭제
      this.isLogin = false // 로그인 상태 false
      this.isLoginError = false // 로그인 에러 상태 false
      this.isAdmin = false  // 어드민 로그인 상태 flase
      this.userInfo = null // userInfo 데이터 null로 설정
      router.push({ name: 'Home' }) // 로그인 후 홈으로 이동
    }
  }
})