import objectPath from "object-path";
import {config} from "@/core/helpers/config";
import {useBodyStore} from "@/stores/useBodyStore";

const store = useBodyStore()

class LayoutService {
    /**
     * @description initialize default layout
     */
    public static init(): void {
        //empty body element classes and attributes
        LayoutService.emptyElementClassesAndAttributes(document.body);

        LayoutService.initLayout();
        LayoutService.initHeader();
        LayoutService.initAside();
        LayoutService.initFooter();
    }

    /**
     * @description init layout
     */
    public static initLayout(): void {
        store.addBodyAttribute({
            qualifiedName: "id",
            value: "kt_body"
        });

        if (objectPath.get(config.value, "loader.display")) {
            store.addBodyClassName("page-loading-enabled");
            store.addBodyClassName("page-loading");
        }
    }

    /**
     * @description init header
     */
    public static initHeader(): void {
        if (objectPath.get(config.value, "header.fixed.desktop")) {
            store.addBodyClassName("header-fixed");
        }

        if (objectPath.get(config.value, "header.fixed.tabletAndMobile")) {
            store.addBodyClassName(
                "header-tablet-and-mobile-fixed"
            );
        }
    }

    /**
     * @description init aside
     */
    public static initAside(): void {
        if (!objectPath.get(config.value, "aside.display")) {
            return;
        }

        // Enable Aside
        store.addBodyClassName("aside-enabled");

        // Minimized
        if (
            objectPath.get(config.value, "aside.minimized") &&
            objectPath.get(config.value, "aside.toggle")
        ) {
            store.addBodyAttribute({
                qualifiedName: "data-kt-aside-minimize",
                value: "on"
            });
        }

        if (objectPath.get(config.value, "aside.fixed")) {
            // Fixed Aside
            store.addBodyClassName("aside-fixed");
        }

        if (objectPath.get(config.value, "aside.secondaryDisplay")) {
            // Aside Secondary Enabled
            store.addBodyClassName("aside-secondary-enabled");
        }

        // Default minimized
        if (objectPath.get(config.value, "aside.minimized")) {
            store.addBodyAttribute({
                qualifiedName: "data-kt-aside-minimize",
                value: "on"
            });
        }
    }

    /**
     * @description init footer
     */
    public static initFooter(): void {
        // Fixed header
        if (objectPath.get(config.value, "footer.width") === "fixed") {
            store.addBodyClassName("footer-fixed");
        }
    }

    public static emptyElementClassesAndAttributes(element: HTMLElement): void {
        element.className = "";
        for (let i = element.attributes.length; i-- > 0;)
            element.removeAttributeNode(element.attributes[i]);
    }
}

export default LayoutService;
