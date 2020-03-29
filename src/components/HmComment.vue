<template>
  <div class="hm-comment">
    <div class="header">
      <div class="left">
        <img :src="$axios.defaults.baseURL+comment.user.head_img" alt />
      </div>
      <div class="center">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | date2}}</div>
      </div>
      <div class="right" @click="reply(comment.id)">回复</div>
    </div>
    <!-- 楼层 -->
    <hm-floor :count="getCount(0,comment)" v-if="comment.parent" :comment="comment.parent"></hm-floor>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
import HmFloor from './HmFloor'
export default {
  props: {
    comment: Object
  },
  components: {
    HmFloor
  },
  //统计楼层(递归)
  methods: {
    getCount(num, obj) {
      if (obj.parent) {
        return this.getCount(num + 1, obj.parent)
      } else {
        return num
      }
    },
    reply(id) {
      //子传父
      console.log(id)
      this.$emit('reply', id)
    }
  }
}
</script>

<style lang="less" scoped>
.hm-comment {
  border-bottom: 1px solid #ccc;
  padding: 20px;
  .header {
    display: flex;
    .left {
      img {
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      margin-top: 5px;
      margin-left: 10px;
      .name {
        font-size: 16px;
      }
      .time {
        font-size: 14px;
        color: #999;
      }
    }
    .right {
      font-size: 16px;
      margin-top: 5px;
      color: #999;
    }
  }
  .content {
    margin-top: 5px;
    font-size: 12px;
  }
}
</style>