<template>
  <!--begin::Dashboard-->
  <div
      class="fullscreen-wrapper d-flex"
      v-bind:style="{ cursor: cursor }"
      v-on:change="onFullscreenChange">
    <div v-if="currentVerse"
         class="d-flex flex-column justify-content-center flex-grow-1"
         style="margin-left: 8%; margin-right: 8%">
      <h1 class="text-center text-danger mt-15 mb-10" style="font-size: 4.7rem">
        {{ currentVerse?.name }} • {{ currentVerse?.bible?.abbreviatedTitle }}
      </h1>

      <p style="font-size: 5rem; text-align: justify;"
         class="fw-bold text-white"
         v-html="currentVerse?.content">
      </p>

      <div class="d-flex justify-content-evenly">
        <div class="d-flex flex-grow-1 justify-content-end">
          <span v-if="currentVerse.linkedToNext"
                class="svg-icon svg-icon-4x svg-icon-dark">
            <inline-svg src="media/icons/duotune/arrows/arr080.svg"/>
          </span>
        </div>
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

    <div class="d-flex flex-grow-0 justify-content-end mb-10">
      <i class="fa-duotone fa-3x fa-book-open-cover mt-5 align-self-center text-dark"></i>
    </div>
  </div>

  <!--end::Dashboard-->
</template>
<style lang="scss" scoped>
.fullscreen-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2F264F;
  //background: hsla(249, 38%, 20%, 1);
  //background: radial-gradient(circle, hsla(249, 38%, 20%, 1) 0%, hsla(0, 0%, 7%, 1) 100%);
  //background: -moz-radial-gradient(circle, hsla(249, 38%, 20%, 1) 0%, hsla(0, 0%, 7%, 1) 100%);
  //background: -webkit-radial-gradient(circle, hsla(249, 38%, 20%, 1) 0%, hsla(0, 0%, 7%, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#251F45", endColorstr="#121212", GradientType=1);
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
  mounted() {
    window.addEventListener('keydown', (event) => {
      if (event.key === "F11") {
        event.preventDefault();
        this.toggleFullscreen();
      }
    });
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
