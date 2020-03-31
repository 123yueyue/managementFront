import { getToken } from '@/utils/auth'
import { getApplyInfo, getSecondOptions, getStandardInfo, addApply } from '@/api/apply'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // apply getApplyInfo
  getApplyInfo() {
    return getApplyInfo()
  },
  // apply getSecondOptions
  getSecondOptions(_, data) {
    return getSecondOptions(data)
  },
  // apply getStandardInfo
  getStandardInfo(_, data) {
    return getStandardInfo(data)
  },
  // apply addApply
  addApply(_, data) {
    return addApply(data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
