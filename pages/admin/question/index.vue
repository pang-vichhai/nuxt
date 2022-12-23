<template>
  <v-container>
    <v-row class="ma-0 pa-0">
      <v-card tile width="100%">
        <v-card-title class="purple">
          <h2 class="display-1">All Questions</h2>
          <v-spacer></v-spacer>
          <n-link to="/admin/question/create">
            <h2 class="display-1">Add New Question</h2>
          </n-link>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="question"
            :sort-desc="[false, true]"
            multi-sort
            class="elevation-1"
          >
            <template #[`item.action`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attr }">
                  <v-btn icon v-bind="attr" v-on="on" @click="remove(item.id)">
                    <v-icon color="red" small>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attr }">
                  <v-btn
                    icon
                    v-bind="attr"
                    v-on="on"
                    :to="`/admin/question/${item.id}`"
                  >
                    <v-icon color="yellow" small>mdi-file-document-edit</v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import keys from 'jsdom-global/keys'
export default {
  middleware:'auth',
  data() {
    return {
      headers: [
        { align: 'center' },
        { text: 'Question', value: 'question' },
        { text: 'Option 1', value: 'option1' },
        { text: 'Option 2', value: 'option2' },
        { text: 'Option 3', value: 'option3' },
        { text: 'Option 4', value: 'option4' },
        { text: 'Actions', value: 'action' },
      ],
      question: [],
    }
  },
  methods: {
    fetchQuestion() {
      this.$axios
        .get(
          `/questions.json`
        )
        .then(
          (res) =>
            (this.question = Object.keys(res.data).map((key, index) => {
              res.data[key].id = key
              return res.data[key]
            }))
        )
    },
    goTo(id) {
      return id
    },
    remove(key) {
      this.$axios
        .delete(
          `/questions/${key}.json`
        )
        .then((res) => {
          this.$axios
            .get(
              `/answers.json?orderBy="question_id"&startAt="${key}"&endAt="${key}"`
            )
            .then((res) => {
              const answerId = Object.keys(res.data)[0]
              this.$axios
                .delete(
                  `/answers/${answerId}.json`
                )
                .then((res) => this.question.splice(this.question[key]))
            })
        })
    },
  },
  created() {
    this.fetchQuestion()
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
}
</style>
