<template>
  <div class="gaiQ">
    <van-nav-bar
      title="预约挂号"
      left-arrow
      @click-left="back"
    />
    <div class="gaiQlank"></div>
    <guahao :publicData='publicData'></guahao>
  </div>
</template>

<script>
import guahao from '@/components/formG'
export default {
  components: {
    guahao
  },
  props: ['publicData'],
  methods: {
    back() {
      this.$router.push({
        name: 'oderDet'
      })
    },
  },

}
</script>
<style scoped lang='less'>
.gaiQlank {
  height: 50px;
  width: 100%;
}
</style>

