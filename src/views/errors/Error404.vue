<template>
  <div class="d-flex flex-column flex-center flex-column-fluid">
    <!--begin::Content-->
    <div class="d-flex flex-column flex-center text-center p-10">
      <!--begin::Wrapper-->
      <div class="card card-flush w-lg-650px py-5">
        <div class="card-body py-15 py-lg-20">
          <!--begin::Title-->
          <h1 class="fw-bolder fs-2hx text-gray-900 mb-4">Oops!</h1>
          <!--end::Title-->
          <!--begin::Text-->
          <div class="fw-semibold fs-6 text-gray-500 mb-7">
            We can't find that page.
          </div>
          <!--end::Text-->
          <!--begin::Illustration-->
          <div class="mb-3">
            <img
                src="media/auth/404-error.png"
                class="mw-100 mh-300px theme-light-show"
                alt=""
            />
            <img
                src="media/auth/404-error-dark.png"
                class="mw-100 mh-300px theme-dark-show"
                alt=""
            />
          </div>
          <!--end::Illustration-->
          <!--begin::Link-->
          <div class="mb-0">
            <router-link to="/" class="btn btn-sm btn-primary"
            >Return Home
            </router-link>
          </div>
          <!--end::Link-->
        </div>
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Content-->
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from "vue";
import LayoutService from "@/core/services/LayoutService";
import {getIllustrationsPath} from "@/core/helpers/assets";
import {useBodyStore} from "@/stores/useBodyStore";
import {useThemeModeStore} from "@/stores/useThemeModeStore";

export default defineComponent({
  name: "error-404",
  components: {},
  setup() {
    const store = useThemeModeStore();
    const bodyStore = useBodyStore();
    const themeMode = computed(() => {
      return store.getThemeMode;
    });
    const bgImage = themeMode.value !== "dark" ? "bg1.jpg" : "bg1-dark.jpg";

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);

      bodyStore.addBodyClassName("bg-body");
      bodyStore.addBodyAttribute({
        qualifiedName: "style",
        value: `background-image: url("media/auth/${bgImage}")`
      });
    });

    return {
      getIllustrationsPath,
      bgImage
    };
  }
});
</script>
