
<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>api 요청결과 값 : {{apiResult}}</h2>
    <button @click.stop="api_event()">요청</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ApiTest',
  data () {
    // 변수 선언 공간
    return {
      msg: 'Api test 부분',
      apiResult: 'empty'
    }
  },
  methods: {
    async api_event () {
      const {data} = await axios.get('http://localhost:3010/api/getTest1')
      console.log('들어옴')
      this.apiResult = data
    }
  }
}
</script>
