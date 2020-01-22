/* eslint-disable no-undef,no-unused-vars */
import * as fb from 'firebase'

class Gr {
    constructor(id_1c='', kod='123', name, description, imageSrc='', id=null){
        this.id_1c=id_1c
        this.kod=kod
        this.name=name
        this.description=description
        this.imageSrc=imageSrc
        this.id=id
    }
}
export default {
    state: {
        grs: []
    },
    mutations: {
        createGr (state,payload) {
            state.grs.push(payload)
        },
        loadGrs (state, payload){
            state.grs=payload
        },
        updateGr (state, {name, description, imageSrc, id}) {
            const gr = state.grs.find(a => {
                return a.id === id
            })
            gr.name=name
            gr.description=description
            gr.imageSrc=imageSrc
        }
    },
    actions: {
        async createGr ({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true)
            const image=payload.image
            try {
                const newGr = new Gr(
                    payload.id_1c,
                    payload.kod,
                    payload.name,
                    payload.description,
                    payload.imageSrc,
                    ''
                )
                const gr = await fb.database().ref('grs').push(newGr)
                const imageExt=image.name.slice(image.name.lastIndexOf('.'))

                const fileData = await fb.storage().ref(`grs/${gr.key}.${imageExt}`).put(image)
                const imageSrc = await fileData.ref.getDownloadURL()
                await fb.database().ref('grs').child(gr.key).update({imageSrc})
                commit('setLoading', false)
                commit('createGr', {
                    newGr,
                    id: gr.key,
                    imageSrc
                })
            }
            catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }

        },
        async fetchGrs ({commit}) {
            commit('clearError')
            commit('setLoading', true)
            const resultGrs = []
            try {
                const fbVal = await fb.database().ref('grs').once('value')
                const grs = fbVal.val()
                Object.keys(grs).forEach(key=>{
                    const gr=grs[key]
                    resultGrs.push(new Gr(gr.id_1c,gr.kod,gr.name,gr.description,gr.imageSrc,key))
                })
                commit('loadGrs',resultGrs)
                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async updateGr ({commit},{name, description, imageSrc, image, id}) {
            commit ('clearError')
            commit ('setLoading', true)

            try {
                 if (image!==null)
                {
                    const imageExt=image.name.slice(image.name.lastIndexOf('.'))

                    const fileData = await fb.storage().ref(`grs/${id}.${imageExt}`).put(image)
                    imageSrc = await fileData.ref.getDownloadURL()}
                console.log(id)
                console.log(name)
                await fb.database().ref('grs').child(id).update({
                    name,description, imageSrc
                })
                commit('updateGr', {
                    name, description, imageSrc, id
                })
                commit ('setLoading', false)
            } catch (error) {
                commit ('setError', error.message)
                commit ('setLoading', false)
                throw error
            }
        }

    },
    getters: {
        grs (state) {
            return state.grs
        },
        grById (state) {
            return grId => {
                return state.grs.find(gr => gr.id === grId)
            }
        }
    }
}
