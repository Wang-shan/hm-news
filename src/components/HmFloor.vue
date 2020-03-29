<template>
  <div class="wrapper">
    <hm-floor :count="count-1" v-if="comment.parent" :comment="comment.parent"></hm-floor>
    <div class="hm-floor" :class="{bt:!comment.parent}">
      <div class="header">
        <div class="left">{{count}}楼 {{comment.user.nickname}}</div>
        <div class="center">{{comment.create_date | date2}}</div>
        <div class="right">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object,
    count: Number
  }
}
</script>

<style lang="less" scoped>
.hm-floor {
  border: 1px solid #000;
  background-color: #eee;
  padding: 10px;
  border-top: none;
  &.bt {
    border-top: 1px solid #000;
  }
  .header {
    display: flex;
    .center {
      flex: 1;
      color: #999;
      margin-left: 10px;
    }
    .right {
      color: #999;
      font-size: 12px;
    }
  }
  .content {
    font-size: 14px;
    padding: 10px 0;
  }
}
</style>