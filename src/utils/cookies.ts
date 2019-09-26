import Cookies from "js-cookie";

// App
const sidebarStatusKey = "sidebar_status";
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey); // 获取siderBar状态(开启/关闭)
export const setSidebarStatus = (
  sidebarStatus: string // 设置siderBar状态
) => Cookies.set(sidebarStatusKey, sidebarStatus);

// User
const tokenKey = "vue_typescript_admin_access_token";
export const getToken = () => Cookies.get(tokenKey); // 获取token
export const setToken = (token: string) => Cookies.set(tokenKey, token); // 设置token
export const removeToken = () => Cookies.remove(tokenKey); // 移除token
