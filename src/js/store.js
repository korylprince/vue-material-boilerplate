import axios from "axios"

import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import api from "./api.js"

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    state: {
        last_error: null,
        _loading_count: 0,
        username: window.localStorage.getItem("username"),
        session_id: window.localStorage.getItem("session_id"),
        _next_route: null,
        _next_dispatch_action: null,
        _next_dispatch_payload: null,
        _feedback: [],
        _feedback_delay: false,
        thing: null
    },
    getters: {
        is_loading(state) {
            return state._loading_count !== 0
        },
        next_route(state) {
            if (state._next_route == null) {
                return null
            }
            return {
                name: state._next_route.name,
                path: state._next_route.path,
                params: state._next_route.params,
                query: state._next_route.query
            }
        },
        signed_in(state) {
            return state.session_id != null
        },
        show_dialog(state) {
            return state.last_error != null
        },
        $http(state) {
            return axios.create({
                headers: {Authorization: "Session id=\"" + state.session_id + "\""}
            })
        },
        current_feedback(state) {
            if (state._feedback_delay || state._feedback.length === 0) { return null }
            return state._feedback[0]
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
        UPDATE_CREDENTIALS(state, {username, session_id}) {
            state.username = username
            window.localStorage.setItem("username", username)
            state.session_id = session_id
            window.localStorage.setItem("session_id", session_id)
        },
        SIGNOUT(state) {
            state.username = null
            window.localStorage.removeItem("username")
            state.session_id = null
            window.localStorage.removeItem("session_id")
        },
        UPDATE_NEXT_ROUTE(state, route) {
            state._next_route = route
        },
        UPDATE_NEXT_DISPATCH(state, {action, payload}) {
            state._next_dispatch_action = action
            state._next_dispatch_payload = payload
        },
        ADD_FEEDBACK(state, msg) {
            state._feedback.push(msg)
        },
        CLEAR_FEEDBACK(state) {
            // remove first element
            state._feedback.splice(0, 1)
            state._feedback_delay = true
        },
        CLEAR_FEEDBACK_DELAY(state) {
            state._feedback_delay = false
        },
        UPDATE_THING(state, thing) {
            state.thing = thing
        }
    },
    actions: {
        authenticate(context, {username, password}) {
            context.commit("START_LOADING")

            var promise = api.authenticate(username, password)
            promise.then(response => {
                context.commit("STOP_LOADING")
                var session_id = response.data.session_id
                context.commit("UPDATE_CREDENTIALS", {username, session_id})
            }).then(() => {
                context.dispatch("next_dispatch")
            }).catch(error => {
                context.commit("STOP_LOADING")
                if (error.response !== null && error.response.status === 401) {
                    context.commit("UPDATE_ERROR", "Wrong username or password")
                    return
                }
                context.commit("UPDATE_ERROR", "Oops! Something bad happened. Contact your system administrator")
                console.error({error: error})
            })

            return promise
        },
        signout(context) {
            context.commit("SIGNOUT")
        },
        next_dispatch(context) {
            if (context.state._next_dispatch_action == null) { return }
            return context.dispatch(context.state._next_dispatch_action, context.state._next_dispatch_payload).finally(() => {
                context.commit("UPDATE_NEXT_DISPATCH", {action: null, payload: null})
            })
        },
        clear_feedback(context) {
            context.commit("CLEAR_FEEDBACK")
            window.setTimeout(() => {
                context.commit("CLEAR_FEEDBACK_DELAY")
            }, 500)
        },
        get_thing(context) {
            context.commit("START_LOADING")

            var promise = api.get_thing()
            promise.then(response => {
                context.commit("STOP_LOADING")
                var msg = response.data.msg
                context.commit("UPDATE_THING", msg)
                context.commit("ADD_FEEDBACK", "Thing loaded")
            }).catch(error => {
                context.commit("STOP_LOADING")
                if (error.response !== null && error.response.status === 401) {
                    context.dispatch("signout")
                    context.commit("ADD_FEEDBACK", "Session expired. Please sign back in to load Thing")
                    context.commit("UPDATE_NEXT_DISPATCH", {action: "get_thing"})
                } else {
                    context.commit("UPDATE_ERROR", "Oops! Something bad happened. Contact your system administrator")
                    console.error({error: error})
                }
            })
        }
    }
})

export default store
