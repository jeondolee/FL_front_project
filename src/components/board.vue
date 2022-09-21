<!--
  1. input을 버튼을 통해 밖으로 보내기
  2. 백엔드에서 data 받아서 table 추가하기
  3. 결과 반환하여 front에서 출력하기
 -->

<template>
  <div>
    <h1>{{title}}</h1>
    <div style="float: right; margin: 0px, 0px, 10px">
      <b-input-group>
        <b-input-group-prepend>
          <b-button v-on:click="readData()" variant="outline-primary">Read</b-button>
        </b-input-group-prepend>
        <b-input-group-prepend>
          <b-button v-on:click="addData()" variant="outline-primary">Add</b-button>
        </b-input-group-prepend>
        <b-input-group-prepend>
          <b-button v-on:click="editData()" variant="outline-primary">Edit</b-button>
        </b-input-group-prepend>
        <b-input-group-prepend>
          <b-button v-on:click="deleteData()" variant="outline-primary">Delete</b-button>
        </b-input-group-prepend>
        <b-input-group-prepend>
          <b-button v-on:click="saveData()" variant="outline-primary">Save</b-button>
        </b-input-group-prepend>
      </b-input-group>
    </div>
    <div>
        <b-table Clicked v-if=showData bordered :items="items" :fields="fields">
          <template v-if=showInsert slot='top-row' slot-scope="{ fields }">
            <td>
              <b-form-input v-model="insertItem1" placeholder="입력해주세요"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="insertItem2" placeholder="입력해주세요"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="insertItem3" placeholder="입력해주세요"></b-form-input>
            </td>
          </template>
        </b-table>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { BTable } from 'bootstrap-vue'

export default {
  name: 'board',
  components: { BTable },

  data () {
    return {
      title: 'Board',
      apiResult: 'empty',
      showData: false,
      showInsert: false,
      insertItem1: '',
      insertItem2: '',
      insertItem3: '',
      fields: [
        {
          key: 'last_name',
          sortable: true
        },
        {
          key: 'first_name',
          sortable: false
        },
        {
          key: 'age',
          label: 'Person age',
          sortable: true
          // Variant applies to the whole column, including the header and footer
          // variant: 'danger'
        }
      ],
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: true, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: false, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  },
  methods: {
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

      const { data } = await axios.post(address, condition)

      this.chartData = data // 결과값 받아와서 api result에 주기
      this.loaded = true
    },
    // add 하면 상단 insert영역 보이게 하기, 다시 누르면 안보이게(save 버튼 포함)
    addData () {
      this.showInsert = true
    },
    // read는 딱히 의미x(DB한다면 새로고침)
    readData () {
      this.showData = true
    },
    // row 지정하면 insert box 출력? => 이런 기능은 없을 듯, 원래 값은 placehold
    // 쉽게 하려면 index 지정하고 add, delete 하면 되는데...
    // add와 달리 index 입력 칸을 추가하자
    editData () {

    },
    // delete는 체크박스? 클릭하면 색깔 남는 효과 주고 바로 지워지게 하는게 낫지 않나
    deleteData () {

    },
    saveData () {
      this.items.push({ age: this.insertItem1, first_name: this.insertItem2, last_name: this.insertItem3 })
      this.insertItem1 = ''
      this.insertItem2 = ''
      this.insertItem3 = ''
      this.showInsert = false
    }
  }
}
</script>
