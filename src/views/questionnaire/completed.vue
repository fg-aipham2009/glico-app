<template>
  <div>
    <HeaderBar page-name="アンケート送信完了" />
    <div class="container-completed">
      <div class="title">アンケートは以上になります！</div>
      <div class="text-center fw-m color-black">
        <p class="item-content">貴重なお時間を頂き、</p>
        <p class="item-content">ありがとうございました。</p>
        <p class="item-content">頂いたご意見は、メニューの</p>
        <p class="item-content mb-22">企画や向上に活かして参ります。</p>
        <p class="item-content">引き続き「SUNAO」商品を</p>
        <p class="item-content">何卒よろしくお願い申し上げます。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "completed",
  mounted() {
    const t = this.$route.meta?.title;
    if (t) document.title = t;
  },
};
</script>

<style scoped lang="scss">
.container-completed {
  margin: 63px 0px 166px 0px;
  padding-top: 0;
  .title {
    background: #ff7101;
    padding: 8px;
    text-align: center;
    margin-bottom: 38px;
    color: white;
    font-size: 21px;
  }
  .item-content {
    margin-bottom: 5px;
    font-size: 17px;
  }
  .mb-22 {
    margin-bottom: 22px;
  }
  .color-black {
    color: #190802;
  }
}
</style>
