<template>
    <v-card width="100%" max-width="600px">
        <v-card-title primary-title>
            <div class="headline">Hello!</div>
        </v-card-title>

        <v-card-text>
            <p>Hello, {{display_name}}!</p>
            <p v-if="thing">Thing: {{thing}}</p>
        </v-card-text>

        <v-spacer></v-spacer>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" text>Cancel</v-btn>
            <v-btn color="primary" text :loading="_loading" @click="do_get_thing">Get Thing</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from "vuex"
import AuthorizedMixin from "./authorized-mixin.js"
import api from "../js/api.js"
export default {
    name: "app-dashboard",
    mixins: [AuthorizedMixin],
    data() {
        return {
            thing: null,
        }
    },
    computed: {
        ...mapState(["display_name"]),
        ...mapGetters(["is_loading"]),
        _loading() {
            return this.is_loading(api.get_thing)
        },
    },
    methods: {
        ...mapMutations(["UPDATE_ERROR"]),
        ...mapActions(["api_action"]),
        async do_get_thing() {
            if (this._loading) {
                return
            }
            try {
                const thing = (await this.api_action({action: api.get_thing, params: []})).thing
                this.thing = thing
            } catch (err) {
                if (err.response !== null && err.response.status !== 401) {
                    this.UPDATE_ERROR(`Error getting thing: ${JSON.stringify(err.response)}`)
                }
            }
        },
    },
}
</script>
