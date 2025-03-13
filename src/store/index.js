import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      account: '',
      telephone: '',
      token: ''
    }
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  // 唯一可以修改state值的方法，同步阻塞
  mutations: {
    updateUser (state, user) {
      state.user = user
    }
  },
  // 异步调用mutations
  actions: {
    asyncUpdateUser (context, user) {
      context.commit('updateUser', user)
    }
  },
  modules: {
  }
})
