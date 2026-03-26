import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setLoading(flag) {
      this.isLoading = flag;
    },
  },
});
