<template>
    <form novalidate @submit.prevent="do_authenticate(username, password)">
        <md-card>
            <md-card-header>
                <div class="md-title">Sign In</div>
            </md-card-header>

            <md-card-content>

                <md-field :class="{'md-invalid': errors.has('username')}">
                    <label>Username</label>
                    <md-input v-model="username" name="username" v-validate="'required'"></md-input>
                    <span class="md-error">{{errors.first('username')}}</span>
                </md-field>

                <md-field :class="{'md-invalid': errors.has('password')}">
                    <label>Password</label>
                    <md-input type="password" v-model="password" name="password" v-validate="'required'"></md-input>
                    <span class="md-error">{{errors.first('password')}}</span>
                </md-field>

                <span class="md-error" v-if="error">{{error}}</span>

            </md-card-content>

            <md-card-actions>
                <md-button type="submit" class="md-primary"
                    :disabled="is_loading || username == '' || password == ''">
                    <span v-show="!is_loading">Sign In</span>
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
    </form>
</template>

<script>
import {mapState, mapMutations, mapGetters, mapActions} from "vuex"
import store from "../js/store.js"
export default {
    name: "app-signin",
    computed: {
        ...mapState({"error": "last_error"}),
        ...mapGetters(["is_loading"])
    },
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        ...mapMutations(["UPDATE_ERROR"]),
        ...mapActions(["authenticate"]),
        async do_authenticate(username, password) {
            if (this.is_loading) { return }

            try {
                if (!(await this.$validator.validateAll())) { return }
            } catch (err) {
                this.UPDATE_ERROR("Form validation error")
            }

            this.authenticate({username, password})
        }
    },
    beforeRouteEnter(to, from, next) {
        if (store.getters.signed_in) {
            next({name: "content"})
            return
        }
        next()
    }
}
</script>
