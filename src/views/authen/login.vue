<template>
  <div class="login">
    <div class="img-login">
      <img src="@/assets/images/0713_top_back.png" width="100%" />
    </div>
    <div class="btn-orange-main btn-login border-input">
      <el-button @click="register()">登　録</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    register() {
      if (localStorage.getItem("storeId")) {
        this.$router.push({ name: "new-delivery-address" });
      } else {
        this.$router.push({ name: "guidance-new-qr" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  .img-login {
    margin-left: -24px;
    margin-right: -24px;
  }
  .btn-login {
    margin-top: 10px;
    margin-bottom: 120px;
  }
}
</style>
