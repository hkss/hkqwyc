<!--  -->
<template>
  <div class='doctorRoom'>
    <van-nav-bar
      fixed
      title="医生工作室"
      left-arrow
      @click-left="back"
    >
    </van-nav-bar>
    <div class="topblank"></div>
    <yd-layout>

      <div class="detail">
        <div class="introduceMsg">
          <img
            class="dotorImg"
            src="../assets/head-icon.png"
          />
          <div class="introduce">
            <p>张永科</p>
            <p class="text">副主任医师</p>
            <p class="text">北京大学深圳医院(三级甲等)-妇科</p>
          </div>
          <div
            class="focus"
            @click="focus"
          >+关注</div>
        </div>
        <yd-flexbox>
          <yd-flexbox-item>
            <div class="name">
              <p class="num">1264</p>
              <p>
                <van-icon
                  name="eye-o"
                  size="16px"
                /><span>人气榜</span></p>
            </div>
          </yd-flexbox-item>
          <yd-flexbox-item>
            <div class="name">
              <p class="num">1264</p>
              <p>
                <van-icon
                  name="eye-o"
                  size="16px"
                /><span>人气榜</span></p>
            </div>
          </yd-flexbox-item>
          <yd-flexbox-item>
            <div class="name">
              <p class="num">1264</p>
              <p>
                <van-icon
                  name="eye-o"
                  size="16px"
                /><span>人气榜</span></p>
            </div>
          </yd-flexbox-item>
          <yd-flexbox-item>
            <div class="name lastName">
              <p class="num">1264</p>
              <p>
                <van-icon
                  name="eye-o"
                  size="16px"
                /><span>人气榜</span></p>
            </div>
          </yd-flexbox-item>
        </yd-flexbox>

      </div>
      <div class="service">
        <div class="content">
          <p class="con">
            利用注册用户号码手机邀请通讯录好友加入，每注册成功1人：奖励50分；利用注册用户号码手机邀请通讯录好友加入，每注册成功1人：奖励50分；
          </p>
        </div>
        <p class="title">
          <span class="a">
            医生服务
          </span>
          <span class="b">
            须知
            <van-icon name="question-o" />
          </span>
        </p>
        <div class="service">
          <yd-flexbox>
            <yd-flexbox-item>
              <img
                class="serviceImg"
                src="../assets/head-icon.png"
              />
              <p>电话咨询</p>
              <p class="money">￥35元/次</p>
            </yd-flexbox-item>
            <yd-flexbox-item>
              <img
                class="serviceImg"
                src="../assets/head-icon.png"
              />
              <p>即将上线</p>
              <h5>敬请期待</h5>
            </yd-flexbox-item>
          </yd-flexbox>

        </div>
        <p class="content">
          <span class="comments">
            问诊评价0条
          </span>
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
    focus() { },
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
.doctorRoom {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 156;
  background: #f5f3f4;
  .dotorImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
  }

  .detail {
    padding: 25px 20px 10px 20px;
    color: #fff;
    background: -webkit-linear-gradient(
      left,
      #6cb3a5,
      #00bb67
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      left,
      #6cb3a5,
      #00bb67
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      left,
      #6cb3a5,
      #00bb67
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(
      left,
      #6cb3a5,
      #00bb67
    ); /* 标准的语法（必须放在最后） */
    .introduceMsg {
      height: 100px;

      .introduce {
        padding: 0px 5px;
        line-height: 22px;
        float: left;
        .text {
          font-size: 12px;
        }
      }
      .focus {
        float: right;
        width: 60px;
        text-align: center;
        background: #fff;
        border-radius: 30px;
        color: #07bb6b;
        font-size: 12px;
        padding: 2px 0px;
        position: relative;
        z-index: 10;
      }
    }
    .name {
      text-align: center;
      font-size: 12px;
      line-height: 12px;
      border-right: 1px solid;
      .num {
        color: #fb8231;
      }
      .van-icon {
        top: 3px;
      }
    }
    .lastName {
      border: 0;
    }
  }
  .service {
    .title {
      line-height: 36px;
      padding-left: 12px;
      color: #999;
      background: #fff;
      margin-top: 10px;
      height: 36px;
      border-bottom: 1px solid #d9d9d9;
      .a {
        float: left;
        color: #000;
      }
      .b {
        float: right;
        padding-right: 12px;
        .van-icon {
          top: 3px;
        }
      }
    }
    .content {
      background: #fff;
      margin-top: 10px;
      font-size: 12px;
      padding: 12px;
      .con {
        text-indent: 2em;
      }
      .comments {
        color: #000;
      }
    }
    .service {
      padding: 12px;
      text-align: center;
      font-size: 12px;
      background: #fff;
      .serviceImg {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .money {
        color: red;
      }
      h5 {
        font-weight: normal;
        font-size: 14px;
      }
    }
  }
}
</style>