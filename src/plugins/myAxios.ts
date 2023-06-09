import axios, { AxiosInstance } from "axios";

const isDev = process.env.NODE_ENV === "development";

const myAxios: AxiosInstance = axios.create({
  baseURL: isDev ? "http://localhost:8102/api" : "http://xxx",
  // baseURL: "http://localhost:8102/api",
});

myAxios.defaults.withCredentials = true; // 配置为true

// Add a request interceptor
myAxios.interceptors.request.use(
  function (config) {
    // console.log("我要发请求啦", config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
myAxios.interceptors.response.use(
  function (response) {
    // console.log("我收到你的响应啦", response);
    // 未登录则跳转到登录页
    if (response?.data?.code === 40500) {
      window.location.hash = "/login";
    }
    return response.data;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default myAxios;
