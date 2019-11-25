<template>
  <div class="zhenR">
    <van-nav-bar
      title="选择就诊人"
      left-arrow
      @click-left="back"
    />
    <div class="topblank"></div>
    <cell
      class="addCell"
      :link='{name:"addZhenR",params:{tit:"添加就诊人"}}'
    >
      <van-icon
        name="add-o"
        slot='icon'
        color='#2BDEC7'
        size='1.2em'
      />
      <span slot='title'>添加就诊人</span>
    </cell>

    <van-swipe-cell
      :right-width="65"
      v-for='item in list'
      :key='item.contactId'
      :disabled='item.contactType=="1"'
    >
      <cell
        @click.native='choseZhenR(item)'
        :inline-desc='item.contactIdcard'
      >
        <template slot="title">
          <span class="custom-text">{{item.contactName}}</span>
          <van-tag
            type="success"
            color="#2bdec7"
            v-if='item.contactType=="1"'
            class='more'
          >默认</van-tag>
        </template>
        <van-icon
          @click.stop="delConta(item)"
          class="custom-icon"
          name="cross"
        />
      </cell>
      <!-- <div
        slot="right"
        class="delSp"
        @click="delConta(item)"
      >删除</div> -->
    </van-swipe-cell>
    <van-dialog
      v-model="delContaShow"
      show-cancel-button
      :before-close="delContaClose"
    >
      <div class="delContent">
        <h4>提示</h4>
        <p>确认要删除该联系人吗?</p>
      </div>
    </van-dialog>

  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  props: ['publicData'],
  data() {
    return {
      tagMsg: '',
      delContaShow: false,
      respFlag: false,
      list: [],
      item: ''
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: "appoiSure"
      })
    },
    delContaClose(action, done) {
      //删除联系人
      if (action === 'confirm') {
        setTimeout(done, 500);
        this.$http.get(this.publicData.url.rootUrl + '/contacts/delContactsByid', {
          params: {
            sid: '123',
            contactId: this.item.contactId,
            userId: JSON.parse(localStorage.getItem("userInfo")).id,
          }
        }).then(response => {
          if (!response.data.type) {
            this.respFlag = true;
            this.tagMsg = '删除失败';
          } else {
            this.getContactsByuserid()
          }
        })
      } else {
        done();
      }
    },
    delConta(item) {
      this.delContaShow = true
      this.item = item

    },
    choseZhenR(item) {
      this.publicData.appoiForm.contactId = item.contactId;
      this.publicData.appoiForm.contactName = item.contactName;
      this.$router.push({
        name: 'appoiSure'
      })
    },

    getContactsByuserid() {
      this.$http.get(this.publicData.url.rootUrl + '/contacts/getContactsByuserid', {
        params: {
          sid: '123',
          userId: JSON.parse(localStorage.getItem("userInfo")).id,
        }
      }).then(response => {
        this.list = response.data;
      }).catch(error => {
        this.respFlag = true;
        this.tagMsg = '请求错误';
      });
    }

  },
  mounted() {
    this.getContactsByuserid()
  },
}
</script>

<style scoped lang='less'>
.zhenR {
  .delContent {
    text-align: center;
    margin: 14px 0 10px;
    h4 {
      line-height: 44px;
      font-weight: normal;
      font-size: 16px;
    }
    p {
      font-size: 14px;
    }
  }
  .more {
    color: white;
    padding: 2px 3px;
    font-size: 12px;
    border-radius: 2px;
  }

  .addCell {
    i {
      position: relative;
      top: 3px;
      margin-right: 5px;
    }
    span {
      color: #2bdec7;
    }
  }
  .van-swipe-cell {
    border-top: 1px solid #dfdee2;
  }
}
</style>
