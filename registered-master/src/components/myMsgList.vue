<template>

  <div class="myMsgList">

    <van-nav-bar
      title="我的信息"
      left-arrow
      @click-left="back"
    />
    <div class="topblank"></div>
    <divider
      v-if='List.length==0'
      class="noData"
    >暂无数据</divider>
    <yd-layout>

    <van-swipe-cell
      :right-width="75"
      v-for='item in List'
      :key='item.id'
    >
      <cell
        :title="item.messageName"
        is-link
        :link='{name:"msgDet",params:item}'
      >
        <div slot='inline-desc'>
          <p>{{item.alert}}</p>
          <p>{{item.messageTime}}</p>
        </div>
        <badge v-if='item.isRead=="0"'></badge>
      </cell>
      <div
        slot="right"
        class="delSp"
        @click="delCell(item)"
      >删除</div>
    </van-swipe-cell>

    <loading
      :show="showLoad1"
      text="加载中"
    ></loading>
    </yd-layout>
  </div>

</template>

<script>
import { Dialog } from 'vant';
export default {
  props: ['publicData'],
  data() {
    return {
      List: [],
      showLoad1: false,
      respFlag: false,

      tagMsg: '',
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'index'
      })
    },
    delCell(item) {
      Dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        this.showLoad1 = true;
        this.$http.get(this.publicData.url.rootUrl + '/delJpushMessage', {
          params: {
            sid: '123',
            id: item.id,
          }
        }).then(response => {
          this.showLoad1 = false;
          if (!response.data.type) {
            this.respFlag = true;
            this.tagMsg = '删除失败';
          } else {
            this.getJpushMessage();
          }
        }).catch(error => {
          this.showLoad1 = false;
          this.respFlag = true;
          this.tagMsg = '请求错误';
        });

      });

    },

    getJpushMessage() {
      this.showLoad1 = true;
      this.$http.get(this.publicData.url.rootUrl + '/getJpushMessage', {
        params: {
          sid: '123',
          userId: JSON.parse(localStorage.getItem("userInfo")).id,
        }
      }).then(response => {
        this.showLoad1 = false;
        this.List = response.data;
        for (const item of this.List) {
          switch (item.messageType) {
            case '1':
              item.messageName = '就诊通知';
              break;
            case '2':
              item.messageName = '服务项目通知';
              break;
            case '3':
              item.messageName = '报告通知';
              break;
            case '4':
              item.messageName = '预约挂号通知';
              break;
            default:
          }
        }
      }).catch(error => {
        this.showLoad1 = false;
        this.respFlag = true;
        this.tagMsg = '请求错误';
      });
    }

  },
  mounted() {
    this.getJpushMessage();

  },
}
</script>

<style scoped lang='less'>
.myMsgList {
  .vux-label {
    font-size: 16px !important;
  }
  .delSp {
    line-height: 86px;
    height: 86px;
    width: 75px;
  }
  .van-swipe-cell {
    border-top: 1px solid #dfdee2;
  }
}
</style>
