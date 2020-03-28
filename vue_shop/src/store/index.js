import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import login from './modules/login'
import home from './modules/home'
import users from './modules/users'
import rights from './modules/rights'
import roles from './modules/roles'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        login,
        home,
        users,
        rights,
        roles
    },
    getters
})

export default store