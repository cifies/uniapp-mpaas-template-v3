import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axiosAdapterUniapp from 'axios-adapter-uniapp'
import axiosRetry from 'axios-retry'

import { HTTP_REQUEST_URL } from '@/config/app'

axiosRetry(axios, { retries: 5 })

export const request = createAxiosInstance()

function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: HTTP_REQUEST_URL,
    adapter: axiosAdapterUniapp as any,
    timeout: 10000
  })
  instance.interceptors.request.use(handleRequest, handleRequestError)
  instance.interceptors.response.use(handleResponse, handleResponseError)
  return instance
}

function handleRequest(config: AxiosRequestConfig) {
  // config.headers!.channel = "shop_mini_program";
  return config
}

function handleRequestError(error: AxiosError) {
  throw error
}

function handleResponse(response: AxiosResponse) {
  if (response.status === 200) {
    return Promise.resolve(response.data)
  }
  uni.showToast({
    title: response.statusText,
    icon: 'none'
  })
  return Promise.reject()
}

function handleResponseError(error: AxiosError) {
  console.log(error, 123)

  switch (error.response?.status) {
    case 400:
      break
    case 401:
      break
    case 405:
      handleResponseError405(error)
      break
  }
}

function handleResponseError405(error: AxiosError) {
  console.log(error.response)
}
