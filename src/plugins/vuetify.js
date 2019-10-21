import Vue from "vue"
import Vuetify from "vuetify/lib"

Vue.use(Vuetify)

import colors from "vuetify/lib/util/colors"

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.blue.base,
                accent: colors.red.base,
                secondary: colors.blue.accent4,
            },
        },
    },
})
