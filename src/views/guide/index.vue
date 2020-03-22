<template>
  <div class="main-content">
    <el-card class="box-card" style="width: 100%">
      <div slot="header" class="clearfix">
        <span>{{ title || '学院列表' }}</span>
      </div>

      <div v-if="action==='add'">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="100px"
          size="mini"
          style="width: 700px;"
          class="form"
        >
          <el-form-item label="登录账号" prop="account">
            <el-input v-model="form.account" placeholder="请输入登录账号" />
          </el-form-item>
          <el-form-item label="学院名称" prop="institutionName">
            <el-input v-model="form.institutionName" placeholder="请输入学院名称" />
          </el-form-item>
          <el-form-item label="所属学校" prop="value">
            <el-select v-model="form.adminId" placeholder="请选择所属学校">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="prePassword">
            <el-input v-model="form.prePassword" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="重复密码" prop="checkPassword">
            <el-input v-model="form.checkPassword" type="password" placeholder="请再次输入密码" />
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入11位手机号码" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="简介" prop="email">
            <el-input v-model="form.intro" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="submitForm('form')">{{ subtitle }}</el-button>
            <el-button size="mini" @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="action==='list'">
        <!-- 顶部搜索框 -->
        <div class="top-row">
          <div class="search-box">
            <el-input
              v-model="listQuery.institutionName"
              style="width: 200px;"
              size="mini"
              placeholder="学院名称"
            />
            <i class="el-icon-search" @click="searchInstitution" />
          </div>
          <el-button style="float: right;" type="primary" size="mini" @click="handleAdd">新建学院</el-button>
        </div>
        <el-table
          :data="institutionList"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="id" label="编号" width="100" />
          <el-table-column prop="account" label="账号" width="100" />
          <el-table-column prop="institutionName" label="学院名称" width="140" />
          <el-table-column prop="adminName" label="所属学院" width="140" />
          <el-table-column prop="phone" label="电话" width="140" />
          <el-table-column prop="email" label="邮箱" width="140" />
          <el-table-column prop="intro" label="简介" width="180" />
          <el-table-column fixed="right" label="操作" width="100px">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  plain
                  circle
                  @click="userUpdate(scope.row)"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  plain
                  circle
                  @click="userDelete(scope.row)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager-box">
          <pagination
            :total="total"
            :current-page="listQuery.pageNum"
            @handleSizeChangeSub="handleSizeChangeFun"
            @handleCurrentChangeSub="handleCurrentChangeFun"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import pagination from '@/components/pager.vue' // 分页组件
export default {
  components: { pagination },
  data() {
    // 校验账号
    var checkAccout = (rule, value, callback) => {
      if (this.title === '新建学校') {
        this.$store.dispatch('institution/checkAccount', value).then(resp => {
          if (resp.status === 1) {
            callback(new Error('该用户名已存在'))
          }
        })
      } else {
        callback()
      }
    }
    // 校验用户名
    var checkUserName = (rule, value, callback) => {
      if (this.title === '新建学校') {
        this.$store.dispatch('institution/checkName', value).then(resp => {
          if (resp.status === 1) {
            callback(new Error('该名称已存在'))
          }
        })
      } else {
        callback()
      }
    }
    // 校验密码
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword')
        }
        callback()
      }
    }
    // 校验是否一致
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.prePassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      title: '学院列表',
      action: 'list',
      institutionList: [],
      institutionName: '',
      form: {
        password: '',
        prePassword: '',
        checkPassword: '',
        account: '',
        institutionName: '',
        phone: '',
        email: '',
        intro: '',
        adminId: ''
      },
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        institutionName: ''
      },
      options: [],
      value: '',
      total: 0,
      subtitle: '立即创建',
      editValidatePass: validatePass,
      editValidatePass2: validatePass2,
      rules: {
        account: [
          {
            required: true,
            trigger: 'blur',
            message: '登录账号不能为空'
          },
          {
            validator: checkAccout,
            trigger: 'blur'
          },
          {
            max: 20,
            min: 5,
            trigger: 'blur',
            message: '登录账号长度必须大于五位且小于二十位'
          },
          {
            pattern: /^[\u0391-\uFFE5A-Za-z0-9]+$/,
            message: '请输入中英文或数字'
          }
        ],
        institutionName: [
          {
            required: true,
            trigger: 'blur',
            message: '用户姓名不能为空'
          },
          {
            validator: checkUserName,
            trigger: 'blur'
          },
          {
            max: 8,
            min: 2,
            trigger: 'blur',
            message: '用户姓名必须大于两位且小于八位'
          },
          {
            pattern: /^[\u0391-\uFFE5A-Za-z0-9]+$/,
            message: '请输入中英文或数字'
          }
        ],
        prePassword: [
          {
            required: true,
            trigger: 'blur',
            message: '密码不能为空'
          },
          {
            max: 20,
            min: 6,
            trigger: 'blur',
            message: '密码长度必须大于六位且小于二十位'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkPassword: [
          {
            validator: validatePass2,
            trigger: 'blur'
          },
          {
            required: true,
            trigger: 'blur',
            message: '请再次输入密码'
          }
        ],
        phone: [
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的电话号码',
            trigger: 'blur'
          }
        ],
        email: [
          {
            type: 'email',
            trigger: 'blur',
            message: '邮箱格式有误'
          },
          {
            max: 32,
            trigger: 'blur',
            message: '邮箱长度不得大于32位'
          }
        ]
      }
    }
  },
  created() {
    this.getDataList()
    if (this.title === '编辑学院') {
      this.subtitle = '立即修改'
    } else {
      this.subtitle = '立即创建'
    }
  },
  methods: {
    // 分页
    handleSizeChangeFun(v) {
      this.listQuery.pageSize = v
      this.listQuery.pageNum = 1
      this.getDataList()
    },
    async handleCurrentChangeFun(v) {
      // 页面点击
      this.listQuery.pageNum = v // 当前页
      this.getDataList()
    },
    handleSelectionChange(val) {
      for (let j = 0, len = val.length; j < len; j++) {
        this.multipleTable[j] = val[j].id
      }
    },
    // 获取人员列表
    async getDataList() {
      this.institutionList = []
      this.total = 0
      this.$store.dispatch('institution/getList', this.listQuery).then(resp => {
        if (!resp) {
          this.institutionList = []
          this.total = 0
          return
        }
        if (resp.status === 1) {
          this.institutionList = null
          this.total = 0
        } else {
          this.institutionList = resp.responsePageInfo.list
          this.total = resp.responsePageInfo.total
        }
      })
    },
    // 搜索学院
    searchInstitution() {
      this.listQuery.pageNum = 1
      this.getDataList()
    },
    // 新增学院
    handleAdd() {
      this.title = '新建学院'
      this.action = 'add'
      this.subtitle = '立即创建'
      this.$store.dispatch('institution/getSchoolList').then(response => {
        this.options = response.responsePageInfo.list
      })
    },
    // 添加学院
    submitForm(form) {
      if (this.title === '编辑学院') {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$store.dispatch('institution/updateInstitution', this.form).then(() => {
              this.action = 'list'
              this.title = '学院列表'
              this.getDataList()
            })
          } else {
            console.log('编辑学院失败!')
            return false
          }
        })
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$store.dispatch('institution/addInstitution', this.form).then(() => {
              this.action = 'list'
              this.title = '学院列表'
              this.getDataList()
            })
          } else {
            console.log('添加学院失败!')
            return false
          }
        })
      }
    },
    // 编辑学院
    userUpdate(row) {
      this.title = '编辑学院'
      this.action = 'add'
      this.form = row
      this.subtitle = '立即修改'
    },
    // 删除学院
    userDelete(row) {
      this.$confirm('此操作将永久删除该学院, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$store.dispatch('institution/deleteInstitution', row.id).then(response => {
            if (response.status === 0) {
              this.$message({
                type: 'success',
                message: response.msg
              })
              this.listQuery.pageNum = 1
              this.getDataList()
            } else {
              this.$message({
                type: 'error',
                message: response.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    resetForm(form) {
      this.$refs[form].resetFields()
      this.form.account = ''
      this.form.userName = ''
      this.form.prePassword = ''
      this.form.checkPassword = ''
      this.form.email = ''
      this.form.phone = ''
    }
  }
}
</script>
<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.main-content {
  .top-row {
    padding-bottom: 15px;
    font-size: 0;
    .search-box {
      width: 50%;
      position: relative;
      display: inline-block;
      .el-icon-search {
        font-size: 16px;
        position: absolute;
        top: 6px;
        left: 173px;
        cursor: pointer;
      }
    }
  }
}
</style>
