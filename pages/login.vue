<template>
  <v-container>
    <v-card>
      <v-card-title class="purple d-flex justify-center">
        <h1 class="display-1">Admin Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="mt-4" @submit.prevent="login" ref="form">
          <v-text-field
            outlined
            color="purple"
            label="Email"
            v-model="email"
            type="email"
            required
            :rules="rules.email"
          ></v-text-field>
          <v-text-field
            outlined
            color="purple"
            label="Password"
            v-model="password"
            :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showpass ? 'text' : 'password'"
            @click:append="showpass = !showpass"
            :rules="[rules.required, rules.min]"
            required
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
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      showpass: false,
      rules: {
        required: (value) => !!value || 'This field is required',
        min: (v) =>
          v?.length >= 6 ||
          'This field must be contained at least 6 characters',
        email: [
          (v) => !!v || 'This field is required',
          (v) => /.+@.+/.test(v) || 'Plese fill the your email',
        ],
      },
    }
  },
  methods: {
    login() {
      this.$refs.form.validate()
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
      this.$store.commit('auth/setLoggedIn', true)
      this.$router.push('/admin/question')
    },
  },
}
</script>

<style></style>
