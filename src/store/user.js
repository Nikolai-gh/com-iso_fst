/* eslint-disable no-const-assign */
import * as fb from 'firebase/app'


class User {
    constructor (id) {
        this.id = id
    }
}
export default {
    state: {
        user: null
    },
    mutations: {
        setUser (state, payload) {
           state.user = payload
        }
    },
    actions: {
        registerUser: async function ({commit}, {email, password}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const user = await fb.auth().createUserWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
             }
            catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        loginUser: async function({commit},{email,password}) {
            commit('clearError')
            commit('setLoading',true)
            try {
                const user= await fb.auth().signInWithEmailAndPassword(email, password)
                if(user)
                // this.$store.dispatch('autoLoginUser',user)
                commit('setUser', new User(user.uid))
                commit('setLoading',false)
            }
            catch (error) {
                commit('setLoading', false)
                commit('setError',error.message)
                throw error
            }
        },
        autoLoginUser: function ({commit}, payload) {
            // console.log('В user.js actions')
            // console.log(payload.uid)
            commit('setUser', new User (payload.uid))
            },
        logoutUser: function ({commit}) {
            fb.auth().signOut()
            commit('setUser', null)
        }

    },
    getters: {
        user (state) {
            return state.user
        },
        isUserLoggedIn: function (state) {
            return state.user !== null
        }
    }
}
