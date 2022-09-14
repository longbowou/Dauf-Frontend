<template>
  <!--begin::Dashboard-->
  <div
      v-if="currentVerse"
      class="fullscreen-wrapper"
      v-bind:style="{ cursor: cursor }"
      v-on:change="onFullscreenChange">
    <h1 class="" style="font-size: 4.5rem">{{ currentVerse?.name }} • {{ currentVerse?.bible?.abbreviatedTitle }}</h1>
    <p style="font-size: 4rem; text-align: justify; margin-left: 5%; margin-right: 5%" v-html="currentVerse?.content">
    </p>

    <button
        class="btn btn-flex flex-center btn-bg-body btn-text-gray-500 btn-active-color-primary w-40px w-md-auto h-40px px-0 px-md-6"
        @click="toggleFullscreen" v-if="!isFullscreen">Go Fullscreen
    </button>
  </div>

  <!--end::Dashboard-->
</template>
<style lang="scss" scoped>
.fullscreen-wrapper {
  width: 100%;
  height: 100%;
  //background: #f5f8fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

<script lang="ts">
import {defineComponent} from "vue";
import {api as fullscreen} from "vue-fullscreen";
import {mapState} from "pinia";
import {useScriptureStore} from "@/stores/useScriptureStore";

export default defineComponent({
  name: "scripture-live",
  components: {},
  data() {
    return {
      isFullscreen: false
    };
  },
  computed: {
    cursor() {
      if (this.isFullscreen) return "none";
      return "auto";
    },
    ...mapState(useScriptureStore, ["currentVerse"]),
  },
  methods: {
    async toggleFullscreen() {
      await fullscreen.toggle(document.querySelector(".fullscreen-wrapper")!, {
        teleport: true,
        pageOnly: false,
        callback: (isFullscreen) => {
          this.isFullscreen = isFullscreen;
        }
      });
    },

    onFullscreenChange(isFullscreen) {
      this.isFullscreen = isFullscreen;
    }
  }
});
</script>
