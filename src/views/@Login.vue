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
    <div v-if="loginStore.isLoginError" class="alert">
      <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path></svg></span>
      이메일 또는 비밀번호를 잘못 입력했습니다. <br />
      입력하신 내용을 다시 확인해주세요.
    </div>
    <!-- <button @click="loginStore.login({email: email, password: password})">로그인</button> -->
    <button @click="loginStore.login({email, password})">로그인</button>
  </div>
  <!-- <button @click="getRegister">register</button>
  <button @click="getTest">get</button>
  <button @click="postTest">post</button> -->
</template>

<script>
import { useLoginStore } from '@/stores/login'
export default {
  data() {
    return {
      email: null,
      password: null
    }
  },
  setup() {
    const loginStore = useLoginStore()
    return { loginStore }
  },
  // methods: {
  //   getRegister() {
  //     this.$axios.post(this.baseURL + '/users', {
  //       name: "park",
  //       email: "park@gmail.com",
  //       password: "1111"
  //     })
  //     .then(res => { //function 사용하면 this가 인스턴스가 아닌 function 내부를 가르키므로 화살표함수 사용
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   },
  //   getTest() {
  //     this.$axios.get(this.baseURL + '/users')
  //     .then(res => { //function 사용하면 this가 인스턴스가 아닌 function 내부를 가르키므로 화살표함수 사용
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   },
  //   postTest() {
  //     this.$axios.post(this.baseURL + '/login', {
  //         email: "park@gmail.com",
  //         password: "1111"
  //     })
  //     .then(res => {
  //       console.log(res);
  //       let token = res.data.accessToken
  //       let config = {
  //         headers: {
  //           "access-token": token
  //         }
  //       }
  //       this.$axios.get(this.baseURL + '/users/' + res.data.user.id, config)
  //       .then(res => {
  //         console.log(res);
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }
  // }
}
</script>