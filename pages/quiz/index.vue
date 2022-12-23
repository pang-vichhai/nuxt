<template>
  <div>
    <div>
      <h2 class="display-1 text-center">Quiz App</h2>
    </div>
    <v-row class="ma-0 pa-0">
      <v-col cols="12">
        <div v-for="(item,i) in questions" :key="i">
          <v-card tile class="mt-3">
            <v-card-title class="purple lighen-3">{{item.question}}</v-card-title>
            <v-card-actions>
              <v-container>
                <v-radio-group v-model="choosen" row class="d-flex justify-space-between">
                <v-radio
                  :label="item.option1"
                  :value="item.option1"
                ></v-radio>
                <v-radio
                  :label="item.option2"
                  :value="item.option2"
                ></v-radio>
                <v-radio
                  :label="item.option3"
                  :value="item.option3"
                ></v-radio>
                <v-radio
                  :label="item.option4"
                  :value="item.option4"
                ></v-radio>
              </v-radio-group>
                <v-btn @click="handleAnswer" color="purple" outlined
                  >submit</v-btn
                >
              </v-container>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Quiz',
    }
  },
  data() {
    return {
      choosen: '',
      questions: {},
    }
  },
  methods: {
    handleAnswer() {
      console.log(this.choosen)
    },
    getQuestions() {
      this.$axios.get(`/questions.json`).then((res) => {
        this.questions = res.data
        console.log(this.questions)
      })
    },
  },
  created() {
    this.getQuestions()
  },
}
</script>

<style></style>
