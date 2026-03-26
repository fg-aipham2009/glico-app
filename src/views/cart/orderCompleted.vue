<template>
  <div class="order-completed">
    <div class="hearder-order-completed">
      <div class="title">注文番号</div>
    </div>
    <div class="text-center id-order fw-m">M{{ tran_no }}</div>
    <div class="hearder-order-completed">
      <div class="title">お届け予定時刻</div>
    </div>
    <div class="time fw-b text-time" v-if="storeId == '1'">
      <span class="mb-5">{{ sellDate }}　</span>
      <span>11 : 45 頃～12 : 45 頃まで</span>
    </div>
    <div class="time fw-b text-time" v-else>
      <span class="mb-5">{{ sellDate }}</span> <span>11：00 〜 12：00 </span>
    </div>
    <div class="pick-up mb-58">指定の受付時間に商品をお受け取りください</div>

    <!-- Btn Check Stamp Card -->
    <!-- <div class="btn-check-stamp-card" @click="goToStampCards">
      スタンプカードを確認する
    </div> -->

    <!-- Notice -->
    <div class="notice" v-if="dataProduct">
      <div class="hearder-order-completed mt-0">
        <div class="notice-title">
          【お知らせ】次営業日のメニューはこちらです
        </div>
        <div class="box-notice" @click.prevent="openDetailProduct">
          <div class="header-notice fw-b">{{ today }}</div>
          <hr class="hr-notice pd-12" />
          <el-row class="mb-17 product-next">
            <el-col :span="12">
              <div class="img-product">
                <img :src="dataProduct.goodsImg" alt="" />
              </div>
            </el-col>
            <el-col :span="12">
              <p class="font-yu-mincho fs-16 goodsName">
                {{ dataProduct.goodsName }}
              </p>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!-- Dialog Complete order -->
    <div class="dialog-complete-order">
      <el-dialog
        v-model="showDialogCompleteOrder"
        width="90%"
        :show-close="false"
        top="30vh"
        center
      >
        <template #footer>
          <div class="text-complete-order">
            キャンセルは配送当日の <br />
            午前9時までとなります
          </div>

          <el-button @click="showDialogCompleteOrder = false" size="default">
            はい
          </el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  mounted() {
    document.title = "注文完了";
    this.transNoQuery = this.$route.query.transNo
    this.storeId = localStorage.getItem("storeId");
    const data = JSON.parse(localStorage.getItem("cartGoods"));
    let sellDate = moment(data.sellDate, "YYYY-MM-DD")
      .add(1, "days")
      .format("YYYY-MM-DD");
    this.getCompleted();
    this.checkHoliday(sellDate);
    // this.tran_no = sessionStorage.getItem("orderId");
    sessionStorage.removeItem("cartGoods");
    localStorage.removeItem("cartGoods")
    this.getTranNo();
    this.$parent.changCart();
  },
  // destroyed() {
  //   sessionStorage.removeItem("cartGoods");
  // },
  methods: {
    // getInfoStampCard() {
    //   const data = JSON.parse(sessionStorage.getItem("cartGoods"));
    //   console.log(data, "data");
    //   if (data.stampId) {
    //     this.stampIdCoupon = data.stampId;
    //     console.log(this.stampIdCoupon, "stampIdCoupon");
    //   }
    //   if (data) {
    //     let param = {};
    //     this.$get("/memberStampCard/stampCardSetting/getInfo", param).then(
    //       (res) => {
    //         if (res.code == 200) {
    //           this.infoStampCardSetting = res.data;
    //           this.stampSettingId = this.infoStampCardSetting.stampSettingId;
    //           this.getListStampCard(this.stampSettingId, this.stampIdCoupon);
    //         }
    //       }
    //     );
    //   }
    // },
    // async attendancePoint(stampSettingId, stampNumUpdate) {
    //   var params = {
    //     memberId: localStorage.getItem("openId"),
    //     // transNo: localStorage.getItem("transNo"),
    //     stampCardSettingId: stampSettingId,
    //   };
    //   await this.$post("/memberStampCard/addStampCard", params)
    //     .then((res) => {
    //       if (res.code == 200) {
    //         this.$message.success(res.data);
    //         if (stampNumUpdate === 0) {
    //           this.updateFirstPointForNewUser(stampSettingId);
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       if (err.response.status == 400) {
    //         this.$message.error("すべてのスタンプカードを獲得しました!");
    //       }
    //     });
    // },
    // getListStampCard(stampSettingId, stampIdCoupon) {
    //   let param = {
    //     memberId: localStorage.getItem("openId"),
    //   };
    //   this.$get("/memberStampCard/getList", param).then((response) => {
    //     if (response.code == 200) {
    //       const listStampCard = response.data;
    //       if (listStampCard.length == 0) {
    //         this.attendancePoint(
    //           stampSettingId,
    //           this.initialFirstPointForNewUser
    //         );
    //       } else {
    //         listStampCard.map((e) => {
    //           if (e.isFinished == false) {
    //             this.stampCardInfo = e;
    //             this.stampCardId = this.stampCardInfo.stampId;
    //             this.stampNum = this.stampCardInfo.stampNum;
    //             this.totalPoint = this.stampCardInfo.totalPoint;
    //             this.updateStampCard(
    //               this.stampNum,
    //               this.stampCardId,
    //               this.stampCardInfo.memberId,
    //               this.totalPoint,
    //               stampSettingId,
    //               stampIdCoupon
    //             );
    //           }
    //           if (
    //             stampIdCoupon != null &&
    //             e.stampId == stampIdCoupon &&
    //             e.stampNum == e.totalPoint
    //           ) {
    //             console.log("runheear");
    //             this.updateStampCardUsedCoupon(
    //               e.stampNum,
    //               e.memberId,
    //               e.totalPoint,
    //               stampSettingId,
    //               stampIdCoupon
    //             );
    //           }
    //         });
    //       }
    //     }
    //   });
    // },
    // updateFirstPointForNewUser(stampSettingId) {
    //   let param = {
    //     memberId: localStorage.getItem("openId"),
    //   };
    //   this.$get("/memberStampCard/getList", param).then((response) => {
    //     if (response.code == 200) {
    //       const listStampCard = response.data;
    //       listStampCard.map((e) => {
    //         if (e.isFinished == false) {
    //           this.stampCardInfo = e;
    //           this.stampCardId = this.stampCardInfo.stampId;
    //           this.stampNum = this.stampCardInfo.stampNum;
    //           this.totalPoint = this.stampCardInfo.totalPoint;
    //           this.updateStampCard(
    //             this.stampNum,
    //             this.stampCardId,
    //             this.stampCardInfo.memberId,
    //             this.totalPoint,
    //             stampSettingId
    //           );
    //         }
    //       });
    //     }
    //   });
    // },
    // updateStampCard(
    //   stampNum,
    //   stampCardId,
    //   memberId,
    //   totalPoint,
    //   stampSettingId
    // ) {
    //   this.stampNumUpdate = Number(stampNum) + 1;
    //   let params = {
    //     memberId: memberId,
    //     stampNum: this.stampNumUpdate,
    //     stampCardId: stampCardId,
    //     stampCardSettingId: stampSettingId,
    //   };
    //   this.$put("/memberStampCard/updateStampCard", params).then((res) => {
    //     console.log(res);
    //     if (res.code == 200) {
    //       this.$message.success("スタンプカード更新成功！");
    //       if (this.stampNumUpdate === totalPoint) {
    //         this.attendancePoint(stampSettingId, this.stampNumUpdate);
    //       }
    //     }
    //   });
    // },

    // updateStampCardUsedCoupon(
    //   stampNum,
    //   memberId,
    //   totalPoint,
    //   stampSettingId,
    //   stampIdCoupon
    // ) {
    //   const transNo = sessionStorage.getItem("orderId");
    //   this.stampNumUpdate = Number(stampNum) + 1;
    //   if (stampIdCoupon != null) {
    //     this.isExpired = true;
    //   } else {
    //     this.isExpired = false;
    //   }
    //   let params = {
    //     transNo: transNo,
    //     memberId: memberId,
    //     stampNum: stampNum,
    //     stampCardId: stampIdCoupon,
    //     stampCardSettingId: stampSettingId,
    //     isExpire: this.isExpired,
    //   };
    //   console.log(params, "paramsUsedCoupon");
    //   this.$put("/memberStampCard/updateStampCard", params).then((res) => {
    //     console.log(res);
    //     if (res.code == 200) {
    //       this.$message.success("スタンプカード更新成功！");
    //     }
    //   });
    // },
    // goToStampCards() {
    //   this.$router.push({ name: "stamp-cards" });
    // },
    openDetailProduct() {
      sessionStorage.setItem("openOrder", false);
      sessionStorage.setItem("orderComplete", true);
      this.$router.push({
        name: "productDetails",
      });
    },
    getTranNo() {
      const url =
        "transaction/getTransByTransNo/" + this.transNoQuery;
      this.$get(url).then((response) => {
        this.tran_no = response.transConfirmNo;
      });
    },
    getCompleted() {
      this.dataCompleted = JSON.parse(localStorage.getItem("cartGoods"));
      this.sellDate = moment(this.dataCompleted.sellDate || "").format(
        "YYYY 年 M 月 D 日"
      );
    },
    checkHoliday(sellDate) {
      const param = {
        storeId: localStorage.getItem("storeId"),
        date: sellDate,
      };
      this.$post("/storeBusinessTime/flag", param).then((res) => {
        this.outStock = false;
        if (res.code == 0) {
          this.getProduct(sellDate, true);
        } else if (res.code == 999) {
          sellDate = moment(sellDate).add(1, "days").format("YYYY-MM-DD");
          this.checkHoliday(sellDate);
        }
      });
    },
    getProduct(sellDate) {
      let param = {
        storeId: localStorage.getItem("storeId"),
        sellDate: sellDate,
      };
      this.$post("/goods/goodsByDate", param).then((res) => {
        if ((res.data || []).length !== 0) {
          this.dataProduct = res.data[0];
          moment.locale("ja");
          this.today = moment(this.dataProduct.sellDate).format(
            "M 月 D 日 (ddd)"
          );
          localStorage.setItem("goodsId", this.dataProduct.goodsId);
        }
      });
    },
  },
  data() {
    return {
      transNoQuery: "",
      showDialogCompleteOrder: false,
      dataCompleted: "",
      sellDate: "",
      dataProduct: "",
      today: "",
      tran_no: "",
      storeId: "",
      // stampCardInfo: {},
      // stampNum: "",
      // stampNumUpdate: "",
      // stampSettingId: "",
      // stampCardId: "",
      // memberId: "",
      // initialFirstPointForNewUser: 0,
      // totalPoint: "",
      // stampIdCoupon: "",
      // isExpired: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.mb-58 {
  margin-bottom: 58px;
}
.order-completed {
  margin-top: 25px;
  .hearder-order-completed {
    background: #ffe9b8;
    margin: 11px auto;
    padding: 0 12px;
    font-size: 16px;
  }
  .text-time {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 12px 0px !important;
  }
  .title {
    font-size: 18px;
    padding: 5px 0;
  }
  .id-order {
    margin: 10px;
    font-size: 33px;
  }

  .time {
    font-size: 19px;
    text-align: center;
    margin-top: 15px;
    color: #3c0200;
  }
  .row-bg {
    margin-left: 0px !important;
    margin-right: 0px !important;
    .el-col {
      padding-left: 12px !important;
      padding-bottom: 13.3px !important;
    }
  }
  .pick-up,
  .check-pick-up {
    font-size: 15px;
    text-align: center;
    margin-top: 15px;
    color: #3c0200;
  }
  .btn-check-stamp-card {
    text-align: center;
    height: 41px;
    border-radius: 5px;
    border: 1px solid #3c0200;
    margin: 20px 12px 25px;
    font-size: 16px;
    line-height: 41px;
  }
  // .btn-check-stamp-card {
  //   text-align: center;
  //   height: 41px;
  //   border-radius: 5px;
  //   border: 1px solid #3c0200;
  //   margin: 20px 24px 25px;
  //   font-size: 16px;
  //   line-height: 37px;
  //   font-weight: 700;
  // }
  // .btn-check-stamp-card:active {
  //   background-color: #ffe9b8;
  // }
  .notice {
    background: #ffe9b8;
    padding: 1px 1px 10px;
    margin-bottom: 167px;
    .header-notice {
      padding-left: 12px;
      padding-top: 7px;
      padding-bottom: 7px;
    }
    .notice-title {
      font-size: 15px;
      font-weight: bold;
      padding-left: 12px;
      height: 34px;
      display: flex;
      align-items: center;
    }
    .box-notice {
      // padding: 1px 12px;
      background: #fff;
      // max-height: 181px;
      margin-bottom: 11px;
      .content-notice {
        margin-top: 10px;
        font-size: 19px;
        font-weight: bold;
      }
      .product-next {
        padding: 8px 8px 12px 12px;
      }
      .img-notice {
        width: 100%;
        height: fit-content;
        border-radius: 10px;
        margin-top: 10px;
        height: 121px;
        object-fit: cover;
      }
      .img-product {
        position: relative;
        img {
          width: 95%;
          border-radius: 10px;
        }
        .content-img {
          position: absolute;
          bottom: 8px;
        }
      }
      .goodsName {
        line-height: 26px;
        font-weight: 600;
      }
      .pd-12 {
        margin: 0 12px;
      }
    }
  }
  .text-complete-order {
    font-size: 20px;
    margin: 50px 0 70px;
  }
  :deep(.el-dialog) {
    background: #fffcee;
  }
  :deep(.el-dialog__footer .el-button--default) {
    color: #fff;
    background-color: #ff7101;
    border-color: #a8a8a8;
    border-radius: 0 0 0 6px;
  }
  :deep(.el-dialog__footer) {
    padding: 0;
  }
  :deep(.el-dialog__footer) {
    width: 100%;
    font-size: 0;
  }
  :deep(.el-dialog__footer .el-button) {
    width: 100%;
    border: 0;
    padding: 16px 20px;
  }
}
</style>
