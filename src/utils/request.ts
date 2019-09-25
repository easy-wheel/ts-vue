import axios from "axios";

axios.defaults.headers = {
  "Content-Type": "application/json;charset=utf8"
  // token: Cookies.get("system_token") || ""
};

axios.defaults.baseURL = process.env.VUE_APP_BASE_API
  ? process.env.VUE_APP_BASE_API
  : "";
// console.log("process.env.VUE_APP_API", process.env.VUE_APP_API);

// 请求拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => Promise.resolve(error.response)
);

export function formateURLOnlyGet(link: string, json: object) {
  let url = link;
  var data = Object.entries(json);

  if (data.length) {
    url += url.indexOf("?") == -1 ? "?" : "";
    url += Object.entries(data)
      .map(item => {
        return item[1].join("=");
      })
      .join("&");
  }
  return url;
}

/**
 * GET请求方法
 * @param {String} url 请求地址
 * @param {json} json 请求参数
 */
export function getData(url: string, json: object) {
  return axios
    .get(formateURLOnlyGet(url, json))
    .then(res => res.data)
    .catch(error => error.response);
}

export function postData(url: string, json: object) {
  return axios
    .post(url, json)
    .then(res => res.data)
    .catch(error => error.response);
}
export function deleteData(url: string, json: object) {
  return axios({
    url: formateURLOnlyGet(url, json),
    method: "delete"
    // data: json
  })
    .then(res => res.data)
    .catch(error => error.response);
}
export function deleteJSON(url: string, json: object) {
  return axios({
    url: url,
    method: "delete",
    data: json
  })
    .then(res => res.data)
    .catch(error => error.response);
}
export function putData(url: string, json: object) {
  return axios({
    url,
    method: "put",
    data: json
  })
    .then(res => res.data)
    .catch(error => error.response);
}

export function downloadFile(url: string, json: object) {
  return axios({
    url,
    method: "post",
    data: json,
    withCredentials: true,
    responseType: "blob"
  })
    .then(res => res)
    .catch(error => error.response);
}
