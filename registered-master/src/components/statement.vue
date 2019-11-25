<!--  -->
<template>
  <div class="statementPage">
    <van-nav-bar fixed title="账户消费明细" left-arrow @click-left="back">
    </van-nav-bar>
    <div class="topblank"></div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad"
    >
      <yd-layout>
        <div>
          <yd-cell-group>
            <p class="source">
              消费明细
            </p>
            <div class="gray"></div>
            <yd-cell-item
              class="SingIn"
              v-for="(item, index) in list"
              :key="index"
            >
              <span slot="left">
                <p v-if="item.type == 1">
                  挂号余额支付后退号
                </p>
                <p v-if="item.type == 2">挂号余额支付</p>
                <p class="time">{{ item.createTime }}</p>
              </span>
              <span slot="right">
                <span class="name" v-if="item.type == 1"
                  >+{{ item.money }}元</span
                >
                <span class="out" v-if="item.type == 2"
                  >-{{ item.money }}元</span
                >
              </span>
            </yd-cell-item>
          </yd-cell-group>
        </div>
      </yd-layout>
    </van-list>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import MescrollVue from 'mescroll.js/mescroll.vue'

export default {
  //import引入的组件需要注入到对象中才能使用
  props: ["publicData"],
  components: {},
  data() {
    //这里存放数据
    return {
      list: [],
      mystatement: "",
      pageIndex: 0,
      response: "",
      loading: false,
      finished: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    back() {
      this.$router.back();
    },

    onLoad() {
      setTimeout(() => {
        this.pageIndex += 1;
        this.$http
          .get(this.publicData.url.url2 + "/user/getConsumingrecordList.json", {
            params: {
              sid: "123",
              userId: JSON.parse(localStorage.getItem("userInfo")).id,
              pageNum: this.pageIndex,
              pageSize: 10
            }
          })
          .then(response => {
            this.list = this.list.concat(
              this.dataDeal(response.data.t.consumingrecordList)
            );
            this.loading = false; // 加载状态结束
            // 数据全部加载完成
            if (response.data.t.consumingrecordList.length < 10) {
              this.finished = true;
            }
          })
          .catch(error => {
            this.respFlag = true;
            this.tagMsg = "请求错误";
          });
      }, 500);
    },
    statement() {
      this.$router.push({
        name: "rules"
      });
    },

    dataDeal(data) {
      var that = this;
      var arr = data;
      var listArr = [];
      var items = [];
      arr.forEach(function(el, index) {
        for (var i = 0; i < listArr.length; i++) {
          // 对比相同的字段key，相同放入对应的数组
          if (listArr[i].userId == el.userId) {
            listArr[i].listInfo.push({
              createTime: el.createTime,
              money: el.money,
              type: el.type
            });
            return;
          }
        }
        // 第一次对比没有参照，放入参照
        listArr.push({
          createTime: el.createTime.trim().split(/\s+/)[0], // 切割以空格作为分隔符的字符串
          money: el.money,
          type: el.type
        });
      });
      return listArr;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.onLoad();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (localStorage.getItem("userInfo")) {
      //我的信息查询是否有未读
      this.user = JSON.parse(localStorage.getItem("userInfo"));
    }
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="less">
//@import url(); 引入公共css类
.statementPage {
  .van-nav-bar {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100 !important;
  }
  .source {
    line-height: 30px;
    text-align: center;
    color: #999;
    font-size: 12px;
  }
  .gray {
    height: 5px;
    background: #eee;
  }
  .statement {
    width: 100%;
    text-align: center;
    td {
      width: 50%;
      div {
        line-height: 20px;
        margin: 15px auto;
      }
    }
  }
  .statementIcon {
    width: 20px;
    height: 20px;
  }
  .name {
    color: red;
  }
  .out {
    color: green;
  }
  .time {
    font-size: 12px;
  }
}
.yd-cell-item {
  border-bottom: 1px solid #eee;
}
</style>
