<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-data-table
                        :headers="headers"
                        :items="customers"
                        sort-by="name"
                        class="elevation-1"
                >
                    <template v-slot:top>
                        <v-toolbar flat color="blue" dark>
                            <!--class="hd"-->
                            <v-toolbar-title> Контрагенты</v-toolbar-title>
                            <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="700px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" dark class="mb-2" v-on="on" @click="blankItem">Добавить</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.name" label="Наименование"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.kod" label="Код"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.tel" label="Телефон"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.mail" label="e-mail"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.adres" label="Адрес"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.inn" label="ИНН"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.kpp" label="КПП"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.urPhiz" label="ЮрФизЛицо"></v-text-field>
                                                </v-col>
                                           </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="close">Отменить</v-btn>
                                        <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
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
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                    </template>
                </v-data-table>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        data () {
            return {
                singleSelect: false,
                dialog: false,
                headers: [
                    {
                        text: 'Наименование',
                        align: 'left',
                        sortable: true,
                        value: 'name',
                    },
                    { text: 'Код', value: 'kod' },
                    { text: 'Телефон', value: 'tel' },
                    { text: 'e-mail', value: 'mail' },
                    { text: 'Адрес', value: 'adres' },
                    { text: 'ИНН', value: 'inn' },
                    { text: 'КПП', value: 'kpp' },
                    { text: 'ЮрФиз', value: 'urPhiz' },
                    { text: 'Исправить', value: 'action', sortable: false },
                ],
                customers: [],
                editedIndex: -1,
                editedItem: {
                    name: '',
                    kod: '',
                    tel: '',
                    mail: '',
                    adres: '',
                    inn: '',
                    kpp: '',
                    urPhiz:'',
               },
                defaultItem: {
                    name: '',
                    kod: '',
                    tel: '',
                    mail: '',
                    adres: '',
                    inn: '',
                    kpp: '',
                    urPhiz:'',
                },
            }},
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Новый контрагент' : 'Редактировать'
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
                this.customers = [
                    {
                        name: 'ОАО Теплотехника',
                        kod: '000000159',
                        tel: '+7(921)-658-5681',
                        mail: 'inbox@teplotech.ru',
                        adres: 'Санкт-Петербург, ул. Магнитогорская, д.14',
                        inn: '781263569',
                        kpp: '7853698742',
                        urPhiz: 'Юрлицо',
                    },
                    {
                        name: 'ОАО Теплострой',
                        kod: '000000160',
                        tel: '+7(904)-2748-4568',
                        mail: 'inbox@teplostroy.ru',
                        adres: 'Санкт-Петербург, ул. Железноводская, д.15',
                        inn: '7856872349',
                        kpp: '788591234',
                        urPhiz: 'Юрлицо',
                    },
                    {
                        name: 'ОАО Стройпроект',
                        kod: '000000161',
                        tel: '+7(921)-843-3025',
                        mail: 'inbox@stroyproect.ru',
                        adres: 'Санкт-Петербург, ул. Садовая, д.14',
                        inn: '781263569',
                        kpp: '7853698742',
                        urPhiz: 'Юрлицо',
                    },
                ]
            },

            editItem (item) {
                this.editedIndex = this.customers.indexOf(item)
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
                const index = this.customers.indexOf(item)
                confirm('Вы хотите удалить контрагента?') && this.customers.splice(index, 1)
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
                    Object.assign(this.customers[this.editedIndex], this.editedItem)
                } else {
                    this.customers.push(this.editedItem)
                }
                this.close()
            },
        }
    }
</script>

<style scoped>
    .hd{
        position: absolute;
        left: 50%;
        top: 5px;
        transform: translate(50%, 0);
    }
</style>
