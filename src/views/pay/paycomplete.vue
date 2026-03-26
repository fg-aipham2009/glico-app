<template>
  <div>
    <HeaderBar :store-name="storeName" page-name="注文完了" />
    <div class="container" style="margin: 126px 0 70px">
      <div class="orderpage">
        <div class="complete-ttl">注文が完了しました</div>
        <div class="complete-info">
          <div style="font-size: 14px">
            LINEに注文番号、受取時間を送信しました。<br />
          </div>
          <div style="font-size: 14px">
            LINE Service Messagesをご確認ください。
          </div>
        </div>
        <div class="complete-text">
          ご指定の受付時間に商品をお受け取りください。
          受取り際、注文確認番号をスタッフにお伝えください。
        </div>
        <div class="common-w">
          <div class="com-addtrade">
            <router-link :to="{ path: '/member/member-coupon' }"
              >スタンプカードを確認する <span>></span></router-link
            >
          </div>
        </div>
      </div>
      <div class="mb70"></div>
    </div>
    <tab-bar cssTitle="2" />
  </div>
</template>

<script>
export default {
  name: "paycomplete",

  data() {
    return {
      goodsList: [],
      allMoney: 0,
      userInfo: {},
      takeTime: "",
      takeDate: "",
      transConfirmNo: "",
      orderId: "",
      confirmVo: {},
      taxClass: process.env.TAX_CLASS,
      goodsName: "",
      goodsId: "",
      liffAccessToken: "",
      liffId: "",
      storeName: sessionStorage.getItem("storeName"),
    };
  },
  created() {
    window.addEventListener("beforeunload", this.handlerClose);
    window.addEventListener("visibilitychange", function () {
      setTimeout(() => {
        console.log("Came here visibilitychange");
      }, 30000);
    });
  },
  beforeDestroy() {},
  mounted() {
    var that = this;
    that.$router.afterEach(() => {
      window.scrollTo(0, 0);
    });
    that.takeDate = sessionStorage.getItem("takeDate");
    if (!that.takeDate) {
      that.takeDate = localStorage.getItem("takeDate");
    }
    that.takeTime = sessionStorage.getItem("takeTime");
    if (!that.takeTime) {
      that.takeTime = localStorage.getItem("takeTime");
    }
    that.transConfirmNo = sessionStorage.getItem("transConfirmNo");
    if (!that.transConfirmNo) {
      that.transConfirmNo = localStorage.getItem("transConfirmNo");
    }
    sessionStorage.removeItem("cartGoods");
  },
  methods: {
    handlerClose: function () {
      console.log("remove cartgood");
      sessionStorage.removeItem("cartGoods");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.complete-msg-pay-money {
  color: Red;
}
</style>
