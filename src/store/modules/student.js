import { getToken } from '@/utils/auth'
import { getList, addStudent, updateStudent, deleteStudent, checkName, getSchoolList, getInstitutionList, getClassList } from '@/api/student'

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
  // student getClassList
  getClassList() {
    return getClassList()
  },
  // 新建学生
  addStudent(_, data) {
    return addStudent(data)
  },
  // 编辑学生
  updateStudent(_, data) {
    return updateStudent(data)
  },
  // 删除学生
  deleteStudent(_, id) {
    return deleteStudent(id)
  },
  // 校验用户名
  checkName(_, account) {
    return checkName(account)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
