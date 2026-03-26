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
    <tab-bar cssTitle="2" />
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
    var that = this;
    console.log("-- remove cart!");
    sessionStorage.removeItem("cartGoods");
    that.transNo = sessionStorage.getItem("orderId");
    this.cancelPayment(that.transNo);
  },

  methods: {
    cancelPayment(params) {
      var that = this;
      //构建支付参数
      let transNo = params;

      let requestUrl = "/line/notify/cancel/" + "?transactionId=" + transNo;
      console.log("Trying Confirm API.");
      this.$get(requestUrl, params).then((response) => {
        if (response.code != 200) {
          console.log("failed to register data" + response.code);
        }
        console.log("Confirm API has been succeeded!");
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
