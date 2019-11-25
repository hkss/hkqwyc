<template>
  <div class="addZhenR">
    <van-nav-bar
      :title="tit"
      left-arrow
      @click-left="back"
    />
    <div class="topblank"></div>
    <x-input
      title="姓名"
      placeholder="请输入真实姓名"
      v-model.trim="contactName"
      text-align='right'
      is-type='china-name'
      required
      ref="input01"
    ></x-input>
    <x-input
      title="身份证号码"
      placeholder="请输入真实身份证号码"
      v-model.trim='contactIdcard'
      text-align='right'
      required
      ref="input02"
      :is-type="isIdentity"
      :min='18'
      :max='18'
    ></x-input>

    <x-button
      :gradients="['#2BDEC7', '#2AC68C']"
      class="saveBtn"
      @click.native="save"
    >保存</x-button>

    <div
      class="zhu"
      v-if='tit=="实名认证"'
    >注：需完成身份证实名制才可使用后续功能</div>

    <loading
      :show="showLoad1"
      text="加载中"
    ></loading>

  </div>
</template>

<script>

export default {
  props: ['publicData'],
  data() {
    return {
      tagMsg: '',
      respFlag: false,
      showLoad1: false,
      tit: '',
      contactName: '',
      contactIdcard: '',
      isIdentity: function (value) {
        var reg1 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        return {
          valid: reg1.test(value) === true,
          msg: "请输入正确的身份证格式!"
        }
      },
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: "zhenR"
      })
    },
    save() {
      if (!this.$refs.input01.valid || !this.$refs.input02.valid) {
        return
      }
      this.showLoad1 = true;
      this.$http.get(this.publicData.url.rootUrl + '/contacts/verifyIdcard', {
        params: {
          sid: '123',
          userId: JSON.parse(localStorage.getItem("userInfo")).id,
          contactName: this.contactName,
          contactIdcard: this.contactIdcard,
          contactType: this.tit1 == '实名认证' ? 1 : 0,//1.本人
        }
      }).then(response => {
        this.showLoad1 = false;
        this.back()
      }).catch(error => {
        this.showLoad1 = false;
        this.respFlag = true;
        this.tagMsg = '请求错误'
      });
    },

  },
  mounted() {
    this.tit = this.$route.params.tit;
  },
}
</script>

<style scoped lang='less'>
.addZhenR {
  .saveBtn {
    width: 90%;
    margin: 20px auto;
  }
  .zhu {
    font-size: 12px;
    color: grey;
    padding: 10px 15px;
  }
}
</style>
