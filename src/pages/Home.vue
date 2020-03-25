<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="center">
        <span class="iconfont iconsearch"></span>
        <span class="text">搜索新闻</span>
      </div>
      <div class="right">
        <span class="iconfont iconwode" @click="$router.push('/user')"></span>
      </div>
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
        <!-- 分页效果 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          :offset="50"
          @load="onload"
        >
          <hm-post v-for="post in postList" :key="post.id" :post="post"></hm-post>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabList: [],
      postList: [],
      //页数
      pageSize: 5,
      //当前页
      pageIndex: 1,
      loading: false,
      finished: false
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        console.log(this.tabList)

        this.getPostList(this.tabList[this.active].id)
      }
    },
    async getPostList(id) {
      console.log('获取内容')
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      this.postList = [...this.postList, ...data]
      //数据加载完成
      this.loading = false
      //判断是否有更多数据
      if (data.length < this.pageSize) {
        this.finished = true
      }
      console.log(this.postList)
    },
    onload() {
      console.log('onLoad')
      const id = this.tabList[this.active].id
      console.log(id)
      setTimeout(() => {
        this.pageIndex++
        this.getPostList(id)
      }, 1000)
    }
  },
  watch: {
    active(value) {
      // console.log('active变化', value)
      //切换栏目数据初始化
      this.postList = []
      this.pageIndex = 1
      this.finished = false

      const id = this.tabList[value].id
      this.getPostList(id)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  line-height: 50px;
  align-items: center;
  background-color: #ff0000;
  color: #fff;
  padding-left: 10px;
  .left,
  .right {
    width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .iconnew {
    font-size: 50px;
  }
  .iconwode {
    font-size: 24px;
  }
  .center {
    flex: 1;
    font-size: 14px;
    height: 34px;
    line-height: 34px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 17px;
    padding-left: 5px;
    .text {
      margin-left: 5px;
    }
  }
}

//深度作用器
/deep/ .van-tabs__nav {
  background-color: #ddd;
}
</style>