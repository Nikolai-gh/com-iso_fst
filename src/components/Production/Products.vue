<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-data-table
                        :headers="noms"
                        :items="characts"
                        item-key="name"
                        group-by="nom"
                        class="elevation-1"
                        show-group-by
                >
                <template v-slot:item.name="props">
                    <v-edit-dialog
                            :return-value.sync="props.item.name"
                            @save="save"
                            @cancel="cancel"
                            @open="open"
                            @close="close"
                    > {{ props.item.name }}
                        <template v-slot:input>
                            <v-text-field
                                    v-model="props.item.name"
                                    :rules="[rules.max25chars,rules.sgn]"
                                    label="Изменить"
                                    type="number"
                                    single-line
                                    counter
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>
                <template v-slot:item.kol="props">
                    <v-edit-dialog
                            :return-value.sync="props.item.kol"
                            large
                            persistent
                            @save="save"
                            @cancel="cancel"
                            @open="open"
                            @close="close"
                    >
                        <div>{{ props.item.kol }}</div>
                        <template v-slot:input>
                            <div class="mt-4 title">Обновить</div>
                        </template>
                        <template v-slot:input>
                            <v-text-field
                                    v-model="props.item.kol"
                                    :rules="[rules.max25chars,rules.sgn]"
                                    label="Изменить"
                                    type="number"
                                    single-line
                                    counter
                                    autofocus
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>
               </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        props: ['gr'],
        data () {
            return {
                snack: false,
                snackColor: '',
                snackText: '',
                rules: {
                    max25chars: v => v.length <= 4 || 'Так много у нас не заказывали!',
                    sgn: v => v.value < 0 || 'введите больше 0'}
           }},
            computed: {
            noms() {return this.$store.getters.noms},
            characts: function() {
                const id = this.gr.id
                return this.$store.getters.chById(id)
                //return this.$store.getters.characts
            }
        },
        methods: {
            save () {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Сохранено'
            },
            cancel () {
                this.snack = true
                this.snackColor = 'error'
                this.snackText = 'Отмена'
            },
            open () {
                this.snack = true
                this.snackColor = 'info'
                this.snackText = 'Диалог'
            },
            close () {
                console.log('Диалог закрыт')
            },
        },

    }
</script>
