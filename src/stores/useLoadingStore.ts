import {defineStore} from "pinia";

export const useLoadingStore = defineStore('loading', {
    state: () => ({
        isLoading: false
    }),
    getters: {
        getIsLoading: (state) => state.isLoading,
    },
    actions: {
        setIsLoading(isLoading) {
            this.isLoading = isLoading
        },
    },
    persist: true,
})