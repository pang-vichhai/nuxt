<template>
  <v-container>
    <v-row class="ma-0 pa-0">
      <v-col cols="12">
        <v-card>
          <v-card-title class="purple">
            <h2 class="display-1 text-center">Add Question Here!</h2>
            <v-spacer></v-spacer>
            <n-link to="/admin/question">
              <h2 class="display-1 text-center">All Question</h2>
            </n-link>
          </v-card-title>
          <v-card-text class="pa-4" row>
            <v-form @submit.prevent="store">
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
                <v-btn type="submit" color="purple">Add Question</v-btn>
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
    }
  },
  methods: {
    store() {
      this.$axios
        .post(
          `/questions.json`,
          this.quiz
        )
        .then((res) => {
          this.storeAnswer(res.data.name)
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    storeAnswer(id) {
      this.$axios
        .post(
          `/answers.json`,
          { question_id: id, answer: this.correct }
        )
        .then((res) => this.$router.push('/admin/question'))
        .catch((err) => console.log(err.response.data))
    },
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
