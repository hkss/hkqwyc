<template>
  <div class="guahao">
    <van-nav-bar
      title="预约挂号"
      left-arrow
      @click-left="back"
    />
    <div class="topblank"></div>
    <yd-layout>

      <div class="date">
        <div
          class="day"
          @click="preDay(1)"
        >前一天</div>
        <div class="shij">{{sourceDate}} <span style="margin-left:5px;">星期{{week}}</span></div>
        <div
          class="day"
          @click="preDay"
        >后一天</div>
      </div>
      <div class="gray"></div>
      <div class="content">
        <cell>
          <div slot='title'>
            <div style="color:orange">{{publicData.appoiForm.title}}</div>
            <div>{{publicData.appoiForm.subjectName}}</div>
          </div>
          <div
            class="valeR"
            @click="openLoct"
          >
            <van-icon
              name="location-o"
              color='#2BDEC7'
            />
            <p>{{haoYuan.distance}}Km</p>
          </div>
        </cell>
      </div>
      <div class="gray"></div>

      <div
        class="content msg"
        v-for='item in haoYuan'
        :key='item.sourceId'
      >
        <cell>
          <div
            slot='title'
            class="cellTit"
            @click="goSure(item)"
          >
            <div style="color:#007ACC">{{item.outpatientType}}</div>
            <div
              v-show='item.outpatientType=="特需门诊"'
              style="color:orange;"
            >{{item.doctorName}}（{{item.duty}}）</div>
          </div>
          <div class="valeR"><span @click="goSure(item)">号源：{{item.inventoryNum}} </span>
            <span
              style="width:30px;display:inline-block;"
              @click="isIntro=!isIntro"
            >
              <van-icon
                v-if='item.outpatientType=="特需门诊"'
                :name="isIntro?'arrow-up':'arrow-down'"
                color='#2BDEC7'
              />
            </span>
          </div>
        </cell>
        <div
          v-if="isIntro&&item.outpatientType=='特需门诊'"
          class="intro"
        >
          <p>医生简介<span class="imgSpan"><img :src="item.doctorImage?publicData.url.imgUrl+item.doctorImage:docHead" /></span></p>
          <p>{{item.doctorName}}，{{item.duty}}，{{item.subjectName}}，{{publicData.appoiForm.title}}</p>
          <p>擅长：{{item.skilled}}</p>
        </div>
      </div>

      <divider>近期预约</divider>
      <div class="recent">
        <cell
          v-for='item in recordList'
          :key='item.latitude'
        >
          <div slot='title'>{{item.hospitalName}}<span class="sheng">{{item.abbreviation}}</span> </div>
          <div
            class="valeR"
            @click="openHospitalList(item)"
          >
            <van-icon
              name="location-o"
              color='#2BDEC7'
            />
            <p>{{item.distance}}Km</p>
          </div>
        </cell>
      </div>
    </yd-layout>

    <loading
      :show="showLoad1"
      text="加载中"
    ></loading>

  </div>
</template>

<script>
function stringToDate(dateStr, separator) {
  if (!separator) {
    separator = "-";
  }
  var dateArr = dateStr.split(separator);
  var year = parseInt(dateArr[0]);
  var month;
  //处理月份为04这样的情况                         
  if (dateArr[1].indexOf("0") == 0) {
    month = parseInt(dateArr[1].substring(1));
  } else {
    month = parseInt(dateArr[1]);
  }
  var day = parseInt(dateArr[2]);
  var date = new Date(year, month - 1, day);
  return date;
};
function getNowFormatDate(date) { //时间，格式YYYY-MM-DD
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
function GetDistance(lat1, lng1, lat2, lng2) { //计算距离
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s.toFixed(2);
}

import wx from 'weixin-js-sdk'
import head from '../assets/head-icon.png'
export default {
  props: ['publicData'],
  data() {
    return {
      docHead: head,

      showLoad1: false,
      respFlag: false,
      ergM: '',

      week: '',
      recordList: [],
      haoYuan: [],

      isIntro: false,

      position: {},

      sourceDate: "",
    }
  },
  methods: {
    preDay(i) {
      var nextDate7 = new Date().getTime() + 24 * 6 * 60 * 60 * 1000; //后7天
      var a = stringToDate(this.sourceDate, '-'); //日期格式
      var preDate;
      if (i == 1) {
        preDate = a.getTime() - 24 * 60 * 60 * 1000; //前一天
      } else {
        preDate = a.getTime() + 24 * 60 * 60 * 1000; //后一天
      }
      if (preDate < (new Date().getTime() - 24 * 60 * 60 * 1000) || preDate > nextDate7) {
        this.$toast('只能选择未来一周内的日期！');
        return
      }

      this.sourceDate = getNowFormatDate(new Date(preDate));
      this.publicData.appoiForm.sourceDate = getNowFormatDate(new Date(preDate));
      switch (new Date(preDate).getDay()) {
        case 1:
          this.week = '一';
          break;
        case 2:
          this.week = '二';
          break;
        case 3:
          this.week = '三';
          break;
        case 4:
          this.week = '四';
          break;
        case 5:
          this.week = '五';
          break;
        case 6:
          this.week = '六';
          break;
        case 0:
          this.week = '日';
          break;
        default:
      }

    },
    openLoct() {
      let vm = this;
      let name = vm.publicData.appoiForm.title
      let hospitalLatitude = this.publicData.appoiForm.hospitalLatitude
      let hospitalLongitude = this.publicData.appoiForm.hospitalLongitude
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: vm.publicData.wxCfg.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: vm.publicData.wxCfg.timestamp, // 必填，生成签名的时间戳
        nonceStr: vm.publicData.wxCfg.nonce_str, // 必填，生成签名的随机串
        signature: vm.publicData.wxCfg.signature,// 必填，签名，见附录1
        jsApiList: ["openLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function () {
        wx.openLocation({
          latitude: hospitalLatitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: hospitalLongitude, // 经度，浮点数，范围为180 ~ -180。
          name: name, // 位置名
          address: name, // 地址详情说明
          scale: 18 // 地图缩放级别,整形值,范围从1~28。默认为最大
        });
      });
    },
    openHospitalList(item) {
      console.log("openHospitalList", item)
      let vm = this;
      let name = item.title
      let hospitalLatitude = item.hospitalLatitude
      let hospitalLongitude = item.hospitalLongitude
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: vm.publicData.wxCfg.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: vm.publicData.wxCfg.timestamp, // 必填，生成签名的时间戳
        nonceStr: vm.publicData.wxCfg.nonce_str, // 必填，生成签名的随机串
        signature: vm.publicData.wxCfg.signature,// 必填，签名，见附录1
        jsApiList: ["openLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function () {
        wx.openLocation({
          latitude: hospitalLatitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: hospitalLongitude, // 经度，浮点数，范围为180 ~ -180。
          name: name, // 位置名
          address: name, // 地址详情说明
          scale: 18 // 地图缩放级别,整形值,范围从1~28。默认为最大
        });
      });
    },
    back() {
      var name1;
      if (this.publicData.appoiForm.isGuaH) {
        name1 = 'index';
      } else {
        name1 = 'gaiQ'
      }
      this.$router.push({
        name: name1
      })
    },

    goSure(item) {
      console.log(item)
      if (!localStorage.getItem('userInfo')) {
        this.$router.push({
          name: 'login'
        })
      } else {
        this.publicData.appoiForm.sourceId = item.sourceId;
        this.publicData.appoiForm.sourceDate = this.sourceDate;
        this.publicData.appoiForm.registrationFee = item.registrationFee;
        this.publicData.appoiForm.duty = item.duty;
        this.publicData.appoiForm.doctorName = item.doctorName;
        this.publicData.appoiForm.typeName = item.outpatientType;
        this.$router.push({
          name: 'appoiSure'
        })
      }

    },

    getDoctor() { //号源
      this.showLoad1 = true;
      this.$http.get(this.publicData.url.rootUrl + '/getDoctor', {
        params: {
          sid: '123',
          hospitalId: this.publicData.appoiForm.hospitalId,
          departmentId: this.publicData.appoiForm.departmentId,
          sourceDate: this.publicData.appoiForm.sourceDate,
          sourceTime: this.publicData.appoiForm.sourceTime,
          outpatientType: this.publicData.appoiForm.outpatientType.join(','),
        }
      }).then(response => {
        this.showLoad1 = false;
        this.haoYuan = response.data;
        this.haoYuan.distance = GetDistance(
          localStorage.getItem('userLatitude'), localStorage.getItem('userLongitude'),
          this.publicData.appoiForm.hospitalLatitude,
          this.publicData.appoiForm.hospitalLongitude);
      }).catch(error => {
        this.showLoad1 = false;
        this.respFlag = true;
        this.ergM = '请求错误！';
      });
    },

    getRecord() {
      this.showLoad1 = true;
      this.$http.get(this.publicData.url.rootUrl + '/index/getRecord', {
        params: {
          sid: '123',
          userId: JSON.parse(localStorage.getItem('userId')),
        }
      }).then(response => {
        this.showLoad1 = false;
        this.recordList = response.data;
        for (var i = 0; i < this.recordList.length; i++) {
          var distance = GetDistance(localStorage.getItem('userLatitude'), localStorage.getItem('userLongitude'), this.recordList[i].latitude, this.recordList[i].longitude)
          this.recordList[i].distance = distance
        }
      }).catch(error => {
        this.showLoad1 = false;
        this.respFlag = true;
      });
    },

  },
  mounted() {
    this.sourceDate = this.publicData.appoiForm.sourceDate;
    var a = stringToDate(this.publicData.appoiForm.sourceDate, '-');
    switch (a.getDay()) {
      case 1:
        this.week = '一';
        break;
      case 2:
        this.week = '二';
        break;
      case 3:
        this.week = '三';
        break;
      case 4:
        this.week = '四';
        break;
      case 5:
        this.week = '五';
        break;
      case 6:
        this.week = '六';
        break;
      case 0:
        this.week = '日';
        break;
      default:
    }

    if (localStorage.getItem('userInfo')) {
      this.getRecord();
    }
    this.getDoctor();

  },
}
</script>

<style scoped lang='less'>
.guahao {
  .weui-cell {
    padding: 0;
  }
  .van-nav-bar {
    background: #fff;
    .van-icon,
    .van-nav-bar__title {
      color: #000;
    }
  }

  .gray {
    height: 10px;
    background: #eeeeee;
  }
  .content {
    padding: 5px 15px;
  }
  .msg {
    height: 40px;
    line-height: 30px;
    border-bottom: 1px solid #dfdee2;
    position: relative;
  }
  .recent {
    .weui-cell {
      margin: 0px 15px;
      padding-top: 5px;
      border-bottom: 1px solid #eeeeee;
    }
    .weui-cell:before {
      left: 0;
      border: 0;
    }
  }
  .intro {
    padding: 5px 15px;
    background-color: #eeeeee;
    color: grey;
    font-size: 12px;
    position: absolute;
    top: 40px;
    width: 100%;
    left: 0;
    p {
      line-height: 30px;
    }
    .imgSpan {
      display: inline-block;

      position: relative;
      top: 10px;
      margin-left: 10px;
      img {
        width: 72px;
        height: 65px;
        border-radius: 50%;
      }
    }
  }

  .cellTit {
    display: flex;
    justify-content: space-between;
  }
  .valeR {
    color: #2bdec7;
    text-align: center;
    p {
      font-size: 12px;
    }
  }
  .sheng {
    margin-left: 5px;
    background-color: orange;
    padding: 1px 2px;
    color: white;
  }
  .vux-divider {
    color: #2bdec7;
    margin: 60% 40px 0;
  }
  .date {
    display: flex;
    justify-content: space-between;
    color: white;
    text-align: center;
    line-height: 40px;
    .day {
      background-color: #2bdec7;
      width: 25%;
    }
    .shij {
      background-color: #2bdec7;
      width: 50%;
    }
  }
}
</style>
