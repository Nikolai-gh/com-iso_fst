
export default ({
    state: {
        gnoms : [
            {
                id_1c: '',
                kod:'123',
                name:'Новотерм',
                description:'Приборы новотерм',
                del: false,
                image: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
            },
            {
                id_1c: '',
                kod:'124',
                name:'Изотерм',
                description:'Приборы изотерм',
                del: false,
                image: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
            },
            {
                id_1c: '',
                kod:'125',
                name:'Гольфстрим',
                description:'Приборы гольфстрим',
                del: false,
                image: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
            },
        ]

    },
    mutations: {
    },
    actions: {
    },
    getters: {
        gnoms (state) {
            return state.gnoms
        },
        // gnByKod (state) {
        //     return gnKod=>{
        //         return state.gnoms.find(gnom => gnom.kod===gnKod)
        //     }
        // }
    }

})
