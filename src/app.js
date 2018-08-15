import "vue-material/dist/vue-material.css"
import "./style/theme.scss"
import "./style/app.styl"

import Vue from "vue"
import VueMaterial from "vue-material"
import VeeValidate from "vee-validate"

Vue.use(VueMaterial)
Vue.use(VeeValidate)

import router from "./js/router.js"
import store from "./js/store.js"

// if signed out, go to signin page
store.watch((state, getters) => getters.signed_in, signed_in => {
    if (!signed_in) {
        router.push({name: "signin"})
    }
})

import MyApp from "./components/app.vue"

var App = new (Vue.extend(MyApp))({
    el: "#root",
    router,
    store
})

export default App
