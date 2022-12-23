<template>
  <div>
    <v-card tile class="mt-3">
      <v-card-title class="purple lighen-3">{{ item.question }}</v-card-title>
      <v-card-actions>
        <v-container>
          <v-radio-group
            v-model="choosen"
            row
            class="d-flex justify-space-between"
          >
            <v-radio
              :color="answerColor()"
              :label="item.option1"
              :value="item.option1"
            ></v-radio>
            <v-radio
              :color="answerColor()"
              :label="item.option2"
              :value="item.option2"
            ></v-radio>
            <v-radio
              :color="answerColor()"
              :label="item.option3"
              :value="item.option3"
            ></v-radio>
            <v-radio
              :color="answerColor()"
              :label="item.option4"
              :value="item.option4"
            ></v-radio>
          </v-radio-group>
          <v-btn @click="handleAnswer" color="purple" outlined>submit</v-btn>
        </v-container>
      </v-card-actions>
    </v-card>
    <v-dialog hide-overlay v-model="correct" width="500"
      ><v-card
        :color="dialogColor"
        height="100"
        class="mx-auto d-flex align-center justify-center"
        ><h2 class="display-1">{{ description }}</h2></v-card
      >
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      choosen: null,
      result: null,
      correct: false,
      description: null,
      dialogColor: null,
    }
  },
  methods: {
    handleAnswer() {
      this.$axios
        .$get(
          `/answers.json?orderBy="question_id"&startAt="${this.id}"&endAt="${this.id}"`
        )
        .then((res) => {
          const answer = Object.values(res)[0].answer
          console.log(answer)
          this.verifyAnswer(answer)
        })
    },
    verifyAnswer(ans) {
      this.result = ans === this.choosen
      // if (this.result) {
      //   this.$notify({
      //     group: 'notify',
      //     title: 'Success',
      //     text: 'Yeah! Correct Answer',
      //   })
      // }
      this.correct = true
      if (this.result) {
        this.description = 'Yeah! Correct Answer!'
        this.dialogColor = 'green'
      } else {
        this.description = 'Try Again!'
        this.dialogColor = 'red'
      }

      // if (this.result) {
      //   this.correct = true
      //   this.de
      // }
    },
    answerColor() {
      if (this.result === null) {
        return 'black'
      }
      return this.result ? 'green' : 'red'
    },
  },
  notifications: {
    showLoginError: {
      // You can have any name you want instead of 'showLoginError'
      title: 'Login Failed',
      message: 'Failed to authenticate',
      type: 'error', // You also can use 'VueNotifications.types.error' instead of 'error'
    },
  },
}
</script>

<style></style>
