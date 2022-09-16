<template>
  <div
      class="aside-primary d-flex flex-column align-items-lg-center flex-row-auto"
  >
    <div
        class="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-2"
        id="kt_aside_logo"
    >
      <a href="#">
        <div class="symbol symbol-40px symbol-circle">
          <div class="symbol-label fs-2 fw-bold text-dark">D</div>
        </div>
      </a>
    </div>

    <div
        class="aside-nav d-flex flex-column align-items-center flex-column-fluid w-100 pt-5 pt-lg-0"
        id="kt_aside_nav"
    >
      <div
          class="hover-scroll-y mb-10"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-height="auto"
          data-kt-scroll-wrappers="#kt_aside_nav"
          data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
          data-kt-scroll-offset="0px"
      >
        <ul class="nav flex-column">
          <li
              class="nav-item mb-2"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Dashboard"
          >
            <router-link to="dashboard"
                         class="nav-link btn btn-icon btn-active-color-primary btn-color-gray-400 btn-active-light active">
              <span class="svg-icon svg-icon-2x">
                <inline-svg src="media/icons/duotune/general/gen025.svg"/>
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!--<div
      class="aside-footer d-flex flex-column align-items-center flex-column-auto"
      id="kt_aside_footer"
    >
      <div
        class="d-flex align-items-center mb-10"
        id="kt_header_user_menu_toggle"
      >
        <div
          class="cursor-pointer symbol symbol-40px"
          data-kt-menu-trigger="click"
          data-kt-menu-overflow="true"
          data-kt-menu-placement="top-start"
          data-kt-menu-flip="top-end"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          data-bs-dismiss="click"
          title="User profile"
        >
          <img src="media/avatars/300-1.jpg" alt="metronic" />
        </div>
        <KTUserMenu></KTUserMenu>
      </div>
    </div>-->
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
// import KTUserMenu from "@/layouts/main-layout/header/partials/UserMenu.vue";

export default defineComponent({
  name: "kt-aside-primary",
  components: {
    // KTUserMenu
  }
});
</script>
