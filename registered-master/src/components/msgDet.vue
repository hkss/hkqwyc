<template>
  <div class="msgDet">
    <x-header :left-options="{backText: ''}">消息内容</x-header>

    <div v-for="a in data" :key='a' class="block">
      <p>{{a}}</p>
    </div>
   
    <h4 style="margin-top:50px;margin-left:5px;">【来自E号通微信公众号】</h4>

    <loading :show="showLoad1" text="加载中"></loading>

  </div>
</template>

<script>

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
    setMessageIsRead(){
      this.showLoad1=true;
      this.$http.get(this.publicData.url.rootUrl+'/setMessageIsRead',{
        params:{
          sid:'123',
          id:this.$route.params.id,
        }
      }).then(response => {
        this.showLoad1=false;
      
      }).catch(error => {
        this.showLoad1=false;    
        this.respFlag=true;

      }); 

    }
  },
  mounted(){
     var a=this.$route.params.messageInfo;
     var arr=a.split('。');
     var b=arr[0].split(',');
     var c=b[0]+'，'+b[1];
     this.data.push(c);
     for(var i=2;i<b.length;i++){
       this.data.push(b[i]);
     }
     this.data.push(arr[1]);

     this.setMessageIsRead();
  },
}
</script>

<style scoped lang='less'>
.msgDet{
  
  .block{
   
    p{
      margin: 10px;
    }
  }

}

</style>
