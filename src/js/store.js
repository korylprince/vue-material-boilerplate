import axios from "axios"

import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import {sync} from "vuex-router-sync"

import router from "./router.js"
import api from "./api.js"

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    state: {
        last_error: null,
        _loading_count: 0,
        name: window.localStorage.getItem("name"),
        session_id: window.localStorage.getItem("session_id"),
        next_route: null,
        thing: null
    },
    getters: {
        is_loading(state) {
            return state._loading_count !== 0
        },
        signed_in(state) {
            return state.session_id != null
        },
        show_dialog(state) {
            return state.last_error != null && state.route.name !== "signin"
        },
        $http(state) {
            return axios.create({
                headers: {Authorization: "SESSION id=" + state.session_id}
            })
        }
    },
    mutations: {
        UPDATE_ERROR(state, error) {
            state.last_error = error
        },
        START_LOADING(state) {
            state._loading_count++
            state.last_error = null
        },
        STOP_LOADING(state) {
            state._loading_count--
        },
        UPDATE_CREDENTIALS(state, {name, session_id}) {
            state.name = name
            window.localStorage.setItem("name", name)
            state.session_id = session_id
            window.localStorage.setItem("session_id", session_id)
        },
        SIGNOUT(state) {
            state.name = null
            window.localStorage.removeItem("name")
            state.session_id = null
            window.localStorage.removeItem("session_id")
        },
        UPDATE_NEXT_ROUTE(state, route) {
            state.next_route = route
        },
        UPDATE_THING(state, thing) {
            state.thing = thing
        }
    },
    actions: {
        authenticate(context, {username, password}) {
            context.commit("START_LOADING")

            var promise = api.authenticate(username, password)
            promise.then(({name, session_id}) => {
                context.commit("STOP_LOADING")
                context.commit("UPDATE_CREDENTIALS", {name, session_id})

                var to = context.state.next_route
                if (to) {
                    router.push({
                        name: to.name,
                        path: to.path,
                        params: to.params,
                        query: to.query
                    })
                    context.commit("UPDATE_NEXT_ROUTE", null)
                } else {
                    router.push({name: "content"})
                }
            }).catch(error => {
                context.commit("STOP_LOADING")
                if (error.response !== null && error.response.status === 401) {
                    context.commit("UPDATE_ERROR", "Wrong email or password")
                } else {
                    context.commit("UPDATE_ERROR", "Oops! Something bad happened. Contact your system administrator")
                    console.error({error: error})
                }
            })
        },
        signout(context) {
            context.commit("SIGNOUT")
            router.push({name: "signin"})
        },
        get_thing(context) {
            context.commit("START_LOADING")

            var promise = api.get_thing()
            promise.then(({msg}) => {
                context.commit("STOP_LOADING")
                context.commit("UPDATE_THING", msg)
            }).catch(error => {
                context.commit("STOP_LOADING")
                if (error.response !== null && error.response.status === 401) {
                    context.dispatch("signout")
                } else {
                    context.commit("UPDATE_ERROR", "Oops! Something bad happened. Contact your system administrator")
                    console.error({error: error})
                }
            })
        }
    }
})

sync(store, router)

router.beforeEach((to, from, next) => {
    if (store.getters.signed_in) {
        if (to.name !== "signin") {
            next()
        } else {
            next({name: "content"})
        }
        return
    }

    if (to.name !== "signin") {
        store.commit("UPDATE_NEXT_ROUTE", {
            name: to.name,
            path: to.path,
            params: to.params,
            query: to.query
        })
        next({name: "signin"})
        return
    }

    next()
})

export default store
