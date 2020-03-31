import { getToken } from '@/utils/auth'
import { getList } from '@/api/detail'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // detail getList
  getList(_, data) {
    return getList(data)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
