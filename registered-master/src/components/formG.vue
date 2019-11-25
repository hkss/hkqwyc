<template>
  <div class="formG">
    <cell
      is-link
      @click.native="onFocus"
    >
      <template slot="title">
        <div class="custom-text">
          <span class="cellTitle">医院名称:&nbsp;</span>
          <span
            class="placeholder"
            v-if="!publicData.appoiForm.hospitalId"
          >请输入医院名称</span>
          <span v-if="publicData.appoiForm.hospitalId">
            {{ publicData.appoiForm.title }}
          </span>
        </div>
      </template></cell>
    <div class="time">
      <yd-cell-group>
        <yd-cell-item>
          <span
            class="cellTitle"
            slot="left"
          >时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:</span>
          <yd-datetime
            :start-date="startDate"
            :end-date="endDate"
            v-model="sourceDate"
            :yearFormat="yearFormat"
            :month-format="monthFormat"
            :day-format="dayFormat"
            type="date"
            slot="right"
            :callback="setDate"
          ></yd-datetime>
          <span
            slot="right"
            class="week"
          >{{ week }}</span>
          <div
            slot="right"
            class="radio"
          >
            <van-radio-group
              v-model="sourceTime"
              @change="publicData.appoiForm.sourceTime = sourceTime"
            >
              <van-radio
                name="am"
                checked-color="#2BDEC7"
              >上午</van-radio>
              <van-radio
                name="pm"
                checked-color="#2BDEC7"
              >下午</van-radio>
            </van-radio-group>
          </div>
        </yd-cell-item>
      </yd-cell-group>
    </div>
    <div class="time">
      <cell
        is-link
        @click.native="goRoom"
      >
        <template slot="title">
          <span class="custom-text cellTitle ">
            科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室:&nbsp;&nbsp;
            <b
              class="subjectName"
              v-if="publicData.appoiForm.subjectName"
            >{{publicData.appoiForm.subjectName}}</b></span>
        </template></cell>
    </div>
    <div
      class="timeDiv"
      ref="tagList"
    >
      <span class="cellTitle">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:&nbsp;</span>
      <van-tag
        :plain="item.have"
        :color="item.tagColr"
        v-for="item in tagList"
        :key="item.tagName"
        size="medium"
        @click.native="choeTg(item)"
      >
        {{ item.tagName }}
        <div v-if="item.tagName == '特需门诊'"></div>
      </van-tag>
    </div>
    <div class="sureBtn"><button @click="getSearch">查询结果</button></div>

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
}
//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
  var date = new Date();
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
//获取n天后的日期的函数
function nextTime(day) {
  var date = new Date();
  var date_next = new Date(date.getTime() + day * 24 * 3600 * 1000);
  var year = date_next.getFullYear();
  var month =
    date_next.getMonth() + 1 >= 10
      ? date_next.getMonth() + 1
      : "0" + (date_next.getMonth() + 1);
  var day =
    date_next.getDate() > 10 ? date_next.getDate() : "0" + date_next.getDate();
  return year + "-" + month + "-" + day;
}

function getweek(date) {
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
}

export default {
  props: ["publicData"],
  data() {
    return {
      tagList: [
        {
          tagColr: "",
          tagBG: '',
          tagName: "普通门诊",
          have: false
        },
        {
          tagColr: "",
          tagBG: '',
          tagName: "专家门诊",
          have: false
        },
        {
          tagColr: "",
          tagBG: '',
          tagName: "特需门诊",
          have: false
        }
      ],
      sourceTime: "",
      showLoad1: false,
      respFlag: false,
      mgsE: "",
      sourceDate: this.publicData.appoiForm.sourceDate ? this.publicData.appoiForm.sourceDate : getNowFormatDate(new Date()),
      startDate: getNowFormatDate(new Date()),
      endDate: nextTime(6),
      week: getweek(getNowFormatDate(new Date())),
      yearFormat:
        '<span style="color:#F00;">{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
      monthFormat:
        '<span style="color:#0BB20C;">{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
      dayFormat:
        '<span style="color:#FFB400;">{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>'
    };
  },
  methods: {
    setRadio() {
      this.publicData.appoiForm.sourceTime = this.sourceTime;
    },
    setDate() {
      this.week = getweek(this.sourceDate);
      this.publicData.appoiForm.sourceDate = this.sourceDate;
      this.publicData.appoiForm.week = getweek(this.sourceDate);
    },
    choseDate() {
      var nextDate7 = new Date().getTime() + 24 * 7 * 60 * 60 * 1000; //后7天
      var chD = stringToDate(this.sourceDate, "-");
      if (chD.getTime() < new Date().getTime() || chD.getTime() > nextDate7) {
        this.respFlag = true;
        this.mgsE = "只能选择未来一周内的日期！";
        this.sourceDate = getNowFormatDate(); //将日期格式串,转换成先要的格式
      }
    },
    choeTg(item) {
      if (!item.have) {
        return;
      }
      if (item.tagColr == "") {
        item.tagColr = "#2BDEC7";
        this.publicData.appoiForm.outpatientType = item
      } else {
        item.tagColr = "";
        this.publicData.appoiForm.outpatientType = ''
      }
    },

    getSearch() {
      if (!this.publicData.appoiForm.hospitalId) {
        this.$toast("请先选择医院");
        return;
      }
      if (!this.publicData.appoiForm.departmentId) {
        this.$toast("请先选择科室");
        return;
      }
      if (!this.publicData.appoiForm.outpatientType) {
        this.$toast("请先选择类别");
        return;
      }

      this.publicData.appoiForm.outpatientType = [];
      for (const item of this.tagList) {
        if (item.tagColr != "") {
          this.publicData.appoiForm.outpatientType.push(item.outpatientType);
        }
      }
      if (this.publicData.appoiForm.outpatientType.length == 0) {
        return;
      }
      if (this.$route.name == "index") {
        this.publicData.appoiForm.isGuaH = true;
      } else {
        this.publicData.appoiForm.isGuaH = false;
      }

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
        if (response.data[0]) {
          this.$router.push({
            name: "guahao"
          });
        } else {
          this.$toast(response.data.error)
        }
      })

    },

    goRoom() {
      console.log((new Date()+12 * 3600 * 1000),nextTime(0.1))
      if (!this.publicData.appoiForm.hospitalId) {
        this.$toast('请先选择医院');
        return;
      }
      this.$router.push({
        name: "room"
      });
    },

    onFocus() {
      this.$router.push({
        name: "search"
      });
    },
    getType() {
      //查询门诊类型
      this.showLoad1 = true;
      this.$http
        .get(this.publicData.url.rootUrl + "/getOutpatientTypeList", {
          params: {
            sid: "123",
            hospitalId: this.publicData.appoiForm.hospitalId,
            departmentId: this.publicData.appoiForm.departmentId,
            sourceDate: this.publicData.appoiForm.sourceDate,
            sourceTime: this.publicData.appoiForm.sourceTime
          }
        })
        .then(response => {
          this.showLoad1 = false;
          for (const i in response.data.outpatientTypeList) {
            switch (response.data.outpatientTypeList[i]) {
              case "普通门诊":
                this.tagList[0].have = true;
                this.tagList[0].outpatientType = 0;
                break;
              case "专家门诊":
                this.tagList[1].have = true;
                this.tagList[1].outpatientType = 1;
                break;
              case "特需门诊":
                this.tagList[2].have = true;
                this.tagList[2].outpatientType = 2;
                break;
              default:
            }
          }
        })
        .catch(error => {
          this.showLoad1 = false;
          this.respFlag = true;
          this.mgsE = "请求错误！";
        });
    }
  },
  created() {
  },
  mounted() {
    if (!this.publicData.appoiForm.sourceDate) {
      //日期赋值
      this.publicData.appoiForm.sourceDate = new Date().getFullYear() + "-";
      if (new Date().getMonth() + 1 < 10) {
        this.publicData.appoiForm.sourceDate +=
          "0" + (new Date().getMonth() + 1) + "-";
      } else {
        this.publicData.appoiForm.sourceDate += new Date().getMonth() + 1 + "-";
      }
      if (new Date().getDate() < 10) {
        this.publicData.appoiForm.sourceDate += "0" + new Date().getDate();
      } else {
        this.publicData.appoiForm.sourceDate += new Date().getDate();
      }
    }
    this.sourceDate = this.publicData.appoiForm.sourceDate;

    if (this.publicData.appoiForm.sourceTime) {
      this.sourceTime = this.publicData.appoiForm.sourceTime;
    } else {
      this.sourceTime = "am";
    }
    if (this.publicData.appoiForm.departmentId) {
      //查询门诊类型
      this.getType();
    }
  }
};
</script>

<style scoped lang="less">
.formG {
  .subjectName {
    color: #fff;
    background: #2bdec7;
    font-size: 13px;
    font-weight: normal;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
  }
  .placeholder {
    color: #999;
  }
  .week {
    position: absolute;
    left: 150px;
  }
  .van-tag {
    text-align: center;
    padding: 5px 10px;
    color: rgb(150, 151, 153);
    background: #fff !important;
  }
  .timeDiv {
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
    border-top: 1px solid #dfdee2;
    margin: 0 15px;
    input[type="date"] {
      border: none;
    }
    .van-radio {
      float: left;
    }
    .van-radio-group {
      display: flex;
      float: right;
      .van-radio {
        margin-right: 10px;
      }
    }
  }
}
</style>
