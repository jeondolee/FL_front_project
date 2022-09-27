<!--
  1. input을 버튼을 통해 밖으로 보내기
  2. 백엔드에서 data 받아서 table 추가하기
  3. 결과 반환하여 front에서 출력하기
 -->

<template>
  <div>
    <h1>{{title}}</h1>
    <div style="float: right; margin-top: 20px">
      <b-input-group>
        <b-input-group-prepend>
          <b-button v-on:click="readData()" variant="outline-primary">Read</b-button>
        </b-input-group-prepend>
        <b-input-group-prepend>
          <b-button v-on:click="addData()" variant="outline-primary">Create</b-button>
        </b-input-group-prepend>
        <b-input-group-prepend>
          <b-button v-on:click="editData()" variant="outline-primary">Edit</b-button>
        </b-input-group-prepend>
        <b-input-group-prepend>
          <b-button v-on:click="deleteData()" variant="outline-primary">Delete</b-button>
        </b-input-group-prepend>
      </b-input-group>
    </div>
    <!-- Insert -->
    <div style="margin-top: 20px">
      <div>
        <h3 v-if=showInsert >Insert</h3>
      </div>
        <b-table Insert v-if=showInsert bordered :items="itemsEdit" :fields="fieldsEdit" style="float: right;">
          <template v-if=showInsert slot='top-row' slot-scope="{ fieldsEdit }">
            <td>
              <b-form-input v-model="insertItem1" placeholder="입력해주세요"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="insertItem2" placeholder="입력해주세요"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="insertItem3" placeholder="입력해주세요"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="insertItem4" placeholder="입력해주세요"></b-form-input>
            </td>
          </template>
        </b-table>
            <b-button v-if=showInsert v-on:click="saveInsert()" variant="outline-primary" style="float: right; margin-top: -15px">Confirm</b-button>
      </div>
    <!-- edit -->
    <div style="margin-top: 20px">
      <div>
        <h3 v-if=showEdit >Edit</h3>
      </div>
        <b-table Edited v-if=showEdit bordered :items="itemsEdit" :fields="fieldsEdit" style="float: right;">
          <!-- items 빈거 하나 넣어서 해도 되지않을까? -->
          <template v-if=showEdit slot='top-row' slot-scope="{ fieldsEdit }">
            <td>
              <b-form-input v-model="editItem1" placeholder="입력해주세요"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="editItem2" placeholder="입력해주세요"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="editItem3" placeholder="입력해주세요"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="editItem4" placeholder="입력해주세요"></b-form-input>
            </td>
          </template>
        </b-table>
            <b-button v-if=showEdit v-on:click="saveEdit()" variant="outline-primary" style="float: right; margin-top: -15px">Confirm</b-button>
      </div>

    <div style="margin-top: 10px">
      <b-table Clicked v-if=showData bordered :items="items" :fields="fields" :select-mode="selectMode" responsive="sm"
      ref="selectableTable" selectable @row-selected="onRowSelected">
        <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
      </b-table>
      <p>
      Selected Rows:<br>
      {{ selected }}
      </p>
      <p>{{apiResult }}</p>
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
      selectMode: 'multi',
      selected: [],

      title: 'Board',
      apiResult: 'empty',
      showData: false,
      showEdit: false,
      showInsert: false,
      insertItem1: '',
      insertItem2: '',
      insertItem3: '',
      insertItem4: '',
      fieldsEdit: [
        {
          key: 'id',
          label: '#'
        },
        {
          key: 'last_name'
        },
        {
          key: 'first_name'
        },
        {
          key: 'age',
          label: 'Person age'
          // Variant applies to the whole column, including the header and footer
          // variant: 'danger'
        }
      ],
      fields: [
        {
          key: 'selected',
          label: 'sel'
        },
        {
          key: 'id',
          label: '#',
          sortable: true
        },
        {
          key: 'last_name',
          sortable: true
        },
        {
          key: 'first_name',
          sortable: true
        },
        {
          key: 'age',
          label: 'age',
          sortable: true
          // Variant applies to the whole column, including the header and footer
          // variant: 'danger'
        },
        {
          key: 'button',
          label: 'btn'
        }
      ],
      items: [
        { id: 1, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { id: 2, age: 21, first_name: 'Larsen', last_name: 'Shaw' }
      ],
      itemsEdit: [
      ]
    }
  },
  methods: {
    async readData () {
      if (this.showData === true) this.showData = false
      else this.showData = true

      var address = 'http://localhost:3010/api/board/read'

      const { data } = await axios.get(address)
      console.log(data)
      this.items = data
    },
    // add 하면 상단 insert영역 보이게 하기, 다시 누르면 안보이게(save 버튼 포함)
    addData () {
      if (this.showInsert === true) this.showInsert = false
      else this.showInsert = true
    },
    // slot에 edit, delete 버튼 추가하기
    // edit 버튼 누르면 위에 쭉 추가되기?
    // 변경시 리스트 정렬 유지는 모르겠다 그냥 새로 고침...

    // row 지정하면 insert box 출력? => 이런 기능은 없을 듯, 원래 값은 placehold
    // 쉽게 하려면 index 지정하고 add, delete 하면 되는데...
    // add와 달리 index 입력 칸을 추가하자
    editData () {
      if (this.showEdit === true) this.showEdit = false
      else this.showEdit = true
    },
    // delete는 체크박스 클릭 후 삭제 되게끔
    async deleteData () {
      var i = 0
      var selID = []
      for (i = 0; i < this.selected.length; i++) {
        selID.push(this.selected[i].id)

        var address = 'http://localhost:3010/api/board/del' + '?id=' + this.selected[i].id

        console.log(address)

        const { data } = await axios.get(address)
        this.apiResult = data
      }

      this.selected = selID

      console.log(selID)



      this.readData()
      this.readData()
    },
    // id 중복이 되면 수정 로직으로(추가되면 칸 비게 만들기), id 중복이 아니면 추가 로직으로
    async saveInsert () {
      var address = 'http://localhost:3010/api/board/insert' + '?id=' + this.insertItem1 + '&first_name=' + this.insertItem2 + '&last_name=' + this.insertItem3 + '&age=' + this.insertItem4

      console.log(address)

      const { data } = await axios.get(address)
      this.apiResult = data
      this.readData()
      this.readData()
    },
    async saveEdit () {
      var address = 'http://localhost:3010/api/board/edit' + '?id=' + this.editItem1 + '&first_name=' + this.editItem2 + '&last_name=' + this.editItem3 + '&age=' + this.editItem4

      console.log(address)

      const { data } = await axios.get(address)
      this.apiResult = data
      this.readData()
      this.readData()
    },
    onRowSelected (items) {
      this.selected = items
    }
  }
}
</script>
