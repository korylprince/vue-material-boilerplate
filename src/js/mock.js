/* global API_BASE */

import axios from "axios"
import MockAdapter from "axios-mock-adapter"

const mock = new MockAdapter(axios)

mock.onPost(`${API_BASE}/auth`).reply(() => {
    if (Math.random() > 0.5) {
        return [
            200,
            {
                display_name: "Kory Prince",
                username: "korylprince",
                session_id: "3dca04ac361bab452e057b3e5d0d4fd5",
            },
        ]
    } else {
        return [
            401,
            {
                status: 401,
                statusText: "Unauthorized",
            },
        ]
    }
})

mock.onGet(`${API_BASE}/thing`).reply(() => {
    if (Math.random() > 0.5) {
        return [
            200,
            {
                thing: Math.random(),
            },
        ]
    } else {
        if (Math.random() > 0.5) {
            return [
                401,
                {
                    status: 401,
                    statusText: "Unauthorized",
                },
            ]
        } else {
            return [
                500,
                {
                    status: 500,
                    statusText: "Internal Server Error",
                },
            ]
        }
    }
})
