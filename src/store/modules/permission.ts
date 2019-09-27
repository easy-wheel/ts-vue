import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import { RouteConfig } from "vue-router";
import { asyncRoutes, constantRoutes } from "@/router";
import store from "@/store";

const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
};

const deepCopy = (source: any): any => {
  if (!source) {
    return source;
  }
  let sourceCopy: any = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] =
      typeof source[item] === "object" ? deepCopy(source[item]) : source[item];
  }
  return sourceCopy;
};

export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
};

export interface IPermissionState {
  routes: RouteConfig[];
  dynamicRoutes: RouteConfig[];
}

@Module({ dynamic: true, store, name: "permission" })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = [];
  public dynamicRoutes: RouteConfig[] = [];

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes);
    console.log("完整路由", this.routes);
    this.dynamicRoutes = routes;
  }

  @Action
  public GenerateRoutes(roles: string[]) {
    // let accessedRoutes;
    // if (roles.includes("admin")) {
    //   accessedRoutes = asyncRoutes;
    // } else {
    //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    // }
    // this.SET_ROUTES(accessedRoutes);

    return new Promise(resolve => {
      let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      this.SET_ROUTES(accessedRoutes);
      resolve(accessedRoutes);
    });
  }
}

export const PermissionModule = getModule(Permission);
