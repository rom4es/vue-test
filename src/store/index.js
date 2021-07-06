import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: [],
    isLoading: false,
    isCached: false,
  }),

  mutations: {
    setState(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
  },

  actions: {
    async load({ commit }, params = {}) {
      commit('setState', { isLoading: true });

      try {
        let data;
        if (!Object.prototype.hasOwnProperty.call(params, 'clearCache') && localStorage.getItem('payments')) {
          data = JSON.parse(localStorage.getItem('payments'));
          commit('setState', { isCached: true });
        } else {
          ({ data } = await api.getPayments(params));
          commit('setState', { isCached: false });
        }
        if (Array.isArray(data)) {
          commit('setState', { data });
          localStorage.setItem('payments', JSON.stringify(data));
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('setState', { isLoading: false });
      }
    },
  },
});
