<template>
  <div>
    <HeaderBar page-name="注文履歴" page-name-left-btn-router="/orderhistory" />
    <div class="container" style="margin: 98px 0 70px; padding-top: 0">
      <div class="mypage">
        <div class="orderdetail">
          <div class="detailttl">注文情報</div>
          <ul class="detaillist">
            <li><span class="w-1">店舗名</span>：{{ transData.storeName }}</li>
            <li>
              <span class="w-1">注文番号</span>：{{ transData.transConfirmNo }}
            </li>
            <li><span class="w-1">注文日</span>：{{ transData.takeDate }}</li>
            <li>
              <span class="w-1">金額</span>：￥
              {{ transData.transPayAmount | NumFormat }}
            </li>
            <li>
              <span class="w-1" style="width: 100px">受注ステータス</span>：
              {{ transData.exportStatus | exportStatus }}
            </li>
          </ul>
          <div class="detailttl">注文商品詳細</div>
          <div
            v-for="(transGoods, index) in data"
            :key="transGoods.transGoodsId"
          >
            <div class="detailimg" align="center">
              <img :src="transGoods.goodsImg" alt="" width="160px" />
            </div>
            <ul class="detaillist">
              <li>
                <span class="w-2">商品名</span>
                <p>：{{ transGoods.goodsName }}</p>
              </li>
              <li v-if="transGoods.sizeOptionName">
                <span class="w-2">サイズ</span>
                <p>
                  ：{{ transGoods.sizeOptionName
                  }}<span class="fw-b fr"
                    >￥{{ transGoods.sizeOptionPrice | NumFormat }}</span
                  >
                </p>
              </li>
              <li v-if="transGoods.sugarOptionName">
                <span class="w-2">甘さ</span>
                <p>
                  ：{{ transGoods.sugarOptionName
                  }}<span
                    class="fw-b fr"
                    v-if="transGoods.sugarOptionPrice > 0"
                    >{{ transGoods.sugarOptionPrice | NumFormat }}</span
                  >
                </p>
              </li>
              <li v-if="transGoods.iceOptionName">
                <span class="w-2">氷の量</span>
                <p>
                  ：{{ transGoods.iceOptionName
                  }}<span class="fw-b fr" v-if="transGoods.iceOptionPrice > 0"
                    >￥{{ transGoods.iceOptionPrice | NumFormat }}</span
                  >
                </p>
              </li>
              <div
                v-for="(item, index) in transGoods.transGoodsOptionList"
                :key="index"
              >
                <li>
                  <span class="w-2">トッピング</span>
                  <p>
                    ：{{ item.selectOptionName
                    }}<span class="fw-b fr"
                      >￥{{ item.selectOptionPrice | NumFormat }}</span
                    >
                  </p>
                </li>
              </div>
              <li>
                <span class="w-2">数量</span>：{{ transGoods.goodsNum }}
                <span class="fw-b fr" v-if="!transGoods.sizeOptionName"
                  >￥{{ transGoods.goodsOriginAmount | NumFormat }}</span
                >
              </li>
              <div
                v-if="
                  stopFlag == '1' ||
                  isPeriodTime == '0' ||
                  transGoods.orderFlag == 1
                "
                class="btn-round-disabled btn-grey mt10"
              >
                <img
                  src="@/assets/images/icon-2.svg"
                  alt=""
                />&nbsp;もう一度注文する
              </div>
              <div
                v-else
                class="btn-round btn-red mt10"
                @click="selectGoodInfo(transGoods.goodsId)"
              >
                <img
                  src="@/assets/images/icon-2.svg"
                  alt=""
                />&nbsp;もう一度注文する
              </div>
            </ul>
          </div>
          <div class="detailprice">
            <div class="total">
              合計<span>￥{{ transPayAmountNoTax | NumFormat }}</span>
            </div>
            <ul>
              <li>
                お支払い金額<span style="margin-right: 1px"
                  >￥{{ transData.transPayAmount | NumFormat }}</span
                >
              </li>
            </ul>
          </div>
          <div class="detailttl">利用クーポン</div>
          <div class="couponbox">
            <ul>
              <li v-if="drinks != 0">
                【クーポン】<span>{{ drinks }}枚 ドリンクサービス</span>
              </li>
              <li v-if="sideDish != 0">
                【クーポン】<span>{{ sideDish }}枚 トッピングサービス</span>
              </li>
            </ul>
          </div>
          <div class="detailttl">お支払方法</div>
          <!-- <div class="couponbox"><img :src="payMethodImage" alt="" /></div> -->
          <!-- <div v-for=""></div> -->
          {{ payMethod }}
        </div>
      </div>
    </div>
    <tab-bar cssTitle="3" />
    <el-dialog
      v-model="dialogVisible"
      width="90%"
      :close-on-click-modal="false"
      :show-close="false"
      class="dialog-css"
      center
    >
      <p class="dialog-context-title">注文をキャンセルします</p>
      <p class="dialog-context">この注文をキャンセルします</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogVisible = false"
          >キャンセル</el-button
        >
        <el-button type="danger" @click="cancelOrder()">OK</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-model="cancelResultDialogVisible"
      width="90%"
      :close-on-click-modal="false"
      class="dialog-css"
      center
    >
      <p class="dialog-context">該当注文はお店からキャンセル済みです。</p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "orderconfirm",
  data() {
    return {
      data: {},
      userId: null,
      transData: {},
      userName: "",
      userImg: "",
      drinks: 0,
      sideDish: 0,
      tax: null,
      payMethodImage: null,
      transPayAmountNoTax: 0,
      dialogVisible: false,
      cancelResultDialogVisible: false,
      isPeriodTime: "",
      stopFlag: "",
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      this.$common.getUserAuthInfoForMyPage(this);
      if (this.$route.query && this.$route.query.transNo) {
        sessionStorage.setItem("transNo", this.$route.query.transNo);
      }

      let transNo = sessionStorage.getItem("transNo");
      if (transNo) {
        this.getTransactionList(transNo);
      }
    },
    reloadData() {
      this.dialogVisible = false;
      this.cancelResultDialogVisible = false;
      this.loadData();
    },
    cancelOrder() {
      let that = this;
      let liffAccessToken = sessionStorage.getItem("liffAccessToken");
      if (!liffAccessToken) {
        if (liff.id != null && liff.isLoggedIn()) {
          liffAccessToken = liff.getAccessToken();
          sessionStorage.setItem("liffAccessToken", liffAccessToken);
        }
      }
      if (liffAccessToken) {
        let params = {
          transNo: sessionStorage.getItem("transNo"),
          storeId: localStorage.getItem("storeId"),
          templateName: "ordernoti_d_o_ja",
          liffAccessToken: liffAccessToken,
        };
        this.$post("/cancel", params).then((response) => {
          let responseCode = response.code;
          if (responseCode == 4001) {
            that.dialogVisible = false;
            that.cancelResultDialogVisible = true;
          }
          that.reloadData();
        });
      }
    },
    getTransactionList(transNo) {
      let that = this;
      if (transNo) {
        that
          .$get(
            "/transaction/getTransHistoryByTransNo/" +
              transNo +
              "/" +
              localStorage.getItem("storeId")
          )
          .then((res) => {
            that.drinks = 0;
            that.sideDish = 0;
            if (res) {
              that.getPayMethod(res.payMethod);
              that.transData = res;
              that.getIsPeriodTime(that.transData.storeId);
              if (that.transData && that.transData.transPayAmount > 0) {
                that.tax =
                  that.transData.transPayAmount -
                  (that.transData.transOriginAmount -
                    that.transData.totalToppingMoney -
                    that.transData.totalCouponMoney);
                that.transPayAmountNoTax =
                  that.transData.transOriginAmount -
                  (that.transData.totalCouponMoney +
                    that.transData.totalToppingMoney);
              } else {
                that.tax = 0;
                that.transPayAmountNoTax = 0;
              }
              if (res.transactionGoodsVos) {
                for (let i = 0; i < res.transactionGoodsVos.length; i++) {
                  let goodsData = res.transactionGoodsVos[i];
                  if (
                    goodsData.sugarOptionPrice == null ||
                    goodsData.sugarOptionPrice == ""
                  ) {
                    goodsData.sugarOptionPrice = "Free";
                  } else {
                    goodsData.sugarOptionPrice = goodsData.sugarOptionPrice;
                  }
                  if (
                    goodsData.iceOptionPrice == null ||
                    goodsData.iceOptionPrice == ""
                  ) {
                    goodsData.iceOptionPrice = "Free";
                  } else {
                    goodsData.iceOptionPrice = goodsData.iceOptionPrice;
                  }
                  if (
                    goodsData.couponNum != null &&
                    goodsData.couponNum != ""
                  ) {
                    that.drinks += parseInt(goodsData.couponNum);
                  }
                  for (
                    let j = 0;
                    j < goodsData.transGoodsOptionList.length;
                    j++
                  ) {
                    if (
                      goodsData.transGoodsOptionList[j].couponNum != null &&
                      goodsData.transGoodsOptionList[j].couponNum != ""
                    ) {
                      that.sideDish += parseInt(
                        goodsData.transGoodsOptionList[j].couponNum
                      );
                    }
                  }
                }

                that.data = res.transactionGoodsVos;
              }
            }
          });
      }
    },

    selectGoodInfo(val) {
      sessionStorage.removeItem("goodsId");
      localStorage.setItem("goodsId", val);
      let storeId = localStorage.getItem("storeId");
      let storeName = sessionStorage.getItem("storeName");

      sessionStorage.setItem(
        "storeId",
        storeId ? storeId : this.transData.storeId
      );
      sessionStorage.setItem(
        "storeName",
        storeName ? storeName : this.transData.storeName
      );

      this.$router.push({
        name: "goodsDetailInfo",
      });
    },

    getPayMethod(payMethod) {
      if (payMethod == "credit") {
        this.payMethodImage = require("@/assets/images/credit.svg");
      } else if (payMethod == "paypay") {
        this.payMethodImage = require("@/assets/images/paypay.svg");
      } else if (payMethod == "linepay") {
        this.payMethodImage = require("@/assets/images/linepay.svg");
      } else if (payMethod == "merpay") {
        this.payMethodImage = require("@/assets/images/merpay.svg");
      } else if (payMethod == "5") {
        this.payMethodImage = require("@/assets/images/googlepay.svg");
      } else if (payMethod == "alipay") {
        this.payMethodImage = require("@/assets/images/alipay.svg");
      } else if (payMethod == "unionpay") {
        this.payMethodImage = require("@/assets/images/unionpay.svg");
      }
    },
    getIsPeriodTime(orderStoreId) {
      let storeId = localStorage.getItem("storeId");
      let param = {
        storeId: storeId ? storeId : orderStoreId,
      };
      this.$post("/goodsCategory/goodsCategoryIsShow", param)
        .then((response) => {
          if ((response.code = 200)) {
            if (response.data) {
              this.isPeriodTime = response.data[0].isPeriodTime;
              this.stopFlag = response.data[0].stopFlag;
            }
          } else {
            // request fail
            console.log("request fail", response.code, response.msg);
          }
        })
        .catch((err) => {
          // request error
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.pagename {
  text-align: center;
  color: #c10230;
  line-height: 50px;
  font-size: 18px;
  position: relative;
  border-bottom: 1px solid #eae9e8;
}

.pagename .arrleft {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
}

.detailimg {
  text-align: center;
  padding: 10px 0;
  width: 100%;
}

.dialog-context-title {
  color: #c10230;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
}

.dialog-context {
  text-align: center;
}

:deep(.dialog-css .dialog-footer .el-button--danger) {
  color: #fff;
  background-color: #c10230;
  border-color: #c10230;
  border-radius: 0 0 6px 0;
}
:deep(.dialog-css .dialog-footer .el-button--info) {
  color: #fff;
  background-color: #a8a8a8;
  border-color: #a8a8a8;
  border-radius: 0 0 0 6px;
}
:deep(.dialog-css .el-dialog__footer) {
  padding: 0;
}
:deep(.dialog-css .dialog-footer) {
  width: 100%;
  font-size: 0;
}
:deep(.dialog-css .dialog-footer .el-button + .el-button) {
  margin-left: 0;
}
:deep(.dialog-css .dialog-footer .el-button) {
  width: 50%;
  border: 0;
  padding: 16px 20px;
}
</style>
