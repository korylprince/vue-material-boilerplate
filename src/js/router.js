import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import AppSignin from "../components/signin.vue"
import AppContent from "../components/content.vue"

const router = new VueRouter({
    routes: [
        {name: "signin", path: "/signin", component: AppSignin},
        {name: "content", path: "/", component: AppContent},
        {path: "*", redirect: {name: "content"}},
    ],
})

export default router
