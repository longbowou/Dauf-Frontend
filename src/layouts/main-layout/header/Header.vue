<template>
  <!--begin::Header-->
  <div
      id="kt_header"
      class="header"
      :data-kt-sticky="isHeaderSticky"
      data-kt-sticky-name="header"
      data-kt-sticky-offset="{default: '200px', lg: '300px'}"
      style="height: 70px!important;">
    <!--begin::Container-->
    <div
        class="d-flex align-items-center justify-content-between"
        :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
        id="kt_header_container"
    >
      <PageTitle/>

      <!--begin::Wrapper-->
      <div class="d-flex d-lg-none align-items-center ms-n2 me-2">
        <!--begin::Aside mobile toggle-->
        <div class="btn btn-icon btn-active-icon-primary" id="kt_aside_toggle">
          <span class="svg-icon svg-icon-2x">
            <inline-svg src="media/icons/duotune/abstract/abs015.svg" />
          </span>
        </div>
        <!--end::Aside mobile toggle-->

        <!--begin::Logo-->
        <a href="#" class="d-flex align-items-center">
          <div class="symbol symbol-40px symbol-circle">
            <div class="symbol-label fs-2 fw-bold text-dark">D</div>
          </div>
        </a>
        <!--end::Logo-->
      </div>
      <!--end::Wrapper-->

      <KTTopbar></KTTopbar>
    </div>
    <!--end::Container-->
  </div>
  <!--end::Header-->
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import KTTopbar from "@/layouts/main-layout/header/Topbar.vue";
import PageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import {headerFixed, headerFixedOnMobile, headerWidthFluid} from "@/core/helpers/config";

export default defineComponent({
  name: "KTHeader",
  components: {
    KTTopbar,
    PageTitle
  },
  setup() {
    const isHeaderSticky = computed(() => {
      if (window.innerWidth > 768) {
        return headerFixed.value;
      } else {
        return headerFixedOnMobile.value;
      }
    });

    return {
      headerWidthFluid,
      isHeaderSticky
    };
  }
});
</script>
