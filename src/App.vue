<template>
  <v-app>
    <v-navigation-drawer
            app
            temporary
            v-model="drawer"
    >
      <v-list>
        <v-list-item
                v-for="link in links"
                :key ="link.title"
                :to="link.url"
        >
          <v-list-item-icon>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text = "link.title"></v-list-item-title>
          </v-list-item-content>

        </v-list-item>
        <v-list-item
        >
          <v-list-item-action>
            v-if="isUserLoggedIn"
            @click="onLogout"
            <v-icon>exit_to_app</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text = "'Выход'"></v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app light color="bar.class">
      <v-app-bar-nav-icon @click="drawer=!drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag ="span" class = "pointer" >
          <img :src="`https://firebasestorage.googleapis.com/v0/b/com-iso.appspot.com/o/isoterm_log.png?alt=media&token=3802db38-86f8-4e24-a43c-a902052eeebf`"
               height="30"
          />
         </router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
                v-for="link of links"
                :key="link.title"
                :to="link.url"
                text>
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn
                @click="onLogout"
                text
                v-if="isUserLoggedIn"
        >
          <v-icon left>exit_to_app</v-icon>
          Выход
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
        <router-view></router-view>
    </v-content>
    <template v-if="error">
    <v-snackbar
            :multi-line="true"
            :timeout="5000"
            color="error"
            @input="closeError"
            :value="true"
    >
      {{error}}
      <v-btn
              dark
              text
              @click="closeError"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
    </template>
    <v-footer app>
      <v-spacer></v-spacer>
      &Тепловые приборы ОАО Изотерм</v-footer>
  </v-app></template>

<script>




export default {
    data () {
        return {
        drawer: false
    }
    },
    computed: {
       error () {
            return this.$store.getters.error
       },
        isUserLoggedIn () {
            return this.$store.getters.isUserLoggedIn
        },
        links () {
            if (this.isUserLoggedIn){
                return [
                    {title: 'Покупатели', icon: 'mdi-email', url: '/customers'},
                    {title: 'Товары', icon: 'list', url: '/grs'},
                    {title: 'Новая группа', icon: 'note_add', url: '/newProduct'},
                    {title: 'Заказы', icon: 'account_circle', url: '/orders'},
                ]
            }
            return [
                {title: 'Войти', icon: 'lock', url: '/login'},
                {title: 'Регистрация', icon: 'face', url: '/registration'},
            ]
        }
    },
    methods: {
        closeError () {
          this.$store.dispatch('clearError')
        },
        onLogout () {
            this.$store.dispatch('logoutUser')
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
  .pointer{
      cursor: pointer;
  }
</style>
