<template>
  <div class="main-content">
    <el-card class="box-card" style="width: 100%">
      <div slot="header" class="clearfix">
        <span>{{ title || '班级列表' }}</span>
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
          <el-form-item label="班级名称" prop="className">
            <el-input v-model="form.className" placeholder="请输入班级名称" />
          </el-form-item>
          <el-form-item label="所属学校" prop="value">
            <el-select v-model="form.adminId" placeholder="请选择所属学校">
              <el-option
                v-for="item in schooloptions"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属学院" prop="value">
            <el-select v-model="form.institutionId" placeholder="请选择所属学院">
              <el-option
                v-for="item in institutionoptions"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              />
            </el-select>
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
              v-model="listQuery.className"
              style="width: 200px;"
              size="mini"
              placeholder="班级，学院，或学校名称"
            />
            <i class="el-icon-search" @click="searchClass" />
          </div>
          <el-button style="float: right;" type="primary" size="mini" @click="handleAdd">新建学院</el-button>
        </div>
        <el-table
          :data="classList"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="id" label="编号" width="100" />
          <el-table-column prop="className" label="班级名称" width="180" />
          <el-table-column prop="institutionName" label="所属学院" width="180" />
          <el-table-column prop="adminName" label="所属学校" width="180" />
          <el-table-column prop="intro" label="简介" width="260" />
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
      if (this.title === '新建班级') {
        this.$store.dispatch('class/checkName', value).then(resp => {
          if (resp.status === 1) {
            callback(new Error('该班级名称已存在'))
          }
        })
      } else {
        callback()
      }
    }
    return {
      title: '班级列表',
      action: 'list',
      classList: [],
      className: '',
      form: {
        id: '',
        institutionName: '',
        adminId: '',
        institutionId: '',
        adminName: '',
        className: '',
        intro: ''
      },
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        className: ''
      },
      schooloptions: [],
      institutionoptions: [],
      value: '',
      total: 0,
      subtitle: '立即创建',
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
        className: [
          {
            required: true,
            trigger: 'blur',
            message: '班级名称不能为空'
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
        ]
      }
    }
  },
  created() {
    this.getDataList()
    if (this.title === '编辑班级') {
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
    // 获取班级列表
    async getDataList() {
      this.classList = []
      this.total = 0
      this.$store.dispatch('class/getList', this.listQuery).then(resp => {
        if (!resp) {
          this.classList = []
          this.total = 0
          return
        }
        if (resp.status === 1) {
          this.classList = null
          this.total = 0
        } else {
          this.classList = resp.responsePageInfo.list
          this.total = resp.responsePageInfo.total
        }
      })
    },
    // 搜索班级
    searchClass() {
      this.listQuery.pageNum = 1
      this.getDataList()
    },
    // 新增班级
    handleAdd() {
      this.title = '新建班级'
      this.action = 'add'
      this.subtitle = '立即创建'
      this.$store.dispatch('institution/getSchoolList').then(response => {
        this.schooloptions = response.responsePageInfo.list
      })
      this.$store.dispatch('class/getInstitutionList').then(response => {
        this.institutionoptions = response.responsePageInfo.list
      })
    },
    // 添加班级
    submitForm(form) {
      if (this.title === '编辑班级') {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$store.dispatch('class/updateClass', this.form).then(() => {
              this.action = 'list'
              this.title = '班级列表'
              this.getDataList()
            })
          } else {
            console.log('编辑班级失败!')
            return false
          }
        })
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$store.dispatch('class/addClass', this.form).then(() => {
              this.action = 'list'
              this.title = '班级列表'
              this.getDataList()
            })
          } else {
            console.log('添加班级失败!')
            return false
          }
        })
      }
    },
    // 编辑学院
    userUpdate(row) {
      this.title = '编辑班级'
      this.action = 'add'
      this.form = row
      this.subtitle = '立即修改'
    },
    // 删除学院
    userDelete(row) {
      this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$store.dispatch('class/deleteClass', row.id).then(response => {
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
      this.form.intro = ''
      this.form.adminName = ''
      this.form.institutionName = ''
      this.form.className = ''
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
