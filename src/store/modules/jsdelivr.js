import { jsdelivr } from "@/api"

const state = {
  codemirror: {}
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  getCodeMirror({ commit }) {
    jsdelivr('codemirror', '5.45.0').then(res => {
      console.log(res);
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

