import {defineStore} from "pinia";

export const useScriptureStore = defineStore('scripture', {
    state: () => ({
        current: {}
    }),
    getters: {
        currentVerse: (state) => state.current,
    },
    actions: {
        setVerse(verse) {
            this.current = verse
        },
    },
    share: {
        enable: true,
        initialize: true
    }
})