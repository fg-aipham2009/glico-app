<template>
  <div class="privacy-policy">
    <div class="title-page">サービス利用規約</div>
    <div class="policy-title fw-r">SUNAOデリバリーサービスユーザー利用規約</div>
    <div class="text-policy">
      <ContentPrivacy />
    </div>
  </div>
</template>
<script>
import ContentPrivacy from "@/views/mypage/contentPrivacy.vue";
export default {
  components: {
    ContentPrivacy,
  },
  mounted() {
    this.$parent.changeTabBarCss(0);
  },
};
</script>
<style lang="scss" scoped>
.privacy-policy {
  margin-top: 41px;
  margin-bottom: 57px;
  .title-page {
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    font-weight: 500;
  }
  .policy-title {
    background: #ffe9b8;
    font-size: 16px;
    padding: 5px;
    padding-left: 24px;
    text-align: left;
  }
  .text-policy {
    margin: 22px;
    padding: 22px auto;
    font-size: 16px;
    text-align: justify;
    margin-bottom: 100px;
  }
}
</style>
