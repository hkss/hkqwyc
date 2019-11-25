<template>

  <div
    class="recordList"
    :class="{bg: List.length!=0}"
  >

    <van-nav-bar
      :title="publicData.appoiForm.recordTit"
      left-arrow
      @click-left="back"
    />
    <div class="topblank"></div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad"
    >

      <yd-layout>
        <van-swipe-cell
          :right-width="85"
          v-for='item in List'
          :key='item.registrationId'
          :disabled='item.invalidate==0'
        >

          <div
            class="block"
            @click="goDetai(item.registrationId)"
          >
            <div>{{item.hospitalName}}</div>
            <div style="line-height: 35px"><span style="margin-right:20px;">{{item.departmentName}}</span><span>{{item.outpatientType}}</span></div>
            <div style="color:grey;border-top:1px solid #E8E8E8; line-height: 35px;">
              <span>{{item.registrationDate}}</span>
              <span>{{item.dateTime=='am'?'上午':'下午'}}</span>
            </div>
            <div style="color:grey;">就诊人：{{item.contactName}}
              <span
                v-if="item.orderStatus==-4"
                style="float:right;color:#F8F8F8;font-size: 12px;"
              >已改签</span>
              <span
                v-if="item.orderStatus==-3"
                style="float:right;color:#999;font-size: 12px;"
              >已退号</span>
              <span
                v-if="item.orderStatus==-2"
                style="float:right;color:#999;font-size: 12px;"
              >订单超时</span>
              <span
                v-if="item.orderStatus==-1"
                style="float:right;color:#999;font-size: 12px;"
              >已取消</span>
              <span
                v-if="item.orderStatus==0"
                style="float:right;color:#fa8236;font-size: 12px;"
              >待支付</span>
              <span
                v-if="item.orderStatus==1"
                style="float:right;color:#01CDB2;font-size: 12px;"
              >等待就诊</span>
              <span
                v-if="item.orderStatus==5"
                style="float:right;color:#01CDB2;font-size: 12px;"
              >改签生成的订单(已支付差额)</span>
            </div>
          </div>
          <div
            slot="right"
            class="delSp"
            @click="delRecord(item)"
          >删除</div>
        </van-swipe-cell>

      </yd-layout>
    </van-list>
    <div
      class="noneNum"
      v-if="List.length==0"
    >暂无数据</div>
    <loading
      :show="showLoad1"
      text="加载中"
    ></loading>

  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  props: ['publicData'],
  data() {
    return {
      tagMsg: '',
      showLoad1: false,
      respFlag: false,
      List: [],
      pageIndex: 0,
      type: 1,
      loading: false,
      finished: false
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'myRecrd'
      })
    },


    delRecord(item) {
      Dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        this.showLoad1 = true;
        this.$http.get(this.publicData.url.rootUrl + '/deleteOrder', {
          params: {
            sid: '123',
            registrationIds: item.registrationId,
          }
        }).then(response => {
          this.showLoad1 = false;
          if (!response.data.result) {
            this.respFlag = true;
            this.tagMsg = '删除失败';
          } else {
            this.List = [];
            this.pageIndex = 0;
            this.onLoad();
          }
        }).catch(error => {
          this.showLoad1 = false;
          this.respFlag = true;
          this.tagMsg = '请求错误';
        });

      });

    },

    goDetai(registrationId) {
      this.publicData.appoiForm.registrationId = registrationId;
      this.$router.push({
        name: 'oderDet'
      })
    },

    onLoad() {
      this.showLoad1 = true;
      this.pageIndex += 1;
      this.$http.get(this.publicData.url.rootUrl + '/registerOrderList', {
        params: {
          sid: '123',
          userId: JSON.parse(localStorage.getItem("userInfo")).id,
          type: this.type,
          pageNum: this.pageIndex,
          pageSize: 10,
        }
      }).then(response => {
        this.showLoad1 = false;
        console.log(response.data.length)
        this.List = this.List.concat(response.data);
        this.loading = false; // 加载状态结束
        if (response.data.length < 10) {
          this.finished = true;
        }
        for (const item of this.List) {
          if (item.invalidate) {
            item.stauName = '订单超时';
          } else {
            switch (item.orderStatus) {
              case -1:
                item.stauName = '已取消';
                break;
              case 0:
                item.stauName = '待支付';
                break;
              case 1:
                item.stauName = '等待就诊';
                break;
              case -2:
                item.stauName = '订单超时';
                break;
              case -3:
                item.stauName = '已退款';
                break;
              case 5:
                item.stauName = '等待就诊';
                break;
              default:
            }
          }
        }
      }).catch(error => {
        this.showLoad1 = false;
        this.respFlag = true;
        this.tagMsg = '请求错误';
      });

    },

  },
  mounted() {

    switch (this.publicData.appoiForm.recordTit) {
      case '今日记录':
        this.type = 1;
        break;
      case '未完成记录':
        this.type = 2;
        break;
      case '历史记录':
        this.type = 3;
        break;
      default:
    }
    this.onLoad()
  },

}
</script>

<style scoped lang='less'>
.noneNum {
  text-align: center;
  line-height: 50px;
  color: #999;
}
.recordList {
  .delSp {
    line-height: 135px;
    height: 135px;
    width: 85px;
  }
  .van-list {
    margin-top: 10px;
  }
  .block {
    background-color: white;
    margin: auto 10px;
    margin-bottom: 10px;
    padding: 10px;
  }
}
</style>
