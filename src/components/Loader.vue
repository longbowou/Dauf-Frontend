<template>
  <!--begin::Page loader-->
  <template v-if="loaderType === 'spinner-message'">
    <div class="page-loader flex-column">
      <span class="spinner-border text-primary" role="status"></span>
      <span class="text-muted fs-6 fw-semobold mt-5">Loading...</span>
    </div>
  </template>
  <template v-else-if="loaderType === 'spinner-logo'">
    <div class="page-loader flex-column">
      <img alt="Logo" class="max-h-75px" :src="logo"/>

      <div class="d-flex align-items-center mt-5">
        <span class="spinner-border text-primary" role="status"></span>
        <span class="text-muted fs-6 fw-semobold ms-5">Loading...</span>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="page-loader">
      <span class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </span>
    </div>
  </template>
  <!--end::Page Loader-->
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useConfigStore} from "@/stores/useConfigStore";

export default defineComponent({
  name: "layout-laoder",
  props: {
    logo: String
  },
  setup() {
    const store = useConfigStore();

    const loaderType = computed(() => {
      return store.layoutConfig("loader.type");
    });

    return {
      loaderType
    };
  }
});
</script>
