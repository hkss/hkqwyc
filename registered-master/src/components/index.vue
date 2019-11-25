<template>
  <div class="index">
    <van-nav-bar title="预约挂号" />
    <div class="topblank"></div>
    <yd-layout>
      <div class="quikDiv">
        <div
          class='quikDiv_item'
          @click="goQiuk(0)"
        >
          <img src='../assets/btn_record_version.png' />
          <p>我的记录</p>
          <div>查看挂号、预约、咨询记录</div>
        </div>
        <div
          class='quikDiv_item'
          @click="goQiuk(1)"
        >
          <img src='../assets/btn_ser_version.png' />
          <p>温馨服务</p>
          <div>在线查看检查报告</div>
        </div>
        <div
          class='quikDiv_item'
          @click="goQiuk(2)"
        >
          <img
            :class="{imgeM:!isDotInfo}"
            src='../assets/btn_information_version.png'
          />
          <badge
            class="redDot"
            v-if='!isDotInfo'
          ></badge>
          <p>我的信息</p>
          <div>您的临近事项到期信息提醒</div>
        </div>
      </div>

      <div class="advDiv">
        <span style="margin-left:15px;width:60px;line-height:40px;">广告栏</span>
        <van-notice-bar
          class='avdc'
          background='white'
          left-icon="volume-o"
          :text='getAllAdvertisement'
        />
      </div>

      <guahao :publicData='publicData'></guahao>

      <div class="divider1"></div>

      <div class="bottDiv">
        <divider>推荐医院</divider>
        <div
          class="tagWen"
          ref="tipContent"
        >
          <p>温馨提示<img src="../assets/icon_laba_version.png" />
            <van-icon
              @click="delTip"
              name="cross"
            />
          </p>
          <div>E号通每日8:00~23:00提供服务；在E号通上可以按规定办理改签退号（挂的号当天因故失效则不能改签或退号）</div>
        </div>
      </div>

      <div class="tipIsShow">
        <yd-popup
          v-model="tipIsshow"
          position="center"
          width="80%"
        >
          <div style="background-color:#fff;">
            <h4>提示</h4>
            <p> 是否确定关闭温馨提示? </p>
            <yd-grids-group :rows="3">
              <yd-grids-item>
                <div
                  slot="else"
                  style="text-align: center;"
                >
                  <div
                    class="tipBtn"
                    @click="cancel"
                  >取消</div>
                </div>
              </yd-grids-item>
              <yd-grids-item>
                <div
                  slot="else"
                  style="text-align: center;"
                >
                  <div
                    class="tipBtn"
                    @click="confirm "
                  >关闭</div>
                </div>
              </yd-grids-item>
              <yd-grids-item>
                <div
                  slot="else"
                  style="text-align: center;"
                >
                  <div
                    class="tipBtn lastTip"
                    @click="forever"
                  >永久关闭</div>
                </div>
              </yd-grids-item>
            </yd-grids-group>
          </div>
        </yd-popup>
      </div>

      <loading
        :show="showLoad1"
        text="加载中"
      ></loading>
    </yd-layout>

  </div>
</template>

<script>
import guahao from '@/components/formG'
import { mapGetters } from "vuex";
export default {
  components: {
    guahao
  },
  props: ['publicData'],
  data() {
    return {
      getAllAdvertisement: '',
      tipIsshow: false,
      showLoad1: false,
      isDotInfo: 1,
    }
  },
  computed: {
    ...mapGetters(["islogin"])
  },
  methods: {

    goQiuk(index) {
      if (!localStorage.getItem('userInfo')) {
        this.$router.push({
          name: "login"
        })
      } else {
        var name;
        switch (index) {
          case 0:
            name = 'myRecrd';
            break;
          case 1:
            name = 'myRepotList';
            break;
          case 2:
            name = 'myMsgList';
            break;
          default:
        }
        this.$router.push({
          name: name
        })
        this.publicData.appoiForm = {};

      }
    },
    delTip() {
      this.tipIsshow = true
    },
    cancel() {
      this.tipIsshow = false
    },
    confirm() {
      this.tipIsshow = false
      this.$refs.tipContent.style.display = "none";
    },
    forever() {
      this.tipIsshow = false
      this.$refs.tipContent.style.display = "none";
    },

    getAllAdvertisement1() { //文字广告
      this.showLoad1 = true;
      this.$http.get(this.publicData.url.rootUrl + '/getAllAdvertisement', {
        params: {
          sid: '123',
        }
      }).then(response => {
        this.showLoad1 = false;
        for (const item of response.data) {
          this.getAllAdvertisement += item.advertisementContent;
        }
      }).catch(error => {
        this.showLoad1 = false;
      });
    },

    selectMessageIsRead() { //是否有未读消息
      this.showLoad1 = true;
      this.$http.get(this.publicData.url.rootUrl + '/selectMessageIsRead', {
        params: {
          sid: '123',
          userId: JSON.parse(localStorage.getItem('userId')),
        }
      }).then(response => {
        this.showLoad1 = false;
        this.isDotInfo = response.data.type;
      }).catch(error => {
        this.showLoad1 = false;
      });
    },


  },

  mounted() {
    this.getAllAdvertisement1();
    // if (!this.islogin.state) {
    //   localStorage.clear();
    //   this.publicData.appoiForm = {};
    //   this.publicData.basic = {};
    // } else {
    if (localStorage.getItem("userId")) {
      this.selectMessageIsRead();
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.index {
  .tipIsShow {
    text-align: center;

    h4 {
      padding: 15px;
      font-size: 16px;
      font-weight: normal;
    }
    p {
      border-bottom: 1px solid #ccc;
      padding-bottom: 11px;
      font-size: 12px;
    }
  }
  .bottDiv {
    .vux-divider {
      padding: 20px 0;
      color: #2bdec7 !important;
    }
    .tagWen {
      background-color: #ffffb1;
      padding: 10px 15px;
      margin-bottom: 54px;
      letter-spacing: 1px;
      p {
        .van-icon {
          position: absolute;
          right: 10px;
          font-size: 16px;
        }
        font-size: 14px;
        img {
          margin-left: 10px;
          position: relative;
          width: 16px;
          height: 14px;
          top: 2px;
        }
      }
      div {
        font-size: 12px;
      }
    }
  }
  .advDiv {
    border-bottom: 1px solid #dfdee2;
    display: flex;
    justify-content: space-between;
    .van-notice-bar {
      padding-left: 5px;
      // background-color: #fbf9fe !important;
    }
    .avdc {
      width: 100%;
    }
  }
  .quikDiv {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #dfdee2;
    .quikDiv_item {
      text-align: center;
      padding: 15px;
      margin-bottom: 5px;
      .redDot {
        position: relative;
        bottom: 30px;
      }
      img {
        width: 40px;
        height: 40px;
      }
      div {
        font-size: 12px;
        color: grey;
      }
    }
  }

  .imgeM {
    position: relative;
    left: 10px;
  }
}
</style>
