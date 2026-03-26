<template>
  <div class="header header-layout">
    <div class="logo">
      <!-- <img src="@/assets/images/logo-glico1.png" alt="" class="logo-glico" /> -->
      <img
        src="@/assets/images/logo-store.png"
        alt=""
        class="logo-store"
        width="89px"
      />
    </div>
    <!-- <hr class="hr-border" /> -->
    <div v-if="pageName && !noHeader" class="title">
      <h1 class="pagename">
        <img
          v-if="pageNameLeftBtnRouter"
          @click="menuJump(pageNameLeftBtnRouter)"
          class="arrleft"
          src="../assets/images/arrow-l.svg"
          alt=""
        />
        <div class="page-name" v-if="!noHeader" :class="fw">{{ pageName }}</div>
        <div class="name-second" v-if="pageNameSecond">
          {{ pageNameSecond }}
        </div>
        <div class="hr-line" v-if="line"></div>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerBar",
  data() {
    return {};
  },
  props: {
    storeName: String,
    pageName: String,
    stepNo: String,
    stepName: String,
    leftBtnRouter: String,
    rightBtnRouter: String,
    pageNameLeftBtnRouter: String,
    pageNameSecond: String,
    back: Boolean,
    line: Boolean,
    fw: String,
    noHeader: Boolean,
  },
  mounted() {
    this.$router.afterEach(() => {
      window.scrollTo(0, 0);
    });
  },
  methods: {
    menuJump(routerUrl) {
      this.$router.push({ path: routerUrl });
    },
  },
};
</script>

<style lang="scss">
.header-layout {
  background: #fffcee;
  .logo {
    position: relative;
    padding: 10px;
    .logo-glico {
      width: 73px;
      height: 48px;
      position: absolute;
      top: 8px;
      left: 14px;
    }
    box-shadow: 0 0 4px #00000026;

    .hr-border {
      box-shadow: 0px 5px 5px 0px #f5f0da;
    }
  }
  .hr-line {
    height: 7px;
    background: #ffe9b8;
    margin-top: 9px;
  }
  .title {
    margin-top: 5px;
    .pagename {
      background: #fffcee;
    }
  }
  .change-store-btn {
    position: absolute;
    right: 0;
    top: 48px;
    margin: 8px 10px 8px;
    float: right;
    width: 42px;
    background-color: #fff;
    line-height: 20px;
    border-radius: 15px;
    border: 2px solid #c10230;
    color: #c10230;
    font-size: 12px;
    display: flex;
    justify-content: center;
  }
  .page-name {
    font-size: 19px;
    font-weight: 500;
    display: flex;
    justify-content: center;
  }
  .name-second {
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
