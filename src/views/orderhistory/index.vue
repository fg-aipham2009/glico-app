<template>
  <div>
    <!-- <HeaderBar page-name="注文履歴" /> -->
    <div class="order-history">
      <!-- <div class="arror-left" @click="back()">
        <i class="el-icon-arrow-left"></i>
      </div> -->
      <div class="mypage">
        <div class="orderlist">
          <div class="orderName">
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
          <div>
            <p v-if="data.length == 0" class="no-data">
              まだ注文履歴がありません。
            </p>
          </div>
          <div
            class="item border-bottom-item"
            v-for="(item, index) in data"
            :key="index"
            :id="item.transId"
          >
            <ul class="info">
              <li><span>注文番号：</span> M{{ item.transConfirmNo }}</li>
              <li><span>注文日：</span>{{ item.takeDate }}</li>
              <li>
                <span>金額：</span>{{ formatNum(item.transPayAmount) }}円
                (税込)
              </li>
            </ul>
            <img class="itemimg" :src="item.goodsImg" alt="" />
            <div
              class="btn-confirm mb-13 fs-17 fw-m"
              @click="selectOrderInfo(item)"
            >
              注文内容の確認
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="paginate">
      <el-pagination
        v-if="data.length != 0"
        :page-size="size"
        :pager-count="5"
        :current-page="current"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "orderhistory",

  data() {
    return {
      data: [],
      userName: "",
      userImg: "",
      userinfo: {},
      current: 1,
      size: 5,
      pages: 0,
      total: 0,
    };
  },

  mounted() {
    this.$parent.changeTabBarCss(3);
    this.getTransactionList();
    this.getUserAuthInfo();
  },

  beforeUnmount() {
    this.$parent.changeTabBarCss(0);
  },

  methods: {
    formatNum(val) {
      if (val == null || val === "") return "";
      const n = Number(val);
      return Number.isFinite(n) ? n.toLocaleString("ja-JP") : String(val);
    },
    back() {
      history.back();
    },
    getUser() {
      let data = JSON.parse(sessionStorage.getItem("userinfo"));
      if (data) {
        this.userName = data.nickName;
        this.userImg = data.avatarUrl;
      }
    },
    handleCurrentChange(page) {
      this.current = page;
      this.getTransactionList();
    },
    getTransactionList() {
      let par = {
        userId: localStorage.getItem("openId"),
        storeId: localStorage.getItem("storeId"),
        current: this.current,
        size: 5,
      };
      this.$post("/transaction/getTransactionList", par)
        .then((res) => {
          this.data = res.records || [];
          this.pages = res.pages;
          this.total = res.total;
          const records = res.records || [];
          if (records.length === 0) return;
          this.$post("/transaction/getGoodsImgByTransNo", records)
            .then((imgList) => {
              if (!Array.isArray(imgList)) return;
              for (let i = 0; i < this.data.length; i++) {
                for (let j = 0; j < imgList.length; j++) {
                  if (this.data[i].transNo == imgList[j].transNo) {
                    this.data[i].goodsImg = imgList[j].goodsImg;
                  }
                }
              }
            })
            .catch((err) => {
              this.$message.error(err.response?.data?.msg || "ERROR");
            });
        })
        .catch((err) => {
          this.$message.error(err.response?.data?.msg || "ERROR");
        });
    },

    selectOrderInfo(data) {
      sessionStorage.setItem("transNo", data.transNo);
      this.$router.push({
        name: "order-detail",
      });
    },

    getUserAuthInfo() {
      var openId = localStorage.getItem("openId");
      var params = {
        openId: openId,
      };
      this.$post("/mypage/getUserAuthInfo", params)
        .then((response) => {
          if (response.code === 200) {
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
          this.$message.error(err.response?.data?.msg || "ERROR");
        });
    },
  },
};
</script>

<style scoped lang="scss">
.el-pagination .number,
.el-pagination button:disabled,
.el-pagination .btn-next {
  background: transparent !important;
}
.paginate {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 42px;
}
.pagename {
  text-align: center;
  color: #c10230;
  line-height: 50px;
  font-size: 18px;
  position: relative;
  border-bottom: 1px solid #eae9e8;
  .mb-3 {
    margin-bottom: 3px;
  }
}
.border-bottom-item {
  border-bottom: 1px solid #3c0200 !important;
}
.arror-left {
  position: fixed;
  font-size: 32px;
  color: #3c0200;
  top: 102px;
  z-index: 100;
  left: 12px;
}
.pagename .arrleft {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
}
.order-history {
  margin: 68px 0 0px;
  padding-top: 0;
  padding-bottom: 10px;
  .mb-13 {
    margin-bottom: 13px;
  }
  .fs-17 {
    font-size: 17px !important;
  }
  .border-radius-20 {
    border-radius: 20px;
  }
  .no-data {
    // margin-left: 20px;
    // font-weight: bold;
    margin-top: 20px;
    margin-bottom: 200px;
    padding-top: 5px;
  }
  .orderName {
    margin: 0px -20px 0px -20px;
    background: #3c0200;
    height: 57px;
    color: white;
    display: flex;
    align-items: center;
    padding: 8px 8px 8px 20px;
    font-size: 18px;
    .mr-8 {
      margin-right: 8px;
    }
  }
}
</style>
