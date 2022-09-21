import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";
import { dataUrl } from "./constants";
import { handleTokenRequest } from "./utils";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: dataUrl,
  headers: {
    "Content-Type": "application/json",
  }
}

export const urlsObject = {
  ingredients: '/ingredients',
  registration:'/auth/register',
  logIn: '/auth/login',
  logOut: '/auth/logout',
  userInfo: '/auth/user',
  emailPassResetRequest: '/password-reset',
  applyNewPass: '/password-reset/reset',
  postOrder: '/orders?token=',
}

// export const axiosCheckResponse = (res: AxiosResponse<any>) => {
//   if (res.status === 200) return res.data.json()

//   throw new Error(res.statusText);
// }

export const axiosApi: AxiosInstance = axios.create(axiosConfig);

axiosApi.interceptors.request.use(
  (config) => {
    console.log('interceptor request', config);
    return config
  },
  (error) => {
    console.log('interceptor request error', error);
    return error
  })

axiosApi.interceptors.response.use(
  (config) => {
    handleTokenRequest(config)
    return config.data
  },
  (error) => {
    console.log('interceptor response error', error);
    return error
  })
