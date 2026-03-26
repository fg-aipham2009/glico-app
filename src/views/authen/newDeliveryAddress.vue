<template>
  <div class="new-delivery-address">
    <p class="title">受取先を選択してください</p>
    <div class="shipping">
      <p class="fw-b">受取先</p>
      <div class="btn-ship" @click="openRegister()">
        <div class="arrow-right"></div>
        <p class="pa-14">{{ nameCompany() }}</p>
      </div>
      <p class="change-add-ship">
        受取先を変更したい場合は <br />
        専用のQRコードを読みこんでください
      </p>
      <p class="orange-text change-add-ship fs13">
       ※注文受付時間<br/>前日13時〜当日9時まで
      </p>
    </div>
  </div>
</template>
<script>
import apiStore from "@/api/store.js"
import getOpenId from "@/mixins/getOpenId"

export default {
  mixins: [
    getOpenId
  ],
  data () {
    return {
      openId: '',
      resDataStore: {}
    }
  },
  async created() {
    await this.checkOpenId()
  },
  methods: {
    async openRegister() {
      await this.saveAccessLogFunc()
      this.$router.push({ name: "register" });
    },
    nameCompany() {
      const data = JSON.parse(localStorage.getItem("storeData"));
      if (data) {
        this.resDataStore = data
        return data.storeName;
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
        let msgError = error.response.data.msg
        this.$message.error(msgError)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.new-delivery-address {
  color: #3c0200;
  text-align: center;
  padding: 12px;
  margin-top: 246px;
  border: 1px solid #3c0200;
  border-radius: 20px;
  background: #fff;
  font-size: 18px;
  .fs13 {
    font-size: 13px !important;
  }
  .pa-14 {
    padding: 14%;
  }
  .shipping {
    margin-top: 21px;
    .btn-ship {
      cursor: pointer;
      margin-top: 8px;
      margin-bottom: 31px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      height: 55px;
      width: 100%;
      background: #3c0200;
      color: #fff;
      position: relative;
      font-size: 16px;

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
    }
    .change-add-ship {
      font-size: 14px;
    }
  }
}
</style>