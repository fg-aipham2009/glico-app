<template>
  <div>
    <div class="order">
      <!-- body -->
      <!-- <div class="slide">
        <div class="slide-item-ac" v-if="categoryName">{{ categoryName }}</div>
        <div class="slide-item">サイドメニュー</div>
      </div> -->
      <!-- <div v-if="preventOrder" class="outStock">
        9：00〜13：00までは、強制的に注文を受付していません。
      </div> -->
      <div class="body" v-if="dataProduct">
        <div class="title fw-b pb-5">{{ today }}</div>
        <p class="font-yu-mincho fs21 pd-top-7 goodsName">
          {{ dataProduct.goodsName }}
        </p>
        <div class="img-product">
          <img :src="dataProduct.goodsImg" alt="" />
        </div>
        <div class="value mb17">
          <span class="value fs25 fw-b">
            {{ dataProduct.goodsPrice | NumFormat }}円
          </span>
          <span class="value fs16 fw-m">(税込）</span>
        </div>
        <div class="value-discount" v-if="discount != 0">
          <span>
            割引: -{{
              ((dataProduct.goodsPrice * this.discount) / 100) | NumFormat
            }}円
          </span>
        </div>
        <div class="error-order fw-b" v-if="openOrder">
          <div v-html="messageError" class="contentMaximum"></div>
        </div>
        <div
          class="btn-orange-main btn-orange-main-border btn-login mb-10 mt-6"
          :class="
            openOrder || preventOrder ? 'border-input-disabled' : 'border-input'
          "
        >
          <el-button
            :class="openOrder || preventOrder ? 'btn-disable' : ''"
            :disabled="openOrder || preventOrder"
            @click="openConfirmOrderDate()"
            class="btn"
            >オーダー画面へ</el-button
          >
        </div>
        <div v-if="preventOrder" class="outStock mb50 time-error">
          ただいまのお時間は注文時間外です。翌営業日のご注文は、13時〜受付いたします。
        </div>
      </div>
      <div v-else-if="outStock" class="outStock">
        現在は、一時的に注文を受け付けておりません。
      </div>
      <div v-else class="outStock">現在、オーダーを受け付けておりません。</div>
    </div>
    <!-- Dialog confirm order time-->
    <!-- <div class="dialog-confirm-product">
      <el-dialog
        v-model="showConfirmOrderTime"
        width="90%"
        :show-close="false"
        center
        top="30vh"
      >
        <p class="text-confirm fw-m">注文受付時間<br />前日13時〜当日9時まで</p>
        <template #footer>
          <el-button @click="confirmOrderTime()" size="default">OK </el-button>
        </template>
      </el-dialog>
    </div> -->
  </div>
</template>
<script>
import moment from "moment-timezone";
import "moment/locale/ja";
export default {
  data() {
    return {
      dataProduct: "",
      discount: "",
      today: "",
      categoryName: "",
      outStock: false,
      openOrder: false,
      messageError: "",
      preventOrder: sessionStorage.getItem("preventOrder"),
      showConfirmOrderTime: false,
    };
  },

  beforeUnmount() {
    this.$parent.changeTabBarCss(0);
  },

  mounted() {
    this.$parent.changeTabBarCss(1);
    this.checkTime();
    this.checkPreventOrder();
    this.getDiscount();
  },
  methods: {
    getDiscount() {
      let params = {
        storeId: localStorage.getItem("storeId"),
      };
      this.$post("/mo/sysMStore/storeDetail", params).then((response) => {
        if (response.code == 200) {
          if (response.data) {
            this.discount = response.data.storeDiscount;
          }
        }
      });
    },
    orderProcedure(sellDate) {
      const dataCart = JSON.parse(sessionStorage.getItem("cartGoods"));
      const data = {
        dateOrder: moment().format("YYYY-MM-DD HH:mm:ss"),
        dateGoods: sellDate,
        goodsNum: 1,
        storeId: localStorage.getItem("storeId"),
      };
      this.$post("/transactionMaximum/check", data).then((response) => {
        if (response.code == 0) {
          this.openOrder = false;
        } else {
          this.openOrder = true;
          this.messageError = response.message;
        }
      });
    },
    checkTime() {
      const startTime = moment().format("DD-MM-YYYY HH:mm");
      const endTime = moment("08:59", "HH:mm").format("DD-MM-YYYY HH:mm");
      const hours = moment
        .duration(
          moment(startTime, "DD-MM-YYYY HH:mm").diff(
            moment(endTime, "DD-MM-YYYY HH:mm")
          )
        )
        .asHours();
      let sellDate = moment().format("YYYY-MM-DD");
      if (hours > 0) {
        sellDate = moment().add(1, "days").format("YYYY-MM-DD");
      }
      this.checkHoliday(sellDate);
    },

    // Confirm order time
    openConfirmOrderDate() {
      // this.showConfirmOrderTime = true;
      this.openDetail();
    },
    // confirmOrderTime() {
    //   this.showConfirmOrderTime = false;
    //   this.openDetail();
    // },
    checkPreventOrder() {
      moment.locale("ja");
      const preventTime = moment(new Date()).tz("Asia/Tokyo").format("HH:mm");
      const preventArr = preventTime.split(":");
      if (preventArr[0] > 8 && preventArr[0] < 13) {
        this.preventOrder = true;
        sessionStorage.setItem("preventOrder", true);
      } else {
        if (sessionStorage.getItem("preventOrder")) {
          sessionStorage.removeItem("preventOrder");
        }
      }
    },
    checkHoliday(sellDate) {
      console.log(sellDate, "sellDate");
      const param = {
        storeId: localStorage.getItem("storeId"),
        date: sellDate,
      };
      this.$post("/storeBusinessTime/flag", param).then((res) => {
        this.outStock = false;
        this.orderProcedure(sellDate);
        console.log(res);
        if (res.code == 0) {
          this.getProduct(sellDate, true);
        } else if (res.code == 999) {
          sellDate = moment(sellDate).add(1, "days").format("YYYY-MM-DD");
          this.checkHoliday(sellDate);
        } else if (res.code == 998) {
          this.outStock = true;
          this.getProduct(sellDate, false);
        }
      });
    },
    getProduct(sellDate, check) {
      let param = {
        storeId: localStorage.getItem("storeId"),
        sellDate: sellDate,
      };
      this.$post("/goods/goodsByDate", param).then((res) => {
        console.log(res);
        this.categoryName = res.data[0].goodsCategoryName;
        if (check) {
          this.dataProduct = res.data[0];
          localStorage.setItem("sellDateCheck", this.dataProduct.sellDate);
          moment.locale("ja");
          this.today = moment(this.dataProduct.sellDate).format(
            "M 月 D 日 (ddd)"
          );
        }
      });
    },
    openDetail(item) {
      this.checkPreventOrder();

      if (this.preventOrder) {
        this.$router.go(this.$router.currentRoute);
      }
      if (this.dataProduct) {
        localStorage.setItem("goodsId", this.dataProduct.goodsId);
      }
      sessionStorage.setItem("openOrder", true);
      this.$router.push({
        name: "productDetails",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.order {
  margin-top: 25px;
  overflow: auto;
  min-height: calc(100vh - 297px);
  margin-bottom: 91px;
  .value-discount {
    margin: -10px 0 20px;
  }
  .outStock {
    text-align: center;
    font-weight: 400px;
    font-size: 14px;
    color: red;
  }

  .error-order {
    line-height: 24px;
    margin-top: 0px;
    font-size: 15px;
    position: initial;
    word-wrap: break-word;
  }
  .slide {
    margin-top: 22px;
    background: #ffe9b8;
    height: 49px;
    display: flex;
    align-items: center;
    width: 100%;
    overflow-x: auto;
    .slide-item {
      background: #fffcee;
      border-radius: 19px;
      padding: 5px;
      margin-left: 20px;
      word-break: keep-all;
    }
    .slide-item-ac {
      background: #3c0200;
      color: white;
      border-radius: 19px;
      padding: 5px;
      margin: 0 24px;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 3px 18px 6px;
    }
  }
  .body {
    margin-left: 24px;
    margin-right: 24px;
    .title {
      border-bottom: 1px solid;
      // padding: 6px 0 3px;
    }

    .img-product {
      position: relative;
      margin-top: 10px;
      margin-left: -20px;
      margin-right: -20px;
      img {
        width: 100%;
        max-height: 300px;
      }
      .content-img {
        position: absolute;
        bottom: 8px;
        left: 20px;
        font-size: 11px;
      }
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 17px;
    }
    .mb50 {
      margin-bottom: 50px;
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
      }
    }
    .mb5 {
      margin-bottom: 5px;
    }
    .mb17 {
      margin-bottom: 17px;
    }
    .row {
      display: flex;
      align-items: baseline;
    }
    .fs12 {
      font-size: 12px;
    }
    .fs16 {
      font-size: 16px;
    }
    .fs21 {
      font-size: 21px;
    }
    .fs22 {
      font-size: 22px;
    }
    .fs25 {
      font-size: 25px;
    }
    .fs24 {
      font-size: 24px;
      line-height: 26px;
    }
    .goodsName {
      font-weight: 600;
    }
    .pd-top-7 {
      padding-top: 7px;
    }
  }
}
.text-confirm {
  color: #3c0200;
  font-size: 20px;
  margin: 20px 0;
  text-align: center;
}
:deep(.el-dialog) {
  background: #fffcee;
}
:deep(.el-dialog__footer .el-button--default) {
  color: #fff;
  background-color: #ff7101;
  border-color: #a8a8a8;
  border-radius: 0 0 6px 6px;
}
:deep(.el-dialog__footer) {
  width: 100%;
  font-size: 0;
  padding: 0;
}
:deep(.el-dialog__footer .el-button) {
  width: 100%;
  border: 0;
  padding: 16px 20px;
}
</style>
