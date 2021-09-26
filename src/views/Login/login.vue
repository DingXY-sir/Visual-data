<template>
  <div class="login-container">
    <!-- 使用粒子效果 -->
    <vue-particles 
      class="vue-particles" 
      color="#dedede" 
      :particleOpacity="0.7" 
      :particlesNumber="80" 
      shapeType="star" 
      :particleSize="4" 
      linesColor="#dedede" 
      :linesWidth="1" 
      :lineLinked="true" 
      :lineOpacity="0.4" 
      :linesDistance="150" 
      :moveSpeed="3" 
      :hoverEffect="true" 
      hoverMode="grab" 
      :clickEffect="true" 
      clickMode="push">
    </vue-particles>
    <div class="login">
      <!-- logo -->
      <div class="login-logo"></div>
      <!-- 表单 -->
      <el-form class="login-from" ref="loginFrom" label-width="0" :model="login" :rules="loginFrom">
        
        <el-form-item class="login-item" prop="username">
          <el-input prefix-icon="iconfont icon-yonghuming" v-model="login.username"></el-input>
        </el-form-item>
        <el-form-item class="login-item" prop="password">
          <el-input prefix-icon="iconfont icon-mima" v-model="login.password"></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="signIn">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
       
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      login:{
        username:'',
        password:''
      },
      loginFrom:{
        username:[
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    //登录
    signIn() {
      this.$refs.loginFrom.validate((valid) => {
        //如果vali为false校验不通过
        if(!valid) return; 
        //校验通过调登录接口
        if(this.login["username"] !="ding") return this.$message.error('登录失败');
        this.$message.success('登录成功')
        //将token保存在
        window.sessionStorage.setItem('token','dxy1217')
        this.$router.push('/home')
      })
    },
    //重置
    reset() {
      this.$refs.loginFrom.resetFields()
    }
  },
  created() {},
  mounted() {
  
  }
};
</script>
<style lang="scss" scoped>
.login-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .vue-particles{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .login{
    width: 600px;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 10px;
    position: relative;
    display: flex;
    justify-content: center;
    .login-logo{
      width: 200px;
      height: 100px;
      background:url('~assets/img/picc.jpeg') no-repeat;
      background-size:100%  100%;
    }
    .login-from{
      position: absolute;
      top: 150px;
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
      .login-btn{
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>