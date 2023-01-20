<template>
  <div class="login">
    <h1>Login</h1>
    <p>
      <input v-model="email" type="email" id="user_email" placeholder="email" />
      <label for="user_email"><span>email</span></label>
    </p>
    <p>
      <input v-model="password" type="password" id="user_password" placeholder="password" autocomplete="on" />
      <label for="user_password"><span>password</span></label>
    </p>
    <div v-if="loginStore.isLoginError" class="alert"> <!-- 이메일, 패스워드가 틀릴 시 오류 메시지 노출 -->
      <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path></svg></span> <!-- 오류 아이콘 -->
      이메일 또는 비밀번호를 잘못 입력했습니다. <br />
      입력하신 내용을 다시 확인해주세요.
    </div>
    <button @click="loginStore.login({email, password})">로그인</button> <!-- 스토어의 login 함수 실행 {email: email, password: password} -->
  </div>
</template>

<script>
import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
export default {
  data() {
    return {
      email: null, // 입력 된 이메일 데이터
      password: null // 입력 된 패스워드 데이터
    }
  },
  setup() {
    const loginStore = useLoginStore() // useLoginStore 함수 호출
    return { loginStore } // 템플릿에서 loginStore에 접근 할 수 있도록 return
  }
}
</script>