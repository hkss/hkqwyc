<template>
  <div class="reportDet">
    <x-header :left-options="{backText: ''}">{{data.reportType}}</x-header>

    <timeline>
			<timeline-item v-for='item in data.logistics' :key='item.createTime'>
				<p >{{item.stepName}}</p>
				<p >{{item.createTime}}</p>
			</timeline-item>
		</timeline>

    <div v-if='data.images'>
      <div class="divider1"></div>

      <div class="tit2">报告详情<span style="margin-left:10px;font-size:12px;">（温馨提示：点击放大查看图片）</span></div>

      <div class="imgD">
        <img class="previewer-demo-img" v-for="(item, index) in data.images" :src="publicData.url.pic+item" :key='index'  @click="show(index)">
      </div>
    </div>
   
   
    <loading :show="showLoad1" text="加载中"></loading>

  </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  props:['publicData'],
  data () {
    return {
      data:[],
      showLoad1:false,
      respFlag:false,
    }
  },
  methods:{
    show(position) {
      var images=[];
      for(let src of this.data.images){
        images.push(this.publicData.url.pic+src);
      }
      const instance = ImagePreview({
        images,
        startPosition: typeof position === 'number' ? position : 0
      });
    }
  },
  mounted(){
     this.data=this.$route.params;
     for(const item of this.data.logistics){
      switch(item.perStatus)
        {
        case '1':
          item.stepName='登记成功,请前往医院检查';
          break;
        case '2':
          item.stepName='检查完成,请耐心等待报告结果';
          break;
        case '3':
          item.stepName='报告已出,查看报告';
          break;
        case '4':
          item.stepName='临床检验完成,等待医生评估';
          break;
        case '5':
          item.stepName='临床检验完成,等待医生评估';
          break;
        default:
        }
     }
    
  },
}
</script>

<style scoped lang='less'>
.reportDet{
  .tit2{
    margin: 10px;
  }
  .imgD{
    padding: 10px 0 10px 10px;
    .previewer-demo-img{
      height: 150px;width:100px;
      margin-right: 10px;
    }
  }


}

</style>
