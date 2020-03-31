<!--学生申请首页-->
<template>
  <div id="student">
    <el-row class="padding-50">
      <el-col :span="24">
        <ul class="list">
          <li class="logo"><i class="el-icon-document" /><span>我的实践积分</span></li>
          <li><a href="javascript:;" @click="apply()">申请实践积分</a></li>
          <li><a href="javascript:;" @click="detail()">我的提交记录</a></li>
          <li><a href="javascript:;" @click="info()">我的得分情况</a></li>
          <li class="right" @mouseenter="flag = !flag" @mouseleave="flag = !flag">
            <a href="javascript:;"><i class="el-icon-document person" />{{ user.id }}</a>
            <div v-if="flag" class="msg">
              <p @click="manage()">管理中心</p>
              <p class="exit" @click="exit()">退出</p>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <!-- 路由区域 -->
    <div class="main">
      <router-view />
    </div>
    <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      user: {}
    }
  },
  created() {
    this.userInfo()
  },
  methods: {
    exit() { // 退出登录
      this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    manage() { // 跳转到修改密码页面
    //   this.$router.push({path: '/manager'})
    },
    userInfo() {
      this.user.id = this.$store.state.user.id
      this.user.userName = this.$store.state.user.userName
    },
    detail() { // 跳转到我的提交记录页面
      this.$router.push({ path: '/detail' })
    },
    apply() { // 跳转到申请实践积分页面
      this.$router.push({ path: '/apply' })
    },
    info() { // 跳转到我的得分情况页面
      this.$router.push({ path: '/student' })
    }
  }
}
</script>

<style scoped>
.right .icon {
  margin-right: 6px;
}
#student .padding-50 {
  margin: 0 auto;
  padding: 0 240px;
  height:60px;
  box-shadow: 0 0 10px 4px rgba(1,149,255,0.1);
  background-color: #fff;
}
.list a {
  text-decoration: none;
  color: #334046;
}
li {
  list-style: none;
  line-height: 60px;
}
#student .list{
  display: flex;
}
#student .list li {
  padding: 0 30px;
  cursor: pointer;
}
#student .list li:hover {
  background-color: #0195ff;
  transition: all 2s ease;
}
#student .list li:hover a {
  color: #fff;
}
#student .list .right {
  margin-left: 100px;
  position: relative;
}
#student .list .right i{
  font-size: 20px;
}
#student .list li.right :hover a {
  color: #000;
}
#student .list .logo {
  display: flex;
  font-weight: bold;
  color: #2f6c9f;
}
#student .list .logo i {
  font-size: 50px;
}
.right{
    margin-right: 6px;
}
.right .msg {
  text-align: center;
  position: absolute;
  top: 60px;
  left: 0px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  border-bottom: 3px solid #0195ff;
  background-color: #fff;
}
.right .msg p {
  height: 40px;
  line-height: 40px;
  width: 105px;
}
.right .msg p:hover {
  background-color: #0195ff;
}
</style>
