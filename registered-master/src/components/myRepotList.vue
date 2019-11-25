<template>

  <div class="myRepotList">

<van-nav-bar
      title="在线查看报告"
      left-arrow
      @click-left="back"
    />
    <div class="topblank"></div>
    <divider v-if='List.length==0' class="noData">暂无数据</divider>

    <van-swipe-cell :right-width="75"  v-for='item in List' :key='item.id' >
      <cell :title="item.reportType" :link='{name:"reportDet",params:item}' >
        <span style="color:#2BDEC7">查看报告进度</span>
        <span slot="inline-desc" style="font-size:12px;">{{item.hospitalName}}</span>
      </cell>
      <div slot="right" class="delSp" @click="delCell(item)">删除</div>
    </van-swipe-cell>

    <loading :show="showLoad1" text="加载中"></loading>

  </div>

</template>

<script>
import { Dialog } from 'vant';
export default {
  props:['publicData'],
  data () {
    return {
      List:[],
      showLoad1:false,
      respFlag:false,

      tagMsg:'',
    }
  },
  methods:{
      back(){
      this.$router.push({
        name:'index'
      })
    },
    delCell(item){
      if(item.isPay=='1'){
        this.respFlag=true;
        this.tagMsg='未支付，不能删除';
        return
      }
      Dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        this.showLoad1=true;
        this.$http.get(this.publicData.url.rootUrl+'/preInterface/deleteResult',{
          params:{
            sid:'123',
            id:item.id,
          }
        }).then(response => {
          this.showLoad1=false;
          if(!response.data.result){
            this.respFlag=true;
            this.tagMsg='删除失败';
          }else{
            this.getReportListByUserId();
          }
        }).catch(error => {
          this.showLoad1=false;    
          this.respFlag=true;
          this.tagMsg='请求错误';
        }); 

      });

    },

    getReportListByUserId(){
      this.showLoad1=true;
      this.$http.get(this.publicData.url.rootUrl+'/report/getReportListByUserId',{
        params:{
          sid:'123',
          userId:JSON.parse(localStorage.getItem("userInfo")).id,
        }
      }).then(response => {
        this.showLoad1=false;  
        this.List=response.data.preList;
        for(const item of this.List){
           switch(item.imageItems)
          {
          case '0':
            item.reportType='婚前医学检查证明';
            break;
          case '1':
            item.reportType='婚前医学体检报告';
            break;
          case '2':
            item.reportType='孕检建议告知书';
            break;
          default:
            item.reportType='孕优检查体检报告';
          }
        }
      }).catch(error => {
        this.showLoad1=false;    
        this.respFlag=true;
        this.tagMsg='请求错误';
      }); 
    }
    
  },
  mounted(){
    this.getReportListByUserId();

  },
}
</script>

<style scoped lang='less'>
.myRepotList{
  .delSp{
    line-height:65px;
    height: 65px;
    width: 75px;
  }
  .van-swipe-cell{
    border-top: 1px solid #DFDEE2;
  }
}

</style>
