<template>
  <div>
    <!-- <HeaderBar page-name="注文履歴詳細" /> -->
    <div class="container-order-detail">
      <!-- <div class="arror-left" @click="back()">
        <i class="el-icon-arrow-left"></i>
      </div> -->
      <div class="mypage">
        <div class="order-detail">
          <div class="orderName mb-25">
            <img
              v-if="userImg"
              :src="userImg"
              alt=""
              width="40px"
              class="mr-8 border-radius-20"
            />
            <img
              v-else
              src="@/assets/images/icon-account.png"
              alt=""
              width="31px"
              class="mr-8"
            />
            <div>{{ userName }} さん</div>
          </div>
          <!-- 注文情報 -->
          <div class="detailttl">注文情報</div>
          <ul class="detaillist">
            <li>
              <span class="w-1">注文番号 :</span>M{{ transData.transConfirmNo }}
            </li>
            <li><span class="w-1">注文日 :</span>{{ transData.takeDate }}</li>
            <li>
              <span class="w-1">金額 :</span>
              {{ transData.transPayAmount | NumFormat }}円(税込)
            </li>
            <li>
              <span class="w-1">ステータス :</span>
              {{ transData.exportStatus | exportStatus }}
            </li>
            <li class="d-flex align-items-start">
              <span style="min-width: 70px;">受取先：</span>
              <span>
                {{ transData.storeName }}
              </span>
            </li>
          </ul>

          <!-- 注文内容詳細 -->
          <template v-if="transactionGoods">
            <div class="detailttl mb-15">注文内容詳細</div>
            <div class="text-center">
              <img class="detailimg" :src="transactionGoods.goodsImg" alt="" />
            </div>
            <el-row class="detaillist">
              <el-col :span="10" class="mb-39">商品名</el-col>
              <el-col :span="14" class="mb-39">
                {{ transactionGoods.goodsName }}
              </el-col>

              <el-col :span="24" class="text-end mb-15">
                <span class="fs-25 fw-bold">
                  {{
                    (transactionGoods.goodsPayAmount /
                      transactionGoods.goodsNum)
                      | NumFormat
                  }}円
                </span>
                <span class="fs-14 fw-m"> (税込) </span>
              </el-col>
              <el-col :span="10" class="mb-15">数量</el-col>
              <el-col :span="14" class="text-end fw-bold mb-15">{{
                transactionGoods.goodsNum
              }}</el-col>
              <div class="btn-confirm mb-39 fw-m" @click="openDetailProduct()">
                商品の情報を見る
              </div>
            </el-row>
          </template>

          <!--Coupon-->
          <!-- <div class="detailttl">利用クーポン</div>
          <div class="couponbox">
            <span v-if="infoCoupon != null">{{ infoCoupon.stampName }}</span>
            <span v-else>なし</span>
          </div> -->

          <!-- お支払方法 -->
          <div class="detailttl">お支払方法</div>
          <div class="couponbox">{{ payMethodImage }}</div>
          <div class="couponbox mb-15">
            <!-- <div class="mb-39">クレジットカード</div> -->
            <div
              class="btn-confirm mb-39 fw-normal"
              @click="cancelOrder()"
              v-if="transData.exportStatus == 1 && checkDate()"
            >
              注文をキャンセルする
            </div>
            <div class="form-confirm" v-if="transData.exportStatus != 3">
              <el-row>
                <el-col :span="20">
                  <p class="text-center">
                    召しあがっていただいた<br />
                    商品について「アンケート」の<br />
                    ご協力をお願いします。
                  </p>
                  <!-- <p class="text-center"></p> -->
                </el-col>
                <el-col :span="4">
                  <img
                    src="@/assets/images/doctor.png"
                    alt=""
                    width="34px"
                    class="doctor"
                  />
                </el-col>
              </el-row>
              <div class="btn-confirm-order mt-9">
                <el-button
                  type="primary"
                  @click="routerQuetionaire"
                  class="fs-18 contentBtn"
                >
                  <p class="m-4">アンケートに答える</p>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="openConfirm"
      width="90%"
      :show-close="false"
      center
      top="30vh"
    >
      <div class="dialog-content text-center fs-20 fw-m color">
        <p>商品をキャンセルしますか?</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmOrder()" size="medium"> はい </el-button>
        <el-button type="primary" @click="openConfirm = false" size="medium">
          いいえ
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "orderDetail",
  data() {
    return {
      openConfirm: false,
      userName: "",
      userImg: "",
      transData: {
        transConfirmNo: "",
        takeDate: "",
        transPayAmount: "",
        exportStatus: "",
        goodsImg: "",
        liffAccessToken: "",
        goodsId: "",
        transactionGoodsVos: [],
      },
      userinfo: {},
      payMethodImage: "",
      // infoCoupon: "",
      transactionGoods: "",
      cancelResultDialogVisible: ""
    };
  },

  mounted() {
    this.$parent.changeTabBarCss(3);
    this.getDetaiOrder();
    this.getUserAuthInfo();
  },
  methods: {
    checkDate() {
      if (this.transactionGoods.sellDate) {
        const sellDate = moment(
          this.transactionGoods.sellDate,
          "YYYY-MM-DD"
        ).format("YYYY-MM-DD 08:59");
        const today = moment().format("YYYY-MM-DD HH:mm");
        if (sellDate > today) {
          return true;
        } else {
          return false;
        }
      }
    },

    back() {
      this.$router.push({
        name: "order-history",
      });
    },

    getUser() {
      let data = JSON.parse(sessionStorage.getItem("userinfo"));
      if (data) {
        this.userName = data.nickName;
        this.userImg = data.avatarUrl;
      }
    },

    getDetaiOrder() {
      const transNo = sessionStorage.getItem("transNo");
      this.$get(
        "/transaction/getTransHistoryByTransNo/" +
          transNo +
          "/" +
          localStorage.getItem("storeId")
      ).then((res) => {
        this.transData = res;
        this.transactionGoods = res.transactionGoodsVos[0];
        // this.getCouponUsed();
        this.checkDate();
        this.getPayMethod(res.payMethod);
      });
    },
    // getCouponUsed() {
    //   const transNo = sessionStorage.getItem("transNo");
    //   let param = {
    //     transNo: transNo,
    //   };
    //   this.$get("/memberStampCard/getStampCardByTransNo", param).then((res) => {
    //     if (res.code == 200) {
    //       this.infoCoupon = res.data;
    //     }
    //   });
    // },
    getPayMethod(payMethod) {
      switch (payMethod) {
        case "credit":
        case "credit3d2":
          this.payMethodImage = "クレジットカード";
          break;
        case "paypay":
          this.payMethodImage = "PayPay";
          break;
        case "linepay":
          this.payMethodImage = "LINE Pay";
          break;
      }
    },
    cancelOrder() {
      this.openConfirm = true;
    },
    confirmOrder() {
      this.openConfirm = false;
      const params = {
        transNo: sessionStorage.getItem("transNo"),
        storeId: localStorage.getItem("storeId"),
        templateName: "auto_cancel_d_ja",
        liffAccessToken: this.transData.liffMsgAccessToken,
        liffNotificationToken: this.transData.liffNotificationToken,
      };
      this.$post("/cancel", params).then((response) => {
        let responseCode = response.code;
        if (responseCode == 200) {
          this.$message.success("正常にキャンセル処理が行われました");
          this.getDetaiOrder();
        } else {
          this.$message.error(response.msg);
        }
      });
    },

    routerQuetionaire() {
      this.$router.push({
        name: "menu-questionnaire1",
      });
    },

    openDetailProduct() {
      localStorage.setItem("goodsId", this.transactionGoods.goodsId);
      sessionStorage.setItem("openOrder", false);
      sessionStorage.setItem("exportStatus", this.transData.exportStatus);
      this.$router.push({
        name: "productDetails",
      });
    },

    // 获取授权人信息
    getUserAuthInfo() {
      var openId = localStorage.getItem("openId");
      var params = {
        openId: openId,
      };
      this.$post("/mypage/getUserAuthInfo", params)
        .then((response) => {
          if ((response.code = 200)) {
            if (response.data) {
              this.userinfo = {
                // 授权用户ID
                userinfoId: response.data.userinfoId,
                // 店铺ID
                storeId: response.data.storeId,
                // 用户OPENID
                openId: response.data.openId,
                // 用户昵称
                nickName: response.data.nickName,
                // 性别
                gender: response.data.gender,
                // LINE头像URL
                avatarUrl: response.data.avatarUrl,
                // User ID
                userId: response.data.userId,
              };
              //存储用户信息到sessionStorage
              sessionStorage.setItem("userinfo", JSON.stringify(this.userinfo));
              this.getUser();
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

<style scoped lang="scss">
.container-order-detail {
  margin: 54px 0 0px;
  padding-top: 0;
}
.border-radius-20 {
  border-radius: 20px;
}
.order-detail {
  .form-confirm {
    background: #ffe9b8;
    padding: 30px 17px 17px 17px;
    .el-button {
      width: 100%;
      font-size: 17px;
      background: #ff7101;
      border-radius: 8px;
    }
    .doctor {
      position: absolute;
      right: -1px;
      top: -6px;
    }
    .btn-confirm-order {
      margin: 0px 40px 20px 40px;
      padding: 1px;
      border-radius: 10px !important;
      border: 2px solid #ff7101 !important;
      // min-width: 216px;
      .fs-18 {
        font-size: 18px;
      }
      .contentBtn {
        white-space: inherit !important;
      }
    }
  }
  .orderName {
    font-size: 18px;
    margin: 0px -12px 0px -12px;
    background: #3c0200;
    height: 57px;
    color: white;
    display: flex;
    align-items: center;
    padding: 12px;
    .mr-8 {
      margin-right: 8px;
    }
  }
  .m-4 {
    margin: 4px 0px;
  }
  .mt-9 {
    margin-top: 9px !important;
  }
  .mb-15 {
    margin-bottom: 15px;
  }
  .mb-25 {
    margin-bottom: 25px;
  }
  .ml-33 {
    margin-left: 33px;
  }
  .mb-39 {
    margin-bottom: 39px;
  }
  .text-center {
    text-align: center;
  }
  .text-end {
    text-align: end;
  }
  .fw-bold {
    font-weight: bold;
  }
  .fw-normal {
    font-weight: normal;
  }
}

.fs-20 {
  font-size: 20px !important;
}
.fs-25 {
  font-size: 25px !important;
}
.color {
  color: #3c0200;
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

::v-deep .dialog-footer .el-button--primary {
  color: #fff;
  background-color: #3c0200;
  border-color: #c10230;
  border-radius: 0 0 6px 0;
}
::v-deep .dialog-footer .el-button--default {
  color: #fff;
  background-color: #ff7101;
  border-color: #a8a8a8;
  border-radius: 0 0 0 6px;
}
::v-deep .el-dialog__footer {
  padding: 0;
}
::v-deep .dialog-footer {
  width: 100%;
  font-size: 0;
  .is-disabled {
    background: #717171 !important;
  }
}
::v-deep .dialog-footer .el-button + .el-button {
  margin-left: 0;
}
::v-deep .dialog-footer .el-button {
  width: 50%;
  border: 0;
  padding: 16px 20px;
}
::v-deep .el-dialog__body {
  background: #fffcee !important;
  padding: 70px 30px !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
