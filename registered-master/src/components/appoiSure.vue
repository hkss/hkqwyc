<template>
  <div class="appoiSure">
    <van-nav-bar
      title="预约确认"
      left-arrow
      @click-left="back"
    />
    <div class="topblank"></div>

    <yd-layout>

      <div class="form">
        <div><span>就诊医生：</span><span>({{publicData.appoiForm.duty}})&nbsp;&nbsp;{{publicData.appoiForm.doctorName}}</span></div>
        <div><span>就诊医院：</span><span>{{publicData.appoiForm.title}}</span></div>
        <div><span>科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室：</span><span>{{publicData.appoiForm.subjectName}}</span></div>
        <div><span>就诊时间：</span><span style="color:orange">{{publicData.appoiForm.sourceDate}}&nbsp;&nbsp;{{getweek(publicData.appoiForm.sourceDate)}}&nbsp;&nbsp;{{publicData.appoiForm.sourceTime=='am'?'上午':'下午'}}</span></div>
        <div><span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span><span>{{publicData.appoiForm.typeName}}</span></div>
        <div><span>费用说明：</span><span>{{publicData.appoiForm.registrationFee}}元（挂号费）+{{publicData.appoiForm.serveCost}}元（服务费）</span></div>
      </div>

      <div class="divider1"></div>
      <div class="content">
        <cell
          title='选择就诊人'
          :value='publicData.appoiForm.contactName'
          is-link
          @click.native="goZhenR"
        />
        <cell
          title='电话号码'
          :value='commonNo'
        />
        <cell
          title='就诊时间'
          v-if='publicData.appoiForm.typeName=="特需门诊"'
        >
          <van-tag
            @click.native="checkTime(item)"
            v-if='item.noon==publicData.appoiForm.sourceTime'
            :color="item.color"
            plain
            v-for='item in timeTag'
            :key='item.timeZone'
            style="margin-left:5px;"
          >{{item.timeZone}}</van-tag>
        </cell>
      </div>
      <div class="divider1"></div>
      <div class="zhu">
        <div>注：</div>
        <ul type="square">
          <li>停诊将短信通知，请保持手机畅通。</li>
          <li>实名制预约，就诊人信息不符合将无法取号。</li>
        </ul>
      </div>

      <div class="fei">
        <hr />
        <div>总计：{{parseFloat(publicData.appoiForm.registrationFee)+parseFloat(publicData.appoiForm.serveCost)}}元</div>
      </div>
    </yd-layout>
    <div class="bottomBlank"></div>
    <button
      v-if="free==1"
      class="pay"
      @click="nowPay"
    >立即支付</button>
    <button
      v-if="free==0"
      class="pay"
      @click="appointment"
    >免费预约</button>
    <button
      v-if="free==2"
      class="pay"
      @click="balance"
    >立即充值</button>
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

import wx from 'weixin-js-sdk'
export default {
  props: ['publicData'],
  data() {
    return {
      popShow: false,
      radioPayW: '1',
      popCodeShow: false,
      count: 0,
      showLoad1: false,
      respFlag: false,
      tagMsg: '',
      code: '',
      free: '',
      timeTag: [
        { timeZone: '08:30-9:30', color: '', noon: 'am' },
        { timeZone: '10:00-11:30', color: '', noon: 'am' },
        { timeZone: '13:30-14:00', color: '', noon: 'pm' },
        { timeZone: '14:30-16:00', color: '', noon: 'pm' }
      ],
      commonNo: '',
      phone: ''
    }
  },
  methods: {
    getweek(date) {
      var dt = new Date(date.replace(/-/g, "/"));
      var a = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      return a[dt.getDay()];
    },
    nowPay() { //立即支付
      var a = false;
      for (const item of this.timeTag) {
        if (item.color != '') {
          a = true;
        }
      }
      if (this.publicData.appoiForm.typeName == "特需门诊" && !a) {
        this.respFlag = true;
        this.tagMsg = '请选择就诊时间';
      } else {
        this.popShow = !this.popShow
      }
    },

    checkTime(item) {
      if (item.color == '') {
        item.color = '#2BDEC7';
        for (const item1 of this.timeTag) {
          if (item1.color != '' && (item1.timeZone != item.timeZone)) {
            item1.color = '';
          }
        }
      }
    },

    // 支付方式
    surepay() {

      if (this.publicData.appoiForm.isGuaH) {
        // 生成订单
        this.addOrder();
      } else {
        // 生成改签订单
        this.rescheduleOrder();
      }
      this.popShow = false;
      if (this.radioPayW == '4') {
        //余额支付
        this.popCodeShow = true;
        // this.payment();//发送验证码
      }
    },


    payment() { //发送支付验证码
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

    back() {
      this.$router.push({
        name: 'guahao'
      })
    },

    goZhenR() {
      this.$router.push({
        name: 'zhenR'
      })
    },
    getDeftContacts() {
      this.showLoad1 = true;
      var quantumTime = '';
      for (const item of this.timeTag) {
        if (item.color != '') {
          quantumTime = item.timeZone;
        }
      }
      var url, params;
      url = '/getDeftContacts';
      params = {
        sid: '123',
        sourceId: this.publicData.appoiForm.sourceId,
        userId: JSON.parse(localStorage.getItem("userInfo")).id,
        hospitalId: this.publicData.appoiForm.hospitalId
      }
      this.$http.get(this.publicData.url.rootUrl + url, { params }).then(response => {
        this.showLoad1 = false;
        Object.assign(this.publicData.appoiForm, response.data);
        if (response.data.free === "false") {
          //  付钱挂号的医院
          this.free = 1
          return false
        } else {
          if (!this.publicData.appoiForm.isGuaH) {
            // 生成免费改签订单
            this.rescheduleOrder();
            return false
          }
          //  免费挂号的医院
          this.$http.get(this.publicData.url.rootUrl + '/addFreeRegisterOrder', {
            params: {
              sid: '123',
              userId: JSON.parse(localStorage.getItem("userInfo")).id,
              contactId: response.data.contactId,
              sourceId: this.publicData.appoiForm.sourceId,
              quantumTime: quantumTime
            }
          }).then(res => {
            if (res.data.error == "") {
              this.free = 0
            } else {
              this.$toast(res.data.error)
              this.free = 2
            }
            Object.assign(this.publicData.appoiForm, res.data);

          })
        }

      })

    },
    // 免费预约
    appointment() {
      this.$router.push({
        name: 'guahaoRes'
      })
    },
    balance() {
      this.$router.push({
        name: 'balance'
      })
    },
    // 微信支付
    //生成订单
    addOrder() {
      this.showLoad1 = true;
      var quantumTime = '';
      for (const item of this.timeTag) {
        if (item.color != '') {
          quantumTime = item.timeZone;
        }
      }
      this.$http.get(this.publicData.url.rootUrl + '/addRegisterOrder', {
        params: {
          sid: '123',
          userId: JSON.parse(localStorage.getItem("userInfo")).id,
          sourceId: this.publicData.appoiForm.sourceId　,
          contactId: this.publicData.appoiForm.contactId　,
          quantumTime: quantumTime
        }
      }).then(response => {
        this.showLoad1 = false;
        this.publicData.appoiForm.registrationId = response.data.registrationId;
        if (this.free == 1) {
          if (this.radioPayW == '1') {
            // 微信支付订单
            this.wxOrderPay()
          }
        }
      })
    },
    //生成改签新订单
    freeRescheduleOrder() {

    },
    //生成改签新订单
    rescheduleOrder() {
      this.showLoad1 = true;
      var quantumTime = '';
      for (const item of this.timeTag) {
        if (item.color != '') {
          quantumTime = item.timeZone;
        }
      }
      this.$http.get(this.publicData.url.rootUrl + '/rescheduleOrder', {
        params: {
          sid: '123',
          oldRegistrationId: this.publicData.appoiForm.registrationId,
          sourceId: this.publicData.appoiForm.sourceId,
          free: this.publicData.appoiForm.free,
        }
      }).then(response => {
        this.showLoad1 = false;
        this.publicData.appoiForm.newRegistrationId = response.data.newRegistrationId;
        if (this.free == 1) {
          if (this.radioPayW == '1') {
            // 微信支付改签订单
            this.wxRescheduleOrderPay()
          }
        }
      })

    },
    // 余额支付
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
        if (this.publicData.appoiForm.isGuaH) {
          // 支付订单
          this.registerOrderPay()
        } else {
          // 支付改签订单
          this.newRegisterOrderPay()
        }
      })
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
        } else {
          this.$toast(response.data.error)
          this.free = 2
        }
      })
    },
    // 余额支付改签订单
    newRegisterOrderPay() { //支付
      this.$http.get(this.publicData.url.imgUrl + 'account/rescheduPay', {
        params: {
          sid: '123',
          newRegistrationId: this.publicData.appoiForm.newRegistrationId,
          openId: this.publicData.openId,
          type: this.radioPayW
        }
      }).then(response => {
        if (response.data.result) {
          this.$router.push({
            name: 'guahaoRes'
          })
        } else {
          this.$toast(response.data.error)
          this.free = 2
        }

      })
    },
    // 微信支付订单
    wxOrderPay() {
      this.$http.get(this.publicData.url.imgUrl + 'orderAccountPay', {
        params: {
          sid: '123',
          orderId: this.publicData.appoiForm.registrationId,
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
    // 微信支付改签订单
    wxRescheduleOrderPay() {
      this.$http.get(this.publicData.url.imgUrl + 'orderAccountPay', {
        params: {
          sid: '123',
          orderId: this.publicData.appoiForm.newRegistrationId,
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
            vm.$router.push({
              name: 'guahaoRes'
            })
          } else if (res.err_msg === "get_brand_wcpay_request:cancel") {
            vm.$toast("已取消支付")
            vm.publicData.appoiForm.recordTit = '今日记录';
            vm.$router.push({
              name: 'recordList'
            })
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
      this.publicData.appoiForm.hospitalLatitude = ''
      this.publicData.appoiForm.hospitalLongitude = ''
      this.publicData.appoiForm.sourceTime = 'am'
      this.publicData.appoiForm.outpatientType = []
    }
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
    if (!localStorage.getItem('openId')) {

    }

  },
  created() {
    this.getDeftContacts();
  }
}
</script>

<style scoped lang='less'>
.appoiSure {
  .content {
    .weui-cell:before {
      left: 0;
    }
  }
  .zhu {
    padding: 10px;
    font-size: 12px;
    ul li {
      color: #999999;
    }
  }
  .form {
    div {
      padding: 10px 15px;
      font-size: 13px;
      span:nth-child(1) {
        display: inline-block;
        width: 70px;
        color: #999999;
      }
      span:nth-child(2) {
        color: #000;
      }
    }
  }
  .fei {
    hr {
      height: 1px;
      background-color: #e8e8e8;
      border: none;
    }
    div {
      line-height: 36px;
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
      font-size: 14px;
      color: orange;
    }
  }
  .bottomBlank {
    height: 40px;
    width: 100%;
  }
  .pay {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 40px;
    background-color: #2bdec7;
    color: white;
    border: none;
  }
}
</style>
