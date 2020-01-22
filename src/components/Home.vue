<template>
    <div v-if="!loading">
        <v-container fluid>
            <v-layout row>
                <v-flex sx12>
                    <v-carousel>
                        <v-carousel-item
                                v-for="gr in grs"
                                :key="gr.id"
                                :src="gr.imageSrc"
                        >
                            <div class="equip">
                                <v-btn class="error" :to="'/gr/'+gr.id">{{gr.name}} </v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex
                        sx12
                        sm6
                        md4
                        v-for="gr in grs"
                        :key="gr.id"
                >

                    <v-card
                            class="mx-auto"
                            max-width="600"
                    >
                        <v-img
                                height="200px"
                                :src="gr.imageSrc"
                                aspect-ratio="2.75"
                        ></v-img>
                            <div class="eqs"></div>
                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="headline mb-0">{{gr.name}}</h3>
                                        <v-btn class="error" :to="'/gr/'+gr.id">{{gr.name}} </v-btn>
                                        <div> {{gr.description }} </div>
                                    </div>
                                </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat :to="'/gr/'+gr.id" >Открыть</v-btn>
                            <app-buy-modal></app-buy-modal>
                        </v-card-actions>
                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else>
        <v-container>
            <v-layout>
                <v-flex xs12 class="text-xs-center" pt="5">
                    <v-progress-circular
                            indeterminate
                            :size="100"
                            :width="4"
                            color="purple"
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>

    export default {
        computed: {

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
    .equip {
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translate(-50%,0);
    }
    .eqs{
        position: absolute;
        bottom: 0px;
    }

</style>
