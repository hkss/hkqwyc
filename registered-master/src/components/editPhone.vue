<!--  -->
<template>
  <div class='phonePage'>
    <van-nav-bar
      fixed
      title="验证手机号"
      left-arrow
      @click-left="back"
    >
    </van-nav-bar>
    <div class="topblank"></div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">
          <yd-icon
            slot="icon"
            name="phone3"
            class="userIcon smsIcon"
          ></yd-icon>
        </span>
        <yd-input
          slot="right"
          ref="input01"
          type='number'
          regex="mobile"
          v-model.trim="phone"
          max="11"
          placeholder="请输入手机号码"
        ></yd-input>
      </yd-cell-item>
      <!-- 请输入验证码 -->
      <yd-cell-item>
        <span slot="left">
          <img
            class="userIcon smsIcon"
            src="../assets/msg.png"
            slot='label'
          /></span>
        <input
          type="text"
          slot="right"
          v-model="sms"
          placeholder="请输入验证码"
        >

        <yd-sendcode
          slot="right"
          v-model="start1"
          @click.native="sendCode"
          type="warning"
        ></yd-sendcode>

      </yd-cell-item>
    </yd-cell-group>
    <div class="sureEdit">
      <x-button
        :gradients="['#2BDEC7', '#2AC68C']"
        class="saveBtn"
        @click.native="sureEdit"
      >确认修改</x-button>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  props: ['publicData'],
  components: {},
  data() {
    //这里存放数据
    return {
      phone: "",
      sms: '',
      isCout: false,
      time: "",
      start1: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    back() {
      this.$router.back();
    },
    // 发送验证码
    sendCode() {
      var vm = this
      if (vm.phone == "") {
        vm.$toast("手机号不能为空")
        return
      }
      if (vm.phone == vm.user.mobileNo) {
        vm.$toast("当前号码已被占用")
        return
      }
      vm.$dialog.loading.open('发送中...');
      vm.$http.get('http://59.172.27.186:8888/EDoctor_service/Common/validateCode', {
        params: {
          sid: 123,
          mobileNo: vm.phone,
        }
      }).then(response => {
        console.log(response)
        if (response.data.t.pass == 'true') {
          setTimeout(() => {
            vm.start1 = true;
            vm.$dialog.loading.close();
            vm.$dialog.toast({
              mes: '已发送',
              icon: 'success',
              timeout: 1500
            });
          }, 1000);
        }
      })
    },
    // 确认修改
    sureEdit() {
      var vm = this
      if (vm.phone == "") {
        vm.$toast("手机号不能为空")
        return
      }
      if (vm.sms == "") {
        vm.$toast("验证码不能为空")
        return
      }
      vm.$http.get('http://59.172.27.186:8888/EDoctor_service/Common/validate.json', {
        params: {
          sid: 123,
          mobileNo: vm.phone,
          validataCode: vm.sms
        }
      }).then(response => {
        console.log(response)
        if (response.data.t.pass == 'true') {
          vm.$dialog.toast({
            mes: '验证成功',
            icon: 'success',
            timeout: 1500
          });

          setTimeout(() => {
            vm.$router.push({
              name: 'person',
            })
            vm.phone = ''
            vm.sms = ''
          }, 1500)

        }
      })
    },


  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.user = JSON.parse(localStorage.getItem("userInfo"));
  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang='less'>
.phonePage {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 152;
  background: #f5f3f4;
  .sureEdit {
    margin: 50px 12px 0;
    .saveBtn {
      height: 40px;
      font-size: 14px;
    }
  }
  .yd-cell-item {
    border-bottom: 1px solid #eee;
  }
  .userIcon {
    width: 12px;
    height: 15px;
    margin-right: 10px;
    position: relative;
    top: 2px;
  }
}
</style>