import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://www.kemapi.somee.com/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = localStorage.getItem('accessToken')
    if (token) config.headers.Authorization = `bearer ${token}`
    return config
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error)
  }
)

// Thêm một bộ đón chặn response
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response.data
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error)
  }
)
export default axiosClient
