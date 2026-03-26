<template>
  <div class="extbrowser-container">
    <p>
      この機能を利用するにはLINEアプリで<br/>
      ミニアプリを開く必要があります。
    </p>
    <div class="line-top-button">
      <button class="btn btn-outline-green button mb-150" @click="openLine">
        LINEアプリで開く
      </button>
    </div>
  </div>
</template>
<script>
  export default {
  name: 'extbrowser',
    data() {
      return {
         appUrl: process.env.VUE_APP_LIFF_ID,
      }
    },
    mounted() {
    },
    methods: {
      openLine(){
        window.location.href = "https://miniapp.line.me/" + this.appUrl;
      }
    }
  }
</script>

<style>
body, html {
  background-color: #ffffff;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.extbrowser-container {
  background-color: #ffffff;
  height: 78vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Noto Sans JP';
  font-size: 18px;
  overflow: hidden;
}

.line-top-button {
  font-family: 'Noto Sans JP';
  text-align: center;
  margin-top: 80px;
}

.button {
  display: inline-block;
  background-color: #06c755;
  border: 2px solid #06c755;
  font-family: "Noto Sans JP";
  border-radius: .3125rem;
  padding: 10px 40px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: #333;
  color: #fff;
}
</style>