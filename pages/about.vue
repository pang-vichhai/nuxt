<template>
  <div>
    <h2>{{ title }}</h2>
    <!-- <router-link to="/">Home</router-link> -->
    <!-- <n-link to="/">Home</n-link> -->
    <NuxtLink to="/">Home</NuxtLink>
  </div>
</template>

<script>
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
}
</script>

<style></style>
