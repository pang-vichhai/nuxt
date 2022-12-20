<template>
  <div>
    <h2>{{ slug.id }}</h2>
  </div>
</template>

<script>
export default {
  // created() {
  //   console.log(this.$route.params)
  // },
  validate({params}){
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      slug: this.$route.params,
    }
  },
}
</script>

<style></style>
