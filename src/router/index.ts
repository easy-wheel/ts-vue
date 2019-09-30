import Vue from "vue";
import Router, { RouteConfig } from "vue-router";

/* Layout */
import Layout from "@/layout/index.vue";

Vue.use(Router);

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
    meta: { hidden: true }
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "404" */ "@/views/error-page/404.vue"),
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
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "guide" */ "@/views/guide/index.vue"),
        name: "Guide",
        meta: {
          title: "guide",
          icon: "guide",
          noCache: true
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
      icon: "example",
      alwaysShow: true
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
      }
    ]
  },
  {
    path: "/table",
    component: Layout,
    redirect: "/table/list",
    meta: {
      title: "Table",
      icon: "table"
    },
    children: [
      {
        path: "create",
        component: () =>
          import(
            /* webpackChunkName: "table-create" */ "@/views/table/create.vue"
          ),
        name: "CreateArticle",
        meta: {
          title: "createArticle",
          icon: "edit"
        }
      },
      {
        path: "edit/:id(\\d+)",
        component: () =>
          import(/* webpackChunkName: "table-edit" */ "@/views/table/edit.vue"),
        name: "EditArticle",
        meta: {
          title: "editArticle",
          noCache: true,
          activeMenu: "/table/list",
          hidden: true
        }
      },
      {
        path: "list",
        component: () =>
          import(
            /* webpackChunkName: "table-list" */ "@/views/table/index.vue"
          ),
        name: "ArticleList",
        meta: {
          title: "articleList",
          icon: "list"
        }
      }
    ]
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

export const asyncRoutes: RouteConfig[] = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/setting",
    name: "Permission",
    meta: {
      title: "permission",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: "account",
        component: () =>
          import(/* webpackChunkName: "account" */ "@/views/account/index.vue"),
        name: "Account",
        meta: {
          title: "account",
          icon: "user",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      },
      {
        path: "setting",
        component: () =>
          import(/* webpackChunkName: "setting" */ "@/views/setting/index.vue"),
        name: "Setting",
        meta: {
          title: "setting",
          icon: "setting"
        }
      }
    ]
  },
  {
    path: "/charts",
    component: Layout,
    redirect: "/charts/index",
    meta: {
      roles: ["admin"]
    },
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "charts" */ "@/views/charts/index.vue"),
        name: "charts",
        meta: {
          title: "charts",
          icon: "chart"
        }
      }
    ]
  },
  {
    path: "*",
    redirect: "/404",
    meta: { hidden: true }
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
