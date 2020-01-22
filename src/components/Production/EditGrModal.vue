<template>
    <v-dialog width="400px" v-model="modal">
        <v-btn class="warning" flat slot="activator"> Изменить </v-btn>

        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex sx12>
                        <v-card-title>
                            <h2 class="text--primary">Редактирование номенклатуры</h2>
                        </v-card-title>

                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex sx12>

                         <!--<div class="text-xs-center">-->
                            <!--<v-progress-circular-->
                                    <!--indeterminate-->
                                    <!--:size="100"-->
                                    <!--:width="4"-->
                                    <!--color="purple"-->
                            <!--&gt;</v-progress-circular>-->

                        <!--</div>-->


                        <v-card-text>
                            <v-text-field
                                    name="name"
                                    label="Наименование"
                                    type="text"
                                    v-model="editedName"
                            ></v-text-field>
                            <v-text-field
                                    name="description"
                                    label="Описание"
                                    type="text"
                                    v-model="editedDescription"
                            ></v-text-field>
                        </v-card-text>

                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row class="mb-3">
                    <v-flex sx12>
                            <v-spacer></v-spacer>
                            <v-btn
                                    @click="triggerUpload"
                                    class="warning"
                            >
                                Вставить картинку
                                <v-icon right dark>cloud_upload</v-icon>
                                <input
                                        ref="fileInput"
                                        type="file"
                                        style="display: none"
                                        accept="image/*"
                                        @change="onFileChange"
                                >
                            </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex x12>
                        <img :src="imageSrc" height="100" v-if = "imageSrc">
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex sx12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="warning" flat @click="onCancel"> Отменить </v-btn>
                            <v-btn class="success" flat @click="onSave"> Сохранить </v-btn>
                        </v-card-actions>

                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default{
        props: ['gr'],
        data () {
            return{
                modal: false,
                valid: false,
                image: null,
                editedDescription: this.gr.description,
                editedName: this.gr.name,
                imageSrc: this.gr.imageSrc
            }
        },
        computed:{
            loading () {
                return this.$store.getters.loading
            }
        },

        methods: {
            onCancel () {
                this.editedDescription = this.gr.description
                this.editedName = this.gr.name
                this.imageSrc = ''
                this.modal = false
                this.image = null
            },
            onSave () {
                if (this.editedDescription !== '' && this.editedName !== '' || this.$refs.form.validate() && this.imageSrc) {
                   this.$store.dispatch('updateGr', {
                        name: this.editedName,
                       description: this.editedDescription,
                       imageSrc: this.imageSrc,
                       image: this.image,
                       id: this.gr.id
                    })
                    this.modal=false
                }
            },
            triggerUpload () {
                this.$refs.fileInput.click()
            },
            onFileChange: function (event) {
                const file = event.target.files[0]
                const reader = new FileReader()
                reader.onload = e => {
                    this.imageSrc = reader.result
                }
                reader.readAsDataURL(file)
                this.image = file
            }
        }
    }
</script>
