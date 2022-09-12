import {computed} from "vue";
import {useConfigStore} from "@/stores/useConfigStore";

const store = useConfigStore()

/**
 * Returns layout config
 * @returns {object}
 */
export const config = computed(() => {
    return store.layoutConfig;
});

/**
 * Set the sidebar display
 * @returns {boolean}
 */
export const displaySidebar = computed(() => {
    return store.layoutConfig("sidebar.display");
});

/**
 * Check if footer container is fluid
 * @returns {boolean}
 */
export const footerWidthFluid = computed(() => {
    return store.layoutConfig("footer.width") === "fluid";
});

/**
 * Check if header container is fluid
 * @returns {boolean}
 */
export const headerWidthFluid = computed(() => {
    return store.layoutConfig("header.width") === "fluid";
});

/**
 * Returns header left part type
 * @returns {string}
 */
export const headerLeft = computed(() => {
    return store.layoutConfig("header.left");
});

/**
 * Returns header fixed on desktop
 * @returns {boolean}
 */
export const headerFixed = computed(() => {
    return store.layoutConfig("header.fixed.desktop");
});

/**
 * Returns header fixed on tablet and mobile
 * @returns {boolean}
 */
export const headerFixedOnMobile = computed(() => {
    return store.layoutConfig("header.fixed.tabletAndMobile");
});

/**
 * Set the aside display
 * @returns {boolean}
 */
export const asideDisplay = computed(() => {
    return store.layoutConfig("aside.display") === true;
});

/**
 * Aside secondary minimized by default
 * @returns {boolean}
 */
export const minimizedAsideSecondary = computed(() => {
    return store.layoutConfig("aside.minimized");
});

/**
 * Aside minimization enabled
 * @returns {boolean}
 */
export const minimizationEnabled = computed(() => {
    return store.layoutConfig("aside.minimize");
});

/**
 * Aside secondary display
 * @returns {boolean}
 */
export const asideSecondaryDisplay = computed(() => {
    return store.layoutConfig("aside.secondaryDisplay");
});

/**
 * Check if toolbar width is fluid
 * @returns {boolean}
 */
export const toolbarWidthFluid = computed(() => {
    return store.layoutConfig("toolbar.width") === "fluid";
});

/**
 * Set the toolbar display
 * @returns {boolean}
 */
export const toolbarDisplay = computed(() => {
    return store.layoutConfig("toolbar.display");
});

/**
 * Page title display
 * @returns {boolean}
 */
export const pageTitleDisplay = computed(() => {
    return store.layoutConfig("pageTitle.display");
});

/**
 * Page title breadcrumb display
 * @returns {boolean}
 */
export const pageTitleBreadcrumbDisplay = computed(() => {
    return store.layoutConfig("pageTitle.breadcrumb");
});

/**
 * Page title direction display
 * @returns { "row" | "column" }
 */
export const pageTitleDirection = computed(() => {
    return store.layoutConfig("pageTitle.direction");
});

/**
 * Check if the page loader is enabled
 * @returns {boolean}
 */
export const loaderEnabled = computed(() => {
    return store.layoutConfig("loader.display");
});

/**
 * Check if container width is fluid
 * @returns {boolean}
 */
export const contentWidthFluid = computed(() => {
    return store.layoutConfig("content.width") === "fluid";
});

/**
 * Page loader logo image
 * @returns {string}
 */
export const loaderLogo = computed(() => {
    return `${process.env.BASE_URL} ${store.layoutConfig("loader.logo")}`;
});

/**
 * Check if the aside menu is enabled
 * @returns {boolean}
 */
export const asideEnabled = computed(() => {
    return !!store.layoutConfig("aside.display");
});

/**
 * Set the aside theme
 * @returns {string}
 */
export const asideTheme = computed(() => {
    return store.layoutConfig("aside.theme");
});

/**
 * Set the subheader display
 * @returns {boolean}
 */
export const subheaderDisplay = computed(() => {
    return store.layoutConfig("toolbar.display");
});

/**
 * Set the aside menu icon type
 * @returns {string}
 */
export const asideMenuIcons = computed(() => {
    return store.layoutConfig("aside.menuIcon");
});

/**
 * Light theme logo image
 * @returns {string}
 */
export const themeLightLogo = computed(() => {
    return store.layoutConfig("main.logo.light");
});

/**
 * Dark theme logo image
 * @returns {string}
 */
export const themeDarkLogo = computed(() => {
    return store.layoutConfig("main.logo.dark");
});

/**
 * Set the header menu icon type
 * @returns {string}
 */
export const headerMenuIcons = computed(() => {
    return store.layoutConfig("header.menuIcon");
});

/**
 * Illustrations set
 * @returns {string}
 */
export const illustrationsSet = computed(() => {
    return store.layoutConfig("illustrations.set");
});
