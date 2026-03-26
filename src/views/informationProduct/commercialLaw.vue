<template>
  <div class="commercial-law">
    <div class="title-page">特定商取引法に基づく表記</div>
    <div class="hr-line"></div>
    <div>
      <div class="home-content">
        <div class="fw-blod">販売業者名</div>
        <div>江崎グリコ株式会社</div>
      </div>
      <div class="home-content">
        <div class="fw-blod">販売責任者</div>
        <div>健康事業マーケティング部長　木村 幸生</div>
      </div>
      <div class="home-content">
        <div class="fw-blod">所在地</div>
        <div>〒555-8502 大阪市西淀川区歌島4-6-5</div>
      </div>
      <div class="home-content">
        <div class="fw-blod">電話番号</div>
        <div>グリコお客様センター 　0120-917-111</div>
      </div>
      <div class="home-content">
        <div class="fw-blod">メールアドレス</div>
        <div>sunao.delivery@glico.com</div>
      </div>
      <div class="home-content">
        <div class="fw-blod">支払い方法</div>
        <div>
          ご利用可能クレジットカード（前払い）　：JCB、VISA、MASTER、AMEX、Diners
          <br />
          その他決済機関（前払い）　：PayPay
        </div>
      </div>
      <div class="home-content">
        <div class="fw-blod">価格</div>
        <div>各商品の紹介欄に表示。表示価格は消費税込みの総額表示。</div>
      </div>
      <div class="home-content">
        <div class="fw-blod">商品代金以外の必要料金</div>
        <div>無し</div>
      </div>
      <div class="home-content">
        <div class="fw-blod">販売数量</div>
        <div>制限無し。ただし、契約により上限を設けることがあります。</div>
      </div>
      <div class="home-content">
        <div class="fw-blod">申込の有効期限</div>
        <div>
          商品のご注文期限は、注文サイトに表示。なお、契約社様の営業日のみご注文を受け付けます。
        </div>
      </div>
      <div class="home-content">
        <div class="fw-blod">商品の引き渡し時期</div>
        <div>お客様指定の受け取り日のお昼頃にお届けします。</div>
      </div>
      <div class="home-content">
        <div class="fw-blod">不良品の取り扱い</div>
        <div>
          お届け商品がご注文内容と異なっていたり、破損・汚損があった場合は返品をお受けします（弊社負担）
        </div>
      </div>
      <div class="home-content">
        <div class="fw-blod">返品可否・返品期限 ・返品時の送料</div>
        <div class="mb-30">お客様事由による返品・交換はお受け出来ません。</div>
      </div>
    </div>
    <div class="law-title">お問い合わせ先</div>
    <div class="contact-information">
      <div class="glico-customer-center">グリコお客様センター</div>
      <div class="phone"><a href="tel:0120917111">0120-917-111</a></div>
      <div class="time">受付時間(9:00〜18:30)</div>
      <div class="address">
        〒555-8502 <br />
        大阪府大阪市西淀川区歌島4丁目6番5号
      </div>
      <div class="url">
        ホームページ <br />
        <a href="https://www.glico.com/jp/" target="_blank">www.glico.com/jp</a>
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
.commercial-law {
  margin-top: 49px;
  font-size: 16px;
  .title-page {
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    font-weight: 500;
  }
  .hr-line {
    height: 7px;
    background: #ffe9b8;
    margin-top: 9px;
  }
  .law-title {
    background: #ffe9b8;
    font-size: 16px;
    padding: 5px;
    padding-right: 24px;
    padding-left: 24px;
  }
  .mb-30 {
    margin-bottom: 30px;
  }
  .contact-information {
    margin: 24px;
    .glico-customer-center {
      font-weight: bold;
      font-size: 14px;
    }
    .phone {
      font-weight: bold;
      font-size: 27px;
      color: #dc143c;
      line-height: 24px;
      margin: 5px auto;
    }
    .time {
      margin: 5px auto;
      margin-bottom: 21px;
    }
    .url {
      margin: 11px auto;
    }
  }
  .home-content {
    padding: 24px;
    padding-bottom: 5px;
    font-size: 16px;
    .fw-blod {
      font-weight: bold;
    }
  }
}
</style>
