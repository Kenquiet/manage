import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const types = {
  SET_AUTHORIZATED:'set_authorization',
  SET_USER:'set_user'
}

const state = {
  isAuthorizated: false,
  user: {}
};

const getters = {
  isAuthorizated: state => state.isAuthorizated ,
  user: state => state.user
};

const mutations = {
  [types.SET_AUTHORIZATED] (state,isAuthorization) {
   if (isAuthorization) state.isAuthorizated = isAuthorization;
   else state.isAuthorizated = false
  },
  [types.SET_USER] (state,user) {
   if (user) state.user = user;
   else state.user = {}
  }
};

const actions = {
  setAuthorizated: ({commit},isAuthorizated) => {
    commit(types.SET_AUTHORIZATED,isAuthorizated)
  },
  setUser: ({commit},user) => {
    commit(types.SET_USER,user)
  },
  clearInfo: ({commit}) => {
    commit(types.SET_AUTHORIZATED,false);
    commit(types.SET_USER,null);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
