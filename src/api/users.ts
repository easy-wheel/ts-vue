import { getData, postData } from "@/utils/request";

export const getUsers = (params: any) => getData("/users", params);

export const getUserInfo = (params: any) => postData("/users/info", params);

export const login = (params: any) => postData("/users/login", params);

export const logout = () => postData("/users/logout");
