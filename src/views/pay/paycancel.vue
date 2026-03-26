<template>
  <div>
    <HeaderBar :store-name="storeName" page-name="注文失敗" />
    <div class="container" style="margin: 126px 0 70px">
      <div class="orderpage">
        <div class="complete-ttl">注文が失敗しました</div>
        <div class="common-w">
          <div class="common-btn" @click="goHome()">ホームに戻る</div>
        </div>
      </div>
      <div class="mb70"></div>
    </div>
    <tab-bar :cssTitle="2" />
  </div>
</template>

<script>
export default {
  name: "paycancel",
  data() {
    return {
      storeName: sessionStorage.getItem("storeName"),
    };
  },
  mounted() {
    sessionStorage.removeItem("cartGoods");
    const transNo = sessionStorage.getItem("orderId");
    this.cancelPayment(transNo);
  },

  methods: {
    cancelPayment(transNo) {
      if (!transNo) return;
      const requestUrl = "/line/notify/cancel/?transactionId=" + transNo;
      this.$get(requestUrl, {})
        .then((response) => {
          if (response.code != 200 && response.code !== "200") {
            console.log("failed to register data", response.code);
          }
        })
        .catch((err) => {
          this.$message.error(err.response?.data?.msg || "ERROR");
        });
    },
    goHome() {
      if (localStorage.getItem("storeId")) {
        this.$router.push({ path: "/goodsCategory" });
      } else {
        this.$router.push({ path: "/home" });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.common-w {
  padding: 0 12px 20px;
  flex: 1;
  margin-top: 20px;
}
</style>
