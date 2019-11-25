<!--  -->
<template>
  <div class=''>
    <van-nav-bar
      fixed
      title="积分奖励计划"
      left-arrow
      @click-left="back"
    > </van-nav-bar>
    <div class="topblank"></div>
    <yd-layout>
      <div class="content">
        <p>为提高“E号通“吸引力，调动用户会员参与积极性，特推出“E号通积分奖励计划”。</p>
        <p class="name">
          一、积分原则
        </p>
        <p>
          （一）注册成为“E号通“APP用户，即赠送一次性奖励积分；
        </p>
        <p>
          （二）参与互动次数越多，积分越多；积分越高，享受奖励项目越大；
        </p>
        <p>
          （三）积分累计达到一定分值，即可用一定积分值换取相应奖励项目；
        </p>
        <p>
          （四）会员积分不清零、不过期。
        </p>
        <p class="name">
          二、积分计算方法
        </p>
        <p>
          （一）注册成为“E号通“会员：奖励100分；
        </p>
        <p>
          （二）参与客户端互动区互动活动并点赞其它用户的发言或发送短信、表情：奖励2分/条（次）；
        </p>
        <p>
          （三）对服务的医生或亲朋好友发送祝福短信、表情：奖励5分/条（次）；
        </p>
        <p>
          （四）对服务的医生或亲朋好友发送祝福电子贺卡：奖励10分/个（次）；
        </p>
        <p>
          （五）用户在互动区发表本人参与“E号通“APP活动的经验分享或发帖：奖励20分/次；
        </p>
        <p>
          （六）利用注册用户号码手机邀请通讯录好友加入，每注册成功1人：奖励50分；
        </p>
        <p>
          （七）在百穗商城购物， 基础积分5分/次，再加上按结算价10%计算所得的积分（取整），为累计购物1次所得积分；
        </p>
        <p>
          （八）用“E号通”APP挂号成功，奖励5分/次。
        </p>
        <p class="name">
          三、积分奖励项目
        </p>
        <p>
          （一）积分换话费；
        </p>
        <p>
          （二）积分换免费省内某景点旅游机会；

        </p>
        <p>
          （三）积分换免费省外某景点旅游机会；

        </p>

        <p>
          （四）其它奖励项目（百穗商城折扣等）。

        </p>
        <p class="name">
          四、积分兑换

        </p>
        <p>
          （一）会员累计积分达到一定积分值，即可换取相应奖励项目（具体兑换办法见www.51edoctor.com官网通知）;
        </p>
        <p>
          （二）会员兑换奖励项目后，该奖励项目所对应的积分自动从积分中扣除。
        </p>
        <p class="name">
          五、其它
        </p>
        <p>
          本“积分奖励计划”由湖北百穗健康科技有限公司负责解释。
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
      this.$router.back();
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
</style>