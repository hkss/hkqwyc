<!--  -->
<template>
  <div class='phoneConsulting'>
    <van-nav-bar
      fixed
      title="电话咨询"
      left-arrow
      @click-left="back"
    >
    </van-nav-bar>
    <div class="topblank"></div>
    <yd-search
      v-model="value1"
      :on-submit="submitHandler"
    ></yd-search>
    <yd-layout>
      <div class="select">
        <yd-flexbox>
          <yd-flexbox-item>
            <div class="introduceMsg">
              <img
                class="dotorImg"
                src="../assets/head-icon.png"
              />
              <div class="introduce">
                <p>健康自检</p>
                <p class="text">根据部位症状查找</p>
              </div>
            </div>
          </yd-flexbox-item>
          <yd-flexbox-item>
            <div
              class="Parts"
              @click="selectBtn"
            >
              选择部位
            </div>
          </yd-flexbox-item>
        </yd-flexbox>
      </div>
      <p class="conditions">按照门诊找医生</p>
      <div class="itemlist">
        <yd-grids-group :rows="4">
          <yd-grids-item
            v-for="(items, index) in itemlist"
            :key="index"
            type="link"
            href="eaditPwd"
          >
            <div
              slot="else"
              style="text-align: center;"
            >
              <img
                slot="icon"
                class="itemIcon"
                :src="items.itemIcon"
              />
              <p>{{items.department}}</p>
            </div>
          </yd-grids-item>

        </yd-grids-group>
      </div>
    </yd-layout>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import itemIcon from '../assets/head-icon.png'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      value1: '',
      itemlist: [
        {
          itemIcon: itemIcon,
          department: "急诊科"
        },
        {
          itemIcon: itemIcon,
          department: "内科"
        },
        {
          itemIcon: itemIcon,
          department: "外科"
        },
        {
          itemIcon: itemIcon,
          department: "妇产科"
        },
        {
          itemIcon: itemIcon,
          department: "儿科"
        },
        {
          itemIcon: itemIcon,
          department: "五官科"
        },
        {
          itemIcon: itemIcon,
          department: "皮肤科"
        },
        {
          itemIcon: itemIcon,
          department: "肿瘤科"
        },
        {
          itemIcon: itemIcon,
          department: "精神心理科"
        },
        {
          itemIcon: itemIcon,
          department: "男科"
        },
        {
          itemIcon: itemIcon,
          department: "妇女保健科"
        },
        {
          itemIcon: itemIcon,
          department: "儿童保健科"
        },
        {
          itemIcon: itemIcon,
          department: "康复医学科"
        },
        {
          itemIcon: itemIcon,
          department: "中医科"
        },
        {
          itemIcon: itemIcon,
          department: "中医结合科"
        },
        {
          itemIcon: itemIcon,
          department: "医学美容科"
        }]
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
    submitHandler(value) {
      this.$toast(11);
    },
    selectBtn() { },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

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
.select {
  margin: 25px 20px;
  .introduceMsg {
    .dotorImg {
      width: 50px;
      height: 50px;
      float: left;
    }
    .introduce {
      padding: 10px 5px;
      line-height: 16px;
      float: left;
      .text {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .Parts {
    float: right;
    padding: 10px;
    line-height: 1px;
    background: blue;
    height: 20px;
    font-size: 12px;
    color: #fff;
    border-radius: 5px;
    background: -webkit-linear-gradient(
      left,
      #00d1fe,
      #00b7fd
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      left,
      #00d1fe,
      #00b7fd
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      left,
      #00d1fe,
      #00b7fd
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(
      left,
      #00d1fe,
      #00b7fd
    ); /* 标准的语法（必须放在最后） */
  }
}
.conditions {
  padding-left: 12px;
  background: #efeff4;
  line-height: 36px;
}
.itemlist {
  text-align: center;
  margin: 10px 0;
  .itemIcon {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: 12px;
  }
}
</style>