import {defineStore} from "pinia";

export const useSavedScriptureStore = defineStore('saved-scripture', {
    state: () => ({
        verses: []
    }),
    getters: {
        getSavedVerses: (state) => state.verses,
    },
    actions: {
        setSavedVerses(verses) {
            this.verses = verses
        },
    },
    persist: true,
})