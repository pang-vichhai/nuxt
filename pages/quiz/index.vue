<template>
  <div>
    <div>
      <h2 class="display-1 text-center">Quiz App</h2>
    </div>
    <v-row class="ma-0 pa-0">
      <v-col cols="12">
        <questions :item="item"  v-for="(item, i) in questions" :key="i" :id="i"></questions>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Continue from '~/components/questions.vue'
export default {
  components: { Continue },

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
    
    getQuestions() {
      this.$axios.get(`/questions.json`).then((res) => {
        this.questions = res.data
      })
    },
  },
  created() {
    this.getQuestions()
  },
}
</script>

<style></style>
