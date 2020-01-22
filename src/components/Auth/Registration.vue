<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md6>
                        <v-card class="elevation-20">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Регистрация</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form
                                        v-model="valid"
                                        ref="form"
                                        lazy-validation
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
                                            :counter="6"
                                            v-model="password"
                                            :rules="passwordRules"
                                    ></v-text-field>
                                    <v-text-field
                                            prepend-icon="lock"
                                            name="confirm-password"
                                            label="Повторить"
                                            type="password"
                                            :counter="6"
                                            v-model="confirmPassword"
                                            :rules="confirmPasswordRules"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="primary"
                                        @click="onSubmit"
                                        :loading="loading"
                                        :disabled="!valid || loading "
                                >Зарегистирироваться</v-btn>
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
            confirmPassword:'',
            valid:false,
            emailRules: [
                v => !!v || 'Надо ввести E-mail',
                v => /.+@.+/.test(v) || 'Не верный E-mail'
            ],
            passwordRules: [
                v => !!v || 'Надо ввести пароль',
                v => (v && v.length>=6) || 'Длина пароля не меньше 6'
            ],
            confirmPasswordRules: [
                v => !!v || 'Надо подтвердить пароль',
                v => (v && v.length>=6) || 'Длина пароля не меньше 6',
                v => v.value === v.password || 'Пароли должны совпадать'
            ]
        }),
        computed: {
          loading () {
              return this.$store.getters.loading
          }
        },
        methods: {
            onSubmit: function () {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password,
                        confirmPassword: this.confirmPassword,
                        eq: this.password === this.confirmPassword
                    }
                     this.$store.dispatch('registerUser', user)
                        .then(() => {this.$router.push('/')})
                        .catch(() => {})
                }
            }
        }
    }
</script>

<style scoped>

</style>
