<!--  -->
<template>
  <div class='feedback'>
    <van-nav-bar
      fixed
      title="意见反馈"
      left-arrow
      @click-left="back"
    > </van-nav-bar>
    <div class="topblank"></div>
    <div class="content">
      <yd-cell-group>
        <yd-cell-item>
          <yd-textarea
            slot="right"
            v-model="area"
            maxlength="100"
          ></yd-textarea>
        </yd-cell-item>
      </yd-cell-group>
      <h5>温馨提示</h5>
      <p>您在使用E号通时，如有问题或建议，请在此提交，我们将尽快解决</p>
      <p>感谢你您对E号通的不懈支持！E号通将持续努力，为您提供更好的服务</p>
    </div>
    <div class="sureFeedBack">
      <x-button
        :gradients="['#2BDEC7', '#2AC68C']"
        class="saveBtn"
        @click.native="sureFeedBack"
      >提交</x-button>
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
      area: ''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    back() {
      this.$router.back()
    },
    sureFeedBack() {
      var vm = this
      if (vm.area == '') {
        vm.$toast("内容不能为空")
        return
      }
      vm.$http.get(vm.publicData.url.url2 + '/feedback/send.json', {
        params: {
          sid: 123,
          userId: JSON.parse(localStorage.getItem('userId')),
          version: 'E号通公众号',
          content: this.area,
        }
      }).then(response => {
        if (response.data.t.pass == 'true') {
          vm.$dialog.toast({
            mes: '提交成功',
            icon: 'success',
            timeout: 1500
          });
          setTimeout(() => {
            vm.$router.push({
              name: 'setting',
            })
            vm.area = ''
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
.feedback {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 152;
  background: #f5f3f4;
  .content {
    margin: 8px;
    font-size: 12px;
    h5 {
      font-weight: normal;
      color: #868282;
    }
    p {
      text-indent: 2em;
      line-height: 22px;
      color: #868282;
    }
  }
  .sureFeedBack {
    margin: 30px 12px 0;
  }
}
.yd-cell-item {
  border-bottom: 1px solid #eee;
}
</style>