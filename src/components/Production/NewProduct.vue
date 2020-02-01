<template>
    <v-container>
        <v-layout>
            <v-flex x12 sm6 offset-sm3>
            <h1 class="text--secondary mb-3">Добавить группу товаров</h1>
                <v-form
                        class="mb-3"
                        ref="form"
                        v-model="valid"
                >
                    <!--<v-text-field-->
                            <!--name="kod"-->
                            <!--label="Код"-->
                            <!--type="text"-->
                            <!--v-model="title"-->
                            <!--required-->
                            <!--:rules="[v=>!!v || 'Обязательное поле']"-->
                    <!--&gt;</v-text-field>-->
                    <v-text-field
                            name="name"
                            label="Новая группа"
                            type="text"
                            v-model="name"
                            required
                            :rules="[v=>!!v || 'Обязательное поле']"
                    ></v-text-field>
                    <v-textarea
                            name="description"
                            label="Описание"
                            type="text"
                            v-model="description"
                            required
                            :rules="[v=>!!v || 'Обязательное поле']"

                   ></v-textarea>
                </v-form>
                <v-layout row class="mb-3">
                    <v-flex x12>
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
                <!--<v-layout row>-->
                    <!--<v-flex x12>-->
                        <!--<v-switch-->
                                <!--label="Добавить в набор картинок?"-->
                                <!--v-model="promo"-->
                                <!--color="primary"-->
                        <!--&gt;</v-switch>-->
                    <!--</v-flex>-->
                <!--</v-layout>-->
                <v-layout row >
                    <v-flex x12>
                        <v-spacer></v-spacer>
                        <v-btn
                                :loading = "loading"
                                :disabled = "!valid || !image || loading"
                                class="success"
                                @click="createGr"
                        >
                            Записать
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    /* eslint-disable no-undef */

    export default {
        data: function () {
            return {
                id_1c: '',
                kod:'123',
                name: '',
                description: '',
                valid: false,
                image: null,
                imageSrc: ''
            }
        },
        computed: {
          loading () {
              return this.$store.getters.loading
          }
        },
        methods:{
            createGr() {
                if (this.$refs.form.validate() && this.image) {
                    const gr = {
                        id_1c: this.id_1c,
                        kod:this.kod,
                        name: this.name,
                        description: this.description,
                        image: this.image
                    }
                    this.$store.dispatch('createGr', gr)
                        .then(() => {
                            this.$router.push('/grList')
                        })
                        .catch(() =>{})
                }

            },
            triggerUpload () {
                this.$refs.fileInput.click()
            },
            onFileChange: function (event) {
                const file = event.target.files[0]
               const reader = new FileReader()
                reader.onload = e => {
                    this.imageSrc = e.target.result
                }
                reader.readAsDataURL(file)
                this.image = file
            }
        }

    }
</script>

<style scoped>

</style>
