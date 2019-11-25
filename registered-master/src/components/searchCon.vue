<!--  -->
<template>
  <div class="">
    <yd-search
      :result="result"
      placeholder="请输入症状/疾病/医生"
      v-model="value2"
      :item-click="itemClickHandler"
      :on-submit="submitHandler"
    ></yd-search>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  props: ["publicData"],
  components: {},
  data() {
    //这里存放数据
    return {
      value2: "",
      result: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    value2(val) {
      this.result = this.getResult(val);
    }
  },
  //方法集合
  methods: {
    getResult(val) {
      if (!val) return [];
      return [
        "Apple",
        "Banana",
        "Orange",
        "Durian",
        "Lemon",
        "Peach",
        "Cherry",
        "Berry",
        "Core",
        "Fig",
        "Haw",
        "Melon",
        "Plum",
        "Pear",
        "Peanut",
        "Other"
      ].filter(value => new RegExp(val, "i").test(value));
    },
    itemClickHandler(item) {
      alert("itemClickHandler", item);
      this.$router.push({
        name: "searchRes"
      });
    },
    submitHandler(value) {
      alert("submitHandler", value);
      this.$router.push({
        name: "searchRes"
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
</style>
