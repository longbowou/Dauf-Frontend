import {defineStore} from "pinia";

export interface StoreInfo {
    classes: {
        header?: Array<string>;
        headerContainer?: Array<string>;
        headerMobile?: Array<string>;
        headerMenu?: Array<string>;
        aside?: Array<string>;
        asideMenu?: Array<string>;
        asideToggle?: Array<string>;
        toolbar?: Array<string>;
        toolbarContainer?: Array<string>;
        content?: Array<string>;
        contentContainer?: Array<string>;
        footerContainer?: Array<string>;
        sidebar?: Array<string>;
        pageTitle?: Array<string>;
    };
}

export const useBodyStore = defineStore('body', {
    state: () => ({
        classes: {} as StoreInfo
    }),
    getters: {
        getClasses() {
            return (position) => {
                if (typeof position !== "undefined") {
                    return this.classes[position];
                }
                return this.classes;
            };
        }
    },
    actions: {
        addBodyClassName(className) {
            document.body.classList.add(className);
        },
        removeBodyClassName(className) {
            document.body.classList.remove(className);
        },
        addBodyAttribute(payload) {
            const {qualifiedName, value} = payload;
            document.body.setAttribute(qualifiedName, value);
        },
        removeBodyAttribute(payload) {
            const {qualifiedName} = payload;
            document.body.removeAttribute(qualifiedName);
        },
        addClassName(payload) {
            const {position, className} = payload;
            if (!this.classes[position]) {
                this.classes[position] = [];
            }
            this.classes[position].push(className);
        }
    }
})