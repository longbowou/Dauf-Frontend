<template>
  <router-view/>
</template>

<script lang="js">
import {defineComponent, nextTick, onMounted} from "vue";
import {initializeComponents} from "@/core/plugins/keenthemes";
import {useConfigStore} from "@/stores/useConfigStore";
import $ from "jquery";
import "select2";

const jQuery = window.$ = $

const initSelect2 = () => {
  var select2FocusFixInitialized = false;
  // Check if jQuery included
  if (typeof jQuery == 'undefined') {
    return;
  }

  // Check if select2 included
  if (typeof $.fn.select2 === 'undefined') {
    return;
  }

  var elements = [].slice.call(document.querySelectorAll('[data-control="select2"], [data-kt-select2="true"]'));
  elements.map(function (element) {
    if (element.getAttribute("data-kt-initialized") === "1") {
      return;
    }

    var options = {
      dir: document.body.getAttribute('direction')
    };

    if (element.getAttribute('data-hide-search') === 'true') {
      options.minimumResultsForSearch = Infinity;
    }

    $(element).select2(options);

    element.setAttribute("data-kt-initialized", "1");
  });

  /*
  * Hacky fix for a bug in select2 with jQuery 3.6.0's new nested-focus "protection"
  * see: https://github.com/select2/select2/issues/5993
  * see: https://github.com/jquery/jquery/issues/4382
  *
  * TODO: Recheck with the select2 GH issue and remove once this is fixed on their side
  */

  if (select2FocusFixInitialized === false) {
    select2FocusFixInitialized = true;

    $(document).on('select2:open', function (e) {
      var elements = document.querySelectorAll('.select2-container--open .select2-search__field');
      if (elements.length > 0) {
        elements[elements.length - 1].focus();
      }
    });
  }

  $.fn.select2.defaults.set("theme", "bootstrap5");
  $.fn.select2.defaults.set("width", "100%");
  $.fn.select2.defaults.set("selectionCssClass", ":all:");
}

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
        initSelect2()
      });
    });
  },
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
