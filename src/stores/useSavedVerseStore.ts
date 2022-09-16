import {defineStore} from "pinia";

export const useSavedVerseStore = defineStore('saved-verse', {
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