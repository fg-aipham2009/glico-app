<template>
  <div id="app">
    <router-view />
    <Loading
      v-show="currentName === '注文確認' && isLoading"
    />
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useCommonStore } from "@/stores/common";
import Loading from "@/components/Loading.vue";

export default {
  name: "App",
  components: { Loading },
  data() {
    return {
      currentName: null,
    };
  },
  computed: {
    ...mapState(useCommonStore, ["isLoading"]),
  },
  watch: {
    $route() {
      this.currentName = this.$route.meta.title;
    },
  },
};
</script>

<style lang="scss">
#app {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  height: 100vh;
}
body, html {
  touch-action: manipulation;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
}
.el-scrollbar {
  > .el-scrollbar__bar {
    opacity: 1 !important;
  }
}
</style>
