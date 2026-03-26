<template>
  <div class="hearder-authen" v-if="!offLogoHearder">
    <div class="logo-glico">
      <img v-if="layoutAuthLogin" src="@/assets/images/logo-glico.png" alt="" />
      <!-- <img v-else src="@/assets/images/logo-glico1.png" alt="" /> -->
    </div>
    <div
      :class="confirmationAddress ? 'logo-sunao-confirmation' : 'logo-sunao'"
    >
      <img src="@/assets/images/logo-home-x4.png" alt="" />{{ offLogoHearder }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    layoutAuthLogin: Boolean,
    confirmationAddress: Boolean,
    offLogoHearder: Boolean,
  },
};
</script>
<style lang="scss" scoped>
.hearder-authen {
  background: #fffcee;
  .logo-glico img {
    width: 73px;
    height: 48px;
    margin-top: 16px;
    margin-left: 24px;
  }
  .logo-sunao {
    display: flex;
    justify-content: center;
    text-align: center;
    img {
      position: absolute;
      top: 38px;
      width: 210px;
      height: 142px;
    }
  }
  .logo-sunao-confirmation {
    display: block;
    text-align: center;
    margin-top: 19px;
    img {
      width: 169px;
      height: 122px;
    }
  }
}
</style>
