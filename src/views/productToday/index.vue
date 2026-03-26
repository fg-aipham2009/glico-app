<template>
  <div>
    <HeaderBar
      page-name="商品情報"
      pageNameSecond="商品の情報をご確認ください"
    />
    <div class="product-today">
      <div class="line"></div>
      <!-- body -->
      <div class="body" v-if="dataProduct">
        <!-- 8月3日(水) -->
        <div class="title fw-m">{{ createTime }}</div>
        <el-row class="mb-17">
          <el-col :span="12">
            <div class="img-product">
              <img :src="dataDetail.goodsImg" alt="" />
              <div class="price fw-m fs-25">
                {{ dataDetail.goodsPrice | NumFormat }}円
                <span class="fs-12 fw-m">(税込)</span>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <p class="font-yu-mincho fs-19">
              {{ dataDetail.goodsName }}
            </p>
          </el-col>
        </el-row>

        <!-- 商品説明 -->
        <div class="title border-bottom fs-17 fw-b">商品説明</div>
        <div class="custom-vue-editor ql-snow" v-html="dataDetail.goodsDesc"></div>
        <div class="next-menu mt-10">
          <div class="next-item fw-b">
            <div @click="number == 2 || number == 3 ? nextMenu(false) : ''">
              ＜＜前日分
            </div>
          </div>
          <div class="fw-b" @click="getDate()">本日分</div>
          <div class="next-item fw-b">
            <div @click="number == 2 || number == 1 ? nextMenu(true) : ''">
              当日分＞＞
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center mt-10">メニューは、ございません</div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      dataProduct: "",
      createTime: "",
      dataDetail: {
        goodsImg: "",
        goodsName: "",
        goodsDesc: "",
      },
      openOrder: false,
      number: 2,
    };
  },
  components: {},

  mounted() {
    this.getDate();
  },
  methods: {
    getDate() {
      this.getProduct(moment().format("YYYY-MM-DD"));
      this.number = 2;
    },
    nextMenu(value) {
      if (this.number == 2) {
        if (value) {
          this.getProduct(moment().add(1, "days").format("YYYY-MM-DD"));
        } else {
          this.getProduct(moment().subtract(1, "days").format("YYYY-MM-DD"));
        }
      } else {
        this.getProduct(moment().format("YYYY-MM-DD"));
      }
      if (value) {
        this.number += 1;
      } else {
        this.number -= 1;
      }
    },
    getProduct(sellDate) {
      let param = {
        sellDate: sellDate,
      };
      this.$post("/goods/goodsByDate", param).then((res) => {
        if ((res.data || []).length !== 0) {
          this.dataProduct = res.data[0];
        }
        this.getProductDetail();
      });
    },
    getProductDetail() {
      let param = {
        goodsId: this.dataProduct.goodsId,
      };
      this.$post("/goods/goodsById", param).then((res) => {
        this.dataDetail = res.data;
        moment.locale("ja");
        this.createTime = moment(this.dataDetail.sellDate).format(
          "MM月DD日(ddd)"
        );
      });
    },
  },
};
</script>
<style lang="scss" >
.custom-vue-editor {
  .ql-toolbar {
    display: none;
  }
  .ql-container {
    border: 0px solid !important;
    min-height: 300px;
  }
  .ql-editor {
    overflow-y: inherit !important;
    padding: 0px !important;
  }
}
</style>
<style lang="scss" scoped>
.product-today {
  color: #3c0200;
  margin-top: 171px;
  margin-bottom: 50px;
  overflow: auto;
  min-height: calc(100vh - 297px);
  .mt-10 {
    margin-top: 10px;
  }
  .next-menu {
    display: flex;
    justify-content: space-between;
  }
  .next-item {
    width: 80px;
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
  }
  .body {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;

    .form-confirm {
      background: #ffe9b8;
      padding: 30px 17px 17px 17px;
      margin-bottom: 77px;
      .el-button {
        width: 100%;
        font-size: 17px;
        background: #ff7101;
        border-radius: 8px;
      }
      .btn-confirm-order {
        margin: 9px 40px 20px 40px;
        padding: 1px;
        border-radius: 10px !important;
        border: 2px solid #ff7101 !important;
        .fs-18 {
          font-size: 18px;
        }
        .contentBtn {
          white-space: inherit !important;
        }
      }
      img {
        margin-left: 8px;
        margin-top: -16px;
      }
    }
    .border-bottom {
      border-bottom: 1px solid;
    }
    .title {
      padding-bottom: 3px;
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
    .mb-17 {
      margin-bottom: 17px;
    }
    .mb-3 {
      margin-bottom: 3px;
    }
    .fs-12 {
      font-size: 12px;
    }
    .fs-19 {
      font-size: 19px;
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
