<template>
  <div>
    <HeaderBar :store-name="storeName" page-name="オーダー" />
    <div class="container" style="margin: 140px 0 70px; padding-top: 0">
      <div class="orderpage">
        <div v-for="(item, index) in goodsList" :key="index" class="orderinfo">
          <div class="tradename">【商品 {{ index + 1 }}】</div>
          <ul class="info">
            <li>
              <span>商品名：{{ item.goodsName }}</span>
              <div
                style="margin-right: 10px"
                v-on:click="delGoods(index, item.goodsName)"
              >
                <div style="margin-top: 1px">
                  <img
                    src="@/assets/images/delete.svg"
                    alt=""
                    style="margin-top: 1px"
                  />
                </div>
              </div>
            </li>
            <li
              v-if="
                item.optionStep1 && Object.keys(item.optionStep1).length > 0
              "
            >
              <span>種類：{{ item.optionStep1.selectOptionGrpName }}</span>
              <span
                class="fw-b"
                v-if="item.optionStep1.selectOptionGrpPrice > 0"
                >￥{{ item.optionStep1.selectOptionGrpPrice | NumFormat }}</span
              >
            </li>
            <li
              v-if="
                item.optionStep2 && Object.keys(item.optionStep2).length > 0
              "
            >
              <span>甘さ：{{ item.optionStep2.selectOptionGrpName }}</span
              ><span class="fw-b"></span>
            </li>
            <li
              v-if="
                item.optionStep3 && Object.keys(item.optionStep3).length > 0
              "
            >
              <span>氷の量：{{ item.optionStep3.selectOptionGrpName }}</span>
              <span class="fw-b" v-if="item.optionStep3.selectOptionGrpPrice"
                >￥{{ item.optionStep3.selectOptionGrpPrice | NumFormat }}</span
              >
            </li>
            <div
              v-if="item.optionStep4"
              v-for="(items, indexs) in item.optionStep4"
              :key="indexs"
            >
              <li>
                <span
                  >トッピング{{ indexs + 1 }}：{{
                    items.selectOptionGrpName
                  }}</span
                ><span class="fw-b"
                  >￥{{ items.selectOptionGrpPrice | NumFormat }}</span
                >
              </li>
            </div>
            <li>
              <div class="dis-flex">
                <span>数量： </span>
                <select
                  v-model="item.num"
                  @change="selectFn($event)"
                  class="amount"
                >
                  <option v-for="num in 10" :value="num">{{ num }}</option>
                </select>
              </div>
              <span class="fw-b" v-if="item.goodsPrice && item.goodsPrice > 0"
                >￥{{ item.goodsPrice | NumFormat }}</span
              >
            </li>
          </ul>
        </div>
        <div class="common-w">
          <p v-if="!detailShowFlag" class="empty-message">
            注文リストに商品はありません。
          </p>
          <div class="com-addtrade">
            <router-link :to="{ path: '/goodsCategory' }"
              >+ 他の商品を追加する</router-link
            >
          </div>
        </div>
        <div v-if="detailShowFlag">
          <div class="comtitle">現在利用可能なクーポン</div>
          <div class="common-w border-w">
            <div class="coupon">
              <div class="c-left-coupon">
                <img src="@/assets/images/icon-8.svg" alt="" />
                <span
                  >ドリンクサービス
                  <span style="color: red"
                    >{{ totalGoodsCouponNum }}枚</span
                  ></span
                >
              </div>
              <div class="c-right">
                <span>使用枚数&nbsp;&nbsp;</span>
                <el-select
                  v-model="goodsCouponUseNum"
                  @change="checkGoodsNum(goodsCouponUseNum)"
                  :disabled="!goodsCouponNum > 0"
                  placeholder=""
                  clearable
                >
                  <el-option
                    v-for="num in goodsCouponNum"
                    :value="num"
                    :key="num"
                    >{{ num }}</el-option
                  >
                </el-select>
              </div>
            </div>
            <li v-if="errUsedGoodsCouponFlag" style="height: auto">
              <div class="errMsg">
                {{ errUsedGoodsCouponMsg }}
              </div>
            </li>
          </div>
          <div class="common-w border-w">
            <div class="coupon">
              <div class="c-left-coupon">
                <img src="@/assets/images/icon-6.svg" alt="" />
                <span
                  >トッピングサービス
                  <span style="color: red"
                    >{{ totalToppingCouponNum }}枚</span
                  ></span
                >
              </div>
              <div class="c-right">
                <span>使用枚数&nbsp;&nbsp;</span>
                <el-select
                  v-model="toppingCouponUseNum"
                  @change="checkToppingNum(toppingCouponUseNum)"
                  :disabled="!toppingCouponNum > 0"
                  clearable
                  placeholder=""
                >
                  <el-option
                    v-for="num in toppingCouponNum"
                    :value="num"
                    :key="num"
                    >{{ num }}</el-option
                  >
                </el-select>
              </div>
            </div>
            <li v-if="errUsedToppingCouponFlag" style="height: auto">
              <div class="errMsg">
                {{ errUsedToppingCouponMsg }}
              </div>
            </li>
          </div>
          <hr class="hr-set" />
          <div class="comtitle">受け取り時間を選択してください</div>
          <div class="common-w" style="margin-bottom: 20px; margin-top: 20px">
            <el-select class="receive_time" v-model="receiveTimeId">
              <el-option
                v-for="item in receiveTimeList"
                :key="item.dictionaryId"
                :value="item.dictionaryId"
                :label="item.name"
              />
            </el-select>
          </div>
          <div class="">
            <div class="comtitle">決済方法</div>
            <div class="method">
              <label class="radio">
                <input
                  v-model="payMethod"
                  type="radio"
                  value="credit"
                  checked="checked"
                />
                <div class="credit-label">
                  <img class="img" src="@/assets/images/creditcard.svg" />
                </div>
              </label>
              <!-- <label class="radio">
                <input v-model="payMethod" type="radio" value="paypay" />
                <div class="credit-label">
                  <img class="img" src="@/assets/images/paypay.svg" />
                </div>
              </label> -->
              <label class="radio">
                <input v-model="payMethod" type="radio" value="linepay" />
                <div class="credit-label">
                  <img class="img" src="@/assets/images/linepay.svg" />
                </div>
              </label>
              <!--              <label class="radio">-->
              <!--                <input v-model="payMethod" type="radio" value="merpay"/>-->
              <!--                <div class="credit-label">-->
              <!--                  <img class="img" src="@/assets/images/merpay.svg"/>-->
              <!--                </div>-->
              <!--              </label>-->
              <!--              <label class="radio">-->
              <!--                <input  v-model="payMethod" type="radio" value="5" />-->
              <!--                <div  class="credit-label">-->
              <!--                  <img class="img" src="@/assets/images/googlepay.svg" />-->
              <!--                </div>-->
              <!--              </label>-->
              <label class="radio">
                <input v-model="payMethod" type="radio" value="alipay" />
                <div class="credit-label">
                  <img class="img" src="@/assets/images/alipay.svg" />
                </div>
              </label>
              <label class="radio">
                <input v-model="payMethod" type="radio" value="unionpay" />
                <div class="credit-label">
                  <img class="img" src="@/assets/images/unionpay.svg" />
                </div>
              </label>
            </div>
          </div>
          <div class="choose-price">
            <p>
              ご注文小計： <span>￥{{ allMoney | NumFormat }}</span>
            </p>
          </div>
          <div class="common-w">
            <div
              v-if="isShowOrder"
              style="margin-top: 10px; margin-bottom: 10px"
              class="errMsg"
            >
              {{ errOrderMsg }}
            </div>
          </div>
          <div class="common-w" style="margin-top: 20px">
            <div
              :class="[isSubmit ? 'common-btn-disabled' : 'common-btn']"
              @click="subCart()"
            >
              <img src="@/assets/images/icon-2.svg" alt="" /> 注文
            </div>
          </div>
          <div class="mb70"></div>
        </div>
      </div>
    </div>
    <tab-bar cssTitle="2" />
    <el-dialog
      v-model="dialogVisible"
      width="90%"
      :close-on-click-modal="false"
      :show-close="false"
      class="dialog-css"
      center
    >
      <p class="dialog-p">商品を削除します</p>
      <p style="margin-bottom: 50px; font-size: 14px">
        選択した商品を注文リストから消去します
      </p>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="info" @click="dialogVisible = false"
            >キャンセル</el-button
          >
          <el-button type="danger" @click="delGoodsCommit()">OK</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dia_inquiry_visible"
      width="90%"
      :show-close="false"
      center
      class="dialog-css"
    >
      <template #footer>
        <span class="dialog-footer">
          <p style="font-size: 14px">お客様情報を登録してください。</p>
          <el-button
            type="info"
            size="small"
            class="pop_text"
            @click="dia_inquiry_visible = false"
            >キャンセル</el-button
          >
          <el-button
            type="danger"
            size="small"
            class="pop_text"
            @click="custominfo()"
            >OK</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "cart",

  data() {
    return {
      isSubmit: false,
      dia_inquiry_visible: false,
      goodsList: [],
      receiveTimeList: [],
      dialogVisible: false,
      delgoods: "",
      delgoodsIndex: 0,
      allMoney: 0,
      allMoneyNoUseCoupon: 0,
      priceSetting: 0,
      isShowOrder: false,
      loaded: false,
      ruleForm: {},
      couponList: [],
      couponCupList: [], //现在有的会员券
      couponMaterialList: [], //现在有的会员小料券
      goodsCouponNum: 0, //优惠券总数（商品）
      toppingCouponNum: 0, //优惠券总数（小料）
      errMsg: "",
      errOrderMsg: "",
      goodsCouponUseNum: "", //使用几张券
      toppingCouponUseNum: "", //使用几张小料券
      totalCouponMoney: 0, //商品一共优惠多少
      totalToppingMoney: 0, //小料一共优惠多少
      errUsedGoodsCouponMsg: "",
      errUsedToppingCouponMsg: "",
      errUsedGoodsCouponFlag: false,
      errUsedToppingCouponFlag: false,
      totalUsedCouponGoodsNum: 0, //购物车中能用券的商品总数
      totalUsedCouponToppingNum: 0, //购物车中能用券的小料总数
      receiveTimeId: "11",
      payMethod: "credit",
      taxRate: "",
      detailShowFlag: true,
      storeName: sessionStorage.getItem("storeName"),
      memberId: sessionStorage.getItem("memberId"),
      totalGoodsCouponNum: 0,
      totalToppingCouponNum: 0,
      goodsListSort: [],
      toppingListSortList: [],
    };
  },
  mounted() {
    this.getReceiveTimeList();
    this.getCartGoods();
    this.getCouponList();
    this.countMoney();
    this.getTaxRate();
  },
  methods: {
    getTaxRate() {
      let that = this;
      let params = {
        storeId: localStorage.getItem("storeId"),
      };
      this.$post("/mo/sysMStore/storeDetail", params).then((response) => {
        if (response.code == 200) {
          if (response.data) {
            that.taxRate = response.data.taxRate;
          }

          that.$forceUpdate();
        }
      });
    },
    //排序购物车能使用券的商品
    createGoodsListSort() {
      let that = this;
      that.goodsListSort = [];
      that.goodsList.forEach((item) => {
        item.goodsMoney = that.getGoodsAndToppingPrice(item);
        if (item.couponFlag && !that.isReuseGoods(item)) {
          that.goodsListSort.push(item);
        }
      });
      let a = that.goodsListSort;
      let b = {};
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - 1 - i; j++) {
          if (a[j].goodsMoney < a[j + 1].goodsMoney) {
            b = a[j];
            a[j] = a[j + 1];
            a[j + 1] = b;
          }
        }
      }
    },
    //排序购物车能用券的小料,生成集合()
    createToppingListSort() {
      let that = this;
      that.toppingListSortList = [];
      that.goodsList.forEach((drinkItem) => {
        // 商品数量
        let goodsNum = drinkItem.num;
        // 未使用饮品卷的商品数量（商品数 - 已使用饮品卷的商品数）
        let unusedGoodsNum = goodsNum - drinkItem.goodsCouponUseNum;
        if (unusedGoodsNum > 0) {
          if (drinkItem.optionStep4 && drinkItem.optionStep4.length > 0) {
            drinkItem.optionStep4.forEach((itemStep4) => {
              if (itemStep4.couponOptionFlag) {
                let randomNum = Number(
                  (Math.random() * 9 + 1) * 1000000000
                ).toFixed(0);
                itemStep4.randomNum = randomNum;

                let newObject = {
                  goodsId: drinkItem.goodsId,
                  num: drinkItem.num,
                  selectOptionGrpId: itemStep4.selectOptionGrpId,
                  selectOptionGrpPrice: itemStep4.selectOptionGrpPrice,
                  useToppingNum: 0,
                  randomNum: randomNum,
                };

                if (
                  drinkItem.optionStep1 &&
                  Object.keys(drinkItem.optionStep1).length > 0
                ) {
                  newObject.optionStep1 =
                    drinkItem.optionStep1.selectOptionGrpId;
                }
                if (
                  drinkItem.optionStep2 &&
                  Object.keys(drinkItem.optionStep2).length > 0
                ) {
                  newObject.optionStep2 =
                    drinkItem.optionStep2.selectOptionGrpId;
                }
                if (
                  drinkItem.optionStep3 &&
                  Object.keys(drinkItem.optionStep3).length > 0
                ) {
                  newObject.optionStep3 =
                    drinkItem.optionStep3.selectOptionGrpId;
                }
                that.toppingListSortList.push(newObject);
              }
            });
          }
        }
      });
      let c = that.toppingListSortList;
      let d = {};
      for (let i = 0; i < c.length; i++) {
        for (let j = 0; j < c.length - 1 - i; j++) {
          if (c[j].selectOptionGrpPrice < c[j + 1].selectOptionGrpPrice) {
            d = c[j];
            c[j] = c[j + 1];
            c[j + 1] = d;
          }
        }
      }
    },
    //1.计算商品一共多少钱 2.计算使用优惠券一共优惠多少钱
    countMoney() {
      let that = this;

      let tmpMoney = 0; //购物车商品和小料总价
      //1计算商品一共多少钱
      that.goodsList.forEach((item) => {
        item.goodsMoney = that.getGoodsAndToppingPrice(item);
        tmpMoney += item.goodsMoney * item.num;
      });
      //3 计算使用优惠券(小料)一共优惠多少钱
      that.allMoney = tmpMoney - that.totalCouponMoney - that.totalToppingMoney;
      that.allMoneyNoUseCoupon = tmpMoney;
      that.$forceUpdate();
    },
    getGoodsKey(item) {
      let goodsKey = item.goodsId;
      if (item.optionStep1 && Object.keys(item.optionStep1).length > 0) {
        goodsKey += "|" + item.optionStep1.selectOptionGrpId;
      }
      if (item.optionStep2 && Object.keys(item.optionStep2).length > 0) {
        goodsKey += "|" + item.optionStep2.selectOptionGrpId;
      }
      if (item.optionStep3 && Object.keys(item.optionStep3).length > 0) {
        goodsKey += "|" + item.optionStep3.selectOptionGrpId;
      }
      if (item.optionStep4 && item.optionStep4.length > 0) {
        item.optionStep4.forEach((toppingItem) => {
          goodsKey += "|" + toppingItem.selectOptionGrpId;
        });
      }

      return goodsKey;
    },
    getGoodsAndToppingPrice(item) {
      let goodsPrice = item.goodsPrice;

      if (item.optionStep1 && Object.keys(item.optionStep1).length > 0) {
        goodsPrice += item.optionStep1.selectOptionGrpPrice;
      }
      if (item.optionStep2 && Object.keys(item.optionStep2).length > 0) {
        goodsPrice += item.optionStep2.selectOptionGrpPrice;
      }
      if (item.optionStep3 && Object.keys(item.optionStep3).length > 0) {
        goodsPrice += item.optionStep3.selectOptionGrpPrice;
      }

      if (item.optionStep4 && item.optionStep4.length > 0) {
        item.optionStep4.forEach((toppingItem) => {
          goodsPrice += toppingItem.selectOptionGrpPrice;
        });
      }

      return goodsPrice;
    },
    isReuseGoods(item) {
      if (item.couponFlag) {
        if (item.optionStep4 && item.optionStep4.length > 0) {
          for (let i = 0; i < item.optionStep4.length; i++) {
            let toppingItem = item.optionStep4[i];
            if (toppingItem.toppingCouponUseNum) {
              return true;
            }
          }
        }
      }
      return false;
    },

    selectFn(e) {
      let that = this;
      let newCartGoods = sessionStorage.getItem("cartGoods");
      newCartGoods = JSON.parse(newCartGoods);
      newCartGoods.goodsList = that.goodsList;
      sessionStorage.setItem("cartGoods", JSON.stringify(newCartGoods));
      that.goodsCouponUseNum = "";
      that.toppingCouponUseNum = "";
      that.$forceUpdate();
      that.countMoney();
      that.checkGoodsNum(that.goodsCouponUseNum);
      that.checkToppingNum(that.toppingCouponUseNum);
      that.getCouponList();
    },
    delGoods(index, goodsName) {
      this.delgoods = goodsName;
      this.delgoodsIndex = index;
      this.dialogVisible = true;
    },
    //删除购物车物品
    delGoodsCommit() {
      let that = this;
      that.goodsList.splice(that.delgoodsIndex, 1);
      if (that.goodsList.length > 0) {
        that.isShowOrder = false;
        that.detailShowFlag = true;
      } else {
        that.isShowOrder = true;
        that.detailShowFlag = false;
      }
      that.goodsCouponUseNum = "";
      that.toppingCouponUseNum = "";
      that.getCartGoodsCanUseCouponNum();
      that.checkGoodsNum(that.goodsCouponUseNum);
      that.checkToppingNum(that.toppingCouponUseNum);

      let newCartGoods = sessionStorage.getItem("cartGoods");
      newCartGoods = JSON.parse(newCartGoods);
      newCartGoods.goodsList = that.goodsList;
      sessionStorage.setItem("cartGoods", JSON.stringify(newCartGoods));
      that.countMoney();
      that.getCouponList();
      that.dialogVisible = false;
    },
    custominfo() {
      let that = this;
      that.$router.push({
        name: "custominfo",
        query: {
          type: "2",
        },
      });
    },
    subCart() {
      if (this.isSubmit) {
        return;
      }
      this.isSubmit = true;
      let that = this;
      let openId = localStorage.getItem("openId");
      let params = {
        openId: openId,
      };
      that
        .$post("/customerinfo/getTPartnerUser", params)
        .then((response) => {
          console.log(response);
          if ((response.code = 200)) {
            if (that.goodsList.length > 0) {
              that.isShowOrder = false;
            } else {
              that.errOrderMsg = "リストには商品がありません。";
              that.isShowOrder = true;
              return;
            }
            if (that.errUsedGoodsCouponFlag || that.errUsedToppingCouponFlag) {
              return;
            }
            let oldGoods = sessionStorage.getItem("cartGoods");
            oldGoods = JSON.parse(oldGoods);
            let cartGoods = new Object();
            cartGoods.memberId = that.memberId;
            cartGoods.goodsCouponUseNum = that.goodsCouponUseNum;
            cartGoods.toppingCouponUseNum = that.toppingCouponUseNum;
            cartGoods.totalCouponMoney = that.totalCouponMoney;
            cartGoods.totalToppingMoney = that.totalToppingMoney;
            cartGoods.goodsList = that.goodsList;
            cartGoods.receiveTimeId = that.receiveTimeId;
            cartGoods.payMethod = that.payMethod;
            cartGoods.allMoney = that.allMoney;
            cartGoods.allMoneyNoUseCoupon = that.allMoneyNoUseCoupon;
            cartGoods.openId = localStorage.getItem("openId");
            if (oldGoods != null) {
              cartGoods.storeId = oldGoods.storeId;
              cartGoods.storeName = oldGoods.storeName;
            } else {
              cartGoods.storeId = localStorage.getItem("storeId");
              cartGoods.storeName = sessionStorage.getItem("storeName");
            }

            cartGoods.taxRate = that.taxRate;
            sessionStorage.setItem("cartGoods", JSON.stringify(cartGoods));
            console.log(JSON.stringify(cartGoods));
            if (response.data) {
              that.$router.push({
                name: "pay",
              });
            } else {
              this.dia_inquiry_visible = true;
            }
          } else {
            // request fail
            console.log("request fail", response.code, response.msg);
          }
        })
        .catch((err) => {
          // request error
          console.log(err);
        });
    },
    getCartGoods() {
      let that = this;
      let cartGoods = sessionStorage.getItem("cartGoods");
      if (cartGoods == null) {
        that.loaded = true;
        that.goodsList = [];
        that.detailShowFlag = false;
      } else {
        cartGoods = JSON.parse(cartGoods);
        that.goodsList = cartGoods.goodsList;
        that.isShowOrder = that.goodsList.length > 0;
        if (!that.isShowOrder) {
          that.detailShowFlag = false;
        }
        console.log(cartGoods);
        // that.countMoney();
        that.loaded = true;
      }
    },
    getCouponList() {
      let that = this;
      that.couponMaterialList = [];
      that.couponCupList = [];
      if (that.memberId) {
        let params = {
          memberId: that.memberId,
        };
        this.$post("/memberCoupon/couponList", params).then((response) => {
          that.couponList = response.data;
          that.couponList.forEach((item) => {
            if (item.couponType == 1) {
              that.couponMaterialList.push(item);
            } else {
              that.couponCupList.push(item);
            }
          });
          that.totalGoodsCouponNum = that.couponCupList.length; //一共持有券（饮品）
          that.totalToppingCouponNum = that.couponMaterialList.length; //一共持有券（小料）
          // 用户持有饮品卷
          that.goodsCouponNum = that.couponCupList.length;
          // 用户持有小料卷
          that.toppingCouponNum = that.couponMaterialList.length;
          that.calculationCouponNumAndToppingNum(
            that.goodsCouponNum,
            that.toppingCouponNum
          );

          window.scrollTo(0, 0);
        });
      } else {
      }
    },
    //计算会员券能使用个数(...)
    calculationCouponNumAndToppingNum(userCouponNum, userToppingCouponNum) {
      let that = this;
      that.getCartGoodsCanUseCouponNum();
      // 能用券的商品总数
      let totalUsedCouponGoodsNum = that.totalUsedCouponGoodsNum;
      // 能用卷的小料的数量
      let totalUsedCouponToppingNum = that.totalUsedCouponToppingNum;
      if (userCouponNum > 0) {
        if (totalUsedCouponGoodsNum <= userCouponNum) {
          that.goodsCouponNum = totalUsedCouponGoodsNum;
        }
      }
      if (userToppingCouponNum > 0) {
        if (totalUsedCouponToppingNum <= userToppingCouponNum) {
          that.toppingCouponNum = totalUsedCouponToppingNum;
        }
      }
    },

    //1.判断会员券（杯）数量是否大于输入数量、2.判断会员券最多能使用几张（也就是购物车里一共有多少商品能用会员券）
    checkGoodsNum(goodsCouponUseNum) {
      let that = this;
      //1.判断会员券（杯）数量
      if (goodsCouponUseNum > that.goodsCouponNum) {
        that.errUsedGoodsCouponMsg =
          "会员券不足，现有个数" + that.couponCupList.length;
        that.errUsedGoodsCouponFlag = true;
      } else {
        that.errUsedGoodsCouponFlag = false;
        //2.判断会员券最多能使用几张（也就是购物车里一共有多少商品能用会员券）
        if (goodsCouponUseNum > that.totalUsedCouponGoodsNum) {
          that.errUsedGoodsCouponFlag = true;
          if (that.goodsList.length > 0) {
            that.errUsedGoodsCouponMsg =
              "ドリンクサービス券は" +
              that.totalUsedCouponGoodsNum +
              "枚まで使えます。";
          } else {
            that.errUsedGoodsCouponMsg =
              "ドリンクを追加していないので、ドリンクサービス券は使えません。";
          }
        } else {
          that.errUsedGoodsCouponFlag = false;
          //1.1计算使用优惠券(商品)一共优惠多少钱
          that.calculateGoodsCouponMoney();
          // 重新设置可使用的小料卷数量
          that.reSetToppingCouponNum();
          that.countMoney();
        }
      }
    },

    //1.判断会员券（小料）数量是否大于输入数量、2.判断会员券最多能使用几张（也就是购物车里一共有多少小料能用会员券）
    checkToppingNum(toppingCouponUseNum) {
      let that = this;
      //1.判断会员券（小料）数量是否大于输入数量
      if (toppingCouponUseNum > that.toppingCouponNum) {
        that.errUsedToppingCouponFlag = true;
        that.errUsedToppingCouponMsg =
          "会员券(小料)不足，现有个数" + that.couponMaterialList.length;
      } else {
        that.errUsedToppingCouponFlag = false;
        //2.判断会员券能否被购物车商品使用

        if (toppingCouponUseNum > that.totalUsedCouponToppingNum) {
          that.errUsedToppingCouponFlag = true;
          if (that.goodsList.length > 0) {
            that.errUsedToppingCouponMsg =
              "トッピングサービス券は" +
              that.totalUsedCouponToppingNum +
              "枚まで使えます。";
          } else {
            that.errUsedToppingCouponMsg =
              "トッピングを追加していないので、トッピングサービス券は使えません。";
          }
        } else {
          that.errUsedToppingCouponFlag = false;
          that.calculateToppingCouponMoney();
          // 重新设置可使用的饮品卷数量
          that.reSetGoodsCouponNum();
          that.countMoney();
        }
      }
    },

    //方法一  计算当前goodsList中可以用券的商品的个数
    getCartGoodsCanUseCouponNum() {
      let that = this;
      // 能用券的商品总数
      let totalUsedCouponGoodsNum = 0;
      // 能用卷的小料的数量
      let totalUsedCouponToppingNum = 0;
      if (that.goodsList && that.goodsList.length > 0) {
        that.goodsList.forEach((drinkItem) => {
          drinkItem.goodsCouponUseNum = 0;
          drinkItem.totalCouponMoney = 0;
          drinkItem.reuse = false;
          if (drinkItem.couponFlag) {
            if (drinkItem.optionStep4 && drinkItem.optionStep4.length > 0) {
              let goodsUsedCouponToppingNum = 0;
              drinkItem.optionStep4.forEach((toppingItem) => {
                toppingItem.toppingCouponUseNum = 0;

                if (toppingItem.couponOptionFlag) {
                  goodsUsedCouponToppingNum += 1;
                }
              });
              // 计算可以使用小料卷的总数（可以使用小料卷数量(商品别) * 商品数）
              totalUsedCouponToppingNum +=
                goodsUsedCouponToppingNum * drinkItem.num;
            }
            // 计算可以使用饮品卷的总数
            totalUsedCouponGoodsNum += drinkItem.num;
          }
        });
      }
      that.totalUsedCouponToppingNum = totalUsedCouponToppingNum;
      that.totalUsedCouponGoodsNum = totalUsedCouponGoodsNum;
    },
    getReceiveTimeList() {
      let that = this;
      let params = {
        dictionaryType: "5",
      };
      this.$post("/dictionary/getDictionaryList", params).then((response) => {
        if (response.code == 200) {
          that.receiveTimeList = response.data;
          that.$forceUpdate();
        }
      });
    },
    calculateGoodsCouponMoney() {
      let that = this;
      let totalCouponMoney = 0;
      let account = 0;
      that.createGoodsListSort();
      that.goodsListSort.forEach((item) => {
        item.totalCouponMoney = 0;
        item.goodsCouponUseNum = 0;
        if (item.couponFlag) {
          if (that.goodsCouponUseNum > account) {
            let goodsPrice = that.getGoodsAndToppingPrice(item);
            if (item.num + account > that.goodsCouponUseNum) {
              item.goodsCouponUseNum = that.goodsCouponUseNum - account;
              item.totalCouponMoney = goodsPrice * item.goodsCouponUseNum;
              account = that.goodsCouponUseNum;
            } else {
              item.goodsCouponUseNum = item.num;
              item.totalCouponMoney = goodsPrice * item.num;
              account += item.num;
            }
            totalCouponMoney += item.totalCouponMoney;
          }
        }
      });
      //1.2把优惠券数量和优惠金额赋值给goodsList
      that.goodsList.forEach((item) => {
        let goodsKey = that.getGoodsKey(item);
        that.goodsListSort.forEach((itemStep4) => {
          let goodsSortKey = that.getGoodsKey(itemStep4);
          if (goodsKey == goodsSortKey) {
            item.totalCouponMoney = itemStep4.totalCouponMoney;
            item.goodsCouponUseNum = itemStep4.goodsCouponUseNum;
          }
        });
      });
      that.totalCouponMoney = totalCouponMoney;
      return totalCouponMoney;
    },
    calculateToppingCouponMoney() {
      let that = this;
      let totalToppingMoney = 0;
      let toppingCouponNum = 0;
      that.createToppingListSort();

      that.toppingListSortList.forEach((item) => {
        if (that.toppingCouponUseNum > toppingCouponNum) {
          if (that.toppingCouponUseNum >= item.num + toppingCouponNum) {
            item.useToppingNum = item.num;
            toppingCouponNum = toppingCouponNum + item.num;
          } else {
            item.useToppingNum = that.toppingCouponUseNum - toppingCouponNum;
            toppingCouponNum = that.toppingCouponUseNum;
          }
          totalToppingMoney += item.useToppingNum * item.selectOptionGrpPrice;
        }
      });
      //2.2 把使用券和小料关联上
      that.goodsList.forEach((drinkItem) => {
        // 商品数量
        let goodsNum = drinkItem.num;
        // 未使用饮品卷的商品数量（商品数 - 已使用饮品卷的商品数）
        let unusedGoodsNum = goodsNum - drinkItem.goodsCouponUseNum;
        if (unusedGoodsNum > 0) {
          if (drinkItem.optionStep4.length > 0) {
            drinkItem.optionStep4.forEach((itemStep4) => {
              itemStep4.toppingCouponUseNum = 0;
              that.toppingListSortList.forEach((itemTop) => {
                if (
                  drinkItem.goodsId == itemTop.goodsId &&
                  itemStep4.selectOptionGrpId == itemTop.selectOptionGrpId &&
                  itemStep4.randomNum == itemTop.randomNum &&
                  itemTop.useToppingNum > 0
                ) {
                  itemStep4.toppingCouponUseNum = itemTop.useToppingNum;
                }
              });
            });
          }
        }
      });
      that.totalToppingMoney = totalToppingMoney;
      return totalToppingMoney;
    },
    reSetToppingCouponNum() {
      let that = this;
      let isGoodsCouponClear = !that.goodsCouponUseNum;
      let totalUsedCouponToppingNum = 0;
      let userToppingCouponNum = that.couponMaterialList.length;
      that.goodsList.forEach((drinkItem) => {
        // 商品数量
        let goodsNum = drinkItem.num;
        if (isGoodsCouponClear) {
          drinkItem.goodsCouponUseNum = 0;
        }
        let goodsCouponUseNum = drinkItem.goodsCouponUseNum
          ? drinkItem.goodsCouponUseNum
          : 0;
        // 未使用饮品卷的商品数量（商品数 - 已使用饮品卷的商品数）
        let unusedGoodsNum = goodsNum - goodsCouponUseNum;

        // 还有可以使用饮品卷商品
        if (unusedGoodsNum > 0) {
          if (drinkItem.optionStep4 && drinkItem.optionStep4.length > 0) {
            let goodsUsedCouponToppingNum = 0;
            for (let i = 0; i < drinkItem.optionStep4.length; i++) {
              let toppingItem = drinkItem.optionStep4[i];
              // 小料可以使用卷
              if (toppingItem.couponOptionFlag) {
                // 小料未被使用过卷
                if (!toppingItem.toppingCouponUseNum) {
                  goodsUsedCouponToppingNum += 1;
                  if (goodsUsedCouponToppingNum > userToppingCouponNum) {
                    break;
                  }
                }
              }
            }
            // 计算可以使用小料卷的总数（可以使用小料卷数量(商品别) * 未使用饮品卷的商品数量）
            totalUsedCouponToppingNum +=
              goodsUsedCouponToppingNum * unusedGoodsNum;
          }
        } else {
          // 无可使用饮品卷商品，不做处理（饮品卷可抵消所有小料价格）
        }
      });
      that.toppingCouponNum =
        userToppingCouponNum > totalUsedCouponToppingNum
          ? totalUsedCouponToppingNum
          : userToppingCouponNum;
    },
    reSetGoodsCouponNum() {
      let that = this;
      let isToppingCouponClear = !that.toppingCouponUseNum;
      let userGoodsCouponNum = that.couponCupList.length;
      // 能用券的商品总数
      let totalUsedCouponGoodsNum = 0;
      let totalReuseCouponGoodsNum = 0;
      that.goodsList.forEach((drinkItem) => {
        if (drinkItem.couponFlag) {
          // 计算可以使用饮品卷的总数
          totalUsedCouponGoodsNum += drinkItem.num;
        }
        if (isToppingCouponClear) {
          drinkItem.reuse = false;
        }
        if (drinkItem.optionStep4 && drinkItem.optionStep4.length > 0) {
          for (let i = 0; i < drinkItem.optionStep4.length; i++) {
            let toppingItem = drinkItem.optionStep4[i];
            // 小料可以使用卷
            if (toppingItem.couponOptionFlag) {
              // 小料已使用过卷
              if (
                toppingItem.toppingCouponUseNum &&
                toppingItem.toppingCouponUseNum > 0
              ) {
                if (isToppingCouponClear) {
                  toppingItem.toppingCouponUseNum = 0;
                } else {
                  if (drinkItem.couponFlag) {
                    if (drinkItem.reuse) {
                      totalReuseCouponGoodsNum++;
                      break;
                    } else {
                      drinkItem.reuse = true;
                      totalReuseCouponGoodsNum++;
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      });
      if (isToppingCouponClear) {
        that.goodsCouponNum =
          userGoodsCouponNum > totalUsedCouponGoodsNum
            ? totalUsedCouponGoodsNum
            : userGoodsCouponNum;
      } else {
        let newUsedCouponGoodsNum =
          totalUsedCouponGoodsNum > totalReuseCouponGoodsNum
            ? totalUsedCouponGoodsNum - totalReuseCouponGoodsNum
            : 0;
        that.goodsCouponNum =
          userGoodsCouponNum > newUsedCouponGoodsNum
            ? newUsedCouponGoodsNum
            : userGoodsCouponNum;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.receive_time {
  width: calc(100% - 40px);
  margin: 0 20px;
}

.receive_time :deep(.el-input__inner) {
  border: 1px solid #933639;
  height: 25px;
  border-radius: 13px;
  line-height: 25px;
}

.receive_time :deep(.el-input__icon) {
  line-height: 25px;
}

.c-right {
  text-align: right;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.c-right span {
  display: inline-block;
}

.c-right .el-select {
  width: 63px;
}

.errMsg {
  color: Red;
  font-size: 13px;
  margin-top: -10px;
  margin-bottom: 10px;
}

.select_num {
  width: 150px;
  height: 32px;
  border: 1px solid #bbb;
  font-size: 0.75rem;
  padding: 0 5px;
}

.method {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 5px 0 5px;
}

.method label {
  position: relative;
  width: calc(100% / 3);
  height: 50px;
  text-align: center;
}

.method label input {
  visibility: hidden;
}

.method label .credit-label {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
}

.method label .credit-label img {
  border-radius: 10px;
  display: block;
}

.method label input:checked + .credit-label {
  /*position: relative;*/
}

.method label input + .credit-label:before {
  content: "";
  width: 100%;
  height: 100%;
  /*background-color: rgba(220, 237, 231, 0.6);*/
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.method label input:checked + .credit-label:before {
  content: "";
  width: 100%;
  height: 100%;
  /*background-color: rgba(220, 237, 231, 0.6);*/
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  border: 2px solid #c32032;
}

.spacing {
  padding: 0 20px;
  margin-top: 10px;
}

.pop_text {
  margin-top: 30px;
  width: 45%;
}

.pop_text.el-button--danger {
  background-color: #c32032;
  border-color: #c32032;
}

.hr-set {
  margin-bottom: 8px;
  border: 0;
  border-top: 1px solid #eae9e8;
}

.empty-message {
  margin-left: 20px;
  font-weight: bold;
  margin-top: 20px;
  padding-top: 5px;
}

:deep(.dialog-css .dialog-footer .el-button--danger) {
  color: #fff;
  background-color: #c10230;
  border-color: #c10230;
  border-radius: 0 0 6px 0;
}

:deep(.dialog-css .dialog-footer .el-button--info) {
  color: #fff;
  background-color: #a8a8a8;
  border-color: #a8a8a8;
  border-radius: 0 0 0 6px;
}

:deep(.dialog-css .el-dialog__footer) {
  padding: 0;
}

:deep(.dialog-css .dialog-footer) {
  width: 100%;
  font-size: 0;
}

:deep(.dialog-css .dialog-footer .el-button + .el-button) {
  margin-left: 0;
}

:deep(.dialog-css .dialog-footer .el-button) {
  width: 50%;
  border: 0;
  padding: 16px 20px;
}

.dialog-p {
  color: #c10230;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
}
.border-w {
  margin: 0 5px 0 5px;
}
</style>
