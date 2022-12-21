<template>
  <v-container>
    <h1 class="display-1 text-center">The Weather App</h1>
    <div>
      <h2 class="display-1 text-center my-3" style="color: red">
        {{ weather.name }}
      </h2>
      <v-row class="ma-0 pa-0">
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
        <v-col cols="12" md="4">
          <v-card tile color="blue-grey darken-2" height="300">
            <v-card-text class="text-center">
              <h1 class="display-1">Temperature:</h1>
              <!-- <h2 class="display-1">{{ weather.main.temp - 273 }} C</h2> -->
              <p>
                <span class="display-1">{{ temp }} &deg;C</span>
              </p>
              <v-img class="mx-auto" width="80" :src="icon"></v-img>
              <p>
                <span class="caption ml-2">
                  {{ weather.weather[0].description }}
                </span>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card tile color="blue-grey darken-2" height="300">
            <v-card-text class="text-center">
              <h1 class="display-1">Wind & Pressure</h1>
              <p>
                <span class="headline"
                  >Wind: {{ weather.wind.speed }} m/s ({{
                    weather.wind.deg
                  }}
                  &deg;)</span
                >
              </p>
              <p>
                <span class="headline"
                  >Humidity: {{ weather.main.humidity }} %</span
                >
              </p>
              <p>
                <span class="headline"
                  >Pressure: {{ weather.main.pressure }} hPa</span
                >
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card tile color="blue-grey darken-2" height="300">
            <v-card-text class="text-center">
              <h1 class="display-1">Other:</h1>
              <p>
                <span class="headline"
                  >Max Tempareture :
                  {{ Math.round(weather.main.temp_max - 273) }} &deg;C
                </span>
              </p>
              <p>
                <span class="headline"
                  >Min Tempareture :
                  {{ Math.round(weather.main.temp_min - 273) }} &deg;C
                </span>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  head(){
    return{
      title: 'Weather'
    }
  },
  data() {
    return {
      // city: 'london',
      //   weather: {},
    }
  },
  created() {
    this.getWeatherInfo()
  },
  computed: {
    icon() {
      return `https://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`
    },
    temp() {
      return Math.round(this.weather.main.temp - 273)
    },
    city:{
      get(){
        return this.$store.state.weather.city
      },
      set(value){
        this.$store.commit('weather/setCity',value)
      }
    }
  },
  methods: {
    getWeatherInfo() {
      this.$axios
        .$get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${process.env.weatherAppId}`
        )
        .then((res) => {
          this.weather = res
        })
    },
  },
  asyncData({ params, $axios }) {
    return $axios
      .$get(
        `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${process.env.weatherAppId}`
      )
      .then((res) => {
        return { weather: res }
      })
  },
}
</script>

<style></style>
