<template>
  <div class="help">
    <x-header :left-options="{backText: ''}">帮助</x-header>

    <cell title="E号通服务协议" is-link :link='{name:"readMe",params:{tit:"E号通服务协议"}}'/>
    <cell title="E号通号码注册规则" is-link :link='{name:"readMe",params:{tit:"E号通号码注册规则"}}'/>
    <cell title="E号通用户协议" is-link :link='{name:"readMe",params:{tit:"E号通用户协议"}}'/>
   
  </div>
</template>

<script>
function getResult (val) {

  return val
}

export default {

  data () {
    return {
      
    }
  },
  methods:{
    
  },
  mounted(){
   

  },
}
</script>

<style scoped lang='less'>
.help{

}

</style>
