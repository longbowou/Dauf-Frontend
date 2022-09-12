<template>
  <router-view/>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted} from "vue";
import {initializeComponents} from "@/core/plugins/keenthemes";
import {useConfigStore} from "@/stores/useConfigStore";

export default defineComponent({
  name: "app",
  setup() {
    onMounted(() => {
      /**
       * this is to override the layout config using saved data from localStorage
       * remove this to use config only from static config (@/core/config/DefaultLayoutConfig.ts)
       */
      useConfigStore().overrideLayoutConfig();

      nextTick(() => {
        initializeComponents();
      });
    });
  }
});
</script>

<style lang="scss">
@import "~bootstrap-icons/font/bootstrap-icons.css";
@import "~apexcharts/dist/apexcharts.css";
@import "~quill/dist/quill.snow.css";
@import "~animate.css";
@import "~sweetalert2/dist/sweetalert2.css";
@import "~nouislider/distribute/nouislider.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
@import "~socicon/css/socicon.css";
@import "~line-awesome/dist/line-awesome/css/line-awesome.css";
@import "~dropzone/dist/dropzone.css";
@import "~@vueform/multiselect/themes/default.css";
@import "~prism-themes/themes/prism-shades-of-purple.css";
@import "~element-plus/dist/index.css";

// Main demo style scss
@import "assets/sass/element-ui.dark";
@import "assets/sass/plugins";
@import "assets/sass/style";

//RTL version styles
//@import "assets/css/style.rtl.css";
</style>
