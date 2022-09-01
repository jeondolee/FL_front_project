<!--
  1. input을 버튼을 통해 밖으로 보내기
  2. 백엔드에서 data 받아서 table 추가하기
  3. 결과 반환하여 front에서 출력하기
 -->

 <template>
  <div>
    <h1>input</h1>
    <input v-model = "join" placeholder="join">
    <button v-on:click="joinTest()">확인</button>
    <p> {{apiResult}} </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'joinTest',
  data () {
    // 변수 선언 공간
    return {
      apiResult: 'empty',
      join: 'join',
      message: ''
    }
  },
  methods: {
    async joinTest () {
      var address = 'http://localhost:3010/api/PostgreDataTest/member_join'

      let joinData = {
        join: JSON.stringify(this.join)
      }

      const {data} = await axios.post(address, joinData)

      console.log(data)
      this.apiResult = data
    }
  }
}
</script>
