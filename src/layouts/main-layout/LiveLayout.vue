<template>
  <KTLoader v-if="loaderEnabled" :logo="loaderLogo"/>
  <router-view/>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import HtmlClass from "@/core/services/LayoutService";
import KTLoader from "@/components/Loader.vue";
import {MenuComponent} from "@/assets/ts/components";
import {reinitializeComponents} from "@/core/plugins/keenthemes";
import {removeModalBackdrop} from "@/core/helpers/dom";
import {
  asideEnabled,
  contentWidthFluid,
  loaderEnabled,
  loaderLogo,
  subheaderDisplay,
  themeDarkLogo,
  themeLightLogo,
  toolbarDisplay
} from "@/core/helpers/config";
import {useBodyStore} from "@/stores/useBodyStore";
import {useAuthStore} from "@/stores/useAuthStore";

export default defineComponent({
  name: "master-layout",
  components: {
    KTLoader
  },
  setup() {
    const store = useBodyStore();
    const route = useRoute();
    const router = useRouter();

    // show page loading
    store.addBodyClassName("page-loading");

    onMounted(() => {
      //check if current user is authenticated
      // if (!store.getters.isUserAuthenticated) {
      //   router.push({ name: "sign-in" });
      // }

      // initialize html element classes
      HtmlClass.init();

      nextTick(() => {
        reinitializeComponents();
      });

      // Simulate the delay page loading
      setTimeout(() => {
        // Remove page loader after some time
        store.removeBodyClassName("page-loading");
      }, 500);
    });

    watch(
        () => route.path,
        () => {
          MenuComponent.hideDropdowns(undefined);

          // check if current user is authenticated
          if (!useAuthStore().isUserAuthenticated) {
            router.push({name: "sign-in"});
          }

          nextTick(() => {
            reinitializeComponents();
          });
          removeModalBackdrop();
        }
    );

    return {
      toolbarDisplay,
      loaderEnabled,
      contentWidthFluid,
      loaderLogo,
      asideEnabled,
      subheaderDisplay,
      themeLightLogo,
      themeDarkLogo
    };
  }
});
</script>
