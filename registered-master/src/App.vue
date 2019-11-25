<template>
  <div id="app">
    <router-view :publicData="rootData"></router-view>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import { mapGetters, mapMutations } from "vuex";
export default {
  props: ["publicData"],
  data() {
    return {
      rootData: {
        appoiForm: {},
        url: {
          imgUrl: "http://59.172.27.186:8888/E2306_service/",
          rootUrl: "http://59.172.27.186:8888/E2306_service/app",
          url2: "http://59.172.27.186:8888/EDoctor_service/app",
          wangX: "http://192.168.1.27:8111/E2306_service/app",
          pic: "http://59.172.27.186:8888"
        },
        basic: {},
        wxCfg: {},
        openId: ""
      }
    };
  },
  computed: {
    ...mapGetters(["islogin", "account"])
  },
  methods: {
    _getData() {
      var wxUrl = location.href.split("#")[0];
      this.$http
        .get("http://www.51edoctor.cn/eht/RichScan", {
          params: {
            url: wxUrl
          }
        })
        .then(function (response) {
          // 传统写法
          this.rootData.wxCfg = response.data;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: response.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: response.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: response.data.nonce_str, // 必填，生成签名的随机串
            signature: response.data.signature, // 必填，签名，见附录1
            jsApiList: ["getLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function () {
            wx.getLocation({
              type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                localStorage.setItem("userLatitude", res.latitude);
                localStorage.setItem("userLongitude", res.longitude);
              }
            });
          });
        });
      // 获取code
      this.$http
        .get(
          "http://59.172.27.186:8888/app/chaperone_bed/user/getWeixinBackUrl",
          {
            params: {
              callBackUrl: wxUrl
            }
          }
        )
        .then(function (response) {
          // 传统写
          if (!this.getvl("code")) {
            let currentUrl = encodeURIComponent(window.location.href);
            window.location.href =
              "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc925a2130da89369&redirect_uri=" +
              currentUrl +
              "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
          } else {
            // 获取openid
            this.$http
              .get(this.rootData.url.imgUrl + "payPlatform/tenpay/openId", {
                params: {
                  code: this.getvl("code")
                }
              })
              .then(function (response) {
                // 传统写
                this.rootData.openId = response.data;
              });
          }
        });
      // 是否登录
      this.basic()

    },
    basic() {
      var vm = this;
      var params = {};
      var loginUrl = "";
      if (localStorage.getItem("userInfo")) {
        this.user = JSON.parse(localStorage.getItem("userInfo"));
        loginUrl = "/manager/account/user/login";
        params = {
          sid: "123",
          mobileNo: this.user.mobileNo,
          passWord: this.user.passWord
        };
        this.$http.get(this.rootData.url.url2 + loginUrl, {
          params: params
        }).then(response => {
          if (response.data.t.pass == "true") {
            this.setLoginMsg({
              state: true,
              user: response.data.t.user
            });
            this.setAccount({
              balance: response.data.t.user.balance,
              integral: response.data.t.user.integral,
              vocation: response.data.t.user.vocation,
            })
          }
        })
      }
    },
    getvl(name) {
      var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
      if (reg.test(location.href))
        return unescape(RegExp.$2.replace(/\+/g, " "));
      return "";
    },

    ...mapMutations({
      setLoginMsg: "SET_ISLOGIN",
      setAccount: "SET_ACCOUNT",
    })
  },
  created() {
    // this._getData();
    this.basic()
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background: #fff !important;
  font-size: 14px;
  touch-action: none;
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #ccc;
    font-size: 12px;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #ccc;
    font-size: 12px;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #ccc;
    font-size: 12px;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #ccc;
    font-size: 12px;
  }
  .weui-tabbar__icon {
    width: 25px;
    height: 25px;
  }
  .sex {
    .van-radio__icon .van-icon {
      width: 36px;
      border-radius: 0;
      border: 0;
    }
    .van-icon-success:before {
      content: "";
    }
  }
  .askContent {
    textarea {
      padding: 0 10px;
    }
  }

  .form {
    .yd-cell-item {
      border-bottom: 1px solid #eee;
    }
    .yd-cell {
      background-color: transparent;
    }

    .sms {
      input {
        text-indent: 25px;
      }
    }
  }
  .van-dialog__confirm,
  .van-dialog__confirm:active {
    color: #2bdec7;
  }
  .van-nav-bar__text {
    color: #fff;
  }
  .bg {
    background-color: #eeeeee;
    height: 100%;
    .yd-scrollview:after {
      height: 0;
    }
  }
  .cellTitle {
    width: 70px;
  }
  .van-dialog__message--has-title {
    padding-top: 15px;
  }
  .van_p_co {
    width: 80%;
    border-radius: 4px;
    text-align: center;
    .van-icon {
      float: right;
      margin: 5px 5px 10px auto;
    }
    .tit2 {
      text-align: left;
      line-height: 20px;
      padding: 10px 15px;
      font-size: 12px;
    }
    .tit1 {
      line-height: 29px;
      margin-top: 25px;
      font-size: 16px;
      img {
        height: 15px;
        margin-right: 5px;
      }
    }
    .input3 {
      display: flex;
      justify-content: space-between;
      padding: 5px 15px;
      input {
        width: 67%;
        background-color: #eeeeee;
        line-height: 35px;
        border: none;
        padding-left: 10px;
        border-radius: 5px;
      }
      span {
        width: 30%;
        display: inline-block;
        border-radius: 5px;
        text-align: center;
        line-height: 35px;
        background-color: #eeeeee;
      }
    }
    .btn4 {
      padding: 10px 15px;
      margin-bottom: 10px;

      button {
        width: 100%;
        height: 35px;
        background-color: #2bdec7;
        color: white;
        border: none;
        border-radius: 5px;
        margin-bottom: 6px;
      }
    }
  }
  .van_p {
    position: absolute;
    bottom: 0;
    img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
    .surePay {
      width: 100%;
      height: 40px;
      background-color: #2bdec7;
      color: white;
      border: none;
    }
    .van-radio {
      line-height: 23px;
    }
  }
  .delSp {
    background-color: red;
    color: white;
    line-height: 64px;
    height: 64px;
    width: 65px;
    text-align: center;
  }
  .noData {
    margin: 10% 30px;
    color: grey;
  }
  .sureBtn {
    border-top: 1px solid #dfdee2;
    padding: 15px 0px;
    margin: 0 15px;
    text-align: center;
    button {
      width: 100%;
      height: 42px;
      background-color: #2bdec7;
      color: white;
      border-radius: 4px;
      border: none;
    }
  }
  .divider1 {
    height: 10px;
    background-color: #eeeeee;
  }
}
.van-nav-bar {
  background: #2bdec7;
  position: fixed;
  width: 100%;
  .van-nav-bar__title {
    color: #fff;
  }
}
.topblank {
  height: 45px;
}
.vux-badge-dot {
  padding: 3px !important;
}
.formG {
  .weui-label {
    width: auto !important;
  }
  .time {
    height: 42px;
    position: relative;
    margin: 0 15px;
    border-top: 1px solid #dfdee2;

    .yd-cell-box {
      margin: 0;
      .yd-cell {
        background-color: #fbf9fe;
        .yd-cell-item {
          padding-left: 0px;
          width: 100%;
          float: left;
          .yd-cell-left {
            color: #000;
            font-size: 14px;
          }
          .yd-cell-right {
            min-height: 40px;
          }
          .yd-datetime-input {
            height: 42px;
            color: #000;
            font-size: 13px;
            text-align: center;
          }
        }
      }
    }

    .radio {
      .van-radio {
        float: left;
        .van-radio__label {
          margin-left: 5px;
          margin-right: 5px;
        }
      }
    }
    .weui-cell {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .weui-cell_access .weui-cell__ft {
    color: #000;
  }
}

.blank {
  height: 10px;
}
.my,
.addZhenR,
.myRecrd {
  .weui-cell {
    background: #fff;
  }

  .weui-cell:before {
    left: 0 !important;
  }
}

.van-nav-bar .van-icon {
  color: #fff;
}
.vux-header .vux-header-title {
  font-size: 16px !important;
}
.tipIsShow {
  .yd-popup-content {
    border-radius: 5px;
  }
  .yd-popup-center.yd-popup-show * {
    padding: 0;
  }
  .yd-grids-3 {
    .tipBtn {
      height: 36px;
      line-height: 36px;
      border-right: 1px solid #ccc;
      color: #2bdec7;
    }
    .lastTip:last-child {
      border-right: 0;
    }
  }
}
</style>
