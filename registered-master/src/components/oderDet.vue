<template>
  <div class="oderDet">
    <van-nav-bar
      title="预约信息"
      left-arrow
      @click-left="back"
    />
    <div class="topblank"></div>

    <div class="operOra">
      <div
        @click="cansle"
        :class="{isOut:orderStatus!=0||invaliDate==1}"
      >取消订单</div>
      <div
        @click="tuiH"
        :class="{isOut:isQuitC}"
      >退号</div>
      <div
        @click='gaiQ'
        :class="{isOut:isQuitC}"
      >改签</div>
      <div
        @click="payPa"
        :class="{isOut:orderStatus!=0||invaliDate==1}"
      >支付</div>
    </div>

    <div class="NOn">
      <div style="color:#2BDEC7">{{resul.registrationId}}</div>
      <div>{{resul.createTime}}</div>
    </div>
    <div
      v-for='item in resul.orderList'
      :key='item.userId'
      class="block"
      :class="{isOut:item.orderStatus=='-4'}"
    >
      <div style="color:orange">
        <span>{{item.registrationDate}}</span>
        <span style="margin:auto 10px;">{{item.dateTime=='am'?"上午":'下午'}}</span>
        <span style="color:black">{{item.hospitalName}}</span>
      </div>
      <div>{{item.doctorName}}（{{item.duty}}）<span style="margin:auto 10px;">{{item.outpatientName}}</span> <span>{{item.departmentName}}</span></div>
      <div>{{item.contactName}} {{item.userPhone}} <span style="margin-left:10px;color:red;">{{item.registrationMoney}}元（挂号费）</span></div>
      <div>订单状态：{{item.stauName}}</div>

    </div>
    <div>
      <yd-popup
        class="van_p"
        v-model="popShow"
        position="bottom"
      >

        <cell title="选择支付方式" />
        <van-radio-group v-model="radioPayW">
          <cell title='微信支付'>
            <img
              slot="icon"
              src='../assets/icon-weixin-mall@2x.png'
            />
            <van-radio
              checked-color="#2BDEC7"
              slot='value'
              name='1'
            />
          </cell>
          <cell title='余额支付'>
            <img
              slot="icon"
              src='../assets/balance.png'
            />
            <van-radio
              checked-color="#2BDEC7"
              slot='value'
              name='4'
            />
          </cell>
        </van-radio-group>

        <button
          class="surePay"
          @click="surepay"
        >确认支付</button>

      </yd-popup>

      <van-popup
        v-model="popCodeShow"
        class="van_p_co"
        :close-on-click-overlay="false"
      >
        <van-icon
          name="cross"
          @click="cross"
          size='1.5em'
        />
        <div class="tit1"><img src="../assets/icon_renzheng.png" />认证支付</div>
        <div class="tit2">付款确认：本次交易需要短信认证，验证码已发送至您的手机{{phone}}</div>
        <div class="input3"><input
            placeholder="请输入验证码"
            v-model.trim="code"
            type="number"
          />
          <span v-if='count!=0'>{{count}}秒</span>
          <span
            v-if='count==0'
            @click="payment"
            style="background-color:#2BDEC7;color:white;"
          >重新发送</span>
        </div>
        <div class="btn4"><button @click="codeYz">确定支付</button></div>
      </van-popup>
    </div>

    <loading
      :show="showLoad1"
      text="加载中"
    ></loading>

  </div>
</template>

<script>
import { Dialog } from 'vant';
import wx from 'weixin-js-sdk'
export default {
  props: ['publicData'],
  data() {
    return {
      showLoad1: false,
      respFlag: false,
      resul: {},
      isQuitC: false,
      orderStatus: '',
      invaliDate: '',
      popShow: false,
      code: '',
      radioPayW: '1',
      popCodeShow: false,
      count: 0,
      phone: ''
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'recordList'
      })
    },
    //支付
    payPa() {
      if (this.resul.orderList[0].orderStatus == 0 && !this.resul.orderList[0].invaliDate) {
        this.popShow = true;
      }
    },
    // 支付方式
    surepay() {
      this.popShow = false;
      if (this.radioPayW == '4') {
        //余额支付
        this.popCodeShow = true;
        // this.payment();//发送验证码
      } else {
        this.wxOrderPay()
      }
    },
    //发送支付验证码
    payment() {
      this.showLoad1 = true;
      this.$http.get(this.publicData.url.rootUrl + '/payment', {
        params: {
          sid: '123',
          mobileNo: JSON.parse(localStorage.getItem("userInfo")).commonNo,
        }
      }).then(response => {
        this.showLoad1 = false;
        this.count = 30;
        let that = this;
        var coutInter = setInterval(function () {
          that.count -= 1;
          if (that.count == 0) {
            clearInterval(coutInter);
          }
        }, 1000);
      }).catch(error => {
        this.showLoad1 = false;
        this.respFlag = true;
        this.tagMsg = '请求错误';
      });
    },
    //验证码验证 余额支付
    codeYz() {
      if (!this.code) {
        this.$toast('请填写验证码');
        return
      }
      this.showLoad1 = true;
      this.$http.get(this.publicData.url.rootUrl + '/verifyCode', {
        params: {
          sid: '123',
          mobileNo: JSON.parse(localStorage.getItem("userInfo")).commonNo,
          Code: this.code
        }
      }).then(response => {
        this.showLoad1 = false;
        this.popCodeShow = false;
        console.log(this.publicData.appoiForm)
        // 支付订单
        this.registerOrderPay()
      }).catch(error => {
        this.showLoad1 = false;
        this.respFlag = true;
        this.tagMsg = '请求错误';
      });

    },

    //余额支付订单
    registerOrderPay() {
      this.$http.get(this.publicData.url.imgUrl + 'orderAccountPay', {
        params: {
          sid: '123',
          orderId: this.publicData.appoiForm.registrationId,
          openId: this.publicData.openId,
          type: this.radioPayW
        }
      }).then(response => {
        if (response.data.result) {
          this.$router.push({
            name: 'guahaoRes'
          })
        }
      })
    },
    // 微信支付订单
    wxOrderPay() {
      this.$http.get(this.publicData.url.imgUrl + 'orderAccountPay', {
        params: {
          sid: '123',
          orderId: this.publicData.appoiForm.newRegistrationId ? this.publicData.appoiForm.newRegistrationId : this.publicData.appoiForm.registrationId,
          openId: this.publicData.openId,
          type: this.radioPayW
        }
      }).then(res => {
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

      })
    },

    jsApiCall(data) {
      var vm = this
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest", {
          debug: true,
          appId: data.appId, // 公众号名称，由商户传入
          timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, // 随机串
          package: data.package,
          signType: data.signType, // 微信签名方式：
          paySign: data.paySign, // 微信签名
          jsApiList: ["chooseWXPay"]
        },
        function (res) {
          if (res.err_msg === "get_brand_wcpay_request:ok") {
            console.log("微信支付结果", res)
            vm.$router.push({
              name: 'guahaoRes'
            })
          } else if (res.err_msg === "get_brand_wcpay_request:cancel") {
            vm.$toast("已取消支付")
            // vm.publicData.appoiForm.recordTit = '今日记录';
            // vm.$router.push({
            //   name: 'recordList'
            // })
            vm._delData()

          } else if (res.err_msg === "get_brand_wcpay_request:fail") {

          }
        }
      );
    },
    cross() {
      this.popCodeShow = false
      this.publicData.appoiForm.recordTit = '今日记录';
      this.$router.push({
        name: 'recordList'
      })
      this._delData()
    },
    _delData() {
      this.publicData.appoiForm.hospitalId = ''
      this.publicData.appoiForm.doctorName = ''
      this.publicData.appoiForm.duty = ''
      this.publicData.appoiForm.title = ''
      this.publicData.appoiForm.typeName = ''
      this.publicData.appoiForm.week = ''
      this.publicData.appoiForm.sourceDate = ''
      this.publicData.appoiForm.registrationId = ''
      this.publicData.appoiForm.subjectName = ''
      this.publicData.appoiForm.sourceId = ''
      this.publicData.appoiForm.serveCost = ''
      this.publicData.appoiForm.registrationFee = ''
      this.publicData.appoiForm.departmentId = ''
      this.publicData.appoiForm.sourceTime = 'am'
      this.publicData.appoiForm.outpatientType = []
      console.log("_delData", this.publicData)
    },
    //取消订单
    cansle() {
      if (this.resul.orderList[0].orderStatus != 0) {
        return
      }
      Dialog.confirm({
        title: '提示',
        message: '确定取消订单？'
      }).then(() => {
        this.showLoad1 = true;
        this.$http.get(this.publicData.url.rootUrl + '/abolishNoPayOrder', {
          params: {
            sid: '123',
            registrationId: this.resul.registrationId,
          }
        }).then(response => {
          this.showLoad1 = false;
          if (response.data.result == 1) {
            this.$router.push({
              name: 'recordList'
            })
          }

        }).catch(error => {
          this.showLoad1 = false;
          this.respFlag = true;
        });

      })

    },
    //改签
    gaiQ() {
      if (this.isQuitC) {
        return
      }
      this.showLoad1 = true;
      this.$http.get(this.publicData.url.rootUrl + '/checkRescheduleCount', {
        params: {
          sid: '123',
          registrationId: this.resul.registrationId,
        }
      }).then(response => {
        this.showLoad1 = false;
        Dialog.confirm({
          title: response.data.count ? '确认改签？' : "",
          message: response.data.count ? '本订单只有' + response.data.count + '次改签机会，若改签成功，此订单将不能办理再次改签' : "本订单改签次数已用完"
        }).then(() => {
          if (response.data.count > 0) {
            this.$router.push({
              name: 'gaiQ'
            });
          }
        });
      }).catch(error => {
        this.showLoad1 = false;
        this.respFlag = true;
      });

    },
    //退号操作
    tuiH() {
      if (this.isQuitC) {
        return
      }
      this.showLoad1 = true;
      this.$http.get(this.publicData.url.rootUrl + '/checkAbolishNum', {
        params: {
          sid: '123',
          userId: JSON.parse(localStorage.getItem("userInfo")).id,
        }
      }).then(response => {
        this.showLoad1 = false;
        if (response.data.error) {
          Dialog.alert({
            message: response.data.error
          })
        } else {
          Dialog.confirm({
            title: '提示',
            message: '您只有' + response.data.remnantNum + '次退号操作，所退费用将在3个工作日内退还原支付账户！'
          }).then(() => {
            this.chargebackOrder();
          })
        }
      }).catch(error => {
        this.showLoad1 = false;
        this.respFlag = true;
      });

    },
    //退号接口 
    chargebackOrder() {
      this.showLoad1 = true;
      var url, params;
      if (this.resul.orderList.length > 1 && this.resul.orderList[1].orderStatus == 5) { //改签号
        url = '/chargebackResceduOrder';
        params = {
          sid: '123',
          registrationId: this.resul.registrationId,
        }
      } else {
        url = '/chargebackOrder';
        params = {
          registrationId: this.resul.registrationId,
          sid: '123',
        }
      }
      this.$http.get(this.publicData.url.rootUrl + url, { params }).then(response => { //this.publicData.url.rootUrl+url
        this.showLoad1 = false;
        if (response.data.result) {
          this.$router.push({
            name: 'recordList'
          })
        }
      }).catch(error => {
        this.showLoad1 = false;
        this.respFlag = true;
      });

    },
    // 获取订单信息
    getOrderInfo() {
      this.showLoad1 = true;
      this.$http.get(this.publicData.url.rootUrl + '/getOrderInfo', {
        params: {
          sid: '123',
          registrationId: this.publicData.appoiForm.registrationId,
        }
      }).then(response => {
        this.showLoad1 = false;
        this.resul = response.data;
        this.resul.orderList = response.data.orderList.reverse();
        this.invaliDate = this.resul.orderList[0].invaliDate
        this.orderStatus = this.resul.orderList[0].orderStatus
        for (const item of this.resul.orderList) {
          switch (item.orderStatus) {
            case -1:
              item.stauName = '已取消';
              break;
            case 0:
              item.stauName = '待支付';
              break;
            case 1:
              item.stauName = '等待就诊（' + item.remainingDate + '后就诊）';
              break;
            case -2:
              item.stauName = '订单超时';
              break;
            case -3:
              item.stauName = '已退款';
              break;
            case 5:
              item.stauName = '改签号（' + item.remainingDate + '后就诊）';
              break;
            case -4:
              item.stauName = '已改签';
              break;
            default:
          }
        }
        if (this.resul.orderList.length > 1) {
          if (this.resul.orderList[1].orderStatus != 5 || this.resul.orderList[0].invaliDate) {
            this.isQuitC = true;
          } else {
            this.isQuitC = false;
          }
        } else {
          if (this.resul.orderList[0].orderStatus != 1 || this.resul.orderList[0].invaliDate) {
            this.isQuitC = true;
          } else {
            this.isQuitC = false;
          }
        }
      }).catch(error => {
        this.showLoad1 = false;
        this.respFlag = true;
      });
    },

  },

  mounted() {
    this.commonNo = JSON.parse(localStorage.getItem("userInfo")).commonNo;
    if (Number(this.commonNo) && String(this.commonNo).length === 11) {
      var mobile = String(this.commonNo)
      var reg = /^(\d{3})\d{4}(\d{4})$/
      this.phone = mobile.replace(reg, '$1****$2')
    } else {
      return this.phone
    }
    this.getOrderInfo();
  },

}
</script>

<style scoped lang='less'>
.oderDet {
  .isOut {
    opacity: 0.5;
  }
  .block {
    padding: 10px 15px;
    line-height: 35px;
  }
  .operOra {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
  }
  .NOn {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
    padding: 0 15px;
    font-size: 12px;
  }
}
</style>
