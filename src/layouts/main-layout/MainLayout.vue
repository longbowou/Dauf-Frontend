<template>
  <KTLoader v-if="loaderEnabled" :logo="loaderLogo" />

  <!-- begin:: Body -->
  <div class="page d-flex flex-row flex-column-fluid">
    <!-- begin:: Aside Left -->
    <KTAside
      v-if="asideEnabled"
      :lightLogo="themeLightLogo"
      :darkLogo="themeDarkLogo"
    />
    <!-- end:: Aside Left -->

    <div id="kt_wrapper" class="wrapper d-flex flex-column flex-row-fluid">
      <KTHeader />

      <!-- begin:: Content -->
      <div id="kt_content" class="content d-flex flex-column flex-column-fluid">
        <!-- begin:: Content Body -->
        <div
          id="kt_content_container"
          :class="{
            'container-fluid': contentWidthFluid,
            'container-xxl': !contentWidthFluid,
          }"
        >
          <router-view />
        </div>
        <!-- end:: Content Body -->
      </div>
      <!-- end:: Content -->
      <KTFooter />
    </div>
  </div>
  <!-- end:: Body -->
  <KTScrollTop />
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import KTAside from "@/layouts/main-layout/aside/Aside.vue";
import KTHeader from "@/layouts/main-layout/header/Header.vue";
import KTFooter from "@/layouts/main-layout/footer/Footer.vue";
import HtmlClass from "@/core/services/LayoutService";
import KTScrollTop from "@/layouts/main-layout/extras/ScrollTop.vue";
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
    KTAside,
    KTHeader,
    KTFooter,
    KTScrollTop,
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
