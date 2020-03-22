import { getList, addSchool, checkAccout, checkUserName, updateSchool, deleteSchool } from '@/api/school'
import { getToken } from '@/utils/auth'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // school getList
  getList(_, data) {
    return getList(data)
  },
  // 新建学校
  addSchool(_, data) {
    return addSchool(data)
  },
  // 编辑学校
  updateSchool(_, data) {
    return updateSchool(data)
  },
  // 删除学校
  deleteSchool(_, id) {
    return deleteSchool(id)
  },
  // 校验账号
  checkAccout(_, value) {
    return checkAccout(value)
  },
  // 校验用户名
  checkUserName(_, userName) {
    return checkUserName(userName)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
