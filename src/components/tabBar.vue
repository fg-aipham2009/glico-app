<template>
  <div>
    <div class="menu-footer">
      <div class="menu-1">
        <table>
          <tr
            v-for="(menu, index) in menus"
            :key="index"
            @click="routerFooter(menu)"
          >
            <td>
              <p class="title">{{ menu.title }}</p>
            </td>
            <td>
              <div class="icon">
                <img src="@/assets/images/arror-right.svg" alt="" />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bottom-menu">
      <!-- Menu Bottom -->
      <div class="bottom-menu-tab">
        <div class="footer">
          <!-- Home -->
          <div
            v-bind:class="{ 'foot-box': true, active: css == 1 }"
            v-on:click="goHome"
            @click="goMenu(1)"
          >
            <img
              class="h-30"
              v-if="css == 1"
              src="@/assets/images/menu_1.svg"
              alt="ホーム"
            />
            <img
              class="h-30"
              v-else
              src="@/assets/images/menu_1_active.svg"
              alt="ホーム"
            />
            <p class="text">ホーム</p>
          </div>

          <!-- Cart -->
          <div
            v-bind:class="{ 'foot-box': true, active: css == 2 }"
            v-on:click="goCart"
            @click="goMenu(2)"
          >
            <img
              class="h-30"
              v-if="css == 2"
              src="@/assets/images/menu_2.svg"
              alt="注文リスト"
            />
            <img
              class="h-30"
              v-else
              src="@/assets/images/menu_2_active.svg"
              alt="注文リスト"
            />
            <p class="text left_menu2">カート</p>
            <div class="point-cart" v-if="checkPoint"></div>
          </div>

          <!-- Order -->
          <div
            v-bind:class="{ 'foot-box': true, active: css == 3 }"
            v-on:click="goOrderList"
            @click="goMenu(3)"
          >
            <img
              class="h-30"
              v-if="css == 3"
              src="@/assets/images/menu_3.svg"
              alt="注文履歴"
            />
            <img
              class="h-30"
              v-else
              src="@/assets/images/menu_3_active.svg"
              alt="注文履歴"
            />
            <p class="text">注文履歴</p>
          </div>
          <div
            v-bind:class="{ 'foot-box': true, active: css == 4 }"
            @click="goMenu(4)"
          >
            <img
              class="h-30"
              v-if="css == 4"
              src="@/assets/images/menu_4.svg"
              alt="マイページ"
            />
            <img
              class="h-30"
              v-else
              src="@/assets/images/menu_4_active.svg"
              alt="マイページ"
            />
            <p class="text">マイページ</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from "moment";
import { ElMessage as Message } from "element-plus";
export default {
  data() {
    return {
      menus: [
        {
          title: "お店について",
          link: "/information/about",
        },
        {
          title: "サービス利用規約",
          link: "/information/terms-and-conditions",
        },
        {
          title: "プライバシーポリシー",
          link: "プライバシーポリシー",
        },
        {
          title: "特商法取引に基づく表記",
          link: "/information/commercial-law",
        },
        {
          title: "よくある質問",
          link: "よくある質問",
        },
        {
          title: "お問い合わせ",
          link: "お問い合わせ",
        },
      ],
      css: "1",
      storeId: localStorage.getItem("storeId"),
      checkPoint: false,
    };
  },
  props: {
    cssTitle: Number,
    checkCart: Boolean,
  },
  mounted() {
    this.css = this.cssTitle;
    if (sessionStorage.getItem("cartGoods")) {
      this.checkPoint = true;
    } else {
      this.checkPoint = false;
    }
  },
  watch: {
    cssTitle() {
      this.css = this.cssTitle;
    },
    checkCart() {
      if (sessionStorage.getItem("cartGoods")) {
        this.checkPoint = true;
      } else {
        this.checkPoint = false;
      }
    },
  },
  methods: {
    goMenu(value) {
      this.css = value;
      if (value == 4) {
        this.$router.push({ path: "/my-page" });
      }
    },
    routerFooter(value) {
      if (value.link == "お問い合わせ") {
        window.open("https://go.pardot.com/l/127181/2021-04-16/49nc7v/");
      } else if (value.link == "プライバシーポリシー") {
        window.open("https://www.glico.com/jp/privacypolicy/");
      } else if (value.link == "よくある質問") {
        window.open("https://www.glico.com/assets/files/sunaodelivery-faq.pdf");
      } else {
        this.$router.push({ path: value.link });
      }
    },
    goHome() {
      this.$router.push({ path: "/order" });
    },
    goCart() {
      if (sessionStorage.getItem("cartGoods")) {
        const startTime = moment().format("HH:mm");
        const endTime = "08:59";
        const hours = moment
          .duration(moment(startTime, "HH:mm").diff(moment(endTime, "HH:mm")))
          .asHours();
        if (hours > 0) {
          const data = JSON.parse(sessionStorage.getItem("cartGoods"));
          const sellDate = moment(data.sellDate).format("YYYY-MM-DD");
          const today = moment().format("YYYY-MM-DD");
          if (today == sellDate) {
            sessionStorage.removeItem("cartGoods");
            Message.closeAll();
            this.$message.error("店舗を選んでください。");
          } else {
            this.$router.push({ name: "cart" });
          }
        } else {
          this.$router.push({ name: "cart" });
        }
      } else {
        Message.closeAll();
        this.$router.push({ name: "cart" });
        // this.$message.error("店舗を選んでください。");
      }
    },
    goOrderList() {
      this.$router.push({ path: "/order-history" });
    },
    goMyPage() {},
  },
};
</script>

<style lang="scss">
.mt--4 {
  margin-top: -4px;
}

.point-cart {
  background: #ff7101;
  height: 18px;
  width: 18px;
  position: absolute;
  top: -16px;
  margin-left: 25px;
  border: 3px solid #3c0200;
  border-radius: 50%;
}
.menu-footer {
  .menu-1 {
    padding: 12px;
    padding-left: 40px;
    font-size: 16px;
    background: #cbb39f;
    color: #3c0200;
    margin-bottom: 55px;
    padding-bottom: 55px;
    td {
      padding: 3px;
      font-size: 15px;
      font-weight: 500;
    }
    .icon {
      margin-left: 20px;
    }
    .flex-jb {
      display: flex;
      margin-top: 8px;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.default-menuhome {
  display: inline-block;
  width: 35px;
  height: 30px;
}
.default-cart {
  display: inline-block;
  width: 37px;
  height: 30px;
}
.default-order {
  display: inline-block;
  width: 41px;
  height: 33px;
}

.bottom-menu {
  z-index: 2003;
  color: red;
  .glico {
    margin-top: 8px;
    margin-bottom: 16px;
    font-size: 14px;
    text-align: center;
  }
}
</style>

<style lang="scss">
.h-30 {
  height: 27px;
  margin-top: -13px;
}
.foot-box {
  position: relative;
}
.left_menu2 {
  left: -11px !important;
}
.footer {
  .text {
    position: absolute;
    width: 60px;
    left: -15px;
  }
  margin-top: -13px;
}
.foot-box {
  position: relative;
}
.left_menu2 {
  left: -11px !important;
}
.footer {
  .text {
    position: absolute;
    width: 60px;
    left: -15px;
  }
}

@supports (bottom: env(safe-area-inset-bottom)) {
  div.bottom-menu {
    /*padding-bottom: constant(safe-area-inset-bottom, 20px);*/
    padding-bottom: env(safe-area-inset-bottom, 0);
    left: env(safe-area-inset-left, 0);
    right: env(safe-area-inset-right, 0);
    width: calc(
      100% - (env(safe-area-inset-left, 0) + env(safe-area-inset-right, 0))
    );
    background-color: #cbb39f;
    color: #3c0200;
    position: fixed;
    bottom: 0;
  }
  .footer {
    position: relative;
  }
}
</style>
