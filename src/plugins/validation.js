import Vue from "vue"
import {ValidationProvider, ValidationObserver, extend} from "vee-validate"
import {required} from "vee-validate/dist/rules"
import en from "vee-validate/dist/locale/en"

extend("required", {...required, message: en.messages["required"]})
Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)
