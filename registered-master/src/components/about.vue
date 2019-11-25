<!--  -->
<template>
  <div class='about'>
    <van-nav-bar
      fixed
      title="关于我们"
      left-arrow
      @click-left="back"
    > </van-nav-bar>
    <div class="topblank"></div>
    <yd-layout>
      <div class="content">
        <p>2014—2017</p>
        <p>
          2014年7月湖北百穗健康管理有限公司成立。
        </p>
        <p>
          公司愿景：<span class="name">“立足湖北，面向全国，服务民众”</span>，围绕健康服务产业创业和发展。
        </p>
        <p>
          先后开发出“E大夫在线”医疗服务平台及“E大夫”APP、婚前医学检查/孕前优生健康检查业务应用系统、（再）生育咨询服务系统等产品。
        </p>
        <p>
          “E大夫在线”门户网站累计访问量突破200万。
        </p>
        <p>
          2017—至今
        </p>
        <p>
          2017.04湖北百穗健康管理有限公司更名为湖北百穗健康科技有限公司。
        </p>
        <p>
          整合“E大夫在线”医疗服务平台及“E大夫”APP。
        </p>
        <p>
          申请“一种辅助医疗服务系统、方法及终端”发明专利（专利申请号：201710656487.2）。
        </p>
        <p>
          开发出辅助医疗服务系统及“E号通”APP，让医院拥有移动的挂号窗口，让病人挂号避免排队困扰。
        </p>
      </div>
    </yd-layout>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {

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
.about {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 152;
  background: #f5f3f4;
  .content {
    margin: 8px;
    font-size: 14px;
    color: #3e3e3e;
    p {
      text-align: left;
      text-indent: 2em;
      line-height: 23px;
    }
    .name {
      font-weight: 600;
    }
  }
}
</style>