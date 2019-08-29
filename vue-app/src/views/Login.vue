<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">诸葛亮在线后台管理系统</span>
      </div>
      <el-form
          label-width="60px"
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          class="loginForm"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登 录</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>没有账号？ <router-link to="/register">注册</router-link></p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
  import jwtDecode from 'jwt-decode';
  export default {
    name: "Login",
    data () {
      return {
        loginUser: {
          email:'',
          password: ''
        },
        rules: {
          email:[
            { type:'email',required: true, message:'请输入邮箱', trigger: 'blur' }
          ],
          password: [
            { required: true, message:'请输入密码', trigger: 'blur' },
            { min: 6 , max: 20, message: '密码在6到20个字符串',trigger:'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/users/login',this.loginUser)
              .then(res => {
                // 拿到token
                // console.log(res);
                const { token } = res.data;
                // 存储到 localStroage 中
                localStorage.setItem('eleToken',token);

                //解析token
                const decoded = jwtDecode(token);
                // console.log(decoded);
                // 如果 decoded 有值的话，那就是不为空，那 !this.isEmpty() 传递过去的就是 true
                this.$store.dispatch('setAuthorizated', !this.isEmpty(decoded));
                this.$store.dispatch('setUser',decoded);

                this.$router.push('/index');
              });
          }
        });
      },

      // 封装判断解析到的token 是否存在，返回值是 true 或者 false
      isEmpty(value) {
        return (
          value === undefined ||
          value === null ||
          (typeof value === 'object' && Object.keys(value).length=== 0) ||
          (typeof value === 'string' && value.trim().length === 0)
        )
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
  .loginForm {
    margin-top: 20px ;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
  }
  .submit_btn{
    width: 100%;
    font-size: 18px;
  }
  .tiparea {
    text-align: right;
    font-size: 14px;
    color: #333;
  }
  .tiparea p a {
    color: #409eff;
  }
</style>
