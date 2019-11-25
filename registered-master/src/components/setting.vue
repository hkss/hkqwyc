<!--  -->
<template>
  <div class='settingPage'>
    <van-nav-bar
      fixed
      title="设置"
      left-arrow
      @click-left="back"
    > </van-nav-bar>
    <div class="topblank"></div>
    <yd-cell-group>
    </yd-cell-group>
    <yd-cell-group>
      <yd-cell-item
        arrow
        type="link"
        href="eaditPwd"
      >
        <span slot="left">修改密码</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">清除缓存</span>
        <span slot="right"></span>
      </yd-cell-item>
      <div @click="setEmit">
        <yd-cell-item arrow>
          <span slot="left">设置需要推送消息</span>
        </yd-cell-item>
      </div>
    </yd-cell-group>
    <yd-cell-group>
      <yd-cell-item
        arrow
        type="link"
        href="about"
      >
        <span slot="left">关于我们</span>
      </yd-cell-item>
      <yd-cell-item
        arrow
        type="link"
        href="feedback"
      >
        <span slot="left">意见反馈</span>
      </yd-cell-item>

      <yd-cell-item arrow>
        <span slot="left">为E号通打分</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group>
      <div
        class="extBtn"
        @click="exit"
      >退出登录</div>
      <van-dialog
        v-model="exitIsshow"
        show-cancel-button
        :before-close="exitBeforeClose"
      >
        <div class="content">确认退出吗?</div>
      </van-dialog>
    </yd-cell-group>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import { mapMutations } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  props: ["publicData"],
  components: {},
  data() {
    //这里存放数据
    return {
      exitIsshow: false,

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    back() {
      this.$router.push({
        name: 'my'
      })
    },
    exit() {
      this.exitIsshow = true
    },

    setEmit() {
      console.log(111)
      this.$toast("功能建设中")
    },
    exitBeforeClose(action, done) {
      if (action === 'confirm') {
        setTimeout(done, 1000);
        this.$router.push({
          name: 'login'
        })
        localStorage.clear();
        this.publicData.appoiForm = {};
        this.user = {};
        this.setLoginMsg({
          state: false,
          user: {}
        });
      } else {
        done();
      }
    },
    ...mapMutations({
      setLoginMsg: "SET_ISLOGIN"
    })
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

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
//@import url(); 引入公共css类
.settingPage {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 152;
  background: #f5f3f4;

  .extBtn {
    line-height: 40px;
    text-align: center;
    background: #fff;
    border-radius: 4px;
  }
  .content {
    text-align: center;
    line-height: 40px;
    margin: 20px;
  }
}
.yd-cell-item {
  border-bottom: 1px solid #eee;
}
</style>