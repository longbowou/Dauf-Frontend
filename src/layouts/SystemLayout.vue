<template>
  <!--begin::System Layout-->
  <div class="d-flex flex-column flex-root" id="kt_app_root">
    <router-view></router-view>
  </div>
  <!--end::System Layout-->
</template>

<script>
import {defineComponent, onMounted} from "vue";
import {useBodyStore} from "@/stores/useBodyStore";

export default defineComponent({
  name: "system-layout",
  components: {},
  setup() {
    const store = useBodyStore();

    onMounted(() => {
      store.addBodyClassName("app-blank");

      store.addBodyClassName("bgi-size-cover");

      store.addBodyClassName("bgi-position-center");

      store.addBodyClassName("bgi-no-repeat");
    });
  }
});
</script>
