<!--
  1. input을 버튼을 통해 밖으로 보내기
  2. 백엔드에서 data 받아서 table 추가하기
  3. 결과 반환하여 front에서 출력하기
 -->

 <template>
  <div>
    <h1>input</h1>
    <!-- <input v-model = "title" placeholder="title">
    <input v-model = "description" placeholder="description"> -->
    <select v-model="selected" multiple>
      <option :value="{comp_id: 'A'}">A</option>
      <option :value="{comp_id: 'B'}">B</option>
      <option :value="{comp_id: 'D'}">D</option>
      <option :value="{comp_id: 'E'}">E</option>
      <option :value="{comp_id: 'G'}">G</option>
      <option :value="{comp_id: 'O'}">O</option>
    </select>
    {{selected}}
    <button v-on:click="visual_comp()">visual_comp</button>
    <p> {{apiResult}} </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'visual',
  data () {
    // 변수 선언 공간
    return {
      apiResult: 'empty',
      date_t: '',
      comp_id: '',
      total_cnt: '',
      selected: ''
    }
  },
  methods: {
    async visual_comp () {
      var address = 'http://localhost:3010/api/visual/comp'

      let compData = {
        comp_id: this.selected[0].comp_id
      }

      const {data} = await axios.post(address, compData)
      this.apiResult = data
    }
  }
}
</script>
