<!--  -->
<template>
  <div class="routerViewPage balance">
    <van-nav-bar
      fixed
      title="账户充值"
      left-arrow
      right-text="消费明细"
      @click-left="routerBack"
      @click-right="statement"
    >
    </van-nav-bar>
    <div class="topblank"></div>
    <div class="AmountOfAccount">
      <div class="AccountWH">
        <div class="title">账户金额:(元)</div>
        <h4>{{ account.balance || "0" }}</h4>
        <p>
          温馨提示 :<br /><span>账户金额可用于电话咨询、预约医生、送礼物、购买商品等。</span>
        </p>
      </div>
    </div>
    <yd-cell-group>
      <yd-cell-item>
        <yd-input
          slot="right"
          type="number"
          v-model="value"
          ref="input10"
          placeholder="请填写充值金额"
        ></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <!-- 付款 -->
    <div class="payBtn">
      <div
        class="yd-button"
        @click="wxpay"
      >微信充值</div>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import { mapGetters, mapMutations } from "vuex";

export default {
  //import引入的组件需要注入到对象中才能使用
  props: ["publicData"],
  components: {},
  data() {
    //这里存放数据
    return {
      value: "",
      user: ""
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapGetters(["account"])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    routerBack() {
      this.$router.back();
    },
    _getData() { },
    wxpay() {
      if (this.value === "") {
        this.$refs.input10.setFocus();
        this.$toast("请填写充值金额");
        return false;
      }
      this.$http
        .get("http://59.172.27.186:8888/app/chaperone_bed/user/recharge", {
          params: {
            userId: JSON.parse(localStorage.getItem("userId")),
            openId: this.publicData.openId,
            money: this.value
          }
        })
        .then(res => {
          if (typeof WeixinJSBridge === "undefined") {
            if (document.addEventListener) {
              document.addEventListener(
                "WeixinJSBridgeReady",
                this.jsApiCall(res.data),
                false
              );
            } else if (document.attachEvent) {
              document.attachEvent(
                "WeixinJSBridgeReady",
                this.jsApiCall(res.data)
              );
              document.attachEvent(
                "onWeixinJSBridgeReady",
                this.jsApiCall(res.data)
              );
            }
          } else {
            this.jsApiCall(res.data);
          }
        });
    },
    jsApiCall(data) {
      const vm = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          debug: true,
          appId: data.appId, // 公众号名称，由商户传入
          timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, // 随机串
          package: data.package,
          signType: "MD5", // 微信签名方式：
          paySign: data.paySign, // 微信签名
          jsApiList: ["chooseWXPay"]
        },
        function (res) {
          if (res.err_msg === "get_brand_wcpay_request:ok") {
            // 查询余额
            vm.$http.get("http://59.172.27.186:8888/app/chaperone_bed/user/seeBalance",
              {
                params: { userId: JSON.parse(localStorage.getItem("userId")) }
              }
            )
              .then(res => {
                vm.setAccount({
                  balance: res.data.balance
                })
                setTimeout(() => {
                  vm.$router.push({
                    path: `/my`
                  });
                  vm.value = "";
                }, 1500);
              });
          } else if (res.err_msg === "get_brand_wcpay_request:cancel") {
            vm.$toast("取消充值");
          } else if (res.err_msg === "get_brand_wcpay_request:fail") {
            vm.$toast("网络异常，请重试");
          }
        }
      );
    },
    statement() {
      this.$router.push({
        path: `/statement`
      });
    },
    ...mapMutations({
      setAccount: "SET_ACCOUNT",
    })
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this._getData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (localStorage.getItem("userInfo")) {
      //我的信息查询是否有未读
      this.user = JSON.parse(localStorage.getItem("userInfo"));
    }
  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="less">
// @import url(); 引入公共css类
.balance {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 0;
  background: #f5f5f5;
  .AmountOfAccount {
    font-size: 14px;
    position: relative;
    background: #fff;

    .AccountWH {
      width: 92%;
      margin: 0 auto;

      .title {
        line-height: 40px;
        font-size: 14px;
        font-weight: 600;
        padding-top: 10px;
      }

      h4 {
        font-size: 24px;
        margin: 0;
        font-weight: normal;
      }

      p {
        color: #999;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-size: 12px;
        padding-top: 10px;

        span {
          padding-left: 30px;
        }
      }
    }
  }

  .payBtn {
    position: fixed;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 20px;
    padding-bottom: 15px;
    bottom: 0;

    .yd-button {
      height: 42px;
      background: #1aad19;
      color: #fff;
      font-size: 16px;
      width: 100%;
      line-height: 42px;
      text-align: center;
      border-radius: 4px;
    }
  }
}
</style>
