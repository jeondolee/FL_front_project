<template>
  <div>
    <h1>{{ msg }}</h1>
    <!-- <p>Title : {{title}}</p> -->
    <!-- Plain mode -->
    <b-form-file v-model="file" class="mt-3" plain @change="previewImage">
    </b-form-file>
    <div class="mt-3">Selected file: {{ file ? file.name : ''}}</div><br/>
    <div>
      <b-img :src="previewImageData"></b-img>
    </div>
    <input v-model = "name" placeholder="name">
    <button @click.stop="apievent()">요청</button><br /><br />
    <h3>Api 요청 결과 값 : {{ apiresult }}</h3>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PythonImg',
  data () {
    return {
      msg: 'Digit Image Upload & Inference',
      apiresult: 'Waiting',
      file: null,
      name: '',
      new_path: ''
    }
  },
  methods: {
    async apievent () {
      const formdata = new FormData()
      formdata.append('file', this.file)
      formdata.append('name', this.name)
      formdata.append('new_path', this.new_path)
      // formdata.append('name', this.name)
      // formdata.append('new_path', this.new_path)

      const { data } = await axios.post(
        'http://localhost:3010/api/pythonGet/imgUpload',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      console.log(formdata.name)
      console.log(data)

      this.apiresult = data.results
      // console.log(this.file)
    },
    previewImage (evt) {
      var input = event.target

      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = e => {
          this.previewImageData = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      } else {
        this.previewImageData = null
      }
    }
  }
}
</script>
