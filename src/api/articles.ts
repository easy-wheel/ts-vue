import { getData, postData } from "@/utils/request";
import { IArticleData } from "./types";

export const defaultArticleData: IArticleData = {
  id: 0,
  status: "",
  timestamp: "",
  author: ""
};

export const getArticles = (params: any) => getData("/articles", params);

export const getArticle = (id: number, params: any) =>
  getData(`/articles/${id}`, params);
