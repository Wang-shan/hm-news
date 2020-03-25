<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="info" @click="$router.push('/edit')">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="center">
        <div class="name">
          <span v-if="info.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{ info.nickname }}</span>
        </div>
        <div class="time">{{ info.create_date | date }}</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>

    <hm-navbar
      title="我的关注"
      content="关注的用户"
      @click="$router.push('/myfllow')"
    ></hm-navbar>
    <hm-navbar
      title="我的跟帖"
      content="跟帖/回复"
      @click="$router.push('/mycomments')"
    ></hm-navbar>
    <hm-navbar
      title="我的收藏"
      content="文章/视频"
      @click="$router.push('/mystar')"
    ></hm-navbar>
    <hm-navbar title="设置" @click="$router.push('/edit')"></hm-navbar>
    <hm-navbar title="退出" @click="logout"></hm-navbar>
  </div>
</template>

<script>
export default {
  created() {
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')
    this.$axios({
      method: 'GET',
      url: `/user/${user_id}`,
      //请求头
      headers: {
        Authorization: token
      }
    }).then(res => {
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
        console.log(data)
      }
    })
  },
  data() {
    return {
      //存放个人信息
      info: {}
    }
  },
  methods: {
    logout() {
      //点击退出 弹出确认框
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '你确定要退出本系统吗'
        })
        .then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('user_id')
          this.$router.push('/login')
          this.$toast.success('退出成功')
        })
        .catch(() => {
          this.$toast.fail('取消退出')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  height: 100px;
  border-bottom: 3px solid #ccc;
  display: flex;
  align-items: center;
  .left {
    width: 70px;
    img {
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    padding-left: 20px;
    .iconxingbienv {
      color: pink;
    }
    .name span {
      font-size: 16px;
    }
    .time {
      font-size: 14px;
      color: #999;
    }
  }
  .right {
    width: 30px;
    text-align: right;
  }
}
</style>
