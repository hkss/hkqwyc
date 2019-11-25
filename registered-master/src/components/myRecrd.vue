<template>

  <div class="myRecrd">
    <van-nav-bar
      title="我的记录"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topblank"></div>

    <div class="time">{{date[0]}}年{{date[1]}}月{{date[2]}}日 {{week}}</div>
    <cell
      :title="item"
      is-link
      @click.native="goList(item)"
      v-for='(item,index) in cellList'
      :key='index'
    />
    <div class="blank"></div>
    <!-- <cell
      :title="i"
      is-link
      @click.native="go(i)"
      v-for='(i,index) in cell'
      :key='index'
    /> -->
    <div class="blank"></div>

    <div class="conta">
      <p>温馨提示:</p>
      <div class="content">
        1、请在就诊日的预约时间段内提前30分钟前往医院凭身份证取号；<br />
        2、订单信息在本APP保存期限为30日；<br />
        3、如不能按时就诊请提前在本APP上办理改签或退号。挂号改签只能办理1次。已经改签的挂号不能办理再次改签；<br />
        4、改签、退号后，如有应退款项，退回原挂号时所使用的支付账户，请及时查询。逾期未退号，所收费用不予退还；<br />
        5、改签或退号成功，均收取1元服务费；<br />
        6、同一个手机账户每天挂号不能超过2个。改签、退号每天不能超过3次。<br />
        7、改签可以在预约时间段内办理改签,退号须提前在预约时间截止前30分钟退号.<br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['publicData'],
  data() {
    return {
      date: '',
      week: '',
      cellList: ['今日记录', '未完成记录', '历史记录'],
      cell: ['快速提问', '在线咨询', '电话咨询'],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'index'
      })
    },
    goList(item) {
      this.publicData.appoiForm.recordTit = item;
      this.$router.push({
        name: 'recordList'
      })
    },
    go(item) {
      this.publicData.appoiForm.recordTit = item;
      this.$router.push({
        name: 'recordList'
      })
    },
  },
  mounted() {

    this.date = new Date().toLocaleDateString().split('/');
    var a = new Array("日", "一", "二", "三", "四", "五", "六");
    var week = new Date().getDay();
    this.week = "星期" + a[week];

  },
}
</script>

<style scoped lang='less'>
.myRecrd {
  // position: fixed;
  // height: 100%;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0px;
  // background-color: #eeeeee;
  .time {
    background-color: #eeeeee;
    line-height: 30px;
    padding-left: 10px;
    font-size: 12px;
  }
  .conta {
    background: #fff;
    padding: 10px 10px;
    p {
      font-size: 14px;
    }
    .content {
      font-size: 12px;
      letter-spacing: 1px;
      color: #999;
    }
  }
}
</style>
