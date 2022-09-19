<!--
  1. input을 버튼을 통해 밖으로 보내기
  2. 백엔드에서 data 받아서 table 추가하기
  3. 결과 반환하여 front에서 출력하기
 -->

 <template>
  <div>
      <h1>select type</h1>
      <select v-model="selected" multiple>
        <option :value="{comp_id: 'A'}">A</option>
        <option :value="{comp_id: 'B'}">B</option>
        <option :value="{comp_id: 'D'}">D</option>
        <option :value="{comp_id: 'E'}">E</option>
        <option :value="{comp_id: 'G'}">G</option>
        <option :value="{comp_id: 'O'}">O</option>
      </select>
    {{selected}}
    <button v-on:click="date()">date</button>

    <div>
      <table style ="margin : auto">
        <th>From</th>
        <th>To</th>
        <tr>
            <td>{{fromDate.from | yyyyMMdd}}</td>
            <td>{{toDate.to-1 | yyyyMMdd}}</td>
        </tr>
        <tr>
            <td><month-picker-input @change="SelectFrom"></month-picker-input></td>
            <td><month-picker-input @change="SelectTo"></month-picker-input></td>
        </tr>
        <tr>
            <td>{{fromDate.year}}-{{fromDate.month}}</td>
            <td>{{toDate.year}}-{{toDate.month}}</td>
        </tr>
        <!-- <tr>
            <td>from</td>
            <td>to</td>
        </tr> -->

      </table>
    </div>
    <template v-if="loaded">
      <div id="visual">
        <GChart
        type="ColumnChart"
        :data="chartData"
        :options="chartOptions"
        />
      </div>
      <!-- <p> {{chartData}} </p> -->
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts/legacy'// vue2에서는 legacy 붙혀서 사용. 영어 문서 읽는 것 정말 중요하구나...
import { MonthPickerInput } from 'vue-month-picker'

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'visual',
  components: { GChart, MonthPickerInput },
  data () {
    // 변수 선언 공간
    return {
      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      fromDate: {
        from: null,
        to: null,
        month: null,
        year: null
      },
      toDate: {
        from: null,
        to: null,
        month: null,
        year: null
      },
      apiResult: 'empty',
      date_t: '',
      comp_id: '',
      total_cnt: '',
      selected: ''
    }
  },
  filters: {
    yyyyMMdd: function (value) {
      if (value === '') return ''
      var jsDate = new Date(value)

      var year = jsDate.getFullYear()
      var month = jsDate.getMonth() + 1
      var day = jsDate.getDate()

      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }

      return year + '-' + month + '-' + day
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
    },
    async date () {
      if (this.toData.to < this.fromData.from) {
        document.write(Date(this.toData.to))
        window.alert('Worng input')
        return
      }

      var address = 'http://localhost:3010/api/visual/date'

      let condition = {
        comp_id: this.selected[0].comp_id,
        fromDate: this.fromDate.from,
        toDate: this.toDate.to - 1
      }

      const {data} = await axios.post(address, condition)

      this.chartData = data // 결과값 받아와서 api result에 주기
      this.loaded = true
    },
    SelectFrom (date) {
      this.fromDate = date
    },
    SelectTo (date) {
      this.toDate = date
    },
    month (value) {
      if (value === '') return ''

      var jsDate = new Date(value)

      var year = jsDate.getFullYear()
      var month = jsDate.getMonth()
      var day = jsDate.getDate()

      if (month < 10) {
        month = '0' + month
      }

      if (day < 10) {
        day = '0' + day
      }

      return year + '-' + month + '-' + day
    }
  }
}
</script>
