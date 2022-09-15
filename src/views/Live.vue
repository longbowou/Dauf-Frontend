<template>
  <!--begin::Dashboard-->
  <div
      v-if="currentVerse"
      class="fullscreen-wrapper"
      v-bind:style="{ cursor: cursor }"
      v-on:change="onFullscreenChange">

    <div class="d-flex flex-column" style="margin-left: 5%; margin-right: 5%">
      <h1 class="text-center" style="font-size: 5.5rem">
        {{ currentVerse?.name }} • {{ currentVerse?.bible?.abbreviatedTitle }}
      </h1>
      <p style="font-size: 5rem; text-align: justify;" v-html="currentVerse?.content">
      </p>
      <span v-if="currentVerse.isPartial" class="svg-icon svg-icon-4x svg-icon-dark align-self-end">
        <inline-svg src="media/icons/duotune/arrows/arr080.svg"/>
      </span>
    </div>

    <button
        class="btn btn-flex flex-center btn-bg-body btn-text-gray-500 btn-active-color-primary w-40px w-md-auto h-40px px-0 px-md-6"
        @click="toggleFullscreen" v-if="!isFullscreen">
      <span class="svg-icon svg-icon-2 svg-icon-primary me-0 me-md-2">
          <inline-svg src="media/icons/duotune/general/gen002.svg"/>
      </span>
      Go Fullscreen
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
