import { createStore } from "vuex";
import { config } from "vuex-module-decorators";
import createMultiTabState from "vuex-multi-tab-state";

import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import ConfigModule from "@/store/modules/ConfigModule";
import ThemeModeModule from "@/store/modules/ThemeModeModule";
import VerseModule from "@/store/modules/VerseModule";

config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    BodyModule,
    ConfigModule,
    ThemeModeModule,
    VerseModule
  },
  plugins: [
    createMultiTabState({
      statesPaths: ["VerseModule.current"]
    })
  ]
});

export default store;
