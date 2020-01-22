<template>
    <v-container>
        <v-layout v-if="!loading && grs.length !== 0">
            <v-flex x12 sm8 offset-sm3>
                <h1 class="text--secondary mb-3" >Тепловые приборы</h1>

                <v-card
                        class="elevation-10 mb-2"
                        v-for="gr in grs"
                        :key="gr.id"
                >
                    <v-layout row>
                        <v-flex xs-4>
                            <v-img
                                :src="gr.imageSrc"
                                height="160px"
                                class="black--text"
                            >
                             </v-img>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                    <v-flex xs-12>
                            <v-card-text>
                                <h2 class="text--primary"> {{gr.name}}</h2>
                                <p>{{gr.description}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        class="info"
                                        :to="'/gr/'+gr.id"
                                > Открыть</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <!--<v-layout v-else-if="!loadind && Grs.length === 0">-->
        <v-layout v-else-if="!loadind && grs.length === 0">
            <v-flex xs12 class="text-xs-center">
                <h1 class="text--primary"> У вас нет заказов (карзина заказов пуста)</h1>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                        indeterminate
                        :size="100"
                        :width="4"
                        color="purple"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed:{
            grs () {
                return this.$store.getters.grs

            },
            loading () {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>

</style>
