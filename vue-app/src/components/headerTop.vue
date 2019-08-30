<template>
  <div class="headerTop">
      <el-row class="">
        <el-col :span="6" class="title-container">
          <p class="title">诸葛亮在线管理系统</p>
        </el-col>
        <el-col :span="6" class="user">
          <div class="userInfo">
            <img :src="user.avatar" alt="" class="avater">
            <div class="welcome">
              <p class="name comename">欢迎</p>
              <p class="name username">{{user.name}}</p>
            </div>
            <span class="userMenu">
              <el-dropdown trigger="click" @command="setLogInfo">
                <span class="el-dropdown-link">
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="info">用户信息</el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
        </el-col>

      </el-row>
  </div>
</template>

<script>
  export default {
    name: "headerTop",
    computed: {
      user () {
       return this.$store.getters.user
      }
    },
    methods: {
      setLogInfo(command) {
        // console.log(command)
        switch (command) {
          case 'info':
            this.showInfoList();
            break;
          case 'logout':
            this.logout();
            break
        }
      },
      showInfoList() {
        this.$router.push('/infoshow')
      },
      logout() {
        //清除浏览器缓存的token
        localStorage.removeItem('eleToken');
        //清除 state 的数据，调用action的方法
        this.$store.dispatch('clearInfo');
        // 重定向到 login 页面
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>
  .headerTop{
    max-width: 100%;
    height: 60px;
    min-width: 600px;
    background: #324057;
    color: #fff;
    padding: 5px;
    border-bottom: 1px solid #1f2d3d;
  }
  .title-container{
    line-height: 60px;
    min-width: 300px;
  }
  .title{
    margin-left: 20px;
    font-family: "Microsoft YaHei";
    vertical-align: middle;
    font-size: 22px;
    letter-spacing: 3px;
  }
  .user{
    line-height: 60px;
    text-align: right;
    float: right;
    padding-right: 10px;
  }
  .avater {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
  }
  .welcome {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 0 5px;
  }
  .name{
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }
  .comename {
    font-size: 12px;
  }
  .userMenu{
    cursor: pointer;
    margin-right: 6px;
  }
  .el-dropdown-link{
    color: #fff;
  }
</style>
