<template>
  <div class="search">
    <van-nav-bar fixed title="搜索医院" left-arrow @click-left="back">
    </van-nav-bar>
    <div class="topblank"></div>
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model.trim="value"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      ref="search"
      placeholder="请输入医院名称"
    ></search>

    <loading :show="showLoad1" text="加载中"></loading>
  </div>
</template>

<script>
export default {
  props: ["publicData"],
  data() {
    return {
      results: [],
      value: "",
      showLoad1: false,
      respFlag: false,
      pageIndex: 1,
      value2: "",
      result: []
    };
  },
  watch: {
    value2(val) {
      this.result = this.getResult(val);
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    resultClick(item) {
      var registrationId;
      if (this.publicData.appoiForm.registrationId) {
        registrationId = this.publicData.appoiForm.registrationId;
      }
      this.publicData.appoiForm = {};
      if (registrationId) {
        this.publicData.appoiForm.registrationId = registrationId;
      }
      Object.assign(this.publicData.appoiForm, item);
      this.$router.go(-1);
    },
    getResult(val) {
      if (!val) {
        return;
      }
      this.getSearch(val);
    },

    getSearch(val) {
      this.showLoad1 = true;
      this.$http
        .get(this.publicData.url.rootUrl + "/hospital/searchHospital", {
          params: {
            sid: "123",
            content: val,
            pageNum: this.pageIndex,
            pageSize: 10
          }
        })
        .then(response => {
          this.showLoad1 = false;
          this.results = [];
          for (let i in response.data) {
            // `${val} result: ${i + 1} `
            var reg = new RegExp("" + val + "", "g");
            var resultqw = response.data[i].hospitalName.replace(
              reg,
              "<span style='color:red;'>" + val + "</span>"
            );
            this.results.push({
              title: response.data[i].hospitalName,
              hospitalId: response.data[i].hospitalId,
              hospitalLatitude: response.data[i].latitude, // 纬度，浮点数，范围为90 ~ -90
              hospitalLongitude: response.data[i].longitude // 经度，浮点数，范围为180 ~ -180。
            });
          }
        })
        .catch(error => {
          this.showLoad1 = false;
          this.respFlag = true;
        });
    }
  }
};
</script>

<style scoped lang="less">
.search {
}
</style>
