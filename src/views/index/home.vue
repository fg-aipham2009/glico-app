<template>
  <div class="home-page">
    <img src="@/assets/images/about_shop.png" width="100%" />
    <div>
      <div class="home-title">営業案内</div>
      <div class="home-content">
        <div class="fw-blod fs-17">住所</div>
        <div>
          〒555-8502<br />
          大阪府大阪市西淀川区歌島4丁目6番5号
        </div>
      </div>
      <div class="home-content">
        <div class="fw-blod fs-17">電話番号</div>
        <div class="pd-bt">0120-917-111</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$parent.changeTabBarCss(0);
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  margin-top: 67px;
  .home-title {
    background: #ffe9b8;
    font-size: 16px;
    padding: 5px;
    padding-left: 19px;
  }
  .home-content {
    padding: 24px;
    padding-bottom: 5px;
    font-size: 16px;
    .fw-blod {
      font-weight: bold;
    }
    .fs-17 {
      font-size: 17px;
    }
    .pd-bt {
      padding-bottom: 40px;
    }
  }
}
</style>
