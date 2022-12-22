<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
      <!-- <v-toolbar-title v-text="title" /> -->
      <h1>{{ title }}</h1>
      <v-spacer />
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
      <v-btn icon to="/login">
        <v-icon color="purple">mdi-login</v-icon>
      </v-btn>
      <v-btn icon v-if="$auth()" @click="logout">
        <v-icon color="red">mdi-account-arrow-left-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  computed: {
    path() {
      return (this.$router.path = '/admin/question')
    },
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
        {
          icon: 'mdi-information',
          title: 'About',
          to: '/about',
        },
        {
          icon: 'mdi-post-outline',
          title: 'Blogs',
          to: '/blogs',
        },
        {
          icon: 'mdi-weather-partly-lightning',
          title: 'Weather',
          to: '/weather',
        },
        {
          icon: 'mdi-account-question-outline',
          title: 'Quiz',
          to: '/quiz',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Nuxt ',
    }
  },
  methods: {
    logout() {
      this.$cookies.remove('token')
      this.$auth()
      this.$router.push('/')
    },
  },
}
</script>
