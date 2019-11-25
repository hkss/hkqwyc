<!--  -->
<template>
  <div class='fastAsk'>
    <van-nav-bar
      fixed
      title="快速提问"
      left-arrow
      @click-left="back"
    >
    </van-nav-bar>
    <div class="topblank"></div>
    <yd-layout>
      <div class="sex">
        <yd-flexbox>
          <yd-flexbox-item>
            <span class="title">性别:</span>
            <van-radio-group v-model="radio">
              <van-radio
                name="1"
                v-if="radio"
                :class="radio==1?'checked':'unchecked'"
                checked-color="#fff"
              >
                <span class="name">男</span></van-radio>
              <van-radio
                :class="radio==2?'checked':'unchecked'"
                name="2"
                checked-color="#fff"
              ><span class="name">女</span></van-radio>
            </van-radio-group>
          </yd-flexbox-item>
        </yd-flexbox>
        <!-- <yd-flexbox>
        <div class="birthday">
          <yd-button
            @click.native="show1 = true"
            size="large"
          >带取消</yd-button>
        </div>
      </yd-flexbox> -->
      </div>
      <div class="askContent">
        <yd-cell-group>
          <yd-cell-item>
            <yd-textarea
              slot="right"
              v-model="askArea"
              placeholder="请详细描述您的病情，症状，治疗经过平以及想要获得的帮助（至少输入10个字）"
            ></yd-textarea>
          </yd-cell-item>
        </yd-cell-group>
        <div class="upload">

          <van-uploader
            :after-read="onRead"
            accept="image/*,image/png,image/gif,image/jpeg"
            name="file"
            multiple
            ref="uploader"
          >
            <!-- <img
              :src="
                 islogin.user.image
                  ? publicData.url.pic +  islogin.user.image
                  : head
              "
              class="uploadImg"
              ref="uploadImg"
            /> -->
            <img
              src=" ../../static/img_icon/upload.png "
              ref="uploadImg"
              class="uploadImg"
            />
          </van-uploader>
          <h5>添加照片</h5>
          <p>可上传病例、检查单、患处等图片，方便医生确认</p>
        </div>
      </div>
      <h5 class="askDepartment">请输入想咨询的问题</h5>

      <div class="sureSubmit">
        <x-button
          :gradients="['#2BDEC7', '#2AC68C']"
          class="saveBtn"
          @click.native="sureSubmit"
        >提交</x-button>
      </div>
    </yd-layout>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import head from "../../static/img_icon/upload.png";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      radio: '1',
      askArea: '',

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
    onRead(item) {
      this.fileName = item.content;
      this.file = item.file;
      this.$refs.uploadImg.src = item.content;
      console.log(item.file)
    },
    sureSubmit() { },
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
.fastAsk {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 152;
  background: #f5f3f4;
  h5 {
    font-weight: normal;
  }
  .askDepartment{
    margin: 12px ;
  }
}
.sex {
  background: #2bdec7;
  height: 42px;
  line-height: 42px;

  .title {
    float: left;
    color: #fff;
    padding-right: 20px;
    padding-left: 10px;
  }
  .van-radio {
    float: left;
    position: relative;

    .name {
      position: absolute;
      left: 0;
      top: 0;
      width: 36px;
      text-align: center;
      line-height: 43px;
      color: #fff;
    }
  }
  .checked {
    .name {
      color: #2bdec7;
    }
  }
}
.birthday {
  float: right;
}
.askContent {
  padding: 12px 0;
  font-size: 12px;
  background: #fff;
  .upload {
    margin: 0 12px;
    font-size: 14px;
    .uploadImg {
      width: 60px;
      margin: 12px 0;
      height: 60px;
    }
    p {
      color: #999;
    }
  }
}
.yd-textarea {
  border: 1px solid #d9d9d9;
}
.sureSubmit {
  margin: 30px 12px 0;
}
</style>