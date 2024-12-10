import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const instance: AxiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true,
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['content-type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(new Error(`请求错误: ${error}`))
);

// 响应拦截器
instance.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T | AxiosResponse<T> => response.data,
  (error) => Promise.reject(new Error(`响应错误: ${error}`))
);
