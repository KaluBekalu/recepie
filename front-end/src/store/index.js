import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isAuthorized: false,
      user: {},
    };
  },
  mutations: {
    authorize(state, payload) {
      state.isAuthorized = payload;
    },
    setUserData(state, payload) {
      state.user = payload;
    },
  },
});

export default store;
