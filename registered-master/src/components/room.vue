<template>
  <div class="room">

    <van-nav-bar
      title="选择科室"
      left-arrow
      @click-left="back"
    />
    <div class="topblank"></div>
    <div class="conta">
      <div
        v-for='item in roomList'
        :key='item.departmentId'
        class="roomSpn"
        @click="choseRoom(item)"
      >{{item.subjectName}}</div>
    </div>

    <divider
      v-if='roomList.length==0'
      class="noData"
    >暂时数据</divider>

    <loading
      :show="showLoad1"
      text="加载中"
    ></loading>

  </div>
</template>

<script>

export default {
  props: ['publicData'],
  data() {
    return {
      showLoad1: false,
      respFlag: false,
      roomList: [],
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'index'
      })
    },
    choseRoom(item) {
      Object.assign(this.publicData.appoiForm, item);
      delete this.publicData.appoiForm.outpatientType;
      this.$router.go(-1);
    }
  },
  mounted() {
    if (!this.publicData.appoiForm.hospitalId) {
      return
    }
    this.showLoad1 = true;
    this.$http.get(this.publicData.url.rootUrl + '/hospital/getDepartmentList', {
      params: {
        sid: '123',
        hospitalId: this.publicData.appoiForm.hospitalId,
      }
    }).then(response => {
      this.showLoad1 = false;
      this.roomList = response.data;
    }).catch(error => {
      this.showLoad1 = false;
      this.respFlag = true;
    });

  },
}
</script>

<style scoped lang='less'>
.room {
  .conta {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-bottom: 10px;
    .roomSpn {
      border: 1px solid #2bdec7;
      width: 45%;
      text-align: center;
      margin-top: 10px;
      line-height: 30px;
    }
  }
}
</style>
