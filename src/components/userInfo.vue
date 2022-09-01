<!--
  1. input을 버튼을 통해 밖으로 보내기
  2. 백엔드에서 data 받아서 table 추가하기
  3. 결과 반환하여 front에서 출력하기
 -->

<template>
  <div>
    <h1>input</h1>
    <input v-model = "title" placeholder="title">
    <input v-model = "description" placeholder="description">
    <button v-on:click="userInfo()">요청</button>
    <p> {{apiResult}} </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'userInfo',
  data () {
    // 변수 선언 공간
    return {
      apiResult: 'empty',
      title: 'title',
      description: 'description'
    }
  },
  methods: {
    async userInfo () {
      var address = 'http://localhost:3010/api/getTest1/tutorial/?title=' + this.title + '&description=' + this.description
      const {data} = await axios.get(address)
      console.log('들어옴')
      this.apiResult = data
    }
  }
}
</script>
