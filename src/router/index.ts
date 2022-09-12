import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import JwtService from "@/core/services/JwtService";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth"
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"]
        }
      }
    ]
  },
  {
    path: "/live",
    component: () => import("@/layouts/main-layout/LiveLayout.vue"),
    children: [
      {
        path: "/live",
        name: "live",
        component: () => import("@/views/Live.vue")
      }
    ]
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In"
        }
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("@/views/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up"
        }
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset"
        }
      }
    ]
  },
  {
    path: "/multi-step-sign-up",
    name: "multi-step-sign-up",
    component: () => import("@/views/authentication/MultiStepSignUp.vue"),
    meta: {
      pageTitle: "Multi-step Sign up"
    }
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/errors/Error404.vue"),
        meta: {
          pageTitle: "Error 404"
        }
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/errors/Error500.vue"),
        meta: {
          pageTitle: "Error 500"
        }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to) => {
  // current page view title
  document.title = `${to.meta.pageTitle} - ${process.env.VUE_APP_NAME}`;

  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);

  store.dispatch(Actions.VERIFY_AUTH, { api_token: JwtService.getToken() });

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
});

export default router;
