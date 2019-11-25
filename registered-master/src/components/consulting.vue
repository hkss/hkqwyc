<template>
  <div class="consulting">
    <van-nav-bar
      fixed
      title="咨询医生"
    > </van-nav-bar>
    <div class="topblank"></div>
    <search-con></search-con>
    <yd-layout>
      <div class="tion">
        <yd-flexbox>
          <yd-flexbox-item>
            <div
              class="flexbox"
              @click="fastAsk"
            >
              <img src="../assets/head-icon.png" />
              <p>快速提问</p>
              <p class="text">方便快捷</p>
            </div>
          </yd-flexbox-item>
          <yd-flexbox-item>
            <yd-flexbox-item>
              <div
                class="flexbox"
                @click="consulting"
              >
                <img src="../assets/head-icon.png" />
                <p>电话咨询</p>
                <p class="text">一对一对话咨询</p>
              </div>
            </yd-flexbox-item>
          </yd-flexbox-item>
          <yd-flexbox-item>
            <yd-flexbox-item>
              <div
                class="flexbox"
                @click="consulting"
              >
                <img src="../assets/head-icon.png" />
                <p>在线咨询</p>
                <p class="text">专业解答</p>
              </div>
            </yd-flexbox-item>
          </yd-flexbox-item>
        </yd-flexbox>
      </div>
      <div class="tion">
        <h4 class="doctor">人气榜医生</h4>
        <yd-flexbox>
          <yd-flexbox-item>
            <div
              class="flexbox"
              @click="doctorRoom"
            >
              <img src="../assets/head-icon.png" />
              <p>张永科</p>
              <p class="text">方便快捷</p>
            </div>
          </yd-flexbox-item>
          <yd-flexbox-item>
            <yd-flexbox-item>
              <div
                class="flexbox"
                @click="doctorRoom"
              >
                <img src="../assets/head-icon.png" />
                <p>白先枝</p>
                <p class="text">一对一对话咨询</p>
              </div>
            </yd-flexbox-item>
          </yd-flexbox-item>
          <yd-flexbox-item>
            <yd-flexbox-item>
              <div
                class="flexbox"
                @click="doctorRoom"
              >
                <img src="../assets/head-icon.png" />
                <p>黄烨</p>
                <p class="text">专业解答</p>
              </div>
            </yd-flexbox-item>
          </yd-flexbox-item>
        </yd-flexbox>
      </div>
      <div class="content">
        <yd-cell-item
          arrow
          type="link"
          href="/MedicalLectures"
        >
          <yd-icon
            slot="icon"
            name="order"
            size=".42rem"
          ></yd-icon>
          <span slot="left">医学科普</span>
          <span slot="right">更多</span>
        </yd-cell-item>
        <div
          class="msg"
          @click="introduceMsg"
        >
          <yd-flexbox>
            <yd-flexbox-item>
              <div class="introduceMsg">
                <p class="name">推进中医药学信息化发展</p>
                <img
                  class="dotorImg"
                  src="../assets/head-icon.png"
                />
                <div class="introduce">
                  <p>张琪</p>
                  <p class="text">副主任医师</p>
                </div>
              </div>
            </yd-flexbox-item>
            <yd-flexbox-item>
              <div class="likeComments">
                <p class="name">
                  <van-icon
                    name="like-o"
                    color="#999"
                    size="12px"
                  />
                  <span class="ccc">12</span>
                  <van-icon
                    name="chat-o"
                    color="#999"
                    size="12px"
                  />
                  <span>12</span>
                </p>
                <p class="date">2018-3-3</p>
              </div>
            </yd-flexbox-item>
          </yd-flexbox>
        </div>
      </div>
        <div class="bottomblank"></div>
    </yd-layout>
  </div>
</template>

<script>
import SearchCon from "@/components/searchCon";
export default {
  props: ["publicData"],
  components: { SearchCon },
  data() {
    return {};
  },
  watch: {},
  methods: {
    _getData() {
      console.log(this.publicData)
      this.$http.get(this.publicData.url.url2 + '/expert/searchDoctors', {
        params: {
          sid: '123',
        }
      }).then(response => {

      })
    },
    fastAsk() {
      this.$router.push({
        name: "fastAsk"
      });
    },
    doctorRoom() {
      this.$router.push({
        name: "doctorRoom"
      });
    },
    consulting() {
      this.$router.push({
        name: "consultings"
      });
    },
    introduceMsg() {
      this.$router.push({
        name: "introduceMsg"
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this._getData()
  },
};
</script>

<style scoped lang="less">
.consulting {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 50px;
  z-index: 152;
  background: #f5f3f4;
  .bottomblank{
    height: 80px;
  }
  .likeComments {
    float: right;
    color: #999;
    padding-right: 12px;
    span {
      font-size: 12px;
    }
    .ccc{
      padding-right: 10px;
    }
    .date {
      font-size: 13px;
     height: 55px;
    line-height: 80px;
      text-align: right;
    }
  }
  .content {
    background: #fff;
  }
  .tion {
    background: #fff;
    margin-bottom: 10px;
    position: relative;
    .doctor {
      text-align: left;
      font-weight: normal;
      line-height: 36px;
      font-size: 15px;
      padding-left: 10px;
    }
  }
  .searchBlank {
    height: 45px;
    position: relative;
    width: 100%;
    display: none;
  }
  .msg {
    border-top: 1px solid #d9d9d9;
    padding: 5px;
    .name {
      line-height: 30px;
    }
    .dotorImg {
      width: 50px;
      height: 50px;
      float: left;
      margin-bottom: 10px;
    }
    .introduce {
      float: left;
      line-height: 20px;
      padding-left: 8px;
      .text {
        color: #2bdec7;
        font-size: 12px;
      }
    }
  }
}
.flexbox {
  text-align: center;
  margin: 10px 0;
  img {
    width: 50px;
    height: 50px;
  }
  .text {
    color: #999;
    font-size: 12px;
  }
}
</style>
