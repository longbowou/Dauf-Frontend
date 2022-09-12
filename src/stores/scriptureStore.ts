import {defineStore} from "pinia";

interface Verse {
    name: string;
    number: string;
    content: string;
}

export const useScriptureStore = defineStore('scripture', {
    state: () => ({
        current: {} as Verse
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