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
                ></v-data-table>
            </v-flex>
        </v-layout>
        <!--<v-spacer></v-spacer>-->
        <!--<v-container v-slot:activator="{ on }">-->
            <!--<v-btn color="primary" dark class="mb-2" v-on="on" @click="blankItem">Добавить</v-btn>-->
        <!--</v-container>-->
    </v-container>
</template>

<script>

    export default {
        computed: {
            noms() {return this.$store.getters.noms},
            characts() {return this.$store.getters.characts}
        }
    }
</script>
