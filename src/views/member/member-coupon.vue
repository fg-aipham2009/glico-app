<template>
  <div class="hello">
    <HeaderBar page-name="スタンプ" />
    <div class="container" style="margin: 98px 0 70px; padding-top: 0">
      <div class="container-cont" >
        <div class="stamppage">
          <div class="stamptop">
            <img src="@/assets/images/drink.svg" alt="">
            <div class="rule">
              <div class="fw-b mb5">1ドリンク1ポイント貯まります。</div>
              <span style="color: red">★ </span>{{memberStampData.toppingAutoExchange}}ポイントでお好きなトッピングを1点、<br>
              <span style="color: red">★ </span>{{memberStampData.drinkAutoExchange}}ポイントでお好きなドリンクを1杯<br>
              <span style="color: #F4F4F4">★ </span>（お好きなカスタマイズも含みます）
            </div>
          </div>
          <div class="progress">
            <div class="ttl">現在 <span style="font-size: 30px;font-weight: bold">{{pointCount}}</span><span style="font-size: 16px; font-weight: bold;margin-left: 2px;">Point</span> / <span style="font-size: 30px; font-weight: bold;">{{pointPage}}</span><span style="font-size: 16px; font-weight: bold;">枚目</span></div>
            <ul class="number">
              <li :class="{active:item<= pointCount}" v-for="(item,index) in 10" :key="index">
                <img v-if="(pointPage ==1 && pointPage==item) && memberStampData.firstUseReward" src="@/assets/images/white_drink1.svg" alt="">
                <img v-if="item==memberStampData.toppingAutoExchange" src="@/assets/images/white_topic1.svg" alt="">
                <img v-if="item==memberStampData.drinkAutoExchange" src="@/assets/images/white_drink1.svg" alt="">
              </li>
            </ul>
          </div>
          <div class="couponnow">
            <p>現在お持ちのクーポン</p>
            <div class="coupon" v-for="(item,index) in memberCouponList" :key="index">
              <div class="c-left">
                <img v-if="item.couponType == 1" src="@/assets/images/my_topic.svg" alt="">
                <img v-if="item.couponType == 2" src="@/assets/images/my_drink.svg" alt="">
                <span style="margin-left: 5px">{{item.couponName}}</span>
              </div>
              <div class="c-right"><span style="font-size: 26px; font-weight: bold;">{{item.couponCount}}</span><span style="font-size: 16px; font-weight: bold;margin-left: 2px;">枚</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <tab-bar :cssTitle="4" />
  </div>
</template>

<script>
    export default {
        name: "member-coupon",
        data () {
          return {
            memberCouponList:[],
            memberStampData: {},
            //枚目数
            pointPage:'',
            pointCount:'',
            memberId:sessionStorage.getItem("memberId"),
            userAuthInfoJson:sessionStorage.getItem("userAuthInfo")

          }
        },
        mounted() {
          window.scrollTo(0, 0);
        },
      created(){
        this.searchMemberPointNum();
        this.searchDrinkAndToppingStampSetRules();
        this.searchCouponList();

      },
      methods:{

        searchMemberPointNum() {
          const that = this;
          let param = {
            memberId: that.memberId,
          };
          this.$post("/mo/member/getMemberPointNum", param)
            .then((response) => {
              if (response.code == 200 || response.code === "200") {
                if (response.data != null && response.data != "null") {
                  const total = parseInt(response.data, 10);
                  if (total === 0) {
                    this.pointPage = 1;
                    this.pointCount = 0;
                  } else {
                    if (total % 10 === 0) {
                      this.pointPage = total / 10;
                    } else {
                      this.pointPage = Math.ceil(total / 10);
                    }
                    if (total % 10 === 0) {
                      this.pointCount = 10;
                    } else {
                      this.pointCount = total % 10;
                    }
                  }
                } else {
                  this.pointPage = 1;
                  this.pointCount = 0;
                }
              }
            })
            .catch((err) => {
              this.$message.error(err.response?.data?.msg || "ERROR");
            });
        },
        searchDrinkAndToppingStampSetRules() {
          let that = this;
          let param = {
            memberId: that.memberId,
          };
          this.$post("/memberStampConfig/getDrinkAndToppingStampSetRules", param)
            .then((response) => {
              if (response.code == 200 || response.code === "200") {
                that.memberStampData = response.data || {};
              }
            })
            .catch((err) => {
              this.$message.error(err.response?.data?.msg || "ERROR");
            });
        },
        searchCouponList() {
          let that = this;
          let param = {
            memberId: that.memberId,
          };
          that
            .$post("/memberCoupon/getMemberCouponList", param)
            .then((response) => {
              if (response.code == 200 || response.code === "200") {
                that.memberCouponList = response.data || [];
              }
            })
            .catch((err) => {
              this.$message.error(err.response?.data?.msg || "ERROR");
            });
        }
      }
    }
</script>

<style scoped>

</style>
