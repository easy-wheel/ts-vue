export const isValidUsername = (str: string) =>
  ["admin", "editor"].indexOf(str.trim()) >= 0;

// 判断是外链，直接跳转。否则使用router-link进行路由跳转
export const isExternal = (path: string) =>
  /^(https?:|mailto:|tel:)/.test(path);
