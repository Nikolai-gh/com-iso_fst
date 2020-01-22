<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-form v-model="valid" ref="form" validation>
                           <v-toolbar flat color="blue" dark>
                                <!--class="hd"-->
                                <v-toolbar-title flex>
                                    Тепловые приборы серии {{gnom.name}}
                                </v-toolbar-title>
                                <v-divider
                                        class="mx-12"
                                        inset
                                        vertical
                                ></v-divider>
                             </v-toolbar>

                    <v-container>
                    <v-row>
                        <!--<v-col cols="12" sm="6" md="4">-->
                        <!--<v-text-field-->
                        <!--name="kod"-->
                            <!--label="Код"-->
                            <!--type="text"-->
                            <!--v-model="kod1"-->
                            <!--required-->
                            <!--:rules="[v=>!!v || 'Обязательное поле']"-->
                    <!--&gt;</v-text-field>-->
                        <!--</v-col>-->
                        <!--<v-col cols="12" sm="6" md="4">-->
                        <!--<v-text-field-->
                            <!--name="name"-->
                            <!--label="Наименование"-->
                            <!--type="text"-->
                            <!--v-model="title"-->
                            <!--required-->
                            <!--:rules="[v=>!!v || 'Обязательное поле']"-->
                    <!--&gt;</v-text-field>-->
                        <!--</v-col>-->
                        <v-col cols="12" sm="6" md="4">
                        <v-btn class="warning">
                            Изменить кртинку
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                        </v-col>
                    </v-row>
                    <v-img
                            :src="gnom.image"
                            max-width="250"
                            max-height="150"

                    > </v-img>
                    </v-container>
                    <v-container>
                        <v-data-table
                                :headers="headers"
                                :items="charcs"
                                sort-by="custom"
                                class="elevation-1"
                        >

                        <template v-slot:item.action="{ item }">
                            <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                    small
                                    @click="plusItem(item)"
                            >
                                note_add
                            </v-icon>
                            <v-icon
                                    small
                                    @click="deleteItem(item)"
                            >
                                delete
                            </v-icon>
                        </template>
                        </v-data-table>
                    </v-container>
                  </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        props: ['kod'],
        data () {
            return {
                valid: false,
                kod1: this.kod,
                title: this.name,
                singleSelect: false,
                dialog: false,
                headers: [
                    {
                        text: 'Наименование',
                        align: 'left',
                        sortable: true,
                        value: 'name',
                    },
                    { text: 'Цена', value: 'cena' },
                    { text: 'Длина', value: 'l' },
                    { text: 'Высота', value: 'h' },
                    { text: 'Глубина', value: 'b' },
                    { text: 'Цвет', value: 'col' },
                    { text: 'Соединение', value: 'con' },
                    { text: 'Описание', value: 'description' },
                ],
                charcs: [],
                editedIndex: -1,
                editedItem: {
                    kod: '',
                    name: '',
                    cena: 0,
                    l: 0,
                    h: 0,
                    b: 0,
                    col: '9096',
                    con: '',
                    description: '',
                },
                defaultItem: {
                    kod: ''   ,
                    name: '',
                    cena: 0,
                    l: 0,
                    h: 0,
                    b: 0,
                    col: '9096',
                    con: '',
                    description: '',
                },
            }},
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Новый заказ' : 'Редактировать заказ'
            },
            gnom () {
                const kod=this.kod
                return this.$store.getters.gnByKod(kod)
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                this.charcs = [
                    {
                        kod: '000000125',
                        name: '615, Л, 1.2, ВН, 9016',
                        cena: 4350,
                        l: 1500,
                        h: 600,
                        b: 200,
                        col: '9016',
                        con: 'Левое',
                        description: 'Изотерм РКН',
                    },
                    {
                        kod: '000000125',
                        name: '615, П, 1.2, ВН, 9016',
                        cena: 4350,
                        l: 1500,
                        h: 600,
                        b: 2000,
                        col: '9016',
                        con: 'Правое',
                        description: 'Изотерм РКН',
                    },
                ]
            },

            editItem (item) {
                this.editedIndex = this.charcs.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            plusItem (item) {
                this.editedItem = Object.assign({}, item)
                this.editedIndex = -1
                this.defaultItem = Object.assign({}, item)
                this.dialog = true
            },
            deleteItem (item) {
                const index = this.charcs.indexOf(item)
                confirm('Вы хотите удалить этот типоразмер?') && this.charcs.splice(index, 1)
            },
            blankItem () {
                this.editedItem = Object.assign({}, -1)
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.charcs[this.editedIndex], this.editedItem)
                } else {
                    this.charcs.push(this.editedItem)
                }
                this.close()
            },
        }
    }
</script>
