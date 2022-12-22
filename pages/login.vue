<template>
  <v-container>
    <v-card>
      <v-card-title class="purple d-flex justify-center">
        <h1 class="display-1">Admin Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="mt-4" @submit.prevent="login">
          <v-text-field
            outlined
            color="purple"
            label="Email"
            v-model="email"
            type="email"
          ></v-text-field>
          <v-text-field
            outlined
            color="purple"
            label="Password"
            v-model="password"
            type="password"
          ></v-text-field>
          <div class="d-flex justify-center">
            <v-btn type="submit" color="purple">Login</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$axios
        .$post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_KEY}`,
          {
            password: this.password,
            email: this.email,
            returnSecureToken: true,
          }
        )
        .then(
          (res) => this.handleToken(res.idToken)
          //    console.log(res.idToken)
        )
    },
    handleToken(token) {
      this.$cookies.set('token', token)
      this.$router.push('/admin/question')
    },
  },
}
</script>

<style></style>
