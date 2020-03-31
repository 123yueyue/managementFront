// 申请实践积分
<template>
  <div id="myExam">
    <div class="title">申请实践积分</div>
    <div class="wrapper">
      <ul class="top">
        <li class="order">申请实践积分</li>
        <!-- <li class="search-li"><div class="icon"><input type="text" placeholder="试卷名称" class="search" v-model="key"><i class="el-icon-search"></i></div></li>
        <li><el-button type="primary" @click="search()">搜索试卷</el-button></li>-->
      </ul>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="项目" :v-model="form.firstlevel">
          <el-cascader :options="firstoptions" clearable @change="handleChange" />
        </el-form-item>
        <el-form-item label="内容" :v-model="form.secondlevel">
          <el-cascader :options="secondoptions" clearable @change="toContent" />
        </el-form-item>
        <el-form-item label="评审标准">
          <el-input
            v-model="form.intro"
            type="textarea"
            autosize
            :disabled="true"
            :rows="3"
            placeholder="请选择您要申请的项目和内容"
          />
        </el-form-item>
        <el-form-item label="评审标准">
          <el-input v-model="form.review" placeholder="最高得分" :disabled="true" />
        </el-form-item>
        <el-form-item label="申请分数">
          <el-input v-model="form.score" placeholder="最高不得超过最高得分" size="medium" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即申请</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
        <el-form-item />
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstlavel: '',
        secondlavel: '',
        intro: '',
        review: '',
        score: '',
        studentId: '',
        standardId: ''
      },
      firstoptions: [],
      secondoptions: []
    }
  },
  created() {
    this.getApplyList()
  },
  methods: {
    async getApplyList() {
      this.firstoptions = []
      this.$store.dispatch('apply/getApplyInfo').then(resp => {
        if (!resp) {
          this.firstoptions = []
          return
        }
        if (resp.status === 1) {
          this.firstoptions = null
        } else {
          this.firstoptions = resp.responsePageInfo.list
        }
      })
    },
    handleChange(value) {
      this.secondoptions = []
      this.$store.dispatch('apply/getSecondOptions', value).then(resp => {
        if (!resp) {
          this.secondoptions = []
          return
        }
        if (resp.status === 1) {
          this.secondoptions = null
        } else {
          this.secondoptions = resp.responsePageInfo.list
        }
      })
    },
    toContent(value) {
      (this.form.intro = '')(this.form.review = '')
      this.$store.dispatch('apply/getStandardInfo', value).then(resp => {
        if (!resp) {
          this.secondoptions = []
          return
        }
        if (resp.status === 1) {
          this.secondoptions = null
        } else {
          (this.form.intro = resp.responseObject.intro)(this.form.review = resp.responseObject.review)(this.form.standardId = resp.responseObject.standardId)
        }
      })
    },
    submitForm(form) {
      this.form.studentId = (this.$store.state.user.id).toString()
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$store.dispatch('apply/addApply', this.form).then(resp => {
            if (resp.status === 0) {
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ path: '/detail' })
            } else {
              this.$message({
                showClose: true,
                message: '添加失败',
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(form) {
      this.$refs[form].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  padding: 20px 0px 30px 0px;
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}
.paper {
  h4 {
    cursor: pointer;
  }
}
.paper .item a {
  color: #000;
}
.wrapper .top .order {
  cursor: pointer;
}
.wrapper .top .order:hover {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}
.wrapper .top .order:visited {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}
.item .info i {
  margin-right: 5px;
  color: #0195ff;
}
.item .info span {
  margin-right: 14px;
}
.paper .item {
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
  transition: all 0.6s ease;
}
.paper .item:hover {
  box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
  transform: scale(1.03);
}
.paper .item .info {
  font-size: 14px;
  color: #88949b;
}
.paper .item .name {
  font-size: 14px;
  color: #88949b;
}
.paper * {
  margin: 20px 0;
}
.wrapper .paper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.top .el-icon-search {
  position: absolute;
  right: 10px;
  top: 10px;
}
.top .icon {
  position: relative;
}
.wrapper .top {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
#myExam .search-li {
  margin-left: auto;
}
.top .search-li {
  margin-left: auto;
}
.top li {
  display: flex;
  align-items: center;
}
.top .search {
  margin-left: auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.top .search:hover {
  color: #0195ff;
  border-color: #0195ff;
}
.wrapper .top {
  display: flex;
}
.wrapper .top li {
  margin: 20px;
}
#myExam {
  width: 980px;
  margin: 0 auto;
}
#myExam .title {
  margin: 20px;
}
#myExam .wrapper {
  background-color: #fff;
}
</style>
