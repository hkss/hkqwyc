<template>
  <div class="home">
    <router-view :publicData="publicData"></router-view>

    <tabbar v-model="selected" @on-index-change="changeBar">
      <tabbar-item link="/index">
        <img
          v-show="selected != 0"
          slot="icon"
          src="../assets/ic_home_store_n3.png"
        />
        <img
          v-show="selected == 0"
          slot="icon"
          src="../assets/ic_home_store_h3.png"
        />
        <span slot="label">E号通</span>
      </tabbar-item>
      <tabbar-item link="/consulting">
        <img
          v-show="selected != 1"
          slot="icon"
          src="../assets/icon_zixun.png"
        />
        <img
          v-show="selected == 1"
          slot="icon"
          src="../assets/icon_zixun_active.png"
        />
        <span slot="label">咨询</span>
      </tabbar-item>
      <tabbar-item link="/my">
        <img
          slot="icon"
          v-show="selected != 2"
          src="../assets/ic_home_my_n5.png"
        />
        <img
          slot="icon"
          v-show="selected == 2"
          src="../assets/ic_home_my_h5.png"
        />
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
export default {
  props: ["publicData"],
  data() {
    return {
      selected: 0
    };
  },
  methods: {
    changeBar(v) {
      if (this.$route.fullPath == "/my") {
        this.selected = 2;
      } else if (this.$route.fullPath == "/consulting") {
        this.selected = 1;
      } else {
        this.selected = v;
      }
    }
  },

  mounted() {}
};
</script>

<style scoped lang="less">
.home {
  .weui-tabbar {
    position: fixed;
    background: #fff;
  }
}
</style>
