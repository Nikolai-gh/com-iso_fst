<template>
    <v-container>
        <v-layout row>
            <v-flex x12>
                <v-card v-if="!loading">
                    <v-img
                            :src="gr.imageSrc"
                            height="400px"
                    ></v-img>
                    <v-card-text>
                        <h1 class="text--primary"> {{gr.name}} </h1>
                        <p> {{gr.description}} </p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <app-edit-gr-modal :gr="gr"></app-edit-gr-modal>
                        <app-buy-modal :gr="gr"></app-buy-modal>
                    </v-card-actions>
                    <v-spacer></v-spacer>
                    <app-product></app-product>
                </v-card>
                <div v-else class="text-xs-center">
                    <v-progress-circular
                            indeterminate
                            :size="100"
                            :width="4"
                            color="purple"
                    ></v-progress-circular>

                </div>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>

    import Product from './Product.vue'
    import EditGrModal from './EditGrModal.vue'
    export default {
        props: ['id'],
        computed: {
            gr: function () {
                const id = this.id
                return this.$store.getters.grById(id)
            },
            loading () {
                return this.$store.getters.loading
            },
            // noms() {return this.$store.getters.noms},
            // characts() {
            //     console.log(this.$store.getters.characts)
            //     return this.$store.getters.characts}
        },
        components: {
            appEditGrModal: EditGrModal,
            appProduct: Product
        }
    }
</script>

<style scoped>

</style>
