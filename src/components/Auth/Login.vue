<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md6>
                        <v-card class="elevation-20">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Войти</v-toolbar-title>
                             </v-toolbar>
                            <v-card-text>
                                <v-form
                                        ref="form"
                                        v-model="valid"
                                        validation
                                >
                                    <v-text-field
                                            prepend-icon="person"
                                            name="login"
                                            label="Логин"
                                            type="text"
                                            v-model="email"
                                            :rules="emailRules"
                                    ></v-text-field>
                                    <v-text-field
                                            prepend-icon="lock"
                                            name="password"
                                            label="Пароль"
                                            type="password"
                                            v-model="password"
                                            :rules="passwordRules"
                                            :c1ounter="6"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="primary"
                                        @click="onSubmit"
                                        :loading="loading"
                                        :disabled="!valid || loading"

                                >Войти</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        data: () => ({
            email:'',
            password:'',
            valid:false,
            emailRules: [
                v => !!v || 'Надо ввести E-mail',
                v => /.+@.+/.test(v) || 'Не верный E-mail'
            ],
            passwordRules: [
                v => !!v || 'Надо ввести пароль',
                v => (v && v.length>=6) || 'Длина пароля не меньше 6'
            ]
    }),
        computed: {
            loading () {
                return this.$store.getters.loading
            }
        },
        methods: {
        onSubmit () {
           if (this.$refs.form.validate()) {
               const user = {
                   email:  this.email,
                   password: this.password
               }
               this.$store.dispatch('loginUser',user)
                  .then(() => {this.$router.push ('/')})
                  .catch(()=> {})
           }

        },
        created () {
            if (this.$route.query['loginError']) {
                this.$store.dispatch('setError','Надо авторизоваться')
                }
            }
        }
    }
</script>

<style scoped>

</style>
