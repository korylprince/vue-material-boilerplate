/*global API_BASE*/

import store from "./store.js"

const api = {
    authenticate(username, password) {
        // API mock
        var promise = new Promise(function(resolve, reject) {
            window.setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve({
                        name: "Kory Prince",
                        session_id: "3dca04ac361bab452e057b3e5d0d4fd5"
                    })
                } else {
                    reject({
                        response: {
                            status: 401,
                            statusText: "Unauthorized"
                        }
                    })
                }
            }, 1000)
        })
        return promise
    },
    get_thing() {
        // API mock
        var promise = new Promise(function(resolve, reject) {
            window.setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve({
                        msg: Math.random()
                    })
                } else {
                    reject({
                        response: {
                            status: 500,
                            statusText: "Server Error"
                        }
                    })
                }
            }, 1000)
        })
        return promise
    },
    do_authenticated_thing(data) {
        return store.$http().post(API_BASE + "/data", data)
    }
}

export default api
