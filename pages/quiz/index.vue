<template>
  <div>
    <div>
      <h2 class="display-1 text-center">Quiz App</h2>
    </div>
    <v-row class="ma-0 pa-0">
      <v-col cols="12">
        <v-card tile>
          <v-card-title class="purple lighen-3"
            >Question come here</v-card-title
          >
          <v-card-actions>
            <v-container>
              <v-radio-group v-model="choosen" row style="display: block">
                <v-radio
                  v-for="n in 4"
                  :key="n"
                  :label="`Option ${n}`"
                  :value="`Opiton ${n}`"
                ></v-radio>
              </v-radio-group>
              <v-btn @click="handleAnswer" color="purple" outlined
                >submit</v-btn
              >
            </v-container>
          </v-card-actions>
        </v-card>
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
    }
  },
  methods: {
    handleAnswer() {
      console.log(this.choosen)
    },
  },
}
</script>

<style></style>
