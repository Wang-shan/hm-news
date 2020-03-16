<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>

    <hm-input
      placeholder="用户名/手机号"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式不对"
      ref="username"
    ></hm-input>
    <hm-input
      placeholder="昵称"
      v-model="nickname"
      :rule="/^[\u4e00-\u9fa5]{3,7}$/"
      message="昵称必须是3-7位的中文"
      ref="nickname"
    ></hm-input>
    <hm-input
      placeholder="密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码格式错误"
      ref="password"
    ></hm-input>
    <hm-button @click="register">注册</hm-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      nickname: '',
      password: ''
    }
  },

  methods: {
    register() {
      //表单校验
      let result1 = this.$refs.username.validate(this.username)
      let result2 = this.$refs.nickname.validate(this.nickname)
      let result3 = this.$refs.password.validate(this.password)
      if (!result1 || !result2 || !result3) {
        return
      }
      //校验成功 发送请求
      this.$axios({
        method: 'post',
        url: '/register',
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }
      }).then(res => {
        console.log(res.data)

        if (res.data.statusCode === 200) {
          console.log('hhhhhh')

          this.$toast.success(res.data.message)
          //跳转到登录页
          this.$router.push({
            name: 'login',
            params: { username: this.username, password: this.password }
          })
        } else {
          this.$toast.fail(res.data.message)
        }
      })
    }
  },
}
</script>

<style lang="less" scoped></style>
