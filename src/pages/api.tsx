import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInterceptorManager,
} from "axios";

// 创建一个 axios 实例
const api: AxiosInstance = axios.create({
  timeout: 1000
});

// 定义请求拦截器
const requestInterceptor: AxiosInterceptorManager<AxiosRequestConfig> =
  api.interceptors.request;

requestInterceptor.use(
  (config: AxiosRequestConfig) => {
    // 获取 token
    const token = localStorage.getItem("token");

    // 判断 token 是否存在
    if (token) {
      // 确保 headers 已定义
      config.headers = config.headers || {};
      // 在请求头部添加认证信息
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 定义响应拦截器
const responseInterceptor: AxiosInterceptorManager<AxiosResponse> =
  api.interceptors.response;

responseInterceptor.use(
  (response: AxiosResponse) => {
    console.log("拦截器2", response);
    return response;
  },
  (error: AxiosError) => {
    // 处理请求错误
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // 重定向到登录页面
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
