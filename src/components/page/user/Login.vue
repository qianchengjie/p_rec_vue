<template>
  <div class="login-reg-page">
    <transition
    :enter-active-class="'animated ' + (isLogin ? 'slideInLeft' : 'slideInRight')"
    :leave-active-class="'animated ' + (isLogin ? 'slideOutRight' : 'slideOutLeft')">
      <div v-if="isLogin" :key="1" class="login">
        <div class="login-header">
          <h2 class="login-header-title">登录</h2>
          <h1 style="font-size: 60px;">LOGO</h1>
        </div>
        <el-form
        class="form"
        ref="loginForm"
        :model="loginForm"
        :rules="loginForm.rules">
          <el-form-item prop="userName" class="hide-req-tip">
            <el-input v-model="loginForm.userName" placeholder="用户名" >
              <icon slot="prepend" name="account" :h="20" :w="20" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="hide-req-tip">
            <el-input v-model="loginForm.password" placeholder="密码" >
              <icon slot="prepend" name="password" :h="20" :w="20" />
            </el-input>
          </el-form-item>
          <el-form-item style="margin-top: 40px">
              <el-button :loading="loginForm.loading" style="width: 100%" type="success" @click.native="submitForm('loginForm')">{{loginForm.loading ? '登录中...' : '登录'}}</el-button>
          </el-form-item>
          <el-form-item style="position: relative">
            <span style="position: absolute; left: 0"> 找回密码</span>
            <span @click="isLogin=false" style="position: absolute; right: 0">注册帐号</span>
          </el-form-item>
        </el-form>
      </div>
      <div v-else :key="2" class="register">
        <div class="register-header">
          <h2 class="register-header-title">注册新账号</h2>
        </div>
        <el-form
        class="form"
        ref="registerForm"
        :key="2"
        :model="registerForm"
        :rules="registerForm.rules">
          <el-form-item prop="userName" class="hide-req-tip">
            <el-input v-model="registerForm.userName" placeholder="用户名" >
              <icon slot="prepend" name="account" :h="20" :w="20" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="hide-req-tip">
            <el-input v-model="registerForm.password" placeholder="密码" >
              <icon slot="prepend" name="password" :h="20" :w="20" />
            </el-input>
          </el-form-item>
          <el-form-item prop="passwordConfirm" class="hide-req-tip">
            <el-input v-model="registerForm.passwordConfirm" placeholder="确认密码" >
              <icon slot="prepend" name="password" :h="20" :w="20" />
            </el-input>
          </el-form-item>
          <el-form-item style="margin-top: 40px">
              <el-button :loading="registerForm.loading" style="width: 100%" type="primary" @click.native="submitForm('registerForm')">{{registerForm.loading ? '注册中...' : '注册'}}</el-button>
          </el-form-item>
          <el-form-item style="position: relative">
            <span @click="isLogin=true" style="position: absolute; right: 0">返回登录</span>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
import { XInput } from 'vux'
import { mapActions } from 'vuex'

export default {
  components: {
    XInput
  },
  data () {
    let rulePass = [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
    let validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isLogin: true,
      loginForm: {
        loading: false,
        userName: null,
        password: null,
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: rulePass
        }
      },
      registerForm: {
        loading: false,
        userName: null,
        password: null,
        passwordConfirm: null,
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: rulePass,
          passwordConfirm: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (formName) {
            case 'loginForm':
              this.loginForm.loading = true
              this.login().then(res => {
                this.loginForm.loading = false
              }).catch(res => {
                this.loginForm.loading = false
              })
              break
            case 'registerForm':
              this.registerForm.loading = true
              setTimeout(() => {
                this.registerForm.loading = false
              }, 1000)
              break
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
#hr() {
  content: ' ';
  height: 1px;
  background-color: #666;
  width: 50vw;
  margin: 2vh 0 4vh 25vw;
  display: block;
}
.login-reg-page {
  background-color: #323642;
  height: 100vh;
  color: #FFF;
  .form {
    position: absolute;
    width: 80vw;
    margin-left: 10vw;
  }
  .login {
    position: absolute;
    width: 100%;
    .login-header {
      text-align: center;
      padding-bottom: 10vh;
      .login-header-title {
        padding-top: 5vh;
        &::after {
          #hr
        }
      }
    }
  }
  .register {
    position: absolute;
    width: 100%;
    .register-header {
      height: 32vh;
      text-align: center;
      .register-header-title {
        padding-top: 5vh;
        &::after {
          #hr
        }
      }
    }
  }

  .el-form-item.is-required.hide-req-tip .el-form-item__label:before {
    content: '' !important
  }
  .el-input-group__prepend, .el-input__inner{
    color: #FFF;
    border: 0;
    caret-color: #FFF;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .el-form-item__error {
    color: #FFF;
    text-align: center;
  }
  .slideInRight, .slideInLeft, .slideOutRight, .slideOutLeft {
    animation-duration: .5s;
  }
}
</style>