<template>
  <div>
    <div class="product-detail">
      <!-- body -->
      <div class="body">
        <div class="title fw-b">{{ createTime }}</div>
        <el-row class="mb-17">
          <el-col :span="12">
            <div class="img-product">
              <img :src="dataDetail.goodsImg" alt="" />
              <div class="price fs-25">
                <span class="fw-b"
                  >{{ dataDetail.goodsPrice | NumFormat }}円</span
                >
                <span class="fs-16 fw-m">(税込)</span>
              </div>
              <div class="value-discount" v-if="discount != 0">
                <span>
                  割引: -{{
                    ((dataDetail.goodsPrice * this.discount) / 100) | NumFormat
                  }}円
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <p class="font-yu-mincho fs-16 goodsName">
              {{ dataDetail.goodsName }}
            </p>
          </el-col>
        </el-row>
        <div v-if="openOrder && checkOrder()" class="error-order">
          <div v-html="messageError" class="contentMaximum"></div>
        </div>
        <div
          v-if="checkOrder()"
          class="btn-orange-main btn-login mb-22 mt-6"
          :class="openOrder ? 'border-input-disabled' : 'border-input'"
        >
          <el-button
            :class="openOrder ? 'btn-disable' : ''"
            :disabled="openOrder"
            @click="addCart()"
            class="fs-17"
            >カートに入れる</el-button
          >
        </div>

        <!-- 商品説明 -->
        <div class="title border-bottom fs-17 fw-b">商品説明</div>
        <!-- <div v-html="dataDetail.goodsDesc" class="mb-17"></div> -->
        <div class="custom-vue-editor ql-snow" v-html="dataDetail.goodsDesc"></div>
        <div
          class="form-confirm mb-15"
          v-if="
            !checkOrder() && checkExportStatus() != 3 && !checkOrderComplete()
          "
        >
          <el-row>
            <el-col :span="20">
              <p class="text-center">
                召しあがっていただいた<br />
                商品について「アンケート」の<br />
                ご協力をお願いします。
              </p>
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
          <div class="btn-confirm-order">
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
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      createTime: "",
      discount: "",
      dataDetail: {
        goodsImg: "",
        goodsName: "",
        goodsDesc: "",
      },
      openOrder: false,
      messageError: "",
      sellDate: ""
    };
  },
  components: {},

  mounted() {
    this.getProductDetail();
    this.getDiscount();
  },
  destroyed() {
    sessionStorage.removeItem("orderComplete");
    sessionStorage.removeItem("exportStatus");
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
    getProductDetail() {
      this.sellDate = localStorage.getItem("sellDateCheck");
      let param = {
        goodsId: localStorage.getItem("goodsId"),
        storeId: localStorage.getItem("storeId"),
        sellDate: this.sellDate,
      };
      this.$post("/goods/goodsById", param).then((res) => {
        this.dataDetail = res.data;
        this.orderProcedure();
        moment.locale("ja");
        this.createTime = moment(this.dataDetail.sellDate).format(
          "M 月 D 日 (ddd)"
        );
      });
    },
    orderProcedure() {
      const data = {
        dateOrder: moment().format("YYYY-MM-DD HH:mm:ss"),
        dateGoods: this.dataDetail.sellDate,
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
    addCart() {
      if (!this.openOrder) {
        sessionStorage.setItem("cartGoods", JSON.stringify(this.dataDetail));
        this.$router.push({
          name: "cart",
        });
      }
    },
    routerQuetionaire() {
      this.$router.push({
        name: "menu-questionnaire1",
      });
    },
    checkOrder() {
      return JSON.parse(sessionStorage.getItem("openOrder"));
    },
    checkExportStatus() {
      const exportStatus = JSON.parse(sessionStorage.getItem("exportStatus"));
      console.log("===> exportStatus", exportStatus);
      return exportStatus;
    },
    checkOrderComplete() {
      return JSON.parse(sessionStorage.getItem("orderComplete"));
    },
  },
};
</script>
<style lang="scss" >
.custom-vue-editor {
  padding-top: 3px;
  .ql-toolbar {
    display: none;
  }
  .ql-container {
    border: 0px solid !important;
  }
  .ql-editor {
    overflow-y: inherit !important;
    padding: 0px !important;
  }
}
</style>
<style lang="scss" scoped>
.product-detail {
  margin: 111px 0 60px;
  overflow: auto;
  min-height: calc(100vh - 297px);

  .error-order {
    line-height: 24px;
    margin-top: 0px;
    font-size: 15px;
    position: initial;
    word-wrap: break-word;
  }
  .arror-left {
    position: fixed;
    font-size: 31px;
    color: #3c0200;
    top: 113px;
    z-index: 100;
    left: 10px;
  }
  .line {
    height: 7px;
    background: #ffe9b8;
    margin-top: 32px;
  }
  .body {
    margin-top: 25px;
    margin-left: 20px;
    margin-right: 20px;

    .form-confirm {
      background: #ffe9b8;
      padding: 30px 17px 17px 17px;
      margin-bottom: 77px;
      margin-top: 25px;
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
        margin: 9px 40px 20px 40px;
        padding: 1px;
        border-radius: 10px !important;
        border: 2px solid #ff7101 !important;
        .fs-18 {
          font-size: 18px;
        }
        .mb-8 {
          margin-bottom: 8px;
        }
        .contentBtn {
          white-space: inherit !important;
        }
      }
    }
    .border-bottom {
      border-bottom: 1px solid;
    }
    .title {
      padding-bottom: 6px;
      margin-bottom: 6px;
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
    .mb-17 {
      margin-bottom: 17px;
    }
    .m-4 {
      margin: 4px 0px;
    }
    .mb-22 {
      margin-bottom: 22px;
    }
    .mb-3 {
      margin-bottom: 3px;
    }
    .fs-16 {
      font-size: 16px;
    }
    .fs-20 {
      font-size: 20px;
    }
    .fs-25 {
      font-size: 25px;
    }
    .fs-17 {
      font-size: 17px;
    }
  }
}
</style>
