<template>
  <div class="cart-page" :class="{ 'mt-no-product': !isProduct }">
    <!-- Have Products -->
    <div class="have-products" v-if="isProduct">
      <!-- Product -->
      <div class="heading">
        <div class="title-cart">ご注文の商品</div>
      </div>
      <!-- List Product -->
      <div class="list-product">
        <div class="product-name">
          <div class="title">商品名</div>
          <div class="product">{{ dataCart.goodsName }}</div>
        </div>
        <div class="price">
          <span class="fw-b">{{ dataCart.goodsPrice | NumFormat }}円</span>
          <span class="ps-14">(税込)</span>
        </div>
        <div
          v-if="discount != 0"
          class="value-discount"
          style="
            text-align: right;
            width: 100%;
            display: flex;
            justify-content: space-between;
          "
         >
          <div>割引:</div>
          <div style="margin-right: 50px">
             -{{ ((dataCart.goodsPrice * this.discount) / 100) | NumFormat }}円
          </div>
        </div>
        <div class="quantity">
          <div class="title">数量</div>
          <div class="value">
            <el-select v-model="numberProducts" class="custom-select select">
              <el-option
                v-for="i in 10"
                :key="i"
                :label="i"
                :value="i"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="error-order" id="mytext" v-if="checkOrder">
          <div v-html="messageError" class="contentMaximum"></div>
        </div>
        <!-- Delete -->
        <div class="delete-product">
          <span @click="deleteProduct()">削除</span>
        </div>
      </div>

      <div v-if="(listCoupon || []).length > 0">
        <!-- Coupon -->
        <div class="heading">
          <div class="title-cart">クーポン</div>
        </div>

        <!-- List Coupon -->
        <!-- <div v-for="(coupon, index) in listCoupon" :key="coupon.stampId">
          <div class="list-coupon">
            <div class="coupon-item">
              <div class="coupon-haeder">
                <div class="coupon-name">{{ coupon.stampName }}</div>
                <div class="coupon-btn">
                  <el-button
                    class="btn-choose-coupon"
                    @click="chooseCoupon(coupon, coupon.stampId, index)"
                    >適用する</el-button
                  >
                </div>
              </div>
              <div class="coupon-conten">
                <p class="note">備考：他クーポン併用不可</p>
                <p class="expiry">有効期限：{{ coupon.endDate }}</p>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <!-- <div class="list-coupon">
        <div class="coupon-item">
          <div class="coupon-haeder">
            <div class="coupon-name">{{ infoStampCard.stampName }}</div>
            <div class="coupon-btn">
              <el-button
                class="btn-choose-coupon"
                @click="
                  chooseCoupon(infoStampCard, infoStampCard.stampSettingId)
                "
                >適用する</el-button
              >
            </div>
          </div>
          <div class="coupon-conten">
            <p class="note">備考：{{ coupon.note }}</p>
            <p class="note">備考：他クーポン併用不可</p>
            <p class="expiry">有効期限：{{ infoStampCard.dueDate }}</p>
          </div>
        </div>
      </div> -->

      <!-- Date and time of receipt -->
      <div class="heading">
        <div class="title-cart">お届け予定時刻</div>
      </div>
      <div class="time-receipt fw-b text-time" v-if="storeId == '1'">
        <span class="mb5">{{ createTime }}</span
        ><span>11 : 45 頃～12 : 45 頃まで</span>
      </div>
      <div class="time-receipt fw-b text-time" v-else>
        <span>{{ createTime }}</span>
        <span>11：00 〜 12：00</span>
      </div>
      <div class="heading-fix">
        <div class="title-cart">決済方法</div>
      </div>
      <!-- <div class="heading" v-else>
        <div class="title-cart">決済方法</div>
      </div> -->
      <div class="time-receipt">
        <label class="radio">
          <div
            class="credit-label"
            :class="method_pay == 'credit3d2' ? 'activate-pay' : ''"
            @click="pay('credit3d2')"
          >
            <img class="img" src="@/assets/images/creditcard.svg" />
          </div>
        </label>
        <label class="radio">
          <div
            class="credit-label"
            :class="method_pay == 'paypay' ? 'activate-pay' : ''"
            @click="pay('paypay')"
          >
            <img class="img" src="@/assets/images/paypay.svg" />
          </div>
        </label>
        <!-- <label class="radio">
          <div
            class="credit-label"
            :class="method_pay == 'linepay' ? 'activate-pay' : ''"
            @click="pay('linepay')"
          >
            <img class="img" src="@/assets/images/linepay.svg" />
          </div>
        </label> -->
      </div>

      <!-- To order procedure -->
      <div
        class="btn-cart btn-orange-main"
        @click="orderProcedure()"
        :class="checkOrder ? 'border-input-disabled' : 'border-input'"
      >
        <el-button
          :class="checkOrder ? 'btn-disable' : ''"
          :disabled="checkOrder"
          >注文手続きへ</el-button
        >
      </div>

      <!-- Dialog Delete Product Cart -->
      <div class="dialog-delete-product">
        <el-dialog
          v-model="showDialogDeleteProduct"
          width="90%"
          :show-close="false"
          top="30vh"
          center
        >
          <div slot="footer">
            <div class="text-delete fw-m">商品を削除しますか？</div>

            <el-button @click="confirmDeleteProduct()" size="medium">
              はい
            </el-button>
            <el-button
              type="primary"
              @click="showDialogDeleteProduct = false"
              size="medium"
            >
              いいえ
            </el-button>
          </div>
        </el-dialog>
      </div>
    </div>

    <!-- No Product -->
    <div class="no-product" v-else>
      <div class="heading">
        <div class="title-cart">ご注文の商品</div>
      </div>
      <div class="title-no-product">カートに商品はありません。</div>
      <div class="btn-no-product fw-m" @click="openOrder()">
        ＋ メニューを追加する
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  mounted() {
    this.storeId = localStorage.getItem("storeId");
    this.getProductOrder();
    // this.getInfoStampCard();
    // this.getListStampCard();
    this.$parent.changeTabBarCss(2);
    this.$parent.changCart();
    this.getDiscount();
  },
  data() {
    return {
      method_pay: "credit3d2",
      infoStampCardSetting: {},
      maximumStampCard: "",
      stampSettingId: "",
      isProduct: true,
      showDialogDeleteProduct: false,

      dataCart: {
        num: 1,
        sellDate: "",
        method_pay: "credit3d2",
      },
      numberProducts: 1,
      createTime: "",
      checkOrder: false,
      messageError: "",
      storeId: "",
      disableBtn: false,
      couponChoose: {},
      dataCoupon: null,
      listCoupon: [],
      discount: "",
      // listCoupon: [
      //   {
      //     id: 1,
      //     point: 10,
      //     discount: 10,
      //     content: "初回10%OFFクーポン",
      //     note: "他クーポン併用不可",
      //     expiry: "2022/2/31",
      //   },
      //   {
      //     id: 2,
      //     point: 20,
      //     discount: 15,
      //     content: "初回15%OFFクーポン",
      //     note: "他クーポン併用不可",
      //     expiry: "2022/4/31",
      //   },
      //   {
      //     id: 3,
      //     point: 30,
      //     discount: 20,
      //     content: "初回20%OFFクーポン",
      //     note: "他クーポン併用不可",
      //     expiry: "2022/6/31",
      //   },
      //   {
      //     id: 4,
      //     point: 40,
      //     discount: 25,
      //     content: "初回25%OFFクーポン",
      //     note: "他クーポン併用不可",
      //     expiry: "2022/8/31",
      //   },
      //   {
      //     id: 5,
      //     point: 50,
      //     discount: 30,
      //     content: "初回30%OFFクーポン",
      //     note: "他クーポン併用不可",
      //     expiry: "2022/10/31",
      //   },
      // ],
    };
  },

  destroyed() {
    this.$parent.changeTabBarCss(0);
  },

  watch: {
    numberProducts() {
      this.checkNumber();
    },
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
    // getInfoStampCard() {
    //   let param = {};
    //   this.$get("/memberStampCard/stampCardSetting/getInfo", param).then(
    //     (res) => {
    //       console.log(res);
    //       if (res.code == 200) {
    //         console.log(res, "res info StampCard");
    //         this.infoStampCardSetting = res.data;
    //         this.maximumStampCard = this.infoStampCardSetting.maximumStampCard;
    //         this.stampSettingId = this.infoStampCardSetting.stampSettingId;
    //       }
    //     }
    //   );
    // },

    // getListStampCard() {
    //   let param = {
    //     memberId: localStorage.getItem("openId"),
    //   };
    //   this.$get("/memberStampCard/getList", param).then((response) => {
    //     if (response.code == 200) {
    //       const listStampCard = response.data;
    //       console.log(listStampCard, "listStampCard");
    //       listStampCard.map((e) => {
    //         if (e.isFinished == true && e.isExpired == false) {
    //           this.listCoupon.push(e);
    //         }
    //       });
    //       this.listCoupon.map((item) => {
    //         item.startDate = moment(item.startDate, "YYYY-MM-DD").format(
    //           "YYYY/MM/DD"
    //         );
    //         item.endDate = moment(item.endDate, "YYYY-MM-DD").format(
    //           "YYYY/MM/DD"
    //         );
    //       });
    //     }
    //   });
    // },

    // chooseCoupon(coupon, stampId, index) {
    //   console.log(coupon);
    //   this.disableBtn = !this.disableBtn;
    //   var listBtnCoupon = document.querySelectorAll(".btn-choose-coupon");
    //   for (let i = 0; i < listBtnCoupon.length; i++) {
    //     if (i == index) {
    //       if (this.disableBtn) {
    //         listBtnCoupon[i].classList.add("choose");
    //         this.couponChoose = coupon;
    //       } else {
    //         listBtnCoupon[i].classList.remove("choose");
    //         this.couponChoose = {};
    //       }
    //     } else {
    //       if (this.disableBtn) {
    //         listBtnCoupon[i].classList.add("is-disabled");
    //         listBtnCoupon[i].setAttribute("disabled", "disabled");
    //       } else {
    //         listBtnCoupon[i].classList.remove("is-disabled");
    //         listBtnCoupon[i].removeAttribute("disabled");
    //       }
    //     }
    //   }
    // },
    pay(value) {
      this.method_pay = value;
    },
    checkNumber() {
      const dataCart = JSON.parse(sessionStorage.getItem("cartGoods"));
      const data = {
        dateOrder: moment().format("YYYY-MM-DD HH:mm:ss"),
        dateGoods: dataCart ? dataCart.sellDate : "",
        goodsNum: this.numberProducts,
        storeId: localStorage.getItem("storeId"),
      };
      this.$post("/transactionMaximum/check", data).then((response) => {
        if (response.code == 0) {
          this.checkOrder = false;
        } else {
          this.checkOrder = true;
          this.messageError = response.message;
        }
      });
    },
    // checkExpiredCoupon() {
    //   this.dataCoupon = this.couponChoose;
    //   console.log(this.dataCoupon, "datacoupon");
    //   let param = {
    //     stampCardId: this.dataCoupon.stampId,
    //   };
    //   this.$post("/memberStampCard/checkExpired", param).then((res) => {
    //     if (res.code == 200) {
    //       console.log(res, "res");
    //       if (res.data == true) {
    //         this.$message.error("こちらのクーポンはご利用できません。");
    //       } else {
    //         if (!this.checkOrder) {
    //           this.dataCart.num = this.numberProducts
    //             ? Number(this.numberProducts)
    //             : 1;
    //           this.dataCart.method_pay = this.method_pay;
    //           this.dataCart.stampId = this.dataCoupon
    //             ? this.dataCoupon.stampId
    //             : null;
    //           this.dataCart.typeStamp = this.dataCoupon
    //             ? this.dataCoupon.typeStamp
    //             : null;
    //           this.dataCart.valueStamp = this.dataCoupon
    //             ? this.dataCoupon.valueStamp
    //             : null;
    //           this.dataCart.stampName = this.dataCoupon
    //             ? this.dataCoupon.stampName
    //             : null;
    //           this.dataCart.isExpired = this.dataCoupon ? true : false;
    //           this.dataCart.stampSettingId = this.stampSettingId;
    //           sessionStorage.setItem(
    //             "cartGoods",
    //             JSON.stringify(this.dataCart)
    //           );
    //           this.$router.push({ name: "order-confirmation" });
    //         }
    //       }
    //     }
    //   });
    // },
    // To Order Procedure
    orderProcedure() {
      // if (this.disableBtn) {
      //   this.checkExpiredCoupon();
      // } else {
      //   this.dataCoupon = null;
      //   this.dataCart.stampId = this.dataCoupon
      //     ? this.dataCoupon.stampId
      //     : null;
      //   this.dataCart.typeStamp = this.dataCoupon
      //     ? this.dataCoupon.typeStamp
      //     : null;
      //   this.dataCart.valueStamp = this.dataCoupon
      //     ? this.dataCoupon.valueStamp
      //     : null;
      //   this.dataCart.stampName = this.dataCoupon
      //     ? this.dataCoupon.stampName
      //     : null;
      //   this.dataCart.isExpired = this.dataCoupon ? true : false;
      //   this.dataCart.stampSettingId = this.stampSettingId;
      //   sessionStorage.setItem("cartGoods", JSON.stringify(this.dataCart));
      //   this.$router.push({ name: "order-confirmation" });
      // }
      if (!this.checkOrder) {
        this.dataCart.num = this.numberProducts
          ? Number(this.numberProducts)
          : 1;
        this.dataCart.method_pay = this.method_pay;
        // if (this.disableBtn) {
        //   this.dataCoupon = this.couponChoose;
        // } else {
        //   this.dataCoupon = null;
        // }
        // this.dataCart.stampId = this.dataCoupon
        //   ? this.dataCoupon.stampId
        //   : null;
        // this.dataCart.typeStamp = this.dataCoupon
        //   ? this.dataCoupon.typeStamp
        //   : null;
        // this.dataCart.valueStamp = this.dataCoupon
        //   ? this.dataCoupon.valueStamp
        //   : null;
        // this.dataCart.stampName = this.dataCoupon
        //   ? this.dataCoupon.stampName
        //   : null;
        // this.dataCart.isExpired = this.dataCoupon ? true : false;
        // this.dataCart.stampSettingId = this.stampSettingId;
        sessionStorage.setItem("cartGoods", JSON.stringify(this.dataCart));
        localStorage.setItem('cartGoods', JSON.stringify(this.dataCart))
        this.$router.push({ name: "order-confirmation" });
      }
    },

    openOrder() {
      this.$router.push({ name: "order" });
    },

    // Show Dialog Delete Product
    deleteProduct() {
      this.showDialogDeleteProduct = true;
    },
    // Confirm delete product
    confirmDeleteProduct() {
      // TODO: Call Api confirm delete product
      // console.log("Call Api confirm delete product...");

      this.isProduct = false;
      sessionStorage.removeItem("cartGoods");
      this.$parent.changCart();
    },
    // Get product order
    getProductOrder() {
      this.dataCart = JSON.parse(sessionStorage.getItem("cartGoods"));
      if (!this.dataCart) {
        this.isProduct = false;
      }
      if (this.dataCart) {
        this.method_pay = this.dataCart.method_pay
          ? this.dataCart.method_pay
          : "credit3d2";
        this.numberProducts = this.dataCart.num ? this.dataCart.num : 1;
        this.createTime = moment(this.dataCart.sellDate).format(
          "YYYY 年 M 月 D 日"
        );
        this.checkNumber();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.activate-pay {
  border: 1px solid #dc1400 !important;
  border-radius: 5px;
}
.credit-label {
  border: 1px solid #fffcee;
}
.ps-14 {
  font-size: 14px;
}
.error-order {
  color: #dc1400;
  font-size: 15px;
  margin-top: 17px;
  position: inherit;
  text-align: end;
}
.cart-page {
  margin-top: 102px;
  padding: 0 24px;
  font-size: 16px;
  .heading {
    background: #ffe9b8;
    margin-top: 26px;
    margin-left: -24px;
    margin-right: -24px;
    .title-cart {
      padding: 6px 24px;
      font-size: 18px;
    }
  }
  .heading-fix {
    background: #ffe9b8;
    margin-top: 10px;
    margin-left: -24px;
    margin-right: -24px;
    .title-cart {
      padding: 6px 24px;
      font-size: 18px;
    }
  }
  .text-time {
    flex-direction: column;
    text-align: center;
    margin: 12px 0px !important;
  }

  .list-product {
    margin-top: 20px;
    .title {
      width: 100px;
    }
    .product-name {
      .product {
        width: 70%;
        text-align: start;
      }
    }
    .product-name,
    .quantity,
    .coupon-haeder {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }
    .quantity {
      margin-top: 30px;
      .value {
        text-align: end;
        .select {
          max-width: 80px;
          height: 30px;
        }
      }
    }
    .price {
      font-size: 25px;
      text-align: right;
      margin-top: 22px;
    }
    .delete-product {
      text-align: end;
      margin: 15px auto;
      font-size: 15px;
      font-weight: bold;
    }
    .delete-product span {
      border-bottom: 2px solid #3c0200;
    }
  }
  .list-coupon {
    .coupon-haeder {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .coupon-name {
        font-size: 16px;
        color: #3c0200;
        width: 66%;
      }
      .coupon-btn {
        height: 33px;
        width: 121px;
        .el-button {
          height: 100%;
          width: 100%;
          padding-top: 8px !important;
        }
      }
      .btn-choose-coupon {
        border-color: #3c0200;
        color: #3c0200;
        font-size: 16px !important;
      }
      .el-button.choose:focus,
      .el-button.choose:hover {
        background-color: #ffe9b8;
      }
      .choose {
        background-color: #ffe9b8;
        font-weight: 600;
      }
      .el-button:focus,
      .el-button:hover {
        background-color: #ffffff;
      }
      .btn-choose-coupon.is-disabled {
        border-color: #c0c4cc !important;
        color: #c0c4cc !important;
      }
    }
    .coupon-conten {
      margin-right: 125px;
      color: #af9a69;
      font-size: 14px;
    }
  }

  .time-receipt {
    margin: 30px -24px;
    display: flex;
    font-size: 19px;
    justify-content: center;
  }
  .btn-cart {
    margin: 50px auto 100px;
    button {
      font-size: 17px !important;
    }
  }
  .text-delete {
    color: #000;
    font-size: 20px;
    margin: 40px auto 70px;
  }

  .no-product {
    .title-no-product {
      font-size: 16px;
      font-weight: 400;
      margin: 31px auto 41px;
    }
    .btn-no-product {
      font-size: 17px;
      border: 1px solid #3c0200;
      height: 41px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.mt-no-product {
  height: calc(100vh - 382px);
}

::v-deep .el-dialog {
  background: #fffcee;
}
::v-deep .el-dialog__footer .el-button--primary {
  color: #fff;
  background-color: #3c0200;
  border-color: #c10230;
  border-radius: 0 0 6px 0;
}
::v-deep .el-dialog__footer .el-button--uniqe {
  color: #fff;
  background-color: #ff7101;
  border-color: #c10230;
  border-radius: 0 0 6px 6px;
}
::v-deep .el-dialog__footer .el-button--default {
  color: #fff;
  background-color: #ff7101;
  border-color: #a8a8a8;
  border-radius: 0 0 0 6px;
}
::v-deep .el-dialog__footer {
  padding: 0;
}
::v-deep .el-dialog__footer {
  width: 100%;
  font-size: 0;
}
::v-deep .el-dialog__footer .el-button + .el-button {
  margin-left: 0;
}
::v-deep .el-dialog__footer .el-button {
  width: 50%;
  border: 0;
  padding: 16px 20px;
}
::v-deep .el-dialog__footer .el-button--uniqe {
  width: 100%;
  border: 0;
  padding: 16px 20px;
}
</style>
