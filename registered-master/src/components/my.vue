<template>
  <div class="my">
    <div class="topblank">
      <span
        v-if="islogin.state"
        class="setting"
        @click.stop="setting"
      >
        <yd-icon
          name="setting"
          size="1.2rem"
        ></yd-icon>
      </span>
    </div>

    <yd-layout>
      <div
        class="loginDiv"
        @click="goLogin"
      >
        <img
          v-if="islogin.state"
          :src="
            islogin.user.image ? publicData.url.pic + islogin.user.image : head
          "
        />
        <img
          v-if="!islogin.state"
          :src="head"
        />
        <div v-if="!islogin.state">点击登录</div>
        <div v-if="islogin.state">
          <p>
            {{ islogin.user.nickName ? islogin.user.nickName : "新用户注册" }}
          </p>
          <p>
            个人资料
            <van-icon name="arrow" />
          </p>
        </div>

        <span
          v-if="islogin.state"
          class="SingIn"
          @click.stop="SingIn"
        >
          签到
        </span>
         <!-- <span
            class="fadeOutUp"
            ref="fadeOutUp"
          >it 传说</span> -->
      </div>
      <div v-if="islogin.state">
        <table class="yue">
          <tr>
            <td>
              <div @click="balance">
                <p>{{ account.balance || "0" }} 元</p>
                <p>我的余额</p>
              </div>
            </td>
            <td>
              <div @click="integral">
                <p>{{ account.integral }}分</p>
                <p>本地排名: {{ account.vocation }}名</p>
              </div>
            </td>
          </tr>
        </table>
        <div class="blank"></div>
        <cell
          class="service"
          title="我的关注"
          is-link
        >
          <img
            slot="icon"
            src="../assets/service.png"
          />
        </cell>
        <cell
          class="service"
          title="我的收藏"
          is-link
        >
          <img
            slot="icon"
            src="../assets/service.png"
          />
        </cell>
        <cell
          class="service"
          title="关注医生置顶"
        >
          <img
            slot="icon"
            src="../assets/service.png"
          />
          <van-switch
            active-color="#07c160"
            v-model="switch1"
            @input="onInput"
            size="20px"
          />
        </cell>
        <div class="blank"></div>
        <cell
          class="service"
          title="邀请好友"
          is-link
        >
          <img
            slot="icon"
            src="../assets/invite.png"
          />
        </cell>
      </div>
      <cell
        class="service"
        title="客户服务"
        is-link
        @click.native="callPhone"
      >
        <img
          slot="icon"
          src="../assets/service.png"
        />
      </cell>
      <div class="serviceIsShow">
        <van-dialog
          v-model="serviceIsshow"
          show-cancel-button
          confirm-button-text="呼叫"
          :before-close="serviceBeforeClose"
        >
          <h4>温馨提示</h4>
          <p>客服在线时间为正常工作日：上午8:30-12:00，下午13:30-17:00</p>
        </van-dialog>
      </div>
      <cell
        title="帮助"
        is-link
        link="/help"
      >
        <img
          slot="icon"
          src="../assets/help.png"
        />
      </cell>
    </yd-layout>
  </div>
</template>

<script>
import { Dialog } from "vant";
import head from "../assets/head-icon.png";
import { hexMD5 } from "@/js/md5.js";
import { mapGetters } from "vuex";
export default {
  props: ["publicData"],
  components: {},
  data() {
    return {
      head: head,
      user: {},
      serviceIsshow: false,
      switch1: true,
      isshow: false
    };
  },
  computed: {
    ...mapGetters(["islogin", "account"])
  },
  methods: {
    serviceBeforeClose(action, done) {
      if (action === "confirm") {
        window.location.href = "tel://" + this.phone;
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    onInput(checked) {
      if (checked == true) {
        this.$toast("关注医生已置顶");
      } else {
        this.$toast("关注医生取消置顶");
      }
    },

    goLogin() {
      if (this.islogin.state) {
        this.$router.push({
          name: "person"
        });
        return;
      }
      this.$router.push({
        name: "login"
      });
    },
    balance() {
      this.$router.push({
        name: "balance"
      });
    },
    integral() {
      this.$router.push({
        name: "integral"
      });
    },
    callPhone() {
      this.serviceIsshow = true;
      // window.location.href = 'tel:027-8811-2751';
    },
    SingIn() {
      console.log(this.$refs.fadeOutUp.style)
      this.isshow = !this.isshow;
      // 签到状态接口
      // url: 'http://59.172.27.186:8888/EDoctor_service/app/user/getUsereSignDate',
      // // url: 'http://192.168.1.92:8009/EDoctor_service/app/user/getUsereSignDate.json',
      // method: "get",
      // data: {
      //   sid: "123",
      //   userId: that.data.userId,
      //   integral: that.data.integral,
      // },
      //        //点击签到
      // wx.request({
      //   url: 'http://59.172.27.186:8888/EDoctor_service/app/user/userSignIn',
      //   // url: 'http://192.168.1.92:8009/EDoctor_service/app/user/userSignIn.json',
      //   method: "get",
      //   data: {
      //     sid: "123",
      //     userId: that.data.userId,
      //   },
    },
    setting() {
      this.$router.push({
        name: "setting"
      });
    }
  },
  mounted() {

    if (localStorage.getItem("userInfo")) {
      this.user = JSON.parse(localStorage.getItem("userInfo"));
    }
  }
};
</script>

<style scoped lang="less">
@-webkit-keyframes fadeOutUp{0%{opacity:1}
100%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}
}
@keyframes fadeOutUp{0%{opacity:1}
100%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}
}
.fadeOutUp{-webkit-animation-name:fadeOutUp;animation-name:fadeOutUp}

.my {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 50px;
  z-index: 152;
  background: #f5f3f4;
  .topblank {
    background: #2bdec7;
  }
  .SingIn {
    position: absolute;
    right: 12px;
    top: 30px;
    width: 50px;
    text-align: center;
    border: 1px solid;
    border-radius: 4px;
    color: #2bdec7;
    background: #fff;
  }
  .setting {
    position: absolute;
    right: 0px;
    top: 20px;
    width: 40px;
    z-index: 100;
    color: #fff;
  }
  .myheader {
    position: fixed;
    width: 100%;
    z-index: 100;
  }
  .serviceIsShow {
    text-align: center;

    h4 {
      line-height: 64px;
    }

    p {
      text-align: left;
      width: 90%;
      font-size: 12px;
      line-height: 22px;
      margin: 0 auto 20px;
    }
  }

  .yue {
    width: 100%;
    text-align: center;
    background-color: #92decf;
    td:first-child {
      border-right: 1px solid white;
    }
    td {
      width: 50%;
      div {
        line-height: 20px;
        margin: 15px auto;
        color: white;
      }
    }
  }
  .loginDiv {
    display: flex;
    padding: 10px 15px 25px 15px;
    color: white;
    background-color: #2bdec7;
    img {
      height: 50px;
      width: 50px;
      margin-right: 10px;
      border-radius: 50px;
    }
    div {
      position: relative;
      top: 3px;
      .van-icon {
        top: 3px;
      }
    }
  }
  .weui-cell__hd {
    img {
      margin-right: 10px;
      position: relative;
      top: 2px;
    }
  }
}
</style>
