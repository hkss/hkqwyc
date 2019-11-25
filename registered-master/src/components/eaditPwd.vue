<!--  -->
<template>
  <div class="pwdPage">
    <van-nav-bar fixed title="修改密码" left-arrow @click-left="back">
    </van-nav-bar>
    <div class="topblank"></div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">旧密码：</span>
        <yd-input
          slot="right"
          v-model="oldPwd"
          required
          :show-success-icon="false"
          :show-error-icon="false"
          placeholder="请输入旧密码"
        >
        </yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">新密码：</span>
        <yd-input
          slot="right"
          v-model="newPwd"
          required
          :show-success-icon="false"
          :show-error-icon="false"
          placeholder="6~20位数字和字母组成"
        ></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">确认密码：</span>
        <yd-input
          slot="right"
          v-model="surePwd"
          required
          :show-success-icon="false"
          :show-error-icon="false"
        ></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <div class="sureEdit">
      <x-button
        :gradients="['#2BDEC7', '#2AC68C']"
        class="saveBtn"
        @click.native="sureEdit"
        >确认修改</x-button
      >
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { hexMD5 } from "@/js/md5.js";

export default {
  //import引入的组件需要注入到对象中才能使用
  props: ["publicData"],
  components: {},
  data() {
    //这里存放数据
    return {
      oldPwd: "",
      newPwd: "",
      surePwd: "",
      user: ""
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
    sureEdit() {
      var vm = this;
      if (vm.oldPwd == "" || vm.newPwd == "" || vm.surePwd == "") {
        vm.$toast("密码不能为空");
        return;
      }
      if (hexMD5("cxy_framework" + vm.oldPwd) != vm.user.passWord) {
        vm.$toast("原密码不正确");
        return;
      }
      if (vm.newPwd != vm.surePwd) {
        vm.$toast("两次密码不一致");
        return;
      }
      vm.$http
        .get(
          vm.publicData.url.url2 + "/manager/account/user/updatePassWord.json",
          {
            params: {
              sid: 123,
              mobileNo: vm.user.mobileNo,
              passWord: hexMD5("cxy_framework" + vm.newPwd)
            }
          }
        )
        .then(response => {
          if (response.data.t.pass == "true") {
            vm.$dialog.toast({
              mes: "修改成功",
              icon: "success",
              timeout: 1500
            });

            setTimeout(() => {
              vm.$router.push({
                name: "setting"
              });
              vm.oldPwd = "";
              vm.newPwd = "";
              vm.surePwd = "";
            }, 1500);
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.user = JSON.parse(localStorage.getItem("userInfo"));
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="less">
//@import url(); 引入公共css类
.pwdPage {
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
}
.yd-cell-item {
  border-bottom: 1px solid #eee;
}
</style>
