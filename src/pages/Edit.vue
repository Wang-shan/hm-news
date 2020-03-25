<template>
  <div class="edit">
    <hm-header>用户编辑</hm-header>
    <div class="acatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <!-- 上传头像的组件 -->
      <van-uploader class="uploader" :after-read="afterread" />
    </div>
    <hm-navbar
      title="昵称"
      :content="info.nickname"
      @click="showNickname"
    ></hm-navbar>
    <hm-navbar
      title="密码"
      :content="info.password | password"
      @click="showPassword"
    ></hm-navbar>
    <hm-navbar
      title="性别"
      :content="info.gender === 1 ? '男' : '女'"
      @click="showGender"
    ></hm-navbar>

    <van-dialog
      v-model="show"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>

    <van-dialog
      v-model="show1"
      title="修改密码"
      show-cancel-button
      @confirm="editPassword"
    >
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>

    <van-dialog
      v-model="show2"
      title="修改性别"
      show-cancel-button
      @confirm="editGender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <div class="cropper-mask" v-show="showcropper">
      <vue-cropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
      ></vue-cropper>
      <van-button class="crop" type="primary" @click="crop">确定</van-button>
      <van-button class="cancel" type="info" @click="cancel">取消</van-button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  data() {
    return {
      info: {},
      show: false,
      nickname: '',
      show1: false,
      password: '',
      show2: false,
      gender: 1,
      showcropper: false,
      img: ''
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    //动态渲染
    getInfo() {
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      this.$axios({
        method: 'get',
        url: `/user/${user_id}`,
        headers: {
          Authorization: token
        }
      }).then(res => {
        console.log(res.data)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.info = data
          // console.log(this.info)
        }
      })
    },
    //1 对话框 修改昵称
    showNickname() {
      this.show = true
      this.nickname = this.info.nickname
    },
    userEdit(data) {
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      this.$axios({
        method: 'post',
        url: `/user_update/${user_id}`,
        data,
        headers: {
          Authorization: token
        }
      }).then(res => {
        console.log(res.data)
        const { message, statusCode } = res.data
        if (statusCode === 200) {
          //重新渲染
          this.getInfo()
          //提示
          this.$toast.success(message)
        }
      })
    },
    editNickname() {
      this.userEdit({ nickname: this.nickname })
      // const user_id = localStorage.getItem('user_id')
      // const token = localStorage.getItem('token')
      // this.$axios({
      //   method: 'post',
      //   url: `/user_update/${user_id}`,
      //   data: {
      //     nickname: this.nickname
      //   },
      //   headers: {
      //     Authorization: token
      //   }
      // }).then(res => {
      //   console.log(res.data)
      //   const { message, statusCode } = res.data
      //   if (statusCode === 200) {
      //     //重新渲染
      //     this.getInfo()
      //     //提示
      //     this.$toast.success(message)
      //   }
      // })
    },
    // 2 修改密码
    showPassword() {
      this.show1 = true
      this.password = this.info.password
    },
    editPassword() {
      this.userEdit({ password: this.password })
    },
    // 3 修改性别
    showGender() {
      this.show2 = true
      this.gender = this.info.gender
    },
    editGender() {
      this.userEdit({ gender: this.gender })
    },
    afterread(file) {
      // const token = localStorage.getItem('token')
      console.log(file)
      //显示遮罩
      this.showcropper = true
      //上传那个文件的base64编码
      this.img = file.content

      const fd = new FormData()
      fd.append('file', file.file)

      // this.$axios({
      //   method: 'post',
      //   url: '/upload',
      //   data: fd
      //   // headers: {
      //   //   Authorization: token
      //   // }
      // }).then(res => {
      //   // console.log(res)
      //   const { statusCode, data } = res.data
      //   if (statusCode === 200) {
      //     this.userEdit({
      //       head_img: data.url
      //     })
      //   }
      // })
    },
    //裁剪
    crop() {
      this.$refs.cropper.getCropBlob(data => {
        const fd = new FormData()
        fd.append('file', data)
        this.$axios({
          method: 'post',
          url: '/upload',
          data: fd
        }).then(res => {
          const { statusCode, data } = res.data
          if (statusCode === 200) {
            this.showcropper = false
            this.img = ''
            this.userEdit({
              head_img: data.url
            })
          }
        })
      })
    },
    cancel() {
      this.showcropper = false
      this.img = ''
    }
  },
  filters: {
    password(input) {
      if (input) {
        return input.replace(/./g, '*')
      } else {
        return ''
      }
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="less" scoped>
.acatar {
  position: relative;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: block;
    margin: 30px auto;
  }
  .uploader {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
}
.cropper-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  .crop,
  .cancel {
    position: absolute;
    top: 0;
  }
  .crop {
    left: 0;
  }
  .cancel {
    right: 0;
  }
}
</style>
