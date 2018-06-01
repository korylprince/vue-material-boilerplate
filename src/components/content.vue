<template>
    <md-card>
        <md-card-header>
            <div class="md-title">Hello!</div>
        </md-card-header>

        <md-card-content>
            <p>Hello, {{username}}!</p>
            <p v-if="thing">Thing: {{thing}}</p>
        </md-card-content>

        <md-card-actions>
            <md-button class="md-accent">Cancel</md-button>
            <md-button class="md-primary" :disabled="is_loading" @click="get_thing">
                <span v-show="!is_loading">Get Thing</span>
                <md-progress-spinner
                    class="app-spinner"
                    v-if="is_loading"
                    md-mode="indeterminate"
                    :md-diameter="20"
                    :md-stroke="2"
                    ></md-progress-spinner>
            </md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
import {mapState, mapGetters} from "vuex"
import AuthorizedMixin from "./authorized-mixin.js"
export default {
    name: "app-content",
    mixins: [AuthorizedMixin],
    computed: {
        ...mapState(["username", "thing"]),
        ...mapGetters(["is_loading"])
    },
    methods: {
        get_thing() {
            if (this.is_loading) { return }
            this.$store.dispatch("get_thing")
        }
    }
}
</script>

<style lang="stylus" scoped>
</style>
