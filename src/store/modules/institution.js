import { getToken } from '@/utils/auth'
import { getList, addInstitution, updateInstitution, deleteInstitution, checkName, checkAccount, getSchoolList } from '@/api/institution'

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
  // school getList
  getSchoolList() {
    return getSchoolList()
  },
  // 新建学校
  addInstitution(_, data) {
    return addInstitution(data)
  },
  // 编辑学校
  updateInstitution(_, data) {
    return updateInstitution(data)
  },
  // 删除学校
  deleteInstitution(_, id) {
    return deleteInstitution(id)
  },
  // 校验用户名
  checkName(_, institutionName) {
    return checkName(institutionName)
  },
  // 校验账号
  checkAccount(_, account) {
    return checkAccount(account)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
