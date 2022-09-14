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
import Select2 from 'vue3-select2-component';

const pinia = createPinia()
pinia.use(
    PiniaSharedState({
        // Enables the plugin for all stores. Defaults to true.
        enable: true,
        // If set to true this tab tries to immediately recover the shared state from another tab. Defaults to true.
        initialize: false,
        // Enforce a type. One of native, idb, localstorage or node. Defaults to native.
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
app.component('Select-2', Select2)

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);

app.mount("#app");
