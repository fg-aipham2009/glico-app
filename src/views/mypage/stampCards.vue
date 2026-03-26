<template>
  <div>
    <HeaderBar page-name="スタンプカード・クーポン" />
    <div class="container-stamp-cards" v-if="disableStampCard == false">
      <div class="mypage" style="margin-top: 20px">
        <div class="stamp-cards">
          <div class="title">スタンプカード</div>
          <div class="content-stamp">
            <div>1回のご注文につき1ポイントが貯まります。</div>
            <div>10ポイントでビスケットクーポンをプレゼントいたします！</div>
          </div>
          <div class="content-stamp dis-flex">
            <div>
              現在<span class="fw-bold">{{ $numFormat(point) }} point</span>
              (カード<span>{{ $numFormat(numOfCardCompleted) }}</span
              >枚目)
            </div>
          </div>
          <div
            v-if="note"
            style="color: #f56c6c; margin: -20px 0 10px; font-size: 14px"
          >
            {{ note }}
          </div>
          <div class="table-stamp mb-17" :class="cssTable ? `${cssPoint}` : ''">
            <table>
              <tr v-for="(item, index) in rowOfPoint" :key="index">
                <td
                  v-for="(item, idx) in totalPointInLine"
                  :key="idx"
                  class="item-table"
                >
                  <img
                    v-if="checkPoint(index, idx + 1)"
                    src="@/assets/images/iconitem.png"
                    alt=""
                  />
                </td>
              </tr>
              <tr
                v-for="(itemResidual, index) in 1"
                :key="'Res' + index"
                v-if="residualPointInLine > 0"
              >
                <td
                  v-for="(itemResidual, idx) in residualPointInLine"
                  :key="idx"
                  class="item-table"
                >
                  <img
                    v-if="checkPointResiudal(index, idx + 1)"
                    src="@/assets/images/iconitem.png"
                    alt=""
                  />
                </td>
              </tr>
            </table>
          </div>
          <div class="title">現在お持ちのクーポン</div>
          <div v-if="listCoupon.length > 0">
            <div v-for="item in listCoupon" :key="item.stampId">
              <div class="coupon-control">
                <div class="btn-confirm">
                  {{ item.stampName }}
                </div>
                <div class="content-note">
                  <p>備考：他クーポン併用不可</p>
                  <p>有効期限：{{ item.endDate }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else>クーポンはまだありません。</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-if="msgNote"
        style="margin: 50px auto 0px; text-align: center; font-size: 14px"
      >
        {{ msgNote }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "stampCards",
  data() {
    return {
      point: "",
      numOfCardCompleted: 0,
      stampCardInfo: {},
      totalPoint: "",
      stampNum: "",
      rowOfPoint: "",
      totalPointInLine: "",
      infoStampCardSetting: {},
      listCoupon: [],
      residualPointInLine: "",
      pointResiudal: "",
      note: "",
      cssPoint: "",
      cssTable: false,
      msgNote: "",
      disableStampCard: false,
    };
  },

  mounted() {
    this.getListStampCard();
    this.getInfoStampCard();
  },
  // computed: {
  //   totalPoint() {
  //     let number = 0;
  //     number = Number(this.numOfCard) * 10 + Number(this.point);
  //     console.log(number);
  //     return number;
  //   },
  // },
  methods: {
    getInfoStampCard() {
      let param = {};
      this.$get("/memberStampCard/stampCardSetting/getInfo", param).then(
        (res) => {
          if (res.code == 200) {
            this.infoStampCardSetting = res.data;
            if (this.infoStampCardSetting == null) {
              this.disableStampCard = true;
              this.msgNote = "現在キャンペーンがありません。";
              return false;
            } else {
              this.disableStampCard = false;
            }
            this.totalPoint = Number(this.infoStampCardSetting.totalPoint);
            this.totalPointInLine = Number(
              this.infoStampCardSetting.totalPointInLine
            );
            if (this.totalPointInLine == 1) {
              this.cssTable = true;
              this.cssPoint = "cssOnePoint";
            } else if (this.totalPointInLine == 2) {
              this.cssTable = true;
              this.cssPoint = "cssTwoPoint";
            } else if (this.totalPointInLine == 3) {
              this.cssTable = true;
              this.cssPoint = "cssThreePoint";
            } else if (this.totalPointInLine == 4) {
              this.cssTable = true;
              this.cssPoint = "cssFourPoint";
            } else {
              this.cssTable = false;
            }
            this.rowOfPoint = Math.floor(
              this.infoStampCardSetting.totalPoint /
                this.infoStampCardSetting.totalPointInLine
            );
            this.residualPointInLine = Number(
              this.infoStampCardSetting.totalPoint %
                this.infoStampCardSetting.totalPointInLine
            );
            console.log(this.residualPointInLine);
            this.stampSettingId = this.infoStampCardSetting.stampSettingId;
          }
        }
      );
    },
    getListStampCard() {
      let param = {
        memberId: localStorage.getItem("openId"),
      };
      this.$get("/memberStampCard/getList", param).then((response) => {
        if (response.code == 200) {
          const listStampCard = response.data;
          if (listStampCard.length > 0) {
            listStampCard.map((e) => {
              if (e.isFinished == true) {
                this.numOfCardCompleted++;
                if (this.numOfCardCompleted == e.maximumStampCard) {
                  this.numOfCardCompleted = this.numOfCardCompleted - 1;
                  this.point = Number(e.stampNum);
                  this.note = "すべてのスタンプカードを獲得しました!";
                }
              } else {
                this.stampCardInfo = e;
                this.point = Number(e.stampNum);
              }
              if (e.isFinished == true && e.isExpired == false) {
                this.listCoupon.push(e);
                console.log(this.listCoupon, "listCoupon");
              }
              if (e.isFinished == false && e.isExpired == false) {
                var evenPoint =
                  e.totalPoint - (e.totalPoint % e.totalPointInLine);
                if (e.stampNum > evenPoint) {
                  this.pointResiudal = e.stampNum - evenPoint;
                }
              }
            });
            this.listCoupon.map((item) => {
              item.startDate = moment(item.startDate, "YYYY-MM-DD").format(
                "YYYY/MM/DD"
              );
              item.endDate = moment(item.endDate, "YYYY-MM-DD").format(
                "YYYY/MM/DD"
              );
            });
          }
        }
      });
    },

    checkPoint(tr, td) {
      if (this.totalPointInLine == 1) {
        if (tr === 0) {
          if (this.point >= td) {
            return true;
          } else {
            return false;
          }
        } else {
          if (this.point - 1 < tr) {
            return false;
          } else {
            return true;
          }
        }
      } else {
        if (tr === 0) {
          if (this.point >= td) {
            return true;
          } else {
            return false;
          }
        } else {
          if (this.point - this.totalPointInLine >= td) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    checkPointResiudal(tr, td) {
      if (tr === 0) {
        if (this.pointResiudal >= td) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.cssOnePoint {
  width: 20%;
  margin: 0 auto 49px;
}
.cssTwoPoint {
  width: 40%;
  margin: 0 auto 49px;
}
.cssThreePoint {
  width: 60%;
  margin: 0 auto 49px;
}
.cssFourPoint {
  width: 80%;
  margin: 0 auto 49px;
}
.container-stamp-cards {
  margin: 45px 20px 70px 20px;
  padding-top: 0;
  .stamp-cards {
    .title {
      background-color: #ffe9b8;
      margin: 0px -20px;
      padding: 10px 20px 10px 20px;
      margin-bottom: 18px;
      font-size: 18px;
    }
    .btn-confirm {
      clear: both;
      line-height: 40px;
      color: #3c0200;
      border-radius: 5px;
      border: 1px solid #3c0200;
      text-align: center;
      font-size: 17px;
      /* background: url(../images/icon-7.png) no-repeat 95%; */
    }
    .content-stamp {
      margin-bottom: 25px;
      font-size: 16px;
    }
    .content-note {
      color: #af9a69;
      margin-top: 20px;
      font-size: 14px;
    }
    .fw-bold {
      font-weight: 500;
      font-size: 21px;
    }
    .table-stamp {
      margin-bottom: 49px;
      th {
        border: 1px solid;
        padding: 10px;
      }
      td {
        border: 1px solid;
        width: 50%;
        padding: 15px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      .item-table {
        background: white;
        width: 20%;
        height: 74.5px;
        text-align: center;
      }
    }
    .coupon-control {
      margin-bottom: 20px;
    }
  }
}
</style>
