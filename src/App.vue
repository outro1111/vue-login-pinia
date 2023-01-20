<template>
    <div id="header">
      <h1><router-link to="/">Vue Auth</router-link></h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/brand">Brand</router-link>
        <router-link to="/member" v-if="loginStore.isAdmin">Member</router-link> <!-- 어드민 이메일일 시만 보임 -->
      </nav>
      <div class="utils">
        <template v-if="loginStore.isLogin"> <!-- 로그인 상태 일 시 보임 -->
          <span class="userinfo">{{ loginStore.userInfo.name }}님</span> <!-- member 이름 출력 -->
          <button @click="loginStore.logout" class="btnLogout">Logout</button> <!-- 로그아웃 버튼 -->
        </template>
        <template v-else> <!-- 로그아웃 상태 일 시 보임 -->
          <router-link to="/signup" class="btnSignup">Sign up</router-link> <!-- 회원가입 버튼 -->
          <router-link to="/login" class="btnLogin">Login</router-link> <!-- 로그인 버튼 -->
        </template>
      </div>
    </div>
    <div id="content">
      <router-view/> <!-- 컴포넌트 렌더링 출력 -->
    </div>
</template>

<script>
import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
export default {
  setup() {
    const loginStore = useLoginStore() // useLoginStore 함수 호출
    return { loginStore } // 템플릿에서 loginStore에 접근 할 수 있도록 return
  }
}
</script>
