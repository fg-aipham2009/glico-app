<template>
  <div>
    <!-- <HeaderBar page-name="マイページ" /> -->
    <!--content start-->
    <div class="">
      <div class="mypage">
        <div class="accountname">
          <img
            v-if="userinfo.avatarUrl"
            :src="userinfo.avatarUrl"
            alt=""
            width="61px"
            class="avatar-url"
          />
          <img
            v-else
            src="@/assets/images/icon-account.png"
            alt=""
            width="61px"
          />
          <p class="nick-name">
            <span>{{ userinfo.nickName }} さん</span>
          </p>
        </div>
        <ul class="pagelist fw-m">
          <li @click="menuJump('order-history')">
            <span>注文履歴</span>
          </li>
          <li @click="menuJump('register-information')">
            <span>登録情報</span>
          </li>
          <!-- <li @click="menuJump('stamp-cards')">
            <span>スタンプカード・クーポン</span>
          </li> -->
        </ul>
      </div>
    </div>
    <!-- <tab-bar cssTitle="4" /> -->
  </div>
</template>
<script>
export default {
  name: "mypage",
  components: {},
  data() {
    return {
      //title
      title: "マイページ",
      // 用户信息
      userinfo: {
        // 授权用户ID
        userinfoId: "",
        // 店铺ID
        storeId: "",
        // 用户OPENID
        openId: "",
        // 用户昵称
        nickName: "",
        // 性别
        gender: "",
        // LINE头像URL
        avatarUrl: "",
        // User ID
        userId: "",
      },
      storeId: localStorage.getItem("storeId"),
    };
  },

  beforeUnmount() {
    this.$parent.changeTabBarCss(0);
  },

  mounted() {
    //页面加载初始化
    this.getUserAuthInfo();
    this.$parent.changeTabBarCss(4);
  },
  methods: {
    // 获取授权人信息
    getUserAuthInfo() {
      let that = this;
      var openId = localStorage.getItem("openId");
      var params = {
        openId: openId,
      };
      that
        .$post("/mypage/getUserAuthInfo", params)
        .then((response) => {
          if (response.code === 200) {
            if (response.data) {
              this.userinfo = {
                // 授权用户ID
                userinfoId: response.data.userinfoId,
                // 店铺ID
                storeId: response.data.storeId,
                // 用户OPENID
                openId: response.data.openId,
                // 用户昵称
                nickName: response.data.nickName,
                // 性别
                gender: response.data.gender,
                // LINE头像URL
                avatarUrl: response.data.avatarUrl,
                // User ID
                userId: response.data.userId,
              };
              //存储用户信息到sessionStorage
              sessionStorage.setItem("userinfo", JSON.stringify(this.userinfo));
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
    // 菜单页面跳转
    menuJump(url) {
      this.$router.push({ name: url });
    },
  },
};
</script>
<style scoped lang="scss">
.mypage .pagelist {
  min-height: calc(100vh - 498px);
  background-color: #fffcee !important;
  li {
    background-color: #ff7101 !important;
    color: white;
  }
}
.mypage {
  margin-top: 50px;
  .accountname {
    margin-top: 66px;
    text-align: center;
    .avatar-url {
      border-radius: 50%;
    }
  }
  .nick-name {
    font-size: 18px;
    margin-bottom: 18px;
    height: 26px;
  }
}
</style>
