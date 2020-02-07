<template>
    <v-container>
         <v-layout row>
            <v-flex xs12>
                <v-data-table
                        :headers="headers"
                        :items="orders"
                        sort-by="custom"
                        class="elevation-1"
                >
                     <template v-slot:top>
                         <v-toolbar flat color="blue" dark>
                             <!--class="hd"-->
                             <v-toolbar-title> Заказы</v-toolbar-title>
                             <v-divider
                                     class="mx-4"
                                     inset
                                     vertical
                             ></v-divider>
                         <v-spacer></v-spacer>
                             <!--<v-card-actions>-->
                             <!--<app-order :order="order"></app-order>-->
                             <!--</v-card-actions>-->
                             <v-dialog v-model="dialog" max-width="700px">
                             <template v-slot:activator="{ on }">
                                 <!--<app-order :order="order"></app-order>-->
                                 <v-btn color="primary" dark class="mb-2" to="Order">Добавить</v-btn>
                                 <!--<v-btn color="primary" dark class="mb-2" v-on="on" @click="blankItem">Добавить</v-btn>-->
                                 <!--<v-btn color="primary" dark class="mb-2" v-on="on" @click="blankItem">Добавить</v-btn>-->

                             </template>
                             <v-card>
                                 <v-card-title>
                                     <span class="headline">{{ formTitle }}</span>
                                 </v-card-title>

                                 <v-card-text>
                                     <v-container>
                                         <v-row>
                                             <v-col cols="12" sm="6" md="4">
                                                 <v-text-field v-model="editedItem.kod" label="Номер"></v-text-field>
                                             </v-col>
                                             <v-col cols="12" sm="6" md="4">
                                                 <v-text-field v-model="editedItem.custom" label="Заказчик"></v-text-field>
                                             </v-col>
                                             <v-col cols="12" sm="6" md="4">
                                                 <v-text-field v-model="editedItem.date_ord" label="Дата"></v-text-field>
                                             </v-col>
                                             <v-col cols="12" sm="6" md="4">
                                                 <v-text-field v-model="editedItem.date_red" label="Исполнить к"></v-text-field>
                                             </v-col>
                                             <v-col cols="12" sm="6" md="4">
                                                 <v-text-field v-model="editedItem.date_pay" label="Дата_оплаты"></v-text-field>
                                             </v-col>
                                             <v-col cols="12" sm="6" md="4">
                                                 <v-text-field v-model="editedItem.adres_del" label="Адрес_доставки"></v-text-field>
                                             </v-col>
                                             <v-col cols="12" sm="6" md="4">
                                                 <v-text-field v-model="editedItem.contact" label="Телефони"></v-text-field>
                                             </v-col>
                                             <v-col cols="12" sm="6" md="4">
                                                 <v-text-field v-model="editedItem.contact_lico" label="Контакт-лицо"></v-text-field>
                                             </v-col>
                                             <v-col cols="12" sm="6" md="4">
                                                 <v-text-field v-model="editedItem.summa" label="Сумма"></v-text-field>
                                             </v-col>
                                             <v-col cols="12" sm="6" md="4">
                                                 <v-text-field v-model="editedItem.otvetstv" label="Ответственный"></v-text-field>
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
                        <!--<v-btn color="primary" @click="initialize">Reset</v-btn>-->
                    </template>
                </v-data-table>

            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>

    // import Order from "./Order";

    export default {
        data () {
            return {
                // singleSelect: false,
                dialog: false,
                headers: [
                        {
                            text: 'Номер',
                            align: 'left',
                            sortable: true,
                            value: 'kod',
                        },
                        { text: 'Заказчик', value: 'custom' },
                        { text: 'Дата', value: 'date_ord' },
                        { text: 'Исполнить к', align: 'center',value: 'date_red' },
                        { text: 'Дата_оплаты', value: 'date_pay' },
                        { text: 'Адрес_доставки', value: 'adres_del' },
                        { text: 'Телефон', value: 'contact' },
                        { text: 'Контакт-лицо', value: 'contact_lico' },
                        { text: 'Сумма', value: 'summa' },
                        { text: 'Ответственный', value: 'otvetstv' },
                        { text: 'Исправить', value: 'action', sortable: false },
                    ],
                orders: [],
                editedIndex: -1,
                editedItem: {
                    kod: '',
                    custom: '',
                    date_ord: '',
                    date_red: '',
                    date_pay: '',
                    adres_del: '',
                    contact: '',
                    contact_lico: '',
                    summa: 0,
                    otvetstv: '',
                },
                defaultItem: {
                    kod: '',
                    custom: '',
                    date_ord: '',
                    date_red: '',
                    date_pay: '',
                    adres_del: '',
                    contact: '',
                    contact_lico: '',
                    summa: 0,
                    otvetstv: '',
                },
            }},
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Новый заказ' : 'Редактировать заказ'
            },
            order: function () {
                const item = this.item;
                return Object.assign({}, item)
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            },           editItem (item) {
                this.editedIndex = this.orders.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                this.orders = [
                    {
                        kod: '000000245',
                        custom: 'ООО Теплоприбор',
                        date_ord: '01.01.2020',
                        date_red: '01.02.2020',
                        date_pay: '01.01.2020',
                        adres_del: 'Санкт-Петербург, ул. Правды, д. 14',
                        contact: '+7(921)3289-24',
                        contact_lico: 'Иванов И.И.',
                        summa: 167205.25,
                        otvetstv: 'Дубалазова О.В.',
                    },
                    {
                        kod: '000000246',
                        custom: 'ОАО Спецстрой',
                        date_ord: '15.01.2020',
                        date_red: '18.02.2020',
                        date_pay: '20.01.2020',
                        adres_del: 'Санкт-Петербург, ул. Салова, д. 10',
                        contact: '+7(921)5696-14',
                        contact_lico: 'Петров П.И.',
                        summa: 20018.01,
                        otvetstv: 'Пинтелин С.',
                    },
                ]
            },


            plusItem (item) {
                this.editedItem = Object.assign({}, item)
                this.editedIndex = -1
                this.defaultItem = Object.assign({}, item)
                this.dialog = true
            },
            deleteItem (item) {
                const index = this.orders.indexOf(item)
                confirm('Вы хотите удалить заказ?') && this.orders.splice(index, 1)
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
                    Object.assign(this.orders[this.editedIndex], this.editedItem)
                } else {
                    this.orders.push(this.editedItem)
                }
                this.close()
            },
        },
        // components: {
        //     appOrder: Order
        // }
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
