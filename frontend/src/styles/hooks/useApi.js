import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function useApi() {
  const { token } = useAuthStore()

  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        useAuthStore.setState({ token: null })
        window.location.href = '/login'
      }
      return Promise.reject(error.response?.data || error)
    }
  )

  return {
    get: (url, config) => instance.get(url, config),
    post: (url, data, config) => instance.post(url, data, config),
    put: (url, data, config) => instance.put(url, data, config),
    patch: (url, data, config) => instance.patch(url, data, config),
    delete: (url, config) => instance.delete(url, config),
  }
}
