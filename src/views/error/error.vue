<template>
    <div>
      error router<br/>
      <span>
        {{errMsg}}
      </span>
      <router-link :to="{path:'/home'}">go home</router-link>
    </div>
</template>

<script>
    export default {
        name: "error",
        data(){
          return {
            errMsg:''
          }
        },
      mounted(){
          this.errMsg = this.$route.params.errMsg
      }
    }
</script>

<style scoped>

</style>
