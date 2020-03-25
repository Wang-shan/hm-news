<template>
  <div class="hm-navbar" @click="clickFn">
    <div class="left">{{ title }}</div>
    <div class="center">{{ content }}</div>
    <div class="right">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: String
  },
  methods:{
    clickFn(){
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.hm-navbar {
  display: flex;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  margin-left: 20px;
  font-size: 14px;
  .center {
    flex: 1;
    text-align: right;
    color: #999;
  }
  .right {
    width: 30px;
    text-align: center;
    color: #999;
  }
}
</style>
