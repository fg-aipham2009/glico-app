<template>
  <div class="confirmation-delivery">
    <div class="img-confirm">
      <img src="@/assets/images/0713_haiso_moji.png" width="100%" />
    </div>
    <div class="new-delivery-address">
      <p class="title">受取先を選択してください</p>
      <div class="shipping">
        <p class="fw-b">受取先</p>
        <div class="btn-ship fw-b" id="button-store" @click="canRedirect ? openOrder(): handleDisplayListStore()">
          <div class="left-container">
            <div class="padding-14 storename">{{ storeName }}</div>
          </div>
          <div 
            class="right-container"
          >
            <div v-if="!canRedirect" class="arrow-show-list">
              <img src="@/assets/images/arrow-list.svg" alt="arrow">
            </div>
            <div v-else class="arrow-redirect">
              <img src="@/assets/images/arrow-redirect.svg" alt="arrow">
            </div>
          </div>
          <div v-show="showList" class="list-store" :class="showList ? 'active' : 'inactive'">
            <div class="list-store-container">
              <div 
                v-for="store in listStoreRecently"
                :key="store.storeId"
                class="list-store-container__item"
                @click.stop="chooseStore(store)"
                :style="setBorderColor(store)"
              >
                {{ store.storeName }}
              </div>
              <div class="list-store-container__item_empty"></div>
            </div>
          </div>
        </div>
        <p class="change-add-ship">
          受取先を変更したい場合は <br />
          専用のQRコードを読みこんでください
        </p>
        <p class="orange-text change-add-ship fs-13 fw-m">
          ※注文受付時間<br/>前日13時〜当日9時まで
        </p>
      </div>
    </div>
    <img src="@/assets/images/sunao_top_obento.png" width="100%" />
  </div>
</template>

<script>
import apiStore from "@/api/store.js"
import getOpenId from "@/mixins/getOpenId"

export default {
  mixins: [
    getOpenId
  ],
  data() {
    return {
      storeName: '',
      showList: false,
      openId: '',
      listStoreRecently: [],
      storeId: '',
      storeData: '',
      queryStoreId: '',
      canRedirect: false,
      resDataStore: {}
    };
  },
  async created() {
    await this.checkOpenId()
  },
  mounted () {
    if (localStorage.getItem('cartGoods')) {
      localStorage.removeItem('cartGoods')
    }
    this.checkScanQR()
    // this.nameCompany()
  },
  methods: {
    checkScanQR () {
      this.queryStoreId = this.$route.query.storeId
      if (!this.queryStoreId) {
        this.getListStoreRecently()
      } else {
        this.storeId = this.queryStoreId
        this.nameCompany()
        this.canRedirect = true
      }
    },
    setBorderColor (store) {
      return store.storeColor ? `border-color: ${store.storeColor}; color: ${store.storeColor}` : 'border-color: #3c0200'
    },
    async getListStoreRecently() {
      try {
        const res = await apiStore.getStoreDropDownList(this.openId)
        this.listStoreRecently = res.data
        if (this.listStoreRecently.length > 0) {
          this.storeName = this.listStoreRecently[0].storeName
          this.storeId = this.listStoreRecently[0].storeId
          if (this.listStoreRecently.length === 1) {
            this.setBackGroundColor(this.listStoreRecently[0])
            this.canRedirect = true
          }
        } else {
          this.storeId = localStorage.getItem('storeId')
          this.nameCompany()
          this.canRedirect = true
        }
      } catch (error) {
        const msgError = error.response?.data?.msg || "Error";
        this.$message.error(msgError);
      }
    },
    handleDisplayListStore () {
      this.showList = !this.showList
    },
    chooseStore (store) {
      this.setBackGroundColor(store)
      this.canRedirect = true
      this.storeId = store.storeId
      this.storeName = store.storeName
      this.showList = false
    },
    setBackGroundColor(store) {
      const btnStoreEle = document.querySelector('#button-store')
      btnStoreEle.style.background = store.storeColor ? store.storeColor : '#3c0200'
    },
    async openOrder() {
      await this.getSysMStore()
      await this.saveAccessLogFunc()
      this.$router.push({ name: "order" })
    },
    nameCompany() {
      if (localStorage.getItem("storeData")) {
        this.storeData = JSON.parse(localStorage.getItem("storeData"));
        this.setBackGroundColor(this.storeData)
        this.storeName = this.storeData.storeName
      } else if (this.storeId) {
        this.getSysMStore()
      }
    },
    async saveAccessLogFunc () {
      try {
        let params = {
          openId: this.openId,
          storeId: this.resDataStore.storeId,
          storeName: this.resDataStore.storeName,
          storeColor: this.resDataStore.storeColor
        }
        await apiStore.saveAccessLog(params)
      } catch (error) {
        const msgError = error.response?.data?.msg || "Error";
        this.$message.error(msgError);
      }
    },
    async getSysMStore () {
      try {
        let param = {
          storeId: this.storeId
        }
        const res = await this.$post("/mo/sysMStore/getSysMStore", param)
        this.resDataStore = res.data
        localStorage.setItem("storeId", this.resDataStore.storeId)
        sessionStorage.setItem("storeName", this.resDataStore.storeName)
        localStorage.setItem("storeData", JSON.stringify(this.resDataStore))
        this.setBackGroundColor(this.resDataStore)
      } catch (error) {
        const msgError = error.response?.data?.msg || "Error";
        this.$message.error(msgError);
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.confirmation-delivery {
  .storename {
  font-size: clamp(0.75rem, -0.101rem + 4.26vw, 1rem);
  }
  .text {
    margin: 20px auto;
    line-height: 2;
    letter-spacing: 3px;
    font-size: 15px;
    writing-mode: vertical-rl;
    margin-top: 12px;
    margin-bottom: 16px;
    height: 200px;
    align-items: center;
    display: flex;
  }
  .img-confirm {
    margin-left: -24px;
    margin-right: -24px;
  }
  .new-delivery-address {
    color: #3c0200;
    text-align: center;
    padding: 12px;
    // margin-bottom: 40px;
    border: 1px solid #3c0200;
    border-radius: 20px;
    background: #fff;
    font-size: 18px;
    .shipping {
      margin-top: 21px;
      .btn-ship {
        cursor: pointer;
        margin-top: 8px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: left;
        border-radius: 999px;
        height: 55px;
        width: 100%;
        background: #3c0200;
        color: #fff;
        position: relative;
        font-size: 16px;
        .padding-14 {
          padding: 4% 0 4% 4%;
        }
        .arrow-right {
          position: absolute;
          top: 50%;
          left: 20px;
          width: 0;
          height: 0;
          transform: translate(0, -50%);
          border-top: 9px solid transparent;
          border-bottom: 9px solid transparent;

          border-left: 15px solid #ffffff;
        }
        .left-container {
          width: calc(100% - 40px);
        }
        .right-container {
          height: 100%;
          width: 40px;
          position: absolute;
          z-index: 6;
          right: 0px;
          .arrow-show-list {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              rotate: 90deg;
              margin-right: 4px;
              margin-top: 4px;
            }
          }
          .arrow-redirect {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              margin-right: 4px;
            }
          }
        }
        .list-store {
          background: rgba(0, 0, 0, 0);
          position: absolute;
          z-index: 4;
          width: 100%;
          min-height: 60px;
          top: 27px;
          border-right: 3px solid #3c0200;
          border-left: 3px solid #3c0200;
          border-bottom: 3px solid #3c0200;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          &-container {
            background: #ffffff;
            margin-top: 39px;
            height: 100%;
            &__item {
              height: 43px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 3px solid;
              margin: 0px 9px 10px;
              border-radius: 999px;
              padding: 5px 8px;
              font-size: 14px;
              color: #3c0200;
            }
            &__item_empty {
              height: 1px;
            }
          }
        }
      }
      .change-add-ship {
        font-size: 14px;
      }
    }
  }
}
</style>