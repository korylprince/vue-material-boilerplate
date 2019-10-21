<template>
    <v-card width="100%" max-width="600px">
        <v-card-title primary-title>
            <div class="headline">Hello!</div>
        </v-card-title>

        <v-card-text>
            <p>Hello, {{username}}!</p>
            <p v-if="thing">Thing: {{thing}}</p>
        </v-card-text>

        <v-spacer></v-spacer>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" text>Cancel</v-btn>
            <v-btn color="primary" text :loading="is_loading" @click="do_get_thing">Get Thing</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex"
import AuthorizedMixin from "./authorized-mixin.js"
export default {
    name: "app-content",
    mixins: [AuthorizedMixin],
    computed: {
        ...mapState(["username", "thing"]),
        ...mapGetters(["is_loading"]),
    },
    methods: {
        ...mapActions(["get_thing"]),
        do_get_thing() {
            if (this.is_loading) {
                return
            }
            this.get_thing()
        },
    },
}
</script>
