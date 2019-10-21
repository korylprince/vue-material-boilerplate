<template>
    <v-card width="100%" max-width="480px">
        <v-card-title primary-title>
            <div class="headline">Sign In</div>
        </v-card-title>

        <form novalidate @submit.prevent="do_authenticate(username, password)">
            <v-card-text>
                <validation-provider name="username" rules="required" v-slot="{errors}">
                <v-text-field
                    label="Username"
                    v-model="username"
                    :error-messages="errors"
                    required>
                </v-text-field>
                </validation-provider>

                <validation-provider name="password" rules="required" v-slot="{errors}">
                <v-text-field
                    :type="show_password ? 'text' : 'password'"
                    :append-icon="show_password ? 'visibility_off' : 'visibility'"
                    @click:append="show_password = !show_password"
                    label="Password"
                    v-model="password"
                    :error-messages="errors"
                    required>
                </v-text-field>
                </validation-provider>

                <span class="error--text" v-if="error">{{error}}</span>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit"
                       color="primary"
                       text
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
