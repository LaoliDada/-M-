import vuex from "vuex"
import Vue from "vue"
import {getters} from "./getter"
import {state} from "./state"
import {mutations} from "./mutation"
import {actions} from "./actions"
Vue.use(vuex);
const store = new vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store