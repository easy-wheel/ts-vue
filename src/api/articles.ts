import { getData, postData } from "@/utils/request";

export const getArticles = (data: any) => getData("/articles", data);
