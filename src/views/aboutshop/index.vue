<template>
  <div>
    <HeaderBar :store-name="storeName" page-name="お店について" />
    <div class="container" style="margin: 126px 0 70px; padding-top: 0">
      <div class="shoppage">
        <img class="shopimg" :src="data.storeAbout" alt="" />
        <div class="shopidea">
          新たなティーカルチャーを創造し、<br />
          お客様一人ひとりの日常に <br />
          Happinessをお届けします
        </div>
        <div class="comtitle">営業案内</div>
        <div class="guide">
          <div class="guideitem">
            <div class="ttl">住所</div>
            <div class="text">{{ location }}</div>
            <div class="com-addtrade">
              <a href="javascript:void(0)" @click="goMap"
                >アクセス方法・地図はこちら</a
              >
            </div>
          </div>
          <div class="guideitem">
            <div class="ttl">電話番号</div>
            <div class="text">{{ data.mobilephone }}</div>
          </div>
          <div class="guideitem">
            <div class="ttl">客席</div>
            <div class="text">
              {{ data.guestSeatFlag === 0 || data.guestSeatFlag === "0" ? "あり" : "なし" }}
            </div>
          </div>
          <div class="guideitem">
            <div class="ttl">お知らせ</div>
            <div class="text">
              店舗により、営業時間に変更が生じております。<br />
              詳しくは<a
                @click.prevent="showFile(data.businessTimeFilePath)"
                target="_blank"
                >こちら</a
              >をご確認ください。 <br />
              ご不便をお掛けいたしますが、ご了承頂きますようお願い申し上げます。
              <br /><br />
              なお、デリバリー対応店の場合、店舗閉店以降もデリバリーは営業している場合がございます。
              <br />
              是非ご利用ください。
            </div>
          </div>
          <div class="mb70"></div>
        </div>
      </div>
      <footer-bar />
    </div>

    <tab-bar :cssTitle="0" />
  </div>
</template>

<script>
export default {
  name: "aboutshop",
  data() {
    return {
      data: {},
      storeId: null,
      location: "",
      storeName: sessionStorage.getItem("storeName"),
    };
  },
  mounted() {
    this.getSysMStore();
  },
  methods: {
    goMap() {
      this.$router.push({ path: "/map" });
    },
    getSysMStore() {
      let that = this;
      let par = {
        storeId: localStorage.getItem("storeId"),
      };
      that.$post("/mo/sysMStore/getSysMStore", par).then((res) => {
        if (!res) return;
        that.location = "";
        that.data = res;
        localStorage.setItem("storeData", JSON.stringify(res));
        let storeState = res.storeState;
        if (storeState) {
          that.location += storeState;
        }

        let storeCity = res.storeCity;
        if (storeCity) {
          that.location += " " + storeCity;
        }

        let storeTown = res.storeTown;
        if (storeTown) {
          that.location += " " + storeTown;
        }

        let storeBuilding = res.storeBuilding;
        if (storeBuilding) {
          that.location += " " + storeBuilding;
        }

        let storeLocation = res.storeLocation;
        if (storeLocation) {
          that.location += " " + storeLocation;
        }
        if (res.createTime) {
          const date = new Date(res.createTime);
          if (!Number.isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            that.data.createTime = year + "年" + month + "月" + day + "日";
          }
        }
      })
      .catch((err) => {
        that.$message.error(err.response?.data?.msg || "ERROR");
      });
    },
    showFile(fileUrl) {
      if (!fileUrl) return;
      if (typeof liff !== "undefined" && liff != null && liff.id != null) {
        liff.openWindow({ url: fileUrl, external: true });
      } else {
        window.open(fileUrl, "_blank", "noopener,noreferrer");
      }
    },
  },
};
</script>

<style scoped>
</style>
