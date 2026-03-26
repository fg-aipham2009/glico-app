<template>
  <div class="authen">
    <hearderAuthen
      v-if="!authLayout"
      :layoutAuthLogin="layoutAuthLogin"
      :confirmationAddress="confirmationAddress"
      :noHeader="noHeader"
      :offLogoHearder="offLogoHearder"
    />
    <HeaderBar v-else :page-name="currentName" :noHeader="noHeader"/>
    <div
      class="content bg-main color-main"
      :class="currentName ? (noHeader ? 'mt40' : 'mt-80') : ''"
    >
      <router-view />
    </div>
    <!-- <tabBar cssTitle="1" /> -->
  </div>
</template>

<script>
import hearderAuthen from "@/views/authen/hearderAuthen.vue";

export default {
  components: {
    hearderAuthen,
  },
  data() {
    return {
      currentName: null,
      authLayout: false,
      layoutAuthLogin: false,
      confirmationAddress: false,
      noHeader: null,
      offLogoHearder: null,
    };
  },

  watch: {
    $route: {
      handler(to) {
        this.layoutAuthLogin = to.meta.authLayoutLogin;
        this.confirmationAddress = to.meta.confirmationAddress;
        this.authLayout = to.meta.authLayout;
        this.currentName = to.meta.title;
        this.noHeader = to.meta.noHeader;
        this.offLogoHearder = to.meta.offLogoHearder;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="scss">
.authen {
  .content {
    padding: 0 24px;
  }
}
</style>
