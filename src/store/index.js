import Vue from 'vue'
import Vuex from 'vuex'
import user from'./user'
import shared from './shared'
import gnoms from './gnoms';
import noms from './noms';
import grs from './grs';


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,gnoms, noms, grs, shared
    }
})

