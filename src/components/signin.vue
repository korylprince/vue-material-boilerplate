<template>
    <v-card width="100%" max-width="480px">
        <v-card-title primary-title>
            <div class="headline">Sign In</div>
        </v-card-title>

        <form novalidate @submit.prevent="do_authenticate(username, password)">
            <v-card-text>
                <v-text-field
                    label="Username"
                    v-model="username"
                    v-validate="'required'"
                    :error-messages="errors.collect('username')"
                    data-vv-name="username"
                    required>
                </v-text-field>

                <v-text-field
                    :type="show_password ? 'text' : 'password'"
                    :append-icon="show_password ? 'visibility_off' : 'visibility'"
                    @click:append="show_password = !show_password"
                    label="Password"
                    v-model="password"
                    v-validate="'required'"
                    :error-messages="errors.collect('password')"
                    data-vv-name="password"
                    required>
                </v-text-field>

                <span class="error--text" v-if="error">{{error}}</span>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit"
                       color="primary"
                       flat
                       :loading="is_loading"
                       :disabled="username === '' || password === ''"
                       >Sign In</v-btn>
            </v-card-actions>
        </form>

    </v-card>
</template>

<script>
import {mapState, mapMutations, mapGetters, mapActions} from "vuex"
import store from "../js/store.js"
export default {
    name: "app-signin",
    computed: {
        ...mapState({"error": "last_error"}),
        ...mapGetters(["is_loading"]),
    },
    data() {
        return {
            username: "",
            password: "",
            show_password: false,
        }
    },
    methods: {
        ...mapMutations(["UPDATE_ERROR"]),
        ...mapActions(["authenticate"]),
        async do_authenticate(username, password) {
            if (this.is_loading) {
                return
            }

            try {
                if (!(await this.$validator.validateAll())) {
                    return
                }
            } catch (err) {
                this.UPDATE_ERROR("Form validation error")
            }

            this.authenticate({username, password})
        },
    },
    beforeRouteEnter(to, from, next) {
        if (store.getters.signed_in) {
            next({name: "content"})
            return
        }
        next()
    },
}
</script>
