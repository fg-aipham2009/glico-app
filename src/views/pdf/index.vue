<template>
  <div>
    <!-- <iframe :src="url" height="700px" width="100%"></iframe> -->
  </div>
</template>
<script>
import moment from 'moment';
export default {
  created() {
    this.getUrlpdf();
  },
  data() {
    return {
      pathname: "",
      search: "",
      url: "",
    };
  },
  methods: {
    getUrlpdf() {
      this.pathname = window.location.pathname.slice(5)
      if (this.pathname == 'thismonth') {
        this.pathname = moment().format('YYYYMM');
      } else if(this.pathname == 'nextmonth'){
        this.pathname = moment().add(1, 'month').format('YYYYMM');
      }
      this.$post("/goodsMonth/goodsMonthById/" + this.pathname).then(
        (response) => {
          // setTimeout(() => {
          //   this.url = response.data.monthUrl;
          // });
          window.open(response.data.monthUrl, "_self");
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
</style>