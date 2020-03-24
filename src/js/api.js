/* global API_BASE */

import "./mock.js"
import axios from "axios"
import store from "./store.js"

const api = {
    authenticate(username, password) {
        return axios.post(`${API_BASE}/auth`, {username, password})
    },

    get_thing() {
        return store.getters.$http.get(`${API_BASE}/thing`)
    },
}

export default api
