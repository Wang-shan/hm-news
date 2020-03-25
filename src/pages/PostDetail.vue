<template>
  <div class="post-detail">
    <div class="header">
      <div class="left">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="right">
          <div class="followed" v-if="detail.has_follow" @click="unfollow(detail.user.id)">已关注</div>
          <div class="follow" v-else @click="follow(detail.user.id)">关注</div>
        </div>
      </div>
    </div>
    <div class="detail-content">
      <!-- 标题 -->
      <div class>{{detail.title}}</div>
      <!-- 作者 时间 -->
      <div class="user">
        <span>{{detail.user.nickname}}</span>
        <span>{{detail.crtete_date|date}}</span>
      </div>
      <!-- 内容 -->
      <div class="content" v-html="detail.content"></div>
      <div class="btns">
        <div class="btn like" :class="{active: detail.has_like}" @click="like">
          <span class="iconfont icondianzan"></span>
          <span>{{detail.like_length || 0}}</span>
        </div>
        <div class="btn share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <!-- 文章的底部 -->
    <div class="footer">
      <div class="input" v-if="!isShow">
        <input type="text" placeholder="写跟帖" @focus="handelFocus" />
        <span class="iconfont iconpinglun-">
          <span>{{detail.comment_length}}</span>
        </span>
        <span class="iconfont iconshoucang"></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
      <div class="textarea" v-else>
        <textarea placeholder="回复" @blur="handleBlur" ref="textarea"></textarea>
        <div class="send">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用于存放文章详情
      detail: {
        user: {}
      },
      isShow: false
    }
  },
  async created() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res)

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.detail = data
      }
    },
    async follow(id) {
      //判断是否登录
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          name: 'login',
          params: { back: true }
        })
        this.$toast('请先登录')
        return
      }
      const res = await this.$axios.get(`/user_follows/${id}`)
      console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast('关注成功')
        this.detail.has_follow = true
        //重新渲染
        // this.getDetail()
      }
    },
    async unfollow(id) {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          name: 'login',
          params: { back: true }
        })
        this.$toast('请先登录')
        return
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast('取关成功')
        // this.detail.has_follow = false
        //重新渲染
        this.getDetail()
      }
    },
    async like() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          name: 'login',
          params: { back: true }
        })
        this.$toast('请先登录')
        return
      }
      const res = await this.$axios.get(`/post_like/${this.detail.id}`)
      const { statusCode, message } = res.data
      console.log(res)
      if (statusCode === 200) {
        this.$toast(message)
        this.getDetail()
      }
    },
    async handelFocus() {
      this.isShow = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    handleBlur() {
      this.isShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  padding: 0 10px;
  .center {
    height: 50px;
    line-height: 50px;
    padding-left: 5px;
    flex: 1;
    .iconfont {
      font-size: 40px;
    }
  }
  .followed {
    height: 28px;
    line-height: 28px;
    border: 1px solid #ccc;
    border-radius: 15px;
    padding: 0 15px;
  }
  .follow {
    height: 28px;
    line-height: 28px;
    border: 1px solid #ff0000;
    background-color: #ff0000;
    color: #fff;
    border-radius: 14px;
    padding: 0 18px;
  }
}

.detail-content {
  padding: 0 20px;
  .title {
    font-weight: 700;
    font-size: 24px;
    padding: 20px 0;
  }
  .user {
    color: #999;
    font-size: 14px;
    margin-bottom: 20px;
    span {
      margin-right: 10px;
    }
  }
  /deep/ img {
    width: 100%;
    display: block;
  }
  .content {
    font-size: 14px;
  }
}

.btns {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  .btn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #000;
    padding: 0 15px;
    border-radius: 15px;
    text-align: center;
    font-size: 14px;
    span:first-child {
      margin-right: 5px;
    }
    &.active {
      border-color: red;
      color: red;
    }
  }
  .share {
    color: #00c800;
    border: 1px solid #00c800;
  }
}

.footer {
  .input {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-top: 1px solid #ccc;
    input {
      height: 30px;
      width: 180px;
      background-color: #ddd;
      border-radius: 15px;
      outline: none;
      border: none;
      padding-left: 20px;
    }
    .iconfont {
      font-size: 22px;
    }
    .active {
      color: red;
    }
    .iconpinglun- {
      position: relative;
      span {
        position: absolute;
        font-size: 12px;
        background-color: red;
        color: #fff;
        top: -7px;
        left: 9px;
        padding: 0 5px;
      }
    }
  }
  .textarea {
    border-top: 1px solid #ccc;
    display: flex;
    height: 100px;
    display: flex;
    align-items: flex-end;
    padding: 20px;
    textarea {
      flex: 1;
      height: 80px;
      background-color: #ddd;
      border-radius: 10px;
      padding: 10px;
      border: none;
      outline: none;
    }
    .send {
      height: 30px;
      line-height: 30px;
      padding: 0 18px;
      border-radius: 15px;
      background-color: red;
      color: #fff;
      margin: 0 10px;
    }
  }
}
</style>