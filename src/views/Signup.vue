<template>
  <div class="login">
    <template v-if="loginStore.isSignup"> <!-- loginStore - isSignup true 일 시 회원가입 폼 노출 -->
      <h1>Sign up</h1>
      <p :class="{ invalid : invalidName }"> <!-- 정규식 이름 입력 없을 시 invalid class 추가  -->
        <!-- 포커스 아웃 시 validateName 실행 -->
        <input v-model="name" type="text" id="userName" placeholder="name" ref="name" @blur="validateName" />
        <label for="userName"><span>name</span></label>
      </p>
      <p v-if="invalidName" class="error"> <!-- 정규식 이름 입력 없을 시 노출  -->
        이름을 입력해 주세요.
      </p>
      <p :class="{ invalid : invalidEmail }"> <!-- 정규식 이메일 조건 미달 시 invalid class 추가  -->
        <!-- 포커스 아웃 시 validateEmail 실행 -->
        <input v-model="email" type="email" id="userEmail" placeholder="email" ref="email" @blur="validateEmail" />
        <label for="userEmail"><span>email</span></label>
      </p>
      <p v-if="invalidEmail" class="error"> <!-- 정규식 이메일 조건 미달 시 노출  -->
        이메일 형식에 맞게 입력하세요.
      </p>
      <p :class="{ invalid : invalidPassword }"> <!-- 정규식 패스워드 조건 미달 시 invalid class 추가  -->
        <!-- 포커스 아웃 시 validatePassword 실행 -->
        <input v-model="password" type="password" id="userPassword" placeholder="password" ref="password" @blur="validatePassword" />
        <label for="userPassword"><span>password</span></label>
      </p>
      <p v-if="invalidPassword" class="error"> <!-- 정규식 패스워드 조건 미달 시 노출  -->
        6~12자 영문 숫자를 사용하세요.
      </p>
      <!-- submitSignup 함수 실행 / invalidName 또는 invalidEmail 또는 invalidPassword  true 일 시 버튼 disabled 설정   -->
      <button @click="submitSignup({name, email, password})" :disabled="(invalidName || invalidEmail || invalidPassword)">회원가입</button>
    </template>
    <template v-else> <!-- loginStore - isSignup false, 회원가입 완료 일 시 노출 -->
      <p class="success"><span>{{ loginStore.userInfo.name }}님</span> 회원가입을 환영합니다.</p>
      <button @click="$router.push({ name: 'Login' })">로그인으로 이동</button>
    </template>
  </div>
</template>

<script>
import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
export default {
  data() {
    return {
      name: null, // 입력 된 이름 데이터
      email: null, // 입력 된 이메일 데이터
      password: null, // 입력 된 패스워드 데이터
      invalidName: false, // 이름 체크 - 입력 된 이름 없을 시 true
      invalidEmail: false, // 이메일 체크 - 이메일 조건 미달 시 true
      invalidPassword: false // 패스워드 체크 - 패스워드 조건 미달 시 true
    }
  },
  setup() {
    const loginStore = useLoginStore() // useLoginStore 함수 호출
    return { loginStore } // 템플릿에서 loginStore에 접근 할 수 있도록 return
  },
  created() {
    this.loginStore.isSignup = true // 회원가입 후 Sign up 페이지 재 진입 시 초기화 (완료 문구가 아닌 회원가입 폼 노출)
  },
  watch: { // watch 속성은 특정 데이터의 변화를 감지하여 자동으로 특정 로직을 수행해주는 속성
    'name': 'validateName', // name 데이터 변화 시 validateName (methods) 함수 매칭
    'email': 'validateEmail', // email 데이터 변화 시 validateEmail (methods) 함수 매칭
    'password': 'validatePassword' // password 데이터 변화 시 validatePassword (methods) 함수 매칭
  },
  methods: {
    validateName() {
      this.invalidName = this.name === null ? true: false // 정규식 - 이름 입력 여부 체크
      console.log(this.invalidName, '이름 체크', this.loginStore.isSignup)
    },
    validateEmail() {
      this.invalidEmail= /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/.test(this.email) ? false: true // 정규식 - 이메일 체크
      console.log(this.invalidEmail, '이메일 체크')
    },
    validatePassword() {
      this.invalidPassword= /^[A-Za-z0-9!@#$%^*+=-]{6,12}$/.test(this.password) ? false: true // 정규식 - 숫자 문자 포함 6~12자리 체크
      console.log(this.invalidPassword, '패스워드 체크')
    },
    submitSignup(signupObj) { // 회원가입 버튼 입력 시 실행 / name, email, password 파라미터로 받음
      if(!this.name) { // 이름이 없을 시
        this.invalidName = true // 이름 체크 true
        this.$refs.name.focus() // 이름 입력 input으로 포커스 이동
      } else if (!this.email) { // 이메일 없을 시
        this.invalidEmail = true // 이메일 체크 true
        this.$refs.email.focus() // 이메일 입력 input으로 포커스 이동
      } else if (!this.password) { // 패스워드 없을 시
        this.invalidPassword = true // 패스워드 체크 true
        this.$refs.password.focus() // 패스워드 입력 input으로 포커스 이동
      }
      this.loginStore.signup(signupObj) // loginStore - signup 함수 실행 - name, email, password 파라미터로 전달
    }
  }
  // watch: {
  //   name() {
  //     this.invalidName = this.name !== '' ? false: true // 정규식 - 이름 입력 여부 체크
  //     console.log(this.invalidName, '이름 체크', this.loginStore.isSignup)
  //   },
  //   email() {
  //     this.invalidEmail= /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/.test(this.email) ? false: true // 정규식 - 이메일 체크
  //     console.log(this.invalidEmail, '이메일 체크')
  //   },
  //   password() {
  //     this.invalidPassword= /^[A-Za-z0-9]{6,12}$/.test(this.password) ? false: true // 정규식 - 숫자 문자 포함 6~12자리 체크
  //     console.log(this.invalidPassword, '패스워드 체크')
  //   }
  // },
}
</script>