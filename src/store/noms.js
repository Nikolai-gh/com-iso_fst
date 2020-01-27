
export default ({
    state: {
        noms: [
            {
                text: 'Тепловые приборы',
                align: 'left',
                value: 'name',
            },
            { text: 'Цена', value: 'cena' },
            { text: 'Длина', value: 'l' },
            { text: 'Высота', value: 'h' },
            { text: 'Глубина', value: 'b' },
            { text: 'Цвет', value: 'col' },
            { text: 'Соединение', value: 'con' },
            { text: 'Описание', value: 'description' },
            { text: 'Номенклатура', value: 'nom' },
        ],
        characts: [
            {
                kod: '000000125',
                name: '615, Л, 1.2, ВН, 9016',
                cena: 4350,
                l: 1500,
                h: 600,
                b: 200,
                col: '9016',
                con: 'Левое',
                nom: 'Изотерм РКН',
                gr: '124',
            },
            {
                kod: '000000125',
                name: '615, П, 1.2, ВН, 9016',
                cena: 1350,
                l: 1500,
                h: 600,
                b: 200,
                col: '9016',
                con: 'Левое',
                nom: 'Изотерм РКН',
                gr: '123',
            },
            {
                kod: '000000125',
                name: '618, Л, 1.2, ВН, 9016',
                cena: 4350,
                l: 1500,
                h: 600,
                b: 200,
                col: '9016',
                con: 'Левое',
                nom: 'Изотерм РКН',
                gr: '123',
            },
            {
                kod: '000000125',
                name: '412, Л, 1.2, ВН, 9006',
                cena: 2350,
                l: 1500,
                h: 600,
                b: 200,
                col: '9016',
                con: 'Левое',
                nom: 'Изотерм РКНН',
                gr: '125',
            },
            {
                kod: '000000125',
                name: '510, Л, 1.2, ВН, 9016',
                cena: 4350,
                l: 1500,
                h: 600,
                b: 200,
                col: '9016',
                con: 'Левое',
                nom: 'Изотерм РКНН',
                gr: '123',
            },
            {
                kod: '000000125',
                name: '225, П, 1.2, ВН, 9016',
                cena: 4350,
                l: 1500,
                h: 600,
                b: 200,
                col: '9016',
                con: 'Левое',
                nom: 'Изотерм РКНН',
                gr: '124',
            },
            {
                kod: '000000125',
                name: '315, П, 1.2, ВН, 9016',
                cena: 4350,
                l: 1500,
                h: 600,
                b: 200,
                col: '9016',
                con: 'Левое',
                nom: 'Изотерм РКНН',
                gr: '123',
            },
            {
                kod: '000000125',
                name: '115, Л, 1.2, ВН, 9016',
                cena: 4350,
                l: 1500,
                h: 600,
                b: 200,
                col: '9016',
                con: 'Левое',
                nom: 'Изотерм РКННД',
                gr: '123',
            },
            {
                kod: '000000125',
                name: '335, П, 1.2, ВН, 9016',
                cena: 4350,
                l: 1500,
                h: 600,
                b: 200,
                col: '9016',
                con: 'Левое',
                nom: 'Изотерм РКННД',
                gr: '125',
            },
            {
                kod: '000000125',
                name: '435, Л, 1.2, ВН, 9016',
                cena: 4350,
                l: 1500,
                h: 600,
                b: 200,
                col: '9016',
                con: 'Левое',
                nom: 'Изотерм РКННД',
                gr: '125',
            },
        ],
     },
    mutations: {
    },
    actions: {
     },
    getters: {
        noms (state) {
            return state.noms
        },
        characts (state) {
            return state.characts
        },
        //  grcharacts (state) {
        //      return state.characts //.filter(charact=>{ return  charact.gr=gr})
        // },
         gnByKod (state) {
             return gnKod => {
                 return state.characts.find(characts => characts.kod === gnKod)
             }
         }
    }

})
