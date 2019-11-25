<template>
  <div
    class="login"
    :style="{ backgroundImage: 'url(' + login_bg + ')' }"
    ref="homePage"
  >
    <van-nav-bar fixed title="登录" left-arrow @click-left="back"></van-nav-bar>

    <div class="topblank"></div>
    <div class="logo"><img src="../assets/logo.png" /></div>

    <div class="form">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">
            <img class="userIcon" src="../assets/login_user.png" slot="label"
          /></span>
          <yd-input
            slot="right"
            ref="input01"
            type="number"
            regex="mobile"
            v-model.trim="phone"
            max="11"
            placeholder="请输入手机号码"
          ></yd-input>
        </yd-cell-item>
        <!-- 请输入密码 -->
        <yd-cell-item v-if="!loginType">
          <span slot="left">
            <img class="userIcon" src="../assets/login-pass.png" slot="label" />
          </span>
          <yd-input
            slot="right"
            type="password"
            v-model="password"
            ref="input02"
            placeholder="请输入密码"
          ></yd-input>
        </yd-cell-item>
        <!-- 请输入验证码 -->
        <yd-cell-item v-if="loginType">
          <div slot="left">
            <img
              class="userIcon smsIcon"
              src="../assets/msg.png"
              slot="label"
            />
            <yd-input
              ref="input02"
              class="sms"
              type="number"
              v-model="sms"
              placeholder="请输入验证码"
            ></yd-input>
          </div>
          <div class="codeBtn" slot="right">
            <span slot="right" @click="getCode" v-show="!isCout"
              >获取验证码</span
            >
            <span slot="right" v-show="isCout">{{ time }}s后再次发送</span>
          </div>
        </yd-cell-item>
      </yd-cell-group>
      <div class="loginBtn">
        <x-button
          :gradients="['#2BDEC7', '#2AC68C']"
          class="saveBtn"
          @click.native="submit1"
          >登录</x-button
        >
      </div>

      <div class="loginType">
        <div v-if="loginType" @click="loginType = 0">账号密码登录</div>
        <div v-if="!loginType" @click="loginType = 1">短信验证码登录</div>
      </div>
    </div>
  </div>
</template>

<script>
function getResult(val) {
  return val;
}
import login_bg from "../assets/background-login.png";
import { hexMD5 } from "@/js/md5.js";
import { mapGetters, mapMutations } from "vuex";

export default {
  props: ["publicData"],
  data() {
    return {
      login_bg: login_bg,
      password: "",
      sms: "",
      clientHeight: "",
      tagMsg: "",
      phone: "",
      isCout: false,
      time: "",
      respFlag: false,
      mggTag: "",
      loginType: 0
    };
  },
  computed: {
    ...mapGetters(["islogin","account"])
  },
  methods: {
    back() {
      this.$router.push({
        name: "my"
      });
    },
    getCode() {
      if (this.phone == "") {
        this.$toast("请输入手机号！");
        return;
      }

      this.$http
        .get(this.publicData.url.url2 + "/manager/account/user/userCodeLogin", {
          params: {
            sid: "123",
            mobileNo: this.phone
          }
        })
        .then(response => {
          if (response.data.returns == "success") {
            this.respFlag = true;
            this.mggTag = "验证码已发送至您的手机";

            this.isCout = true;
            this.time = 120;
            let that = this;
            var coutInter = setInterval(function() {
              that.time -= 1;
              if (that.time == 0) {
                that.isCout = false;
                clearInterval(coutInter);
              }
            }, 1000);
          }
        })
        .catch(error => {
          this.respFlag = true;
          this.mggTag = "请求错误";
        });
    },

    submit1() {
      var vm = this;
      var url = "";
      var params = {};
      if (this.phone == "") {
        this.$refs.input01.setFocus();
        this.$toast("请输入手机号！");
        return;
      }
      if (this.loginType == 1) {
        if (this.sms.length != 6) {
          this.$refs.input02.setFocus();
          this.$toast("验证码长度不对！");
          return;
        } else {
          url = "/manager/account/user/verifyCode";
          params = {
            sid: "123",
            mobileNo: this.phone,
            Code: this.sms
          };
        }
      } else if (this.loginType == 0) {
        if (this.password == "") {
          this.$refs.input02.setFocus();
          this.$toast("请输入正确密码");
          return;
        } else {
          url = "/manager/account/user/login";
          params = {
            sid: "123",
            mobileNo: this.phone,
            passWord: hexMD5("cxy_framework" + this.password)
          };
        }
      }
      this.$http
        .get(this.publicData.url.url2 + url, {
          params: params
        })
        .then(response => {
          if (response.data.t.pass == "true") {
            localStorage.setItem(
              "userInfo",
              JSON.stringify(response.data.t.user)
            );
            localStorage.setItem(
              "userId",
              JSON.stringify(response.data.t.user.id)
            );

            Object.assign(this.publicData.basic, response.data.t.user);

            vm.$dialog.toast({
              mes: "登录成功",
              icon: "success",
              timeout: 1500
            });
            this.setLoginMsg({
              state: true,
              user: response.data.t.user
            });
            this.setAccount({
              balance:response.data.t.user.balance,
              integral:response.data.t.user.integral,
              vocation:response.data.t.user.vocation,
            })
            setTimeout(() => {
              vm.$router.push({
                name: "index"
              });
              vm.phone = "";
              vm.password = "";
              vm.sms = "";
            }, 1500);
          } else if (response.data.t.pass == "false") {
            this.$toast(response.data.t.errorCode);
            this.respFlag = true;
            this.mggTag = response.data.t.errorCode;
          }
        })
        .catch(error => {
          this.respFlag = true;
          this.mggTag = "请求错误";
        });
    },

    changeFixed(clientHeight) {
      //动态修改样式
      this.$refs.homePage.style.height = clientHeight + "px";
    },
    ...mapMutations({
      setLoginMsg: "SET_ISLOGIN",
      setAccount: "SET_ACCOUNT",
    })
  },

  mounted() {
    this.clientHeight = document.documentElement.clientHeight; //document.body.clientWidth;// 获取浏览器可视区域高度
    window.onresize = function temp() {
      //console.log(self.clientHeight);
      this.clientHeight = document.documentElement.clientHeight;
    };
  },

  watch: {
    clientHeight: function() {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      this.changeFixed(this.clientHeight);
    }
  }
};
</script>

<style scoped lang="less">
.login {
  .loginType {
    font-size: 12px;
    color: grey;
    padding: 12px;
  }
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .logo {
    text-align: center;
    img {
      margin-top: 10%;
      width: 82px;
      height: 82px;
    }
  }
  .form {
    padding: 0 30px;
    margin-top: 20%;
    .userIcon {
      width: 15px;
      height: 15px;
      margin-right: 10px;
      position: relative;
      top: 2px;
    }
    .codeBtn {
      position: absolute;
      z-index: 100;
      top: 10px;
      right: 0;
      height: 30px;
      line-height: 18px;
      background-color: #07c160;
      border: 1px solid #07c160;

      padding: 5px;
      color: #fff;
      border-radius: 4px;
    }
    .smsIcon {
      position: absolute;
      top: 50%;
      margin-top: -6px;
    }
  }
}
</style>
