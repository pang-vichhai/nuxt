<template>
  <v-container>
    <v-row class="ma-0 pa-0">
      <v-col cols="12">
        <v-card>
          <v-card-title class="purple">
            <h2 class="display-1 text-center">Edit Question Here!</h2>
            <v-spacer></v-spacer>
            <n-link to="/admin/question">
              <h2 class="display-1 text-center">Back</h2>
            </n-link>
          </v-card-title>
          <v-card-text class="pa-4" row>
            <v-form @submit.prevent="update">
              <v-text-field label="Question" v-model="quiz.question" outlined>
              </v-text-field>
              <div class="d-md-flex">
                <v-text-field
                  class="mx-1"
                  v-model="quiz.option1"
                  label="Option 1"
                  outlined
                >
                </v-text-field>
                <v-text-field
                  class="mx-1"
                  v-model="quiz.option2"
                  label="Option 2"
                  outlined
                >
                </v-text-field>
                <v-text-field
                  class="mx-1"
                  v-model="quiz.option3"
                  label="Option 3"
                  outlined
                >
                </v-text-field>
                <v-text-field
                  class="mx-1"
                  v-model="quiz.option4"
                  label="Option 4"
                  outlined
                >
                </v-text-field>
              </div>
              <div>
                <p>Choose the corret answer:</p>
                <v-radio-group
                  :mandatory="false"
                  v-model="correct"
                  row
                  style="display: block"
                >
                  <v-radio label="Option 1" :value="quiz.option1"></v-radio>
                  <v-radio label="Option 2" :value="quiz.option2"></v-radio>
                  <v-radio label="Option 3" :value="quiz.option3"></v-radio>
                  <v-radio label="Option 4" :value="quiz.option4"></v-radio>
                </v-radio-group>
              </div>
              <v-card-actions>
                <v-btn type="submit" color="purple">Update</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      quiz: {
        question: '',
        option1: null,
        option2: null,
        option3: null,
        option4: null,
      },
      correct: '',
      answer_id: '',
    }
  },
  methods: {
    get() {
      this.$axios
        .get(
          `https://nuxt-firebase-6b90c-default-rtdb.asia-southeast1.firebasedatabase.app/quiz/questions.json`
        )
        .then((res) => {
          this.quiz = res.data[this.$route.params.edit]
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    // storeAnswer(id) {
    //   this.$axios
    //     .post(
    //       `https://nuxt-firebase-6b90c-default-rtdb.asia-southeast1.firebasedatabase.app/quiz/answers.json`,
    //       { question_id: id, answer: this.correct }
    //     )
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err.response.data))
    // },

    update() {
      this.$axios
        .$patch(`/questions/${this.$route.params.edit}.json`, this.quiz)
        .then((res) => {
          this.updateAnswer()
        })
    },
    getAnswer() {
      this.$axios
        .$get(
          `/answers.json?orderBy="question_id"&startAt="${this.$route.params.edit}"&endAt="${this.$route.params.edit}"`
        )
        .then((res) => {
          this.correct = Object.values(res)[0].answer
          this.answer_id = Object.keys(res)[0]
        })
    },
    updateAnswer() {
      this.$axios
        .patch(`/answers/${this.answer_id}.json`, {
          question_id: this.$route.params.edit,
          answer: this.correct,
        })
        .then((res) => {
          this.$router.push('/admin/question')
        })
    },
  },
  created() {
    this.get()
    this.getAnswer()
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
a:hover {
  text-decoration: underline;
  color: blue;
}
</style>
