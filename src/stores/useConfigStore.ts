import {defineStore} from "pinia";
import layoutConfig from "@/core/config/DefaultLayoutConfig";
import LayoutConfigTypes from "@/core/config/LayoutConfigTypes";
import objectPath from "object-path";
import merge from "deepmerge";


export const useConfigStore = defineStore('config', {
    state: () => ({
        config: layoutConfig as LayoutConfigTypes,
        initial: layoutConfig as LayoutConfigTypes
    }),
    getters: {
        layoutConfig: (spate) => {
            return (path, defaultValue = null) => objectPath.get(spate.config, path, defaultValue);
        }
    },
    actions: {
        setLayoutConfigProperty(payload) {
            const {property, value} = payload;
            objectPath.set(this.config, property, value);
            localStorage.setItem("config", JSON.stringify(this.config));
        },
        resetLayoutConfig() {
            this.config = Object.assign({}, this.initial);
        },
        overrideLayoutConfig() {
            this.config = this.initial = Object.assign(
                {},
                this.initial,
                JSON.parse(window.localStorage.getItem("config") || "{}")
            );
        },
        overridePageLayoutConfig(payload) {
            this.config = merge(this.config, payload);
        }
    }
})