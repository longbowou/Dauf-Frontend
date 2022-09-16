import LayoutConfigTypes from "@/core/config/LayoutConfigTypes";

const config: LayoutConfigTypes = {
  themeName: "Dauf",
  themeVersion: "0.0.1",
  demo: "demo7",
  main: {
    type: "default",
    primaryColor: "#009EF7",
    logo: {
      dark: "media/logos/default-dark.svg",
      light: "media/logos/default.svg"
    }
  },
  illustrations: {
    set: "sketchy-1"
  },
  loader: {
    logo: "media/logos/default-dark.svg",
    display: true,
    type: "default"
  },
  scrollTop: {
    display: true
  },
  header: {
    display: true,
    menuIcon: "font",
    width: "fluid",
    fixed: {
      desktop: false,
      tabletAndMobile: false
    }
  },
  toolbar: {
    display: true,
    width: "fluid",
    fixed: {
      desktop: true,
      tabletAndMobile: true
    }
  },
  pageTitle: {
    display: true,
    breadcrumb: true,
    direction: "column"
  },
  aside: {
    display: true,
    secondaryDisplay: true,
    theme: "dark",
    fixed: true,
    menuIcon: "svg",
    minimized: true,
    minimize: true,
    hoverable: true
  },
  content: {
    width: "fluid"
  },
  footer: {
    width: "fluid"
  }
};

export default config;
