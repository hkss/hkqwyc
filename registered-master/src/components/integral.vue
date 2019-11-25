<!--  -->
<template>
  <div class='integralPage'>
    <van-nav-bar
      fixed
      title="我的积分"
      left-arrow
      @click-left="back"
      @click-right="integral"
      right-text="积分规则"
    > </van-nav-bar>
    <div class="topblank"></div>
    <yd-layout>
      <div>
        <yd-cell-group>
          <table class="integral">
            <tr>
              <td>
                <div>
                  <p>
                    <img
                      class="integralIcon"
                      src="../assets/msg.png"
                      slot='label'
                    />
                  </p>
                  <p><span class="count">{{myIntegral}}</span> 积分</p>
                </div>
              </td>
              <td>
              </td>
            </tr>
          </table>

          <p class="source">
            积分来源
          </p>
          <yd-cell-item
            class="SingIn"
            v-for="(item, index) in list"
            :key="index"
          >
            <span slot="left">
              <p>{{item.produceTypeName}}</p>
              <p>{{item.createTime}}</p>
            </span>
            <span slot="right"><span class="name">+{{item.integralNum}}积分</span></span>
          </yd-cell-item>
        </yd-cell-group>
      </div>
    </yd-layout>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  props: ['publicData'],
  components: {},
  data() {
    //这里存放数据
    return {
      list: [],
      myIntegral: '',
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
    _getData() {
      var vm = this

      this.$http.get(vm.publicData.url.url2 + '/user/integral_list.json', {
        params: {
          sid: 123,
          pageNum: 1,
          userId: JSON.parse(localStorage.getItem('userId')),
        }
      }).then(response => {
        this.dataDeal(response.data.t.list)
        this.myIntegral = response.data.t.myIntegral.integral
      })
    },
    integral() {
      this.$router.push({
        name: 'rules',
      })
    },

    dataDeal(data) {
      var that = this
      var arr = data;
      var listArr = [];
      var items = [];
      arr.forEach(function (el, index) {
        for (var i = 0; i < listArr.length; i++) {
          // 对比相同的字段key，相同放入对应的数组
          if (listArr[i].userId == el.userId) {
            listArr[i].listInfo.push({
              createTime: el.createTime,
              integralNum: el.integralNum,
              produceTypeName: el.produceTypeName,
            });
            return;
          }
        }
        // 第一次对比没有参照，放入参照
        listArr.push({
          createTime: (el.createTime).trim().split(/\s+/)[0],// 切割以空格作为分隔符的字符串
          integralNum: el.integralNum,
          produceTypeName: el.produceTypeName,
        });
      });
      this.list = listArr

    },

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this._getData()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (localStorage.getItem('userInfo')) { //我的信息查询是否有未读
      this.user = JSON.parse(localStorage.getItem('userInfo'));
    }
  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang='less'>
//@import url(); 引入公共css类
.integralPage {
  .source {
    line-height: 30px;
    background: #eaeaea;
    text-align: center;
    color: #999;
    font-size: 12px;
  }
  .integral {
    width: 100%;
    text-align: center;
    // td:first-child {
    //   // border-right: 1px solid white;
    // }
    td {
      width: 50%;
      div {
        line-height: 20px;
        margin: 15px auto;
      }
    }
  }
  .SingIn {
    p {
      line-height: 25px;
    }
  }

  .integralIcon {
    width: 20px;
    height: 20px;
  }
  .name,
  .count {
    color: red;
  }
}
.yd-cell-item {
  border-bottom: 1px solid #eee;
}
</style>