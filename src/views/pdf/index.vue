<template>
  <div>
    <!-- <iframe :src="url" height="700px" width="100%"></iframe> -->
  </div>
</template>
<script>
import moment from "moment";

export default {
  data() {
    return {
      pathname: "",
      search: "",
      url: "",
    };
  },
  created() {
    this.getUrlpdf();
  },
  methods: {
    getUrlpdf() {
      this.pathname = this.$route.params.id || "";
      if (!this.pathname) {
        this.$message.error("パラメータが不正です");
        return;
      }
      if (this.pathname === "thismonth") {
        this.pathname = moment().format("YYYYMM");
      } else if (this.pathname === "nextmonth") {
        this.pathname = moment().add(1, "month").format("YYYYMM");
      }
      this.$post("/goodsMonth/goodsMonthById/" + this.pathname)
        .then((response) => {
          const url = response?.data?.monthUrl;
          if (!url) {
            this.$message.error("PDFが見つかりません");
            return;
          }
          window.open(url, "_self");
        })
        .catch((err) => {
          this.$message.error(err.response?.data?.msg || "ERROR");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
