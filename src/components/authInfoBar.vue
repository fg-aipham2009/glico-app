<template>
  <div class="my-msg info">
    <img :src="userImg" :alt="userImg">
    <p v-if="userName">{{userName}} さん</p>
  </div>
</template>

<script>
  export default {
    name: "authInfoBar",
    data(){
      return {
        userName: '',
        userImg: ''
      }
    },
    props: {
      showMyPage: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init: function() {
        this.$common.getUserAuthInfoForMyPage(this)
      }
    }
  }
</script>

<style scoped>

</style>
