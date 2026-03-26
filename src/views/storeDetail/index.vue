<template>
  <div>
    <HeaderBar page-name="特定商取引法に基づく表記" />
    <div class="container" style="margin: 80px 0 70px;padding-bottom: 70px">
      <div class="shoppage">
        <div class="guide">
          <div class="guideitem">
            <div class="ttl">販売事業者名（会社名）</div>
            <div class="text">株式会社ゴンチャジャパン</div>
          </div>
          <div class="guideitem">
            <div class="ttl">郵便番号</div>
            <div class="text">151-0071</div>
          </div>
          <div class="guideitem">
            <div class="ttl">所在地（運営会社）</div>
            <div class="text">東京都渋谷区本町2-6-3 ユニゾ初台ビル３F</div>
          </div>
          <div class="guideitem">
            <div class="ttl">代表者</div>
            <div class="text">代表取締役社長　角田 淳</div>
          </div>
          <div class="guideitem">
            <div class="ttl">連絡先</div>
            <div class="text">03-4405-4852（運営会社）</div>
          </div>
          <div class="guideitem">
            <div class="ttl">受付曜日（運営会社）</div>
            <div class="text">平日</div>
          </div>
          <div class="guideitem">
            <div class="ttl">受付時間（運営会社）</div>
            <div class="text">9 時～ 18 時</div>
          </div>
          <div class="guideitem">
            <div class="ttl">支払い方法</div>
            <div class="text">クレジットカード、LINE Pay、メルペイ、Alipay、銀聯</div>
          </div>
          <div class="guideitem">
            <div class="ttl">価格</div>
            <div class="text">注文手続きの際に画面に表示されます。消費税は内税として表示しています。</div>
          </div>
          <div class="guideitem">
            <div class="ttl">販売数量</div>
            <div class="text">各商品ページにてご確認ください。</div>
          </div>
          <div class="guideitem">
            <div class="ttl">商品の引き渡し時期</div>
            <div class="text">テイクアウトの場合には、注文の受付後、調理が完了次第商品を用意してお待ちしております。</div>
          </div>
        </div>
      </div>
    </div>
    <tab-bar :cssTitle="0" />
  </div>
</template>

<script>
export default {
  name: "storeDetail",
  mounted() {
    const t = this.$route.meta?.title;
    if (t) document.title = t;
  },
};
</script>

<style scoped>
</style>
