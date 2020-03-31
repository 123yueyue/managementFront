import { getToken } from '@/utils/auth'
import { getList, addClass, updateClass, deleteClass, checkName, getSchoolList, getInstitutionList } from '@/api/class'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // class getList
  getList(_, data) {
    return getList(data)
  },
  // class getInstitutionList
  getInstitutionList() {
    return getInstitutionList()
  },
  // school getList
  getSchoolList() {
    return getSchoolList()
  },
  // 新建班级
  addClass(_, data) {
    return addClass(data)
  },
  // 编辑班级
  updateClass(_, data) {
    return updateClass(data)
  },
  // 删除班级
  deleteClass(_, id) {
    return deleteClass(id)
  },
  // 校验用户名
  checkName(_, className) {
    return checkName(className)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
