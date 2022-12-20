<template>
  <v-container>
    <h1 class="display-1 text-center">The Weather App</h1>
    <v-row class="ma-0 pa-0">
      <v-col cols="12">
        <v-card tile color="blue-grey darken-2">
          <v-card-text> This is the card </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-form @submit.prevent="getWeatherInfo">
          <v-text-field
            v-model="city"
            type="text"
            label="City"
            outlined
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      city: 'london',
      weather: {},
    }
  },
  created() {
    this.getWeatherInfo()
  },
  methods: {
    getWeatherInfo() {
      this.$axios
        .$get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=81ea122077a98a443f5bba71ff5c26e2`
        )
        .then((res) => {
          this.weather = res
        })
    },
  },
}
</script>

<style></style>
