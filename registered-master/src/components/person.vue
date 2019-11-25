<!--  -->
<template>
  <div class="personPage">
    <van-nav-bar
      fixed
      title="个人信息"
      left-arrow
      @click-left="back"
      @click-right="saveBtn"
      right-text="保存"
    >
    </van-nav-bar>
    <div class="topblank"></div>
    <yd-cell-group>
      <yd-cell-item
        arrow
        class="Img"
      >
        <span
          slot="left"
          class="title"
        >头像</span>
        <span slot="right">
          <van-uploader
            :after-read="onRead"
            accept="image/*,image/png,image/gif,image/jpeg"
            name="file"
            multiple
            ref="uploader"
          >
            <img
              :src="
                 islogin.user.image
                  ? publicData.url.pic +  islogin.user.image
                  : head
              "
              class="uploadImg"
              ref="uploadImg"
            />
          </van-uploader>
        </span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group>
      <yd-cell-item>
        <span
          slot="left"
          class="title"
        >账号</span>
        <span
          slot="right"
          class="editInput"
        >{{
          islogin.user.userName
          }}</span>
      </yd-cell-item>
      <yd-cell-item
        arrow
        type="link"
        href="editPhone"
      >
        <span
          slot="left"
          class="title"
        >绑定手机号</span>
        <span slot="right">{{ islogin.user.mobileNo }}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span
          slot="left"
          class="title"
        >姓名</span>
        <span slot="right">
          <input
            type="text"
            v-model="name"
            class="editInput"
            placeholder="未填写"
          />
        </span>
      </yd-cell-item>
      <yd-cell-item>
        <span
          slot="left"
          class="title"
        >昵称</span>
        <span slot="right">
          <input
            type="text"
            v-model="nickName"
            class="editInput"
            placeholder="未填写"
          />
        </span>
      </yd-cell-item>
      <yd-cell-item>
        <span
          slot="left"
          class="title"
        >性别</span>
        <span
          slot="right"
          class="sex"
        >
          <yd-radio-group
            v-model="radio5"
            size="20"
          >
            <yd-radio val="1"><span>男</span></yd-radio>
            <yd-radio val="2"><span>女</span></yd-radio>
          </yd-radio-group>
        </span>
      </yd-cell-item>
      <yd-cell-item>
        <span
          slot="left"
          class="title"
        >身份证</span>
        <span slot="right">
          <input
            type="text"
            v-model="idCardNo"
            class="editInput"
            placeholder="未填写"
          />
        </span>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span
          slot="left"
          class="title"
        >出生日期</span>
        <span
          slot="right"
          class="date"
        >
          <div>
            <yd-cell-item>
              <yd-datetime
                v-model="birthdayNum"
                :yearFormat="yearFormat"
                :month-format="monthFormat"
                :day-format="dayFormat"
                type="date"
                slot="right"
              ></yd-datetime>
            </yd-cell-item>
          </div>
        </span>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span
          slot="left"
          class="title"
        >地区：</span>
        <input
          slot="right"
          type="text"
          @click.stop="show2 = true"
          v-model="area"
          class="area"
          readonly
          placeholder="未填写"
        />
      </yd-cell-item>
    </yd-cell-group>

    <yd-cityselect
      v-model="show2"
      ref="cityselectDemo"
      :callback="result2"
      :items="district"
    ></yd-cityselect>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import head from "../assets/head-icon.png";
import District from "ydui-district/dist/jd_province_city_area_id";
import { mapGetters, mapMutations } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  props: ["publicData"],
  components: {},
  data() {
    //这里存放数据
    return {
      head: head,
      user: "",
      name: "",
      nickName: "",
      radio5: "",
      idCardNo: "",
      birthdayNum: "",
      area: "",
      fileName: "",
      show2: false,
      district: District,
      yearFormat:
        '<span style="color:#F00;">{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
      monthFormat:
        '<span style="color:#0BB20C;">{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
      dayFormat:
        '<span style="color:#FFB400;">{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>'
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapGetters(["islogin"])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    back() {
      this.$router.back();
    },
    saveBtn() {
      let param = new FormData(); // 创建form对象
      param.append("sid", 123);
      param.append("id", this.user.id);
      if(this.file){
        param.append("file", this.file);
      }
      param.append("mobileNo", this.user.mobileNo);
      param.append("userName", this.user.userName);
      param.append("sex", this.radio5);
      param.append("idCardNo", this.idCardNo);
      param.append("nickName", this.nickName);
      param.append("name", this.name);
      param.append("area", this.area);
      var data = param;
      var url = this.publicData.url.url2 + "/user/updateUserInfo.json";
      this.$http
        .post(url, param, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          if (response.data.t.pass == "true") {
            this.$dialog.toast({
              mes: "保存成功",
              icon: "success",
              timeout: 1500
            });
            this.setLoginMsg({
              state: true,
              user: response.data.t.list[0],

            });
            setTimeout(() => {
              this.$router.push({
                name: "my"
              });
            }, 2000);
          } else if (response.data.t.pass == "false") {
            this.$toast(response.data.t.errorCode);
          }
        });
    },
    onRead(item) {
      this.fileName = item.content;
      this.file = item.file;
      this.$refs.uploadImg.src = item.content;
      console.log(item.file)
    },
    result2(ret) {
      this.area = ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
    },
    _getData() {
      if (localStorage.getItem("userInfo")) {
        this.user = JSON.parse(localStorage.getItem("userInfo"));
        this.name = this.islogin.user.name;
        this.nickName = this.islogin.user.nickName || "新用户注册";
        this.radio5 = this.islogin.user.sex;
        this.idCardNo = this.islogin.user.idCardNo;
        this.area=this.islogin.user.area;
        if (
          this.islogin.user.idCardNo != null &&
          this.islogin.user.idCardNo != ""
        ) {
          if (this.islogin.user.idCardNo.length == 15) {
            this.birthdayNum =
              "19" + this.islogin.user.idCardNo.substr(6, 6);
          } else if (this.islogin.user.idCardNo.length == 18) {
            this.birthdayNum = this.islogin.user.idCardNo.substr(6, 8);
          }
          this.birthdayNum = this.birthdayNum.replace(/(.{4})(.{2})/, "$1-$2-");
        }
        // 获取出生日期
        // console.log(this.birthdayNum)
        // 地区
        this.area = this.islogin.user.address || "";
      }
    },
    ...mapMutations({
      setLoginMsg: "SET_ISLOGIN"
    })
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this._getData();
  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="less">
//@import url(); 引入公共css类
.personPage {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 152;
  background: #f5f3f4;
  .Img {
    height: 72px;
  }
  .grayH {
    height: 10px;
    background: #f5f3f4;
  }
  .editInput {
    width: 100%;
    text-align: right;
    padding-right: 12px;
  }
  .area {
    text-align: right;
  }
}
.yd-cell-item {
  border-bottom: 1px solid #eee;
}
.title {
  color: #999;
}
.uploadImg {
  width: 55px;
  height: 55px;
  border-radius: 50%;
}
</style>
