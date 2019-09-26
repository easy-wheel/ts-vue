import axios from "axios";
import { Message, MessageBox } from "element-ui";
import { UserModule } from "@/store/modules/user";

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
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers["X-Access-Token"] = UserModule.token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    const res = response.data;
    if (res.code !== 20000) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      });
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          "你已被登出，可以取消继续留在该页面，或者重新登录",
          "确定登出",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          UserModule.ResetToken();
          location.reload(); // To prevent bugs from vue-router
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return response;
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
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

export function postData(url: string, json?: object) {
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
