<template>
  <div class="member">
    <h1>Member</h1>
    <template v-if="lists.length"> <!-- axios 데이터 로드 후 데이터 있을 시 노출 -->
      <ul>
        <li class="header">
          <span>이름</span>
          <span>이메일</span>
          <span>삭제</span>
        </li>
        <li v-for="list in lists" :key="list.id"> <!-- lists 데이터의 각각 list로 출력 -->
          <span>{{ list.name }}</span> <!-- list의 이름 출력 -->
          <span>{{ list.email }}</span> <!-- list의 아매알 출력 -->
          <span class="delete"><button @click.prevent="fnDelete(list)"><span>삭제</span></button></span> <!-- 해당 유저 삭제 -->
        </li>
      </ul>
    </template>
    <template v-else>
      <p class="nodata">등록된 사용자가 없습니다.</p>
    </template>
  </div>
</template>

<script>
import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
export default {
  data() {
    return {
      lists: [] // 리스트 데이터
    }
  },
  setup() {
    const loginStore = useLoginStore() // useLoginStore 함수 호출
    return { loginStore } // 템플릿에서 loginStore에 접근 할 수 있도록 return
  },
  mounted() {
    this.fnGetMember() // mounted 시 fnGetMember (axios get) 함수 실행 - 리스트 출력
  },
  methods: {
    fnGetMember() {
      this.$axios.get(this.baseURL + '/users') // axios get 함수로 유정 리스트 가져오기
        .then(res => {
          this.lists = res.data // 유저 데이터 lists 데이터에 할당
          console.log(res.data, '유저 리스트')
        })
        .catch(err => {
          console.log(err, '에러')
        })
    },
    fnDelete(list) { // 해당 유저 삭제
      console.log(list.id)
      if (confirm('삭제하시겠습니까?')) { // confirm 창에서 확인 클릭 시
        this.$axios.delete(this.baseURL + '/users/' + list.id) // axios delete 함수로 해당 id의 유저 삭제
          .then(() => {
            console.log('삭제')
            this.fnGetMember() // 삭제 후 리스트 다시 받아와 출력
          })
      }
    }
  }
}
</script>