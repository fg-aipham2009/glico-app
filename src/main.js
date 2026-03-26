import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import ja from "element-plus/dist/locale/ja.mjs";
import "element-plus/dist/index.css";
import { ElMessage } from "element-plus";

import App from "./App.vue";
import router from "./router";
import { bindRouter, post, get, put } from "./utils/http";
import { $request } from "./plugins/axios.js";
import commonClass from "./utils/common.js";
import { setupNavigationGuards } from "./router/guards.js";

import HeaderBar from "./components/headerBar.vue";
import FooterBar from "./components/footerbar.vue";
import tabBar from "./components/tabBar.vue";
import authInfoBar from "./components/authInfoBar.vue";

import "@/assets/css/line.css";
import "@/assets/css/style.css";
import "@/assets/css/glico.css";
import "@/assets/css/date.css";
import "@/assets/theme/index.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
bindRouter(router);
app.use(ElementPlus, { locale: ja });

const commonInstance = new commonClass();
app.config.globalProperties.$post = post;
app.config.globalProperties.$get = get;
app.config.globalProperties.$put = put;
app.config.globalProperties.$request = $request;
app.config.globalProperties.$common = commonInstance;
app.config.globalProperties.$message = ElMessage;

app.component("HeaderBar", HeaderBar);
app.component("FooterBar", FooterBar);
app.component("tabBar", tabBar);
app.component("authInfoBar", authInfoBar);

setupNavigationGuards(router, { post, commonInstance });

app.mount("#app");
