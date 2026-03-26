<template>
  <div style="text-align: center">
    <p>※ユーザー認証に失敗しました。</p>
  </div>
</template>

<script>
export default {
  name: "autherror",
  mounted() {
    const t = this.$route.meta?.title;
    if (t) document.title = t;
  },
};
</script>
