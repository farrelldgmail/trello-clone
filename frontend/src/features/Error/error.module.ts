export default {
  namespaced: true,
  state: () => ({ message: String, name: String }),
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
  }
};
