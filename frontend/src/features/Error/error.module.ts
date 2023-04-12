import { BoardInterface } from '../../../../shared/types/boards';

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
  },
  actions: {
    async setError({ commit }, payload) {
      console.log('ERROR SET');
      commit('SET_ERROR', payload);
    }
  }
};
