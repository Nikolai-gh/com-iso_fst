import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from '@/router/index'
import store from './store'
import BuyModalComponent from '@/components/Shared/BuyModal'
import * as fb from 'firebase/app'
import 'firebase'
import Vuetify from 'vuetify'


Vue.use(Vuetify)
Vue.component('app-buy-modal',BuyModalComponent)
Vue.config.productionTip = false

new Vue({
        router,
        store,
        render: h=>h(App),
        created() {
            fb.initializeApp({
                apiKey: "AIzaSyCbgSUUeoibpg1aUynss3y58OKhjxSoe6k",
                authDomain: "com-iso.firebaseapp.com",
                databaseURL: "https://com-iso.firebaseio.com",
                projectId: "com-iso",
                storageBucket: "com-iso.appspot.com",
                messagingSenderId: "28595371764",
                appId: "1:28595371764:web:98ff49232677f1ef26a8a1",
                measurementId: "G-N2DZJEQDH1"
            })
            fb.auth().onAuthStateChanged(user => {
                if(user)
                    this.$store.dispatch('autoLoginUser',user)
            })
            this.$store.dispatch('fetchGrs')
        }
    }
    ).$mount('#app')
