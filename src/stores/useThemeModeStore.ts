import {defineStore} from "pinia";
import {ThemeModeComponent} from "@/assets/ts/layout";


const themeModeLSKey = "kt_theme_mode_value";
const themeMenuModeLSKey = "kt_theme_mode_menu";

export const useThemeModeStore = defineStore('theme-mode', {
    state: () => ({
        mode: localStorage.getItem(themeModeLSKey)
            ? (localStorage.getItem(themeModeLSKey) as "light" | "dark" | "system")
            : ThemeModeComponent.getSystemMode()
    }),
    getters: {
        getThemeMode: (state) => state.mode
    },
    actions: {
        setThemeModeAction(payload) {
            localStorage.setItem(themeModeLSKey, payload);
            localStorage.setItem(themeMenuModeLSKey, payload);
            document.documentElement.setAttribute("data-theme", payload);
            ThemeModeComponent.init();
            this.mode = payload;
        }
    }
})