<template>
  <div>
    <div class="container-register-information">
      <div class="orderName mb-25">
        <img
          v-if="userImg"
          :src="userImg"
          alt=""
          width="40px"
          class="mr-8 border-radius-20"
        />
        <img
          v-else
          src="@/assets/images/icon-account.png"
          alt=""
          width="31px"
          class="mr-8"
        />
        <div>{{ userName }} さん</div>
      </div>
      <div class="mypage">
        <div class="register-information">
          <div class="title">お名前</div>
          <div class="content-register">{{ transData.personName }}</div>

          <div class="title">お電話番号</div>
          <div class="content-register">{{ transData.userPhone }}</div>

          <div class="title">メールアドレス</div>
          <div class="content-register">{{ transData.userMail }}</div>

          <div class="title">生年月日</div>
          <div class="content-register">{{ transData.birthday }}</div>

          <div class="title">性別</div>
          <div class="content-register">{{ sex(transData.sex) }}</div>
          <div class="btn-confirm fw-m" @click="openEdit()">登録情報の編集</div>
        </div>
      </div>
    </div>
    <!-- <tab-bar cssTitle="3" /> -->
  </div>
</template>

<script>
export default {
  name: "registerInformation",
  data() {
    return {
      userImg: "",
      userName: "",
      transData: {
        openId: "",
        userId: "",
        personName: "",
        userPhone: "",
        userMail: "",
        birthday: "",
        sex: "",
        userName: "",
        userImg: "",
      },
    };
  },

  mounted() {
    this.$parent.changeTabBarCss(4);
    this.getUser();
    this.getInfo();
  },

  methods: {
    getUser() {
      let data = JSON.parse(sessionStorage.getItem("userinfo"));
      if (data) {
        this.userName = data.nickName;
        this.userImg = data.avatarUrl;
      }
    },
    getInfo() {
      const openId = localStorage.getItem("openId");
      this.$post("/customerinfo/getTPartnerUser", { openId: openId })
        .then((response) => {
          if (response.code === 200 || response.code === "200") {
            if (response.data) {
              this.transData = response.data;
              // this.transData.birthday = response.data.birthday.replaceAll('/', '')
            }
          } else {
            // request fail
            console.log("request fail", response.code, response.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err.response?.data?.msg || "ERROR");
        });
    },
    openEdit() {
      // this.transData.birthday = this.transData.birthday.replaceAll("/", "");
      sessionStorage.setItem("information", JSON.stringify(this.transData));
      this.$router.push({ name: "edit-register-information" });
    },
    sex(sex) {
      let value = "";
      switch (sex) {
        case "1":
          value = "男性";
          break;
        case "2":
          value = "女性";
          break;
        case "3":
          value = "その他";
          break;
        case "4":
          value = "回答しない";
          break;
      }
      return value;
    },
  },
};
</script>

<style scoped lang="scss">
.border-radius-20 {
  border-radius: 20px;
}
.container-register-information {
  margin: 66px 20px 26px 24px;
  padding-top: 0;
  .title {
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 17px;
  }
  .content-register {
    margin-bottom: 23px;
    font-size: 20px;
  }
  .orderName {
    font-size: 18px;
    margin: 0px -20px 0px -24px;
    background: #3c0200;
    height: 57px;
    color: #ffffff;
    display: flex;
    align-items: center;
    padding: 12px;
    padding-left: 24px;
    margin-bottom: 20px;
    .mr-8 {
      margin-right: 8px;
    }
  }
}
</style>
