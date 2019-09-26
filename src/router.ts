import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/login",
      component: () =>
        import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
      meta: { hidden: true }
    },
    {
      path: "/404",
      component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
      meta: { hidden: true }
    },
    {
      path: "/",
      component: Layout,
      redirect: "/dashboard",
      children: [
        {
          path: "dashboard",
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"
            ),
          meta: {
            title: "Dashboard",
            icon: "dashboard"
          }
        }
      ]
    },
    {
      path: "/example",
      component: Layout,
      redirect: "/example/tree",
      meta: {
        title: "Example",
        icon: "example"
      },
      children: [
        {
          path: "tree",
          component: () =>
            import(/* webpackChunkName: "tree" */ "@/views/tree/index.vue"),
          meta: {
            title: "Tree",
            icon: "tree"
          }
        },
        {
          path: "table",
          component: () =>
            import(/* webpackChunkName: "table" */ "@/views/table/index.vue"),
          meta: {
            title: "Table",
            icon: "table"
          }
        }
      ]
    }
  ]
});
