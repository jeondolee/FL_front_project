<!--
  1. input을 버튼을 통해 밖으로 보내기
  2. 백엔드에서 data 받아서 table 추가하기
  3. 결과 반환하여 front에서 출력하기
 -->

 <template>
  <div>
    <h1>input</h1>
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
    <template v-if="loaded">
      <div id="visual">
        <GChart
        type="ColumnChart"
        :data="chartData"
        :options="chartOptions"
        />
      </div>
    </template>
    <p> {{chartData}} </p>
  </div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts/legacy'// vue2에서는 legacy 붙혀서 사용

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'visual',
  components: { GChart },
  data () {
    // 변수 선언 공간
    return {
      // 아마 항목, 데이터 순으로 와야 하는 것 같음
      // 그렇다면 불러온 데이터 형식에 맞게 가공 필요
      // ID 선택하면 밑이 년도(...월?), Bar는 cnt 평균값 나오게 뽑아볼까
      // 정규식을 뽑자면(일단 끊기?) ... 백엔드에서 끊어서 보내자
      // 1. "date_t": 이후로 네 자리(년도)
      // 2. "total_cnt": " 이후로 숫자
      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      // chartOptions: {
      //   chart: {
      //     title: 'Company Performance',
      //     subtitle: 'Sales, Expenses, Profit: 2014-2017'
      //   }
      // },
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

      // stringfy를 해서 변수 이름까지 다 text가 된 것이 에러 원인
      let compData = {
        comp_id: this.selected[0].comp_id
      }

      const {data} = await axios.post(address, compData) // comp 보내기
      // 여기에 형식 가공만 하면 될듯...
      // 년도 기준으로 comp_ID 보여주는 예시?

      this.chartData = data // 결과값 받아와서 api result에 주기
      this.loaded = true
    }
  }
}
</script>
