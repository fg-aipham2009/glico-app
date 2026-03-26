<template>
  <div>
    <HeaderBar
      :page-name="currentName"
      :pageNameSecond="pageNameSecond"
      :line="line"
      :fw="fw"
      :noHeader="noHeader"
      :mt="mt"
    />
    <div
      class="content bg-main color-main"
      :class="mt ? mt : currentName ? (noHeader ? 'mt-40' : 'mt-80') : 'mt-81'"
    >
      <router-view />
    </div>
    <tabBar :cssTitle="tabBarCssTitle" :checkCart="checkCart" />
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      currentName: null,
      pageNameSecond: null,
      line: null,
      fw: null,
      questionnaire: null,
      tabBarCssTitle: 0,
      noHeader: null,
      mt: null,
      checkCart: true,
    };
  },

  watch: {
    $route: {
      handler(to) {
        this.currentName = to.meta.title;
        this.pageNameSecond = to.meta.title_2;
        this.line = to.meta.line;
        this.fw = to.meta.fw;
        this.questionnaire = to.meta.questionnaire;
        this.noHeader = to.meta.noHeader;
        this.mt = to.meta.mt;
      },
      immediate: true,
    },
  },
  methods: {
    changeTabBarCss(cssTitle) {
      this.tabBarCssTitle = cssTitle;
    },
    changCart() {
      this.checkCart = !this.checkCart;
    },
  },
};
</script>
