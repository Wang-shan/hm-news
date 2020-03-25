<template>
  <div class="my-comment">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <van-list
        @load="onload"
        :finished="finished"
        finished-text="没有更多了"
        v-model="loading"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <div class="time">
            {{ item.create_date | date('YYYY-MM-DD HH:mm') }}
          </div>
          <!-- 父评论 -->
          <div class="parent-comment" v-if="item.parent">
            <div class="parent-name">回复：{{ item.parent.user.nickname }}</div>
            <div class="parent-content">
              {{ item.parent.content }}
            </div>
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="link">
            <div class="title one-txt-cut">原文：{{ item.post.title }}</div>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      // 当前页
      pageIndex: 1,
      // 每页的条数
      pageSize: 10
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    getCommentList() {
      this.$axios({
        method: 'get',
        url: '/user_comments',
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          // this.list = data
          this.list = [...this.list, ...data]
          this.loading = false
          //判断是否有更多数据
          if (data.length < this.pageSize) {
            this.finished = true
          }
        }
      })
    },
    onload() {
      console.log('我触底了，我要加载更多数据了')
      setTimeout(() => {
        this.pageIndex++
        this.getCommentList()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .time {
    font-size: 14px;
    color: #999;
    height: 30px;
    line-height: 30px;
  }
  .content {
    font-size: 16px;
    padding: 10px 0;
  }
  .link {
    color: #999;
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    justify-content: space-between;
    .title {
      flex: 1;
    }
    span {
      width: 50px;
      text-align: right;
    }
  }
  .parent-comment {
    background-color: #ddd;
    padding: 10px;
    font-size: 14px;
    color: #999;
    line-height: 30px;
    .parent-name {
      font-size: 12px;
    }
  }
}
</style>
