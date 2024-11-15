import "./assets/init.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import elementIcon from "./plugins/icons";
import echarts from "./plugins/echarts";
import i18n from "./locales/i18n";
import ElementPlus from "element-plus";
import zh from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);

app.use(pinia);
app.use(router);
app.use(elementIcon);
app.use(echarts);
app.use(i18n);
app.use(ElementPlus, {
    locale: localStorage.getItem("lang") === "zh" ? zh : en,
});

app.mount("#app");
