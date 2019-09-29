import { getData, postData } from "@/utils/request";

export const getArticles = (params: any) => getData("/articles", params);
