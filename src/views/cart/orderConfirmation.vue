<template>
  <div class="order-confirmation">
    <!-- <div class="hr-order-confirmation"></div> -->
    <!-- <div
      class="arror-left"
      @click="
        () => {
          this.$router.push({ path: '/cart' });
        }
      "
    >
      &#x2039;
    </div> -->
    <!-- Content -->
    <div class="order-confirmation-content" v-if="dataCart">
      <!-- Box Order Confirmation -->
      <div class="box-order-confirmation">
        <div class="d-flex-between name-product">
          <div class="title-box name">商品名</div>
          <!-- <div class="product">クリームパスタ、豚しゃぶポン酢和え、サラダ</div> -->
          <div class="product">{{ dataCart.goodsName }}</div>
        </div>
        <div class="price">
          <span class="fw-b"> {{ dataCart.goodsPrice | NumFormat }}円 </span>
          <span class="fs-16 fw-m">(税込)</span>
        </div>
        <div class="d-flex-between quantity">
          <div class="title-box quantity">数量</div>
          <div class="value">{{ dataCart.num }}</div>
        </div>
        <hr class="hr-box" />
        <div class="d-flex-between total">
          <div class="title-box">小計</div>
          <div class="value-total">
            <span class="fw-b">{{ totalCouponMoney | NumFormat }}円</span>
            <span class="fs-16 fw-m">(税込)</span>
          </div>
        </div>
        <!-- <div class="d-flex-between total" v-if="dataCart.valueStamp"> -->
        <div class="d-flex-between total" v-if="discount != 0">
          <div class="title-box">割引</div>
          <div class="value-total">
            -{{ discount | NumFormat }}円
            <span class="fs-16 fw-m">(税込)</span>
          </div>
        </div>
      </div>

      <!-- Coupon -->
      <!-- <div class="coupon-order">
        <div class="d-flex-between info-coupon">
          <div class="name">利用クーポン</div>
          <div class="text-coupon" v-if="dataCart.stampName">
            {{ dataCart.stampName }}
          </div>
          <div class="text-coupon" v-else>---</div>
        </div>
      </div> -->

      <!-- Payment method -->
      <div class="coupon-order">
        <div class="d-flex-between coupon-order_item">
          <div class="name fs-16 fw-m">お支払い方法</div>
          <div class="text-coupon fs-16 fw-m">
            <div v-if="dataCart.method_pay == 'credit3d2'">クレジットカード</div>
            <div v-if="dataCart.method_pay == 'paypay'">PayPay</div>
            <div v-if="dataCart.method_pay == 'linepay'">LINE Pay</div>
          </div>
        </div>
        <div class="d-flex-between coupon-order_item">
          <div class="name title fs-16 fw-m">受取先</div>
          <div class="text-coupon fs-16 fw-m">
            <div>{{ storeName }}</div>
          </div>
        </div>
      </div>

      <div class="coupon-hr"></div>

      <!-- Payment -->
      <div class="payment fw-m">
        <div class="d-flex-between">
          <div class="name fs-16">
            合計金額
            <!-- <span class="pl-8">(税込)</span> -->
          </div>
          <div class="text-payment">
            <!-- <span>{{ finalTotalMoney | NumFormat }}円</span> -->
            <span>{{ totalCouponMoney - discount | NumFormat }}円</span>
            <span class="unit fw-m">(税込)</span>
          </div>
        </div>
      </div>

      <!-- Btn Confirm Order -->
      <div class="error-order" id="mytext" v-if="checkOrder">
        <div v-html="messageError" class="contentMaximum"></div>
      </div>
      <div
        class="btn-orange-main btn-orange-main-border btn-confirm-order mt-6"
        :class="checkOrder ? 'border-input-disabled' : 'border-input'"
      >
        <el-button
          @click="showDialogConfirmProduct = true"
          :class="checkOrder ? 'btn-disable' : ''"
          :disabled="checkOrder"
          >注文を確定する</el-button
        >
        <div style="position: absolute; left: 0; bottom: - 50px; color: red; font-size: 14px; margin-top: 10px;">
          決済は9時までにお済ませください。<br />
          9時を過ぎると処理が行われず、購入が完了しません。
        </div>
      </div>
      <!-- Dialog Confirm Product Cart -->
      <div class="dialog-delete-product">
        <el-dialog
          v-model="showDialogConfirmProduct"
          width="90%"
          :show-close="false"
          top="30vh"
          center
        >
          <div class="text-confirm fw-m">
            キャンセルは配送当日の <br />午前９時までとなります
          </div>
          <div slot="footer">
            <el-button @click="confirmOrder()" :disabled="disabledButtonOrder" size="medium" type="uniqe">
              OK
            </el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <form
      :action="sbPaymentUrl"
      _target="receiver"
      ref="cgform"
      id="cgform"
      method="POST"
      accept-charset="Shift_JIS"
      onsubmit="document.charset='Shift_JIS'"
    >
      <input type="hidden" name="pay_method" :value="formData.pay_method" />
      <input type="hidden" name="merchant_id" :value="formData.merchant_id" />
      <input type="hidden" name="service_id" :value="formData.service_id" />
      <input type="hidden" name="cust_code" :value="formData.cust_code" />
      <input type="hidden" name="sps_cust_no" :value="formData.sps_cust_no" />
      <input
        type="hidden"
        name="sps_payment_no"
        :value="formData.sps_payment_no"
      />
      <input type="hidden" name="order_id" :value="formData.order_id" />
      <input type="hidden" name="item_id" :value="formData.item_id" />

      <input type="hidden" name="pay_item_id" :value="formData.pay_item_id" />
      <input type="hidden" name="item_name" :value="formData.item_name" />
      <input type="hidden" name="tax" :value="formData.tax" />

      <input type="hidden" name="amount" :value="formData.amount" />
      <input type="hidden" name="pay_type" :value="formData.pay_type" />

      <input
        type="hidden"
        name="auto_charge_type"
        :value="formData.auto_charge_type"
      />

      <input type="hidden" name="service_type" :value="formData.service_type" />

      <input type="hidden" name="div_settele" :value="formData.div_settele" />
      <input
        type="hidden"
        name="last_charge_month"
        :value="formData.last_charge_month"
      />
      <input type="hidden" name="camp_type" :value="formData.camp_type" />
      <input type="hidden" name="tracking_id" :value="formData.tracking_id" />
      <input
        type="hidden"
        name="terminal_type"
        :value="formData.terminal_type"
      />

      <input type="hidden" name="success_url" :value="formData.success_url" />
      <input type="hidden" name="cancel_url" :value="formData.cancel_url" />
      <input type="hidden" name="error_url" :value="formData.error_url" />

      <input type="hidden" name="pagecon_url" :value="formData.pagecon_url" />

      <input type="hidden" name="free1" :value="formData.free1" />

      <input type="hidden" name="free2" :value="formData.free2" />

      <input type="hidden" name="free3" :value="formData.free3" />
      <input type="hidden" name="free_csv" :value="formData.free_csv" />

      <input type="hidden" name="request_date" :value="formData.request_date" />
      <input type="hidden" name="limit_second" :value="formData.limit_second" />

      <input type="hidden" name="hashkey" :value="formData.hashkey" />
      <input type="hidden" name="sps_hashcode" :value="formData.sps_hashcode" />
      <input v-if="isCredit3D2" type="hidden" name="tds2infoToken" :value="formData.tds2infoToken" />
      <input v-if="isCredit3D2" type="hidden" name="tds2infoTokenKey" :value="formData.tds2infoTokenKey" />

      <input type="hidden" name="dtl_rowno" :value="OrderDetail.dtl_rowno" />
      <input
        type="hidden"
        name="dtl_item_id"
        :value="OrderDetail.dtl_item_id"
      />
      <input
        type="hidden"
        name="dtl_item_name"
        :value="OrderDetail.dtl_item_name"
      />
      <input
        type="hidden"
        name="dtl_item_count"
        :value="OrderDetail.dtl_item_count"
      />
      <input type="hidden" name="dtl_tax" :value="OrderDetail.dtl_tax" />
      <input type="hidden" name="dtl_amount" :value="OrderDetail.dtl_amount" />
      <input type="hidden" name="dtl_free1" :value="OrderDetail.dtl_free1" />
      <input type="hidden" name="dtl_free2" :value="OrderDetail.dtl_free2" />
      <input type="hidden" name="dtl_free3" :value="OrderDetail.dtl_free3" />
    </form>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions } from "pinia";
import { useCommonStore } from "@/stores/common";
export default {
  mounted() {
    this.getProductOrder();
  },
  data() {
    return {
      showDialogConfirmProduct: false,
      sbPaymentUrl: process.env.SB_PAYMENT_URL,
      dataCart: "",
      isSubmit: false,
      userInfo: {},
      goodsList: [],
      allMoney: 0,
      taxRate: "",
      cartGoods: {},
      payMethod: "",
      formData: {
        pay_method: "",
        merchant_id: "",
        service_id: "",
        cust_code: "",
        sps_cust_no: "",
        sps_payment_no: "",
        order_id: "",
        item_id: "T_0003",
        pay_item_id: "",
        item_name: "test",
        tax: "",
        amount: "1",
        pay_type: "0",
        auto_charge_type: "",
        service_type: "0",
        div_settele: "",
        last_charge_month: "",
        camp_type: "",
        tracking_id: "",
        terminal_type: "0",
        success_url: process.env.SB_SUCCESS_URL,
        error_url: process.env.SB_ERROR_URL,
        cancel_url: process.env.SB_CANCEL_URL,
        pagecon_url: process.env.SB_PAGECON_URL,
        free1: "",
        free2: "",
        free3: "",
        free_csv: "",
        free_csv_input: "",
        request_date: "",
        limit_second: "",
        hashkey: process.env.SB_HASH_KEY,
        sps_hashcode: "",
      },
      OrderDetail: {
        dtl_rowno: "",
        dtl_item_id: "",
        dtl_item_name: "",
        dtl_item_count: "",
        dtl_tax: "",
        dtl_amount: "",
        dtl_free1: "",
        dtl_free2: "",
        dtl_free3: "",
      },
      checkOrder: false,
      messageError: "",
      orderId: "",
      takeTime: "",
      takeDate: "",
      transConfirmNo: "",
      confirmVo: {},
      payMethod: "",
      allMoneyByPay: 0,
      payMethodName: "",
      storeName: sessionStorage.getItem("storeName"),
      goodsCouponUseNum: 0,
      toppingCouponUseNum: 0,
      totalCouponMoney: 0,
      totalToppingMoney: 0,
      allMoneyNoUseCoupon: 0,
      discount: "",
      stampId: "",
      finalTotalMoney: "",
      disabledButtonOrder: false,
      goodsId: '',
      goodsName: '',
      tds2infoToken: '',
      tds2infoTokenKey: '',
      // errorTimeOrder: false
    };
  },

  computed: {
    isCredit3D2 () {
      return this.formData.pay_method === 'credit3d2'
    }
  },

  methods: {
    ...mapActions(useCommonStore, ["setLoading"]),
    // handleCheckToShowDialogConfirmProduct() {
    //   const currentTime = moment().utcOffset("+09:00");
    //   const nineAM = moment().utcOffset("+09:00").set({ hour: 9, minute: 0, second: 0 });
    //   const thirteenPM = moment().utcOffset("+09:00").set({ hour: 13, minute: 0, second: 0 });

    //   if (currentTime.isAfter(nineAM) && currentTime.isBefore(thirteenPM)) {
    //     this.errorTimeOrder = true;
    //   } else {
    //     this.errorTimeOrder = false;
    //     this.showDialogConfirmProduct = true;
    //   }
    // },
    // Confirm Order
    confirmOrder() {
      let userIdData = ""
      const dataUserIdSession = localStorage.getItem("getTPartnerUser");
      //, JSON.stringify(res.data.userId)
      if (dataUserIdSession) {
        userIdData = JSON.parse(dataUserIdSession)
      }
      if (!userIdData) {
        this.$message.error("まだ会員情報が登録されていません。")
        this.$router.push("/registration")
        return
      }
      sessionStorage.setItem("cartGoods", JSON.stringify(this.dataCart));
      localStorage.setItem("cartGoods", JSON.stringify(this.dataCart));
      this.setLoading(true);
      this.disabledButtonOrder = true;
      setTimeout(() => {
        if (this.checkTime()) {
          if (liff.id != null && liff.isLoggedIn()) {
            var liffAccessToken = liff.getAccessToken();
            sessionStorage.setItem("liffAccessToken", liffAccessToken);
          }
          this.$post("/order", {
            // stampId: this.stampId,
            goodsOrderNum: this.dataCart.num,
            discountAmount: this.discount ? this.discount : null,
            originalAmount: this.totalCouponMoney,
            allMoney: Math.floor(this.totalCouponMoney - this.discount),
            openId: localStorage.getItem("openId"),
            storeId: localStorage.getItem("storeId"),
            payMethod: this.dataCart.method_pay,
            liffMsgAccessToken: sessionStorage.getItem("liffAccessToken"),
            goodsList: [JSON.parse(sessionStorage.getItem("cartGoods"))],
            sellDate: this.dataCart.sellDate,
          }).then((response) => {
            if (response.code === 200) {
              this.orderId = response.data.orderId;
              this.goodsId = response.data.goodsId;
              this.goodsName = response.data.goodsName;
              sessionStorage.setItem("orderId", this.orderId);
              sessionStorage.setItem(
                "transConfirmNo",
                response.data.transConfirmNo
              );
              if (Math.floor(this.totalCouponMoney - this.discount) == 0) {
                this.$router.push({ 
                  name: "order-completed",
                  query: {
                    transNo: this.orderId
                  }
                });
              } else {
                if (this.dataCart.pay_method === 'credit3d2') {
                  this.handleGenerateToken3DSecure()
                } else {
                  this.sbPayment(
                    this.orderId,
                    response.data.goodsId,
                    response.data.goodsName
                  );
                }
              }
            } else {
              this.checkNumber();
              this.showDialogConfirmProduct = false;
              this.disabledButtonOrder = false;
              // this.$message({
              //   message: response.msg,
              //   type: "error",
              //   dangerouslyUseHTMLString: true,
              // });
              this.setLoading(false);
            }
          }).catch((err) => {
            this.disabledButtonOrder = false;
            this.setLoading(false);
            this.$message.error(err.response.data.msg || "ERROR")
          });
        } else {
          this.setLoading(false);
          this.$router.push({ name: "order" });
          this.disabledButtonOrder = false;
        }
      }, 500);
    },
    handleGenerateToken3DSecure () {
      const object = {
        merchantId: process.env.SB_MERCHANT_ID,
        serviceId: process.env.SB_SERVICE_ID,
        billingLastName: '',
        billingFirstName: '',
        billingPostalCode: '',
        billingCity: '',
        billingAddress1: '',
        billingAddress2: '',
        billingAddress3: '',
        billingPhone: '',
        workPhone: '',
        shippingPostalCode: '',
        shippingCity: '',
        shippingAddress1: '',
        shippingAddress2: '',
        shippingAddress3: '',
        email: ''
      }
      com_sbps_system_tds2.generateToken(object, this.afterGenerateToken)
    },
    afterGenerateToken (response) {
      if (response.result === 'OK') {
        this.tds2infoToken = response.tokenResponse.tds2infoToken
        this.tds2infoTokenKey = response.tokenResponse.tds2infoTokenKey
        this.sbPayment(this.orderId, this.goodsId, this.goodsName)
      } else {
        this.$message.error('トークン取得に失敗しました。')
      }
    },
    sbPayment(transNo, goodsId, goodsName) {
      this.form = this.$refs.cgform;
      let sha1 = require("js-sha1");
      let Base64 = require("js-base64").Base64;
      if (this.dataCart.pay_method === 'credit3d2') {
        this.$set(this.formData, 'tds2infoToken', this.tds2infoToken)
        this.$set(this.formData, 'tds2infoTokenKey', this.tds2infoTokenKey)
      }
      this.$set(this.formData, "order_id", transNo);
      this.$set(this.formData, "item_id", goodsId);
      this.$set(this.formData, "item_name", goodsName);
      this.$set(this.formData, "cust_code", localStorage.getItem("openId"));
      this.$set(this.formData, "pay_method", this.dataCart.method_pay);
      this.$set(
        this.formData,
        "amount",
        Math.floor(this.totalCouponMoney - this.discount)
      );
      this.$set(
        this.formData,
        "request_date",
        moment().utcOffset("+09:00").format("YYYYMMDDHHmmss")
      );
      let storeData = localStorage.getItem("storeData");
      if (storeData) {
        storeData = JSON.parse(storeData);
        let storeId = localStorage.getItem("storeId");
        let merchantId = storeData.sbPaymentMerchantId;
        this.$set(this.formData, "merchant_id", process.env.SB_MERCHANT_ID);
        this.$set(this.formData, "service_id", process.env.SB_SERVICE_ID);
        // this.$set(
        //   this.formData,
        //   "hashkey",
        //   "2c77945fc5c4de6c3610dceda28126a81bca18be"
        // );
        this.$set(
          this.formData,
          "success_url",
          process.env.SB_SUCCESS_URL + storeId + "/" + transNo
        );
        this.$set(
          this.formData,
          "cancel_url",
          process.env.SB_CANCEL_URL + +storeId + "/" + transNo
        );
        this.$set(
          this.formData,
          "error_url",
          process.env.SB_ERROR_URL + storeId + "/" + transNo
        );
        this.$set(
          this.formData,
          "pagecon_url",
          process.env.SB_PAGECON_URL +
            storeId +
            "/" +
            this.dataCart.num +
            "/" +
            this.dataCart.sellDate
        );
      }
      var s1 = this.getOrderStr();
      this.$set(
        this.formData,
        "free_csv",
        Base64.encode(this.formData.free_csv_input, 1)
      );
      this.$set(this.formData, "sps_hashcode", sha1(s1));
      this.$forceUpdate();
      setTimeout(() => {
        let form = document.getElementById("cgform");
        form.submit();
        this.disabledButtonOrder = false;
        this.setLoading(false);
      }, 500);
    },
    getOrderStr() {
      var result =
        this.formData.pay_method +
        this.formData.merchant_id +
        this.formData.service_id +
        this.formData.cust_code +
        this.formData.sps_cust_no +
        this.formData.sps_payment_no +
        this.formData.order_id +
        this.formData.item_id +
        this.formData.pay_item_id +
        this.formData.item_name +
        this.formData.tax +
        this.formData.amount +
        this.formData.pay_type +
        this.formData.auto_charge_type +
        this.formData.service_type +
        this.formData.div_settele +
        this.formData.last_charge_month +
        this.formData.camp_type +
        this.formData.tracking_id +
        this.formData.terminal_type +
        this.formData.success_url +
        this.formData.cancel_url +
        this.formData.error_url +
        this.formData.pagecon_url +
        this.formData.free1 +
        this.formData.free2 +
        this.formData.free3 +
        this.formData.free_csv +
        this.getorderDetailStr() +
        this.formData.request_date +
        this.formData.limit_second +
        this.formData.hashkey;
      return result;
    },
    getorderDetailStr() {
      var result =
        this.OrderDetail.dtl_rowno +
        this.OrderDetail.dtl_item_id +
        this.OrderDetail.dtl_item_name +
        this.OrderDetail.dtl_item_count +
        this.OrderDetail.dtl_tax +
        this.OrderDetail.dtl_amount +
        this.OrderDetail.dtl_free1 +
        this.OrderDetail.dtl_free2 +
        this.OrderDetail.dtl_free3;
      return result;
    },
    // Get product order
    getProductOrder() {
      this.setLoading(false);
      this.dataCart = JSON.parse(sessionStorage.getItem("cartGoods"));
      if (this.dataCart) {
        this.checkNumber();
        this.storeDetail();
      }
    },

    storeDetail() {
      this.totalCouponMoney = this.dataCart.goodsPrice * this.dataCart.num;
      // if (this.dataCart.valueStamp) {
      //   const discount = this.dataCart.valueStamp;
      //   if (this.dataCart.typeStamp == "PERCENT") {
      //     // this.discount = this.totalCouponMoney * (discount / 100);
      //     this.finalTotalMoney = Math.floor(
      //       (this.totalCouponMoney * (100 - discount)) / 100
      //     );
      //     this.discount = this.totalCouponMoney - this.finalTotalMoney;
      //   } else if (this.dataCart.typeStamp == "MONEY") {
      //     this.discount = discount;
      //     this.finalTotalMoney = this.totalCouponMoney - discount;
      //   }
      //   // this.stampId = this.dataCart.stampId;
      // } else {
      //   this.finalTotalMoney = this.totalCouponMoney;
      // }
      let params = {
        storeId: localStorage.getItem("storeId"),
      };
      this.$post("/mo/sysMStore/storeDetail", params).then((response) => {
        if (response.code == 200) {
          if (response.data) {
            const discount = response.data.storeDiscount;
            this.discount = Math.round(this.totalCouponMoney * (discount / 100));
          }
        }
      });
    },

    checkNumber() {
      const dataCart = JSON.parse(sessionStorage.getItem("cartGoods"));
      const data = {
        dateOrder: moment().format("YYYY-MM-DD HH:mm:ss"),
        dateGoods: this.dataCart.sellDate,
        goodsNum: this.dataCart.num,
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
      const sellDate = moment().format("YYYY-MM-DD");
      if (hours > 0) {
        return this.dataCart.sellDate !== sellDate;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order-confirmation {
  margin-top: 58px;
  position: relative;
  .hr-order-confirmation {
    background: #ffe9b8;
    height: 7px;
  }
  .pl-8 {
    padding-left: 8px;
  }
  .fs-14 {
    font-size: 14px;
  }
  .fs-15 {
    font-size: 15px;
  }
  .arror-left {
    position: fixed;
    font-size: 50px;
    color: #3c0200;
    top: 72px;
    z-index: 100;
    left: 12px;
  }
  .error-order {
    left: 23px;
    margin-top: 8px;
    font-size: 15px;
    margin-left: 12px;
    margin-right: 12px;
  }
  .order-confirmation-content {
    padding: 0 12px;
    padding-top: 25px;
    .box-order-confirmation {
      background: #fff;
      border: 1px solid #d2d2d2;
      padding: 12px;
      font-size: 16px;
      .price {
        font-size: 25px;
        text-align: right;
        font-weight: bold;
        padding-top: 17px;
        padding-bottom: 17px;
      }
      .d-flex-between {
        margin-top: 10px;
      }
      .name-product {
        display: flex;
        align-items: baseline;
      }
      .hr-box {
        margin: 15px -12px;
        color: #d2d2d2;
      }
      .title-box {
        min-width: 75px;
      }
      .value-total {
        font-size: 25px;
        // font-weight: bold;
      }
      .value {
        font-weight: bold;
        margin-right: 10px;
      }
    }
    .coupon-order {
      font-size: 16px;
      margin: 17px 12px -4px 12px;
      .info-coupon {
        align-items: baseline;
        .text-coupon {
          width: 68%;
          text-align: right;
        }
      }
      &_item:not(:first-child) {
        margin-top: 10px;
      }
      &_item {
        align-items: start;
        .title {
          padding-top: 1px;
          min-width: 75px;
          justify-content: left !important;
        }
      }
    }
    // .coupon-order {
    //   font-size: 16px;
    //   margin: 17px 12px -4px 12px;
    //   .info-coupon {
    //     align-items: baseline;
    //     .text-coupon {
    //       width: 68%;
    //       text-align: right;
    //     }
    //   }
    // }

    .fs-16 {
      font-size: 16px;
    }
    .coupon-hr {
      background: #ffe9b8;
      height: 7px;
      margin: 17px 12px;
    }
    .payment {
      font-size: 16px;
      margin: 0 12px 36px;
      .text-payment {
        font-size: 32px;
        color: #dc143c;
        .unit {
          font-size: 16px;
        }
      }
    }
    .btn-confirm-order {
      position: relative;
      margin: 2px 12px 116px 12px;
      button {
        font-size: 17px;
      }
    }
  }
}
.text-confirm {
  color: #3c0200;
  font-size: 20px;
  margin: 20px 0;
  text-align: center;
}
::v-deep .el-dialog {
  background: #fffcee;
}
::v-deep .el-dialog__footer .el-button--uniqe {
  color: #fff;
  background-color: #ff7101;
  border-color: #c10230;
  border-radius: 0 0 6px 6px;
}
::v-deep .el-dialog__footer {
  width: 100%;
  font-size: 0;
  padding: 0;
}
::v-deep .el-dialog__footer .el-button--uniqe {
  width: 100%;
  border: 0;
  padding: 16px 20px;
}
</style>
