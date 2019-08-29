<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">诸葛亮在线后台管理系统</span>
      </div>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="users"
        class="registerForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="users.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="users.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="users.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="users.password2" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="确认身份" prop="identity">
          <el-select v-model="users.identity" placeholder="请选择">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="普通员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn">注 册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data () {
      return {
        labelPosition: 'right',
        users : {
          name:'',
          email: '',
          password:'',
          password2:'',
          identity:''
        }
      }
    }
  }
</script>

<style scoped>
  .register {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg") center center no-repeat;
    background-size: 100% 100%;
  }

  .form_container {
    width: 370px;
    height: 210px;
    position: absolute;
    top: 10%;
    left: 34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
  }

  .form_container .manage_tip .title {
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 26px;
    color: #fff;
  }

  .registerForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
  }

  .submit_btn {
    width: 100%;
  }

</style>
