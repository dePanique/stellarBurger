import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { dataUrl } from "./constants";
import { handleTokenRequest } from "./utils";
import { getCookie } from '../utils/cookies'

export const axiosConfig: AxiosRequestConfig = {
  baseURL: dataUrl,
  headers: {
    "Content-Type": "application/json",
  },
}

export const urlsObject = {
  ingredients: '/ingredients',
  registration: '/auth/register',
  logIn: '/auth/login',
  logOut: '/auth/logout',
  userInfo: '/auth/user',
  emailPassResetRequest: '/password-reset',
  applyNewPass: '/password-reset/reset',
  postOrder: '/orders?token=',
  updateToken: '/auth/token',
}

const _axiosWithoutRefresh: AxiosInstance = axios.create(axiosConfig);

_axiosWithoutRefresh.interceptors.response.use(

  config => {
    handleTokenRequest(config)
    return config.data
  }
  ,
  async error => {
    return error
  }

)

export const axiosApi: AxiosInstance = axios.create(axiosConfig);

axiosApi.interceptors.response.use(

  config => {
    handleTokenRequest(config)
    return config.data
  }
  ,
  async error => {
    try {

      const token = localStorage.getItem('refreshToken');
      if (!token) throw new Error('badToken');

      if (!error.response.data.success) {

        const update = await _axiosWithoutRefresh.post(urlsObject.updateToken, { token });

        if (update) {

          const repeatRequest = await _axiosWithoutRefresh({
            url: error.config.url,
            baseURL: error.config.baseURL,
            method: error.config.method.toUpperCase(),
            headers: {
              "Content-Type": "application/json",
              authorization: `${getCookie('accessToken')}` || '',
            },
            data: error.config.data
          })

          return repeatRequest
        }

      }

    } catch (err) {
      throw new Error("");
    }

    throw new Error("");

  }

)
