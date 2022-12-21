<template>
  <div class="text-center">
    <h2>{{ title }}</h2>
    <!-- <router-link to="/">Home</router-link> -->
    <!-- <n-link to="/">Home</n-link> -->
    <!-- <NuxtLink to="/">Home</NuxtLink> -->
    <p>{{ course }}</p>
    <v-text-field v-model="course"></v-text-field>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  middleware: 'test',
  head() {
    return {
      title: 'About',
      script: [{ src: '/about.js' }],
      meta: [
        {
          hid: 'description',
          name: 'descripiton',
          content: 'This is an amazing page',
        },
      ],
    }
  },
  asyncData() {
    return {
      title: 'About',
    }
  },
  //   data() {
  //     return {
  //       title: 'About',
  //     }
  //   },
  computed: {
    course:{
      get(){
        return  this.$store.getters.upperCase
      },
      set(value){
        this.$store.commit('setCourse',value)
      }
    },
  },
}
</script>

<style></style>
