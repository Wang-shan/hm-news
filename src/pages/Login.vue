<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>

    <hm-input
      type="text"
      placeholder="请输入用户名"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式不对"
      ref="username"
    ></hm-input>
    <hm-input
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="用户密码格式错误"
      ref="password"
    ></hm-input>

    <hm-button @click="login">登录</hm-button>
    <div class="go-register">
      没有账号？去
      <router-link class="link" to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  methods: {
    login() {
      // 做一个表单的校验,如果表单校验不通过，不应该去发送请求
      const result1 = this.$refs.username.validate(this.username)
      const result2 = this.$refs.password.validate(this.password)

      if (!result1 || !result2) {
        return
      }

      this.$axios({
        method: 'post',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        // res.data才是后台真正返回的数据
        console.log(res.data)
        const { statusCode, data, message } = res.data
        if (statusCode === 200) {
          // alert('恭喜你，登录成功了')
          this.$toast.success(message)
          //保存登录的token信息
          localStorage.setItem('token', data.token)
          localStorage.setItem('user_id', data.user.id)
          // 如果登录成功了，需要跳转到个人中心 也可能需要回跳
          if (this.$route.params.back) {
            this.$router.back
          } else {
            this.$router.push('/user')
          }
        } else {
          this.$toast.fail(message)
        }
      })
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  created() {
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  }
}
</script>

<style scoped lang="less">
.go-register {
  text-align: right;
  padding: 0 20px;
  font-size: 16px;
  .link {
    color: orange;
  }
}
</style>
