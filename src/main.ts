import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";
import urql from '@urql/vue';

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import {initApexCharts} from "@/core/plugins/apexcharts";
import {initInlineSvg} from "@/core/plugins/inline-svg";
import {initVeeValidate} from "@/core/plugins/vee-validate";

import "@/core/plugins/prismjs";
import "bootstrap";
import {createPinia} from "pinia";
import {PiniaSharedState} from "pinia-shared-state";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
pinia.use(
    PiniaSharedState({
        type: 'localstorage',
    })
)

const app = createApp(App);
app.use(urql, {
    url: process.env.VUE_APP_API_URL,
});
app.use(pinia);
app.use(router);
app.use(ElementPlus);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);

app.mount("#app");
