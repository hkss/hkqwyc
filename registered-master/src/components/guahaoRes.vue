<template>
  <div class="guahaoRes">
    <x-header :left-options="{showBack: false}">挂号成功</x-header>

    <div class="res">
      <div>操作成功!订单号码为：</div>
      <div class="noN">{{publicData.appoiForm.registrationId}}</div>
    </div>

    <div
      class="butX"
      style="margin-top:20px;"
    ><button @click="jiYu">继续预约</button></div>
    <div class="butX"><button @click="checkOrder">查看订单</button></div>

  </div>
</template>

<script>

export default {
  props: ['publicData'],
  data() {
    return {

    }
  },
  methods: {

    jiYu() {
      this.$router.push({
        name: 'index'
      })
      this._delData()
    },
    checkOrder() {
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
      console.log("_delData", this.publicData)
    }
  },

  mounted() {
    // this._delData()
  },
}
</script>

<style scoped lang='less'>
.guahaoRes {
  .res {
    text-align: center;
    line-height: 30px;
    .noN {
      color: orange;
    }
    margin-top: 20px;
  }
  .butX {
    padding: 20px 10%;
    button {
      width: 100%;
      height: 40px;
      background-color: #67c1b4;
      color: white;
      border: none;
      border-radius: 5px;
    }
  }
}
</style>
