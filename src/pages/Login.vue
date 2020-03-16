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
    >
    </hm-input>
    <hm-input
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="用户密码格式错误"
      ref="password"
    >
    </hm-input>

    <hm-button @click="login">登录</hm-button>
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
        if (res.data.statusCode === 200) {
          // alert('恭喜你，登录成功了')
          this.$toast.success('登录成功')
          // 如果登录成功了，需要跳转到个人中心
          this.$router.push('/user')
        } else {
          this.$toast.fail('用户名或者密码错误')
        }
      })
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped></style>
