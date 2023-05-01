export default {
  namespaced: true,
  mutations: {
    SET_ERROR(state, payload) {
      state.message = payload.message.toString();
      state.name = payload.name.toString();
    },
  },
  getters: {
    getError(state) {
      return state;
    },
  },
  actions: {
    async setError({ commit }, payload) {
      commit('SET_ERROR', payload);
    }
  }
};
