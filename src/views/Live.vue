<template>
  <!--begin::Dashboard-->
  <div
      class="fullscreen-wrapper d-flex"
      v-bind:style="{ cursor: cursor, }"
      v-on:change="onFullscreenChange">
    <div v-if="currentVerse"
         class="d-flex flex-column justify-content-center flex-grow-1"
         style="margin-left: 8%; margin-right: 8%; padding-top: 10%">
      <p style="font-size: 5.5rem; text-align: justify; color: #2d481f"
         class="fw-bolder"
         v-html="currentVerse?.content">
      </p>

      <div class="d-flex justify-content-evenly">
        <div class="d-flex flex-grow-1 justify-content-end">
          <span v-if="currentVerse.linkedToNext"
                class="svg-icon svg-icon-4x svg-icon-dark" style="color: #2F264F">
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

    <div class="d-flex flex-grow-0 align-self-end justify-content-end" style="margin-right: 8%; margin-bottom: 8%">
      <h1 class="fw-bolder" style="font-size: 3rem; color: #EE9D01;">
        {{ currentVerse?.name }} • {{ currentVerse?.bible?.abbreviatedTitle }}
      </h1>
      <!--      <i class="fa-duotone fa-3x fa-book-open-cover mt-5 align-self-center" style="color: #2F264F"></i>-->
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
  //background-color: #2F264F;
  font-family: Sourcesanspro, Cormorant, Inknutantiqua, Inter, Spacegrotesk, Poppins, serif;
  background: linear-gradient(45deg, #e8d7c0 0%, #c0d0e7 100%);
  background-image: url("/public/backgrounds/b6.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  //background: linear-gradient(45deg, #d8865c 0%, #c0d0e7 100%);
  //background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
  //background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
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
