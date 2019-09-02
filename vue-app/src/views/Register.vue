<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">诸葛亮在线后台管理系统</span>
      </div>
      <el-form label-width="80px" :model="registerUser" :rules="rules" ref="registerForm" class="registerForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="确认身份" prop="identity">
          <el-select v-model="registerUser.identity" placeholder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="普通员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注 册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data () {
      let validatePass2 = (rule, value, callback) => {
        if (value !== this.registerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerUser : {
          name:'',
          email: '',
          password:'',
          password2:'',
          identity:''
        },
        rules: {
          name: [
            { required: true,message:'名字不能为空', trigger: 'blur' },
            { min: 2 , max: 20, message: '名字在2到20个字符串',trigger:'blur'}
          ],
          email: [
            { type:'email',required: true, message:'邮箱不能为空', trigger: 'blur' },
          ],
          password: [
            { required: true, message:'密码不能为空', trigger: 'blur' },
            { min: 6 , max: 20, message: '密码在6到20个字符串',trigger:'blur'}
          ],
          password2: [
            { required: true, message:'确认密码不能为空', trigger: 'blur' },
            { min: 6 , max: 20, message: '密码在6到20个字符串',trigger:'blur'},
            { validator: validatePass2, trigger:'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios
              .post('/api/users/register',this.registerUser)
              .then( res => {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
              });
            this.$router.push('/login');
          }
        });
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
